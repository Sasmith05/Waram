"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";
import { contactInfo, advocateProfile } from "@/data/content";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { locale, t } = useLanguage();

  const addressText = locale === "en" 
    ? contactInfo.address 
    : "12/8A ராமர் தீர்த்தம் வடக்கு, ராமேஸ்வரம், தமிழ்நாடு 623526, இந்தியா";

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 font-sans">
      {/* Upper Footer Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo & Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative h-12 w-12 rounded-xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/waram.jpg"
                  alt="Waram Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block font-serif font-extrabold text-base text-slate-900 tracking-wide leading-tight">
                  {locale === "en" ? "RAJASEKAR" : "ராஜசேகர்"}
                </span>
                <span className="block text-[9px] uppercase text-gold-600 font-bold tracking-widest leading-none mt-0.5">
                  {locale === "en" ? "ADVOCATE & NOTARY PUBLIC" : "வழக்கறிஞர் & நோட்டரி பொது"}
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              {t("services.description")}
            </p>
          </div>

          {/* Office & Address */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-sm tracking-wide uppercase font-serif">
              {locale === "en" ? "Office" : "அலுவலகம்"}
            </h4>
            <div className="space-y-2 text-sm text-slate-500">
              <p className="font-semibold text-slate-800">{t("about.chamberName")}</p>
              <a 
                href={contactInfo.googleMapShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2.5 items-start hover:text-gold-600 transition-colors duration-200 text-left"
              >
                <MapPin className="h-4.5 w-4.5 text-gold-500 shrink-0 mt-0.5" />
                <span>{addressText}</span>
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-sm tracking-wide uppercase font-serif">
              {locale === "en" ? "Contact Us" : "தொடர்பு கொள்ள"}
            </h4>
            <div className="space-y-2.5 text-sm text-slate-500">
              <div className="flex gap-2.5 items-center">
                <Phone className="h-4.5 w-4.5 text-gold-500 shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-gold-600 transition-colors duration-200 font-medium">
                  {contactInfo.phoneDisplay}
                </a>
              </div>
              <div className="flex gap-2.5 items-center">
                <Mail className="h-4.5 w-4.5 text-gold-500 shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-gold-600 transition-colors duration-200 font-medium font-mono">
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Block */}
        <div className="mt-8 pt-8 border-t border-slate-200/60 text-slate-400 text-xs leading-relaxed">
          <strong className="block text-slate-600 font-semibold mb-1 uppercase tracking-wider">
            {t("footer.legalDisclaimer")}:
          </strong>
          <p>{t("footer.disclaimerText")}</p>
        </div>
      </div>

      {/* Lower Copyright Area */}
      <div className="border-t border-slate-200 text-xs py-5 bg-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p className="text-center sm:text-left text-slate-500">
            &copy; {currentYear} {locale === "en" ? advocateProfile.name : "வழக்கறிஞர் எஸ். ராஜசேகர்"}. {t("footer.rightsReserved")}
          </p>
          <div className="flex gap-6 text-slate-500">
            <Link href="/contact" className="hover:text-slate-700 transition-colors duration-200">
              {locale === "en" ? "Disclaimer" : "பொறுப்புத் துறப்பு"}
            </Link>
            <Link href="/services" className="hover:text-slate-700 transition-colors duration-200">
              {locale === "en" ? "Services" : "சேவைகள்"}
            </Link>
            <Link href="/admin/login" className="hover:text-slate-400 hover:underline transition-colors duration-200 text-slate-400/80">
              {locale === "en" ? "Admin Login" : "நிர்வாகி உள்நுழைவு"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

