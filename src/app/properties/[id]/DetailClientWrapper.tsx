"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Mail, 
  Phone, 
  User, 
  MessageSquare,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DetailClientWrapperProps {
  images?: string[];
  title?: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyLocation?: string;
  isForm?: boolean;
}

export default function DetailClientWrapper({
  images = [],
  title = "",
  propertyId = "",
  propertyTitle = "",
  propertyLocation = "",
  isForm = false
}: DetailClientWrapperProps) {
  // 1. STATE FOR GALLERY & LIGHTBOX
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // 2. STATE FOR ENQUIRY FORM
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: `Hello, I would like to inquire about "${propertyTitle}" in ${propertyLocation}. Please provide more details regarding registration procedures.`
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Gallery Navigation helpers
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Form Submit validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Full Name is required";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Mobile Number is required";
    } else if (!/^[0-9]{10,12}$/.test(formData.phone.replace(/[\s+-]/g, ""))) {
      errors.phone = "Enter a valid mobile number (10-12 digits)";
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Success Action
    try {
      const { error } = await supabase.from("enquiries").insert({
        property_id: propertyId || null,
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        message: formData.message
      });

      if (error) throw error;

      setFormErrors({});
      setIsSubmitted(true);
    } catch (err: any) {
      alert(`Submission failed: ${err.message}`);
    }
  };

  // RENDER DYNAMIC FORMS
  if (isForm) {
    if (isSubmitted) {
      return (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-6 text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600">
            <CheckCircle className="h-6 w-6" />
          </div>
          <h4 className="font-bold font-serif text-lg">Enquiry Received!</h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Thank you for your interest, <strong>{formData.name}</strong>. Advocate S. Rajasekar&apos;s office will contact you shortly regarding the details for <strong>{propertyTitle}</strong>.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                phone: "",
                email: "",
                message: `Hello, I would like to inquire about "${propertyTitle}" in ${propertyLocation}. Please provide more details regarding registration procedures.`
              });
            }}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
          >
            Send Another Inquiry
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans text-slate-700">
        
        {/* Name Input */}
        <div className="space-y-1">
          <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-slate-400" />
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Ramesh Kumar"
            className={`w-full px-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 text-sm font-semibold transition-all ${
              formErrors.name ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200 focus:border-gold-500"
            }`}
          />
          {formErrors.name && (
            <span className="block text-xs text-rose-500 font-semibold">{formErrors.name}</span>
          )}
        </div>

        {/* Phone Input */}
        <div className="space-y-1">
          <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-slate-400" />
            Mobile Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +91 98765 43210"
            className={`w-full px-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 text-sm font-semibold transition-all ${
              formErrors.phone ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200 focus:border-gold-500"
            }`}
          />
          {formErrors.phone && (
            <span className="block text-xs text-rose-500 font-semibold">{formErrors.phone}</span>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            Email Address (Optional)
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. ramesh@example.com"
            className={`w-full px-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 text-sm font-semibold transition-all ${
              formErrors.email ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200 focus:border-gold-500"
            }`}
          />
          {formErrors.email && (
            <span className="block text-xs text-rose-500 font-semibold">{formErrors.email}</span>
          )}
        </div>

        {/* Message Input */}
        <div className="space-y-1">
          <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
            Message
          </label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Write your custom query..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gold-400 to-gold-600 text-white font-bold rounded-xl hover:from-gold-500 hover:to-gold-700 active:scale-[0.98] transition-all text-sm shadow-xs cursor-pointer"
        >
          Send Enquiry
        </button>
      </form>
    );
  }

  // RENDER GALLERY INTERACTION
  return (
    <div className="space-y-4">
      {/* Active Featured Image Display */}
      <div 
        className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 cursor-pointer shadow-xs group"
        onClick={() => setIsLightboxOpen(true)}
      >
        <Image
          src={images[activeIndex]}
          alt={`${title} - Gallery Image ${activeIndex + 1}`}
          fill
          className="object-cover group-hover:scale-102 transition-transform duration-500"
          priority
        />
        {/* Swipe/Click overlay indicator */}
        <span className="absolute bottom-4 right-4 bg-slate-950/80 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/10">
          Click to Enlarge ({activeIndex + 1} / {images.length})
        </span>

        {/* Left/Right Navigation on Image Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white/95 text-slate-800 hover:bg-gold-500 hover:text-white transition-all shadow-xs border border-slate-200/40 opacity-0 group-hover:opacity-100 hidden sm:flex cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white/95 text-slate-800 hover:bg-gold-500 hover:text-white transition-all shadow-xs border border-slate-200/40 opacity-0 group-hover:opacity-100 hidden sm:flex cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Thumbnails grid */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, index) => {
          const isSelected = activeIndex === index;
          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border cursor-pointer transition-all ${
                isSelected ? "border-gold-500 ring-2 ring-gold-500/10 scale-98 shadow-xs" : "border-slate-200 hover:border-gold-400"
              }`}
            >
              <Image
                src={img}
                alt={`${title} Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-w-7xl) 10vw, 30vw"
              />
            </div>
          );
        })}
      </div>

      {/* LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-[999] flex items-center justify-center p-4 sm:p-10 select-none animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10 z-[1000] cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Modal Container */}
          <div 
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${title} - Lightbox Image`}
              fill
              className="object-contain"
              sizes="100vw"
            />

            {/* Left/Right Navigation on Modal */}
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 shadow-lg cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 shadow-lg cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Title / Indicator Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h4 className="font-serif font-bold text-base sm:text-lg">{title}</h4>
              <span className="text-xs text-slate-300 font-semibold mt-1 block uppercase tracking-wider">
                Listing Image {activeIndex + 1} of {images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
