import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "nin",
    name: "National Identification Number",
    short: "NIN",
    agency: "National Identity Management Commission",
    agencyShort: "NIMC",
    icon: "id",
    tagline: "Your identity number for banking, travel and government services.",
    summary:
      "The NIN is an eleven-digit number issued by NIMC after enrolment. It is the identity key used for SIM registration, passports, bank accounts, pensions and most federal services.",
    fee: "Free to enrol. Corrections and replacements may attract a fee.",
    timeline: "Number issued after enrolment; slip usually within days.",
    who: "Every Nigerian citizen and legal resident, including children.",
    requirements: [
      "An original and valid means of identification: national passport, driver's licence, voter's card or state of origin certificate",
      "Birth certificate or a sworn declaration of age",
      "Proof of address, such as a utility bill or tenancy agreement",
      "A phone number you can be reached on",
    ],
    steps: [
      {
        title: "Find an enrolment centre",
        detail:
          "Use NIMC's list of enrolment centres or the government services portal. Some states and local governments run mobile enrolment days.",
      },
      {
        title: "Complete the enrolment form",
        detail:
          "Give your names exactly as they appear on your supporting documents. Spelling differences are the most common cause of later corrections.",
      },
      {
        title: "Capture biometrics",
        detail:
          "Your fingerprints, photograph and signature are taken at the centre. Children may be linked to a parent or guardian's record.",
      },
      {
        title: "Collect your NIN slip",
        detail:
          "You receive a slip with your number. Keep it safe and check that every detail is correct before you leave.",
      },
    ],
    official: [
      { label: "NIMC: the NIN", url: "https://nimc.gov.ng/nin/" },
      { label: "NIMC: enrolment", url: "https://nimc.gov.ng/nin-enrollment/" },
      { label: "NIMC: NIN slip", url: "https://nimc.gov.ng/nin-slip/" },
    ],
    sourceIds: ["nimc-nin", "nimc-enrol", "nimc-slip", "nimc-faq"],
  },
  {
    slug: "passport",
    name: "Nigerian passport",
    short: "Passport",
    agency: "Nigeria Immigration Service",
    agencyShort: "NIS",
    icon: "passport",
    tagline: "Apply, renew or replace your travel document.",
    summary:
      "Nigerian passports are issued by the Nigeria Immigration Service. Applications and renewals start on the NIS passport portal, where you pay, book a capture appointment and choose a collection office.",
    fee: "Set by NIS and differs by booklet size and processing speed. Confirm the current schedule on the passport portal.",
    timeline: "About six weeks for standard processing; faster options cost more.",
    who: "Nigerian citizens, including minors with a parent's consent.",
    requirements: [
      "A completed application on the NIS passport portal",
      "National Identification Number (NIN)",
      "Birth certificate or age declaration",
      "Local government or state of origin certificate",
      "For renewal: your current or expired passport",
      "For minors: a parent's passport and written consent",
    ],
    steps: [
      {
        title: "Start on the official portal",
        detail:
          "Create or sign in to your account on the NIS passport portal. Do not apply through a third-party agent.",
      },
      {
        title: "Fill the form and pay",
        detail:
          "Choose booklet type and processing speed. Payment is made on the portal, and you receive a reference number.",
      },
      {
        title: "Book your capture appointment",
        detail:
          "Select a passport office and date. Bring your original documents and your payment reference.",
      },
      {
        title: "Capture and collect",
        detail:
          "Your photograph and fingerprints are taken at the office. Track the application and collect at the office you chose.",
      },
    ],
    official: [
      { label: "NIS: passports", url: "https://immigration.gov.ng/passports/" },
      { label: "NIS: contact", url: "https://immigration.gov.ng/contact" },
    ],
    sourceIds: ["nis-passports", "nis-knowledge", "nis-contact"],
  },
  {
    slug: "drivers-licence",
    name: "Driver's licence",
    short: "Driver's licence",
    agency: "Federal Road Safety Corps",
    agencyShort: "FRSC",
    icon: "steering",
    tagline: "From learner's permit to a full national licence.",
    summary:
      "The national driver's licence is issued through the FRSC and state motor vehicle administrations. You begin with a learner's permit, train at an approved driving school, then take the test and capture your biometrics.",
    fee: "Set by FRSC and your state, and varies with the licence duration. Confirm the current schedule before paying.",
    timeline: "Two to eight weeks after a successful test.",
    who: "Anyone aged 18 and above who can drive the class of vehicle applied for.",
    requirements: [
      "A valid learner's permit",
      "Certificate from an approved driving school",
      "Age declaration or birth certificate",
      "Proof of address",
      "National Identification Number (NIN)",
      "A medical or eyesight certificate where required",
    ],
    steps: [
      {
        title: "Get a learner's permit",
        detail:
          "Apply at your state motor vehicle administration with your NIN and passport photographs.",
      },
      {
        title: "Train and pass the test",
        detail:
          "Complete training at an approved driving school, then sit the FRSC theory and practical tests.",
      },
      {
        title: "Capture your biometrics",
        detail:
          "Your photograph and fingerprints are taken at the licensing centre after you pass.",
      },
      {
        title: "Collect the licence",
        detail:
          "The card is produced centrally and sent to the office you selected. Check the expiry date when it arrives.",
      },
    ],
    official: [
      { label: "FRSC: services", url: "https://frsc.gov.ng/services/" },
      { label: "FRSC", url: "https://frsc.gov.ng/" },
    ],
    sourceIds: ["frsc-home"],
  },
  {
    slug: "cac",
    name: "Register a business",
    short: "CAC",
    agency: "Corporate Affairs Commission",
    agencyShort: "CAC",
    icon: "building",
    tagline: "Register a company or business name the official way.",
    summary:
      "The Corporate Affairs Commission registers companies, business names and incorporated trustees. Registration is done on the CAC portal, starting with a name search and reservation.",
    fee: "Depends on the structure and share capital. CAC publishes its fee schedule; stamp duty is paid separately.",
    timeline: "Three to ten working days once documents are complete.",
    who: "Anyone starting a company, trading under a business name, or registering an association.",
    requirements: [
      "A unique proposed name, with two alternatives",
      "Valid identification for every director, shareholder and proprietor",
      "NIN and a passport photograph for each person",
      "A registered office address",
      "Memorandum and articles of association for a company",
      "Signature of a witness for the declaration",
    ],
    steps: [
      {
        title: "Search and reserve a name",
        detail:
          "Run a name availability search on the CAC portal, then reserve the name you want. Reservation is valid for a limited period.",
      },
      {
        title: "Complete the incorporation form",
        detail:
          "Enter directors, shareholders, share capital and the registered address. Upload identification for each person.",
      },
      {
        title: "Pay the fees",
        detail:
          "Pay CAC fees and stamp duty through the portal. Keep the receipts and your application number.",
      },
      {
        title: "Collect your certificate",
        detail:
          "Download the certificate of incorporation and status report when the application is approved.",
      },
    ],
    official: [
      { label: "CAC: company registration", url: "https://cac.gov.ng/services/company-registration" },
      { label: "CAC: business names", url: "https://cac.gov.ng/services/business-name" },
      { label: "CAC: service timelines", url: "https://cac.gov.ng/services/service-timelines" },
    ],
    sourceIds: ["cac-company", "cac-business-name", "cac-timelines", "cac-faq"],
  },
  {
    slug: "tin",
    name: "Tax Identification Number",
    short: "TIN",
    agency: "Federal Inland Revenue Service",
    agencyShort: "FIRS",
    icon: "receipt",
    tagline: "The number you need to file returns and pay tax.",
    summary:
      "The TIN is your taxpayer identity. It is issued by FIRS or your state internal revenue service and is needed for company filings, bank facilities and many government contracts.",
    fee: "Free.",
    timeline: "Usually issued the same day on the online portal.",
    who: "Individuals with taxable income, employers, companies and other taxable entities.",
    requirements: [
      "Your NIN for an individual, or the CAC registration number for a company",
      "A valid email address and phone number",
      "Proof of address",
      "A bank account in the taxpayer's name where requested",
    ],
    steps: [
      {
        title: "Create a TaxPro Max account",
        detail:
          "Sign up on FIRS's TaxPro Max portal with your email and phone number.",
      },
      {
        title: "Choose your taxpayer type",
        detail:
          "Register as an individual, business or company. Companies enter their CAC number so the records match.",
      },
      {
        title: "Submit and confirm",
        detail:
          "Complete your profile and submit. The TIN is generated on the portal and sent to your email.",
      },
      {
        title: "File your returns",
        detail:
          "Use the same portal to file annual returns and pay assessments. Keep evidence of every payment.",
      },
    ],
    official: [
      { label: "FIRS: TaxPro Max", url: "https://taxpromax.firs.gov.ng/" },
      { label: "FIRS", url: "https://firs.gov.ng/" },
    ],
    sourceIds: ["firs-taxpromax", "firs-home"],
  },
  {
    slug: "jamb",
    name: "JAMB and UTME",
    short: "JAMB",
    agency: "Joint Admissions and Matriculation Board",
    agencyShort: "JAMB",
    icon: "cap",
    tagline: "Register for UTME and check your admission.",
    summary:
      "JAMB runs the Unified Tertiary Matriculation Examination and coordinates admission into Nigerian universities, polytechnics and colleges of education. Registration is annual and done through the JAMB portal and accredited centres.",
    fee: "About ₦7,700 for the UTME form, plus optional mock and CBT charges.",
    timeline: "Registration runs for a few weeks each year; results follow the exam.",
    who: "Candidates seeking admission into tertiary institutions, and direct entry applicants.",
    requirements: [
      "A valid National Identification Number (NIN)",
      "O'level results or awaiting results",
      "A personal email address and phone number",
      "A recent passport photograph",
      "Choice of institution and course",
    ],
    steps: [
      {
        title: "Create a profile",
        detail:
          "Register on the JAMB portal with your NIN and personal details. Keep the profile code safe.",
      },
      {
        title: "Pay and choose a centre",
        detail:
          "Pay through the approved channels and select an accredited CBT centre for biometrics and the exam.",
      },
      {
        title: "Sit the exam",
        detail:
          "Attend with your registration slip and identification. Check your result on the JAMB eFacility afterwards.",
      },
      {
        title: "Track admission",
        detail:
          "Use the eFacility to accept or reject admission offers and to print your admission letter.",
      },
    ],
    official: [
      { label: "JAMB eFacility", url: "https://jamb.gov.ng/efacility" },
      { label: "JAMB portal", url: "https://portal.jamb.gov.ng/" },
    ],
    sourceIds: ["jamb-efacility", "jamb-portal", "jamb-home"],
  },
  {
    slug: "nysc",
    name: "NYSC national service",
    short: "NYSC",
    agency: "National Youth Service Corps",
    agencyShort: "NYSC",
    icon: "flag",
    tagline: "Register for the one-year service year.",
    summary:
      "The National Youth Service Corps is a one-year programme for Nigerian graduates of accredited institutions. Prospective corps members register online, get deployed to a state, and report to camp with their call-up letter.",
    fee: "Registration is free. Transport and personal expenses are yours.",
    timeline: "Registration opens in batches; service lasts one year.",
    who: "Nigerian graduates under 30 from accredited universities, polytechnics and colleges of education.",
    requirements: [
      "Statement of result or degree certificate",
      "Official transcript where required",
      "Valid identification and NIN",
      "Passport photograph",
      "Institution matriculation number",
    ],
    steps: [
      {
        title: "Confirm your eligibility",
        detail:
          "Check that your institution has submitted your name on the NYSC senate list for your batch.",
      },
      {
        title: "Register on the NYSC portal",
        detail:
          "Create an account, upload your documents and choose your preferred states for deployment.",
      },
      {
        title: "Print your call-up letter",
        detail:
          "After registration closes, download the call-up letter and green card from the portal.",
      },
      {
        title: "Report to camp",
        detail:
          "Travel to your deployment state on the date shown. Bring original documents for verification.",
      },
    ],
    official: [
      { label: "NYSC portal", url: "https://portal.nysc.gov.ng/" },
      { label: "NYSC", url: "https://nysc.gov.ng/" },
    ],
    sourceIds: ["nysc-home", "nysc-portal"],
  },
  {
    slug: "nelfund",
    name: "Student loan",
    short: "NELFUND",
    agency: "Nigerian Education Loan Fund",
    agencyShort: "NELFUND",
    icon: "wallet",
    tagline: "Federal support for tuition and living costs.",
    summary:
      "NELFUND administers the federal student loan. Eligible students in accredited tertiary institutions can apply for tuition support and a monthly upkeep allowance, repaid after national service and employment.",
    fee: "Free to apply. The loan is repaid after graduation.",
    timeline: "Applications open in windows; approval follows institution verification.",
    who: "Nigerian students in accredited public tertiary institutions who meet the scheme's criteria.",
    requirements: [
      "Admission letter or current student status",
      "Institution and matriculation number",
      "NIN and Bank Verification Number (BVN)",
      "A bank account in your own name",
      "A guarantor where the scheme requires one",
    ],
    steps: [
      {
        title: "Create a NELFUND account",
        detail:
          "Register on the NELFUND portal with your NIN, email and phone number.",
      },
      {
        title: "Verify your student record",
        detail:
          "Select your institution and enter your matriculation number so the school can confirm you.",
      },
      {
        title: "Apply for tuition or upkeep",
        detail:
          "Choose the support you need and upload the documents requested. Upkeep is paid monthly to your account.",
      },
      {
        title: "Track the decision",
        detail:
          "Check the portal for approval and disbursement. Contact your school's student affairs office if verification stalls.",
      },
    ],
    official: [
      { label: "NELFUND", url: "https://nelfund.gov.ng/" },
      { label: "Government services portal", url: "https://services.gov.ng/" },
    ],
    sourceIds: ["nelfund-home", "egov-services"],
  },
  {
    slug: "bvn",
    name: "Bank Verification Number",
    short: "BVN",
    agency: "Nigeria Inter-Bank Settlement System",
    agencyShort: "NIBSS",
    icon: "bank",
    tagline: "One number linked to all your bank accounts.",
    summary:
      "The BVN is an eleven-digit number that links your biometrics to every bank account you hold. It is issued by your bank and operated nationally by NIBSS for the Central Bank of Nigeria.",
    fee: "Free at your bank. Agents may charge for enrolment support.",
    timeline: "Issued immediately after biometric capture at a bank branch.",
    who: "Anyone opening or operating a bank account in Nigeria.",
    requirements: [
      "A valid means of identification: NIN slip, passport, driver's licence or voter's card",
      "Your bank account details",
      "A phone number linked to the account",
      "Your fingerprint and photograph at the branch",
    ],
    steps: [
      {
        title: "Visit your bank",
        detail:
          "Go to a branch of any bank where you hold an account and ask for BVN enrolment.",
      },
      {
        title: "Complete the form",
        detail:
          "Provide your names, date of birth, address and identification exactly as they appear on your documents.",
      },
      {
        title: "Capture biometrics",
        detail:
          "Your fingerprints and photograph are taken and sent to NIBSS.",
      },
      {
        title: "Link other accounts",
        detail:
          "Give the BVN to every other bank you use so all your accounts are linked to one identity.",
      },
    ],
    official: [
      { label: "NIBSS", url: "https://nibss-plc.com.ng/" },
      { label: "Central Bank of Nigeria", url: "https://www.cbn.gov.ng/" },
    ],
    sourceIds: ["nibss-home", "cbn-home"],
  },
];

export const serviceBySlug = new Map(services.map((service) => [service.slug, service]));

export const featuredServices = services.filter((service) =>
  ["nin", "passport", "drivers-licence", "cac", "tin", "jamb", "nysc", "nelfund", "bvn"].includes(
    service.slug,
  ),
);
