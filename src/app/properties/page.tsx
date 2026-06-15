"use client";

import React, { useState, useEffect } from "react";
import { propertiesData } from "@/data/properties";
import { supabase } from "@/lib/supabase";
import PropertyCard from "@/components/PropertyCard";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PropertiesListing() {
  // Start with empty array — always load fresh from DB
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { locale, t } = useLanguage();

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        // Map DB rows to the shape PropertyCard expects
        const mapped = (data || []).map((p: any) => ({
          ...p,
          category: p.property_type,
          featured: p.featured,
          isFeatured: p.featured,
          priceDisplay: p.price_display || `₹${Number(p.price).toLocaleString("en-IN")}`,
        }));
        setProperties(mapped);
      } catch (err) {
        console.error("Failed to fetch public properties from Supabase", err);
        // Only fall back to static data if the request itself failed (network error)
        const mapped = propertiesData.map((p: any) => ({
          ...p,
          category: p.category,
          featured: p.isFeatured,
          isFeatured: p.isFeatured,
          priceDisplay: p.priceDisplay,
        }));
        setProperties(mapped);
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
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">
            {locale === "en" ? "Browse Catalog" : "பட்டியலை உலாவுக"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide">
            {locale === "en" ? (
              <>
                Available Properties & <span className="gold-text-gradient">Land Opportunities</span>
              </>
            ) : (
              <>
                கிடைக்கக்கூடிய சொத்துக்கள் & <span className="gold-text-gradient">நில வாய்ப்புகள்</span>
              </>
            )}
          </h1>
          <div className="h-[2px] w-20 bg-gold-500 mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t("properties.subtitle")}
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
            <p className="text-slate-500 font-semibold text-lg">{t("properties.noProperties")}</p>
            <p className="text-slate-400 text-sm">
              {locale === "en" 
                ? "Please check back later for available listings."
                : "கிடைக்கக்கூடிய சொத்து பட்டியல்களுக்கு பின்னர் மீண்டும் சரிபார்க்கவும்."}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
