"use client";

import React from "react";
import Link from "next/link";
import { Scale, Award, BookOpen, CheckCircle2, ChevronRight, Phone } from "lucide-react";
import { contactInfo } from "@/data/content";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

export default function About() {
  const { locale, t } = useLanguage();
  const dict = translations[locale] || translations.en;

  const bioParagraphs = dict.about.bioParagraphs;
  const qualificationsList = dict.about.qualificationsList;
  const registrationsList = dict.about.registrationsList;
  const practiceAreasList = dict.about.practiceAreasList;

  const bottomParagraph = locale === "en"
    ? "Advocate S. Rajasekar has prioritised legal clarity and documentation accuracy across Rameswaram and local sub-registrar offices. By maintaining complete transparency and ensuring all land records are checked for title clearance, clients are guided seamlessly through deed execution."
    : "வழக்கறிஞர் எஸ். ராஜசேகர் ராமேஸ்வரம் மற்றும் உள்ளூர் சார்-பதிவாளர் அலுவலகங்களில் சட்டத் தெளிவு மற்றும் ஆவணத் துல்லியத்திற்கு முன்னுரிமை அளித்து வருகிறார். முழு வெளிப்படைத்தன்மையைப் பேணுவதன் மூலமும், அனைத்து நிலப் பதிவுகளும் உரிமைத் தெளிவுக்காகச் சரிபார்க்கப்படுவதை உறுதி செய்வதன் மூலமும், கிரையப் பத்திரம் தயாரிப்பு மற்றும் பதிவுகளில் வாடிக்கையாளர்கள் தடையின்றி வழிநடத்தப்படுகிறார்கள்.";

  return (
    <div className="relative pt-20 pb-16 bg-white text-slate-900">
      {/* Background Decorative Accents */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">
            {locale === "en" ? "Professional Profile" : "தொழில்முறை சுயவிவரம்"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide">
            <span className={locale === "en" ? "block" : "hidden"}>
              About <span className="gold-text-gradient">Advocate S Rajasekar</span>
            </span>
            <span className={locale === "ta" ? "block text-3xl sm:text-4xl lg:text-5xl leading-snug" : "hidden"}>
              வழக்கறிஞர் <span className="gold-text-gradient">எஸ். ராஜசேகர்</span> பற்றி
            </span>
          </h1>
          <div className="h-[2px] w-20 bg-gold-500 mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
            {t("about.pageSubtitle")}
          </p>
        </div>

        {/* Bio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Biography Block */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-semibold text-slate-900 tracking-wide flex items-center gap-2">
                <Scale className="h-6 w-6 text-gold-600" />
                {t("about.bioTitle")}
              </h2>
              <div className="space-y-4">
                {bioParagraphs.map((para, idx) => (
                  <p key={idx} className="text-slate-600 leading-relaxed text-base font-sans">
                    {para}
                  </p>
                ))}
              </div>
              <p className="text-slate-500 leading-relaxed text-sm font-sans italic border-l-2 border-gold-500 pl-4 py-1">
                {bottomParagraph}
              </p>
            </div>

            {/* Qualifications */}
            <div className="space-y-6 bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl">
              <h3 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-gold-600" />
                {t("about.education")}
              </h3>
              <ul className="space-y-4 font-sans text-slate-700">
                {qualificationsList.map((qual, idx) => (
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
                {t("about.registrations")}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans text-slate-700">
                {registrationsList.map((reg, idx) => (
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
                {locale === "en" ? "Quick Information" : "சுருக்கமான தகவல்"}
              </h3>

              <div className="space-y-5">
                {/* Experience */}
                <div className="pb-3 border-b border-slate-100 space-y-1">
                  <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">
                    {locale === "en" ? "Experience" : "அனுபவம்"}
                  </span>
                  <span className="text-slate-800 text-sm font-semibold block">20+ Years</span>
                </div>

                {/* Education */}
                <div className="pb-3 border-b border-slate-100 space-y-1">
                  <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">
                    {locale === "en" ? "Education" : "கல்வி"}
                  </span>
                  <span className="text-slate-800 text-sm font-semibold block">B.A., B.L.</span>
                </div>

                {/* Practice Since */}
                <div className="pb-3 border-b border-slate-100 space-y-1">
                  <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">
                    {t("about.practicingSince")}
                  </span>
                  <span className="text-slate-800 text-sm font-semibold block">1996</span>
                </div>

                {/* Office */}
                <div className="pb-3 border-b border-slate-100 space-y-1">
                  <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">
                    {locale === "en" ? "Office" : "அலுவலகம்"}
                  </span>
                  <span className="text-slate-700 text-sm font-medium block leading-relaxed">
                    {t("about.chamberName")}, Rameswaram
                  </span>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">
                    {locale === "en" ? "Phone" : "தொலைபேசி"}
                  </span>
                  <a href={`tel:${contactInfo.phone}`} className="text-gold-600 font-bold text-base hover:text-gold-700 transition-colors block cursor-pointer">
                    {contactInfo.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="pt-8 mt-4">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-bold rounded-lg transition-colors duration-200 shadow-sm active:scale-95 text-sm cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  {locale === "en" ? "Schedule Office Consultation" : "அலுவலக ஆலோசனையை முன்பதிவு செய்"}
                </Link>
              </div>
            </div>

            {/* Practice Areas */}
            <div className="bg-slate-50 border border-slate-200/60 p-6 sm:p-8 rounded-2xl">
              <h3 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">
                {t("about.practiceAreas")}
              </h3>
              <div className="grid grid-cols-1 gap-2.5 font-sans text-slate-700">
                {practiceAreasList.map((area) => (
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
