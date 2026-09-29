"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { LocalizedString } from "@/data/siteData";
import { WORLD_LANGUAGES, LanguageOption } from "@/data/languages";
import { TRANSLATIONS, TranslationDictionary, SupportedLanguage } from "@/data/translations";

export interface DetectedLocaleInfo {
  code: string;
  nativeName: string;
  name: string;
  isAutoDetected: boolean;
  systemRaw: string;
}

interface LanguageContextType {
  lang: string;
  currentLanguage: LanguageOption;
  dict: TranslationDictionary;
  detectedInfo: DetectedLocaleInfo;
  setLanguageCode: (code: string) => void;
  toggleLang: () => void;
  isModalOpen: boolean;
  openLanguageModal: () => void;
  closeLanguageModal: () => void;
  t: (localized: LocalizedString | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SUPPORTED_CODES: SupportedLanguage[] = ["ja", "fr", "es", "de", "en"];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<string>("en");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detectedInfo, setDetectedInfo] = useState<DetectedLocaleInfo>({
    code: "en",
    nativeName: "English",
    name: "English",
    isAutoDetected: false,
    systemRaw: "en",
  });

  useEffect(() => {
    // 1. Check if user already manually selected a preferred language previously
    const saved = localStorage.getItem("senna_lang");
    if (saved && WORLD_LANGUAGES.some((l) => l.code === saved)) {
      setLang(saved);
      const matched = WORLD_LANGUAGES.find((l) => l.code === saved);
      setDetectedInfo({
        code: saved,
        nativeName: matched?.nativeName || saved,
        name: matched?.name || saved,
        isAutoDetected: false,
        systemRaw: saved,
      });
      return;
    }

    // 2. High-precision OS & Browser language detection
    const browserLanguages: string[] = [];
    if (typeof navigator !== "undefined") {
      if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
        browserLanguages.push(...navigator.languages);
      } else if (navigator.language) {
        browserLanguages.push(navigator.language);
      }
    }

    const primaryRaw = browserLanguages[0] || "en";
    let matchedCode: SupportedLanguage | null = null;

    // Scan browser preferred languages in order
    for (const raw of browserLanguages) {
      const clean = raw.toLowerCase().trim();
      for (const candidate of SUPPORTED_CODES) {
        if (clean === candidate || clean.startsWith(`${candidate}-`)) {
          matchedCode = candidate;
          break;
        }
      }
      if (matchedCode) break;
    }

    // If device language is not directly supported, fallback strictly to English ("en")
    const finalCode: string = matchedCode || "en";
    setLang(finalCode);

    const matchedLangObj = WORLD_LANGUAGES.find((l) => l.code === finalCode);
    setDetectedInfo({
      code: finalCode,
      nativeName: matchedLangObj?.nativeName || "English",
      name: matchedLangObj?.name || "English",
      isAutoDetected: true,
      systemRaw: primaryRaw,
    });
  }, []);

  const setLanguageCode = (code: string) => {
    setLang(code);
    localStorage.setItem("senna_lang", code);
    setIsModalOpen(false);
  };

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === "ja" ? "en" : "ja";
      localStorage.setItem("senna_lang", next);
      return next;
    });
  };

  const openLanguageModal = () => setIsModalOpen(true);
  const closeLanguageModal = () => setIsModalOpen(false);

  const currentLanguage = useMemo(
    () => WORLD_LANGUAGES.find((l) => l.code === lang) || WORLD_LANGUAGES[0],
    [lang]
  );

  const dict: TranslationDictionary = useMemo(
    () => TRANSLATIONS[lang as SupportedLanguage] || TRANSLATIONS.en,
    [lang]
  );

  const t = (localized: LocalizedString | undefined): string => {
    if (!localized) return "";
    if (lang === "ja") return localized.ja || localized.en || "";
    if (lang === "fr") return localized.fr || localized.en || localized.ja || "";
    if (lang === "es") return localized.es || localized.en || localized.ja || "";
    if (lang === "de") return localized.de || localized.en || localized.ja || "";
    return localized[lang] || localized.en || localized.ja || "";
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        currentLanguage,
        dict,
        detectedInfo,
        setLanguageCode,
        toggleLang,
        isModalOpen,
        openLanguageModal,
        closeLanguageModal,
        t,
      }}
    >
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
