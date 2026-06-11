"use client";

import React, { useState } from "react";
import { servicesData } from "@/data/content";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid";
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone)) {
      tempErrors.phone = "Provide a valid phone number (10-12 digits)";
    }
    if (!formData.service) tempErrors.service = "Please select a service";
    if (!formData.message.trim()) tempErrors.message = "Message details are required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Simulate API submission delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden gold-glow font-sans">
      {status === "success" ? (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-gold-500/10 rounded-full text-gold-600 mb-6 animate-bounce">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h3 className="text-slate-900 font-serif font-bold text-2xl mb-3">
            Consultation Request Received
          </h3>
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-8">
            Thank you for reaching out. Advocate S Rajasekar&apos;s office will review your inquiry and contact you within 24 working hours.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="px-6 py-2.5 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-white font-bold rounded-lg transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h3 className="text-slate-900 font-serif font-bold text-xl mb-1">
              Send a Secure Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              All communications are protected under professional privilege protocols.
            </p>
          </div>

          {status === "error" && (
            <div className="flex gap-2 items-center bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mb-4">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>An unexpected error occurred. Please try again.</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Verma"
              className={`w-full px-4 py-3 bg-slate-50 border ${
                errors.name ? "border-red-400" : "border-slate-200 focus:border-gold-500"
              } text-slate-900 rounded-lg text-sm focus:outline-none transition-all duration-200 placeholder:text-slate-400`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@example.com"
                className={`w-full px-4 py-3 bg-slate-50 border ${
                  errors.email ? "border-red-400" : "border-slate-200 focus:border-gold-500"
                } text-slate-900 rounded-lg text-sm focus:outline-none transition-all duration-200 placeholder:text-slate-400`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 99887 76655"
                className={`w-full px-4 py-3 bg-slate-50 border ${
                  errors.phone ? "border-red-400" : "border-slate-200 focus:border-gold-500"
                } text-slate-900 rounded-lg text-sm focus:outline-none transition-all duration-200 placeholder:text-slate-400`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Service requested */}
          <div>
            <label htmlFor="service" className="block text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2">
              Service Required
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-50 border ${
                errors.service ? "border-red-400" : "border-slate-200 focus:border-gold-500"
              } text-slate-900 rounded-lg text-sm focus:outline-none transition-all duration-200 cursor-pointer`}
            >
              <option value="" disabled className="text-slate-500">
                Select a Service...
              </option>
              {servicesData.map((svc) => (
                <option key={svc.id} value={svc.title} className="text-slate-900 bg-white">
                  {svc.title}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2">
              Case Summary / Inquiries
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Briefly describe your legal or documentation requirements..."
              className={`w-full px-4 py-3 bg-slate-50 border ${
                errors.message ? "border-red-400" : "border-slate-200 focus:border-gold-500"
              } text-slate-900 rounded-lg text-sm focus:outline-none transition-all duration-200 placeholder:text-slate-400 resize-none`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-gold-400 to-gold-600 text-white font-bold rounded-lg hover:from-gold-300 hover:to-gold-500 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Encrypting & Transmitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Request Legal Consultation
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
