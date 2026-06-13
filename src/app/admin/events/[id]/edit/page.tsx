"use client";

import React, { use, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EventForm from "@/components/EventForm";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditEventPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.warn("Failed to load event from Supabase, checking local storage:", error);
          if (typeof window !== "undefined") {
            const stored = localStorage.getItem("waram_mock_events");
            if (stored) {
              try {
                const list = JSON.parse(stored);
                const found = list.find((e: any) => e.id === id);
                if (found) {
                  setEvent(found);
                  return;
                }
              } catch {
                // ignore
              }
            }
          }
          throw error;
        }

        if (data) {
          setEvent(data);
        }
      } catch (err) {
        console.error("Error loading event details:", err);
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-gold-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20 bg-white border border-slate-200/60 rounded-2xl p-8 max-w-md mx-auto mt-10">
        <p className="text-slate-500 font-semibold">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <EventForm initialData={event} isEdit={true} />
    </div>
  );
}

