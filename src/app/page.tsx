"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { LandingHeader } from '@/components/landing/landing-header';
import { SpecialtyExplorer } from '@/components/landing/specialty-explorer';
import { EngineShowcase } from '@/components/landing/engine-showcase';
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
  Ruler, 
  BrainCircuit, 
  ArrowRight, 
  Activity, 
  Zap, 
  BookOpen, 
  ExternalLink,
  Plus,
  Minus,
  HelpCircle
} from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does Odonto AI handle surgical orthognathic cases?',
      a: 'Yes, absolutely. Odonto AI includes dedicated surgical protocols for Le Fort I osteotomies (advancement, impaction, downgrafting), BSSO (mandibular setback and advancement), sliding genioplasty, and Surgery-First Approaches (SFA) utilizing the Regional Acceleratory Phenomenon (RAP). It automatically models pre-surgical incisor decompensation goals and arch width coordination.'
    },
    {
      q: 'Can it calculate dental implant fixture dimensions and prosthetic screw torques?',
      a: 'Yes! The newly built Dental Implant Planning Studio evaluates CBCT bone width and height to calculate safe fixture diameters and lengths honoring the 1.5mm buccal cortical plate rule and 2.0mm IAN safety clearance. It calculates Misch D1–D4 bone density drilling speeds, subantral sinus lift requirements (OSFE crestal vs lateral window), and exact manufacturer prosthetic screw torque values (25–35 Ncm).'
    },
    {
      q: 'How does Odonto AI prevent clinical hallucination?',
      a: 'Unlike generic language models, Odonto AI runs a dual-engine architecture: an AI reasoning layer backed by a deterministic biomechanical engine. All skeletal cephalometrics (SNA, SNB, ANB, Wits), arch perimeter calculations, Bolton tooth-size ratios, and wire progressions are mathematically calculated before clinical plan synthesis.'
    },
    {
      q: 'Which bracket systems and archwire progressions are supported?',
      a: 'The system includes standard and custom bracket prescriptions for MBT (McLaughlin-Bennett-Trevisi), Roth, and Damon systems in .022" and .018" slot sizes. Wire progression sequences encompass superelastic thermal CuNiTi, Beta-Titanium (TMA), and rigid Stainless Steel with calibrated force-deflection ratios.'
    },
    {
      q: 'Is Odonto AI backed by peer-reviewed evidence?',
      a: 'Every treatment plan references established orthodontic literature, including published papers from the American Journal of Orthodontics and Dentofacial Orthopedics (AJODO), The Angle Orthodontist, and the Journal of Clinical Orthodontics (JCO), integrated with live NCBI PubMed search.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Sticky Apple-like Glass Navbar */}
      <LandingHeader />

      {/* HERO SECTION */}
      <section className="relative pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-28 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-blue-600/20 via-teal-500/15 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-semibold text-slate-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>By Orthodontists, For Orthodontists</span>
              <span className="text-slate-600">•</span>
              <span className="text-teal-300">7-Layer Clinical Intelligence</span>
            </div>

            {/* Apple-Style Bold Gradient Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Biological Precision.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-300">
                Engineered for Every Malocclusion.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              The world’s first clinical operating system that unifies cephalometric Steiner tracing, 3D arch space analysis, staged biomechanics, and dental implantology into one seamless workflow.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {/* Primary CTA button: Launches the tool */}
              <Link href="/plans/generate" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-12 px-8 text-sm font-bold bg-white text-slate-950 hover:bg-slate-100 rounded-full shadow-xl shadow-white/15 hover:shadow-white/25 transition-all duration-200 cursor-pointer group flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Launch Treatment Studio</span>
                  <ChevronRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              {/* Secondary CTA button: Launches the implant tool */}
              <Link href="/implants" className="w-full sm:w-auto">
                <Button 
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-7 text-sm font-semibold text-slate-200 border-white/15 bg-slate-900/60 hover:bg-slate-800 hover:text-white rounded-full backdrop-blur-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Drill className="w-4 h-4 text-teal-400" />
                  <span>Explore Implant Planning</span>
                </Button>
              </Link>
            </div>

            {/* Clinical Trust Bar */}
            <div className="pt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Steiner, Tweed &amp; McNamara Ceph</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Misch D1–D4 Bone Density</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Live NCBI PubMed Evidence RAG</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Zero Hallucination Deterministic Engine</span>
              </span>
            </div>
          </div>

          {/* Interactive Studio Preview Card Mockup */}
          <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
            <div className="p-2 sm:p-3 rounded-3xl bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/15 shadow-2xl shadow-blue-950/40">
              <div className="bg-slate-900 rounded-2xl overflow-hidden border border-white/10">
                {/* Mock Window Titlebar */}
                <div className="px-4 py-3 bg-slate-950 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-xs text-slate-400 font-mono pl-2">Odonto AI — Clinical Treatment Studio (v2.0)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge className="bg-blue-600/30 text-blue-300 border-blue-500/40 text-[10px] font-mono">
                      Active Case: John Doe (Class III Underbite)
                    </Badge>
                  </div>
                </div>

                {/* Mock Window Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Top 7-Layer Progress Pipeline */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                    {[
                      { num: 1, name: 'Ceph Tracing', sub: 'ANB -3.2° / Wits -4mm', done: true },
                      { num: 2, name: 'Panoramic OPG', sub: '32-Tooth Segmentation', done: true },
                      { num: 3, name: 'Pathology AI', sub: 'Zero Bone Loss Clearance', done: true },
                      { num: 4, name: '3D Arch Space', sub: 'Bolton Anterior 77.2%', done: true },
                      { num: 5, name: 'Cortical Limit', sub: 'Buccal Plate 1.8mm', done: true },
                      { num: 6, name: 'Clinical CoT', sub: 'Surgery vs Decompensation', done: true },
                      { num: 7, name: 'Plan Synthesis', sub: 'Staged Mechanics', done: true },
                    ].map((step) => (
                      <div key={step.num} className="p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-xs">
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>0{step.num}</span>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        </div>
                        <div className="font-semibold text-slate-200 mt-1 truncate">{step.name}</div>
                        <div className="text-[10px] text-teal-400 truncate">{step.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Split Preview: Diagnostic Hub + Staged Mechanics */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Left: Ceph & Clinical Findings */}
                    <div className="lg:col-span-6 bg-slate-950/60 rounded-xl p-5 border border-white/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Cephalometric Skeletal Diagnosis</span>
                        <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 text-[10px]">Skeletal Class III</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-500 block text-[10px]">ANB Angle</span>
                          <span className="text-rose-400 font-bold">-3.2° (Norm: 2°)</span>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-500 block text-[10px]">Wits Appraisal</span>
                          <span className="text-rose-400 font-bold">-4.0 mm</span>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-500 block text-[10px]">Overjet</span>
                          <span className="text-rose-400 font-bold">-4.0 mm</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Severe mandibular prognathism with anterior crossbite. AI recommends decompensation followed by bilateral sagittal split osteotomy (BSSO) setback.
                      </p>
                    </div>

                    {/* Right: Synthesized Treatment Plan */}
                    <div className="lg:col-span-6 bg-slate-950/60 rounded-xl p-5 border border-white/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Synthesized Biomechanical Plan</span>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-[10px]">Staged Mechanics</Badge>
                      </div>
                      <ul className="text-xs space-y-2 text-slate-300">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold font-mono">P1:</span>
                          <span>Leveling &amp; Alignment — 0.014 CuNiTi → 0.018 CuNiTi (6 months)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold font-mono">P2:</span>
                          <span>Incisor Decompensation — 0.019x0.025 SS with Class III elastics (8 months)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-teal-400 font-bold font-mono">SX:</span>
                          <span>Mandibular Setback (BSSO 4.5mm) + Maxillary Advancement (Le Fort I 2.0mm)</span>
                        </li>
                      </ul>
                      <div className="pt-1 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Total Duration: 22-26 months</span>
                        <Link href="/plans/generate">
                          <span className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer">
                            Open in Studio <ArrowRight className="w-3 h-3" />
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

      {/* SPECIALTY EXPLORER: BY ORTHODONTISTS FOR ORTHODONTISTS */}
      <SpecialtyExplorer />

      {/* 7-LAYER CLINICAL AI ENGINE */}
      <EngineShowcase />

      {/* DENTAL IMPLANTOLOGY STUDIO SPOTLIGHT */}
      <section id="implants" className="py-24 sm:py-32 relative bg-slate-950 border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6">
              <Badge className="bg-teal-500/10 text-teal-300 border-teal-500/20 text-xs px-3 py-1 font-semibold rounded-full flex items-center gap-1.5 w-fit">
                <Drill className="w-3.5 h-3.5 text-teal-400" />
                <span>Interdisciplinary Extension</span>
              </Badge>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Dental Implant Planning.{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-400">
                  Precision Sizing &amp; Screw Torques.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Seamlessly transition from orthodontic space opening to implant fixture placement. Odonto AI calculates bone dimensions, subantral sinus elevation needs, drilling sequences, and calibrated prosthetic screw torques.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  '14 Major Implant Catalogs: Straumann, Nobel Biocare, Zimmer, Dentsply, BioHorizons, Osstem, MegaGen',
                  'Misch D1–D4 Bone Density Engine with Hounsfield Unit calibrated drilling speeds',
                  'Automatic Subantral Sinus Lift Calculator: Crestal OSFE (Summers) vs Lateral Window',
                  'Calibrated Prosthetic Screw Torques (25-35 Ncm) & Crown-to-Implant (C/I) lever ratios'
                ].map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/implants">
                  <Button className="h-12 px-8 text-sm font-bold bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white rounded-full shadow-lg shadow-teal-500/20 transition-all cursor-pointer group">
                    <span>Launch Implant Planning Studio</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Implant Studio Preview Card */}
            <div className="lg:col-span-6 bg-slate-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                    #16
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Upper Right First Molar</div>
                    <div className="text-[11px] text-slate-400">Posterior Maxilla (Sinus Zone)</div>
                  </div>
                </div>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">
                  Crestal Sinus Lift Indicated
                </Badge>
              </div>

              {/* Implant Dimension Specs */}
              <div className="grid grid-cols-3 gap-3 font-mono text-center">
                <div className="p-3 bg-slate-950 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase block font-sans">Bone Width</span>
                  <span className="text-base font-bold text-white">6.5 mm</span>
                  <span className="text-[10px] text-teal-400 block font-sans">Safe (≥ 5.5mm)</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase block font-sans">Bone Height</span>
                  <span className="text-base font-bold text-amber-400">5.5 mm</span>
                  <span className="text-[10px] text-amber-400 block font-sans">OSFE Lift +3mm</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase block font-sans">Misch Density</span>
                  <span className="text-base font-bold text-teal-300">D3</span>
                  <span className="text-[10px] text-slate-400 block font-sans">550 HU</span>
                </div>
              </div>

              {/* Fixture Recommendation */}
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-300">Recommended Fixture:</span>
                  <span className="font-mono font-bold text-white">Straumann BLT Ø 4.1 x 10 mm</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Connection: CrossFit / Morse Taper</span>
                  <span className="text-teal-400 font-bold">Torque: 35 Ncm</span>
                </div>
                <p className="text-[11px] text-slate-400 pt-1 border-t border-blue-900/50">
                  Under-preparation drilling protocol with Summers osteotome elevation. Autograft + Bio-Oss particulate graft.
                </p>
              </div>

              <div className="text-right">
                <Link href="/implants">
                  <span className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center justify-end gap-1 cursor-pointer">
                    Open Full Implant Studio <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVIDENCE BASE & PUBMED RAG */}
      <section id="evidence" className="py-20 sm:py-28 relative bg-slate-900/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs px-3 py-1 font-semibold rounded-full">
              Literature-Grounded Reasoning
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Live NCBI PubMed RAG Search Engine.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Every wire sequence, extraction decision, and anchorage recommendation is grounded in literature from Angle Orthod, AJODO, and JCO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                journal: 'Angle Orthod',
                author: 'Cantarella et al. (2017)',
                title: 'Changes in midpalatal sutures induced by micro-implant skeletal expander (MSE)',
                takeaway: 'MSE produces 3.5x greater skeletal sutural split than tooth-borne expanders with minimal alveolar bending.'
              },
              {
                journal: 'AJODO',
                author: 'Park et al. (2001)',
                title: 'Micro-implant anchorage for severe gummy smile and Class II malocclusion',
                takeaway: 'Skeletal micro-implants provide absolute anchorage with zero reciprocal loss, enabling 6-8mm en-masse retraction.'
              },
              {
                journal: 'Int J Oral Surg',
                author: 'Misch CE et al. (2005)',
                title: 'Bone density: key determinant for clinical success in implant dentistry',
                takeaway: 'Density dictates drilling modifications and primary stability; D4 requires osteotome compression.'
              }
            ].map((ev, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] font-mono">
                    {ev.journal}
                  </Badge>
                  <span className="text-xs text-slate-500">{ev.author}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                  "{ev.title}"
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-teal-300">Clinical Finding:</strong> {ev.takeaway}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE FAQ SECTION */}
      <section id="faq" className="py-20 sm:py-28 relative bg-slate-950 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <Badge className="bg-teal-500/10 text-teal-300 border-teal-500/20 text-xs px-3 py-1 font-semibold rounded-full">
              Frequently Asked Questions
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Built for Clinical Questions.
            </h2>
            <p className="text-sm text-slate-400">
              Clear answers on how Odonto AI handles surgical cases, implant sizing, and biological safety.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.q}
                    </span>
                    <span className="p-1 rounded-lg bg-slate-800 text-slate-300 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL HIGH-CONVERTING HERO CTA */}
      <section className="py-24 sm:py-32 relative bg-gradient-to-b from-slate-950 via-blue-950/40 to-slate-950 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Badge className="bg-teal-500/10 text-teal-300 border-teal-500/20 text-xs px-3 py-1 font-semibold rounded-full">
            Immediate Clinical Access
          </Badge>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Ready to Plan Your Next Case with Biological Certainty?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Experience orthodontic treatment planning and dental implantology designed specifically for clinicians who value precision.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/plans/generate" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-13 px-9 text-base font-bold bg-white text-slate-950 hover:bg-slate-100 rounded-full shadow-2xl shadow-white/20 hover:shadow-white/30 transition-all cursor-pointer group flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>Open Treatment Studio Free</span>
                <ChevronRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/implants" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                className="w-full sm:w-auto h-13 px-8 text-base font-semibold text-slate-200 border-slate-700 bg-slate-900/60 hover:bg-slate-800 rounded-full cursor-pointer flex items-center justify-center gap-2"
              >
                <Drill className="w-5 h-5 text-teal-400" />
                <span>Implant Planning</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* APPLE-STYLE FOOTER */}
      <LandingFooter />
    </div>
  );
}