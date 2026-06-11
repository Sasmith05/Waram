"use client";

import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { ServiceItem } from "@/data/content";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  // Dynamically resolve the icon component
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[service.iconName] || Icons.Scale;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white border border-slate-200/80 hover:border-gold-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-md gold-glow-hover"
    >
      {/* Accent Background Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 via-gold-500/0 to-gold-500/[0.02] rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div>
        {/* Icon Header */}
        <div className="inline-flex p-3.5 bg-slate-50 border border-slate-200 text-gold-600 rounded-xl mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
          <IconComponent className="h-6 w-6" />
        </div>

        {/* Title */}
        <h3 className="text-slate-900 font-serif font-bold text-xl mb-3 tracking-wide group-hover:text-gold-600 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
          {service.description}
        </p>
      </div>

      {/* Learn More Action */}
      <div className="pt-4 border-t border-slate-100 mt-auto">
        <Link
          href={`/services#${service.id}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-600 font-semibold group-hover:text-slate-900 transition-colors duration-200 font-sans"
        >
          Explore Details
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </motion.div>
  );
}
