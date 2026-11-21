import type { Source } from "./types";

/**
 * Curated source list. Every entry is an official Nigerian government
 * address, except NIBSS, which runs the BVN for the Central Bank.
 * URLs were checked in November 2026; agencies occasionally move pages.
 */
export const SOURCES: Source[] = [
  {
    id: "egov-home",
    agency: "Federal Government of Nigeria",
    title: "Nigeria Government Services Portal",
    url: "https://services.gov.ng/",
    topics: ["government services", "portal", "directory", "find a service"],
  },
  {
    id: "egov-services",
    agency: "Federal Government of Nigeria",
    title: "All services on the government portal",
    url: "https://services.gov.ng/services",
    topics: ["services directory", "agencies", "government services"],
  },
  {
    id: "egov-faq",
    agency: "Federal Government of Nigeria",
    title: "Government services FAQ",
    url: "https://services.gov.ng/faq",
    topics: ["faq", "account", "portal help"],
  },
  {
    id: "egov-about",
    agency: "Federal Government of Nigeria",
    title: "About e-government in Nigeria",
    url: "https://services.gov.ng/about/egov",
    topics: ["e-government", "digital services"],
  },
  {
    id: "egov-news",
    agency: "Federal Government of Nigeria",
    title: "Government services news",
    url: "https://services.gov.ng/news",
    topics: ["announcements", "service changes"],
  },
  {
    id: "nimc-nin",
    agency: "NIMC",
    title: "The National Identification Number (NIN)",
    url: "https://nimc.gov.ng/nin/",
    topics: ["nin", "national identity number", "identity", "id card"],
  },
  {
    id: "nimc-enrol",
    agency: "NIMC",
    title: "NIN enrolment",
    url: "https://nimc.gov.ng/nin-enrollment/",
    topics: ["nin enrolment", "enroll", "register nin", "biometrics", "centre"],
  },
  {
    id: "nimc-slip",
    agency: "NIMC",
    title: "NIN slip",
    url: "https://nimc.gov.ng/nin-slip/",
    topics: ["nin slip", "lost slip", "reprint", "nin card"],
  },
  {
    id: "nimc-faq",
    agency: "NIMC",
    title: "NIMC frequently asked questions",
    url: "https://nimc.gov.ng/faq/",
    topics: ["nimc faq", "nin correction", "name change", "requirements"],
  },
  {
    id: "nimc-services",
    agency: "NIMC",
    title: "NIMC services",
    url: "https://nimc.gov.ng/services/",
    topics: ["nimc services", "data update", "card collection"],
  },
  {
    id: "nimc-centres",
    agency: "NIMC",
    title: "NIN enrolment centre finder",
    url: "https://nimc.gov.ng/enrolment-centres",
    topics: ["enrolment centre", "where to enrol", "nin centre near me", "nimc office", "centres by state"],
  },
  {
    id: "nis-passports",
    agency: "Nigeria Immigration Service",
    title: "Nigerian passports",
    url: "https://immigration.gov.ng/passports/",
    topics: ["passport", "renew passport", "international passport", "travel document"],
  },
  {
    id: "nis-visa",
    agency: "Nigeria Immigration Service",
    title: "Nigerian visa",
    url: "https://immigration.gov.ng/nigerian-visa/",
    topics: ["visa", "visitor", "entry requirements"],
  },
  {
    id: "nis-enbic",
    agency: "Nigeria Immigration Service",
    title: "eNBiC: expatriate residence and entry",
    url: "https://enbic.immigration.gov.ng/",
    topics: ["expatriate", "residence permit", "cerpac", "business visa"],
  },
  {
    id: "nis-evisa",
    agency: "Nigeria Immigration Service",
    title: "Nigeria e-visa portal",
    url: "https://evisa.immigration.gov.ng/",
    topics: ["evisa", "visa application"],
  },
  {
    id: "nis-knowledge",
    agency: "Nigeria Immigration Service",
    title: "NIS knowledge base",
    url: "https://immigration.gov.ng/nis/knowledge-base/",
    topics: ["passport questions", "immigration help"],
  },
  {
    id: "nis-contact",
    agency: "Nigeria Immigration Service",
    title: "Contact the Nigeria Immigration Service",
    url: "https://immigration.gov.ng/contact",
    topics: ["contact", "passport office", "complaint"],
  },
  {
    id: "frsc-home",
    agency: "Federal Road Safety Corps",
    title: "Federal Road Safety Corps",
    url: "https://frsc.gov.ng/",
    topics: ["frsc", "road safety", "driver licence", "vehicle"],
  },
  {
    id: "cac-company",
    agency: "Corporate Affairs Commission",
    title: "Company registration",
    url: "https://cac.gov.ng/services/company-registration",
    topics: ["company registration", "register company", "limited company", "ltd", "cac"],
  },
  {
    id: "cac-business-name",
    agency: "Corporate Affairs Commission",
    title: "Business name registration",
    url: "https://cac.gov.ng/services/business-name",
    topics: ["business name", "sole trader", "enterprise", "register business"],
  },
  {
    id: "cac-timelines",
    agency: "Corporate Affairs Commission",
    title: "CAC service timelines",
    url: "https://cac.gov.ng/services/service-timelines",
    topics: ["cac timeline", "how long", "processing time"],
  },
  {
    id: "cac-faq",
    agency: "Corporate Affairs Commission",
    title: "CAC frequently asked questions",
    url: "https://cac.gov.ng/resources/faq",
    topics: ["cac faq", "annual returns", "post incorporation", "change of directors"],
  },
  {
    id: "cac-trustees",
    agency: "Corporate Affairs Commission",
    title: "Incorporated trustees",
    url: "https://cac.gov.ng/services/incorporated-trustees",
    topics: ["ngo", "incorporated trustees", "association", "church", "foundation"],
  },
  {
    id: "firs-home",
    agency: "Federal Inland Revenue Service",
    title: "Federal Inland Revenue Service",
    url: "https://firs.gov.ng/",
    topics: ["firs", "tax", "tax office", "revenue"],
  },
  {
    id: "firs-taxpromax",
    agency: "Federal Inland Revenue Service",
    title: "TaxPro Max",
    url: "https://taxpromax.firs.gov.ng/",
    topics: ["tin", "tax identification number", "file tax", "tax returns"],
  },
  {
    id: "jamb-home",
    agency: "JAMB",
    title: "Joint Admissions and Matriculation Board",
    url: "https://jamb.gov.ng/",
    topics: ["jamb", "utme", "admission", "university entrance"],
  },
  {
    id: "jamb-efacility",
    agency: "JAMB",
    title: "JAMB eFacility",
    url: "https://jamb.gov.ng/efacility",
    topics: ["jamb profile", "jamb result", "check result", "caps", "admission status"],
  },
  {
    id: "jamb-portal",
    agency: "JAMB",
    title: "JAMB registration portal",
    url: "https://portal.jamb.gov.ng/",
    topics: ["jamb registration", "register utme", "jamb form", "exam"],
  },
  {
    id: "nysc-home",
    agency: "National Youth Service Corps",
    title: "National Youth Service Corps",
    url: "https://nysc.gov.ng/",
    topics: ["nysc", "service year", "corps member", "youth service"],
  },
  {
    id: "nysc-portal",
    agency: "National Youth Service Corps",
    title: "NYSC registration portal",
    url: "https://portal.nysc.gov.ng/",
    topics: ["nysc registration", "call up letter", "green card", "deployment"],
  },
  {
    id: "nelfund-home",
    agency: "NELFUND",
    title: "Nigerian Education Loan Fund",
    url: "https://nelfund.gov.ng/",
    topics: ["student loan", "nelfund", "tuition", "education loan", "school fees"],
  },
  {
    id: "nibss-home",
    agency: "NIBSS",
    title: "Nigeria Inter-Bank Settlement System",
    url: "https://nibss-plc.com.ng/",
    topics: ["nibss", "bvn", "bank verification number"],
  },
  {
    id: "cbn-home",
    agency: "Central Bank of Nigeria",
    title: "Central Bank of Nigeria",
    url: "https://www.cbn.gov.ng/",
    topics: ["cbn", "bank", "bvn", "banking", "currency"],
  },
  {
    id: "pencom-home",
    agency: "National Pension Commission",
    title: "National Pension Commission",
    url: "https://www.pencom.gov.ng/",
    topics: ["pension", "pencom", "retirement", "rsa", "pfa"],
  },
  {
    id: "nhsa-home",
    agency: "National Health Insurance Authority",
    title: "National Health Insurance Authority",
    url: "https://www.nhsa.gov.ng/",
    topics: ["health insurance", "nhia", "nhsa", "health cover", "hmo"],
  },
  {
    id: "nema-home",
    agency: "National Emergency Management Agency",
    title: "National Emergency Management Agency",
    url: "https://nema.gov.ng/",
    topics: ["emergency", "disaster", "flood", "nema", "relief"],
  },
  {
    id: "nesrea-home",
    agency: "NESREA",
    title: "National Environmental Standards and Regulations Enforcement Agency",
    url: "https://nesrea.gov.ng/",
    topics: ["environment", "pollution", "nesrea", "waste", "sanitation"],
  },
  {
    id: "nscdc-home",
    agency: "NSCDC",
    title: "Nigeria Security and Civil Defence Corps",
    url: "https://nscdc.gov.ng/",
    topics: ["civil defence", "security", "nscdc", "private guard"],
  },
  {
    id: "naptip-home",
    agency: "NAPTIP",
    title: "National Agency for the Prohibition of Trafficking in Persons",
    url: "https://naptip.gov.ng/",
    topics: ["trafficking", "naptip", "human trafficking", "report abuse"],
  },
  {
    id: "dmo-home",
    agency: "Debt Management Office",
    title: "Debt Management Office",
    url: "https://dmo.gov.ng/",
    topics: ["debt", "dmo", "bonds", "treasury"],
  },
  {
    id: "nigeria-gov",
    agency: "Federal Government of Nigeria",
    title: "Nigeria.gov.ng",
    url: "https://nigeria.gov.ng/",
    topics: ["nigeria government", "ministries", "official portal"],
  },
  {
    id: "pebec",
    agency: "Presidential Enabling Business Environment Council",
    title: "Report a government service problem",
    url: "https://www.pebec.gov.ng/reportgov-ng",
    topics: ["complaint", "report a service", "feedback", "bureaucracy"],
  },
];

export const SOURCE_MAP = new Map(SOURCES.map((source) => [source.id, source]));

export function getSources(ids: string[]) {
  return ids
    .map((id) => SOURCE_MAP.get(id))
    .filter((source): source is Source => Boolean(source))
    .map(({ id, agency, title, url }) => ({ id, agency, title, url }));
}

export function sourceIds() {
  return new Set(SOURCES.map((source) => source.id));
}
