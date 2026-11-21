import { ANSWERS, type CuratedAnswer } from "./answers";
import { getSources, SOURCES } from "./sources";
import { findPlace, isCentreQuestion, nimcCentresLink } from "./places";
import type { AskResult } from "./types";

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "of", "to", "in", "on", "for", "is", "are", "am",
  "i", "me", "my", "we", "our", "you", "your", "it", "its", "this", "that", "these",
  "how", "what", "where", "when", "who", "why", "do", "does", "did", "can", "could",
  "should", "would", "will", "be", "been", "have", "has", "had", "get", "got", "need",
  "want", "please", "tell", "about", "with", "from", "at", "by", "as", "if", "so",
  "there", "here", "much", "many", "long", "make", "made", "go", "going", "any",
  "some", "just", "now", "then", "than", "also", "help", "know", "like",
]);

/** Words too broad to decide a match on their own. */
const WEAK_WORDS = new Set([
  "register", "registration", "apply", "application", "get", "new", "card", "number",
  "service", "services", "online", "official", "site", "website", "office", "need",
  "document", "documents", "requirement", "requirements", "start", "business",
]);

const ALIASES: Record<string, string[]> = {
  "driver's licence": ["driver", "licence"],
  "drivers licence": ["driver", "licence"],
  "drivers license": ["driver", "licence"],
  "driver license": ["driver", "licence"],
  "national id": ["nin", "identity"],
  "id card": ["nin", "identity"],
  "international passport": ["passport"],
  "student loan": ["nelfund", "loan"],
  "school fees": ["nelfund", "loan"],
  "youth service": ["nysc"],
  "tax number": ["tin", "tax"],
  "tax id": ["tin", "tax"],
  "bank verification": ["bvn"],
  "retirement": ["pension"],
};

export function tokenize(input: string) {
  const lower = input.toLowerCase().replace(/[^a-z0-9\s'-]/g, " ");
  const words = lower
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));

  const expanded: string[] = [];
  for (const [phrase, tokens] of Object.entries(ALIASES)) {
    if (lower.includes(phrase)) expanded.push(...tokens);
  }

  return Array.from(new Set([...words, ...expanded]));
}

function scoreAnswer(entry: CuratedAnswer, tokens: string[]) {
  const haystack = [entry.title, entry.service, ...entry.keywords].join(" ").toLowerCase();
  let score = 0;

  for (const token of tokens) {
    if (!token) continue;
    if (entry.keywords.includes(token)) score += WEAK_WORDS.has(token) ? 1 : 6;
    else if (
      entry.keywords.some((keyword) => keyword.includes(token) || token.includes(keyword))
    ) {
      score += WEAK_WORDS.has(token) ? 0.5 : 3;
    } else if (!WEAK_WORDS.has(token) && haystack.includes(token)) {
      score += 1.5;
    }
  }

  return score;
}

function normalise(text: string) {
  return ` ${text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim()} `;
}

/**
 * A keyword phrase that appears word for word in the question is a stronger
 * signal than a single shared word, and longer phrases count for more.
 */
function phraseBonus(entry: CuratedAnswer, question: string) {
  const asked = normalise(question);
  let bonus = 0;
  for (const keyword of entry.keywords) {
    if (keyword.length < 4) continue;
    const phrase = normalise(keyword);
    if (asked.includes(phrase)) {
      bonus += 2 + 2 * phrase.trim().split(" ").length;
    }
  }
  return bonus;
}

export function retrieve(question: string, limit = 3) {
  const tokens = tokenize(question);
  if (!tokens.length) return [];

  return ANSWERS.map((entry) => ({
    entry,
    score: scoreAnswer(entry, tokens) + phraseBonus(entry, question),
  }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

const UNKNOWN_AGENCY = {
  name: "Nigeria Government Services Portal",
  url: "https://services.gov.ng/",
};

const SMALL_TALK =
  /^(hi|hey|hello|hallo|good (morning|afternoon|evening)|sannu|bawo( ni)?|kedu|thanks?|thank you|ok(ay)?)\b[\s,.!?]*(there|nigeria)?[\s.!?]*$/i;

export function isSmallTalk(question: string) {
  return SMALL_TALK.test(question.trim());
}

const NIN_TOPIC = /\b(nin|nimc|enrol\w*|identity|national id|id card)\b/i;

/** Centre questions about NIN, answered with NIMC's own finder for the user's state. */
export function centreAnswer(question: string, context = ""): AskResult | null {
  const topic = `${context} ${question}`;
  if (!isCentreQuestion(question) || !NIN_TOPIC.test(topic)) return null;

  const place = findPlace(topic);
  const link = nimcCentresLink(place);
  const where = place
    ? place.town
      ? `${place.town} (${place.state === "FCT" ? "FCT" : `${place.state} State`})`
      : place.state === "FCT"
        ? "Abuja (FCT)"
        : `${place.state} State`
    : null;

  return {
    answer: where
      ? `NIMC keeps the official list of enrolment centres, and I've opened it filtered for ${where}. I don't hold individual addresses, and centres open, move or close, so check the list for one near you and call ahead before you go.\n\nTake your original ID, birth certificate or age declaration, and proof of address. First-time enrolment is free.`
      : "NIMC keeps the official list of enrolment centres, searchable by state. Tell me your town or state and I'll narrow it down for you.\n\nTake your original ID, birth certificate or age declaration, and proof of address. First-time enrolment is free.",
    sources: getSources(["nimc-centres", "nimc-enrol"]),
    mode: "curated",
    confident: true,
    agency: { name: "NIMC", url: link.url },
    followUps: [],
    action: link,
  };
}

function bestMatch(text: string) {
  const best = retrieve(text)[0];
  const strong = best
    ? tokenize(text).some(
        (token) =>
          !WEAK_WORDS.has(token) &&
          token.length >= 3 &&
          best.entry.keywords.some((keyword) => keyword.includes(token)),
      )
    : false;
  return best && best.score >= 3 && strong ? best : null;
}

export function curatedAnswer(question: string, context = ""): AskResult {
  if (isSmallTalk(question)) {
    const thanks = /^(thanks?|thank you)/i.test(question.trim());
    return {
      answer: thanks
        ? "You're welcome. Ask me anytime."
        : "Hello. What government service can I help you with today?",
      sources: [],
      mode: "curated",
      confident: true,
      agency: null,
      followUps: [],
    };
  }

  const centre = centreAnswer(question, context);
  if (centre) return centre;

  // Follow-ups like "how much is it?" lean on earlier messages for the topic.
  const best = bestMatch(question) ?? (context ? bestMatch(`${context} ${question}`) : null);

  if (!best) {
    return {
      answer:
        "I don't have a reliable answer for that one, and I would rather say so than guess. The federal services portal at services.gov.ng lists agencies by service, and each agency's own site is the one to trust for fees, forms and documents. If you tell me the service you are after, I can point you to the right agency.",
      sources: getSources(["egov-home", "egov-services", "nigeria-gov"]),
      mode: "curated",
      confident: false,
      agency: UNKNOWN_AGENCY,
      followUps: [
        "How do I get a NIN?",
        "How do I register a business?",
        "How do I apply for a student loan?",
      ],
    };
  }

  return {
    answer: best.entry.answer,
    sources: getSources(best.entry.sourceIds),
    mode: "curated",
    confident: true,
    agency: best.entry.agency,
    followUps: best.entry.followUps,
  };
}

export function buildContext(question: string) {
  return retrieve(question, 4)
    .map(({ entry }) => {
      const refs = getSources(entry.sourceIds)
        .map((source) => `${source.id} (${source.agency}, ${source.url})`)
        .join("; ");
      return `### ${entry.title}\n${entry.answer}\nSources: ${refs}`;
    })
    .join("\n\n");
}

export function sourceCatalogue() {
  return SOURCES.map(
    (source) =>
      `${source.id} | ${source.agency} | ${source.title} | ${source.url} | ${source.topics.join(", ")}`,
  ).join("\n");
}

export function isKnownSource(id: string) {
  return SOURCES.some((source) => source.id === id);
}

export function sourceById(id: string) {
  return SOURCES.find((source) => source.id === id);
}
