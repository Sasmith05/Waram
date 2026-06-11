"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
                RAJASEKAR
              </span>
              <span className="block text-[11px] md:text-xs uppercase text-gold-600 font-bold tracking-widest leading-none mt-1">
                ADVOCATE & NOTARY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-semibold tracking-wide transition-colors duration-300 py-1"
                >
                  <span className={isActive ? "text-gold-600" : "text-slate-600 hover:text-slate-900"}>
                    {link.name}
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

          {/* Consultation Button */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:+918760555585"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gold-500 text-gold-600 font-semibold text-sm hover:bg-gold-500 hover:text-white transition-all duration-300 active:scale-95 shadow-sm shadow-gold-500/5"
            >
              <Phone className="h-4 w-4" />
              Book Consultation
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="h-6 w-6 text-gold-600" /> : <Menu className="h-6 w-6" />}
          </button>
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
                    {link.name}
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
                  Book Consultation
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
