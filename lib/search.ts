import { existsSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { SourceRef } from "./types";

const DB_PATH = path.join(process.cwd(), "index", "pages.db");

let db: DatabaseSync | null | undefined;

function open() {
  if (db !== undefined) return db;
  db = existsSync(DB_PATH) ? new DatabaseSync(DB_PATH, { readOnly: true }) : null;
  return db;
}

export type PageHit = { id: string; host: string; title: string; url: string; excerpt: string };

const STOP = new Set([
  "the", "and", "for", "how", "what", "where", "when", "can", "get", "do", "does", "i", "my", "me", "is", "are",
  "to", "of", "in", "on", "a", "an", "it", "be", "need", "want", "please", "you", "your", "with", "about", "there",
]);

/** Turns free text into an FTS5 query: quoted terms joined with OR, prefix-matched. */
function toQuery(text: string) {
  const terms = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((term) => term.length > 2 && !STOP.has(term))
    .slice(0, 12);
  return terms.length ? terms.map((term) => `"${term}"*`).join(" OR ") : null;
}

export function searchPages(text: string, limit = 5): PageHit[] {
  const database = open();
  const query = toQuery(text);
  if (!database || !query) return [];

  try {
    const rows = database
      .prepare(
        `SELECT p.id, p.host, p.title, p.url,
                snippet(pages_fts, 1, '', '', ' … ', 48) AS excerpt
         FROM pages_fts JOIN pages p ON p.id = pages_fts.rowid
         WHERE pages_fts MATCH ?
         ORDER BY bm25(pages_fts, 4.0, 1.0, 2.0)
         LIMIT ?`,
      )
      .all(query, limit) as { id: number; host: string; title: string; url: string; excerpt: string }[];

    return rows.map((row) => ({
      id: `p${row.id}`,
      host: row.host,
      title: row.title,
      url: row.url,
      excerpt: row.excerpt.replace(/\s+/g, " ").trim(),
    }));
  } catch {
    return [];
  }
}

export function pageRef(hit: PageHit): SourceRef {
  return { id: hit.id, agency: hit.host, title: hit.title, url: hit.url };
}

export function indexStats() {
  const database = open();
  if (!database) return { pages: 0, sites: 0 };
  return database.prepare("SELECT COUNT(*) AS pages, COUNT(DISTINCT host) AS sites FROM pages").get() as {
    pages: number;
    sites: number;
  };
}
