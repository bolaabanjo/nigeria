import type { Metadata } from "next";
import { Suspense } from "react";
import { Chat } from "@/components/Chat";

export const metadata: Metadata = {
  title: "Ask",
  description:
    "Ask any question about Nigerian government services and get a plain answer with links to the official agency.",
};

export default function ChatPage() {
  return (
    <div className="bg-black text-paper">
      {/* Paints the page black behind the chat so no cream strip shows. */}
      <style>{`html, body { background: #000; overscroll-behavior: none; overflow: hidden; height: 100%; }`}</style>
      <main>
        <Suspense
          fallback={
            <div className="shell max-w-3xl py-10">
              <p className="thinking text-[15px]">Thinking…</p>
            </div>
          }
        >
          <Chat />
        </Suspense>
      </main>
    </div>
  );
}
