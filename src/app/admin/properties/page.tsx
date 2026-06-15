"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  Eye, 
  Sparkles, 
  MapPin, 
  Maximize2
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Property } from "@/types/property";

export default function AdminPropertiesList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  async function loadProperties() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("properties").select("*");
      if (error) throw error;
      setProperties(data || []);
    } catch (err: any) {
      console.error("Failed to load properties", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete the property "${title}"?\nThis action will permanently delete the record and its images.`);
    if (!confirmed) return;

    try {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (error) throw error;
      
      // Update state
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("properties")
        .update({ featured: !currentStatus })
        .eq("id", id);
      
      if (error) throw error;

      // Update local state
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured: !currentStatus } : p))
      );
    } catch (err: any) {
      alert(`Failed to toggle featured status: ${err.message}`);
    }
  };

  const handleStatusChange = async (id: string, newStatus: "for_sale" | "sold") => {
    try {
      const { error } = await supabase
        .from("properties")
        .update({ status: newStatus })
        .eq("id", id);
      
      if (error) throw error;

      // Update local state
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
    } catch (err: any) {
      alert(`Failed to update property status: ${err.message}`);
    }
  };

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.location || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.property_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-slate-700">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1.5 text-left">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-wide">
            Manage Properties
          </h1>
          <p className="text-slate-500 text-sm font-semibold">
            Add, update, feature, or remove land and plot catalog listings.
          </p>
        </div>
        <Link
          href="/admin/properties/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-bold rounded-xl active:scale-[0.98] transition-all text-sm shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="h-4.5 w-4.5" />
          Add New Property
        </Link>
      </div>

      {/* Search Bar dashboard */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Filter properties by name, type, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-2xs"
        />
      </div>

      {/* Main Table Content */}
      <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-gold-500 animate-spin"></div>
            </div>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left text-slate-700 text-sm font-sans">
              <thead className="bg-slate-50 text-xs text-slate-400 uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Featured</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Thumbnail Image */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative h-12 w-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                        {prop.images && prop.images.length > 0 ? (
                          <img src={prop.images[0]} alt={prop.title} className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-50">
                            <Building2 className="h-5 w-5 text-slate-400" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Metadata details */}
                    <td className="px-6 py-4">
                      <span className="block font-bold text-slate-900 font-serif leading-tight">{prop.title}</span>
                      <span className="block text-slate-400 text-xs mt-1 font-semibold flex items-center gap-2">
                        <span className="flex items-center gap-0.5"><MapPin className="h-3.5 w-3.5 text-gold-500" />{prop.location || "Location Unavailable"}</span>
                        <span className="text-slate-200">|</span>
                        <span className="flex items-center gap-0.5"><Maximize2 className="h-3.5 w-3.5 text-gold-500" />{prop.area}</span>
                      </span>
                    </td>

                    {/* Category Label */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md font-bold text-[10px] uppercase tracking-wider border border-slate-200/40">
                        {prop.property_type.replace("-", " ")}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 text-right whitespace-nowrap font-serif font-bold text-slate-900">
                      {(prop as any).price_display || `₹${Number(prop.price).toLocaleString("en-IN")}`}
                    </td>

                    {/* Status Dropdown Selection */}
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <select
                        value={prop.status || "for_sale"}
                        onChange={(e) => handleStatusChange(prop.id, e.target.value as any)}
                        className="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 cursor-pointer transition-all shadow-2xs"
                      >
                        <option value="for_sale">🟢 For Sale</option>
                        <option value="sold">🔴 Sold</option>
                      </select>
                    </td>

                    {/* Featured Toggle */}
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(prop.id, prop.featured)}
                        className={`inline-flex p-2 rounded-lg border cursor-pointer transition-all ${
                          prop.featured 
                            ? "bg-amber-50 border-amber-200 text-amber-500 hover:bg-amber-100" 
                            : "bg-white border-slate-200 text-slate-400 hover:border-amber-200 hover:text-amber-500"
                        }`}
                        title="Toggle Featured Display"
                      >
                        <Sparkles className="h-4.5 w-4.5" />
                      </button>
                    </td>

                    {/* Action buttons */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/properties/${prop.slug}`}
                          target="_blank"
                          className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
                          title="View Listing page"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/properties/${prop.id}/edit`}
                          className="p-2 bg-gold-500/5 hover:bg-gold-500/10 border border-gold-500/20 text-gold-600 hover:text-gold-700 rounded-lg transition-colors"
                          title="Edit Listing details"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(prop.id, prop.title)}
                          className="p-2 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 hover:text-rose-700 rounded-lg transition-colors cursor-pointer"
                          title="Delete Listing"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-4">
            <Building2 className="h-10 w-10 text-slate-300 mx-auto" />
            <p className="font-semibold">No property records found.</p>
            <p className="text-xs text-slate-400">Add a new property to populate the listings dashboard.</p>
            <Link
              href="/admin/properties/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
            >
              Add Property
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
