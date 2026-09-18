"use client";

import * as React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Responsive Sidebar (Desktop Permanent + Mobile Slide-Over) */}
      <Sidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Main Viewport Column */}
      <div className="flex flex-1 flex-col min-w-0">
        <Header 
          onOpenMobileMenu={() => setMobileMenuOpen(true)} 
        />
        <main className="flex-1 p-3 sm:p-5 lg:p-8 overflow-y-auto min-w-0">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Odonto AI</span>
            <span className="text-slate-300">•</span>
            <span>7-Layer Clinical Orthodontic AI Suite</span>
          </div>
          <div>
            Developed &amp; Designed by{' '}
            <a 
              href="https://linkedin.com/in/osama-kamel-dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Recode Developments
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}