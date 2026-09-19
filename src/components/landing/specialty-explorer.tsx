"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  ChevronRight, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck, 
  Zap, 
  Layers, 
  Ruler, 
  Drill, 
  Scale, 
  Compass, 
  Stethoscope, 
  Flame, 
  Maximize2,
  Anchor
} from 'lucide-react';

export interface SpecialtyData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: any;
  leadParagraph: string;
  clinicalCapabilities: {
    title: string;
    description: string;
    metric?: string;
  }[];
  biomechanicalHighlights: string[];
  ctaText: string;
  ctaHref: string;
}

export const SPECIALTIES: SpecialtyData[] = [
  {
    id: 'surgical',
    badge: 'Maxillofacial & Orthognathic',
    title: 'Surgical Orthodontics',
    subtitle: 'Decompensation, Staging & Fixation Coordination',
    icon: Stethoscope,
    leadParagraph: 'Overcome severe skeletal discrepancies with deterministic pre-surgical decompensation, rigid fixation modeling, and rapid alignment sequencing for multidisciplinary teams.',
    clinicalCapabilities: [
      {
        title: 'Le Fort I & BSSO Trajectory Modeling',
        description: 'Simulate 3D skeletal movements in horizontal, vertical, and transverse planes with soft tissue profile prediction.',
        metric: '3-Plane Vector Analysis'
      },
      {
        title: 'Pre-Surgical Decompensation Goals',
        description: 'Calculate exact incisor proclination/retroclination targets to maximize surgical advancement and profile aesthetics.',
        metric: 'IMPA / U1-SN Norms'
      },
      {
        title: 'Surgery-First Approach (SFA)',
        description: 'Leverage the Regional Acceleratory Phenomenon (RAP) for accelerated tooth movement post-osteotomy in motivated patients.',
        metric: 'RAP 4-6x Velocity'
      },
      {
        title: 'Inferior Alveolar Nerve Safety',
        description: 'Automated proximity mapping from osteotomy cuts to the mandibular canal to eliminate permanent paresthesia hazards.',
        metric: '≥ 2.0mm Clearance'
      }
    ],
    biomechanicalHighlights: [
      'Simultaneous arch width coordination prior to surgical splint fabrication',
      'Rigid archwire stabilization (0.019 x 0.025 SS with soldered surgical hooks)',
      'Class III reverse curve of Spee management for mandibular leveling'
    ],
    ctaText: 'Plan Surgical Case in Studio',
    ctaHref: '/plans/generate'
  },
  {
    id: 'aligners',
    badge: 'Clear Aligner Biomechanics',
    title: 'Digital Aligner Therapy',
    subtitle: 'Velocity Control, Attachment Physics & Staging',
    icon: Sparkles,
    leadParagraph: 'Move beyond commercial black-box aligner setups. Odonto AI calculates true biological tooth movement limits, predictable attachment forces, and optimized IPR sequencing.',
    clinicalCapabilities: [
      {
        title: 'Staged Displacement Velocity Limiters',
        description: 'Strict limits of 0.20mm linear translation and 2° rotation per stage prevent tracking loss and root fenestration.',
        metric: '0.2mm / Stage Cap'
      },
      {
        title: 'Smart Attachment Geometry Generator',
        description: 'Calculates active surface angles (ellipsoidal, beveled, optimized root control) tailored to each tooth root volume.',
        metric: 'Physics-Based Vectors'
      },
      {
        title: 'Dynamic IPR & Expansion Sequencing',
        description: 'Coordinates transverse skeletal expansion before interproximal enamel reduction, preserving natural enamel volume.',
        metric: 'Bolton Ratio Calibrated'
      },
      {
        title: 'Deep Bite & Open Bite Staging',
        description: 'Automated anterior bite ramp integration, posterior intrusion anchors, and staged vertical elastics.',
        metric: 'Gnathological Curve'
      }
    ],
    biomechanicalHighlights: [
      'Eliminates tracking failure in difficult premolar rotations and canine derotations',
      'Generates patient compliance wear schedules calibrated to periodontal bone level',
      'Clear staging breakdown comparing non-extraction expansion vs premolar extraction'
    ],
    ctaText: 'Generate Aligner Plan',
    ctaHref: '/plans/generate'
  },
  {
    id: 'fixed',
    badge: 'Straight-Wire & Self-Ligating',
    title: 'Comprehensive Fixed Mechanics',
    subtitle: 'Prescription Modeling, Archwires & Space Closure',
    icon: Layers,
    leadParagraph: 'Engineered for clinicians using MBT, Roth, Damon, or custom bracket systems. Synthesizes friction mechanics, wire metallurgy, and anchorage budgeting.',
    clinicalCapabilities: [
      {
        title: 'Bracket Prescription Optimizer',
        description: 'Compares torque, tip, and in-out values across MBT, Roth, and Damon systems to match facial biotype.',
        metric: '.022" & .018" Prescriptions'
      },
      {
        title: 'Metallurgical Wire Progression Engine',
        description: 'Calculates transition timings from thermal CuNiTi leveling to Beta-Titanium (TMA) torque to Stainless Steel finishing.',
        metric: 'Force-Deflection Ratios'
      },
      {
        title: 'Extraction Space Closure Mechanics',
        description: 'Synthesizes sliding mechanics vs closing loop mechanics with precise anterior torque loss prevention.',
        metric: 'En-Masse vs Staged'
      },
      {
        title: 'Root Resorption Risk Index',
        description: 'Scores patient apex morphology, history, and movement distance to recommend light continuous force sequences.',
        metric: 'Predictive Safety Score'
      }
    ],
    biomechanicalHighlights: [
      'Calculates anchorage loss budget (minimum, moderate, maximum, or absolute)',
      'Intermaxillary elastic protocols (Class II/III, vertical, triangular, crossbite)',
      'Passive vs active self-ligation force levels for periodontally reduced dentition'
    ],
    ctaText: 'Explore Fixed Mechanics Studio',
    ctaHref: '/plans/generate'
  },
  {
    id: 'interceptive',
    badge: 'Early Mixed Dentition (Phase I)',
    title: 'Interceptive Orthodontics',
    subtitle: 'Growth Staging, Space Supervision & Skeletal Expansion',
    icon: Compass,
    leadParagraph: 'Harness skeletal growth peaks and guide eruptive pathways. Odonto AI evaluates growth indicators, transpalatal expansion, and space maintenance.',
    clinicalCapabilities: [
      {
        title: 'CVM Skeletal Maturation Staging',
        description: 'Assesses cervical vertebral morphology (CS1–CS6) from cephalometrics to pinpoint the exact mandibular growth peak.',
        metric: 'Peak Velocity Timing'
      },
      {
        title: 'Skeletal Palatal Expansion (RPE / MARPE)',
        description: 'Determines midpalatal suture obliteration stage and recommends tooth-borne Hyrax vs bone-borne MSE.',
        metric: 'Suture Resistance Index'
      },
      {
        title: 'Serial Extraction Protocol Guidance',
        description: 'Staged guidance of eruption: primary canines → first primary molars → first premolars for severe crowding.',
        metric: 'Dewel & Tweed Methods'
      },
      {
        title: 'Skeletal Class III Protraction Protocols',
        description: 'Coordinates reverse-pull facemask force vectors and alternating expansion/constriction (Alt-RAMEC).',
        metric: 'Maxillary Sutural Release'
      }
    ],
    biomechanicalHighlights: [
      'Prevents impaction of maxillary canines through timely primary canine extraction',
      'Habit-breaker appliance design for thumb sucking and tongue thrust open bites',
      'Space supervision calculation based on Moyers and Tanaka-Johnston mixed dentition analysis'
    ],
    ctaText: 'Assess Mixed Dentition Case',
    ctaHref: '/plans/generate'
  },
  {
    id: 'tads',
    badge: 'Skeletal Anchorage',
    title: 'TADs & Micro-Implants',
    subtitle: 'Extra-Alveolar Screws, Intrusion & Molar Distalization',
    icon: Anchor,
    leadParagraph: 'Achieve zero reciprocal anchorage loss. Plan extra-alveolar miniscrews at the infrazygomatic crest (IZC) and mandibular buccal shelf for borderless tooth movement.',
    clinicalCapabilities: [
      {
        title: 'Extra-Alveolar Placement Site Planning',
        description: 'Calculates cortical bone depth and insertion angulation for IZC (infrazygomatic crest) and mandibular buccal shelf.',
        metric: '12-14mm Extra-Alveolar Screws'
      },
      {
        title: 'True Molar Intrusion Vectors',
        description: 'Biomechanical vector calculation for vertical maxillary excess (gummy smile) and skeletal anterior open bite closure.',
        metric: '3-4mm True Intrusion'
      },
      {
        title: 'En-Masse Molar Distalization',
        description: 'Non-extraction correction of full Class II and Class III malocclusions with total arch retraction.',
        metric: '6-8mm Sagittal Travel'
      },
      {
        title: 'MARPE / MSE Micro-Implant Anchorage',
        description: 'Calculates bicortical engagement through the hard palate and nasal floor for parallel skeletal split in adults.',
        metric: '4-Screw Bicortical Engagement'
      }
    ],
    biomechanicalHighlights: [
      'Eliminates patient compliance dependency in adult non-extraction treatment',
      'Insertion torque guidelines (8-12 Ncm) to ensure primary stability and prevent failure',
      'Safe zone identification avoiding dental roots and maxillary sinus lining'
    ],
    ctaText: 'Compute Anchorage Requirements',
    ctaHref: '/plans/generate'
  },
  {
    id: 'implants',
    badge: 'Implantology & Restorative',
    title: 'Dental Implant Planning Studio',
    subtitle: 'Fixture Sizing, Misch Density & Screw Torque Specifications',
    icon: Drill,
    leadParagraph: 'Bridge the gap between orthodontics and implantology. Calculate fixture dimensions, subantral sinus lift protocols, bone density drilling speeds, and prosthetic screw torques.',
    clinicalCapabilities: [
      {
        title: 'Deterministic Fixture Sizing Algorithm',
        description: 'Analyzes 3D CBCT bone dimensions to recommend diameter and length honoring the 1.5mm buccal plate and 2.0mm IAN rules.',
        metric: '14 Major Implant Catalogs'
      },
      {
        title: 'Misch Bone Density (D1–D4) Engine',
        description: 'Translates Hounsfield Units into custom drilling sequences, tap requirements, and expected ISQ primary stability values.',
        metric: 'HU-Calibrated Drill RPM'
      },
      {
        title: 'Subantral Sinus Lift Calculator',
        description: 'Automatically determines Crestal OSFE (Summers) vs Lateral Window technique based on residual bone height.',
        metric: '< 4mm Staged / 4-8mm Simultaneous'
      },
      {
        title: 'Prosthetic Screw & Torque Engine',
        description: 'Calculates calibrated manufacturer torque (25-35 Ncm), abutment cuff height, and Crown-to-Implant (C/I) lever ratios.',
        metric: 'Screw vs Cement Matrix'
      }
    ],
    biomechanicalHighlights: [
      'Elian socket classification for immediate post-extraction implant placement',
      'Dual-zone grafting and custom healing abutment emergence profile guidance',
      'Medical screening for bisphosphonate MRONJ, anticoagulants, and heavy smoking'
    ],
    ctaText: 'Open Implant Planning Studio',
    ctaHref: '/implants'
  }
];

export function SpecialtyExplorer() {
  const [activeTab, setActiveTab] = useState<string>('surgical');
  const activeSpecialty = SPECIALTIES.find(s => s.id === activeTab) || SPECIALTIES[0];
  const Icon = activeSpecialty.icon;

  return (
    <section id="specialties" className="py-24 sm:py-32 relative bg-slate-950 text-white overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-900/20 via-teal-900/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs px-3 py-1 font-semibold rounded-full">
            By Orthodontists, For Orthodontists
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Engineered for Every Discipline of Tooth Movement.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Whether preparing a mandibular osteotomy or torqueing an anterior aligner, Odonto AI delivers specialty-specific biomechanics grounded in biological limits.
          </p>
        </div>

        {/* Apple-Style Specialty Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-12 mb-10 max-w-5xl mx-auto">
          {SPECIALTIES.map((spec) => {
            const SpecIcon = spec.icon;
            const isActive = activeTab === spec.id;
            return (
              <button
                key={spec.id}
                type="button"
                onClick={() => setActiveTab(spec.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-950 shadow-lg shadow-white/10 scale-105'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5'
                }`}
              >
                <SpecIcon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{spec.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Specialty Showcase Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/80 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Specialty Description & Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <Badge className="bg-teal-500/10 text-teal-300 border-teal-500/20 text-[11px] font-semibold mb-3">
                  {activeSpecialty.badge}
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                  <Icon className="w-7 h-7 text-blue-400 shrink-0" />
                  {activeSpecialty.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                  {activeSpecialty.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeSpecialty.leadParagraph}
              </p>

              {/* Key Biomechanical Principles */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Biomechanical Standard of Care:
                </span>
                <ul className="space-y-2">
                  {activeSpecialty.biomechanicalHighlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call-to-action Button */}
              <div className="pt-4">
                <Link href={activeSpecialty.ctaHref}>
                  <Button className="h-11 px-6 text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white rounded-full shadow-lg shadow-blue-500/20 transition-all cursor-pointer group">
                    <span>{activeSpecialty.ctaText}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: 4 Specialty Capabilities Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeSpecialty.clinicalCapabilities.map((cap, i) => (
                <div
                  key={i}
                  className="bg-slate-950/70 border border-white/5 hover:border-blue-500/30 rounded-2xl p-5 transition-all space-y-3 group hover:bg-slate-950"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xs font-mono font-bold">
                      0{i + 1}
                    </span>
                    {cap.metric && (
                      <Badge className="bg-slate-900 text-teal-300 border-teal-500/20 text-[10px] font-mono">
                        {cap.metric}
                      </Badge>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                    {cap.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
