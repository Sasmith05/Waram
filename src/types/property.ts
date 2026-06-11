export interface Property {
  id: string;
  slug: string;
  title: string;
  title_en?: string;
  title_ta?: string;
  property_type: 'residential-plots' | 'agricultural-lands' | 'commercial-lands' | 'farm-lands' | 'investment-properties';
  categoryDisplay?: string;
  location?: string;
  area: string;
  price: number;
  price_display: string;
  description: string;
  description_en?: string;
  description_ta?: string;
  detailed_description: string;
  map_url?: string;
  latitude?: number;
  longitude?: number;
  featured: boolean;
  status: 'available' | 'sold';
  survey_number?: string;
  patta_status?: string;
  road_access?: string;
  water_availability?: string;
  electricity_availability?: string;
  features: string[];
  nearby_facilities: NearbyFacility[];
  created_at?: string;
  images?: string[]; // Joint property URL string array helper
}

export interface NearbyFacility {
  name: string;
  distance: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  created_at?: string;
}

export interface Enquiry {
  id: string;
  property_id?: string;
  property_title?: string; // Joined title name from properties table
  name: string;
  phone: string;
  email?: string;
  message: string;
  created_at?: string;
}
