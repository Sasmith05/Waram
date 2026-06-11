"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, ShieldAlert } from "lucide-react";
import { contactInfo, advocateProfile } from "@/data/content";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 font-sans">
      {/* Upper Footer Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Logo & Info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative h-9 w-9 rounded-md overflow-hidden shrink-0">
                <Image
                  src="/waram.jpg"
                  alt="Waram Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif font-bold text-base text-slate-900 tracking-wide">
                S RAJASEKAR | ADVOCATE
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-md">
              Professional legal consultation, notary public services, and property registration assistance in Rameswaram, Tamil Nadu.
            </p>
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm text-slate-500">
            <div className="flex gap-2 items-center">
              <MapPin className="h-4 w-4 text-gold-500 shrink-0" />
              <span>{contactInfo.address}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Phone className="h-4 w-4 text-gold-500 shrink-0" />
              <a href={`tel:${contactInfo.phone}`} className="hover:text-gold-600 transition-colors duration-200 font-medium">
                {contactInfo.phoneDisplay}
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bar Council of India Disclaimer */}
      <div className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <div className="p-2 bg-gold-500/10 rounded-lg text-gold-600 shrink-0">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-slate-800 font-semibold text-xs tracking-wider uppercase">
                Legal Disclaimer (BCI Rules Compliant)
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                As per Bar Council of India rules, this website is intended solely for informational purposes and does not solicit clients. By clicking through, you acknowledge that you are seeking information of your own accord and that no attorney-client relationship is created hereby.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Copyright Area */}
      <div className="border-t border-slate-200 text-xs py-5 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p className="text-center sm:text-left">
            &copy; {currentYear} {advocateProfile.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-slate-600 transition-colors duration-200">
              Disclaimer
            </Link>
            <Link href="/services" className="hover:text-slate-600 transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
