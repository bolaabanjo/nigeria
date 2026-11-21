// Crawls Nigerian government websites into index/pages.db (SQLite FTS5).
// Usage: node scripts/crawl.mjs [--max 12000] [--per-domain 60] [--concurrency 24]
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? Number(process.argv[i + 1]) : fallback;
};
const MAX_PAGES = arg("max", 12000);
const PER_DOMAIN = arg("per-domain", 60);
const CONCURRENCY = arg("concurrency", 24);
const TIMEOUT_MS = 12000;
const MAX_BODY = 8000;
const UA = "NigeriaAssistBot/1.0 (+https://nigeria.cencori.app; indexes public government pages)";

const ROOT = path.resolve(import.meta.dirname, "..");
mkdirSync(path.join(ROOT, "index"), { recursive: true });
const db = new DatabaseSync(path.join(ROOT, "index", "pages.db"));
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS pages (id INTEGER PRIMARY KEY, url TEXT UNIQUE, host TEXT, title TEXT, body TEXT, fetched_at TEXT);
  CREATE VIRTUAL TABLE IF NOT EXISTS pages_fts USING fts5(title, body, host, content='pages', content_rowid='id', tokenize='porter unicode61');
  CREATE TRIGGER IF NOT EXISTS pages_ai AFTER INSERT ON pages BEGIN
    INSERT INTO pages_fts(rowid, title, body, host) VALUES (new.id, new.title, new.body, new.host);
  END;
  CREATE TABLE IF NOT EXISTS hosts (host TEXT PRIMARY KEY, status TEXT, pages INTEGER DEFAULT 0);
`);

const insertPage = db.prepare("INSERT OR IGNORE INTO pages (url, host, title, body, fetched_at) VALUES (?,?,?,?,?)");
const upsertHost = db.prepare("INSERT INTO hosts (host, status, pages) VALUES (?,?,?) ON CONFLICT(host) DO UPDATE SET status=excluded.status, pages=excluded.pages");
const knownUrls = new Set(db.prepare("SELECT url FROM pages").all().map((r) => r.url));

const isGovHost = (host) => /(^|\.)gov\.ng$/.test(host) || host === "nibss-plc.com.ng";
const SKIP_EXT = /\.(pdf|docx?|xlsx?|pptx?|zip|rar|jpe?g|png|gif|webp|svg|mp4|mp3|ico|css|js|xml|json)(\?|$)/i;

function normalise(raw, base) {
  try {
    const url = new URL(raw, base);
    if (!/^https?:$/.test(url.protocol)) return null;
    url.hash = "";
    for (const key of [...url.searchParams.keys()]) if (/^(utm_|fbclid|gclid)/.test(key)) url.searchParams.delete(key);
    url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    if (!isGovHost(url.hostname) || SKIP_EXT.test(url.pathname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "-", mdash: "-", rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', naira: "N" };
const decode = (s) =>
  s.replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) =>
    e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : ENTITIES[e.toLowerCase()] ?? m,
  );

function extract(html, url) {
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").replace(/\s+/g, " ").trim()).slice(0, 200);
  const links = [...html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"'#]+)/gi)].map((m) => normalise(m[1], url)).filter(Boolean);
  const body = decode(
    html
      .replace(/<(script|style|noscript|svg|nav|footer|header|form|iframe)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<br\s*\/?>|<\/(p|div|li|h[1-6]|tr|section|article)>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/[ \t\f\v]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim()
    .slice(0, MAX_BODY);
  return { title, body, links };
}

const robotsCache = new Map();
async function allowed(url) {
  const { origin, pathname } = new URL(url);
  if (!robotsCache.has(origin)) {
    robotsCache.set(
      origin,
      fetch(`${origin}/robots.txt`, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(6000) })
        .then((r) => (r.ok ? r.text() : ""))
        .then((text) => {
          const rules = [];
          let applies = false;
          for (const line of text.split("\n")) {
            const [k, ...v] = line.split(":");
            const key = k.trim().toLowerCase();
            const value = v.join(":").trim();
            if (key === "user-agent") applies = value === "*";
            else if (applies && key === "disallow" && value) rules.push(value);
          }
          return rules;
        })
        .catch(() => []),
    );
  }
  const rules = await robotsCache.get(origin);
  return !rules.some((rule) => pathname.startsWith(rule));
}

// Seeds: hosts from Wikipedia's agency lists plus the curated source list.
async function seeds() {
  const pages = ["List_of_government_agencies_of_Nigeria", "Federal_Ministries_of_Nigeria", "States_of_Nigeria", "List_of_parastatals_of_Nigeria"];
  const hosts = new Set();
  for (const page of pages) {
    try {
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${page}&prop=externallinks&format=json`, { signal: AbortSignal.timeout(20000) });
      const links = (await res.json()).parse?.externallinks ?? [];
      for (const link of links) {
        const url = normalise(link);
        if (url) hosts.add(new URL(url).hostname);
      }
    } catch {}
  }
  const curated = [
    "services.gov.ng", "nigeria.gov.ng", "nimc.gov.ng", "immigration.gov.ng", "frsc.gov.ng", "cac.gov.ng", "firs.gov.ng",
    "jamb.gov.ng", "nysc.gov.ng", "nelfund.gov.ng", "cbn.gov.ng", "pencom.gov.ng", "nhsa.gov.ng", "nema.gov.ng",
    "nesrea.gov.ng", "nscdc.gov.ng", "naptip.gov.ng", "dmo.gov.ng", "pebec.gov.ng", "inecnigeria.org", "npc.gov.ng",
    "lagosstate.gov.ng", "ogunstate.gov.ng", "fct.gov.ng", "nbs.gov.ng", "nafdac.gov.ng", "son.gov.ng", "customs.gov.ng",
  ];
  const states = [
    "abia", "adamawa", "akwaibom", "anambra", "bayelsa", "benue", "borno", "crossriver", "delta", "edo", "enugu",
    "gombe", "imo", "jigawa", "kano", "katsina", "kwara", "lagos", "niger", "ogun", "osun", "oyo", "plateau",
    "rivers", "sokoto", "taraba", "yobe", "zamfara", "ekiti", "ondo", "kaduna", "kebbi", "kogi", "nasarawa", "ebonyi", "bauchi",
  ];
  for (const state of states) curated.push(`${state}state.gov.ng`);
  for (const host of curated) if (isGovHost(host)) hosts.add(host);
  return [...hosts];
}

const queue = [];
const queued = new Set();
const perHost = new Map();
const pending = new Map();
const hostFailures = new Map();
let stored = db.prepare("SELECT COUNT(*) n FROM pages").get().n;

function enqueue(url) {
  if (!url || queued.has(url) || knownUrls.has(url)) return;
  const host = new URL(url).hostname;
  if ((perHost.get(host) ?? 0) + (pending.get(host) ?? 0) >= PER_DOMAIN * 2) return;
  queued.add(url);
  pending.set(host, (pending.get(host) ?? 0) + 1);
  queue.push({ url, host });
}

async function crawlOne({ url, host }) {
  if ((perHost.get(host) ?? 0) >= PER_DOMAIN || (hostFailures.get(host) ?? 0) >= 4) return;
  if (!(await allowed(url))) return;
  try {
    const res = await fetch(url, { headers: { "user-agent": UA, accept: "text/html" }, redirect: "follow", signal: AbortSignal.timeout(TIMEOUT_MS) });
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !type.includes("text/html")) throw new Error(String(res.status));
    const finalUrl = normalise(res.url) ?? url;
    const { title, body, links } = extract(await res.text(), finalUrl);
    for (const link of links) enqueue(link);
    if (body.length < 200 || knownUrls.has(finalUrl)) return;
    knownUrls.add(finalUrl);
    insertPage.run(finalUrl, host, title || host, body, new Date().toISOString());
    const count = (perHost.get(host) ?? 0) + 1;
    perHost.set(host, count);
    upsertHost.run(host, "ok", count);
    stored++;
  } catch {
    hostFailures.set(host, (hostFailures.get(host) ?? 0) + 1);
    if (!perHost.get(host)) upsertHost.run(host, "unreachable", 0);
  }
}

const startHosts = await seeds();
console.log(`seeds: ${startHosts.length} hosts, already indexed: ${stored} pages`);
for (const row of db.prepare("SELECT host, COUNT(*) n FROM pages GROUP BY host").all()) perHost.set(row.host, row.n);
for (const host of startHosts) enqueue(`https://${host}/`);

let last = Date.now();
async function worker() {
  while (stored < MAX_PAGES) {
    // Round-robin across hosts so one big site cannot starve the rest.
    const index = queue.findIndex((item) => (perHost.get(item.host) ?? 0) < PER_DOMAIN && (hostFailures.get(item.host) ?? 0) < 4);
    if (index === -1) {
      if (active === 0) return;
      await new Promise((r) => setTimeout(r, 300));
      continue;
    }
    const [item] = queue.splice(index, 1);
    pending.set(item.host, (pending.get(item.host) ?? 1) - 1);
    active++;
    await crawlOne(item);
    active--;
    if (Date.now() - last > 15000) {
      last = Date.now();
      console.log(`pages ${stored}  hosts ${[...perHost.values()].filter(Boolean).length}  queue ${queue.length}`);
    }
  }
}
let active = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
db.exec("INSERT INTO pages_fts(pages_fts) VALUES ('optimize')");
const hosts = db.prepare("SELECT COUNT(*) n FROM hosts WHERE status = 'ok'").get().n;
console.log(`done: ${stored} pages from ${hosts} websites`);
