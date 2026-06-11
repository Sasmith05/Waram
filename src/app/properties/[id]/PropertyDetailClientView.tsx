"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  MapPin, 
  Tag, 
  CheckCircle2, 
  MessageSquare, 
  Map, 
  School,
  Building,
  HeartPulse,
  Bus,
  Train,
  Store,
  ArrowLeft
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import DetailClientWrapper from "./DetailClientWrapper";

const categories = [
  { value: "all", label: "All Properties" },
  { value: "residential-plots", label: "Residential Plots" },
  { value: "agricultural-lands", label: "Agricultural Lands" },
  { value: "commercial-lands", label: "Commercial Lands" },
  { value: "farm-lands", label: "Farm Lands" },
  { value: "investment-properties", label: "Investment Properties" }
];

interface PropertyDetailClientViewProps {
  id: string;
  initialProperty: any;
}

export default function PropertyDetailClientView({ id, initialProperty }: PropertyDetailClientViewProps) {
  const [property, setProperty] = useState<any>(initialProperty);
  const [loading, setLoading] = useState(!initialProperty);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (property) return;

    async function loadProperty() {
      try {
        setLoading(true);
        let data = null;
        let fetchError = null;

        const { data: idData } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (idData) {
          data = idData;
        } else {
          const { data: slugData, error: slugErr } = await supabase
            .from("properties")
            .select("*")
            .eq("slug", id)
            .single();
          data = slugData;
          fetchError = slugErr;
        }

        if (fetchError || !data) {
          setError(true);
          return;
        }

        const catObj = categories.find((cat) => cat.value === data.property_type);
        const formatted = {
          ...data,
          category: data.property_type,
          categoryDisplay: catObj ? catObj.label : data.property_type,
          priceDisplay: `₹${Number(data.price).toLocaleString("en-IN")}`,
          detailedDescription: data.detailed_description,
          surveyNumber: data.survey_number,
          pattaStatus: data.patta_status,
          roadAccess: data.road_access,
          waterAvailability: data.water_availability,
          electricityAvailability: data.electricity_availability,
          googleMapsEmbedUrl: data.map_url,
          googleMapsRedirectUrl: data.map_url,
          nearbyFacilities: data.nearby_facilities || []
        };
        setProperty(formatted);
      } catch (err) {
        console.error("Failed to load property on client", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [id, property]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans pt-20">
        <div className="text-center space-y-4">
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-gold-500 animate-spin"></div>
          </div>
          <p className="text-sm font-semibold text-slate-500 tracking-wider">Loading Property Details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    notFound();
  }

  // Pre-fill WhatsApp message
  const waMessage = `Hello, I am interested in the "${property.title}" in ${property.location} listed on your website. Please provide more details.`;
  const waUrl = `https://wa.me/918760555585?text=${encodeURIComponent(waMessage)}`;

  // Icon mapping helper for nearby facilities
  const getFacilityIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("school") || n.includes("college") || n.includes("matriculation")) {
      return <School className="h-5 w-5 text-gold-600" />;
    }
    if (n.includes("hospital") || n.includes("clinic") || n.includes("health")) {
      return <HeartPulse className="h-5 w-5 text-gold-600" />;
    }
    if (n.includes("bus")) {
      return <Bus className="h-5 w-5 text-gold-600" />;
    }
    if (n.includes("railway") || n.includes("station")) {
      return <Train className="h-5 w-5 text-gold-600" />;
    }
    if (n.includes("market") || n.includes("shop") || n.includes("bazaar") || n.includes("port")) {
      return <Store className="h-5 w-5 text-gold-600" />;
    }
    return <Building className="h-5 w-5 text-gold-600" />;
  };

  return (
    <div className="relative pt-20 pb-16 bg-white text-slate-900 font-sans min-h-screen">
      {/* Background Decorative Accents */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-gold-600 transition-colors"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
            Back to All Properties
          </Link>
        </div>

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-slate-100 pb-6 text-left">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block bg-gold-500/10 text-gold-600 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-gold-500/20">
                {property.categoryDisplay}
              </span>
              <span className={`inline-block text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg border shadow-xs text-white ${
                property.status === 'sold'
                  ? 'bg-rose-600 border-rose-500/20'
                  : 'bg-emerald-600 border-emerald-500/20'
              }`}>
                {property.status === 'sold' ? '🔴 Sold' : '🟢 Available'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-wide">
              {property.title}
            </h1>
            <div className="flex items-center gap-1.5 text-sm text-slate-500 font-semibold">
              <MapPin className="h-4 w-4 text-gold-500 shrink-0" />
              <span>{property.location || "Location Unavailable"}, Tamil Nadu</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Images, Specs, Highlights, Map, Landmarks */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Dynamic Gallery Client Wrapper */}
            {property.images && property.images.length > 0 ? (
              <DetailClientWrapper images={property.images} title={property.title} />
            ) : (
              <div className="w-full aspect-video bg-slate-50 border border-slate-200/60 rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-xs">
                <Building className="h-16 w-16 text-slate-300 mb-2" />
                <h4 className="text-slate-700 font-serif font-bold text-lg">No Images Available</h4>
                <p className="text-slate-400 text-sm max-w-sm mt-1">This property listing does not contain any images. Contact our office for details.</p>
              </div>
            )}

            {/* Property Highlights */}
            <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl">
              <h3 className="text-lg font-serif font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200/60">
                Property Highlights
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.features && property.features.map((feat: any, index: number) => (
                  <div key={index} className="flex gap-2 items-center bg-white p-3 rounded-xl border border-slate-200/60 shadow-xs">
                    <CheckCircle2 className="h-5 w-5 text-gold-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Technical Details & Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-100 rounded-xl overflow-hidden shadow-xs">
                  <table className="w-full text-sm text-left text-slate-600">
                    <tbody>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-500">Property Type</td>
                        <td className="px-4 py-3 font-bold text-slate-800">{property.categoryDisplay}</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-3 font-semibold text-slate-500">Location</td>
                        <td className="px-4 py-3 font-bold text-slate-800">{property.location}</td>
                      </tr>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-500">Total Area</td>
                        <td className="px-4 py-3 font-bold text-slate-800">{property.area}</td>
                      </tr>
                      {property.surveyNumber && (
                        <tr className="border-b border-slate-100">
                          <td className="px-4 py-3 font-semibold text-slate-500">Survey Number</td>
                          <td className="px-4 py-3 font-mono font-bold text-slate-800">{property.surveyNumber}</td>
                        </tr>
                      )}
                      {property.pattaStatus && (
                        <tr className="bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-500">Patta Status</td>
                          <td className="px-4 py-3 font-bold text-slate-800">{property.pattaStatus}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="border border-slate-100 rounded-xl overflow-hidden shadow-xs">
                  <table className="w-full text-sm text-left text-slate-600">
                    <tbody>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-500">Road Access</td>
                        <td className="px-4 py-3 font-bold text-slate-800">{property.roadAccess}</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-3 font-semibold text-slate-500">Water Facility</td>
                        <td className="px-4 py-3 font-bold text-slate-800">{property.waterAvailability}</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-500">Electricity</td>
                        <td className="px-4 py-3 font-bold text-slate-800">{property.electricityAvailability}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Detailed Property Description
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                {property.detailedDescription}
              </p>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed italic bg-slate-50 p-4 rounded-xl border-l-4 border-gold-500">
                Well-located property with clear title, road access, and registration-ready documentation. Suitable for residential, agricultural, or investment purposes depending on the listing.
              </p>
            </div>

            {/* Google Maps Embed */}
            {property.googleMapsEmbedUrl || (property.latitude && property.longitude) ? (
              <div className="space-y-4 text-left">
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Exact Location & Maps
                </h3>
                <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-2xl overflow-hidden shadow-sm">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 bg-white">
                    <iframe
                      src={property.googleMapsEmbedUrl && (property.googleMapsEmbedUrl.includes("embed") || property.googleMapsEmbedUrl.includes("output=embed"))
                        ? property.googleMapsEmbedUrl
                        : (property.latitude && property.longitude
                            ? `https://maps.google.com/maps?q=${property.latitude},${property.longitude}&t=&z=14&ie=UTF8&iwloc=&output=embed`
                            : `https://maps.google.com/maps?q=${encodeURIComponent(property.location || property.title)}+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed`
                          )
                      }
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Google Maps embed for ${property.title}`}
                      className="contrast-105 brightness-95"
                    />
                  </div>
                  <div className="flex gap-4 p-4 font-sans text-center justify-center border-t border-slate-200/60 mt-2">
                    <a
                      href={property.googleMapsRedirectUrl || property.googleMapsEmbedUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location || property.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-gold-500 text-gold-600 hover:text-gold-700 font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <Map className="h-4 w-4 text-gold-500" />
                      Open in Google Maps
                    </a>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((property.location || property.title) + ", Tamil Nadu")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-gold-500 text-gold-600 hover:text-gold-700 font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <MapPin className="h-4 w-4 text-gold-500" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-left">
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Exact Location & Maps
                </h3>
                <div className="bg-slate-50 border border-slate-200/60 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs">
                  <Map className="h-12 w-12 text-slate-300 mb-2" />
                  <h4 className="text-slate-700 font-serif font-bold text-base">Location Unavailable</h4>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-sm mt-1">Specific map coordinate markers have not been provided for this property listing.</p>
                </div>
              </div>
            )}

            {/* Nearby Facilities */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Nearby Facilities & Landmarks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.nearbyFacilities && property.nearbyFacilities.map((facility: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100 shadow-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
                      {getFacilityIcon(facility.name)}
                    </div>
                    <div>
                      <span className="block text-slate-800 text-sm font-bold">{facility.name}</span>
                      <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Distance: {facility.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Inquiry Card + WhatsApp Redirection */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
            
            {/* Quick WhatsApp Redirection */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-4">
              <div className="flex gap-3 items-center">
                <div className="p-2 bg-[#25D366]/10 rounded-lg text-[#25D366]">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-white">Direct Inquiry</h4>
                  <span className="text-slate-400 text-xs">Chat via WhatsApp instantly</span>
                </div>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Connect directly with Advocate S. Rajasekar to discuss document verification, patta status, and layout registration rules.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold rounded-xl active:scale-[0.98] transition-all text-sm shadow-sm"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                WhatsApp Inquiry
              </a>
            </div>

            {/* Direct Form Inquiry */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="font-serif font-bold text-lg text-slate-900">Send Property Inquiry</h4>
                <p className="text-slate-400 text-xs mt-1">Submit your details to register interest</p>
              </div>

              {/* Interactive Inquiry Form Wrapper */}
              <DetailClientWrapper propertyId={property.id} propertyTitle={property.title} propertyLocation={property.location} isForm={true} />
            </div>

            {/* Legal Advisory Note */}
            <div className="bg-gold-500/5 border border-gold-500/20 p-5 rounded-2xl space-y-3">
              <h5 className="text-xs uppercase font-bold text-gold-600 tracking-wider">Registration Guidance</h5>
              <p className="text-slate-500 text-xs leading-relaxed">
                All listed land sales are backed by professional legal counseling at **Waram Documentation Office**. S. Rajasekar helps evaluate titles, calculate stamp duties, and schedule sub-registrar timings for a secure purchase.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
