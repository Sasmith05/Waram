export interface Property {
  id: string;
  slug?: string;
  title: string;
  category: 'residential-plots' | 'agricultural-lands' | 'commercial-lands' | 'farm-lands' | 'investment-properties';
  categoryDisplay: string;
  images: string[];
  location?: string;
  area: string;
  price: number;
  priceDisplay: string;
  description: string;
  detailedDescription: string;
  googleMapsEmbedUrl?: string;
  googleMapsRedirectUrl?: string;
  status: 'available' | 'sold';
  surveyNumber?: string;
  pattaStatus?: string;
  roadAccess: string;
  waterAvailability: string;
  electricityAvailability: string;
  features: string[];
  nearbyFacilities: { name: string; distance: string }[];
  isFeatured: boolean;
}

export const propertiesData: Property[] = [
  {
    id: "residential-plot-paramakudi",
    title: "DTCP Approved Residential Plot",
    category: "residential-plots",
    categoryDisplay: "Residential Plots",
    images: ["/properties/plot1.png", "/properties/plot2.png", "/properties/plot3.png"],
    location: "Paramakudi",
    area: "5 Cents",
    price: 500000,
    priceDisplay: "₹5,00,000",
    description: "DTCP-approved residential plot suitable for immediate registration and construction.",
    detailedDescription: "Well-located residential property with clear title, excellent road access, and registration-ready documentation. Positioned in a rapidly growing neighborhood of Paramakudi, this plot offers the perfect foundation for building a dream home. The layout is fully approved under DTCP regulations, ensuring secure property lines and immediate patta transfer availability.",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=9.5444%2C78.5914&t=&z=14&ie=UTF8&iwloc=&output=embed",
    googleMapsRedirectUrl: "https://www.google.com/maps/search/?api=1&query=9.5444%2C78.5914",
    surveyNumber: "245/2B",
    pattaStatus: "Single Patta Available",
    roadAccess: "30 Feet Tar Road",
    waterAvailability: "Sweet Ground Water (Borewell ready)",
    electricityAvailability: "3-Phase Power Connection Nearby",
    features: [
      "Clear Title",
      "Registration Ready",
      "Patta Available",
      "Road Access",
      "Water Facility",
      "Prime Location"
    ],
    nearbyFacilities: [
      { name: "Paramakudi Bus Stand", distance: "1.5 km" },
      { name: "Government Hospital", distance: "2.0 km" },
      { name: "Matriculation School", distance: "1.0 km" },
      { name: "Nationalized Banks & ATMs", distance: "1.2 km" }
    ],
    isFeatured: true,
    status: "available"
  },
  {
    id: "agricultural-coconut-grove-rameswaram",
    title: "Fertile Coconut Grove (Agricultural Land)",
    category: "agricultural-lands",
    categoryDisplay: "Agricultural Lands",
    images: ["/properties/plot2.png", "/properties/plot3.png", "/properties/plot1.png"],
    location: "Rameswaram",
    area: "1.2 Acres",
    price: 1500000,
    priceDisplay: "₹15,00,000",
    description: "High-yield fertile agricultural land featuring an established coconut grove with free farm electricity.",
    detailedDescription: "A prime piece of agricultural land containing mature, yielding coconut palms. The soil is highly fertile and regularly cultivated. Located in a scenic area of Rameswaram with close access to sub-registrar offices, this property features clear titles and single-owner patta documents. Excellent for ongoing farming or agricultural development.",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=9.2881%2C79.3129&t=&z=14&ie=UTF8&iwloc=&output=embed",
    googleMapsRedirectUrl: "https://www.google.com/maps/search/?api=1&query=9.2881%2C79.3129",
    surveyNumber: "112/4",
    pattaStatus: "Joint Patta Available",
    roadAccess: "20 Feet Dirt Road (Accessible by Tractor/SUV)",
    waterAvailability: "Large Open Well with active motor pump",
    electricityAvailability: "Free Agricultural EB Service Connection",
    features: [
      "Clear Title",
      "Patta Available",
      "Water Facility",
      "Free Farm Electricity",
      "Yielding Trees"
    ],
    nearbyFacilities: [
      { name: "Rameswaram Main Market", distance: "3.0 km" },
      { name: "Local Cooperative Bank", distance: "3.5 km" },
      { name: "National Highway NH-49 Link", distance: "1.8 km" }
    ],
    isFeatured: true,
    status: "available"
  },
  {
    id: "commercial-nh49-frontage-devipattinam",
    title: "Commercial Plot near NH-49 Highway",
    category: "commercial-lands",
    categoryDisplay: "Commercial Lands",
    images: ["/properties/plot3.png", "/properties/plot1.png", "/properties/plot2.png"],
    location: "Devipattinam",
    area: "12 Cents",
    price: 3500000,
    priceDisplay: "₹35,00,000",
    description: "Prime commercial land featuring direct NH-49 highway frontage, ideal for warehouses or showrooms.",
    detailedDescription: "Highly visible commercial plot boasting 80 feet of frontage directly facing the NH-49 highway in Devipattinam. This plot is perfectly suited for commercial development, showrooms, retail spaces, or warehouse facilities. The property enjoys fully verified, clear litigation-free documents ready for immediate sale deed execution.",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=9.4792%2C78.9056&t=&z=14&ie=UTF8&iwloc=&output=embed",
    googleMapsRedirectUrl: "https://www.google.com/maps/search/?api=1&query=9.4792%2C78.9056",
    surveyNumber: "88/1A",
    pattaStatus: "Individual Patta Available",
    roadAccess: "80 Feet NH-49 Highway Frontage",
    waterAvailability: "Municipal Water Supply Line Connection",
    electricityAvailability: "Commercial HT/LT Electricity Grid Access",
    features: [
      "Clear Title",
      "Registration Ready",
      "Road Access",
      "Electricity Facility",
      "Prime Location",
      "Highway Frontage"
    ],
    nearbyFacilities: [
      { name: "Devipattinam Bus Stand", distance: "0.5 km" },
      { name: "Ramanathapuram Junction Station", distance: "12.0 km" },
      { name: "State Bank of India & ATM", distance: "0.2 km" }
    ],
    isFeatured: true,
    status: "available"
  },
  {
    id: "sree-nagar-investment-paramakudi",
    title: "Sree Nagar Investment Property",
    category: "investment-properties",
    categoryDisplay: "Investment Properties",
    images: ["/properties/plot4.png", "/properties/plot5.png", "/properties/plot3.png"],
    location: "Paramakudi",
    area: "8 Cents",
    price: 800000,
    priceDisplay: "₹8,00,000",
    description: "Rapidly appreciating layout plot in Sree Nagar, perfect for long-term investment.",
    detailedDescription: "Located in the rapidly expanding suburban belt of Paramakudi, this investment plot offers a high appreciation yield. The area is surrounded by recent residential villa developments and infrastructure growth. Titles are verified and validated by legal experts, ensuring a safe transaction.",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=9.5512%2C78.5789&t=&z=14&ie=UTF8&iwloc=&output=embed",
    googleMapsRedirectUrl: "https://www.google.com/maps/search/?api=1&query=9.5512%2C78.5789",
    surveyNumber: "310/6C",
    pattaStatus: "Patta Available",
    roadAccess: "24 Feet Gravel Road",
    waterAvailability: "Ground Water available at 40 feet depth",
    electricityAvailability: "Domestic EB Power Lines Ready",
    features: [
      "Clear Title",
      "Registration Ready",
      "Patta Available",
      "High Growth Zone"
    ],
    nearbyFacilities: [
      { name: "Paramakudi Railway Station", distance: "3.0 km" },
      { name: "Public High School", distance: "1.5 km" },
      { name: "Sree Nagar Local Market", distance: "2.5 km" }
    ],
    isFeatured: false,
    status: "available"
  },
  {
    id: "vgp-layout-farm-land-rameswaram",
    title: "VGP Layout Farm Land Plot",
    category: "farm-lands",
    categoryDisplay: "Farm Lands",
    images: ["/properties/plot5.png", "/properties/plot1.png", "/properties/plot2.png"],
    location: "Rameswaram",
    area: "25 Cents",
    price: 1200000,
    priceDisplay: "₹12,00,000",
    description: "Farm land plot inside a secure gated community layout, close to the coastal highway.",
    detailedDescription: "A premium farm land layout plot inside a secure gated community in Rameswaram. The layout includes plantation trees and is situated close to the sea, making it a perfect spot for setting up a holiday farmhouse or vacation cottage. Full road access and common water facilities are managed by the layout association.",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=9.2745%2C79.2882&t=&z=14&ie=UTF8&iwloc=&output=embed",
    googleMapsRedirectUrl: "https://www.google.com/maps/search/?api=1&query=9.2745%2C79.2882",
    surveyNumber: "412/1",
    pattaStatus: "Patta Available",
    roadAccess: "25 Feet Tar Road inside layout",
    waterAvailability: "Common Overhead Water Supply connection",
    electricityAvailability: "Domestic EB Connection Active",
    features: [
      "Clear Title",
      "Registration Ready",
      "Road Access",
      "Water Facility",
      "Gated Community Layout"
    ],
    nearbyFacilities: [
      { name: "Rameswaram Beach front", distance: "1.5 km" },
      { name: "Rameswaram Temple Bus Stand", distance: "6.0 km" },
      { name: "Fish Market & Port", distance: "5.0 km" }
    ],
    isFeatured: true,
    status: "available"
  }
];
