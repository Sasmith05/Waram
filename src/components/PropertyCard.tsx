"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Maximize2, Tag, ArrowRight } from "lucide-react";
import { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="group bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full gold-glow">
      {/* Property Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-w-7xl) 33vw, (max-w-md) 100vw"
        />
        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/10">
          {property.categoryDisplay}
        </span>
      </div>

      {/* Property Content */}
      <div className="p-5 flex flex-col flex-grow font-sans">
        {/* Title */}
        <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-gold-600 transition-colors duration-200 line-clamp-1 mb-2">
          {property.title}
        </h3>

        {/* Short Description */}
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
          {property.description}
        </p>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 mb-4 text-xs text-slate-600 font-semibold">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-gold-500 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <Maximize2 className="h-4 w-4 text-gold-500 shrink-0" />
            <span>{property.area}</span>
          </div>
        </div>

        {/* Price & Action Button Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Price</span>
            <span className="text-base sm:text-lg font-bold text-gold-600 font-serif flex items-center gap-1">
              <Tag className="h-4 w-4 text-gold-500 shrink-0" />
              {property.priceDisplay}
            </span>
          </div>
          
          <Link
            href={`/properties/${property.id}`}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-gold-600 group-hover:text-slate-900 transition-colors py-1.5 px-3.5 border border-gold-500/30 hover:border-slate-900 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-all active:scale-95 duration-200"
          >
            View Details
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
