"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  {
    key: "nav.services",
    href: "/services",
    dropdown: [
      { key: "nav.legal_consultation", href: "/services#legal-consultation" },
      { key: "nav.notary_services", href: "/services#notary-services" },
      { key: "nav.land_registration", href: "/services#land-registration" }
    ]
  },
  { key: "nav.properties", href: "/properties" },
  { key: "nav.events", href: "/events" },
  { key: "nav.contact", href: "/contact" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function LanguageToggle() {
    return (
      <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/80 rounded-full p-0.5 shadow-sm font-sans shrink-0">
        <button
          onClick={() => setLocale("en")}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider transition-all duration-200 cursor-pointer ${
            locale === "en"
              ? "bg-gold-500 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLocale("ta")}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider transition-all duration-200 cursor-pointer ${
            locale === "ta"
              ? "bg-gold-500 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          தமிழ்
        </button>
      </div>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm transition-all duration-300 ${
        isScrolled
          ? "py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative h-14 w-14 md:h-16 md:w-16 rounded-xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/waram.jpg"
                alt="Waram Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="block font-serif font-extrabold text-xl md:text-2xl text-slate-900 tracking-wide leading-tight group-hover:text-gold-600 transition-colors duration-300">
                {locale === "en" ? "RAJASEKAR" : "ராஜசேகர்"}
              </span>
              <span className="block text-[11px] md:text-xs uppercase text-gold-600 font-bold tracking-widest leading-none mt-1">
                {locale === "en" ? "ADVOCATE & NOTARY PUBLIC" : "வழக்கறிஞர் & நோட்டரி"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              if (link.dropdown) {
                return (
                  <div key={link.href} className="relative group py-2">
                    <button
                      className="flex items-center gap-1 text-sm font-semibold tracking-wide text-slate-600 hover:text-slate-900 transition-colors duration-300 cursor-pointer focus:outline-none"
                    >
                      <span>{t(link.key)}</span>
                      <svg className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Dropdown Menu (Desktop Hover) */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white border border-slate-200/60 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden py-1">
                      {link.dropdown.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className="block px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-gold-600 hover:bg-slate-50 transition-colors duration-200 border-l-2 border-transparent hover:border-gold-500"
                        >
                          {t(subLink.key)}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-semibold tracking-wide transition-colors duration-300 py-1"
                >
                  <span className={isActive ? "text-gold-600" : "text-slate-600 hover:text-slate-900"}>
                    {t(link.key)}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBorder"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-400 to-gold-600"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Consultation Button & Desktop Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <a
              href="tel:+918760555585"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gold-500 text-gold-600 font-semibold text-sm hover:bg-gold-500 hover:text-white transition-all duration-300 active:scale-95 shadow-sm shadow-gold-500/5"
            >
              <Phone className="h-4 w-4" />
              {t("nav.consultation")}
            </a>
          </div>

          {/* Mobile Right Container */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageToggle />
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-6 w-6 text-gold-600" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-slate-200"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                if (link.dropdown) {
                  return (
                    <div key={link.href} className="space-y-1">
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg font-medium text-base text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 focus:outline-none"
                      >
                        <span>{t(link.key)}</span>
                        <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-6 space-y-1 overflow-hidden"
                          >
                            {link.dropdown.map((subLink) => (
                              <Link
                                key={subLink.href}
                                href={subLink.href}
                                onClick={() => {
                                  setIsOpen(false);
                                  setIsServicesOpen(false);
                                }}
                                className="block px-4 py-2 text-sm font-semibold text-slate-500 hover:text-gold-600 rounded-md transition-colors"
                              >
                                {t(subLink.key)}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg font-medium text-base transition-all duration-200 ${
                      isActive
                        ? "bg-gold-500/10 text-gold-600 border-l-4 border-gold-500"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-100 px-4">
                <a
                  href="tel:+918760555585"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 text-white font-bold text-base hover:from-gold-300 hover:to-gold-500 transition-all duration-200 shadow-sm active:scale-95"
                >
                  <Phone className="h-5 w-5" />
                  {t("nav.consultation")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
