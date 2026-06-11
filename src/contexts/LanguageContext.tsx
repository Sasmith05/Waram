"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Locale, TranslationKey } from "@/locales/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey | string, variables?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read preference on client mount
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("waram_language") as Locale;
      if (saved === "en" || saved === "ta") {
        setLocaleState(saved);
      }
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("waram_language", newLocale);
    }
  };

  const t = (key: TranslationKey | string, variables?: Record<string, string | number>): string => {
    const dict = translations[locale] || translations["en"];
    
    // Support nested dot notation keys like 'nav.home'
    const parts = key.split(".");
    let current: any = dict;
    
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        // Fallback to English dictionary if key is missing in active locale
        let englishCurrent: any = translations["en"];
        for (const engPart of parts) {
          if (englishCurrent && typeof englishCurrent === "object" && engPart in englishCurrent) {
            englishCurrent = englishCurrent[engPart];
          } else {
            return key; // return raw key if missing completely
          }
        }
        current = englishCurrent;
        break;
      }
    }

    if (typeof current !== "string") {
      return key;
    }

    let result = current;
    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        result = result.replace(`{${k}}`, String(v));
      });
    }

    return result;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
