"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import { servicesData, advocateProfile, contactInfo } from "@/data/content";
import ServiceCard from "@/components/ServiceCard";
import ContactForm from "@/components/ContactForm";
import { propertiesData } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";

export default function Home() {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(
    contactInfo.whatsappMessage
  )}`;

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
                Trusted Legal Consultation, Notary & <span className="gold-text-gradient">Land Registration</span> Services
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans"
              >
                Professional legal consultation, notary services, and land registration assistance in Rameswaram. Led by Advocate S. Rajasekar, dedicated to providing trustworthy guidance, accurate documentation, and seamless legal solutions.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-4 font-sans"
              >
                <a
                  href="tel:+918760555585"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-bold rounded-lg shadow-sm transition-all duration-300 active:scale-95 text-base"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:border-gold-500 hover:text-slate-950 transition-all duration-300 active:scale-95 text-base shadow-sm"
                >
                  <MessageSquare className="h-5 w-5 text-[#25D366]" />
                  WhatsApp Consultation
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
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
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
              <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">Profile Overview</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
                Advocate S. Rajasekar
              </h2>
              <p className="text-slate-505 text-sm font-semibold tracking-wide uppercase font-sans">
                B.A., B.L. &bull; 20+ Years of Practice
              </p>
              <div className="h-[2px] w-20 bg-gold-500" />
            </div>

            {/* Right Box: Bio details & contact facts */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-sans">
                Advocate <strong>S. Rajasekar</strong> has been practicing law since 1996, with extensive experience in Civil Law, Property Law, and Banking Law. He provides trusted legal guidance, notary services, and registration documentation for individuals and businesses.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 font-sans text-sm">
                <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-xl">
                  <span className="block text-xs uppercase text-slate-400 font-semibold tracking-wider mb-1">Office Chamber</span>
                  <span className="text-slate-700 font-medium font-sans">Waram Documentation Office, Rameswaram</span>
                </div>
                <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-xl">
                  <span className="block text-xs uppercase text-slate-400 font-semibold tracking-wider mb-1">Practice Since</span>
                  <span className="text-slate-700 font-medium font-sans">1996 (20+ Years Experience)</span>
                </div>
              </div>

              <div className="pt-6 font-sans">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-gold-600 font-bold hover:text-slate-900 transition-colors"
                >
                  View Full Credentials & Areas of Expertise
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
              <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">Key Expertise</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
                Professional Legal Services & Solutions
              </h2>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed font-sans">
                Providing trusted legal consultation, notarial services, and land registration support with professional expertise and reliable documentation assistance.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-slate-950 rounded-lg hover:border-gold-500 transition-colors duration-200 font-semibold text-sm shadow-sm font-sans"
            >
              All Services
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
              <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">Premium Plots & Lands</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
                Featured Properties
              </h2>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed font-sans">
                Explore a handpicked selection of premium land plots, agricultural coconut groves, and high-value investment properties with verified documentation.
              </p>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-slate-950 rounded-lg hover:border-gold-500 transition-colors duration-200 font-semibold text-sm shadow-sm font-sans"
            >
              View All Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {propertiesData
              .filter((prop) => prop.isFeatured)
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
            <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">Contact Chamber</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
              Contact Information
            </h2>
            <div className="h-[2px] w-20 bg-gold-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Location Details */}
            <div className="lg:col-span-5 space-y-6 font-sans">
              <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl space-y-5">
                <div>
                  <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Advocate Name</span>
                  <span className="text-slate-800 text-base font-bold">{advocateProfile.name}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Phone Number</span>
                  <a href={`tel:${contactInfo.phone}`} className="text-gold-600 text-base font-bold hover:text-gold-700 transition-colors">
                    {contactInfo.phoneDisplay}
                  </a>
                </div>
                <div>
                  <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Office Location</span>
                  <span className="text-slate-700 text-sm leading-relaxed block">{contactInfo.address}</span>
                </div>

                {/* Call & WhatsApp CTAs */}
                <div className="pt-4 border-t border-slate-200/80 flex flex-col gap-3">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gold-400 to-gold-600 text-white font-bold rounded-lg hover:from-gold-500 hover:to-gold-700 text-sm shadow-sm active:scale-95 transition-all"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#1ebd59] text-sm shadow-sm active:scale-95 transition-all"
                  >
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp Consultation
                  </a>
                </div>
              </div>

              {/* Map Placeholder Card */}
              <div className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-2xl overflow-hidden shadow-sm">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-white">
                  <iframe
                    src={contactInfo.googleMapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Waram Documentation Office Location Map"
                    className="contrast-105 brightness-95"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 px-2 py-3 mt-2 font-sans text-center">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=78P5%2BQGW%2C%20Rameswaram%2C%20Tamil%20Nadu%20623526"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-[11px] font-bold text-gold-600 hover:text-slate-900 uppercase tracking-wider transition-colors"
                  >
                    View Larger Map
                  </a>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=78P5%2BQGW%2C%20Rameswaram%2C%20Tamil%20Nadu%20623526"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-[11px] font-bold text-gold-600 hover:text-slate-900 uppercase tracking-wider transition-colors border-x border-slate-200"
                  >
                    Get Directions
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=78P5%2BQGW%2C%20Rameswaram%2C%20Tamil%20Nadu%20623526"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-[11px] font-bold text-gold-600 hover:text-slate-900 uppercase tracking-wider transition-colors"
                  >
                    Open in Google Maps
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
