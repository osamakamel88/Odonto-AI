import * as React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white py-4 px-6 lg:px-8 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3 select-none">
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