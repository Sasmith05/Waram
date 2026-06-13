"use client";

import React, { useEffect, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";
import { supabase, mockStaticEvents } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
  created_at?: string;
}

export default function EventsPage() {
  const { locale, t } = useLanguage();
  const [events, setEvents] = useState<EventItem[]>(mockStaticEvents);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<{ eventId: string; index: number } | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: false });

        if (error) {
          console.warn("Failed to fetch events from Supabase, checking local storage:", error);
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
      } catch (err) {
        console.warn("Error loading events:", err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeImage) return;
      if (e.key === "Escape") setActiveImage(null);
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, events]);

  const handlePrevImage = () => {
    if (!activeImage) return;
    const { eventId, index } = activeImage;
    const event = events.find((e) => e.id === eventId);
    if (!event) return;
    const prevIndex = index === 0 ? event.images.length - 1 : index - 1;
    setActiveImage({ eventId, index: prevIndex });
  };

  const handleNextImage = () => {
    if (!activeImage) return;
    const { eventId, index } = activeImage;
    const event = events.find((e) => e.id === eventId);
    if (!event) return;
    const nextIndex = index === event.images.length - 1 ? 0 : index + 1;
    setActiveImage({ eventId, index: nextIndex });
  };

  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-US" : "ta-IN", options);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="relative pt-28 pb-20 bg-white text-slate-900 min-h-screen">
      {/* Background Decorative Accents */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">
            {locale === "en" ? "Waram Gallery" : "வாரம் கேலரி"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide">
            {locale === "en" ? (
              <>
                Recent <span className="gold-text-gradient">Events & Activities</span>
              </>
            ) : (
              <>
                சமீபத்திய <span className="gold-text-gradient">நிகழ்வுகள் & செயல்பாடுகள்</span>
              </>
            )}
          </h1>
          <div className="h-[2px] w-20 bg-gold-500 mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
            {locale === "en"
              ? "Highlights and photo records from our legal advisory camps, documentation office initiatives, and community engagements."
              : "எங்கள் இலவச சட்ட ஆலோசனை முகாம்கள், ஆவண அலுவலக முயற்சிகள் மற்றும் சமூக ஈடுபாடுகளின் முக்கிய நிகழ்வுகள் மற்றும் புகைப்படப் பதிவுகள்."}
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-gold-500 animate-spin"></div>
            </div>
            <p className="text-sm font-semibold text-slate-500 tracking-wider">
              {locale === "en" ? "Loading Events..." : "நிகழ்வுகள் ஏற்றப்படுகின்றன..."}
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 border border-slate-200/60 rounded-2xl p-8 max-w-xl mx-auto">
            <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-serif font-bold text-lg text-slate-800">
              {locale === "en" ? "No Events Found" : "நிகழ்வுகள் எதுவும் இல்லை"}
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              {locale === "en"
                ? "There are currently no events registered in our gallery. Check back later."
                : "தற்போது எங்கள் கேலரியில் நிகழ்வுகள் எதுவும் பதிவு செய்யப்படவில்லை. பின்னர் சரிபார்க்கவும்."}
            </p>
          </div>
        ) : (
          /* Events Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Event Cover Image or Gallery */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden shrink-0">
                  {event.images && event.images.length > 0 ? (
                    <>
                      <img
                        src={event.images[0]}
                        alt={event.title}
                        className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-500 cursor-pointer"
                        onClick={() => setActiveImage({ eventId: event.id, index: 0 })}
                      />
                      {event.images.length > 1 && (
                        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-lg border border-white/10 shadow-xs pointer-events-none">
                          +{event.images.length - 1} {locale === "en" ? "more" : "கூடுதல்"}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400">
                      <ImageIcon className="h-10 w-10 text-slate-300 mb-1" />
                      <span className="text-xs font-semibold">{locale === "en" ? "No Images" : "படங்கள் இல்லை"}</span>
                    </div>
                  )}
                </div>

                {/* Event Body */}
                <div className="p-6 flex-grow flex flex-col text-left space-y-3">
                  <div className="flex items-center gap-2 text-slate-400 font-sans text-xs font-bold uppercase tracking-wider">
                    <Calendar className="h-4 w-4 text-gold-500" />
                    <span>{formatDate(event.date)}</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-gold-600 transition-colors leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans line-clamp-3">
                    {event.description}
                  </p>

                  {/* Thumbnail Row */}
                  {event.images && event.images.length > 1 && (
                    <div className="pt-4 border-t border-slate-100 flex gap-2.5 overflow-x-auto">
                      {event.images.map((img, idx) => (
                        <div
                          key={idx}
                          className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border transition-all cursor-pointer ${
                            idx === 0
                              ? "border-gold-500 ring-2 ring-gold-500/10"
                              : "border-slate-200 hover:border-gold-500"
                          }`}
                          onClick={() => setActiveImage({ eventId: event.id, index: idx })}
                        >
                          <img src={img} alt={`${event.title} - ${idx}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (() => {
        const { eventId, index } = activeImage;
        const event = events.find((e) => e.id === eventId);
        if (!event) return null;
        const currentImg = event.images[index];

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md">
            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 text-white hover:text-gold-500 transition-colors p-2.5 rounded-full bg-white/5 border border-white/10 active:scale-95 z-55 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Arrows */}
            {event.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 sm:left-6 text-white hover:text-gold-500 transition-colors p-2.5 rounded-full bg-white/5 border border-white/10 active:scale-95 z-55 cursor-pointer"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 sm:right-6 text-white hover:text-gold-500 transition-colors p-2.5 rounded-full bg-white/5 border border-white/10 active:scale-95 z-55 cursor-pointer"
                  aria-label="Next Image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Main Lightbox Frame */}
            <div className="max-w-5xl max-h-[80vh] px-4 flex flex-col items-center justify-center space-y-4">
              <div className="relative max-w-full max-h-[70vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 select-none">
                <img
                  src={currentImg}
                  alt={`${event.title} - ${index + 1}`}
                  className="object-contain max-w-full max-h-[70vh] select-none"
                />
              </div>

              {/* Title & Caption */}
              <div className="text-center text-white max-w-2xl px-4 space-y-1">
                <h4 className="font-serif font-bold text-lg sm:text-xl text-gold-400">
                  {event.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 line-clamp-2">
                  {event.description}
                </p>
                {event.images.length > 1 && (
                  <span className="inline-block text-[11px] font-bold text-slate-500 uppercase tracking-widest pt-1">
                    Image {index + 1} of {event.images.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
