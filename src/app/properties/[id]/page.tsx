import React from "react";
import { supabase } from "@/lib/supabase";
import PropertyDetailClientView from "./PropertyDetailClientView";

// Force every request to hit the DB — no static pre-rendering
// This ensures newly created or deleted properties reflect immediately
export const dynamic = "force-dynamic";

const categories = [
  { value: "all", label: "All Properties" },
  { value: "residential-plots", label: "Residential Plots" },
  { value: "agricultural-lands", label: "Agricultural Lands" },
  { value: "commercial-lands", label: "Commercial Lands" },
  { value: "farm-lands", label: "Farm Lands" },
  { value: "investment-properties", label: "Investment Properties" }
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  let property: any = null;
  
  try {
    // First try to find by ID
    const { data: idData } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    let data = idData;

    // If not found by ID, try slug
    if (!data) {
      const { data: slugData } = await supabase
        .from("properties")
        .select("*")
        .eq("slug", id)
        .single();
      data = slugData;
    }

    if (data) {
      const catObj = categories.find((cat) => cat.value === data.property_type);
      property = {
        ...data,
        category: data.property_type,
        categoryDisplay: catObj ? catObj.label : data.property_type,
        // Derive priceDisplay at render time since it's not a DB column
        priceDisplay: `\u20b9${Number(data.price).toLocaleString("en-IN")}`,
        detailedDescription: data.detailed_description,
        surveyNumber: data.survey_number,
        pattaStatus: data.patta_status,
        roadAccess: data.road_access,
        waterAvailability: data.water_availability,
        electricityAvailability: data.electricity_availability,
        googleMapsEmbedUrl: data.map_url,
        googleMapsRedirectUrl: data.map_url,
        nearbyFacilities: data.nearby_facilities || []
      };
    }
  } catch (err) {
    console.error("Failed to query property details from Supabase on server", err);
  }

  return <PropertyDetailClientView id={id} initialProperty={property} />;
}
