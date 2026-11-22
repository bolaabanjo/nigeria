export const positives = [
  {
    question: "How do I get a NIN for the first time?",
    answerId: "nin",
    sourceIds: ["nimc-nin", "nimc-enrol", "nimc-faq"],
  },
  {
    question: "How do I renew my passport?",
    answerId: "passport-renew",
    sourceIds: ["nis-passports", "nis-knowledge"],
  },
  {
    question: "How do I register a company with the CAC?",
    answerId: "cac-company",
    sourceIds: ["cac-company", "cac-timelines", "cac-faq"],
  },
  {
    question: "How do I register for the JAMB UTME?",
    answerId: "jamb",
    sourceIds: ["jamb-portal", "jamb-efacility", "jamb-home"],
  },
  {
    question: "How do I register for NYSC?",
    answerId: "nysc",
    sourceIds: ["nysc-portal", "nysc-home"],
  },
  {
    question: "How do I apply for a NELFUND student loan?",
    answerId: "nelfund",
    sourceIds: ["nelfund-home", "egov-services"],
  },
];

export const followUp = {
  question: "How much is it?",
  context: "What is the passport fee?",
  answerId: "passport-fee",
  sourceIds: ["nis-passports", "nis-knowledge", "nis-contact"],
};

export const negatives = [
  { defectId: "CURATED-01", question: "How do I renew a library card?", answerId: null, baseline: "passport-renew" },
  { defectId: "CURATED-02", question: "How do I renew a TV subscription?", answerId: null, baseline: "passport-renew" },
  { defectId: "CURATED-03", question: "Can I pay for my gym membership?", answerId: null, baseline: "passport-fee" },
  { question: "What is photosynthesis?", answerId: null },
  { question: "What does casual mean?", answerId: null },
];
