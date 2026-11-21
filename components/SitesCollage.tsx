"use client";

import { useState } from "react";
import Link from "next/link";

const SHOTS = [
  { src: "/sites/nimc.webp", alt: "NIMC website" },
  { src: "/sites/nis.webp", alt: "Nigeria Immigration Service website" },
  { src: "/sites/jamb.webp", alt: "JAMB website" },
  { src: "/sites/pebec.webp", alt: "PEBEC website" },
];

// Position (% of panel), width (% of panel), drift distance and duration for each tile.
const TILES = [
  { x: 4, y: 6, w: 34, dx: 14, dy: -10, d: 26 },
  { x: 52, y: 2, w: 26, dx: -12, dy: 12, d: 31 },
  { x: 80, y: 14, w: 18, dx: 10, dy: 8, d: 23 },
  { x: 30, y: 30, w: 22, dx: -16, dy: -8, d: 29 },
  { x: 62, y: 34, w: 30, dx: 12, dy: -12, d: 34 },
  { x: 2, y: 46, w: 20, dx: 10, dy: 14, d: 27 },
  { x: 38, y: 58, w: 28, dx: -10, dy: 10, d: 32 },
  { x: 74, y: 64, w: 22, dx: -14, dy: -10, d: 25 },
  { x: 10, y: 74, w: 24, dx: 12, dy: -8, d: 30 },
  { x: 50, y: 86, w: 16, dx: -8, dy: -12, d: 22 },
  { x: 84, y: 88, w: 14, dx: 8, dy: -6, d: 24 },
  { x: 22, y: 16, w: 10, dx: -6, dy: 8, d: 21 },
];

export function SitesCollage({ count }: { count: number }) {
  const [paused, setPaused] = useState(false);

  return (
    <section className="bg-black py-16 text-paper md:py-24" aria-labelledby="sites-title">
      <div className="shell max-w-3xl">
        <div className="relative aspect-square overflow-hidden rounded-[28px] bg-[#050505] md:aspect-[16/11]">
          {TILES.map((tile, index) => {
            const shot = SHOTS[index % SHOTS.length];
            return (
              <img
                key={index}
                src={shot.src}
                alt=""
                loading="lazy"
                width={720}
                height={450}
                className="site-tile absolute aspect-[16/10] object-cover object-top"
                style={
                  {
                    left: `${tile.x}%`,
                    top: `${tile.y}%`,
                    width: `${tile.w}%`,
                    opacity: tile.w < 18 ? 0.55 : 0.9,
                    "--dx": `${tile.dx}px`,
                    "--dy": `${tile.dy}px`,
                    animationDuration: `${tile.d}s`,
                    animationDelay: `${index * -3}s`,
                    animationPlayState: paused ? "paused" : "running",
                  } as React.CSSProperties
                }
              />
            );
          })}

          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Play animation" : "Pause animation"}
            aria-pressed={paused}
            className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-paper/80 text-black backdrop-blur transition-colors hover:bg-paper"
          >
            {paused ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13l10.5-6.5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
                <rect x="14" y="5" width="3.5" height="14" rx="1" />
              </svg>
            )}
          </button>
        </div>

        <div className="mt-12 px-1 md:mt-16">
          <h2 id="sites-title" className="text-[2.1rem] font-semibold leading-tight tracking-[-0.035em] md:text-5xl">
            {count.toLocaleString("en-NG")} websites into one.
          </h2>
          <p className="mt-6 max-w-md text-[1.1rem] leading-relaxed text-paper/60 md:text-xl">
            No more wandering from site to site. Ask once, and Nigeria brings the agencies
            together in one place.
          </p>
          <Link
            href="#how-it-works"
            className="mt-8 inline-flex min-h-11 items-center text-[1.05rem] font-semibold text-paper transition-opacity hover:opacity-70"
          >
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
