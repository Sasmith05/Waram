"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Inbox, 
  Sparkles, 
  Clock, 
  ArrowRight,
  TrendingUp,
  User,
  Phone,
  Calendar
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Property, Enquiry } from "@/types/property";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    featuredProperties: 0,
    totalEnquiries: 0
  });
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Fetch properties
        const { data: properties } = await supabase.from("properties").select("*");
        // Fetch enquiries
        const { data: enquiries } = await supabase.from("enquiries").select("*");

        const propList = properties || [];
        const enqList = enquiries || [];

        setStats({
          totalProperties: propList.length,
          featuredProperties: propList.filter((p: any) => p.featured).length,
          totalEnquiries: enqList.length
        });

        // Get 3 recent properties sorted by date
        const sortedProps = [...propList].sort((a, b) => 
          new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()
        );
        setRecentProperties(sortedProps.slice(0, 3));

        // Get 3 recent enquiries
        setRecentEnquiries(enqList.slice(0, 3));
      } catch (error) {
        console.error("Failed to load admin stats", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-gold-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-5 text-left">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-wide">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm font-semibold">
            Manage land opportunities, notary requests, and customer enquiries.
          </p>
        </div>
        <div className="shrink-0">
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-bold rounded-xl transition-all shadow-sm active:scale-98 text-sm cursor-pointer"
          >
            <Building2 className="h-4 w-4" />
            Add New Property
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Total Properties Card */}
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group gold-glow">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Total Properties</span>
              <p className="text-4xl font-serif font-extrabold text-slate-900">{stats.totalProperties}</p>
            </div>
            <div className="p-3 bg-gold-500/10 text-gold-600 rounded-xl border border-gold-500/20">
              <Building2 className="h-6 w-6" />
            </div>
          </div>
          <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
            <Link href="/admin/properties" className="hover:text-gold-600 flex items-center gap-1 transition-colors">
              Manage Listings
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <span className="text-emerald-500 flex items-center gap-0.5 font-semibold">
              <TrendingUp className="h-3 w-3" />
              Active
            </span>
          </div>
        </div>

        {/* Featured Properties Card */}
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group gold-glow">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Featured Catalog</span>
              <p className="text-4xl font-serif font-extrabold text-slate-900">{stats.featuredProperties}</p>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl border border-amber-500/20">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
          <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="text-slate-400">On Public Display</span>
            <span className="text-amber-500 font-semibold uppercase tracking-wider text-[10px]">Featured</span>
          </div>
        </div>

        {/* Total Enquiries Card */}
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group gold-glow">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Total Enquiries</span>
              <p className="text-4xl font-serif font-extrabold text-slate-900">{stats.totalEnquiries}</p>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl border border-blue-500/20">
              <Inbox className="h-6 w-6" />
            </div>
          </div>
          <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
            <Link href="/admin/enquiries" className="hover:text-gold-600 flex items-center gap-1 transition-colors">
              Review Messages
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <span className="text-blue-500 font-semibold flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              Inbox
            </span>
          </div>
        </div>

      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Listings */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
            <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gold-500" />
              Recent Listings
            </h3>
            <Link href="/admin/properties" className="text-xs font-bold text-gold-600 hover:text-slate-900 transition-colors uppercase tracking-wider">
              View All
            </Link>
          </div>

          <div className="flex-grow space-y-4">
            {recentProperties.length > 0 ? (
              recentProperties.map((prop) => (
                <div key={prop.id} className="flex gap-4 p-3 bg-slate-50 border border-slate-200/40 rounded-xl shadow-2xs items-center justify-between">
                  <div className="flex gap-3 items-center min-w-0">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-slate-200/60 bg-slate-200">
                      {prop.images && prop.images.length > 0 ? (
                        <img src={prop.images[0]} alt={prop.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100"><Building2 className="h-4 w-4 text-slate-400" /></div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-slate-800 font-serif font-bold text-sm truncate">{prop.title}</span>
                      <span className="block text-slate-400 text-xs truncate">{prop.location || "Location Unavailable"} &bull; {prop.area}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block text-slate-800 font-bold text-xs sm:text-sm font-serif">{(prop as any).price_display || `₹${Number(prop.price).toLocaleString("en-IN")}`}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{prop.property_type.replace("-", " ")}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-400 text-sm">No properties listed yet.</div>
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
            <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
              <Inbox className="h-5 w-5 text-gold-500" />
              Recent Enquiries
            </h3>
            <Link href="/admin/enquiries" className="text-xs font-bold text-gold-600 hover:text-slate-900 transition-colors uppercase tracking-wider">
              View All
            </Link>
          </div>

          <div className="flex-grow space-y-4">
            {recentEnquiries.length > 0 ? (
              recentEnquiries.map((enq) => (
                <div key={enq.id} className="p-4 bg-slate-50 border border-slate-200/40 rounded-xl space-y-2 text-xs text-slate-600 relative">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-gold-600" />
                      {enq.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(enq.created_at || "").toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-400 text-[10px] sm:text-xs">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-slate-400" />
                      {enq.phone}
                    </span>
                    <span className="truncate">Property: <strong className="text-slate-600 font-bold">{enq.property_title || "Unknown"}</strong></span>
                  </div>
                  <p className="text-slate-500 leading-relaxed italic line-clamp-2">
                    &ldquo;{enq.message}&rdquo;
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-400 text-sm">No enquiries received yet.</div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
