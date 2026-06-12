"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Maximize2, ArrowRight, Building2 } from "lucide-react";
import { Property } from "@/types/property";
import { useLanguage } from "@/contexts/LanguageContext";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const isSold = property.status === "sold";
  const { t, locale } = useLanguage();

  const title = locale === "en"
    ? property.title_en || property.title
    : property.title_ta || property.title;

  const description = locale === "en"
    ? property.description_en || property.description
    : property.description_ta || property.description;

  const translateLocation = (loc?: string) => {
    if (!loc) return t("properties.locationUnavailable");
    const lower = loc.toLowerCase().trim();
    if (lower === "paramakudi") return locale === "en" ? "Paramakudi" : "பரமக்குடி";
    if (lower === "rameswaram") return locale === "en" ? "Rameswaram" : "ராமேஸ்வரம்";
    if (lower === "devipattinam") return locale === "en" ? "Devipattinam" : "தேவிபட்டினம்";
    return loc;
  };

  const translateArea = (area: string) => {
    if (locale === "en") return area;
    return area
      .replace(/Cents/gi, "சென்ட்")
      .replace(/Cent/gi, "சென்ட்")
      .replace(/Acres/gi, "ஏக்கர்")
      .replace(/Acre/gi, "ஏக்கர்");
  };

  const translateCategory = (cat?: string) => {
    const type: string = property.property_type || "";
    if (type === "residential-plots") return locale === "en" ? "Residential Plots" : "குடியிருப்பு மனைகள்";
    if (type === "agricultural-lands") return locale === "en" ? "Agricultural Lands" : "விவசாய நிலங்கள்";
    if (type === "commercial-lands") return locale === "en" ? "Commercial Lands" : "வணிக நிலங்கள்";
    if (type === "farm-lands") return locale === "en" ? "Farm Lands" : "பண்ணை நிலங்கள்";
    if (type === "investment-properties") return locale === "en" ? "Investment Properties" : "முதலீட்டு சொத்துக்கள்";
    return cat || type.replace("-", " ");
  };

  return (
    <div className="group bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full gold-glow">
      
      {/* Property Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 flex items-center justify-center select-none">
        {property.images && property.images.length > 0 ? (
          <Image
            src={property.images[0]}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-w-7xl) 33vw, (max-w-md) 100vw"
          />
        ) : (
          <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center p-4 text-center border-b border-slate-100">
            <Building2 className="h-10 w-10 text-slate-300 mb-1" />
            <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">{t("properties.noImages")}</span>
          </div>
        )}
        
        {/* Status Badge */}
        <span className={`absolute top-4 right-4 backdrop-blur-xs text-white text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg border shadow-xs ${
          isSold
            ? 'bg-rose-600/95 border-rose-500/20'
            : 'bg-emerald-600/95 border-emerald-500/20'
        }`}>
          {isSold ? `🔴 ${t("properties.sold")}` : `🟢 ${t("properties.available")}`}
        </span>
      </div>

      {/* Property Content */}
      <div className="p-5 flex flex-col flex-grow font-sans">
        
        {/* Title */}
        <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-gold-600 transition-colors duration-200 line-clamp-1 mb-2 text-left">
          {title}
        </h3>

        {/* Short Description */}
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 flex-grow text-left">
          {description}
        </p>

        {/* Specifications Grid - Area only */}
        <div className="flex items-center gap-1.5 border-t border-slate-100 pt-4 mb-4 text-xs text-slate-600 font-semibold text-left">
          <Maximize2 className="h-4 w-4 text-gold-500 shrink-0" />
          <span>{t("properties.area")}: {translateArea(property.area)}</span>
        </div>

        {/* Status Label & View Details Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 mt-auto">
          <div className="flex flex-col text-left min-w-[100px]">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{t("properties.status")}</span>
            <span className={`text-sm font-extrabold uppercase tracking-wide ${isSold ? "text-rose-600" : "text-emerald-600"}`}>
              {isSold ? t("properties.sold") : t("properties.available")}
            </span>
          </div>
          
          <Link
            href={`/properties/${property.id}`}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-gold-600 group-hover:text-slate-900 py-1.5 px-3.5 border border-gold-500/30 hover:border-slate-900 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-all active:scale-95 duration-200 cursor-pointer shrink-0"
          >
            {t("properties.viewDetails")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
      </div>
    </div>
  );
}

