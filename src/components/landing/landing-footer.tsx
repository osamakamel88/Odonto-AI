"use client";

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/logo';
import { useLanguage } from '@/lib/i18n/language-context';
import { Sparkles, Drill, ExternalLink } from 'lucide-react';

export function LandingFooter() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 text-slate-500 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4 text-start">
            <Logo 
              href="/" 
              size="md" 
              subtitle={lang === 'ar' ? 'من أطباء التقويم، لأطباء التقويم' : 'By Orthodontists, For Orthodontists'} 
              variant="light" 
            />
            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              {lang === 'ar'
                ? 'نظام التشغيل السريري الأحدث والأكثر شمولاً بالذكاء الاصطناعي، المصمم حصرياً لأخصائيي تقويم الأسنان، وجراحي الفكين، وأطباء زراعة الأسنان.'
                : 'The most comprehensive and up-to-date clinical AI operating system engineered exclusively for orthodontic specialists, orthognathic surgeons, and implantologists.'
              }
            </p>
            <div className="pt-2 flex items-center gap-3 text-[11px] text-slate-400">
              <span>Next.js 16</span>
              <span>•</span>
              <span>{lang === 'ar' ? 'محرك PubMed RAG' : 'PubMed RAG'}</span>
              <span>•</span>
              <span>{lang === 'ar' ? 'بيوميكانيكا حتمية' : 'Deterministic Biomechanics'}</span>
            </div>
          </div>

          {/* Clinical Studios */}
          <div className="space-y-3 text-start">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {lang === 'ar' ? 'الأجنحة السريرية' : 'Clinical Suites'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/plans/generate" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>{lang === 'ar' ? 'استوديو تخطيط العلاج' : 'Treatment Studio'}</span>
                </Link>
              </li>
              <li>
                <Link href="/implants" className="text-slate-600 hover:text-teal-600 transition-colors flex items-center gap-1.5 font-medium">
                  <Drill className="w-3 h-3 text-teal-600" />
                  <span>{lang === 'ar' ? 'استوديو زراعة الأسنان' : 'Implant Planning'}</span>
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-slate-600 hover:text-blue-600 transition-colors">
                  {lang === 'ar' ? 'استوديو مقارنة الخطط' : 'Comparison Studio'}
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="text-slate-600 hover:text-blue-600 transition-colors">
                  {lang === 'ar' ? 'قاعدة المعرفة السريرية (11 موديول)' : 'Knowledge Base (11 Modules)'}
                </Link>
              </li>
              <li>
                <Link href="/patients" className="text-slate-600 hover:text-blue-600 transition-colors">
                  {lang === 'ar' ? 'سجلات ومخططات المرضى' : 'Patient Records'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div className="space-y-3 text-start">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {lang === 'ar' ? 'التخصصات السريرية' : 'Specialties'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#specialties" className="text-slate-600 hover:text-blue-600 transition-colors">
                  {lang === 'ar' ? 'جراحة تقويم الفكين' : 'Surgical Orthodontics'}
                </a>
              </li>
              <li>
                <a href="#specialties" className="text-slate-600 hover:text-blue-600 transition-colors">
                  {lang === 'ar' ? 'علاج التقويم الشفاف' : 'Clear Aligner Therapy'}
                </a>
              </li>
              <li>
                <a href="#specialties" className="text-slate-600 hover:text-blue-600 transition-colors">
                  {lang === 'ar' ? 'التقويم الثابت الشامل (MBT)' : 'Comprehensive Fixed (MBT)'}
                </a>
              </li>
              <li>
                <a href="#specialties" className="text-slate-600 hover:text-blue-600 transition-colors">
                  {lang === 'ar' ? 'التقويم الوقائي والمبكر (مرحلة 1)' : 'Interceptive (Phase I)'}
                </a>
              </li>
              <li>
                <a href="#specialties" className="text-slate-600 hover:text-blue-600 transition-colors">
                  {lang === 'ar' ? 'الغرسات الدقيقة والتثبيت العظمي' : 'TADs & Skeletal Anchorage'}
                </a>
              </li>
              <li>
                <a href="#implants" className="text-slate-600 hover:text-teal-600 transition-colors">
                  {lang === 'ar' ? 'زراعة الأسنان السريرية' : 'Dental Implantology'}
                </a>
              </li>
            </ul>
          </div>

          {/* Evidence & Compliance */}
          <div className="space-y-3 text-start">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {lang === 'ar' ? 'الأدلة والصرامة السريرية' : 'Clinical Rigor & Evidence'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/resources.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 hover:text-teal-800 font-bold flex items-center gap-1 transition-colors"
                >
                  <span>{lang === 'ar' ? 'المصادر والمراجع السريرية 🔬' : 'Resources & References 🔬'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="text-slate-500 pt-1">
                <span>{lang === 'ar' ? 'محرك استرجاع PubMed RAG' : 'NCBI PubMed RAG Engine'}</span>
              </li>
              <li className="text-slate-500">
                <span>{lang === 'ar' ? 'معايير دوريات Angle و AJODO' : 'Angle Orthod & AJODO Norms'}</span>
              </li>
              <li className="text-slate-500">
                <span>{lang === 'ar' ? 'بروتوكولات عظم Misch D1-D4' : 'Misch D1-D4 Bone Protocol'}</span>
              </li>
              <li className="text-slate-500">
                <span>{lang === 'ar' ? 'تحليلات Steiner و Tweed' : 'Steiner & Tweed Analysis'}</span>
              </li>
              <li className="text-slate-500">
                <span>{lang === 'ar' ? 'نسب أحجام الأسنان لبولتون' : 'Bolton Tooth-Size Ratio'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 text-center sm:text-start">
            &copy; {new Date().getFullYear()} Odonto AI. {lang === 'ar' ? 'جميع الحقوق محفوظة. صُمم خصيصاً لأطباء وجراحي الأسنان المرخصين.' : 'All rights reserved. Designed for licensed dental clinicians.'}
          </div>

          {/* Mandatory Attribution Link */}
          <div className="text-slate-600 text-center sm:text-start">
            {lang === 'ar' ? 'تطوير وتصميم بواسطة ' : 'Developed & Designed by '}
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
