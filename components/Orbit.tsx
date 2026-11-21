import Link from "next/link";
import { featuredServices } from "@/lib/services";
import { ServiceGlyph } from "./icons";

export function Orbit() {
  const count = featuredServices.length;

  return (
    <div
      className="orbit-stage"
      role="group"
      aria-label="Nine services arranged in a slowly rotating circle"
    >
      <div className="orbit-halo" aria-hidden="true" />
      <div className="orbit-ring">
        {featuredServices.map((service, index) => {
          const angle = (360 / count) * index;
          return (
            <div
              key={service.slug}
              className="orbit-slot"
              style={{
                transform: `rotate(${angle}deg) translateY(calc(var(--orbit-r) * -1)) rotate(${-angle}deg)`,
              }}
            >
              <Link href={`/services/${service.slug}`} className="orbit-card">
                <ServiceGlyph name={service.icon} className="h-4 w-4 text-green-700" />
                <span className="orbit-name">{service.short}</span>
                <span className="orbit-agency">{service.agencyShort}</span>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="orbit-core" aria-hidden="true">
        <span className="orbit-core-count">09</span>
        <span className="orbit-core-label">
          services
          <br />
          in orbit
        </span>
      </div>
    </div>
  );
}
