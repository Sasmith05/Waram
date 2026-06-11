"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { contactInfo, advocateProfile } from "@/data/content";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(
    contactInfo.whatsappMessage
  )}`;

  return (
    <div className="relative pt-20 pb-16 bg-white text-slate-900">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">Contact Chamber</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide">
            Get in Touch for <span className="gold-text-gradient">Legal Counsel</span>
          </h1>
          <div className="h-[2px] w-20 bg-gold-500 mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
            Need notary public attestation or land documentation registration? Speak directly or drop a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Contact Details & Map */}
          <div className="lg:col-span-5 space-y-8 font-sans text-slate-700">
            
            {/* Contact Cards */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">
                Office Information
              </h3>

              <ul className="space-y-5 text-sm sm:text-base text-slate-600">
                {/* Name */}
                <li className="flex gap-4 items-center">
                  <div className="p-2.5 bg-white border border-slate-200 text-gold-600 rounded-lg shrink-0">
                    <span className="font-serif font-bold text-xs">Adv</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-0.5">Advocate Name</span>
                    <span className="text-slate-800 font-bold text-sm">
                      {advocateProfile.name}
                    </span>
                  </div>
                </li>

                {/* Office Address */}
                <li className="flex gap-4 items-start">
                  <div className="p-2.5 bg-white border border-slate-200 text-gold-600 rounded-lg shrink-0 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-0.5">Office Address</span>
                    <span className="text-slate-700 leading-relaxed text-sm">
                      {contactInfo.address}
                    </span>
                  </div>
                </li>

                {/* Call/Phone */}
                <li className="flex gap-4 items-center">
                  <div className="p-2.5 bg-white border border-slate-200 text-gold-600 rounded-lg shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-0.5">Phone Contact</span>
                    <a href="tel:+918760555585" className="text-slate-800 hover:text-gold-600 transition-colors duration-200 text-sm font-semibold">
                      {contactInfo.phoneDisplay}
                    </a>
                  </div>
                </li>

                {/* Email Address */}
                <li className="flex gap-4 items-center">
                  <div className="p-2.5 bg-white border border-slate-200 text-gold-600 rounded-lg shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-0.5">Email Inquiries</span>
                    <a href={`mailto:${contactInfo.email}`} className="text-slate-700 hover:text-gold-600 transition-colors duration-200 text-sm break-all font-mono">
                      {contactInfo.email}
                    </a>
                  </div>
                </li>

                {/* Timings */}
                <li className="flex gap-4 items-start">
                  <div className="p-2.5 bg-white border border-slate-200 text-gold-600 rounded-lg shrink-0 mt-0.5">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-0.5">Office Timings</span>
                    <span className="text-slate-700 text-sm">
                      Mon – Sat: 10:00 AM – 6:30 PM
                    </span>
                  </div>
                </li>
              </ul>

              {/* Instant WhatsApp Help Button */}
              <div className="pt-4 border-t border-slate-200">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-[#25D366] text-white hover:bg-[#1ebd59] font-bold rounded-lg transition-transform duration-300 hover:scale-[1.02] active:scale-95 text-sm shadow-sm"
                >
                  <MessageSquare className="h-5 w-5" />
                  Quick Inquiry on WhatsApp
                </a>
              </div>
            </div>

            {/* Embedded Google Maps Placeholder */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-2.5 overflow-hidden shadow-sm">
              <a 
                href={contactInfo.googleMapShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-white block group/map"
              >
                <iframe
                  src={contactInfo.googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Waram Documentation Office Google Map"
                  className="contrast-105 brightness-95 pointer-events-none"
                />
                <div className="absolute inset-0 bg-slate-950/0 group-hover/map:bg-slate-950/5 transition-colors duration-200" />
              </a>
              <div className="grid grid-cols-3 gap-2 px-2 py-3 mt-2 font-sans text-center">
                <a
                  href={contactInfo.googleMapShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-[11px] font-bold text-gold-600 hover:text-slate-900 uppercase tracking-wider transition-colors"
                >
                  View Larger Map
                </a>
                <a
                  href={contactInfo.googleMapShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-[11px] font-bold text-gold-600 hover:text-slate-900 uppercase tracking-wider transition-colors border-x border-slate-200"
                >
                  Get Directions
                </a>
                <a
                  href={contactInfo.googleMapShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-[11px] font-bold text-gold-600 hover:text-slate-900 uppercase tracking-wider transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

          </div>

          {/* Right Block: Interactive Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

      </div>
    </div>
  );
}
