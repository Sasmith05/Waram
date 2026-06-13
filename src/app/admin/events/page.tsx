"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Plus, Search, Trash2, Edit2, ImageIcon } from "lucide-react";
import { supabase, mockStaticEvents } from "@/lib/supabase";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(mockStaticEvents);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  async function loadEvents() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.warn("Failed to load events from Supabase, checking local storage:", error);
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("waram_mock_events");
          if (stored) {
            try {
              setEvents(JSON.parse(stored));
            } catch {
              // ignore
            }
          }
        }
      } else if (data && data.length > 0) {
        setEvents(data);
      }
    } catch (err: any) {
      console.warn("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete the event "${title}"?\nThis action will permanently remove the record and any uploaded images.`);
    if (!confirmed) return;

    try {
      // Fetch event to get images to delete from storage if needed
      const event = events.find((e) => e.id === id);
      
      let supabaseSuccess = false;
      try {
        // Delete event from DB
        const { error } = await supabase.from("events").delete().eq("id", id);
        if (error) throw error;
        supabaseSuccess = true;
      } catch (dbErr: any) {
        console.warn("Supabase event delete failed, falling back to local storage:", dbErr);
      }

      // Clean up images in storage (mock storage will handle it gracefully)
      if (event && event.images && event.images.length > 0) {
        // filter out static mock images and base64 strings from deletion to prevent error
        const userUploadedPaths = event.images
          .filter((img) => !img.startsWith("/properties/") && !img.startsWith("data:"))
          .map((img) => {
            if (!img.startsWith("http")) return img;
            try {
              const searchStr = "/storage/v1/object/public/events/";
              const idx = img.indexOf(searchStr);
              if (idx !== -1) {
                return img.substring(idx + searchStr.length);
              }
            } catch (err) {
              // ignore
            }
            return img;
          });

        if (userUploadedPaths.length > 0) {
          try {
            await supabase.storage.from("events").remove(userUploadedPaths);
          } catch (storageErr) {
            // ignore storage deletion error on fallback
          }
        }
      }

      // Fallback
      if (!supabaseSuccess && typeof window !== "undefined") {
        const stored = localStorage.getItem("waram_mock_events");
        if (stored) {
          try {
            const list = JSON.parse(stored);
            const filtered = list.filter((e: any) => e.id !== id);
            localStorage.setItem("waram_mock_events", JSON.stringify(filtered));
          } catch {
            // ignore
          }
        }
      }

      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-slate-700">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1.5 text-left">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-wide">
            Manage Gallery Events
          </h1>
          <p className="text-slate-500 text-sm font-semibold">
            Create, update, or remove recent camps, openings, or community legal events.
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-bold rounded-xl active:scale-[0.98] transition-all text-sm shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="h-4.5 w-4.5" />
          Add New Event
        </Link>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search events by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-2xs"
        />
      </div>

      {/* Events Table/List */}
      <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-gold-500 animate-spin"></div>
            </div>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left text-slate-700 text-sm font-sans">
              <thead className="bg-slate-50 text-xs text-slate-400 uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Title & Details</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Images Count</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Event Thumbnail */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative h-12 w-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                        {event.images && event.images.length > 0 ? (
                          <img src={event.images[0]} alt={event.title} className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-50">
                            <ImageIcon className="h-5 w-5 text-slate-400" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Metadata details */}
                    <td className="px-6 py-4">
                      <span className="block font-bold text-slate-900 font-serif leading-tight">{event.title}</span>
                      <span className="block text-slate-400 text-xs mt-1 font-semibold line-clamp-1 max-w-md">
                        {event.description}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-gold-500" />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </td>

                    {/* Image count */}
                    <td className="px-6 py-4 text-center whitespace-nowrap font-bold text-slate-800">
                      {event.images ? event.images.length : 0}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/events`}
                          target="_blank"
                          className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
                          title="View Events Gallery page"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/events/${event.id}/edit`}
                          className="p-2 bg-gold-500/5 hover:bg-gold-500/10 border border-gold-500/20 text-gold-600 hover:text-gold-700 rounded-lg transition-colors"
                          title="Edit Event details"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id, event.title)}
                          className="p-2 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 hover:text-rose-700 rounded-lg transition-colors cursor-pointer"
                          title="Delete Event"
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
            <Calendar className="h-10 w-10 text-slate-300 mx-auto" />
            <p className="font-semibold">No event records found.</p>
            <p className="text-xs text-slate-400">Create a new gallery event to display on your public events timeline.</p>
            <Link
              href="/admin/events/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
            >
              Add Event
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
