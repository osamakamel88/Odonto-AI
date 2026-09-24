"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudioLanguage } from './studio-dictionary';

interface LanguageContextType {
  lang: StudioLanguage;
  isAr: boolean;
  switchLanguage: (newLang: StudioLanguage) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  isAr: false,
  switchLanguage: () => {}
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<StudioLanguage>('en');

  // Load persisted language preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('odonto_lang') || localStorage.getItem('odonto_studio_lang');
      if (saved === 'en' || saved === 'ar') {
        setLang(saved as StudioLanguage);
        document.documentElement.lang = saved;
        document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
      }
    }
  }, []);

  const switchLanguage = (newLang: StudioLanguage) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('odonto_lang', newLang);
      localStorage.setItem('odonto_studio_lang', newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      window.dispatchEvent(new CustomEvent('odonto_lang_change', { detail: newLang }));
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, isAr: lang === 'ar', switchLanguage }}>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}
