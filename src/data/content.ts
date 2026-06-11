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
  googleMapShareUrl: string;
  whatsappNumber: string; // format: 91XXXXXXXXXX
  whatsappMessage: string;
}

export const advocateProfile: AdvocateProfile = {
  name: "Advocate S. Rajasekar",
  title: "B.A., B.L. | Advocate & Notary Public | Founder, Waram Documentation",
  aboutShort: "Professional legal consultation, notary public services, and land registration assistance in Rameswaram. Led by Advocate S. Rajasekar, dedicated to providing trustworthy guidance, accurate documentation, and seamless legal solutions.",
  aboutFull: "Advocate S. Rajasekar has been practicing law since 1996, with extensive experience in Civil Law, Property Law, and Banking Law. Over the years, he has successfully represented clients before courts exercising both original and appellate jurisdiction while providing trusted legal guidance to individuals, businesses, and financial institutions.\n\nAs an Empanelled Advocate for Nationalised and Public Sector Banks, he specializes in Title Verification, Title Scrutiny, Title Opinions, Mortgage Documentation, and Legal Due Diligence. His expertise includes examining property records, assessing legal risks, and providing comprehensive legal opinions that support informed decision-making.\n\nWith 14 years of experience as a Notary Public, Advocate Rajasekar has handled a wide range of notarization and authentication services, including affidavits, declarations, agreements, powers of attorney, and other legal instruments. This experience has strengthened his expertise in legal documentation, compliance, and procedural accuracy.\n\nHe also provides legal counselling and advisory services, helping clients understand their legal position and identify practical, result-oriented solutions to disputes and legal challenges.\n\nAdvocate Rajasekar is the Founder of Waram Documentation, a professional service dedicated to legal documentation, property-related paperwork, registration assistance, and consultancy services.\n\nHis professional approach is guided by integrity, diligence, transparency, and client-focused service, ensuring every client receives reliable legal support with confidence and clarity.",
  qualifications: [
    "Bachelor of Arts (B.A.)",
    "Bachelor of Law (B.L.)"
  ],
  practiceAreas: [
    "Civil Law",
    "Property Law",
    "Banking Law",
    "Legal Consultation",
    "Land Registration",
    "Title Verification & Scrutiny",
    "Title Opinions",
    "Legal Due Diligence",
    "Mortgage Documentation",
    "Notarial Services",
    "Legal Drafting",
    "Litigation",
    "Appellate Practice",
    "Legal Counselling",
    "Dispute Resolution",
    "Documentation Services"
  ],
  languages: ["English", "Tamil"],
  registrations: [
    "Bar Council Registration (Since 1996)",
    "Notary Public License (14+ Years)"
  ]
};
 
export const servicesData: ServiceItem[] = [
  {
    id: "legal-consultation",
    title: "Legal Consultation",
    description: "Professional legal advice and guidance on civil, property, and legal matters.",
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
  phoneDisplay: "+91 87605 55585",
  email: "notaryrajasekar@gmail.com",
  address: "12/8A RAMAR THEERTHAM NORTH, RAMESWARAM, TAMIL NADU 623526, INDIA",
  googleMapEmbedUrl: "https://maps.google.com/maps?q=12/8A+Ramar+Theertham+North,+Rameswaram,+Tamil+Nadu+623526&t=&z=16&ie=UTF8&iwloc=&output=embed",
  googleMapShareUrl: "https://share.google/p1n59OQ0cIwjkIQw7",
  whatsappNumber: "918760555585",
  whatsappMessage: "Hello, I would like to enquire about your legal consultation services."
};
