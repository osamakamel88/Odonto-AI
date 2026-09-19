"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck, 
  Layers, 
  Ruler, 
  Drill, 
  Compass, 
  Stethoscope, 
  Anchor,
  BookOpen,
  Check
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
  evidenceCitations: string[];
  ctaText: string;
  ctaHref: string;
}

export const SPECIALTIES: SpecialtyData[] = [
  {
    id: 'surgical',
    badge: 'Maxillofacial & Orthognathic Surgery',
    title: 'Surgical Orthodontics',
    subtitle: 'Decompensation, Staging & Fixation Coordination',
    icon: Stethoscope,
    leadParagraph: 'Designed in collaboration with oral and maxillofacial surgeons. Odonto AI automates multi-plane skeletal decompensation, surgical splint coordination, and rapid alignment sequencing for severe Class II, Class III, and craniofacial asymmetries.',
    clinicalCapabilities: [
      {
        title: '3-Plane Skeletal Trajectory Modeling',
        description: 'Simulate precise Le Fort I (advancement, impaction, downgrafting) and BSSO (setback, advancement) vectors with soft tissue profile prediction.',
        metric: 'Le Fort I & BSSO Vectors'
      },
      {
        title: 'Deterministic Decompensation Targets',
        description: 'Computes exact incisor torque adjustments (IMPA to 90° ± 3°, U1-SN to 102° ± 2°) to eliminate dentoalveolar compensations before surgical repositioning.',
        metric: 'IMPA / U1-NA Objectives'
      },
      {
        title: 'Surgery-First Protocol (SFA)',
        description: 'Harnesses the Regional Acceleratory Phenomenon (RAP) for accelerated post-surgical tooth movement (4–6x velocity) in non-crowded skeletal discrepancies.',
        metric: 'RAP Kinetic Window'
      },
      {
        title: 'Inferior Alveolar Nerve Safety Boundary',
        description: 'Automated 3D CBCT safety clearance from osteotomy cuts to the mandibular canal, preventing neurosensory paresthesia of the inferior alveolar nerve.',
        metric: '≥ 2.0mm Safety Clearance'
      }
    ],
    biomechanicalHighlights: [
      'Simultaneous transverse coordination and arch width matching prior to surgical splint fabrication',
      'Rigid stabilization staging (0.019 x 0.025 Stainless Steel archwires with soldered surgical hooks)',
      'Management of the curve of Spee: intentional leveling vs surgical step osteotomy'
    ],
    evidenceCitations: [
      'Proffit WR, et al. Contemporary Treatment of Dentofacial Deformity. Mosby; 2003.',
      'Baek SH, et al. Surgery-first approach in skeletal Class III malocclusion. Angle Orthod. 2010.'
    ],
    ctaText: 'Plan Orthognathic Case in Studio',
    ctaHref: '/plans/generate'
  },
  {
    id: 'aligners',
    badge: 'Clear Aligner Biomechanics',
    title: 'Digital Aligner Therapy',
    subtitle: 'Velocity Control, Attachment Physics & Staging',
    icon: Sparkles,
    leadParagraph: 'Overcome the biological limitations of commercial black-box aligner setups. Odonto AI evaluates root surface area, bone boundary constraints, and attachment geometry to guarantee predictable clinical tracking without mid-course corrections.',
    clinicalCapabilities: [
      {
        title: 'Staged Displacement Velocity Limiters',
        description: 'Strict biological limits capped at 0.20mm linear translation and 2.0° rotation per aligner stage prevent tracking failure and periodontal dehiscence.',
        metric: '0.20mm / 2.0° Per Stage'
      },
      {
        title: 'Physics-Based Attachment Geometry',
        description: 'Generates active surface angles (ellipsoidal, beveled, optimized root control) calibrated to root surface area and moment-to-force ratios (Mc/Mf).',
        metric: 'Moment-to-Force Ratios'
      },
      {
        title: 'Dynamic IPR & Expansion Sequencing',
        description: 'Coordinates transverse skeletal expansion before interproximal enamel reduction, preserving maximum biological enamel and preventing Bolton discrepancies.',
        metric: 'Bolton Ratio Calibrated'
      },
      {
        title: 'Vertical Deep Bite & Open Bite Staging',
        description: 'Integrates automated anterior bite turbos, posterior intrusion anchors, and staged vertical elastics to correct overbite predictably.',
        metric: 'Gnathological Curve Staging'
      }
    ],
    biomechanicalHighlights: [
      'Eliminates tracking failure in difficult premolar rotations and canine root uprighting',
      'Generates patient compliance wear schedules calibrated to periodontal bone level',
      'Objective non-extraction expansion vs premolar extraction decision algorithm'
    ],
    evidenceCitations: [
      'Kravitz ND, et al. How well do clear aligners work? A prospective clinical study. AJO-DO. 2009.',
      'Hahn W, et al. Force generation of clear aligners in rotational movements. J Orofac Orthop. 2010.'
    ],
    ctaText: 'Generate Clear Aligner Plan',
    ctaHref: '/plans/generate'
  },
  {
    id: 'fixed',
    badge: 'Straight-Wire & Self-Ligating',
    title: 'Comprehensive Fixed Mechanics',
    subtitle: 'Prescription Modeling, Archwires & Space Closure',
    icon: Layers,
    leadParagraph: 'Built for master clinicians utilizing MBT, Roth, Damon, or custom bracket prescriptions. Odonto AI optimizes archwire sequences, friction mechanics, extraction space closure, and periodontal safety margins.',
    clinicalCapabilities: [
      {
        title: 'Prescription Torque & Tip Modeling',
        description: 'Compares torque, tip, and in-out specifications across .022" and .018" slot systems (MBT, Roth, Damon Standard/High/Low Torque) to complement facial biotype.',
        metric: '.022" & .018" Prescriptions'
      },
      {
        title: 'Metallurgical Wire Progression Engine',
        description: 'Calculates transition timing from thermal CuNiTi leveling to Beta-Titanium (TMA) working arches to Stainless Steel finishing with exact force-deflection curves.',
        metric: 'CuNiTi → TMA → SS'
      },
      {
        title: 'Extraction Space Closure Mechanics',
        description: 'Calculates sliding mechanics vs closing loop mechanics, anchor loss budgeting (minimum, moderate, maximum), and anterior torque preservation.',
        metric: 'Anchor Budget Calculation'
      },
      {
        title: 'Root Resorption Risk Index (RRRI)',
        description: 'Predictive algorithm analyzing apex morphology (pipette, blunt, normal), heavy force duration, and travel distance to ensure light, continuous force levels.',
        metric: 'Apex Morphology Screening'
      }
    ],
    biomechanicalHighlights: [
      'Standardized bracket height placement guides customized to marginal ridge alignment',
      'Intermaxillary elastic vectors (Class II, Class III, vertical, triangular, crossbite) with force oz',
      'Passive vs active self-ligation friction analysis for periodontally compromised patients'
    ],
    evidenceCitations: [
      'McLaughlin RP, Bennett JC, Trevisi HJ. Systemized Orthodontic Treatment Mechanics. Mosby; 2001.',
      'Bishara SE. Textbook of Orthodontics. Saunders; 2001.'
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
    leadParagraph: 'Identify eruptive anomalies early and redirect skeletal growth during peak velocity. Odonto AI evaluates Cervical Vertebral Maturation (CVM), skeletal expansion, and serial extraction protocols.',
    clinicalCapabilities: [
      {
        title: 'CVM Skeletal Maturation Staging',
        description: 'Evaluates C2, C3, and C4 vertebral morphology (CS1 to CS6) on lateral cephalometrics to pinpoint the exact adolescent mandibular growth spurt.',
        metric: 'CS1–CS6 Peak Growth Timing'
      },
      {
        title: 'Skeletal Palatal Expansion (RPE / MARPE)',
        description: 'Assesses midpalatal suture obliteration stage to recommend tooth-borne Hyrax vs bone-borne micro-implant expanders (MSE).',
        metric: 'Suture Resistance Scoring'
      },
      {
        title: 'Serial Extraction Protocol Guidance',
        description: 'Evidence-based guidance for severe tooth-size/arch-length discrepancies: staged extraction of primary canines → first primary molars → first premolars.',
        metric: 'Dewel & Tweed Protocols'
      },
      {
        title: 'Skeletal Class III Protraction Protocols',
        description: 'Determines optimal orthopedic force vectors for reverse-pull facemasks (Petit) combined with alternate rapid expansion and constriction (Alt-RAMEC).',
        metric: 'Sutural Release Mechanics'
      }
    ],
    biomechanicalHighlights: [
      'Early canine impaction prevention through timely primary canine extraction',
      'Custom habit-breaker appliance design for chronic thumb sucking and tongue thrusting',
      'Space supervision and leeway space preservation utilizing lower lingual holding arches (LLHA)'
    ],
    evidenceCitations: [
      'Baccetti T, Franchi L, McNamara JA. The Cervical Vertebral Maturation (CVM) method. Semin Orthod. 2005.',
      'McNamara JA. Maxillary transverse deficiency. AJO-DO. 2000.'
    ],
    ctaText: 'Assess Mixed Dentition Case',
    ctaHref: '/plans/generate'
  },
  {
    id: 'tads',
    badge: 'Temporary Anchorage Devices (TADs)',
    title: 'Skeletal Anchorage & Miniscrews',
    subtitle: 'Extra-Alveolar Screws, Intrusion & Molar Distalization',
    icon: Anchor,
    leadParagraph: 'Attain true absolute anchorage with zero reciprocal tooth loss. Odonto AI calculates extra-alveolar insertion trajectories at the infrazygomatic crest (IZC) and buccal shelf for uncompromised sagittal and vertical movement.',
    clinicalCapabilities: [
      {
        title: 'Extra-Alveolar Placement Site Planning',
        description: 'Calculates cortical bone depth and insertion angulations for 12–14mm extra-alveolar screws in the IZC and mandibular buccal shelf.',
        metric: 'IZC & Buccal Shelf Sites'
      },
      {
        title: 'True Molar Intrusion Vectors',
        description: 'Calculates force vectors and center of resistance for true maxillary and mandibular molar intrusion, correcting severe anterior open bites without surgery.',
        metric: '3–4mm True Intrusion'
      },
      {
        title: 'Total Arch En-Masse Distalization',
        description: 'Non-extraction correction of complete Class II and Class III malocclusions via full-arch sagittal distalization against skeletal anchorage.',
        metric: '6–8mm Retraction Potential'
      },
      {
        title: 'MARPE / MSE Bicortical Anchorage',
        description: 'Models 4-screw bicortical engagement through the palatal bone and nasal floor for parallel skeletal midpalatal suture split in mature patients.',
        metric: 'Bicortical Engagement Index'
      }
    ],
    biomechanicalHighlights: [
      'Eliminates patient compliance dependency in adult non-extraction correction',
      'Calibrated insertion torque thresholds (8–12 Ncm) to ensure primary stability without bone necrosis',
      'Anatomical hazard boundary verification avoiding dental roots and maxillary sinus lining'
    ],
    evidenceCitations: [
      'Chang CH, Lin JS, Roberts WE. Extra-alveolar bone screws for skeletal anchorage. Semin Orthod. 2018.',
      'Park HS, et al. Micro-implant anchorage for treatment of severe gummy smile. AJO-DO. 2001.'
    ],
    ctaText: 'Compute Anchorage Requirements',
    ctaHref: '/plans/generate'
  },
  {
    id: 'implants',
    badge: 'Implantology & Interdisciplinary Care',
    title: 'Dental Implant Planning Studio',
    subtitle: 'Fixture Sizing, Misch Density & Screw Torque Specifications',
    icon: Drill,
    leadParagraph: 'The ultimate bridge between orthodontics and implant restorative dentistry. Plan post-orthodontic edentulous spaces with computerized fixture sizing, Misch bone density drilling sequences, sinus lift protocols, and calibrated screw torques.',
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
        metric: '< 4mm Staged / 4–8mm Simultaneous'
      },
      {
        title: 'Prosthetic Screw & Torque Engine',
        description: 'Calculates calibrated manufacturer torque (25–35 Ncm), abutment cuff height, and Crown-to-Implant (C/I) lever ratios.',
        metric: 'Screw vs Cement Matrix'
      }
    ],
    biomechanicalHighlights: [
      'Elian socket classification for immediate post-extraction implant placement',
      'Dual-zone grafting and custom healing abutment emergence profile guidance',
      'Medical screening for bisphosphonate MRONJ, anticoagulants, and heavy smoking'
    ],
    evidenceCitations: [
      'Misch CE. Contemporary Implant Dentistry. 3rd ed. Mosby; 2007.',
      'Buser D, et al. Modern surgical concepts for immediate implant placement. Periodontol 2000. 2017.'
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
    <section id="specialties" className="py-24 sm:py-32 bg-slate-50/60 border-t border-b border-slate-200/80 relative overflow-hidden">
      {/* Subtle Light Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-100/50 via-teal-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-3.5 py-1 font-semibold rounded-full shadow-xs">
            By Orthodontists, For Orthodontists
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Engineered for Every Discipline of Tooth Movement.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From surgical decompensation to digital aligner velocity control and restorative implant sizing, Odonto AI provides specialty-specific clinical intelligence grounded in biological reality.
          </p>
        </div>

        {/* Apple-Style Light Navigation Pills */}
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
                    ? 'bg-slate-950 text-white shadow-md shadow-slate-950/15 scale-102'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-xs'
                }`}
              >
                <SpecIcon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                <span>{spec.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Specialty Showcase Card (Pure Apple White Card) */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.06)] transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Specialty Description & Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <Badge className="bg-teal-50 text-teal-800 border-teal-200 text-[11px] font-semibold mb-3">
                  {activeSpecialty.badge}
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span>{activeSpecialty.title}</span>
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                  {activeSpecialty.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeSpecialty.leadParagraph}
              </p>

              {/* Key Biomechanical Principles */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Biomechanical Standard of Care:
                </span>
                <ul className="space-y-2">
                  {activeSpecialty.biomechanicalHighlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Literature Citations */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Foundational Clinical Literature:
                </span>
                {activeSpecialty.evidenceCitations.map((cite, i) => (
                  <div key={i} className="text-[11px] text-slate-600 italic">
                    • {cite}
                  </div>
                ))}
              </div>

              {/* Call-to-action Button */}
              <div className="pt-2">
                <Link href={activeSpecialty.ctaHref}>
                  <Button className="h-11 px-6 text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md shadow-blue-600/20 transition-all cursor-pointer group flex items-center gap-2">
                    <span>{activeSpecialty.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: 4 Clinical Capabilities Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeSpecialty.clinicalCapabilities.map((cap, i) => (
                <div
                  key={i}
                  className="bg-slate-50/70 border border-slate-200/80 hover:border-blue-400 hover:bg-white rounded-2xl p-5 transition-all space-y-3 shadow-xs hover:shadow-md group"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-mono font-bold">
                      0{i + 1}
                    </span>
                    {cap.metric && (
                      <Badge className="bg-white text-teal-700 border-slate-200 text-[10px] font-mono font-semibold shadow-xs">
                        {cap.metric}
                      </Badge>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {cap.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
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
