import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// -------------------------------------------------------------
// 1. DOCK REAL ESTATE STATIC SEED DATA (Sourced from propertiesData)
// -------------------------------------------------------------
const mockStaticProperties = [
  {
    id: "a39b4b0e-6f81-4560-8438-bb4e0ef4b2be",
    slug: "residential-plot-paramakudi",
    title: "DTCP Approved Residential Plot",
    property_type: "residential-plots",
    location: "Paramakudi",
    area: "5 Cents",
    price: 500000,
    price_display: "₹5,00,000",
    description: "DTCP-approved residential plot suitable for immediate registration and construction.",
    detailed_description: "Well-located residential property with clear title, excellent road access, and registration-ready documentation. Positioned in a rapidly growing neighborhood of Paramakudi, this plot offers the perfect foundation for building a dream home. The layout is fully approved under DTCP regulations, ensuring secure property lines and immediate patta transfer availability.",
    map_url: "https://maps.google.com/maps?q=9.5444%2C78.5914&t=&z=14&ie=UTF8&iwloc=&output=embed",
    latitude: 9.5444,
    longitude: 78.5914,
    featured: true,
    status: "available",
    survey_number: "245/2B",
    patta_status: "Single Patta Available",
    road_access: "30 Feet Tar Road",
    water_availability: "Sweet Ground Water (Borewell ready)",
    electricity_availability: "3-Phase Power Connection Nearby",
    features: ["Clear Title", "Registration Ready", "Patta Available", "Road Access", "Water Facility", "Prime Location"],
    nearby_facilities: [
      { name: "Paramakudi Bus Stand", distance: "1.5 km" },
      { name: "Government Hospital", distance: "2.0 km" },
      { name: "Matriculation School", distance: "1.0 km" },
      { name: "Nationalized Banks & ATMs", distance: "1.2 km" }
    ],
    created_at: "2026-06-11T12:00:00Z",
    images: ["/properties/plot1.png", "/properties/plot2.png", "/properties/plot3.png"]
  },
  {
    id: "b45c22e4-921a-4712-8409-f81d89ad11ff",
    slug: "agricultural-coconut-grove-rameswaram",
    title: "Fertile Coconut Grove (Agricultural Land)",
    property_type: "agricultural-lands",
    location: "Rameswaram",
    area: "1.2 Acres",
    price: 1500000,
    price_display: "₹15,00,000",
    description: "High-yield fertile agricultural land featuring an established coconut grove with free farm electricity.",
    detailed_description: "A prime piece of agricultural land containing mature, yielding coconut palms. The soil is highly fertile and regularly cultivated. Located in a scenic area of Rameswaram with close access to sub-registrar offices, this property features clear titles and single-owner patta documents. Excellent for ongoing farming or agricultural development.",
    map_url: "https://maps.google.com/maps?q=9.2881%2C79.3129&t=&z=14&ie=UTF8&iwloc=&output=embed",
    latitude: 9.2881,
    longitude: 79.3129,
    featured: true,
    status: "available",
    survey_number: "112/4",
    patta_status: "Joint Patta Available",
    road_access: "20 Feet Dirt Road (Accessible by Tractor/SUV)",
    water_availability: "Large Open Well with active motor pump",
    electricity_availability: "Free Agricultural EB Service Connection",
    features: ["Clear Title", "Patta Available", "Water Facility", "Free Farm Electricity", "Yielding Trees"],
    nearby_facilities: [
      { name: "Rameswaram Main Market", distance: "3.0 km" },
      { name: "Local Cooperative Bank", distance: "3.5 km" },
      { name: "National Highway NH-49 Link", distance: "1.8 km" }
    ],
    created_at: "2026-06-11T12:05:00Z",
    images: ["/properties/plot2.png", "/properties/plot3.png", "/properties/plot1.png"]
  },
  {
    id: "f3c21a4f-569d-4ef9-bb99-f2e1a3b1900d",
    slug: "commercial-nh49-frontage-devipattinam",
    title: "Commercial Plot near NH-49 Highway",
    property_type: "commercial-lands",
    location: "Devipattinam",
    area: "12 Cents",
    price: 3500000,
    price_display: "₹35,00,000",
    description: "Prime commercial land featuring direct NH-49 highway frontage, ideal for warehouses or showrooms.",
    detailed_description: "Highly visible commercial plot boasting 80 feet of frontage directly facing the NH-49 highway in Devipattinam. This plot is perfectly suited for commercial development, showrooms, retail spaces, or warehouse facilities. The property enjoys fully verified, clear litigation-free documents ready for immediate sale deed execution.",
    map_url: "https://maps.google.com/maps?q=9.4792%2C78.9056&t=&z=14&ie=UTF8&iwloc=&output=embed",
    latitude: 9.4792,
    longitude: 78.9056,
    featured: true,
    status: "available",
    survey_number: "88/1A",
    patta_status: "Individual Patta Available",
    road_access: "80 Feet NH-49 Highway Frontage",
    water_availability: "Municipal Water Supply Line Connection",
    electricity_availability: "Commercial HT/LT Electricity Grid Access",
    features: ["Clear Title", "Registration Ready", "Road Access", "Electricity Facility", "Prime Location", "Highway Frontage"],
    nearby_facilities: [
      { name: "Devipattinam Bus Stand", distance: "0.5 km" },
      { name: "Ramanathapuram Junction Station", distance: "12.0 km" },
      { name: "State Bank of India & ATM", distance: "0.2 km" }
    ],
    created_at: "2026-06-11T12:10:00Z",
    images: ["/properties/plot3.png", "/properties/plot1.png", "/properties/plot2.png"]
  },
  {
    id: "d820cc9c-443b-4819-bf9f-27361be3dd4c",
    slug: "sree-nagar-investment-paramakudi",
    title: "Sree Nagar Investment Property",
    property_type: "investment-properties",
    location: "Paramakudi",
    area: "8 Cents",
    price: 800000,
    price_display: "₹8,00,000",
    description: "Rapidly appreciating layout plot in Sree Nagar, perfect for long-term investment.",
    detailed_description: "Located in the rapidly expanding suburban belt of Paramakudi, this investment plot offers a high appreciation yield. The area is surrounded by recent residential villa developments and infrastructure growth. Titles are verified and validated by legal experts, ensuring a safe transaction.",
    map_url: "https://maps.google.com/maps?q=9.5512%2C78.5789&t=&z=14&ie=UTF8&iwloc=&output=embed",
    latitude: 9.5512,
    longitude: 78.5789,
    featured: false,
    status: "available",
    survey_number: "310/6C",
    patta_status: "Patta Available",
    road_access: "24 Feet Gravel Road",
    water_availability: "Ground Water available at 40 feet depth",
    electricity_availability: "Domestic EB Power Lines Ready",
    features: ["Clear Title", "Registration Ready", "Patta Available", "High Growth Zone"],
    nearby_facilities: [
      { name: "Paramakudi Railway Station", distance: "3.0 km" },
      { name: "Public High School", distance: "1.5 km" },
      { name: "Sree Nagar Local Market", distance: "2.5 km" }
    ],
    created_at: "2026-06-11T12:15:00Z",
    images: ["/properties/plot4.png", "/properties/plot5.png", "/properties/plot3.png"]
  },
  {
    id: "e903ab3d-cb11-4770-98df-88c9bb7df2f4",
    slug: "vgp-layout-farm-land-rameswaram",
    title: "VGP Layout Farm Land Plot",
    property_type: "farm-lands",
    location: "Rameswaram",
    area: "25 Cents",
    price: 1200000,
    price_display: "₹12,00,000",
    description: "Farm land plot inside a secure gated community layout, close to the coastal highway.",
    detailed_description: "A premium farm land layout plot inside a secure gated community in Rameswaram. The layout includes plantation trees and is situated close to the sea, making it a perfect spot for setting up a holiday farmhouse or vacation cottage. Full road access and common water facilities are managed by the layout association.",
    map_url: "https://maps.google.com/maps?q=9.2745%2C79.2882&t=&z=14&ie=UTF8&iwloc=&output=embed",
    latitude: 9.2745,
    longitude: 79.2882,
    featured: true,
    status: "available",
    survey_number: "412/1",
    patta_status: "Patta Available",
    road_access: "25 Feet Tar Road inside layout",
    water_availability: "Common Overhead Water Supply connection",
    electricity_availability: "Domestic EB Connection Active",
    features: ["Clear Title", "Registration Ready", "Road Access", "Water Facility", "Gated Community Layout"],
    nearby_facilities: [
      { name: "Rameswaram Beach front", distance: "1.5 km" },
      { name: "Rameswaram Temple Bus Stand", distance: "6.0 km" },
      { name: "Fish Market & Port", distance: "5.0 km" }
    ],
    created_at: "2026-06-11T12:20:00Z",
    images: ["/properties/plot5.png", "/properties/plot1.png", "/properties/plot2.png"]
  }
];

// Helper to load/save mock listings inside localStorage
function getLocalMockProperties(): any[] {
  if (typeof window === "undefined") return mockStaticProperties;
  const stored = localStorage.getItem("waram_mock_properties");
  if (!stored) {
    localStorage.setItem("waram_mock_properties", JSON.stringify(mockStaticProperties));
    return mockStaticProperties;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return mockStaticProperties;
  }
}

function saveLocalMockProperties(props: any[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("waram_mock_properties", JSON.stringify(props));
  }
}

// -------------------------------------------------------------
// 2. MOCK QUERY CHAIN BUILDER
// -------------------------------------------------------------
class MockQueryBuilder {
  private tableName: string;
  private filterField: string = "";
  private filterValue: any = null;
  private orderByField: string = "";
  private orderAscending: boolean = true;
  private limitCount: number = 0;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(selectString: string = "*") {
    return this;
  }

  eq(field: string, value: any) {
    this.filterField = field;
    this.filterValue = value;
    return this;
  }

  order(field: string, options: { ascending?: boolean } = {}) {
    this.orderByField = field;
    this.orderAscending = options.ascending ?? true;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  async single() {
    const res = await this.thenResolve();
    if (res.data && Array.isArray(res.data)) {
      return { data: res.data[0] || null, error: res.data[0] ? null : { message: "Not found" } };
    }
    return { data: res.data, error: res.error };
  }

  // Allow 'await' directly on the chain
  async then(onfulfilled: (res: { data: any; error: any }) => void) {
    const res = await this.thenResolve();
    onfulfilled(res);
  }

  private async thenResolve(): Promise<{ data: any; error: any }> {
    if (this.tableName === "properties") {
      let list = [...getLocalMockProperties()];

      // Filter by slug or ID
      if (this.filterField && this.filterValue !== null) {
        list = list.filter((p) => String(p[this.filterField]) === String(this.filterValue));
      }

      // Order
      if (this.orderByField) {
        list.sort((a, b) => {
          const valA = a[this.orderByField];
          const valB = b[this.orderByField];
          if (typeof valA === "number" && typeof valB === "number") {
            return this.orderAscending ? valA - valB : valB - valA;
          }
          return this.orderAscending
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
        });
      }

      // Limit
      if (this.limitCount > 0) {
        list = list.slice(0, this.limitCount);
      }

      return { data: list, error: null };
    }

    if (this.tableName === "property_images") {
      // Mock images join result
      const allProps = getLocalMockProperties();
      const images: any[] = [];
      allProps.forEach((p) => {
        if (p.images && Array.isArray(p.images)) {
          p.images.forEach((img: string, idx: number) => {
            images.push({
              id: `${p.id}-img-${idx}`,
              property_id: p.id,
              image_url: img,
              created_at: p.created_at
            });
          });
        }
      });

      let filtered = images;
      if (this.filterField && this.filterValue !== null) {
        filtered = images.filter((img) => String(img[this.filterField]) === String(this.filterValue));
      }
      return { data: filtered, error: null };
    }

    if (this.tableName === "enquiries") {
      if (typeof window === "undefined") return { data: [], error: null };
      const stored = localStorage.getItem("waram_mock_enquiries");
      let list: any[] = [];
      if (stored) {
        try {
          list = JSON.parse(stored);
        } catch {
          list = [];
        }
      }

      // Order by date desc
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      if (this.filterField && this.filterValue !== null) {
        list = list.filter((e) => String(e[this.filterField]) === String(this.filterValue));
      }

      return { data: list, error: null };
    }

    return { data: [], error: null };
  }

  // Database write actions
  async insert(payload: any | any[]) {
    const payloads = Array.isArray(payload) ? payload : [payload];

    if (this.tableName === "enquiries") {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("waram_mock_enquiries");
        let list: any[] = [];
        if (stored) {
          try {
            list = JSON.parse(stored);
          } catch {
            list = [];
          }
        }

        const newEnqs = payloads.map((p) => {
          const allProps = getLocalMockProperties();
          const property = allProps.find((pr) => pr.id === p.property_id);
          return {
            id: p.id || Math.random().toString(36).substr(2, 9),
            property_id: p.property_id,
            property_title: property ? property.title : "Unknown Property",
            name: p.name,
            phone: p.phone,
            email: p.email,
            message: p.message,
            created_at: p.created_at || new Date().toISOString()
          };
        });

        const updated = [...newEnqs, ...list];
        localStorage.setItem("waram_mock_enquiries", JSON.stringify(updated));
        return { data: newEnqs, error: null };
      }
    }

    if (this.tableName === "properties") {
      const list = getLocalMockProperties();
      const newProperties = payloads.map((p) => {
        const id = p.id || Math.random().toString(36).substr(2, 9) + "-" + Math.random().toString(36).substr(2, 9);
        return {
          id,
          slug: p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          title: p.title,
          property_type: p.property_type,
          location: p.location || "",
          area: p.area,
          price: Number(p.price),
          price_display: `₹${Number(p.price).toLocaleString("en-IN")}`,
          description: p.description,
          detailed_description: p.detailed_description,
          map_url: p.map_url || "",
          latitude: p.latitude || null,
          longitude: p.longitude || null,
          featured: !!p.featured,
          status: p.status || "available",
          survey_number: p.survey_number || "",
          patta_status: p.patta_status || "",
          road_access: p.road_access || "20 Feet Access Road",
          water_availability: p.water_availability || "Ground Water Available",
          electricity_availability: p.electricity_availability || "Grid Power Connection Nearby",
          features: p.features || [],
          nearby_facilities: p.nearby_facilities || [],
          created_at: new Date().toISOString(),
          images: p.images || []
        };
      });

      saveLocalMockProperties([...newProperties, ...list]);
      return { data: newProperties, error: null };
    }

    return { data: null, error: { message: "Mock insert failed" } };
  }

  async update(payload: any) {
    if (this.tableName === "properties") {
      const list = getLocalMockProperties();
      // Look for current filter constraints (e.g. eq('id', id))
      if (this.filterField === "id" && this.filterValue) {
        const idx = list.findIndex((p) => String(p.id) === String(this.filterValue));
        if (idx !== -1) {
          const updated = {
            ...list[idx],
            ...payload,
            // Format price_display if price is changing
            price_display: payload.price ? `₹${Number(payload.price).toLocaleString("en-IN")}` : list[idx].price_display
          };
          list[idx] = updated;
          saveLocalMockProperties(list);
          return { data: [updated], error: null };
        }
      }
    }
    return { data: null, error: { message: "Mock update failed" } };
  }

  async delete() {
    if (this.tableName === "properties") {
      const list = getLocalMockProperties();
      if (this.filterField === "id" && this.filterValue) {
        const filtered = list.filter((p) => String(p.id) !== String(this.filterValue));
        saveLocalMockProperties(filtered);
        return { data: [{ id: this.filterValue }], error: null };
      }
    }

    if (this.tableName === "enquiries") {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("waram_mock_enquiries");
        if (stored) {
          try {
            const list = JSON.parse(stored);
            if (this.filterField === "id" && this.filterValue) {
              const filtered = list.filter((e: any) => String(e.id) !== String(this.filterValue));
              localStorage.setItem("waram_mock_enquiries", JSON.stringify(filtered));
              return { data: [{ id: this.filterValue }], error: null };
            }
          } catch {
            // ignore
          }
        }
      }
    }

    return { data: null, error: { message: "Mock delete failed" } };
  }
}

// -------------------------------------------------------------
// 3. MOCK SUPABASE AUTH & STORAGE INTERFACES
// -------------------------------------------------------------
const mockAuth = {
  getSession: async () => {
    if (typeof window === "undefined") return { data: { session: null }, error: null };
    const activeSession = localStorage.getItem("waram_mock_session");
    if (activeSession === "true") {
      return { data: { session: { user: { email: "admin@waram.com", id: "admin-uid" } } }, error: null };
    }
    return { data: { session: null }, error: null };
  },
  signInWithPassword: async ({ email, password }: any) => {
    if (email === "admin@waram.com" && password === "admin123") {
      if (typeof window !== "undefined") {
        localStorage.setItem("waram_mock_session", "true");
      }
      return { data: { session: { user: { email, id: "admin-uid" } } }, error: null };
    }
    return { data: null, error: { message: "Invalid email or password. Use: admin@waram.com / admin123 for local mock mode." } };
  },
  signOut: async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("waram_mock_session");
    }
    return { error: null };
  },
  onAuthStateChange: (callback: any) => {
    // Thin subscription mock
    return { data: { subscription: { unsubscribe: () => {} } } };
  }
};

const mockStorage = {
  from: (bucketName: string) => ({
    upload: async (path: string, file: File) => {
      // Return a simulated URL path using object URL representation
      const fileUrl = `/properties/${Math.random().toString(36).substr(2, 5)}-${file.name}`;
      return { data: { path, publicUrl: fileUrl }, error: null };
    },
    getPublicUrl: (path: string) => {
      // Fallback path URL resolver simulation
      return { data: { publicUrl: `/properties/plot${Math.floor(Math.random() * 5) + 1}.png` } };
    },
    remove: async (paths: string[]) => {
      return { data: paths, error: null };
    }
  })
};

// -------------------------------------------------------------
// 4. SUPABASE INITIALIZER & WRAPPER
// -------------------------------------------------------------
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({
      from: (tableName: string) => new MockQueryBuilder(tableName),
      auth: mockAuth,
      storage: mockStorage
    } as any);
