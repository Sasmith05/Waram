"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { propertiesData } from "@/data/properties";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    let result = [...propertiesData];

    // Category Filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search Query Filter (Search by location, category, or title)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.categoryDisplay.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }
    // "newest" defaults to dataset order

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="relative pt-20 pb-16 bg-white text-slate-900 font-sans min-h-screen">
      {/* Background Decorative Accents */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">Browse Catalog</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide">
            Available Properties & <span className="gold-text-gradient">Land Opportunities</span>
          </h1>
          <div className="h-[2px] w-20 bg-gold-500 mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Browse available residential plots, agricultural lands, and investment properties with complete details, images, and location information.
          </p>
        </div>

        {/* Filters Dashboard Panel */}
        <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl mb-8 space-y-6 shadow-xs">
          
          {/* Search, Sort and Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="relative md:col-span-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search properties by location, type, or keyword (e.g. Paramakudi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-slate-800 text-sm font-semibold transition-all shadow-xs"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative md:col-span-4 flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-slate-800 text-sm font-semibold transition-all cursor-pointer shadow-xs"
              >
                <option value="newest">Sort By: Newest Listings</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="border-t border-slate-200/60 pt-5">
            <div className="flex items-center gap-2 mb-3">
              <SlidersHorizontal className="h-4.5 w-4.5 text-slate-400 shrink-0" />
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Filter by Category</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:border-gold-500 hover:text-gold-600"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6 text-sm text-slate-500 font-semibold px-1">
          <span>
            Showing {filteredAndSortedProperties.length} of {propertiesData.length} properties
          </span>
          {searchQuery || selectedCategory !== "all" ? (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSortBy("newest");
              }}
              className="text-gold-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          ) : null}
        </div>

        {/* Properties Grid */}
        {filteredAndSortedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-12 text-center max-w-2xl mx-auto space-y-4">
            <p className="text-slate-500 font-semibold text-lg">No properties found matching your selection.</p>
            <p className="text-slate-400 text-sm">Try clearing your filters or widening your search queries.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg transition-colors duration-200"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
