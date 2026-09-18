"use client";

import React from 'react';
import { Menu, Plus, Sparkles, SmilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
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
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white shadow-xs shrink-0">
            <SmilePlus className="h-4 w-4" />
          </div>
          <span className="font-bold text-sm text-slate-900 tracking-tight">Odonto AI</span>
        </div>

        {/* Desktop Suite Title */}
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinical Suite</span>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-semibold text-slate-700">AI Treatment Planning &amp; Biomechanics</span>
        </div>
      </div>

      {/* Header Quick Actions */}
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
        <Link href="/plans/generate">
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 px-2.5 sm:px-3 gap-1.5 text-xs text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-100 font-semibold cursor-pointer shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span className="hidden sm:inline">Treatment Studio</span>
            <span className="sm:hidden">Studio</span>
          </Button>
        </Link>
        <Link href="/patients/new">
          <Button 
            size="sm" 
            className="h-8 px-2.5 sm:px-3 gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">New Patient</span>
            <span className="sm:hidden">New</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}