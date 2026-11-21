import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, Clock, Naira, ServiceGlyph } from "@/components/icons";
import { serviceBySlug, services } from "@/lib/services";
import { getSources } from "@/lib/sources";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug.get(slug);
  if (!service) return {};

  return {
    title: `${service.name} — requirements, fees and steps`,
    description: `${service.tagline} Requirements, fees and steps for ${service.name}, with links to ${service.agency}.`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug.get(slug);
  if (!service) notFound();

  const sources = getSources(service.sourceIds);
  const others = services.filter((item) => item.slug !== service.slug).slice(0, 4);

  return (
    <div className="min-h-dvh">
      <Header />

      <main>
        <div className="shell pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-mute transition-colors hover:text-green-900"
          >
            <ChevronLeft className="h-4 w-4" />
            All services
          </Link>
        </div>

        <section className="shell pt-8 pb-12 md:pt-12 md:pb-16">
          <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-sm bg-green-100 text-green-800">
                  <ServiceGlyph name={service.icon} className="h-5 w-5" />
                </span>
                <p className="eyebrow">{service.agency}</p>
              </div>
              <h1 className="display-sm mt-6 max-w-2xl text-green-950">{service.name}</h1>
              <p className="lede mt-5 max-w-2xl">{service.summary}</p>
            </div>

            <dl className="self-start rounded-md border border-line bg-paper-2 p-5 md:mt-2">
              <div className="flex gap-3 pb-4">
                <Naira className="mt-0.5 h-4 w-4 flex-none text-gold-600" />
                <div>
                  <dt className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                    Cost
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{service.fee}</dd>
                </div>
              </div>
              <div className="flex gap-3 border-t border-line pt-4">
                <Clock className="mt-0.5 h-4 w-4 flex-none text-gold-600" />
                <div>
                  <dt className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                    Timeline
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{service.timeline}</dd>
                </div>
              </div>
              <div className="mt-5 border-t border-line pt-4">
                <dt className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                  Who it is for
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{service.who}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="border-y border-line bg-paper-deep/40">
          <div className="shell grid gap-12 py-14 md:grid-cols-2 md:gap-20 md:py-20">
            <div>
              <h2 className="text-2xl text-green-950">What you need</h2>
              <ul className="mt-6 space-y-3.5">
                {service.requirements.map((requirement) => (
                  <li key={requirement} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-green-700" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl text-green-950">How it goes, step by step</h2>
              <ol className="mt-6 space-y-5">
                {service.steps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="text-lg leading-6 text-gold-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="shell py-14 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
            <div>
              <h2 className="text-2xl text-green-950">Official pages</h2>
              <p className="mt-2 text-sm text-ink-soft">
                Go to {service.agency} for the current fees, forms and office details.
              </p>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {service.official.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4 text-[15px] text-ink transition-colors hover:text-green-900"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-4 w-4 flex-none text-ink-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl text-green-950">Sources for this page</h2>
              <p className="mt-2 text-sm text-ink-soft">
                We wrote this guide from these official pages. Checked in November 2026.
              </p>
              <ol className="mt-6 space-y-3">
                {sources.map((source, index) => (
                  <li key={source.id} className="flex gap-3 text-sm">
                    <span className="citation-mark">{index + 1}</span>
                    <span>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-green-900 underline decoration-gold-500/70 decoration-1 underline-offset-4 hover:decoration-green-700"
                      >
                        {source.title}
                      </a>
                      <span className="text-ink-mute"> — {source.agency}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="shell py-14 md:py-20">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <h2 className="text-2xl text-green-950">Other services</h2>
              <Link href="/#ask" className="btn btn-ghost w-fit text-sm">
                Ask a different question
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="flex h-full flex-col rounded-md border border-line bg-paper-2 p-4 transition-colors hover:border-green-700/50"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-600">
                      {item.agencyShort}
                    </span>
                    <span className="mt-2 text-[15px] font-medium leading-snug text-ink">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
