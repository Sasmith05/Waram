"use client";

import React, { useEffect, useState } from "react";
import { 
  Inbox, 
  Trash2, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  MessageSquare,
  Search
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Enquiry } from "@/types/property";

export default function AdminEnquiriesList() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  async function loadEnquiries() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("enquiries").select("*");
      if (error) throw error;
      setEnquiries(data || []);
    } catch (err) {
      console.error("Failed to load enquiries", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this enquiry?\nThis action cannot be undone.");
    if (!confirmed) return;

    try {
      const { error } = await supabase.from("enquiries").delete().eq("id", id);
      if (error) throw error;
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const filteredEnquiries = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.property_title && e.property_title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      e.phone.includes(searchQuery) ||
      (e.email && e.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-sans text-slate-700">
      
      {/* Header Panel */}
      <div className="border-b border-slate-200 pb-5 text-left">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-wide">
          Customer Enquiries
        </h1>
        <p className="text-slate-500 text-sm font-semibold">
          Review details submitted by users inquiring about specific properties.
        </p>
      </div>

      {/* Search Bar dashboard */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Filter enquiries by name, phone, or property..."
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
        ) : filteredEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left text-slate-700 text-sm font-sans">
              <thead className="bg-slate-50 text-xs text-slate-400 uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Property Context</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Submitted At</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/50 transition-colors align-top">
                    {/* Client Name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5 font-serif text-sm">
                        <User className="h-4 w-4 text-gold-500 shrink-0" />
                        {enq.name}
                      </span>
                    </td>

                    {/* Contact details */}
                    <td className="px-6 py-4 whitespace-nowrap space-y-1">
                      <span className="text-slate-800 font-semibold flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        {enq.phone}
                      </span>
                      {enq.email ? (
                        <span className="text-slate-400 text-xs flex items-center gap-1.5 font-mono truncate max-w-[180px]">
                          <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          {enq.email}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs block italic">No Email Provided</span>
                      )}
                    </td>

                    {/* Property title */}
                    <td className="px-6 py-4">
                      <span className="font-serif font-bold text-slate-800 text-sm leading-tight block max-w-[200px] truncate">
                        {enq.property_title || "Unknown Property"}
                      </span>
                    </td>

                    {/* Message block */}
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-slate-500 leading-relaxed text-xs sm:text-sm line-clamp-3 italic">
                        &ldquo;{enq.message}&rdquo;
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-slate-400 text-xs font-semibold flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        {new Date(enq.created_at || "").toLocaleString("en-IN", {
                          dateStyle: "short",
                          timeStyle: "short"
                        })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(enq.id)}
                        className="p-2 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 hover:text-rose-700 rounded-lg transition-colors cursor-pointer"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-4">
            <Inbox className="h-10 w-10 text-slate-300 mx-auto" />
            <p className="font-semibold">No customer enquiries found.</p>
            <p className="text-xs text-slate-400">All messages submitted via property forms will show up here.</p>
          </div>
        )}
      </div>

    </div>
  );
}
