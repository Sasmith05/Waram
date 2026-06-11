export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to dynamic render lucide icons
  details: string[];
}

export interface AdvocateProfile {
  name: string;
  title: string;
  experienceYears?: number;
  aboutShort: string;
  aboutFull: string;
  qualifications: string[];
  practiceAreas: string[];
  languages: string[];
  registrations: string[];
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  googleMapEmbedUrl: string;
  whatsappNumber: string; // format: 91XXXXXXXXXX
  whatsappMessage: string;
}

export const advocateProfile: AdvocateProfile = {
  name: "Advocate S Rajasekar",
  title: "Advocate & Legal Consultant",
  aboutShort: "Providing professional legal consultation, notary services, and land registration assistance with a commitment to accuracy, transparency, and client satisfaction.",
  aboutFull: "Advocate S Rajasekar provides dedicated legal services, notary verification, and land registration coordination at Waram Documentation Office in Rameswaram. With a strict adherence to professional standards, client satisfaction, and legal accuracy, we guide individuals and businesses through registration deeds and advisory consults.",
  qualifications: [
    "Bachelor of Laws (LL.B)",
    "Member of Bar Council of Tamil Nadu & Puducherry",
    "Appointed Notary Public & Document Writer"
  ],
  practiceAreas: [
    "Legal Consultation & Advice",
    "Notary Public Services",
    "Land Registration Assistance",
    "Property Title Verification"
  ],
  languages: ["English", "Tamil"],
  registrations: [
    "Bar Council Registration",
    "Notary License Authority"
  ]
};

export const servicesData: ServiceItem[] = [
  {
    id: "legal-consultation",
    title: "Legal Consultation",
    description: "Professional legal advice and guidance on civil, property, documentation, and legal matters.",
    iconName: "Scale",
    details: [
      "Civil and property dispute advisory services",
      "Documentation scrutiny and legal risk evaluations",
      "Drafting legal opinions and formal notices",
      "Guidance on litigation pathways and dispute resolution"
    ]
  },
  {
    id: "notary-services",
    title: "Notary Services",
    description: "Document attestation, declarations, certifications, and notarial services.",
    iconName: "FileSignature",
    details: [
      "Attestation of copy documents and signature verifications",
      "Administration of oaths, affirmations, and statutory declarations",
      "Preparation and certification of affidavits",
      "Notarization of power of attorney documents"
    ]
  },
  {
    id: "land-registration",
    title: "Land Registration",
    description: "Property registration assistance, land documentation, registration procedures, and related legal support.",
    iconName: "Map",
    details: [
      "Title search and past ownership verification reports",
      "Drafting and execution of sale deeds, gift deeds, and release deeds",
      "Stamp duty calculations and sub-registrar scheduling",
      "Assistance with mutation of records and patta transfers"
    ]
  }
];

export const contactInfo: ContactInfo = {
  phone: "+918760555585",
  phoneDisplay: "87605 55585",
  email: "contact@srajasekar.in",
  address: "Waram Documentation Office, Rameswaram, Tamil Nadu",
  googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15764.08867375267!2d79.30058863618165!3d9.28822004245642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b01e231ab3dc849%3A0xb3debb731a57cf43!2sRameswaram%2C%20Tamil%20Nadu%20623526!5e0!3m2!1sen!2sin!4v1717000000000!5m2!1sen!2sin",
  whatsappNumber: "918760555585",
  whatsappMessage: "Hello Advocate S Rajasekar, I would like to schedule a consultation regarding your services."
};
