"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  X, 
  Minus, 
  Sparkles, 
  ChevronRight, 
  Scale, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  HelpCircle,
  Layers,
  Drill,
  ArrowRight
} from 'lucide-react';

interface ComparisonFeature {
  name: string;
  description: string;
  odonto: boolean | string;
  dolphin: boolean | string;
  clinCheck: boolean | string;
  webCeph: boolean | string;
}

interface ComparisonCategory {
  category: string;
  features: ComparisonFeature[];
}

const COMPARISON_DATA: ComparisonCategory[] = [
  {
    category: 'Clinical Scope & Modality Coverage',
    features: [
      {
        name: 'Comprehensive Fixed Mechanics (MBT / Roth / Damon)',
        description: 'Prescription torque/tip modeling, CuNiTi to TMA to SS archwire sequencing, and extraction mechanics.',
        odonto: true,
        dolphin: 'Limited (Manual Notes)',
        clinCheck: false,
        webCeph: false
      },
      {
        name: 'Clear Aligner Staging & Velocity Control',
        description: 'Staged biological limits (0.20mm / 2.0° per stage) and moment-to-force attachment design.',
        odonto: true,
        dolphin: false,
        clinCheck: 'Proprietary Only',
        webCeph: false
      },
      {
        name: 'Orthognathic Surgical Planning (Le Fort I & BSSO)',
        description: 'Multi-plane skeletal vectors, pre-surgical incisor decompensation goals, and Surgery-First (RAP) protocols.',
        odonto: true,
        dolphin: 'Available (Add-On $)',
        clinCheck: false,
        webCeph: false
      },
      {
        name: 'Interdisciplinary Dental Implant Planning',
        description: '14 fixture catalogs, Misch D1–D4 bone density drilling speeds, subantral sinus lift, and screw torques.',
        odonto: true,
        dolphin: false,
        clinCheck: false,
        webCeph: false
      }
    ]
  },
  {
    category: 'Diagnostic Pipeline & Anatomical Analysis',
    features: [
      {
        name: 'Automated Lateral Ceph Tracing (Steiner, Tweed, Wits)',
        description: '16-landmark automated tracing with instantaneous ANB, Wits, IMPA, and FMA angle calculations.',
        odonto: true,
        dolphin: true,
        clinCheck: false,
        webCeph: true
      },
      {
        name: '3D Digital Cast Bolton Analysis',
        description: 'Automated tooth-width measurement calculating Anterior (77.2%) and Overall (91.3%) Bolton ratios in mm.',
        odonto: true,
        dolphin: 'Manual Points',
        clinCheck: 'Internal Only',
        webCeph: false
      },
      {
        name: 'CBCT Cortical Bone Limit Verification',
        description: 'Guards against tooth movement exceeding the buccal and lingual cortical alveolar bone envelope.',
        odonto: true,
        dolphin: 'Visual Only',
        clinCheck: false,
        webCeph: false
      },
      {
        name: 'Panoramic OPG 32-Tooth Segmentation',
        description: 'FDI tooth numbering, root parallelism evaluation, and impaction screening.',
        odonto: true,
        dolphin: 'Manual Chart',
        clinCheck: false,
        webCeph: 'Partial'
      }
    ]
  },
  {
    category: 'Evidence, Intelligence & Reliability',
    features: [
      {
        name: 'Live NCBI PubMed Literature Grounding (RAG)',
        description: 'Directly citations from Angle Orthod, AJODO, and JCO with PMIDs/DOIs justifying mechanics.',
        odonto: true,
        dolphin: false,
        clinCheck: false,
        webCeph: false
      },
      {
        name: 'Deterministic Biomechanical Engine',
        description: 'Dual-engine fail-safe calculating biological forces mathematically to prevent AI hallucinations.',
        odonto: true,
        dolphin: false,
        clinCheck: false,
        webCeph: false
      },
      {
        name: 'Open Vendor-Agnostic Ecosystem',
        description: 'Compatible with any bracket prescription, any aligner manufacturing lab, and 14 implant systems.',
        odonto: true,
        dolphin: 'Agnostic',
        clinCheck: 'Closed / Locked',
        webCeph: 'Agnostic'
      }
    ]
  },
  {
    category: 'Accessibility, Deployment & Total Cost',
    features: [
      {
        name: 'Cloud-Native (Access Anywhere, No Dongles)',
        description: 'Instant access on iPad, Mac, Windows, or Chromebook without heavy desktop installs or server hardware.',
        odonto: true,
        dolphin: 'Desktop Dongle Only',
        clinCheck: 'Web & Desktop',
        webCeph: true
      },
      {
        name: 'Upfront Capital Expenditure Required',
        description: 'High upfront software acquisition and workstation licensing fees.',
        odonto: 'No Upfront CapEx',
        dolphin: '$8,000 – $15,000+',
        clinCheck: 'Case Volume Locked',
        webCeph: 'Low'
      },
      {
        name: 'Annual Maintenance & Support Contracts',
        description: 'Mandatory yearly fees just to keep software functioning and receiving updates.',
        odonto: 'None / Inclusive',
        dolphin: '$1,500 – $3,000 / yr',
        clinCheck: 'Per-Case Margins',
        webCeph: 'Subscription'
      }
    ]
  }
];

export function CompetitorComparison() {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredCategories = filterCategory === 'all' 
    ? COMPARISON_DATA 
    : COMPARISON_DATA.filter(c => c.category.toLowerCase().includes(filterCategory.toLowerCase()));

  const renderValue = (val: boolean | string, isOdonto = false) => {
    if (val === true) {
      return (
        <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
          isOdonto ? 'bg-blue-600 text-white shadow-xs' : 'bg-emerald-100 text-emerald-800'
        }`}>
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      );
    }
    if (val === false) {
      return (
        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400">
          <X className="w-3.5 h-3.5 stroke-[2]" />
        </div>
      );
    }
    return (
      <span className={`text-[11px] font-semibold ${
        isOdonto ? 'text-blue-700 font-bold' : 'text-slate-600'
      }`}>
        {val}
      </span>
    );
  };

  return (
    <section id="comparison" className="py-24 sm:py-32 bg-white border-t border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-3.5 py-1 font-semibold rounded-full shadow-xs">
            Objective Market Comparison
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            How Odonto AI Compares to Industry Platforms.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            A fair, transparent comparison showing how legacy software, proprietary aligner platforms, and standalone tracing tools compare against an integrated clinical AI system.
          </p>
        </div>

        {/* 3 Real Clinical & Financial ROI Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 mb-16">
          <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 space-y-3 shadow-xs hover:bg-white hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-slate-950 font-mono tracking-tight">
              85% Time Saved
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Eliminate Fragmented Software Silos
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instead of tracing cephs in one program, exporting STL casts to a second, and typing surgical plans in a third, Odonto AI synthesizes the entire case in under 3 minutes.
            </p>
          </div>

          <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 space-y-3 shadow-xs hover:bg-white hover:border-teal-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-slate-950 font-mono tracking-tight">
              $8,000 – $15,000 Saved
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Zero Heavy Hardware Dongles
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Legacy enterprise packages require massive upfront workstation licenses and mandatory annual contracts. Odonto AI runs anywhere in your web browser with zero server maintenance.
            </p>
          </div>

          <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 space-y-3 shadow-xs hover:bg-white hover:border-indigo-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-slate-950 font-mono tracking-tight">
              100% Vendor-Agnostic
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Full Clinical Autonomy
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proprietary platforms force clinicians into locked manufacturing ecosystems. Odonto AI provides total freedom: use any bracket system, any clear aligner lab, or any of 14 implant systems.
            </p>
          </div>
        </div>

        {/* Detailed Comparison Table (Apple Light Style) */}
        <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-[0_12px_40px_-8px_rgba(0,0,0,0.05)]">
          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-700 w-2/5">
                    Platform Capability
                  </th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-blue-700 bg-blue-50/60 border-l border-r border-blue-200/60 w-1/5">
                    <div className="font-extrabold text-sm text-slate-950">Odonto AI</div>
                    <span className="text-[10px] text-blue-700 font-semibold block uppercase">All-in-One Suite</span>
                  </th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-slate-700 w-1/5">
                    <div className="font-bold text-slate-900">Dolphin Imaging</div>
                    <span className="text-[10px] text-slate-500 block font-normal">Legacy Desktop</span>
                  </th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-slate-700 w-1/5">
                    <div className="font-bold text-slate-900">ClinCheck / Align</div>
                    <span className="text-[10px] text-slate-500 block font-normal">Proprietary Aligner</span>
                  </th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-slate-700 w-1/5">
                    <div className="font-bold text-slate-900">WebCeph / CephX</div>
                    <span className="text-[10px] text-slate-500 block font-normal">Tracing Only</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredCategories.map((cat, catIdx) => (
                  <React.Fragment key={catIdx}>
                    {/* Category Divider Header */}
                    <tr className="bg-slate-100/60 border-t border-b border-slate-200">
                      <td colSpan={5} className="py-2.5 px-6 font-bold text-[11px] uppercase tracking-wider text-slate-600">
                        {cat.category}
                      </td>
                    </tr>

                    {/* Category Rows */}
                    {cat.features.map((feat, featIdx) => (
                      <tr key={featIdx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-6 space-y-0.5">
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">
                            {feat.name}
                          </div>
                          <div className="text-[11px] text-slate-500 leading-snug">
                            {feat.description}
                          </div>
                        </td>

                        {/* Odonto AI Highlight Column */}
                        <td className="py-3.5 px-4 text-center bg-blue-50/20 border-l border-r border-blue-200/50">
                          {renderValue(feat.odonto, true)}
                        </td>

                        {/* Competitor Columns */}
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feat.dolphin)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feat.clinCheck)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feat.webCeph)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Action Summary */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              <span className="font-bold text-slate-900">Summary:</span> Competitor analysis based on public technical specifications and standard clinical licensing terms as of 2026.
            </div>
            <Link href="/plans/generate">
              <Button size="sm" className="bg-slate-950 hover:bg-blue-600 text-white rounded-full px-5 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors">
                <span>Try Odonto AI Studio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
