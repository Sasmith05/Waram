"use client";

import React, { useState } from "react";
import { servicesData } from "@/data/content";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactForm() {
  const { t, locale } = useLanguage();
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
    if (!formData.name.trim()) {
      tempErrors.name = t("contact.validationName");
    }
    if (!formData.email.trim()) {
      tempErrors.email = t("contact.validationEmailReq");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = t("contact.validationEmailInv");
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = t("contact.validationPhoneReq");
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone)) {
      tempErrors.phone = t("contact.validationPhoneInv");
    }
    if (!formData.service) {
      tempErrors.service = t("contact.validationService");
    }
    if (!formData.message.trim()) {
      tempErrors.message = t("contact.validationMessage");
    }

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

    // Submit to Supabase
    try {
      const { error } = await supabase.from("enquiries").insert({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: `[Service Enquiry: ${formData.service}] ${formData.message}`
      });

      if (error) throw error;

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error("Failed to insert inquiry to Supabase", err);
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
            {t("contact.formSuccessTitle")}
          </h3>
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-8">
            {t("contact.formSuccessText")}
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="px-6 py-2.5 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-white font-bold rounded-lg transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
          >
            {t("contact.formSubmitAnother")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h3 className="text-slate-900 font-serif font-bold text-xl mb-1">
              {t("contact.formTitle")}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {locale === "en" 
                ? "All communications are protected under professional privilege protocols."
                : "அனைத்து தொடர்புகளும் தொழில்முறை ரகசிய காப்பு நெறிமுறைகளின் கீழ் பாதுகாக்கப்படுகின்றன."}
            </p>
          </div>

          {status === "error" && (
            <div className="flex gap-2 items-center bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mb-4">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>
                {locale === "en" 
                  ? "An unexpected error occurred. Please try again."
                  : "எதிர்பாராத பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."}
              </span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2">
              {t("contact.formName")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={locale === "en" ? "e.g. Rahul Verma" : "எ.கா. ராகுல் வர்மா"}
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
                {t("contact.formEmail")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={locale === "en" ? "e.g. rahul@example.com" : "எ.கா. rahul@example.com"}
                className={`w-full px-4 py-3 bg-slate-50 border ${
                  errors.email ? "border-red-400" : "border-slate-200 focus:border-gold-500"
                } text-slate-900 rounded-lg text-sm focus:outline-none transition-all duration-200 placeholder:text-slate-400`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2">
                {t("contact.formPhone")}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={locale === "en" ? "e.g. +91 99887 76655" : "எ.கா. +91 99887 76655"}
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
              {t("contact.formService")}
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
                {locale === "en" ? "Select a Service..." : "ஒரு சேவையைத் தேர்ந்தெடுக்கவும்..."}
              </option>
              {servicesData.map((svc) => (
                <option key={svc.id} value={svc.title} className="text-slate-900 bg-white">
                  {t(`services.items.${svc.id}.title`)}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2">
              {t("contact.formMessage")}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder={locale === "en" ? "Briefly describe your legal or documentation requirements..." : "உங்கள் சட்ட அல்லது ஆவண தேவைகளை சுருக்கமாக விவரிக்கவும்..."}
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
            className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-gold-400 to-gold-600 text-white font-bold rounded-lg hover:from-gold-300 hover:to-gold-500 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {locale === "en" ? "Encrypting & Transmitting..." : "சமர்ப்பிக்கப்படுகிறது..."}
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {t("contact.formSubmit")}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
