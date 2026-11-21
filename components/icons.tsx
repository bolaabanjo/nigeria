import type { ServiceIcon } from "@/lib/types";

type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function ArrowRight({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function Clock({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function Naira({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M7 4v16M17 4v16M4 9h16M4 15h16" />
    </svg>
  );
}

export function Shield({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M12 3 5 6v6c0 4 3 7.2 7 9 4-1.8 7-5 7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function Spark({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21M5.6 5.6l2.5 2.5M15.9 15.9l2.5 2.5M18.4 5.6l-2.5 2.5M8.1 15.9l-2.5 2.5" />
    </svg>
  );
}

export function ChevronLeft({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="m14 6-6 6 6 6" />
    </svg>
  );
}

const glyphs: Record<ServiceIcon, React.ReactNode> = {
  id: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6.5 16c.4-1.3 1.3-2 2.5-2s2.1.7 2.5 2M14 10h4M14 13.5h4" />
    </>
  ),
  passport: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M9.4 10h5.2M12 7v6M8 17h8" />
    </>
  ),
  steering: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 9.5V3.5M9.8 13.3 5 17M14.2 13.3 19 17" />
    </>
  ),
  building: (
    <>
      <path d="M4 20h16M6 20V6l6-3 6 3v14" />
      <path d="M10 20v-5h4v5M9 9h1M14 9h1M9 12.5h1M14 12.5h1" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  cap: (
    <>
      <path d="M3 9.5 12 5l9 4.5-9 4.5z" />
      <path d="M7 11.5V16c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-4.5M20 10v5" />
    </>
  ),
  flag: (
    <>
      <path d="M6 21V4" />
      <path d="M6 5c3-2 5 1 8 0s4-1 4-1v8s-1 1-4 1-5-2-8 0" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 14.5h2M6 6V4.5h11" />
    </>
  ),
  bank: (
    <>
      <path d="M3 9.5 12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
    </>
  ),
};

export function ServiceGlyph({ name, className }: { name: ServiceIcon; className?: string }) {
  return (
    <svg {...stroke} className={className}>
      {glyphs[name]}
    </svg>
  );
}
