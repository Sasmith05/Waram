import React from "react";
import { supabase } from "@/lib/supabase";
import EventForm from "@/components/EventForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function AdminEditEventPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (!event) {
    notFound();
  }

  return (
    <div className="py-6">
      <EventForm initialData={event} isEdit={true} />
    </div>
  );
}
