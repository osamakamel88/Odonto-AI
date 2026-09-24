"use client";

import React from 'react';
import { Menu, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogoIcon } from '@/components/brand/logo';
import { useLanguage } from '@/lib/i18n/language-context';
import { APP_DICTIONARY } from '@/lib/i18n/app-dictionary';
import { LanguageSwitcher } from './language-switcher';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const { lang, isAr } = useLanguage();
  const t = APP_DICTIONARY[lang] || APP_DICTIONARY.en;

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-3 sm:px-6 lg:px-8 select-none">
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Mobile Hamburger Menu Button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Brand Title (visible only when sidebar is collapsed) */}
        <div className="flex items-center gap-2 lg:hidden">
          <LogoIcon className="w-7 h-7" />
          <span className="font-bold text-sm text-slate-900 tracking-tight">Odonto AI</span>
        </div>

        {/* Desktop Suite Title */}
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t.header.suiteTitle}
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-semibold text-slate-700">
            {t.header.suiteSubtitle}
          </span>
        </div>
      </div>

      {/* Header Quick Actions & Global Language Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Prominent Global Language Switcher */}
        <LanguageSwitcher />

        <Link href="/plans/generate">
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 px-2.5 sm:px-3 gap-1.5 text-xs text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-100 font-semibold cursor-pointer shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span className="hidden sm:inline">{t.header.treatmentStudioBtn}</span>
            <span className="sm:hidden">{t.header.studioShort}</span>
          </Button>
        </Link>

        <Link href="/patients/new">
          <Button 
            size="sm" 
            className="h-8 px-2.5 sm:px-3 gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">{t.header.newPatientBtn}</span>
            <span className="sm:hidden">{t.header.newPatientShort}</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}