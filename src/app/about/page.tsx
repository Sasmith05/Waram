"use client";

import React from "react";
import Link from "next/link";
import { Scale, Award, BookOpen, Languages, CheckCircle2, ChevronRight, Phone } from "lucide-react";
import { advocateProfile, contactInfo } from "@/data/content";

export default function About() {
  return (
    <div className="relative pt-20 pb-16 bg-white text-slate-900">
      {/* Background Decorative Accents */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">Professional Profile</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide">
            About <span className="gold-text-gradient">Advocate S Rajasekar</span>
          </h1>
          <div className="h-[2px] w-20 bg-gold-500 mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
            Providing professional legal consultation, notary services, and land registration assistance in Rameswaram, Tamil Nadu.
          </p>
        </div>

        {/* Bio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Biography Block */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-semibold text-slate-900 tracking-wide flex items-center gap-2">
                <Scale className="h-6 w-6 text-gold-600" />
                Legal Consultant & Notary Public
              </h2>
              <p className="text-slate-600 leading-relaxed text-base font-sans">
                {advocateProfile.aboutFull}
              </p>
              <p className="text-slate-500 leading-relaxed text-sm font-sans">
                Advocate S Rajasekar has prioritised legal clarity and documentation accuracy across Rameswaram and local sub-registrar offices. By maintaining complete transparency and ensuring all land records are checked for title clearance, clients are guided seamlessly through deed execution.
              </p>
            </div>

            {/* Qualifications */}
            <div className="space-y-6 bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl">
              <h3 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-gold-600" />
                Professional Qualifications
              </h3>
              <ul className="space-y-4 font-sans text-slate-700">
                {advocateProfile.qualifications.map((qual, idx) => (
                  <li key={idx} className="flex gap-3.5 items-start text-sm">
                    <CheckCircle2 className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Licenses */}
            <div className="space-y-6 bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl">
              <h3 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <Award className="h-5 w-5 text-gold-600" />
                Licenses & Registrations
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans text-slate-700">
                {advocateProfile.registrations.map((reg, idx) => (
                  <li key={idx} className="flex gap-2.5 items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <ChevronRight className="h-4 w-4 text-gold-500 shrink-0" />
                    <span className="font-mono text-xs">{reg}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Facts Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm gold-glow font-sans">
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 border-b border-slate-200 pb-3">
                Key Details
              </h3>

              <div className="space-y-6">
                {/* Languages */}
                <div className="pb-4 border-b border-slate-200 space-y-2">
                  <div className="flex gap-2 items-center text-slate-500 text-sm">
                    <Languages className="h-4 w-4 text-gold-500" />
                    <span>Languages Spoken</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {advocateProfile.languages.map((lang) => (
                      <span key={lang} className="text-xs font-semibold px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded-md">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Office address */}
                <div className="pb-4 border-b border-slate-200 space-y-1">
                  <span className="text-slate-500 text-sm block">Office Address</span>
                  <span className="text-slate-800 text-sm font-medium leading-relaxed block">
                    {contactInfo.address}
                  </span>
                </div>

                {/* Chambers phone */}
                <div className="space-y-1">
                  <span className="text-slate-500 text-sm block">Contact Phone</span>
                  <a href={`tel:${contactInfo.phone}`} className="text-gold-600 font-bold text-base hover:text-gold-700 transition-colors">
                    {contactInfo.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="pt-8 mt-4">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-bold rounded-lg transition-colors duration-200 shadow-sm active:scale-95 text-sm"
                >
                  <Phone className="h-4 w-4" />
                  Schedule Office Consultation
                </Link>
              </div>
            </div>

            {/* Practice Areas */}
            <div className="bg-slate-50 border border-slate-200/60 p-6 sm:p-8 rounded-2xl">
              <h3 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">
                Practice Areas
              </h3>
              <div className="grid grid-cols-1 gap-2.5 font-sans text-slate-700">
                {advocateProfile.practiceAreas.map((area) => (
                  <div key={area} className="flex gap-2.5 items-center text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
