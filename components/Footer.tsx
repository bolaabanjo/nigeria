import Link from "next/link";
import { formatDate } from "@/lib/format";
import { SOURCES } from "@/lib/sources";

const footerAgencies = [
  { name: "NIMC", url: "https://nimc.gov.ng/" },
  { name: "Immigration", url: "https://immigration.gov.ng/" },
  { name: "FRSC", url: "https://frsc.gov.ng/" },
  { name: "CAC", url: "https://cac.gov.ng/" },
  { name: "FIRS", url: "https://firs.gov.ng/" },
  { name: "JAMB", url: "https://jamb.gov.ng/" },
  { name: "NYSC", url: "https://nysc.gov.ng/" },
  { name: "NELFUND", url: "https://nelfund.gov.ng/" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-green-950 text-paper">
      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-20">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/flag-nigeria.png"
                alt=""
                width={24}
                height={16}
                className="h-4 w-6"
              />
              <p className="eyebrow text-gold-200">Nigeria</p>
            </div>
            <p className="mt-4 max-w-md text-2xl leading-snug text-paper md:text-3xl">
              Government services should not need a middleman to explain them.
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/70">
              An independent guide to Nigerian government services. We read the official
              pages, write the short version, and link you straight to the agency.
            </p>
          </div>

          <div>
            <p className="eyebrow text-paper/50">Agencies we cite</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {footerAgencies.map((agency) => (
                <li key={agency.name}>
                  <a
                    href={agency.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-paper/80 underline-offset-4 hover:text-gold-200 hover:underline"
                  >
                    {agency.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-paper/50">
              {SOURCES.length} official sources in our library.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-paper/15 pt-8">
          <div className="rounded-sm border border-gold-500/35 bg-paper/[0.04] p-5 md:p-6">
            <p className="text-sm font-semibold text-gold-200">
              Not an official government website
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-paper/70">
              This site is an independent project. It is not affiliated with, endorsed by
              or operated by the Federal Government of Nigeria or any of its agencies. Fees,
              requirements and processing times change. Always confirm the details on the
              official agency website before you pay or travel.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
            <p>Sources checked {formatDate(new Date("2026-11-21T00:00:00Z"))}.</p>
            <div className="flex gap-5">
              <Link href="/chat" className="hover:text-gold-200">
                Ask
              </Link>
              <Link href="/#sources" className="hover:text-gold-200">
                Sources
              </Link>
              <Link href="/#services" className="hover:text-gold-200">
                Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
