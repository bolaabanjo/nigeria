const LOGOS = [
  { src: "/logos/nimc.png", name: "National Identity Management Commission", url: "https://nimc.gov.ng/", w: 111 },
  { src: "/logos/nis.png", name: "Nigeria Immigration Service", url: "https://immigration.gov.ng/", w: 330 },
  { src: "/logos/cac.png", name: "Corporate Affairs Commission", url: "https://cac.gov.ng/", w: 368 },
  { src: "/logos/jamb.png", name: "Joint Admissions and Matriculation Board", url: "https://jamb.gov.ng/", w: 115 },
  { src: "/logos/nibss.png", name: "Nigeria Inter-Bank Settlement System", url: "https://nibss-plc.com.ng/", w: 181 },
  { src: "/logos/nysc.png", name: "National Youth Service Corps", url: "https://nysc.gov.ng/", w: 95 },
  { src: "/logos/nelfund.png", name: "Nigerian Education Loan Fund", url: "https://nelfund.gov.ng/", w: 266 },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="logo-row" aria-hidden={hidden || undefined}>
      {LOGOS.map((logo) => (
        <li key={logo.src}>
          <a
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={hidden ? -1 : undefined}
            className="block opacity-80 transition-opacity hover:opacity-100"
          >
            <img
              src={logo.src}
              alt={hidden ? "" : logo.name}
              width={Math.round((logo.w / 120) * 48)}
              height={48}
              className="h-12 w-auto"
              loading="lazy"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function LogoCloud() {
  return (
    <section aria-labelledby="services-title" className="border-y border-line bg-paper py-14 md:py-20">
      <h2
        id="services-title"
        className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-mute"
      >
        Services
      </h2>
      <div className="logo-marquee mt-8">
        <div className="logo-track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
