"use client";

import React from 'react';
import { Search, Bell, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinical Suite</span>
        <span className="text-slate-300">|</span>
        <span className="text-xs font-semibold text-slate-700">AI Treatment Planning & Biomechanics</span>
      </div>
      <div className="flex items-center space-x-3">
        <Link href="/plans/generate">
          <Button size="sm" variant="outline" className="gap-1.5 text-xs text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-100 font-semibold cursor-pointer">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Treatment Studio
          </Button>
        </Link>
        <Link href="/patients/new">
          <Button size="sm" className="gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> New Patient
          </Button>
        </Link>
      </div>
    </header>
  );
}