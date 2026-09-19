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
  BookOpen, 
  Layers, 
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
    { label: 'Evidence Base', href: '#evidence' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50 py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo href="/" size="md" subtitle="Clinical SaaS" />

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-200"
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
              className="h-9 px-3.5 text-xs font-medium text-slate-300 border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:text-white rounded-full transition-all cursor-pointer"
            >
              <Drill className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
              Implants
            </Button>
          </Link>

          {/* Primary Apple-style Pill CTA */}
          <Link href="/plans/generate">
            <Button
              size="sm"
              className="h-9 px-5 text-xs font-semibold bg-white text-slate-950 hover:bg-slate-100 rounded-full shadow-lg shadow-white/10 hover:shadow-white/20 transition-all duration-200 cursor-pointer group"
            >
              <span>Launch Studio</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 text-slate-900 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Link href="/plans/generate">
            <Button
              size="sm"
              className="h-8 px-3 text-xs font-semibold bg-white text-slate-950 hover:bg-slate-100 rounded-full cursor-pointer"
            >
              <span>Studio</span>
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-white py-1.5 border-b border-slate-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col space-y-2.5">
            <Link href="/plans/generate" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full h-10 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md">
                <Sparkles className="w-4 h-4 mr-2" />
                Launch Treatment Studio
              </Button>
            </Link>
            <Link href="/implants" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full h-10 text-xs font-semibold border-slate-700 text-slate-200 bg-slate-900 rounded-xl">
                <Drill className="w-4 h-4 mr-2 text-teal-400" />
                Implant Planning Studio
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
