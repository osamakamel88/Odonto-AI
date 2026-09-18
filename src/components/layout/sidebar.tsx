"use client";

import React, { useEffect } from 'react';
import { 
  SmilePlus, 
  LayoutDashboard, 
  Users, 
  FileText, 
  BookOpen, 
  Sparkles, 
  Scale, 
  X 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    if (onClose) onClose();
  }, [pathname]);

  const navItems = [
    { label: 'Treatment Studio', href: '/plans/generate', icon: Sparkles, badge: 'Main' },
    { label: 'Patients', href: '/patients', icon: Users },
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Treatment Plans', href: '/plans', icon: FileText },
    { label: 'Comparison Studio', href: '/compare', icon: Scale },
    { label: 'Knowledge Base', href: '/knowledge', icon: BookOpen },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 select-none">
      {/* Brand Header */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
            <SmilePlus className="h-6 w-6" />
          </div>
          <div>
            <span className="text-lg font-bold text-white tracking-tight">Odonto AI</span>
            <span className="block text-[10px] text-teal-400 font-semibold uppercase tracking-wider">Orthodontic SaaS</span>
          </div>
        </div>

        {/* Mobile close button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

          return (
            <Link 
              key={item.href}
              href={item.href} 
              onClick={() => onClose && onClose()}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white font-semibold shadow-sm' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                  isActive ? 'bg-blue-800 text-white' : 'bg-blue-950 text-blue-300 border border-blue-800'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Clinician Profile */}
      <div className="p-4 border-t border-slate-800/80 flex items-center justify-between bg-slate-950/40">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-300 shrink-0">
            JD
          </div>
          <div>
            <div className="text-xs font-bold text-white">Dr. John Doe</div>
            <div className="text-[10px] text-teal-400 font-medium">Orthodontic Specialist</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Static Sidebar: Always visible on lg screens (>= 1024px) */}
      <aside className="hidden lg:flex w-64 h-screen sticky top-0 border-r border-slate-800 flex-shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* 2. Mobile Slide-Over Drawer: Only shown when isOpen is true on mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Blur */}
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={onClose}
          />
          {/* Slide-over panel */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}