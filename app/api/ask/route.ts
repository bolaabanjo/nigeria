import { answerQuestion } from "@/lib/ai";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 2000) hits.clear();
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "That is a lot of questions at once. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a question in the request body." }, { status: 400 });
  }

  const question =
    typeof body === "object" && body !== null && "question" in body
      ? String((body as { question: unknown }).question ?? "").trim()
      : "";

  if (!question) {
    return Response.json({ error: "Type a question first." }, { status: 400 });
  }

  if (question.length > 600) {
    return Response.json(
      { error: "That question is too long. Keep it under 600 characters." },
      { status: 400 },
    );
  }

  try {
    const result = await answerQuestion(question);
    return Response.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Ask route failed:", error instanceof Error ? error.message : error);
    return Response.json(
      { error: "Something went wrong while looking that up. Please try again." },
      { status: 500 },
    );
  }
}
