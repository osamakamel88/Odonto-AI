"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { LandingHeader } from '@/components/landing/landing-header';
import { SpecialtyExplorer } from '@/components/landing/specialty-explorer';
import { EngineShowcase } from '@/components/landing/engine-showcase';
import { CompetitorComparison } from '@/components/landing/competitor-comparison';
import { LandingFooter } from '@/components/landing/landing-footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Drill, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  BrainCircuit, 
  ArrowRight, 
  BookOpen, 
  Plus, 
  Minus, 
  Compass 
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';
import { LANDING_DICTIONARY } from '@/lib/i18n/landing-dictionary';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { lang, isAr } = useLanguage();
  const t = LANDING_DICTIONARY[lang];

  const whyIcons = [
    BrainCircuit,
    Layers,
    Drill,
    BookOpen,
    ShieldCheck,
    Compass
  ];

  const whyColors = [
    { bg: 'bg-blue-100', text: 'text-blue-600' },
    { bg: 'bg-teal-100', text: 'text-teal-600' },
    { bg: 'bg-indigo-100', text: 'text-indigo-600' },
    { bg: 'bg-rose-100', text: 'text-rose-600' },
    { bg: 'bg-emerald-100', text: 'text-emerald-600' },
    { bg: 'bg-amber-100', text: 'text-amber-600' }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans antialiased">
      {/* Sticky Apple-like Glass Navbar */}
      <LandingHeader />

      {/* HERO SECTION - PURE APPLE LIGHT THEME */}
      <section className="relative pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-28 overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(219,234,254,0.45),rgba(255,255,255,0))]">
        {/* Subtle Light Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-blue-100/40 via-teal-50/40 to-indigo-50/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span>{t.hero.eyebrow}</span>
            </div>

            {/* Apple-Style Bold Typography */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-[1.12]">
              {t.hero.titleLine1}{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600">
                {t.hero.titleLine2}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* High-Contrast CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {/* Primary CTA button: Launches the tool */}
              <Link href="/plans/generate" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-12 px-8 text-sm font-bold bg-slate-950 text-white hover:bg-blue-600 rounded-full shadow-lg shadow-slate-950/15 hover:shadow-blue-600/25 transition-all duration-200 cursor-pointer group flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
                  <span>{t.hero.launchStudioBtn}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 group-hover:text-white transition-transform ${isAr ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                </Button>
              </Link>

              {/* Secondary CTA button: Launches the implant tool */}
              <Link href="/implants" className="w-full sm:w-auto">
                <Button 
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-7 text-sm font-semibold text-slate-700 border-slate-200 bg-white hover:bg-slate-50 hover:text-blue-600 rounded-full shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Drill className="w-4 h-4 text-teal-600" />
                  <span>{t.hero.exploreImplantsBtn}</span>
                </Button>
              </Link>
            </div>

            {/* Clinical Trust Bar */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
              {t.hero.trustItems.map((item, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Studio Preview Card Mockup (Safari-Style Light Window) */}
          <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
            <div className="p-2 sm:p-2.5 rounded-3xl bg-slate-100/80 border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]">
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80">
                {/* Safari Titlebar */}
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="w-3 h-3 rounded-full bg-rose-400 inline-block border border-rose-500/30" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block border border-amber-500/30" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block border border-emerald-500/30" />
                    <span className="text-xs text-slate-500 font-mono px-2">{t.hero.previewTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge className="bg-blue-50 text-blue-800 border-blue-200 text-[10px] font-mono">
                      {t.hero.activeCaseBadge}
                    </Badge>
                  </div>
                </div>

                {/* Window Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Top 7-Layer Progress Pipeline */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                    {t.hero.layers.map((step) => (
                      <div key={step.num} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>0{step.num}</span>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        </div>
                        <div className="font-semibold text-slate-800 mt-1 truncate">{step.name}</div>
                        <div className="text-[10px] text-teal-700 font-medium truncate">{step.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Split Preview: Diagnostic Hub + Staged Mechanics */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Left: Ceph & Clinical Findings */}
                    <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.hero.diagTitle}</span>
                        <Badge className="bg-rose-50 text-rose-800 border-rose-200 text-[10px] font-bold">{t.hero.skeletalClassBadge}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                        <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                          <span className="text-slate-500 block text-[10px] font-sans">{t.hero.anbLabel}</span>
                          <span className="text-rose-600 font-bold text-sm">{t.hero.anbValue}</span>
                        </div>
                        <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                          <span className="text-slate-500 block text-[10px] font-sans">{t.hero.witsLabel}</span>
                          <span className="text-rose-600 font-bold text-sm">{t.hero.witsValue}</span>
                        </div>
                        <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                          <span className="text-slate-500 block text-[10px] font-sans">{t.hero.overjetLabel}</span>
                          <span className="text-rose-600 font-bold text-sm">{t.hero.overjetValue}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {t.hero.diagDesc}
                      </p>
                    </div>

                    {/* Right: Synthesized Treatment Plan */}
                    <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.hero.planTitle}</span>
                        <Badge className="bg-blue-50 text-blue-800 border-blue-200 text-[10px] font-bold">{t.hero.stagedBadge}</Badge>
                      </div>
                      <ul className="text-xs space-y-2 text-slate-700">
                        <li className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-200/80 shadow-xs">
                          <span className="text-blue-600 font-bold font-mono shrink-0">{t.hero.p1Phase}</span>
                          <span>{t.hero.p1Desc}</span>
                        </li>
                        <li className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-200/80 shadow-xs">
                          <span className="text-blue-600 font-bold font-mono shrink-0">{t.hero.p2Phase}</span>
                          <span>{t.hero.p2Desc}</span>
                        </li>
                        <li className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-200/80 shadow-xs">
                          <span className="text-teal-600 font-bold font-mono shrink-0">{t.hero.sxPhase}</span>
                          <span>{t.hero.sxDesc}</span>
                        </li>
                      </ul>
                      <div className="pt-1 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">{t.hero.estDuration}</span>
                        <Link href="/plans/generate">
                          <span className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer">
                            {t.hero.openInStudio} <ArrowRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ODONTO AI SECTION */}
      <section className="py-20 sm:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-3.5 py-1 font-semibold rounded-full shadow-xs">
              {t.why.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {t.why.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.why.cards.map((card, i) => {
              const IconComponent = whyIcons[i] || BrainCircuit;
              const color = whyColors[i] || whyColors[0];
              return (
                <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${color.bg} ${color.text} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-200 border-none text-[10px] font-bold">
                      {card.metric}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPECIALTY EXPLORER: BY ORTHODONTISTS FOR ORTHODONTISTS (LIGHT THEME) */}
      <SpecialtyExplorer />

      {/* 7-LAYER CLINICAL AI ENGINE (LIGHT THEME) */}
      <EngineShowcase />

      {/* DENTAL IMPLANTOLOGY STUDIO SPOTLIGHT (LIGHT THEME) */}
      <section id="implants" className="py-24 sm:py-32 bg-slate-50/70 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6">
              <Badge className="bg-teal-50 text-teal-800 border-teal-200 text-xs px-3.5 py-1 font-semibold rounded-full flex items-center gap-1.5 w-fit shadow-xs">
                <Drill className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.implants.badge}</span>
              </Badge>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {t.implants.titleLine1}{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                  {t.implants.titleLine2}
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {t.implants.desc}
              </p>

              <div className="space-y-3 pt-2">
                {t.implants.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/implants">
                  <Button className="h-12 px-8 text-sm font-bold bg-slate-950 hover:bg-blue-600 text-white rounded-full shadow-lg shadow-slate-950/15 hover:shadow-blue-600/25 transition-all cursor-pointer group flex items-center gap-2">
                    <Drill className="w-4 h-4 text-teal-400" />
                    <span>{t.implants.ctaBtn}</span>
                    <ArrowRight className={`w-4 h-4 ml-1 transition-transform ${isAr ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Implant Studio Preview Card */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold text-sm">
                    #16
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.implants.cardToothName}</div>
                    <div className="text-[11px] text-slate-500">{t.implants.cardToothRegion}</div>
                  </div>
                </div>
                <Badge className="bg-amber-50 text-amber-800 border-amber-200 text-xs font-semibold">
                  {t.implants.cardStatusBadge}
                </Badge>
              </div>

              {/* Implant Dimension Specs */}
              <div className="grid grid-cols-3 gap-3 font-mono text-center">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 uppercase block font-sans font-semibold">{t.implants.boneWidthLabel}</span>
                  <span className="text-base font-bold text-slate-900">6.5 mm</span>
                  <span className="text-[10px] text-teal-700 block font-sans font-medium">{t.implants.boneWidthStatus}</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 uppercase block font-sans font-semibold">{t.implants.boneHeightLabel}</span>
                  <span className="text-base font-bold text-amber-700">5.5 mm</span>
                  <span className="text-[10px] text-amber-700 block font-sans font-medium">{t.implants.boneHeightStatus}</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 uppercase block font-sans font-semibold">{t.implants.mischDensityLabel}</span>
                  <span className="text-base font-bold text-blue-700">D3</span>
                  <span className="text-[10px] text-slate-500 block font-sans font-medium">{t.implants.mischDensityVal}</span>
                </div>
              </div>

              {/* Fixture Recommendation */}
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900">{t.implants.recFixtureLabel}</span>
                  <span className="font-mono font-bold text-slate-900">Straumann BLT Ø 4.1 x 10 mm</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>{isAr ? 'اتصال الدعامة: CrossFit / Morse Taper' : 'Connection: CrossFit / Morse Taper'}</span>
                  <span className="text-blue-700 font-bold font-mono">{isAr ? 'العزم: 35 Ncm' : 'Torque: 35 Ncm'}</span>
                </div>
                <p className="text-[11px] text-slate-600 pt-1.5 border-t border-blue-200/60">
                  {isAr 
                    ? 'بروتوكول حفر تحت-تحضيري مع رفع الجيب بـ Summers osteotome. طعم ذاتي + جزيئات Bio-Oss.' 
                    : 'Under-preparation drilling protocol with Summers osteotome elevation. Autograft + Bio-Oss particulate graft.'}
                </p>
              </div>

              <div className="text-right rtl:text-left">
                <Link href="/implants">
                  <span className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center justify-end rtl:justify-start gap-1 cursor-pointer">
                    {isAr ? 'فتح استوديو الزراعة بالكامل' : 'Open Full Implant Studio'} 
                    <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVIDENCE BASE & PUBMED RAG (LIGHT THEME) */}
      <section id="evidence" className="py-20 sm:py-28 bg-white border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-3.5 py-1 font-semibold rounded-full shadow-xs">
              {isAr ? 'استدلال سريري مدعوم بالمراجع' : 'Literature-Grounded Reasoning'}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {isAr ? 'محرك البحث والاسترجاع الحي من NCBI PubMed' : 'Live NCBI PubMed RAG Search Engine.'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isAr 
                ? 'كل تسلسل أسلاك، وقرار خلع، وتوصية تثبيت عظمي مستندة إلى دراسات منشورة في كبرى الدوريات التقويمية (Angle Orthod, AJODO, JCO).' 
                : 'Every wire sequence, extraction decision, and anchorage recommendation is grounded in literature from Angle Orthod, AJODO, and JCO.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                journal: 'Angle Orthod',
                author: 'Cantarella et al. (2017)',
                title: isAr 
                  ? 'التغيرات في دروز قبة الحنك الناتجة عن جهاز التوسيع الهيكلي بالزرعات (MSE)' 
                  : 'Changes in midpalatal sutures induced by micro-implant skeletal expander (MSE)',
                takeaway: isAr 
                  ? 'يحقق جهاز MSE انفصالاً هيكلياً أكبر بـ 3.5 أضعاف مقارنة بأجهزة التوسيع المرتكزة على الأسنان فقط مع أقل انحناء للعظم السنخي.' 
                  : 'MSE produces 3.5x greater skeletal sutural split than tooth-borne expanders with minimal alveolar bending.'
              },
              {
                journal: 'AJODO',
                author: 'Park et al. (2001)',
                title: isAr 
                  ? 'تثبيت الزرعات الدقيقة لعلاج الابتسامة اللثوية الحادة وعضة الصنف الثاني' 
                  : 'Micro-implant anchorage for severe gummy smile and Class II malocclusion',
                takeaway: isAr 
                  ? 'توفر الزرعات الهيكلية الدقيقة مرسى مطلقاً بصفر فقدان في الأسنان الخلفية، مما يسمح بإرجاع الأسنان الأمامية 6-8 مم ككتلة واحدة.' 
                  : 'Skeletal micro-implants provide absolute anchorage with zero reciprocal loss, enabling 6-8mm en-masse retraction.'
              },
              {
                journal: 'Int J Oral Surg',
                author: 'Misch CE et al. (2005)',
                title: isAr 
                  ? 'كثافة العظم: العامل الحاسم للنجاح السريري في زراعة الأسنان' 
                  : 'Bone density: key determinant for clinical success in implant dentistry',
                takeaway: isAr 
                  ? 'تحدد كثافة العظم تعديلات الحفر والثبات الأولي؛ يتطلب عظم D4 ضغطاً بواسطة Osteotome لزيادة الكثافة.' 
                  : 'Density dictates drilling modifications and primary stability; D4 requires osteotome compression.'
              }
            ].map((ev, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 shadow-xs hover:bg-white hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-800 border-none text-[10px] font-mono font-semibold">
                    {ev.journal}
                  </Badge>
                  <span className="text-xs text-slate-500 font-medium">{ev.author}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  "{ev.title}"
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-teal-700">{isAr ? 'النتيجة السريرية: ' : 'Clinical Finding: '}</strong> {ev.takeaway}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJECTIVE MARKET & COMPETITOR COMPARISON */}
      <CompetitorComparison />

      {/* INTERACTIVE CLINICAL FAQ SECTION (LIGHT THEME) */}
      <section id="faq" className="py-20 sm:py-28 bg-slate-50/60 border-b border-slate-200 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <Badge className="bg-teal-50 text-teal-800 border-teal-200 text-xs px-3.5 py-1 font-semibold rounded-full shadow-xs">
              {t.faq.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {t.faq.title}
            </h2>
            <p className="text-sm text-slate-600">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="space-y-3">
            {t.faq.items.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left rtl:text-right flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.q}
                    </span>
                    <span className="p-1 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL HIGH-CONVERTING HERO CTA (LIGHT THEME) */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-white via-blue-50/50 to-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Badge className="bg-teal-50 text-teal-800 border-teal-200 text-xs px-3.5 py-1 font-semibold rounded-full shadow-xs">
            {t.finalCta.badge}
          </Badge>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-tight">
            {t.finalCta.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            {t.finalCta.subtitle}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/plans/generate" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-13 px-9 text-base font-bold bg-slate-950 text-white hover:bg-blue-600 rounded-full shadow-xl shadow-slate-950/15 hover:shadow-blue-600/25 transition-all cursor-pointer group flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
                <span>{t.finalCta.launchStudioBtn}</span>
                <ChevronRight className={`w-5 h-5 text-slate-400 group-hover:text-white transition-transform ${isAr ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
              </Button>
            </Link>
            <Link href="/implants" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                className="w-full sm:w-auto h-13 px-8 text-base font-semibold text-slate-700 border-slate-300 bg-white hover:bg-slate-50 hover:text-slate-900 rounded-full shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Drill className="w-5 h-5 text-teal-600" />
                <span>{t.finalCta.exploreImplantsBtn}</span>
              </Button>
            </Link>
          </div>
          <p className="text-xs text-slate-500 pt-2 font-medium">
            {t.finalCta.note}
          </p>
        </div>
      </section>

      {/* APPLE-STYLE LIGHT FOOTER */}
      <LandingFooter />
    </div>
  );
}