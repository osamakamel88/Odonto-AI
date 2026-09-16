"use client";

import React from 'react';
import { 
  SmilePlus, 
  LayoutDashboard, 
  Users, 
  FileText, 
  BookOpen, 
  Sparkles, 
  Scale, 
  Settings 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Treatment Studio', href: '/plans/generate', icon: Sparkles, badge: 'Main' },
    { label: 'Patients', href: '/patients', icon: Users },
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Treatment Plans', href: '/plans', icon: FileText },
    { label: 'Comparison Studio', href: '/compare', icon: Scale },
    { label: 'Knowledge Base', href: '/knowledge', icon: BookOpen },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen border-r border-slate-800 flex-shrink-0 select-none">
      <div className="p-5 flex items-center space-x-3 border-b border-slate-800/80">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <SmilePlus className="h-6 w-6" />
        </div>
        <div>
          <span className="text-lg font-bold text-white tracking-tight">Odonto AI</span>
          <span className="block text-[10px] text-teal-400 font-semibold uppercase tracking-wider">Orthodontic SaaS</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white font-semibold shadow-sm' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
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
          <div className="h-9 w-9 rounded-lg bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-300">
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
}