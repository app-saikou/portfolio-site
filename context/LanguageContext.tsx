"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/lib/i18n";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ja");

  useEffect(() => {
    // ブラウザのローカルストレージから言語を取得
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang && (savedLang === "ja" || savedLang === "en")) {
      setLanguageState(savedLang);
    } else {
      // ブラウザの言語設定を確認
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") {
        setLanguageState("en");
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    // HTML要素のlang属性を更新
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
