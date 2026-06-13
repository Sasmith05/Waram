"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { servicesData, contactInfo } from "@/data/content";
import { CheckCircle2, PhoneCall, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

export default function Services() {
  const { locale, t } = useLanguage();
  const dict = translations[locale] || translations.en;

  return (
    <div className="relative pt-20 pb-16 bg-white text-slate-900">
      
      {/* Background blur decorative blobs */}
      <div className="absolute top-40 left-10 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">
            {t("services.scope")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide">
            {locale === "en" ? (
              <>
                Professional Legal <span className="gold-text-gradient">Services & Solutions</span>
              </>
            ) : (
              <>
                தொழில்முறை சட்ட <span className="gold-text-gradient">சேவைகள் & தீர்வுகள்</span>
              </>
            )}
          </h1>
          <div className="h-[2px] w-20 bg-gold-500 mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
            {t("services.description")}
          </p>
        </div>

        {/* Detailed Service Segment Grid */}
        <div className="space-y-12">
          {servicesData.map((service) => {
            const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[service.iconName] || Icons.Scale;
            
            // Fetch translations from dictionary
            const serviceDetails = dict.services.items[service.id as keyof typeof dict.services.items] || dict.services.items["legal-consultation"];

            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="scroll-mt-28 bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-10 transition-all duration-300 shadow-sm gold-glow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  
                  {/* Service Left Block: Icon + Description */}
                  <div className="lg:col-span-5 space-y-4 font-sans">
                    <div className="inline-flex p-4 bg-gold-500/10 text-gold-600 rounded-2xl border border-gold-500/20">
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-wide">
                      {serviceDetails.title}
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {serviceDetails.description}
                    </p>
                    <div className="pt-4 font-sans">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-600 font-bold hover:text-slate-900 transition-colors duration-200 cursor-pointer"
                      >
                        {t("services.inquire")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Service Right Block: Deliverables & Scope details */}
                  <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4 font-sans text-slate-700 shadow-sm">
                    <h3 className="text-slate-800 text-sm uppercase tracking-wider font-semibold border-b border-slate-100 pb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                      {t("services.scopeTitle")}
                    </h3>
                    
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {serviceDetails.details.map((detail, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm">
                          <CheckCircle2 className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                          <span className="text-slate-600 leading-normal">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Consultation CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-sm gold-glow"
        >
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            {t("services.ctaTitle")}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            {t("services.ctaText")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 font-sans">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-bold rounded-lg transition-colors duration-200 text-sm shadow-sm active:scale-95 cursor-pointer"
            >
              <PhoneCall className="h-4 w-4" />
              {t("services.ctaBtn")}
            </Link>
            <a
              href={`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(t("contact.whatsappMessage"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:border-gold-500 hover:bg-slate-50 transition-colors duration-200 text-sm active:scale-95 shadow-sm cursor-pointer"
            >
              {t("services.ctaWa")}
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
