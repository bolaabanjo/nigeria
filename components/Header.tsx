"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/chat", label: "Ask a question", note: "Any service, in plain language" },
  { href: "/sources", label: "Our sources", note: "The official pages we cite" },
];

export function Header({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dark = tone === "dark";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );

    focusables()[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <header className={dark ? "text-paper" : "border-b border-line/80 text-ink"}>
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Nigeria home">
          <img
            src="/flag-nigeria.png"
            alt=""
            width={26}
            height={17}
            className="h-[17px] w-[26px]"
          />
          <span className="text-[1.2rem] font-semibold tracking-[-0.02em]">Nigeria</span>
        </Link>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="menu-sheet"
          className={`-mr-2 inline-flex min-h-11 items-center px-2 text-[1.2rem] font-semibold uppercase tracking-[-0.02em] transition-opacity hover:opacity-70 ${
            dark ? "text-paper" : "text-ink"
          }`}
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="sheet-backdrop absolute inset-0 h-full w-full cursor-default bg-green-950/45"
          />

          <div
            id="menu-sheet"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="sheet absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-2xl bg-paper-2 pb-[max(24px,env(safe-area-inset-bottom))] text-ink shadow-[0_-20px_60px_-30px_rgba(8,37,27,0.6)]"
          >
            <div className="flex justify-center pt-3" aria-hidden="true">
              <span className="h-1 w-10 rounded-full bg-line" />
            </div>

            <div className="mx-auto w-full max-w-2xl px-5 pt-4 md:px-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Menu</p>
                <button
                  type="button"
                  onClick={close}
                  className="-mr-2 inline-flex min-h-11 items-center gap-1.5 px-2 text-sm text-ink-soft hover:text-green-900"
                >
                  Close
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="m6 6 12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Site" className="mt-4 border-t border-line">
                {LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline justify-between gap-6 border-b border-line py-4"
                  >
                    <span>
                      <span className="block text-[1.3rem] font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-green-800">
                        {link.label}
                      </span>
                      <span className="mt-0.5 block text-[13.5px] text-ink-mute">
                        {link.note}
                      </span>
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-1.5 h-4 w-4 flex-none text-ink-mute"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </Link>
                ))}
              </nav>

              <p className="mt-5 text-[12.5px] leading-relaxed text-ink-mute">
                An independent guide. Not an official government website.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
