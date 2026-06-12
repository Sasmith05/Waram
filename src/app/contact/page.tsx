"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { contactInfo, advocateProfile } from "@/data/content";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { locale, t } = useLanguage();

  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(
    t("contact.whatsappMessage")
  )}`;

  const addressText = locale === "en" 
    ? contactInfo.address 
    : "12/8A ராமர் தீர்த்தம் வடக்கு, ராமேஸ்வரம், தமிழ்நாடு 623526, இந்தியா";

  return (
    <div className="relative pt-20 pb-16 bg-white text-slate-900">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">
            {locale === "en" ? "Contact Office" : "தொடர்பு கொள்ள"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide">
            {locale === "en" ? (
              <>
                Get in Touch for <span className="gold-text-gradient">Legal Counsel</span>
              </>
            ) : (
              <>
                சட்ட ஆலோசனை பெற <span className="gold-text-gradient">தொடர்பு கொள்ளவும்</span>
              </>
            )}
          </h1>
          <div className="h-[2px] w-20 bg-gold-500 mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
            {locale === "en"
              ? "Need notary public attestation or land documentation registration? Speak directly or drop a message."
              : "நோட்டரி பொது சான்றொப்பம் அல்லது நில ஆவண பதிவு தேவையா? நேரடியாகப் பேசவும் அல்லது செய்தி அனுப்பவும்."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Contact Details & Map */}
          <div className="lg:col-span-5 space-y-8 font-sans text-slate-700">
            
            {/* Contact Cards */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">
                {locale === "en" ? "Office Information" : "அலுவலகத் தகவல்"}
              </h3>

              <ul className="space-y-5 text-sm sm:text-base text-slate-600">
                {/* Name */}
                <li className="flex gap-4 items-center">
                  <div className="p-2.5 bg-white border border-slate-200 text-gold-600 rounded-lg shrink-0">
                    <span className="font-serif font-bold text-xs">Adv</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-0.5">
                      {locale === "en" ? "Advocate Name" : "வழக்கறிஞர் பெயர்"}
                    </span>
                    <span className="text-slate-800 font-bold text-sm">
                      {locale === "en" ? advocateProfile.name : "வழக்கறிஞர் எஸ். ராஜசேகர்"}
                    </span>
                  </div>
                </li>

                {/* Office Address */}
                <li className="flex gap-4 items-start">
                  <div className="p-2.5 bg-white border border-slate-200 text-gold-600 rounded-lg shrink-0 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-0.5">
                      {t("contact.officeChamber")}
                    </span>
                    <span className="text-slate-700 leading-relaxed text-sm">
                      {addressText}
                    </span>
                  </div>
                </li>

                {/* Call/Phone */}
                <li className="flex gap-4 items-center">
                  <div className="p-2.5 bg-white border border-slate-200 text-gold-600 rounded-lg shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-0.5">
                      {t("contact.phone")}
                    </span>
                    <a href={`tel:${contactInfo.phone}`} className="text-slate-800 hover:text-gold-600 transition-colors duration-200 text-sm font-semibold cursor-pointer">
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
                    <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-0.5">
                      {t("contact.email")}
                    </span>
                    <a href={`mailto:${contactInfo.email}`} className="text-slate-700 hover:text-gold-600 transition-colors duration-200 text-sm break-all font-mono cursor-pointer">
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
                    <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-0.5">
                      {locale === "en" ? "Office Timings" : "அலுவலக வேலை நேரம்"}
                    </span>
                    <span className="text-slate-700 text-sm">
                      {locale === "en" ? "Mon – Sat: 10:00 AM – 6:30 PM" : "திங்கள் – சனி: காலை 10:00 – மாலை 6:30"}
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
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-[#25D366] text-white hover:bg-[#1ebd59] font-bold rounded-lg transition-transform duration-300 hover:scale-[1.02] active:scale-95 text-sm shadow-sm cursor-pointer"
                >
                  <MessageSquare className="h-5 w-5" />
                  {locale === "en" ? "Quick Inquiry on WhatsApp" : "வாட்ஸ்அப்பில் விரைவான விசாரணை"}
                </a>
              </div>
            </div>

            {/* Embedded Google Maps Placeholder */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-2.5 overflow-hidden shadow-sm">
              <a 
                href={contactInfo.googleMapShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-white block group/map cursor-pointer"
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
                  className="text-[10px] sm:text-[11px] font-bold text-gold-600 hover:text-slate-900 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {t("contact.viewLargerMap")}
                </a>
                <a
                  href={contactInfo.googleMapShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-[11px] font-bold text-gold-600 hover:text-slate-900 uppercase tracking-wider transition-colors border-x border-slate-200 cursor-pointer"
                >
                  {t("contact.getDirections")}
                </a>
                <a
                  href={contactInfo.googleMapShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-[11px] font-bold text-gold-600 hover:text-slate-900 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {t("contact.openMaps")}
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
