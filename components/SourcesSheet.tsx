"use client";

import { useEffect, useRef, useState } from "react";
import type { SourceRef } from "@/lib/types";

const LOGOS: Record<string, string> = {
  "nimc.gov.ng": "/logos/nimc.png",
  "immigration.gov.ng": "/logos/nis.png",
  "cac.gov.ng": "/logos/cac.png",
  "jamb.gov.ng": "/logos/jamb.png",
  "nibss-plc.com.ng": "/logos/nibss.png",
  "nysc.gov.ng": "/logos/nysc.png",
  "nelfund.gov.ng": "/logos/nelfund.png",
};

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Maps a subdomain (portal.jamb.gov.ng) to its parent site's logo. */
function logoFor(host: string) {
  const match = Object.keys(LOGOS).find((site) => host === site || host.endsWith(`.${site}`));
  return match ? LOGOS[match] : "/flag-nigeria.png";
}

function SiteIcon({ host, size = 40 }: { host: string; size?: number }) {
  const src = logoFor(host);
  const isFlag = src === "/flag-nigeria.png";
  return (
    <span
      className="grid flex-none place-items-center overflow-hidden rounded-full bg-white"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        className={isFlag ? "h-full w-full object-cover" : "h-[72%] w-[72%] object-contain"}
      />
    </span>
  );
}

type Group = { host: string; links: SourceRef[] };

function groupByHost(sources: SourceRef[]): Group[] {
  const groups = new Map<string, SourceRef[]>();
  for (const source of sources) {
    const host = hostOf(source.url);
    const list = groups.get(host) ?? [];
    if (!list.some((item) => item.url === source.url)) list.push(source);
    groups.set(host, list);
  }
  return [...groups.entries()]
    .map(([host, links]) => ({ host, links }))
    .sort((a, b) => b.links.length - a.links.length);
}

export function SourcesButton({ sources }: { sources: SourceRef[] }) {
  const [open, setOpen] = useState(false);
  const groups = groupByHost(sources);
  const preview = groups.slice(0, 3);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-8 items-center gap-2 rounded-full bg-paper/[0.08] pl-1 pr-3 text-[13px] text-paper/70 transition-colors hover:bg-paper/[0.14] hover:text-paper"
        aria-haspopup="dialog"
      >
        <span className="flex -space-x-2">
          {preview.map((group) => (
            <span key={group.host} className="rounded-full ring-2 ring-black">
              <SiteIcon host={group.host} size={22} />
            </span>
          ))}
        </span>
        Sources
      </button>
      {open && <SourcesSheet groups={groups} onClose={() => setOpen(false)} />}
    </>
  );
}

function SourcesSheet({ groups, onClose }: { groups: Group[]; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(groups.length === 1 ? groups[0].host : null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close sources"
        onClick={onClose}
        className="sheet-backdrop absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sources-sheet-title"
        className="sheet absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-[28px] border-t border-paper/10 bg-[#0b0b0d] pb-[max(16px,env(safe-area-inset-bottom))] text-paper"
      >
        <div className="relative flex shrink-0 items-center justify-center px-5 pt-5 pb-3">
          <h2 id="sources-sheet-title" className="text-[17px] font-semibold">
            Sources
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-3.5 grid h-10 w-10 place-items-center rounded-full bg-paper/[0.08] transition-colors hover:bg-paper/[0.14]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5">
          {groups.map((group) => {
            const isOpen = expanded === group.host;
            return (
              <li key={group.host} className="border-b border-paper/10 last:border-0">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : group.host)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 py-4 text-left"
                >
                  <SiteIcon host={group.host} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[16px] text-paper">{group.host}</span>
                    <span className="block text-[14px] text-paper/50">
                      {group.links.length} {group.links.length === 1 ? "source" : "sources"}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-5 w-5 flex-none text-paper/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {isOpen && (
                  <ul className="space-y-3.5 pb-5">
                    {group.links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[15px] leading-snug text-[#7fb8ff] underline decoration-dotted decoration-[#7fb8ff]/60 underline-offset-4 hover:decoration-solid"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
