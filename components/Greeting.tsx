"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const GREETINGS = [
  { text: "Hello", lang: "English" },
  { text: "Sannu", lang: "Hausa" },
  { text: "Bawo ni", lang: "Yoruba" },
  { text: "Kedu", lang: "Igbo" },
];

const HOLD_MS = 3200;
const SWAP_MS = 460;

export function Greeting() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [widths, setWidths] = useState<number[]>([]);
  const measureRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const node = measureRef.current;
    if (!node) return;

    const measure = () => {
      const spans = Array.from(node.children) as HTMLElement[];
      setWidths(spans.map((span) => span.getBoundingClientRect().width));
    };

    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      const timer = window.setInterval(
        () => setIndex((current) => (current + 1) % GREETINGS.length),
        HOLD_MS + SWAP_MS,
      );
      return () => window.clearInterval(timer);
    }

    let swapTimer: number | undefined;
    const timer = window.setInterval(() => {
      setLeaving(true);
      swapTimer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % GREETINGS.length);
        setLeaving(false);
      }, SWAP_MS);
    }, HOLD_MS);

    return () => {
      window.clearInterval(timer);
      if (swapTimer) window.clearTimeout(swapTimer);
    };
  }, []);

  const current = GREETINGS[index];

  return (
    <div className="relative flex w-full flex-col items-center">
      <h1 className="display text-center text-paper">
        <span
          className="greeting-slot"
          style={
            widths[index]
              ? ({ width: `${widths[index]}px` } as React.CSSProperties)
              : undefined
          }
        >
          <span className="greeting-strut" aria-hidden="true">
            {GREETINGS.reduce(
              (longest, greeting) =>
                greeting.text.length > longest.length ? greeting.text : longest,
              "",
            )}
          </span>
          <span
            key={index}
            className={`greeting-word ${leaving ? "greeting-out" : "greeting-in"}`}
            style={{ "--swap": `${SWAP_MS}ms` } as React.CSSProperties}
          >
            {current.text}
          </span>
        </span>
        <span className="whitespace-nowrap">, Nigeria.</span>
      </h1>

      {/* Zero-size box so the measuring copy never widens the page. */}
      <span
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 h-0 w-0 overflow-hidden"
      >
        <span ref={measureRef} className="display flex w-max">
          {GREETINGS.map((greeting) => (
            <span key={greeting.text} className="whitespace-nowrap">
              {greeting.text}
            </span>
          ))}
        </span>
      </span>
    </div>
  );
}
