"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang: Language = language === "ja" ? "en" : "ja";
    setLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
      aria-label="Switch language"
      title={language === "ja" ? "Switch to English" : "日本語に切り替え"}
    >
      <Globe size={18} />
      <span className="hidden sm:inline">
        {language === "ja" ? "EN" : "JA"}
      </span>
    </button>
  );
}
