"use client";

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/logo';
import { Sparkles, Drill, ExternalLink } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 text-slate-500 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo href="/" size="md" subtitle="By Orthodontists, For Orthodontists" variant="light" />
            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              The world’s first 7-layer clinical AI operating system engineered exclusively for orthodontic specialists, orthognathic surgeons, and implantologists.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-[11px] text-slate-400">
              <span>Next.js 16</span>
              <span>•</span>
              <span>PubMed RAG</span>
              <span>•</span>
              <span>Deterministic Biomechanics</span>
            </div>
          </div>

          {/* Clinical Studios */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Clinical Suites</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/plans/generate" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>Treatment Studio</span>
                </Link>
              </li>
              <li>
                <Link href="/implants" className="text-slate-600 hover:text-teal-600 transition-colors flex items-center gap-1.5 font-medium">
                  <Drill className="w-3 h-3 text-teal-600" />
                  <span>Implant Planning</span>
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Comparison Studio
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Knowledge Base (11 Modules)
                </Link>
              </li>
              <li>
                <Link href="/patients" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Patient Records
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Specialties</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#specialties" className="text-slate-600 hover:text-blue-600 transition-colors">Surgical Orthodontics</a></li>
              <li><a href="#specialties" className="text-slate-600 hover:text-blue-600 transition-colors">Clear Aligner Therapy</a></li>
              <li><a href="#specialties" className="text-slate-600 hover:text-blue-600 transition-colors">Comprehensive Fixed (MBT)</a></li>
              <li><a href="#specialties" className="text-slate-600 hover:text-blue-600 transition-colors">Interceptive (Phase I)</a></li>
              <li><a href="#specialties" className="text-slate-600 hover:text-blue-600 transition-colors">TADs &amp; Skeletal Anchorage</a></li>
              <li><a href="#implants" className="text-slate-600 hover:text-teal-600 transition-colors">Dental Implantology</a></li>
            </ul>
          </div>

          {/* Evidence & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Clinical Rigor</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><span>NCBI PubMed RAG Engine</span></li>
              <li><span>Angle Orthod &amp; AJODO Norms</span></li>
              <li><span>Misch D1-D4 Bone Protocol</span></li>
              <li><span>Steiner &amp; Tweed Analysis</span></li>
              <li><span>Bolton Tooth-Size Ratio</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500">
            &copy; {new Date().getFullYear()} Odonto AI. All rights reserved. Designed for licensed dental clinicians.
          </div>

          {/* Mandatory Attribution Link */}
          <div className="text-slate-600">
            Developed &amp; Designed by{' '}
            <a
              href="https://linkedin.com/in/osama-kamel-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
            >
              <span>Recode Developments</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
