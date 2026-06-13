"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Trash2, Upload, ArrowLeft, Loader2, ImageIcon } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
}

interface EventFormProps {
  initialData?: EventItem;
  isEdit?: boolean;
}

// Helper to convert File to Base64 for local storage persistence
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function EventForm({ initialData, isEdit = false }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Generate an ID if creating a new event
  const [eventId] = useState(() => initialData?.id || "ev-" + Math.random().toString(36).substr(2, 9));

  // Form fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split("T")[0]);
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploadingImages(true);
    const filesArray = Array.from(e.target.files);

    try {
      const uploadedUrls: string[] = [];

      for (const file of filesArray) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `${eventId}/${fileName}`;

        if (isSupabaseConfigured) {
          try {
            // Upload to Supabase Storage in 'events' bucket
            const { data, error } = await supabase.storage.from("events").upload(filePath, file);
            if (error) throw error;

            // Get Public URL
            const { data: urlData } = supabase.storage.from("events").getPublicUrl(filePath);
            if (urlData?.publicUrl) {
              uploadedUrls.push(urlData.publicUrl);
            }
          } catch (uploadErr: any) {
            console.warn("Supabase storage upload failed, falling back to Base64:", uploadErr);
            const base64Url = await fileToBase64(file);
            uploadedUrls.push(base64Url);
          }
        } else {
          // Mock mode: convert to Base64 URL so it persists in localStorage
          const base64Url = await fileToBase64(file);
          uploadedUrls.push(base64Url);
        }
      }

      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err: any) {
      alert(`Image upload failed: ${err.message}`);
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) {
      alert("Title and Date are required.");
      return;
    }

    setLoading(true);

    const payload = {
      id: eventId,
      title: title.trim(),
      description: description.trim(),
      date,
      images
    };

    try {
      let supabaseSuccess = false;
      try {
        if (isEdit) {
          const { error } = await supabase
            .from("events")
            .update(payload)
            .eq("id", eventId);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("events")
            .insert(payload);
          if (error) throw error;
        }
        supabaseSuccess = true;
      } catch (dbErr: any) {
        console.warn("Supabase event save failed, falling back to local storage:", dbErr);
      }

      if (!supabaseSuccess && typeof window !== "undefined") {
        const stored = localStorage.getItem("waram_mock_events");
        let list = [];
        if (stored) {
          try {
            list = JSON.parse(stored);
          } catch {
            list = [];
          }
        }
        if (isEdit) {
          list = list.map((e: any) => (e.id === eventId ? { ...e, ...payload } : e));
        } else {
          list = [{ ...payload, created_at: new Date().toISOString() }, ...list];
        }
        localStorage.setItem("waram_mock_events", JSON.stringify(list));
      }

      router.push("/admin/events");
      router.refresh();
    } catch (err: any) {
      alert(`Failed to save event: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans text-slate-700">
      
      {/* Back button link */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-gold-600 transition-colors"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          Back to Events List
        </Link>
      </div>

      <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm text-left">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100">
          {isEdit ? "Edit Gallery Event Details" : "Create New Gallery Event"}
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Col: Event Metadata Details */}
            <div className="md:col-span-2 space-y-5">
              
              {/* Event Title */}
              <div className="space-y-1">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Event Title / Name
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Free Land Mutation Counseling Session"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-2xs"
                />
              </div>

              {/* Event Date */}
              <div className="space-y-1">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Event Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Event Description */}
              <div className="space-y-1">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Description / Activity Notes
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder="Write details about the event, location, attendees, and key milestones accomplished..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-normal leading-relaxed transition-all shadow-2xs resize-none"
                />
              </div>

            </div>

            {/* Right Col: Media / Image Uploader */}
            <div className="md:col-span-1 space-y-5">
              <span className="block text-xs uppercase font-bold text-slate-400 tracking-wider">
                Event Images
              </span>

              {/* Upload Drag Box */}
              <label className="border-2 border-dashed border-slate-200 hover:border-gold-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group h-48 bg-slate-50/50">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImages}
                />
                {uploadingImages ? (
                  <div className="space-y-2">
                    <Loader2 className="h-8 w-8 text-gold-600 animate-spin mx-auto" />
                    <span className="block text-xs font-semibold text-slate-400">Uploading Images...</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-slate-300 group-hover:text-gold-500 transition-colors mx-auto" />
                    <span className="block text-xs font-bold text-slate-500 group-hover:text-gold-600">
                      Upload Photos
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      JPEG, PNG or WebP up to 5MB (Multiple support)
                    </span>
                  </div>
                )}
              </label>

              {/* Preview thumbnails */}
              <div className="space-y-2.5">
                <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Uploaded Images ({images.length})
                </span>
                
                {images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {images.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group/thumb"
                      >
                        <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg opacity-0 group-hover/thumb:opacity-100 transition-opacity shadow-xs cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border border-slate-100 rounded-xl bg-slate-50/20 text-xs text-slate-400">
                    No images uploaded yet.
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
            <Link
              href="/admin/events"
              className="px-5 py-3 border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 font-bold rounded-xl text-sm transition-colors cursor-pointer"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || uploadingImages}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-bold rounded-xl active:scale-[0.98] transition-all text-sm shadow-xs cursor-pointer disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Publish Event"}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
