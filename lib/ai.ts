import { buildContext, curatedAnswer, retrieve } from "./ask";
import { SOURCES } from "./sources";
import type { AskResult } from "./types";

const ENDPOINT = "https://api.cencori.com/v1/chat/completions";
const DEFAULT_MODEL = "maximo-atlas-1.5";

const sourceCatalogue = SOURCES.map(
  (source) =>
    `- id: ${source.id} | ${source.agency} | ${source.title} | ${source.url} | ${source.topics.join(", ")}`,
).join("\n");

const SYSTEM_PROMPT = `You are Nigeria, an AI assistant for Nigerian government services. Speak in the first person as Nigeria: a calm, warm guide who helps citizens find and complete government services.

Identity:
- When asked who or what you are, say you are Nigeria, an AI assistant that helps people with Nigerian government services.
- If asked whether you are official or run by the government, say honestly that you are an independent assistant, not an official government service, and that official decisions, payments and applications happen on the agency's own website.
- Never claim to process applications, issue documents, take payments or access anyone's records.

Answer only from the SOURCES and NOTES provided below. Never invent fees, dates, requirements, office addresses or URLs.

Rules:
- If the sources do not support a reliable answer, say plainly that you do not know, set "confident" to false, and point the person to the closest official agency in the sources.
- Write in plain standard English, warm and human, as a knowledgeable friend would explain it. Short sentences. No jargon, no exclamation marks, no emoji, no markdown headings.
- Two or three short paragraphs at most, under 160 words. If you list things, put each item on its own line starting with "- ".
- Cite only source ids from the SOURCES list. Cite every source you rely on.
- Fees and processing times change. Where they matter, say they should be confirmed on the official site.
- Never ask for personal data such as a BVN, NIN, card number or password.

Reply with a single JSON object and nothing else:
{"answer": "string", "sourceIds": ["id"], "confident": true, "agencyUrl": "https://..." or null}

SOURCES:
${sourceCatalogue}`;

type AiPayload = {
  answer?: unknown;
  sourceIds?: unknown;
  confident?: unknown;
  agencyUrl?: unknown;
};

function parsePayload(content: string): AiPayload | null {
  const cleaned = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");

  try {
    return JSON.parse(cleaned) as AiPayload;
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    try {
      return JSON.parse(cleaned.slice(start, end + 1)) as AiPayload;
    } catch {
      return null;
    }
  }
}

function sourceFor(url: string) {
  return SOURCES.find((source) => source.url === url);
}

async function askCencori(question: string): Promise<AskResult | null> {
  const key = process.env.CENCORI_API_KEY;
  if (!key) return null;

  const notes = buildContext(question);
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: process.env.CENCORI_MODEL || DEFAULT_MODEL,
      temperature: 0.2,
      max_tokens: 500,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `NOTES:\n${notes || "No close match in the curated notes."}\n\nQUESTION: ${question}`,
        },
      ],
    }),
    signal: AbortSignal.timeout(18000),
  });

  if (!response.ok) {
    throw new Error(`Cencori returned ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  const payload = parsePayload(content);
  if (!payload || typeof payload.answer !== "string" || !payload.answer.trim()) {
    return null;
  }

  const known = new Set(SOURCES.map((source) => source.id));
  const requested = Array.isArray(payload.sourceIds) ? payload.sourceIds : [];
  const ids = requested.filter(
    (id): id is string => typeof id === "string" && known.has(id),
  );

  const fallback = retrieve(question, 1)[0]?.entry;
  const confident = payload.confident === true;
  const chosen = ids.length
    ? ids
    : confident && fallback
      ? fallback.sourceIds
      : ["egov-home", "egov-services"];

  const agencySource =
    typeof payload.agencyUrl === "string" ? sourceFor(payload.agencyUrl) : undefined;
  const agency =
    agencySource ??
    (fallback ? { agency: fallback.agency.name, url: fallback.agency.url } : undefined);

  return {
    answer: payload.answer.trim(),
    sources: chosen
      .map((id) => SOURCES.find((source) => source.id === id))
      .filter((source): source is (typeof SOURCES)[number] => Boolean(source))
      .map(({ id, agency: org, title, url }) => ({ id, agency: org, title, url })),
    mode: "ai",
    confident,
    agency: agency ? { name: agency.agency, url: agency.url } : null,
    followUps:
      fallback?.followUps ??
      ["How do I get a NIN?", "How do I register a business?", "How do I apply for a student loan?"],
  };
}

export async function answerQuestion(question: string): Promise<AskResult> {
  if (!process.env.CENCORI_API_KEY) {
    return curatedAnswer(question);
  }

  try {
    const result = await askCencori(question);
    if (result) return result;
  } catch (error) {
    console.error(
      "AI request failed, falling back to curated answers:",
      error instanceof Error ? error.message : error,
    );
  }

  return curatedAnswer(question);
}
