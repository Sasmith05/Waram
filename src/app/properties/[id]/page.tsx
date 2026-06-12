import React from "react";
import { propertiesData } from "@/data/properties";
import { supabase } from "@/lib/supabase";
import PropertyDetailClientView from "./PropertyDetailClientView";

export const dynamic = "force-dynamic";

const categories = [
  { value: "all", label: "All Properties" },
  { value: "residential-plots", label: "Residential Plots" },
  { value: "agricultural-lands", label: "Agricultural Lands" },
  { value: "commercial-lands", label: "Commercial Lands" },
  { value: "farm-lands", label: "Farm Lands" },
  { value: "investment-properties", label: "Investment Properties" }
];

export async function generateStaticParams() {
  return propertiesData.map((property) => ({
    id: property.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  let property: any = null;
  
  try {
    let data = null;
    const { data: idData } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    if (idData) {
      data = idData;
    } else {
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
        priceDisplay: `₹${Number(data.price).toLocaleString("en-IN")}`,
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

  // Fallback to static mock data if offline or not found
  if (!property) {
    const staticProp = propertiesData.find(
      (p) => p.id === id || p.slug === id
    );
    if (staticProp) {
      property = {
        ...staticProp,
        category: staticProp.category,
        categoryDisplay: staticProp.categoryDisplay,
        priceDisplay: staticProp.priceDisplay,
        detailedDescription: staticProp.detailedDescription,
        surveyNumber: staticProp.surveyNumber,
        pattaStatus: staticProp.pattaStatus,
        roadAccess: staticProp.roadAccess,
        waterAvailability: staticProp.waterAvailability,
        electricityAvailability: staticProp.electricityAvailability,
        googleMapsEmbedUrl: staticProp.googleMapsEmbedUrl,
        googleMapsRedirectUrl: staticProp.googleMapsRedirectUrl,
        nearbyFacilities: staticProp.nearbyFacilities || []
      };
    }
  }

  return <PropertyDetailClientView id={id} initialProperty={property} />;
}
