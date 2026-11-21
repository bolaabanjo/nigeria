import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArrowUpRight, ChevronLeft } from "@/components/icons";
import { SOURCES } from "@/lib/sources";
import { hostOf } from "@/lib/format";

export const metadata: Metadata = {
  title: "Sources",
  description:
    "The official Nigerian government pages this site uses to answer questions.",
};

export default function SourcesPage() {
  const agencies = Array.from(new Set(SOURCES.map((source) => source.agency)));

  return (
    <div className="min-h-dvh">
      <Header />

      <main className="shell">
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-mute transition-colors hover:text-green-900"
          >
            <ChevronLeft className="h-4 w-4" />
            Home
          </Link>
        </div>

        <header className="max-w-2xl pt-8 pb-10 md:pt-12">
          <p className="eyebrow">Source library</p>
          <h1 className="display-sm mt-4 text-green-950">Where our answers come from.</h1>
          <p className="lede mt-5">
            {SOURCES.length} official pages from {agencies.length} Nigerian government
            agencies and bodies. We read these pages, write the short version, and link
            you back to the original.
          </p>
        </header>

        <div className="space-y-10 pb-16 md:pb-24">
          {agencies.map((agency) => (
            <section key={agency} aria-labelledby={`agency-${agency}`}>
              <h2
                id={`agency-${agency}`}
                className="border-b border-line pb-2 text-xl text-green-950"
              >
                {agency}
              </h2>
              <ul className="divide-y divide-line">
                {SOURCES.filter((source) => source.agency === agency).map((source) => (
                  <li key={source.id}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-4 py-3.5"
                    >
                      <span>
                        <span className="text-[15px] text-ink transition-colors group-hover:text-green-900">
                          {source.title}
                        </span>
                        <span className="ml-2 text-xs text-ink-mute">{hostOf(source.url)}</span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 flex-none text-ink-mute" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="max-w-2xl pb-16 text-sm leading-relaxed text-ink-mute">
          Some agency sites block automated checks or change pages without notice. If a
          link does not load, search for the agency's name and confirm the address ends
          in .gov.ng.
        </p>
      </main>

      <Footer />
    </div>
  );
}
