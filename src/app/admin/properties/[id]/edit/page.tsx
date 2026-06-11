"use client";

import React, { use, useEffect, useState } from "react";
import PropertyForm from "@/components/PropertyForm";
import { supabase } from "@/lib/supabase";
import { Property } from "@/types/property";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPropertyPage({ params }: EditPageProps) {
  const resolvedParams = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperty() {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", resolvedParams.id)
          .single();

        if (error) throw error;
        if (data) {
          setProperty(data);
        }
      } catch (err) {
        console.error("Failed to load property details", err);
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [resolvedParams.id]);

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

  if (!property) {
    return (
      <div className="text-center py-20 bg-white border border-slate-200/60 rounded-2xl p-8 max-w-md mx-auto mt-10">
        <p className="text-slate-500 font-semibold">Property listing not found.</p>
      </div>
    );
  }

  return <PropertyForm initialData={property} isEdit={true} />;
}
