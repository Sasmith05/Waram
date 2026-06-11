"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Building2, 
  Trash2, 
  Upload, 
  ArrowLeft,
  Loader2,
  Sparkles,
  Info,
  Map,
  Compass
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Property, NearbyFacility } from "@/types/property";

const PROPERTY_TYPES = [
  { value: "residential-plots", label: "Residential Plot" },
  { value: "agricultural-lands", label: "Agricultural Land" },
  { value: "commercial-lands", label: "Commercial Land" },
  { value: "farm-lands", label: "Farm Land" },
  { value: "investment-properties", label: "Investment Property" }
];

const AVAILABLE_FEATURES = [
  "Clear Title",
  "Patta Available",
  "Registration Ready",
  "Road Access",
  "Water Facility",
  "Electricity Available",
  "Corner Plot"
];

interface PropertyFormProps {
  initialData?: Property;
  isEdit?: boolean;
}

export default function PropertyForm({ initialData, isEdit = false }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  
  // Generating a property ID if not edit
  const [propertyId] = useState(() => initialData?.id || Math.random().toString(36).substr(2, 9) + "-" + Math.random().toString(36).substr(2, 9));

  // Form Fields State
  const [title, setTitle] = useState(initialData?.title || "");
  const [propertyType, setPropertyType] = useState<any>(initialData?.property_type || "residential-plots");
  const [location, setLocation] = useState(initialData?.location || "");
  const [area, setArea] = useState(initialData?.area || "");
  const [price, setPrice] = useState<number | string>(initialData?.price || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [detailedDescription, setDetailedDescription] = useState(initialData?.detailed_description || "");
  const [mapUrl, setMapUrl] = useState(initialData?.map_url || "");
  const [latitude, setLatitude] = useState<number | string>(initialData?.latitude || "");
  const [longitude, setLongitude] = useState<number | string>(initialData?.longitude || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  
  const [surveyNumber, setSurveyNumber] = useState(initialData?.survey_number || "");
  const [pattaStatus, setPattaStatus] = useState(initialData?.patta_status || "");
  const [roadAccess, setRoadAccess] = useState(initialData?.road_access || "");
  const [waterAvailability, setWaterAvailability] = useState(initialData?.water_availability || "");
  const [electricityAvailability, setElectricityAvailability] = useState(initialData?.electricity_availability || "");

  // Features Checklist State
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(initialData?.features || []);

  // Images State
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  // Nearby Facilities State
  const [schoolDist, setSchoolDist] = useState("");
  const [hospitalDist, setHospitalDist] = useState("");
  const [busDist, setBusDist] = useState("");
  const [railwayDist, setRailwayDist] = useState("");
  const [marketDist, setMarketDist] = useState("");

  // Initialize landmarks distances if editing
  useEffect(() => {
    if (initialData?.nearby_facilities) {
      initialData.nearby_facilities.forEach((fac) => {
        const name = fac.name.toLowerCase();
        if (name.includes("school")) setSchoolDist(fac.distance);
        if (name.includes("hospital")) setHospitalDist(fac.distance);
        if (name.includes("bus")) setBusDist(fac.distance);
        if (name.includes("railway") || name.includes("station")) setRailwayDist(fac.distance);
        if (name.includes("market")) setMarketDist(fac.distance);
      });
    }
  }, [initialData]);

  // Handle Feature Checkbox Change
  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  // Handle Local image file drops & uploads
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingImages(true);
    const filesArray = Array.from(e.target.files);

    try {
      const uploadedUrls: string[] = [];

      for (const file of filesArray) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `properties/${propertyId}/${fileName}`;

        if (isSupabaseConfigured) {
          // Upload to Supabase Storage
          const { data, error } = await supabase.storage.from("properties").upload(filePath, file);
          if (error) throw error;

          // Get Public URL
          const { data: urlData } = supabase.storage.from("properties").getPublicUrl(filePath);
          if (urlData?.publicUrl) {
            uploadedUrls.push(urlData.publicUrl);
          }
        } else {
          // Mock Upload: Add local asset url helper in mock mode
          // Generate a local object URL to display preview
          const objectUrl = URL.createObjectURL(file);
          uploadedUrls.push(objectUrl);
        }
      }

      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err: any) {
      alert(`Image upload failed: ${err.message}`);
    } finally {
      setUploadingImages(false);
    }
  };

  // Remove uploaded image from display array
  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Format Nearby Facilities Array
    const nearby_facilities: NearbyFacility[] = [];
    if (schoolDist.trim()) nearby_facilities.push({ name: "School / College", distance: schoolDist });
    if (hospitalDist.trim()) nearby_facilities.push({ name: "Hospital", distance: hospitalDist });
    if (busDist.trim()) nearby_facilities.push({ name: "Bus Stand", distance: busDist });
    if (railwayDist.trim()) nearby_facilities.push({ name: "Railway Station", distance: railwayDist });
    if (marketDist.trim()) nearby_facilities.push({ name: "Local Market", distance: marketDist });

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const payload: any = {
      id: propertyId,
      slug,
      title,
      property_type: propertyType,
      location,
      area,
      price: Number(price),
      description,
      detailed_description: detailedDescription,
      map_url: mapUrl || `https://maps.google.com/maps?q=${latitude || 0},${longitude || 0}&t=&z=14&ie=UTF8&iwloc=&output=embed`,
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
      featured,
      survey_number: surveyNumber,
      patta_status: pattaStatus,
      road_access: roadAccess || "20 Feet Access Road",
      water_availability: waterAvailability || "Ground Water Available",
      electricity_availability: electricityAvailability || "Grid Power Connection Nearby",
      features: selectedFeatures,
      nearby_facilities,
      images // array of strings
    };

    try {
      if (isEdit) {
        const { error } = await supabase.from("properties").update(payload).eq("id", propertyId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("properties").insert(payload);
        if (error) throw error;
      }

      router.push("/admin/properties");
    } catch (err: any) {
      alert(`Failed to save listing: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-10 font-sans text-left text-slate-700">
      
      {/* Back and Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <Link href="/admin/properties" className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-bold hover:text-gold-600 transition-colors uppercase tracking-wider mb-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Properties List
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-wide">
            {isEdit ? "Edit Property Listing" : "Add New Property"}
          </h1>
        </div>
        <button
          type="submit"
          disabled={loading || uploadingImages}
          className="px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-bold rounded-xl active:scale-[0.98] transition-all text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4.5 w-4.5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Listing"
          )}
        </button>
      </div>

      {/* Grid Layout Form Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Columns: Core Metadata inputs */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card: Basic Information */}
          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Building2 className="h-4.5 w-4.5 text-gold-500" />
              Basic Information
            </h3>
            
            {/* Title */}
            <div className="space-y-1">
              <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Property Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. DTCP Approved Residential Plot in Paramakudi"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-2xs"
              />
            </div>

            {/* Grid properties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Type */}
              <div className="space-y-1">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Property Type *</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Location *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Paramakudi"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-2xs"
                />
              </div>

              {/* Area */}
              <div className="space-y-1">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Area *</label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. 5 Cents or 1.2 Acres"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-2xs"
                />
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Price (₹) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">₹</span>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 500000"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* Featured toggle */}
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-2xs mt-2 select-none">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-gold-600 focus:ring-gold-500 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="featured" className="cursor-pointer font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                Featured Property (display on homepage and top listings)
              </label>
            </div>

          </div>

          {/* Card: Detailed descriptions */}
          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 border-b border-slate-100 pb-2">
              Descriptions
            </h3>
            
            {/* Short snippet */}
            <div className="space-y-1">
              <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Short Description (for Listing Preview Cards) *</label>
              <textarea
                rows={2}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of property features suitable for catalog listing cards..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all resize-none shadow-2xs"
              />
            </div>

            {/* Detailed text */}
            <div className="space-y-1">
              <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Detailed Description *</label>
              <textarea
                rows={6}
                required
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
                placeholder="Full technical analysis and writeup regarding this land, registration history, boundaries, and surrounding areas..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all resize-none shadow-2xs"
              />
            </div>
          </div>

          {/* Card: Features Checklist */}
          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Info className="h-4.5 w-4.5 text-gold-500" />
              Property highlights & badges
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVAILABLE_FEATURES.map((feature) => {
                const checked = selectedFeatures.includes(feature);
                return (
                  <div 
                    key={feature} 
                    onClick={() => handleFeatureChange(feature)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                      checked 
                        ? "bg-gold-500/5 border-gold-500 text-gold-700 shadow-2xs font-semibold" 
                        : "bg-white border-slate-200 text-slate-600 hover:border-gold-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}} // Controlled by outer div click
                      className="h-4 w-4 rounded border-slate-300 text-gold-600 focus:ring-gold-500 cursor-pointer pointer-events-none"
                    />
                    <span className="text-xs">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card: Technical specs */}
          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 border-b border-slate-100 pb-2">
              Technical Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Survey Number</label>
                <input
                  type="text"
                  value={surveyNumber}
                  onChange={(e) => setSurveyNumber(e.target.value)}
                  placeholder="e.g. 245/2B"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-2xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Patta Status</label>
                <input
                  type="text"
                  value={pattaStatus}
                  onChange={(e) => setPattaStatus(e.target.value)}
                  placeholder="e.g. Single Patta Available"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-2xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Road Access Type</label>
                <input
                  type="text"
                  value={roadAccess}
                  onChange={(e) => setRoadAccess(e.target.value)}
                  placeholder="e.g. 30 Feet Tar Road"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-2xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Water Availability</label>
                <input
                  type="text"
                  value={waterAvailability}
                  onChange={(e) => setWaterAvailability(e.target.value)}
                  placeholder="e.g. Borewell sweet water"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-2xs"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Electricity Service</label>
                <input
                  type="text"
                  value={electricityAvailability}
                  onChange={(e) => setElectricityAvailability(e.target.value)}
                  placeholder="e.g. 3-Phase Domestic Connection active"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Columns: Media, Map URL, and Landmarks */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card: Drag & Drop Image Upload */}
          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 border-b border-slate-100 pb-2">
              Listing Images
            </h3>
            
            {/* Upload Area */}
            <div className="relative border-2 border-dashed border-slate-200 hover:border-gold-500 rounded-xl p-6 text-center transition-colors bg-slate-50/50">
              <input
                type="file"
                multiple
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageUpload}
                disabled={uploadingImages}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="space-y-2 text-slate-500">
                <Upload className="h-8 w-8 text-slate-400 mx-auto" />
                <p className="text-xs sm:text-sm font-semibold text-slate-700">Drag & Drop files here</p>
                <p className="text-[10px] text-slate-400">Supported formats: JPG, PNG, WEBP</p>
              </div>
            </div>

            {/* Loading Indicator */}
            {uploadingImages && (
              <div className="flex gap-2 items-center justify-center text-xs font-semibold text-gold-600">
                <Loader2 className="h-4 w-4 animate-spin text-gold-600" />
                Uploading Files...
              </div>
            )}

            {/* Uploaded Previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 mt-2">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-slate-50 group">
                    <img src={img} alt={`Preview ${idx + 1}`} className="object-cover w-full h-full" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-rose-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Card: Location details */}
          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Map className="h-4.5 w-4.5 text-gold-500" />
              Location Settings
            </h3>
            
            {/* Google maps URL */}
            <div className="space-y-1">
              <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Google Maps URL / Embed URL</label>
              <input
                type="text"
                value={mapUrl}
                onChange={(e) => setMapUrl(e.target.value)}
                placeholder="https://maps.google.com/maps?q=latitude,longitude..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-xs font-semibold transition-all shadow-2xs"
              />
            </div>

            {/* Latitude and Longitude coordinate fallback */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <Compass className="h-3 w-3 text-slate-400" />
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="e.g. 9.5444"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-xs font-semibold transition-all shadow-2xs"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <Compass className="h-3 w-3 text-slate-400" />
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="e.g. 78.5914"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-xs font-semibold transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* Card: Nearby landmarks */}
          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 border-b border-slate-100 pb-2">
              Nearby Landmarks (Distance)
            </h3>
            
            {/* School */}
            <div className="space-y-1">
              <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Schools / Colleges</label>
              <input
                type="text"
                value={schoolDist}
                onChange={(e) => setSchoolDist(e.target.value)}
                placeholder="e.g. 1.0 km"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-xs font-semibold transition-all shadow-2xs"
              />
            </div>

            {/* Hospital */}
            <div className="space-y-1">
              <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Hospitals</label>
              <input
                type="text"
                value={hospitalDist}
                onChange={(e) => setHospitalDist(e.target.value)}
                placeholder="e.g. 2.0 km"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-xs font-semibold transition-all shadow-2xs"
              />
            </div>

            {/* Bus Stand */}
            <div className="space-y-1">
              <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Bus Stand</label>
              <input
                type="text"
                value={busDist}
                onChange={(e) => setBusDist(e.target.value)}
                placeholder="e.g. 1.5 km"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-xs font-semibold transition-all shadow-2xs"
              />
            </div>

            {/* Railway Station */}
            <div className="space-y-1">
              <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Railway Station</label>
              <input
                type="text"
                value={railwayDist}
                onChange={(e) => setRailwayDist(e.target.value)}
                placeholder="e.g. 3.0 km"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-xs font-semibold transition-all shadow-2xs"
              />
            </div>

            {/* Markets */}
            <div className="space-y-1">
              <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Local Markets</label>
              <input
                type="text"
                value={marketDist}
                onChange={(e) => setMarketDist(e.target.value)}
                placeholder="e.g. 1.2 km"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-xs font-semibold transition-all shadow-2xs"
              />
            </div>

          </div>

        </div>

      </div>

    </form>
  );
}
