"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import { servicesData, advocateProfile, contactInfo } from "@/data/content";
import ServiceCard from "@/components/ServiceCard";
import ContactForm from "@/components/ContactForm";
import { propertiesData } from "@/data/properties";
import { supabase } from "@/lib/supabase";
import PropertyCard from "@/components/PropertyCard";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const [properties, setProperties] = useState<any[]>(propertiesData);
  const { locale, t } = useLanguage();

  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(
    t("contact.whatsappMessage")
  )}`;

  const addressText = locale === "en" 
    ? contactInfo.address 
    : "12/8A ராமர் தீர்த்தம் வடக்கு, ராமேஸ்வரம், தமிழ்நாடு 623526, இந்தியா";

  useEffect(() => {
    async function loadFeatured() {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("featured", true)
          .limit(3);

        if (error) throw error;
        if (data && data.length > 0) {
          const mapped = data.map((p: any) => ({
            ...p,
            category: p.property_type,
            categoryDisplay: p.property_type
              .replace("-", " ")
              .replace(/\b\w/g, (c: string) => c.toUpperCase()),
            priceDisplay: `₹${Number(p.price).toLocaleString("en-IN")}`
          }));
          setProperties(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch featured properties from Supabase", err);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="relative overflow-hidden bg-white text-slate-900">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-24 pb-16 bg-white border-b border-slate-100/60">
        {/* Background Decorative Accents */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-slate-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-[1.15] tracking-wide"
              >
                {/* SEO Friendly rendering of both languages */}
                <span className={locale === "en" ? "block" : "hidden"}>
                  Trusted Legal Consultation, Notary Public & <span className="gold-text-gradient">Land Registration</span> Services
                </span>
                <span className={locale === "ta" ? "block font-serif text-3xl sm:text-4xl lg:text-5xl leading-snug" : "hidden"}>
                  நம்பகமான சட்ட ஆலோசனை, நோட்டரி பொது & <span className="gold-text-gradient">நிலப் பதிவு</span> சேவைகள்
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans"
              >
                {t("hero.description")}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-4 font-sans"
              >
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-bold rounded-lg shadow-sm transition-all duration-300 active:scale-95 text-base cursor-pointer"
                >
                  <Phone className="h-5 w-5" />
                  {t("hero.callNow")}
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:border-gold-500 hover:text-slate-950 transition-all duration-300 active:scale-95 text-base shadow-sm cursor-pointer"
                >
                  <MessageSquare className="h-5 w-5 text-[#25D366]" />
                  {t("hero.whatsapp")}
                </a>
              </motion.div>
            </div>

            {/* Right Column: Waram Logo */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full max-w-[450px] aspect-square flex items-center justify-center"
              >
                <Image
                  src="/waram.jpg"
                  alt="Waram Documentation Office Logo"
                  width={450}
                  height={450}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 rounded-2xl"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Box: Headline */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">
                {t("about.overview")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
                {locale === "en" ? advocateProfile.name : "வழக்கறிஞர் எஸ். ராஜசேகர்"}
              </h2>
              <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase font-sans">
                {t("about.subtitle")}
              </p>
              <div className="h-[2px] w-20 bg-gold-500" />
            </div>

            {/* Right Box: Bio details & contact facts */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-sans">
                {locale === "en" ? (
                  <>
                    Advocate <strong>S. Rajasekar</strong> has been practicing law since 1996, with extensive experience in Civil Law, Property Law, and Banking Law. He provides trusted legal guidance, notary public services, and registration documentation for individuals and businesses.
                  </>
                ) : (
                  <>
                    வழக்கறிஞர் <strong>எஸ். ராஜசேகர்</strong> 1996 முதல் சட்டப் பயிற்சி செய்து வருகிறார், சிவில் சட்டம், சொத்து சட்டம் மற்றும் வங்கிச் சட்டம் ஆகியவற்றில் விரிவான அனுபவம் பெற்றவர். தனிநபர்கள் மற்றும் வணிகங்களுக்கு நம்பகமான சட்ட வழிகாட்டுதல், நோட்டரி பொது சேவைகள் மற்றும் பதிவு ஆவணங்களை வழங்குகிறார்.
                  </>
                )}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 font-sans text-sm">
                <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-xl">
                  <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
                    {t("about.chamber")}
                  </span>
                  <span className="text-slate-700 font-medium font-sans">
                    {t("about.chamberName")}
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-xl">
                  <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
                    {t("about.practicingSince")}
                  </span>
                  <span className="text-slate-700 font-medium font-sans">
                    {t("about.expText")}
                  </span>
                </div>
              </div>

              <div className="pt-6 font-sans">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-gold-600 font-bold hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {t("about.viewCredentials")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Services Section (3-column layout) */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">
                {t("services.scope")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
                {t("services.title")}
              </h2>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed font-sans">
                {t("services.description")}
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-slate-950 rounded-lg hover:border-gold-500 transition-colors duration-200 font-semibold text-sm shadow-sm font-sans cursor-pointer"
            >
              {locale === "en" ? "All Services" : "அனைத்து சேவைகள்"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Services Grid (Exactly 3 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">
                {locale === "en" ? "Premium Plots & Lands" : "பிரீமியம் நிலங்கள்"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
                {locale === "en" ? "Featured Properties" : "சிறப்பு சொத்துக்கள்"}
              </h2>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed font-sans">
                {locale === "en" 
                  ? "Explore a handpicked selection of premium land plots, agricultural coconut groves, and high-value investment properties with verified documentation."
                  : "மதிப்பாய்வு செய்யப்பட்ட ஆவணங்களுடன் கூடிய பிரீமியம் மனைகள், தென்னை தோப்புகள் மற்றும் முதலீட்டு சொத்துக்களை ஆராயுங்கள்."}
              </p>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-slate-950 rounded-lg hover:border-gold-500 transition-colors duration-200 font-semibold text-sm shadow-sm font-sans cursor-pointer"
            >
              {locale === "en" ? "View All Properties" : "அனைத்து சொத்துக்களையும் காண்க"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties
              .filter((prop) => prop.featured || prop.isFeatured)
              .slice(0, 3)
              .map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
          </div>

        </div>
      </section>

      {/* 5. Contact Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">
              {locale === "en" ? "Contact Office" : "தொடர்பு கொள்ள"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
              {t("contact.title")}
            </h2>
            <div className="h-[2px] w-20 bg-gold-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Location Details */}
            <div className="lg:col-span-5 space-y-6 font-sans">
              <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl space-y-5">
                <div>
                  <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
                    {locale === "en" ? "Advocate Name" : "வழக்கறிஞர் பெயர்"}
                  </span>
                  <span className="text-slate-800 text-base font-bold">
                    {locale === "en" ? advocateProfile.name : "வழக்கறிஞர் எஸ். ராஜசேகர்"}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
                    {t("contact.phone")}
                  </span>
                  <a href={`tel:${contactInfo.phone}`} className="text-gold-600 text-base font-bold hover:text-gold-700 transition-colors cursor-pointer">
                    {contactInfo.phoneDisplay}
                  </a>
                </div>
                <div>
                  <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
                    {t("contact.officeChamber")}
                  </span>
                  <span className="text-slate-700 text-sm leading-relaxed block">{addressText}</span>
                </div>

                {/* Call & WhatsApp CTAs */}
                <div className="pt-4 border-t border-slate-200/80 flex flex-col gap-3">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gold-400 to-gold-600 text-white font-bold rounded-lg hover:from-gold-500 hover:to-gold-700 text-sm shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <Phone className="h-4 w-4" />
                    {t("hero.callNow")}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#1ebd59] text-sm shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4" />
                    {t("hero.whatsapp")}
                  </a>
                </div>
              </div>

              {/* Map Placeholder Card */}
              <div className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-2xl overflow-hidden shadow-sm">
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
                    title="Waram Documentation Office Location Map"
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

            {/* Inquiries Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
