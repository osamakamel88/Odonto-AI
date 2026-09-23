"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  X, 
  Lightbulb, 
  PiggyBank, 
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from "lucide-react";

interface FeatureItem {
  name: string;
  description: string;
  odonto: boolean | string;
  overjet: boolean | string;
  pearl: boolean | string;
  dolphin: boolean | string;
  clincheck: boolean | string;
  webceph: boolean | string;
}

interface CategoryGroup {
  id: string;
  name: string;
  badge?: string;
  features: FeatureItem[];
}

const COMPARISON_CATEGORIES: CategoryGroup[] = [
  {
    id: "treatment-planning",
    name: "Treatment Plan Synthesis (Odonto's Pioneer Zone)",
    badge: "Unique to Odonto AI",
    features: [
      {
        name: "Multi-Phase Staged Treatment Plan Generation",
        description: "Synthesizes comprehensive Phase 1–6 clinical sequences: emergency, clearance, restorative, biomechanical staging, retention.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        name: "Archwire Sequence Calculation (CuNiTi → TMA → SS)",
        description: "Deterministic force-deflection curve progression calibrated to slot size (.018 vs .022) and friction mechanics.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        name: "Bracket Prescription Modeling (MBT / Roth / Damon)",
        description: "Pre-adjusted tip, torque, and in-out compensation matching facial biotype and cephalometric objectives.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        name: "Extraction vs Non-Extraction Decision Algorithm",
        description: "Calculates Bolton tooth-size ratio, arch perimeter deficiency, and Tweed-Merrifield diagnostic triangle.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        name: "Clear Aligner Staging with Biological Velocity Limits",
        description: "Capped at 0.20mm translation and 2.0° rotation per stage to prevent tracking failure and root dehiscence.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: "Proprietary",
        webceph: false
      },
      {
        name: "Orthognathic Surgical Planning (Le Fort I, BSSO, SFA)",
        description: "Pre-surgical incisor decompensation goals, osteotomy vectors, and Surgery-First (RAP) protocol staging.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: "Add-On $",
        clincheck: false,
        webceph: false
      }
    ]
  },
  {
    id: "diagnostic-detection",
    name: "AI-Powered Diagnostic Detection",
    features: [
      {
        name: "Automated Caries Detection on Bitewing/Periapical",
        description: "Pixel-level radiolucency detection calibrated to enamel vs dentin penetration boundaries.",
        odonto: "Planned",
        overjet: true,
        pearl: true,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        name: "Bone Loss Measurement (Crestal Alveolar Height)",
        description: "Millimetric periodontal bone level calculation across maxillary and mandibular quadrants.",
        odonto: "Planned",
        overjet: true,
        pearl: true,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        name: "32-Tooth FDI Segmentation on Panoramic OPG",
        description: "Instant dental arch identification, root angulation evaluation, and impaction screening.",
        odonto: true,
        overjet: true,
        pearl: true,
        dolphin: "Manual",
        clincheck: false,
        webceph: "Partial"
      },
      {
        name: "Periapical Pathology Detection (18+ Findings)",
        description: "Screens periapical lesions, furcation defects, calculus, and radiolucencies before applying orthodontic force.",
        odonto: "Pre-Ortho Clearance",
        overjet: "Limited",
        pearl: true,
        dolphin: false,
        clincheck: false,
        webceph: false
      }
    ]
  },
  {
    id: "ceph-anatomy",
    name: "Cephalometric & Anatomical Analysis",
    features: [
      {
        name: "Automated Lateral Ceph Tracing (Steiner, Tweed, Wits)",
        description: "16-landmark automated tracing with instantaneous ANB, Wits, IMPA, and FMA angle calculations.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: true,
        clincheck: false,
        webceph: true
      },
      {
        name: "3D Digital Cast Bolton Tooth-Size Ratio Analysis",
        description: "Automated tooth-width measurement calculating Anterior (77.2%) and Overall (91.3%) Bolton ratios in mm.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: "Manual",
        clincheck: "Internal",
        webceph: false
      },
      {
        name: "CBCT Cortical Bone Boundary Verification",
        description: "Guards against incisor proclination violating buccal or lingual cortical plates, avoiding bone dehiscence.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: "Limited",
        clincheck: false,
        webceph: false
      },
      {
        name: "CVM Skeletal Maturation Assessment (CS1–CS6)",
        description: "Pinpoints adolescent peak growth velocity on lateral cephalometrics to optimize orthopedic timing.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      }
    ]
  },
  {
    id: "implantology",
    name: "Dental Implant Planning Studio",
    badge: "Unique to Odonto AI",
    features: [
      {
        name: "Misch D1–D4 Bone Density Engine",
        description: "Translates Hounsfield Units into custom drilling sequences, tap requirements, and ISQ stability targets.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        name: "Fixture Sizing from 14 Major Implant Catalogs",
        description: "Straumann, Nobel Biocare, Zimmer, Dentsply, BioHorizons, MegaGen, Osstem dimensions with 1.5mm buccal plate guard.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        name: "Subantral Sinus Lift Calculator (OSFE vs Lateral)",
        description: "Residual bone height rules: Crestal osteotome (≥5mm) vs Lateral window (<4mm staged / 4–8mm simultaneous).",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        name: "Prosthetic Screw Torque & Emergence Calculation",
        description: "Calibrated manufacturer torque specifications (25–35 Ncm), abutment cuff heights, and C/I lever ratios.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      }
    ]
  },
  {
    id: "evidence-intelligence",
    name: "Evidence Grounding & Clinical Intelligence",
    features: [
      {
        name: "Live NCBI PubMed RAG Literature Grounding",
        description: "Direct real-time query against PubMed database for peer-reviewed studies (AJODO, Angle, JCO) justifying mechanics.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        name: "Deterministic Biomechanical Engine (Zero Hallucination)",
        description: "Dual-engine fail-safe calculating biological forces mathematically before contextual LLM plan synthesis.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        name: "Peer-Reviewed Citation for Every Recommendation",
        description: "Every extraction, wire progression, and TAD placement references established published literature with PMIDs.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      }
    ]
  },
  {
    id: "deployment-cost",
    name: "Deployment, Ecosystem & Economics",
    features: [
      {
        name: "Cloud-Native (No Installation or Dongles)",
        description: "Instant access in any modern browser on Mac, PC, or iPad without workstation servers or hardware dongles.",
        odonto: true,
        overjet: true,
        pearl: true,
        dolphin: "Desktop Dongle",
        clincheck: "Web & App",
        webceph: true
      },
      {
        name: "Upfront Capital Expenditure Required",
        description: "High upfront software acquisition and expensive perpetual licensing fees.",
        odonto: "No Upfront CapEx",
        overjet: "Enterprise Contract",
        pearl: "Enterprise Contract",
        dolphin: "$8,000 – $15,000+",
        clincheck: "Per-Case Fee",
        webceph: "Low"
      },
      {
        name: "Vendor Lock-in & Laboratory Agnostic",
        description: "Clinical freedom to use any bracket prescription, any aligner lab, and any implant manufacturer.",
        odonto: "100% Agnostic",
        overjet: "Agnostic",
        pearl: "Agnostic",
        dolphin: "Agnostic",
        clincheck: "Locked (Align Only)",
        webceph: "Agnostic"
      },
      {
        name: "Clinical Specialty Coverage",
        description: "Breadth of supported dental specialties in a single unified clinical interface.",
        odonto: "6 Disciplines + Implants",
        overjet: "General Practice",
        pearl: "General Practice",
        dolphin: "Orthodontics Only",
        clincheck: "Aligners Only",
        webceph: "Ceph Tracing Only"
      }
    ]
  }
];

export function CompetitorComparison() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredCategories = selectedFilter === "all"
    ? COMPARISON_CATEGORIES
    : COMPARISON_CATEGORIES.filter(c => c.id === selectedFilter);

  const renderValue = (value: string | boolean, isOdonto = false) => {
    if (value === true) {
      return (
        <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full mx-auto ${
          isOdonto ? "bg-blue-600 text-white shadow-xs" : "bg-emerald-100 text-emerald-800"
        }`}>
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      );
    }
    if (value === false) {
      return (
        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-300 mx-auto">
          <X className="w-3.5 h-3.5 stroke-[2]" />
        </div>
      );
    }
    
    // Custom strings
    if (isOdonto) {
      if (value === "Planned") {
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] font-mono font-semibold">
            Planned
          </Badge>
        );
      }
      if (value === "Pre-Ortho Clearance") {
        return (
          <Badge variant="outline" className="bg-teal-50 text-teal-800 border-teal-200 text-[10px] font-mono font-semibold">
            Pre-Ortho Clearance
          </Badge>
        );
      }
      return (
        <span className="text-xs font-bold text-blue-700 block">
          {value}
        </span>
      );
    }

    return (
      <span className="text-xs font-medium text-slate-600 block">
        {value}
      </span>
    );
  };

  return (
    <section id="comparison" className="py-24 sm:py-32 bg-slate-50 border-t border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-3.5 py-1 font-semibold rounded-full shadow-xs">
            Objective Market Comparison
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            How Odonto AI Compares to Market Leaders.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            A fair, transparent comparison showing how legacy desktop software, single-specialty aligner platforms, and AI pathology tools compare against an integrated clinical AI system.
          </p>
        </div>

        {/* 3 Real Clinical & Financial ROI Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col space-y-3 hover:border-blue-300 transition-all">
            <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-slate-900">
              The Only Platform That Plans
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Competitors like <strong className="text-slate-800">Overjet</strong> and <strong className="text-slate-800">Pearl</strong> detect disease on 2D X-rays but stop there. They are diagnostic dead-ends. Odonto AI bridges detection to action by synthesizing full multi-phase biomechanical treatment plans.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col space-y-3 hover:border-teal-300 transition-all">
            <div className="w-11 h-11 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 font-bold">
              <PiggyBank className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-slate-900">
              $8,000–$15,000 in Software Savings
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eliminate legacy workstation software like <strong className="text-slate-800">Dolphin Imaging</strong> requiring massive upfront licenses, paid version upgrades, dedicated server hardware, and physical USB security dongles.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col space-y-3 hover:border-indigo-300 transition-all">
            <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-slate-900">
              6 Dental Disciplines in One
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instead of paying for ClinCheck (Aligners only), Dolphin (Ortho only), and Overjet (General only), Odonto AI covers surgical, fixed, aligners, interceptive, TADs, and implants in one seamless cockpit.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setSelectedFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedFilter === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            All Features ({COMPARISON_CATEGORIES.reduce((acc, c) => acc + c.features.length, 0)})
          </button>
          {COMPARISON_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === cat.id
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {cat.name.split(" (")[0]}
            </button>
          ))}
        </div>

        {/* Detailed Comparison Table (Apple Light Style) */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1080px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-slate-700 w-[34%]">
                    Clinical Capability &amp; Protocol
                  </th>
                  <th className="py-5 px-4 text-center bg-blue-50/70 border-x border-blue-200/70 w-[14%]">
                    <div className="text-base font-extrabold text-blue-950">Odonto AI</div>
                    <span className="text-[10px] text-blue-700 font-semibold block uppercase tracking-wide">
                      All-In-One Platform
                    </span>
                  </th>
                  <th className="py-5 px-4 text-center w-[11%]">
                    <div className="text-sm font-bold text-slate-900">Overjet</div>
                    <span className="text-[10px] text-slate-500 block">Pathology AI</span>
                  </th>
                  <th className="py-5 px-4 text-center w-[11%]">
                    <div className="text-sm font-bold text-slate-900">Pearl</div>
                    <span className="text-[10px] text-slate-500 block">Second Opinion</span>
                  </th>
                  <th className="py-5 px-4 text-center w-[11%]">
                    <div className="text-sm font-bold text-slate-900">Dolphin</div>
                    <span className="text-[10px] text-slate-500 block">Legacy Desktop</span>
                  </th>
                  <th className="py-5 px-4 text-center w-[11%]">
                    <div className="text-sm font-bold text-slate-900">ClinCheck</div>
                    <span className="text-[10px] text-slate-500 block">Aligner-Only</span>
                  </th>
                  <th className="py-5 px-4 text-center w-[8%]">
                    <div className="text-sm font-bold text-slate-900">WebCeph</div>
                    <span className="text-[10px] text-slate-500 block">Tracing-Only</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredCategories.map((category) => (
                  <React.Fragment key={category.id}>
                    {/* Category Header Row */}
                    <tr className="bg-slate-100/70 border-t border-b border-slate-200">
                      <td colSpan={7} className="py-2.5 px-6 font-bold text-[11px] uppercase tracking-wider text-slate-700 flex items-center justify-between">
                        <span>{category.name}</span>
                        {category.badge && (
                          <Badge className="bg-blue-600 text-white border-none text-[9px] font-bold px-2 py-0.5">
                            {category.badge}
                          </Badge>
                        )}
                      </td>
                    </tr>

                    {/* Features in this Category */}
                    {category.features.map((feature, featureIndex) => (
                      <tr 
                        key={featureIndex}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        {/* Feature Name & Description */}
                        <td className="py-3.5 px-6 space-y-0.5">
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">
                            {feature.name}
                          </div>
                          <div className="text-[11px] text-slate-500 leading-snug">
                            {feature.description}
                          </div>
                        </td>

                        {/* Odonto AI Highlight Column */}
                        <td className="py-3.5 px-4 text-center bg-blue-50/25 border-x border-blue-200/50">
                          {renderValue(feature.odonto, true)}
                        </td>

                        {/* Competitor Columns */}
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feature.overjet)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feature.pearl)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feature.dolphin)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feature.clincheck)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feature.webceph)}
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
            <div className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              <span className="font-bold text-slate-700">Clinical Disclaimer:</span> Comparison based on publicly available documentation as of 2026. "Planned" features are in active engineering. Overjet and Pearl are FDA-cleared diagnostic tools — Odonto AI is a clinical decision support system, not a diagnostic medical device.
            </div>
            <Link href="/plans/generate">
              <Button size="sm" className="bg-slate-950 hover:bg-blue-600 text-white rounded-full px-5 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Launch Treatment Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Big Interactive Bottom Banner */}
        <div className="mt-12 flex justify-center">
          <Link href="/plans/generate">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-base font-bold shadow-lg shadow-blue-600/25 transition-all cursor-pointer group flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
              <span>See Odonto AI in Action</span>
              <ArrowRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
