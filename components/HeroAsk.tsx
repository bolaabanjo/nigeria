"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SUGGESTIONS = [
  "How do I get a NIN?",
  "Renew my passport",
  "Register a company",
  "Student loan",
];

export function HeroAsk() {
  const [question, setQuestion] = useState("");
  const router = useRouter();

  function go(text: string) {
    const trimmed = text.trim();
    router.push(trimmed ? `/chat?q=${encodeURIComponent(trimmed)}` : "/chat");
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          go(question);
        }}
      >
        <label htmlFor="hero-ask" className="sr-only">
          Ask about a Nigerian government service
        </label>
        <div className="hero-pill">
          <input
            id="hero-ask"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Try ‘I need my NIN for my bank account’"
            className="hero-pill-input"
            maxLength={600}
            autoComplete="off"
          />
          <button type="submit" className="hero-send" aria-label="Ask">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => go(suggestion)}
            className="hero-chip"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
