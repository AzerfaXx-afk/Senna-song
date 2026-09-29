"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { LocalizedString } from "@/data/siteData";
import { WORLD_LANGUAGES, LanguageOption } from "@/data/languages";
import { TRANSLATIONS, TranslationDictionary, SupportedLanguage } from "@/data/translations";

interface LanguageContextType {
  lang: string;
  currentLanguage: LanguageOption;
  dict: TranslationDictionary;
  setLanguageCode: (code: string) => void;
  toggleLang: () => void;
  isModalOpen: boolean;
  openLanguageModal: () => void;
  closeLanguageModal: () => void;
  t: (localized: LocalizedString | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<string>("ja");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("senna_lang");
    if (saved) {
      setLang(saved);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("ja")) {
        setLang("ja");
      } else if (browserLang.startsWith("fr")) {
        setLang("fr");
      } else if (browserLang.startsWith("es")) {
        setLang("es");
      } else {
        setLang("en");
      }
    }
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

  const currentLanguage =
    WORLD_LANGUAGES.find((l) => l.code === lang) || WORLD_LANGUAGES[0];

  const dict: TranslationDictionary =
    TRANSLATIONS[lang as SupportedLanguage] || TRANSLATIONS.en;

  const t = (localized: LocalizedString | undefined): string => {
    if (!localized) return "";
    if (lang === "ja") return localized.ja || localized.en || "";
    if (lang === "fr") return localized.fr || localized.en || localized.ja || "";
    if (lang === "es") return localized.es || localized.en || localized.ja || "";
    return localized[lang] || localized.en || localized.ja || "";
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        currentLanguage,
        dict,
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
