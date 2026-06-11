"use client";

import React, { useState, useEffect } from "react";
import { propertiesData } from "@/data/properties";
import { supabase } from "@/lib/supabase";
import PropertyCard from "@/components/PropertyCard";

const categories = [
  { value: "all", label: "All Properties" },
  { value: "residential-plots", label: "Residential Plots" },
  { value: "agricultural-lands", label: "Agricultural Lands" },
  { value: "commercial-lands", label: "Commercial Lands" },
  { value: "farm-lands", label: "Farm Lands" },
  { value: "investment-properties", label: "Investment Properties" }
];

export default function PropertiesListing() {
  const [properties, setProperties] = useState<any[]>(propertiesData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("properties").select("*");
        if (error) throw error;
        if (data && data.length > 0) {
          const mapped = data.map((p: any) => {
            const catObj = categories.find((cat) => cat.value === p.property_type);
            return {
              ...p,
              category: p.property_type,
              categoryDisplay: catObj ? catObj.label : p.property_type,
              priceDisplay: `₹${Number(p.price).toLocaleString("en-IN")}`
            };
          });
          setProperties(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch public properties from Supabase", err);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  return (
    <div className="relative pt-20 pb-16 bg-white text-slate-900 font-sans min-h-screen">
      {/* Background Decorative Accents */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">Browse Catalog</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide">
            Available Properties & <span className="gold-text-gradient">Land Opportunities</span>
          </h1>
          <div className="h-[2px] w-20 bg-gold-500 mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Browse available residential plots, agricultural lands, and investment properties with complete details, images, and location information.
          </p>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-gold-500 animate-spin"></div>
            </div>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-12 text-center max-w-2xl mx-auto space-y-4">
            <p className="text-slate-500 font-semibold text-lg">No properties found.</p>
            <p className="text-slate-400 text-sm">Please check back later for available listings.</p>
          </div>
        )}

      </div>
    </div>
  );
}
