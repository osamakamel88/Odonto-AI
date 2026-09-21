"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Menu, 
  X, 
  ChevronRight, 
  Drill, 
  ShieldCheck 
} from 'lucide-react';

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Specialties', href: '#specialties' },
    { label: '7-Layer Engine', href: '#engine' },
    { label: 'Implant Studio', href: '#implants' },
    { label: 'Comparison', href: '#comparison' },
    { label: 'Evidence Base', href: '#evidence' },
    { label: 'Resources & References', href: '/resources.html', external: true },
    { label: 'Clinical FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] py-3'
          : 'bg-white/40 backdrop-blur-md border-b border-slate-100 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Light Mode */}
        <Logo href="/" size="md" subtitle="Clinical SaaS" variant="light" />

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-semibold text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`transition-colors duration-150 tracking-tight ${
                link.external 
                  ? 'text-teal-700 hover:text-teal-800 font-bold bg-teal-50 hover:bg-teal-100/70 px-2.5 py-1 rounded-full border border-teal-200/80' 
                  : 'hover:text-blue-600'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions & Primary CTA */}
        <div className="hidden md:flex items-center space-x-3">
          <Link href="/implants">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3.5 text-xs font-semibold text-slate-700 border-slate-200 bg-white hover:bg-slate-50 hover:text-blue-600 rounded-full shadow-xs transition-all cursor-pointer"
            >
              <Drill className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
              Implants
            </Button>
          </Link>

          {/* Primary Apple-style Pill CTA */}
          <Link href="/plans/generate">
            <Button
              size="sm"
              className="h-9 px-5 text-xs font-semibold bg-slate-950 text-white hover:bg-blue-600 rounded-full shadow-md shadow-slate-950/10 hover:shadow-blue-600/20 transition-all duration-200 cursor-pointer group flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 group-hover:text-white transition-colors" />
              <span>Launch Studio</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Link href="/plans/generate">
            <Button
              size="sm"
              className="h-8 px-3 text-xs font-semibold bg-slate-950 text-white hover:bg-blue-600 rounded-full cursor-pointer"
            >
              <span>Studio</span>
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Light Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-4 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold py-2.5 border-b border-slate-100 flex items-center justify-between ${
                  link.external 
                    ? 'text-teal-700 font-bold bg-teal-50/50 px-2 rounded-lg' 
                    : 'text-slate-700 hover:text-blue-600'
                }`}
              >
                <span>{link.label}</span>
                {link.external && (
                  <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                    Manual ↗
                  </span>
                )}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col space-y-2.5">
            <Link href="/plans/generate" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full h-10 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs">
                <Sparkles className="w-4 h-4 mr-2" />
                Launch Treatment Studio
              </Button>
            </Link>
            <Link href="/implants" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full h-10 text-xs font-semibold border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl">
                <Drill className="w-4 h-4 mr-2 text-teal-600" />
                Implant Planning Studio
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
