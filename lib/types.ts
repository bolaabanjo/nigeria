export type Source = {
  id: string;
  agency: string;
  title: string;
  url: string;
  topics: string[];
};

export type SourceRef = Pick<Source, "id" | "agency" | "title" | "url">;

export type ServiceIcon =
  | "id"
  | "passport"
  | "steering"
  | "building"
  | "receipt"
  | "cap"
  | "flag"
  | "wallet"
  | "bank";

export type Service = {
  slug: string;
  name: string;
  short: string;
  agency: string;
  agencyShort: string;
  icon: ServiceIcon;
  tagline: string;
  summary: string;
  fee: string;
  timeline: string;
  who: string;
  requirements: string[];
  steps: { title: string; detail: string }[];
  official: { label: string; url: string }[];
  sourceIds: string[];
};

export type AskMode = "ai" | "curated";

export type AskResult = {
  answer: string;
  sources: SourceRef[];
  mode: AskMode;
  confident: boolean;
  agency: { name: string; url: string } | null;
  followUps: string[];
  action?: { label: string; url: string } | null;
};
