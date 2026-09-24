"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/language-context';

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, switchLanguage } = useLanguage();

  return (
    <div className={`flex items-center p-1 bg-slate-100/90 rounded-lg border border-slate-200/90 shadow-2xs select-none ${className}`}>
      <button
        type="button"
        onClick={() => switchLanguage('en')}
        className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
          lang === 'en'
            ? 'bg-white text-blue-700 shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="Switch whole application to English"
      >
        <span className="text-sm leading-none">🇺🇸</span>
        <span className="font-semibold">English</span>
      </button>
      <button
        type="button"
        onClick={() => switchLanguage('ar')}
        className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
          lang === 'ar'
            ? 'bg-blue-600 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="تبديل المنظومة بالكامل إلى المصطلحات الطبية العربية المصرية"
      >
        <span className="text-sm leading-none">🇪🇬</span>
        <span className="font-semibold">العربية</span>
      </button>
    </div>
  );
}
