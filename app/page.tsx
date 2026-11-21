import { HeroAsk } from "@/components/HeroAsk";
import { Greeting } from "@/components/Greeting";
import { Header } from "@/components/Header";

export default function HomePage() {
  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-black text-paper">
      <style>{`html, body { background: #000; overflow: hidden; overscroll-behavior: none; }`}</style>
      <div className="border-b border-paper/10">
        <p className="shell flex items-center justify-center gap-2 py-2.5 text-center text-[11.5px] text-paper/60">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 flex-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5.5M12 7.8v.2" />
          </svg>
          An independent guide, not an official government website
        </p>
      </div>

      <Header tone="dark" />

      <main className="shell flex flex-1 flex-col items-center justify-center pb-16 text-center">
        <Greeting />
        <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-paper/70 md:text-lg">
          Whatever you need from government, start here.
        </p>

        <div className="mt-10 w-full max-w-2xl">
          <HeroAsk />
        </div>
      </main>

      <footer className="shrink-0 pb-[max(20px,env(safe-area-inset-bottom))] text-center">
        <a
          href="https://cencori.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center px-3 text-[12px] text-paper/45 transition-colors hover:text-paper"
        >
          Powered by&nbsp;<span className="font-semibold text-paper/70">Cencori</span>
        </a>
      </footer>
    </div>
  );
}
