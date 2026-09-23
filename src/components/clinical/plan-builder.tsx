"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  BookOpen, 
  FileDown, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Layers, 
  HelpCircle, 
  Bookmark, 
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Activity,
  ArrowRight,
  Printer,
  Copy,
  Check,
  Zap,
  Anchor,
  CircleDot,
  ExternalLink,
  Drill,
  GraduationCap,
  Briefcase,
  Stethoscope,
  ListOrdered
} from 'lucide-react';

export interface MasterPhaseItem {
  phaseNumber: number;
  title: string;
  discipline: string;
  status: 'completed' | 'in_progress' | 'scheduled' | 'pending';
  timeline: string;
  targetTeeth?: string[];
  clinicalObjectives: string;
  interventions: string[];
  clearanceRequired?: string;
  notes?: string;
}

export interface TreatmentPlanData {
  patientName?: string;
  patientAge?: number;
  chiefComplaint?: string;
  aiEngineSource?: string;
  generatedAt?: string;
  diagnosisSummary?: {
    skeletal?: string;
    dental?: string;
    softTissue?: string;
    angleClass?: string;
  };
  objectives?: string[];
  treatmentModality?: {
    primary?: string;
    prescription?: string;
    alternatives?: string[];
    rationale?: string;
  };
  extractionDecision?: {
    decision?: 'Extraction' | 'Non-Extraction' | 'Borderline';
    teeth?: string[];
    rationale?: string;
    boltonAnalysisNote?: string;
  };
  masterPhases?: MasterPhaseItem[];
  mechanicsSequence?: {
    phase: string;
    duration: string;
    objectives: string;
    wires: string;
    elastics?: string;
  }[];
  anchoragePlan?: {
    type?: string;
    devices?: string[];
    rationale?: string;
  };
  wireSequence?: string[];
  elasticProtocol?: {
    type?: string;
    force?: string;
    wearSchedule?: string;
    timing?: string;
  };
  retentionProtocol?: {
    maxillary?: string;
    mandibular?: string;
    wearSchedule?: string;
    duration?: string;
  };
  risksAndConsent?: string[];
  evidenceCitations?: {
    author: string;
    year: string;
    title: string;
    journal: string;
    takeaway: string;
    pmid?: string;
    doi?: string;
    url?: string;
    evidenceTier?: string;
  }[];
  specializedProtocols?: {
    category: string;
    protocolName: string;
    keyTakeaway: string;
    evidenceCitation: string;
  }[];
  aiReasoning?: string;
  estimatedDuration?: string;
}

const DEFAULT_MASTER_PHASES: MasterPhaseItem[] = [
  {
    phaseNumber: 1,
    title: 'Emergency & Acute Pain Relief',
    discipline: 'Endodontics & Urgent Care',
    status: 'completed',
    timeline: 'Immediate (Week 1)',
    targetTeeth: ['#38', '#48'],
    clinicalObjectives: 'Eliminate acute pain, screen for pericoronitis around impacted third molars, and stabilize active periapical lesions.',
    interventions: [
      'Operculectomy or palliative irrigation around symptomatic third molars',
      'Diagnostic pulp vitality testing on teeth with deep caries',
      'Prescribe chlorhexidine 0.12% oral rinse'
    ],
    clearanceRequired: 'Zero acute pain prior to elective orthodontic bonding.'
  },
  {
    phaseNumber: 2,
    title: 'Periodontal & Hygiene Clearance',
    discipline: 'Periodontology & Preventive Care',
    status: 'completed',
    timeline: 'Weeks 2–4',
    clinicalObjectives: 'Establish pristine plaque control (<15%), verify zero active bleeding on probing, and ensure stable crestal bone height.',
    interventions: [
      'Full-mouth ultrasonic debridement and subgingival scaling & root planing (SRP)',
      'Assess biotype (thick flat vs thin scalloped) to prevent gingival dehiscence during arch expansion',
      'Fluoride varnish application to reinforce enamel against demineralization under brackets'
    ],
    clearanceRequired: 'Full periodontal clearance — active periodontitis is an absolute contraindication to orthodontic tooth movement.'
  },
  {
    phaseNumber: 3,
    title: 'Restorative & Endodontic Stabilization',
    discipline: 'Operative & Conservative Dentistry',
    status: 'in_progress',
    timeline: 'Month 1–2',
    targetTeeth: ['#16', '#25'],
    clinicalObjectives: 'Excavate caries and place definitive adhesive composite restorations with sound margins before bracket bonding.',
    interventions: [
      'Tooth #16: Class II MO composite restoration with anatomical contact matrix',
      'Tooth #25: Coronal seal evaluation and composite resin build-up',
      'Silane primer protocol prepared for bonding to any existing porcelain crowns'
    ],
    clearanceRequired: 'Caries arrest verified on bitewing radiographs.'
  },
  {
    phaseNumber: 4,
    title: 'Comprehensive Orthodontic Biomechanics',
    discipline: 'Orthodontics & Dentofacial Orthopedics',
    status: 'in_progress',
    timeline: 'Months 2–20 (18–20 Months)',
    clinicalObjectives: 'Correct skeletal sagittal discrepancy, eliminate overjet/crowding, and coordinate maxillary and mandibular arch widths.',
    interventions: [
      'Leveling & Alignment: .014 CuNiTi -> .016 CuNiTi -> .016x.022 CuNiTi',
      'Space Closure: .019x.025 Stainless Steel posted wires with NiTi closed-coil springs (150g)',
      'Anchorage Control: Transpalatal Arch (TPA) or bilateral IZC miniscrews (2.0x12mm)',
      'Finishing: .019x.025 TMA with light vertical settling elastics'
    ],
    clearanceRequired: 'Root parallelism verified on progress panoramic radiograph before debonding.'
  },
  {
    phaseNumber: 5,
    title: 'Implantology & Surgical Intervention',
    discipline: 'Oral Implantology & Maxillofacial Surgery',
    status: 'scheduled',
    timeline: 'Months 18–22 (Post-Space Opening)',
    targetTeeth: ['#36'],
    clinicalObjectives: 'Rehabilitate edentulous bounded spaces or execute orthognathic osteotomies following pre-surgical incisor decompensation.',
    interventions: [
      'Site #36: Fixture placement (Straumann BLT Ø 4.1 x 10mm) honoring 1.5mm buccal plate and 2.0mm IAN safety buffer',
      'Misch D2/D3 bone density drilling sequence with sterile chilled saline irrigation (800 RPM)',
      'Subantral sinus lift: OSFE crestal osteotome elevation if residual bone height < 8mm in posterior maxilla',
      'Prosthetic screw calibrated torque delivery (35 Ncm) with 10-minute re-torque protocol'
    ],
    clearanceRequired: 'Adequate mesiodistal space (≥ 7.0mm) and parallel adjacent roots verified on CBCT.'
  },
  {
    phaseNumber: 6,
    title: 'Prosthodontics, Esthetics & Dual Retention',
    discipline: 'Prosthodontics & Long-Term Retention',
    status: 'pending',
    timeline: 'Months 22–24 & Indefinite Retention',
    clinicalObjectives: 'Deliver definitive implant crown restorations, finalize gnathological occlusion, and safeguard against relapse.',
    interventions: [
      'Screw-retained zirconia crown on customized titanium base (emergence profile matched to gingival cuff)',
      'Maxillary retention: Essix 1.0mm clear vacuum-formed retainer covering second molars',
      'Mandibular retention: Bonded 3–3 multi-strand stainless steel lingual wire (.0175")',
      'Wear schedule: 22 hours/day for 6 months, transitioning to indefinite nightly wear'
    ],
    clearanceRequired: 'Mutually protected occlusion verified with Shimstock foil (anterior guidance with posterior disclusion).'
  }
];

const DEFAULT_PLAN: TreatmentPlanData = {
  masterPhases: DEFAULT_MASTER_PHASES,
  specializedProtocols: [
    {
      category: 'Growth Velocity & Skeletal Timing Protocol',
      protocolName: 'Baccetti CVM CS3-CS4 Pubertal Mandibular Spurt Window',
      keyTakeaway: 'Maximum skeletal orthopedic response active. Maximize sagittal correction before CS5 maturation.',
      evidenceCitation: 'Baccetti T et al. (Semin Orthod 2005; PMID: 16110663)'
    }
  ],
  diagnosisSummary: {
    skeletal: 'Class II Skeletal relationship (ANB 5.2°, Wits +3.5mm) due to Mandibular Retrognathism; Normodivergent growth pattern (FMA 25°).',
    dental: 'Angle Class II Division 1 malocclusion; Overjet 8.0mm; Overbite 5.5mm (Deep bite); Moderate upper arch crowding (-5mm); Coincident midlines.',
    softTissue: 'Convex facial profile; Lip incompetence with 3.5mm interlabial gap at rest; Lower lip trap behind maxillary incisors; Acute nasolabial angle.',
    angleClass: 'Class II Division 1'
  },
  objectives: [
    'Correct sagittal skeletal and dental discrepancy to Class I molar and canine relationships.',
    'Reduce overjet from 8.0mm to ideal (2.0mm) to alleviate soft tissue lip trap and reduce trauma risk.',
    'Level the Curve of Spee and correct deep bite to 2.0mm overbite.',
    'Resolve maxillary anterior crowding without labial flaring.',
    'Attain soft tissue balance and achieve effortless lip competence at rest.'
  ],
  treatmentModality: {
    primary: 'Fixed Comprehensive Orthodontics (MBT 0.022" Slot Prescription)',
    prescription: 'MBT Versatile+ Appliance System with -6° upper central torque compensation',
    alternatives: [
      'Clear Aligner Therapy with Mandibular Advancement wings',
      'Twin Block functional orthopedic appliance (growth dependent)'
    ],
    rationale: 'Preadjusted edgewise MBT system delivers precise 3-dimensional root position and controlled en-masse sliding retraction.'
  },
  extractionDecision: {
    decision: 'Extraction',
    teeth: ['Tooth 14 (Upper Right 1st Premolar)', 'Tooth 24 (Upper Left 1st Premolar)'],
    rationale: 'Bilateral maxillary first premolar extraction provides 14mm arch perimeter space: exactly sufficient for 6mm incisor retraction and crowding relief.',
    boltonAnalysisNote: 'Harmonious posterior occlusion achieved in Class II molar and Class I canine relationship.'
  },
  mechanicsSequence: [
    {
      phase: 'Phase 1: Alignment & Leveling',
      duration: '4–6 Months',
      objectives: 'Derotate teeth, level Curve of Spee, unravel crowding, prepare rigid working rectangular archwires.',
      wires: '0.014" NiTi → 0.016" NiTi → 0.016"x0.022" CuNiTi'
    },
    {
      phase: 'Phase 2: Space Closure & Overjet Retraction',
      duration: '8–10 Months',
      objectives: 'En-masse sliding retraction of upper 6 anterior teeth on posted rectangular steel wires using NiTi coil springs.',
      wires: '0.019"x0.025" Stainless Steel posted archwires',
      elastics: 'Class II Vector Elastics (3/16" 4.5 oz) full-time'
    },
    {
      phase: 'Phase 3: Detailing & Finishing',
      duration: '3–4 Months',
      objectives: 'Verify root parallelism, express second-order torque, coordinate arches, settle posterior intercuspation.',
      wires: '0.019"x0.025" TMA with vertical triangular settling elastics'
    }
  ],
  anchoragePlan: {
    type: 'Maximum Anchorage',
    devices: ['Transpalatal Arch (TPA) across 16 & 26', 'Optional bilateral IZC skeletal mini-screws'],
    rationale: 'Upper molars must be anchored stationary to allow 100% of extraction space to be utilized for anterior retraction.'
  },
  wireSequence: [
    '0.014" Heat-activated NiTi (Initial alignment)',
    '0.016" Superelastic NiTi (Derotation & bracket expression)',
    '0.016" x 0.022" Copper-NiTi (Transitional leveling)',
    '0.019" x 0.025" Stainless Steel posted (Sliding space closure)',
    '0.019" x 0.025" Titanium-Molybdenum Alloy (TMA) (Finishing bends)'
  ],
  elasticProtocol: {
    type: 'Class II Vector Elastics',
    force: '3/16" medium (4.5 oz)',
    wearSchedule: '22 hours/day, change twice daily',
    timing: 'Engaged strictly only on rigid rectangular stainless steel archwires'
  },
  retentionProtocol: {
    maxillary: 'Vacuum-formed thermoplastic retainer (Essix 1.0mm) covering second molars',
    mandibular: 'Bonded 3-3 multi-strand stainless steel lingual wire + nocturnal overlay',
    wearSchedule: 'Full-time for 6 months, followed by indefinite nightly wear',
    duration: 'Long-term retention recommended'
  },
  risksAndConsent: [
    'Mild apical root resorption risk (~1.0mm average) during anterior retraction.',
    'Anchorage loss if TPA or Class II elastics are worn irregularly.',
    'Post-treatment anterior relapse if retainers are neglected.'
  ],
  evidenceCitations: [
    {
      author: 'Proffit WR, Fields HW, Sarver DM',
      year: '2019',
      title: 'Contemporary Orthodontics (6th Edition)',
      journal: 'Elsevier Health Sciences',
      takeaway: 'Extraction of maxillary first premolars is the gold-standard protocol for Class II camouflage.'
    },
    {
      author: 'Tweed CH',
      year: '1944',
      title: 'The Frankfort-mandibular plane angle in orthodontic diagnosis and prognosis',
      journal: 'American Journal of Orthodontics',
      takeaway: 'Lower incisors must be preserved within the biological alveolar symphysis (IMPA 90° ± 5°).'
    }
  ],
  aiReasoning: 'Biomechanical strategy prioritizes maximum anchorage retraction on posted rigid steel wires to eliminate overjet without flaring lower incisors beyond the symphysis.',
  estimatedDuration: '20–24 Months'
};

export function PlanBuilder({ 
  plan = DEFAULT_PLAN, 
  isGenerating = false,
  onExportPdf,
  experienceLevel = 'beginner'
}: { 
  plan?: TreatmentPlanData; 
  isGenerating?: boolean;
  onExportPdf?: () => void;
  experienceLevel?: 'beginner' | 'expert';
}) {
  const [educationMode, setEducationMode] = useState(experienceLevel === 'beginner');
  const [activeTab, setActiveTab] = useState<'master_phases' | 'mechanics' | 'wires' | 'anchorage' | 'retention' | 'evidence' | 'protocols'>('master_phases');
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Editable master phases state
  const [masterPhases, setMasterPhases] = useState<MasterPhaseItem[]>(
    plan.masterPhases || DEFAULT_MASTER_PHASES
  );

  const togglePhaseStatus = (phaseNum: number) => {
    setMasterPhases(prev => prev.map(p => {
      if (p.phaseNumber !== phaseNum) return p;
      const order: MasterPhaseItem['status'][] = ['pending', 'scheduled', 'in_progress', 'completed'];
      const nextIdx = (order.indexOf(p.status) + 1) % order.length;
      return { ...p, status: order[nextIdx] };
    }));
  };

  const handleExportClick = () => {
    if (onExportPdf) {
      onExportPdf();
    } else {
      setShowExportModal(true);
    }
  };

  const handleCopy = () => {
    const text = `
ODONTO AI - ORTHODONTIC & IMPLANT CLINICAL TREATMENT PLAN
Patient: ${plan.patientName || 'Patient'} (${plan.patientAge || 15} yrs) | ${plan.diagnosisSummary?.angleClass || 'Class I'}
Chief Complaint: ${plan.chiefComplaint || 'N/A'}
Prescription: ${plan.treatmentModality?.primary || 'Fixed Appliance'}
Extraction Decision: ${plan.extractionDecision?.decision || 'Non-Extraction'} ${plan.extractionDecision?.teeth?.join(', ') || ''}
Estimated Duration: ${plan.estimatedDuration || '20-24 Months'}

MASTER 6-PHASE SEQUENCE:
${masterPhases.map(p => `Phase ${p.phaseNumber}: ${p.title} [${p.status.toUpperCase()}] - ${p.timeline}\n• Objectives: ${p.clinicalObjectives}`).join('\n\n')}

STAGED MECHANICS:
${plan.mechanicsSequence?.map(m => `• ${m.phase} (${m.duration}): ${m.objectives} | Wires: ${m.wires}`).join('\n') || ''}

RETENTION:
Maxillary: ${plan.retentionProtocol?.maxillary}
Mandibular: ${plan.retentionProtocol?.mandibular}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: MasterPhaseItem['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 font-bold text-[10px]">✓ Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300 font-bold text-[10px]">● In Progress</Badge>;
      case 'scheduled':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300 font-bold text-[10px]">⏱ Scheduled</Badge>;
      default:
        return <Badge variant="outline" className="text-slate-500 border-slate-300 text-[10px]">Pending Clearance</Badge>;
    }
  };

  return (
    <>
    <Card className="shadow-sm border-slate-200 bg-white overflow-hidden">
      {/* Studio Header Toolbar */}
      <CardHeader className="pb-3 border-b bg-slate-50/70 px-5 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <CardTitle className="text-base font-bold text-slate-900">
                AI Clinical Treatment Studio
              </CardTitle>
              <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200 font-bold gap-1">
                <Sparkles className="w-3 h-3 text-blue-500" />
                6-Phase Master Engine
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Staged biomechanics, emergency-to-retention sequencing &amp; live PubMed grounding
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant={educationMode ? "default" : "outline"}
              className={`text-xs h-8 gap-1.5 cursor-pointer font-medium ${
                educationMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'border-slate-300 text-slate-700 bg-white'
              }`}
              onClick={() => setEducationMode(!educationMode)}
              title="Toggle detailed clinical rationale explanations"
            >
              {educationMode ? <GraduationCap className="w-3.5 h-3.5 text-indigo-200" /> : <Briefcase className="w-3.5 h-3.5 text-slate-500" />}
              {educationMode ? 'Junior Mode: ON' : 'Consultant Mode'}
            </Button>

            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs h-8 gap-1.5 bg-white hover:bg-slate-50 border-slate-300 text-slate-800 font-semibold cursor-pointer shadow-xs"
              onClick={handleExportClick}
            >
              <FileDown className="w-3.5 h-3.5 text-blue-600" />
              Export Summary
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        {/* Active Patient & AI Verification Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 text-white rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 text-white font-black flex items-center justify-center text-xs shadow-md">
              {(plan.patientName || 'P')[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{plan.patientName || 'John Doe'}</span>
                <span className="text-[11px] text-slate-400">({plan.patientAge || 15} yrs)</span>
                <span className="px-2 py-0.5 bg-blue-500/30 text-blue-300 border border-blue-400/40 rounded font-semibold text-[10px]">
                  {plan.diagnosisSummary?.angleClass || 'Class I'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Chief Complaint: <span className="font-medium text-amber-300 italic">"{plan.chiefComplaint || 'Orthodontic alignment'}"</span>
              </p>
            </div>
          </div>

          <div className="text-right flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 rounded-lg border border-slate-700 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-slate-200">{plan.aiEngineSource || 'Biomechanical Dual-Engine'}</span>
            </div>
          </div>
        </div>

        {/* JUNIOR VS SENIOR CONSULTANT MODE CARD */}
        {educationMode ? (
          /* Junior Mode (Fresh Graduate Co-Pilot) */
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50/90 via-blue-50/70 to-teal-50/60 border border-indigo-200 text-xs space-y-2.5 animate-in fade-in shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-indigo-900">
                <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Academic Junior Mode: Clinical Guardrails &amp; Guidance Active</span>
              </div>
              <Badge className="bg-indigo-600 text-white border-none text-[9px] font-bold">
                Level: Fresh Graduate
              </Badge>
            </div>

            <p className="text-indigo-950 leading-relaxed text-[11px]">
              {plan.aiReasoning || 'Biomechanical strategy prioritizes maximum anchorage retraction on posted rigid steel wires to eliminate overjet without flaring lower incisors beyond the symphysis.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div className="p-2 rounded-lg bg-white border border-indigo-100 space-y-0.5">
                <span className="font-bold text-indigo-900 text-[10px] block uppercase">Tweed Triangle Safeguard:</span>
                <span className="text-[11px] text-slate-600">Preserve lower incisors inside biological symphysis (IMPA 90° ± 5°).</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-indigo-100 space-y-0.5">
                <span className="font-bold text-teal-900 text-[10px] block uppercase">IAN Safety Clearance:</span>
                <span className="text-[11px] text-slate-600">Maintain ≥ 2.0mm safety boundary from inferior alveolar nerve canal.</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-indigo-100 space-y-0.5">
                <span className="font-bold text-blue-900 text-[10px] block uppercase">Proffit Wire Progression:</span>
                <span className="text-[11px] text-slate-600">Never apply retraction forces on round wires; use posted rectangular steel.</span>
              </div>
            </div>
          </div>
        ) : (
          /* Senior Consultant Mode (High Density, Rapid Execution) */
          <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-700">
              <Briefcase className="w-4 h-4 text-slate-800 shrink-0" />
              <span className="font-bold text-slate-900">Senior Consultant Mode:</span>
              <span className="text-slate-500">Concise biomechanical parameters &amp; direct execution values active.</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-600">
              <span>Slot: <strong>.022" MBT</strong></span>
              <span>Retraction: <strong>150g Coil</strong></span>
              <span>Torque: <strong>35 Ncm</strong></span>
            </div>
          </div>
        )}

        {/* Primary Prescription & Extraction Decision Cards (Core Decision Hub) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Prescription & Modality */}
          <div className="p-4 rounded-xl border border-blue-200/80 bg-blue-50/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <CircleDot className="w-3.5 h-3.5 text-blue-600" />
                Target Appliance &amp; Prescription
              </span>
              <Badge className="bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5">
                {plan.estimatedDuration || '20–24 Months'}
              </Badge>
            </div>

            <h3 className="text-sm font-bold text-slate-900">
              {plan.treatmentModality?.primary || 'Fixed Pre-adjusted Appliance System'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">{plan.treatmentModality?.prescription}</p>

            {plan.treatmentModality?.alternatives && plan.treatmentModality.alternatives.length > 0 && (
              <div className="pt-2 border-t border-blue-200/60 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Alternatives: </span>
                <span>{plan.treatmentModality.alternatives[0]}</span>
              </div>
            )}
          </div>

          {/* Card 2: Extraction vs Non-Extraction Core */}
          <div className={`p-4 rounded-xl border space-y-2.5 ${
            plan.extractionDecision?.decision === 'Extraction' 
              ? 'border-amber-300 bg-amber-50/50' 
              : 'border-emerald-300 bg-emerald-50/50'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-800">
                <AlertTriangle className={`w-3.5 h-3.5 ${plan.extractionDecision?.decision === 'Extraction' ? 'text-amber-600' : 'text-emerald-600'}`} />
                Extraction Decision
              </span>
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
                plan.extractionDecision?.decision === 'Extraction'
                  ? 'bg-amber-200 text-amber-900 border-amber-300'
                  : 'bg-emerald-200 text-emerald-900 border-emerald-300'
              }`}>
                {plan.extractionDecision?.decision || 'Non-Extraction'}
              </span>
            </div>

            {plan.extractionDecision?.teeth && plan.extractionDecision.teeth.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-xs font-semibold text-slate-700">Prescribed Extractions:</span>
                {plan.extractionDecision.teeth.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-amber-200 text-amber-950 font-bold text-[11px] rounded-md border border-amber-300 shadow-2xs">
                    {t}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-xs font-semibold text-emerald-800">
                ✓ Non-Extraction Protocol: Preservation of full arch perimeter
              </div>
            )}

            <p className="text-xs text-slate-600 leading-relaxed">{plan.extractionDecision?.rationale}</p>
          </div>
        </div>

        {/* Segmented Navigation Tabs for Mechanics */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1 border-b bg-slate-50/80 p-1.5 text-xs text-center">
            {/* TAB 1: MASTER 6-PHASE SEQUENCE */}
            <button
              onClick={() => setActiveTab('master_phases')}
              className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1 truncate ${
                activeTab === 'master_phases' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>6-Phase Plan</span>
            </button>

            <button
              onClick={() => setActiveTab('mechanics')}
              className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer truncate ${
                activeTab === 'mechanics' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Mechanics
            </button>
            <button
              onClick={() => setActiveTab('wires')}
              className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer truncate ${
                activeTab === 'wires' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Archwires
            </button>
            <button
              onClick={() => setActiveTab('anchorage')}
              className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer truncate ${
                activeTab === 'anchorage' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Anchorage
            </button>
            <button
              onClick={() => setActiveTab('retention')}
              className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer truncate ${
                activeTab === 'retention' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Retention
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer truncate ${
                activeTab === 'evidence' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Evidence
            </button>
            <button
              onClick={() => setActiveTab('protocols')}
              className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1 truncate ${
                activeTab === 'protocols' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <span>Protocols</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-amber-400 text-slate-950">
                {plan.specializedProtocols?.length || 2}
              </span>
            </button>
          </div>

          <div className="p-4">
            {/* Tab 1: MASTER 6-PHASE SEQUENCE (CORE DIFFERENTIATOR) */}
            {activeTab === 'master_phases' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <ListOrdered className="w-4 h-4 text-blue-600" />
                      Master 6-Phase Interdisciplinary Sequence
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Click any phase status to advance tracking state from pending to completed
                    </p>
                  </div>
                  <Link href="/implants">
                    <Button size="sm" variant="outline" className="h-7 text-xs border-teal-300 text-teal-700 bg-teal-50 hover:bg-teal-100 gap-1 font-semibold cursor-pointer">
                      <Drill className="w-3 h-3 text-teal-600" />
                      <span>Bridge to Implant Studio</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-3">
                  {masterPhases.map((phase) => (
                    <div 
                      key={phase.phaseNumber}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all space-y-2 shadow-2xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            0{phase.phaseNumber}
                          </span>
                          <div>
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              {phase.title}
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              {phase.discipline} • <strong className="text-slate-700">{phase.timeline}</strong>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {phase.targetTeeth && phase.targetTeeth.length > 0 && (
                            <div className="flex items-center gap-1">
                              {phase.targetTeeth.map(t => (
                                <Badge key={t} variant="outline" className="bg-white text-slate-700 border-slate-200 text-[10px] font-mono">
                                  {t}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => togglePhaseStatus(phase.phaseNumber)}
                            className="cursor-pointer"
                            title="Click to cycle status: Pending -> Scheduled -> In Progress -> Completed"
                          >
                            {getStatusBadge(phase.status)}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 font-medium leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200/70">
                        <strong className="text-slate-900">Objectives: </strong>{phase.clinicalObjectives}
                      </p>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          Key Clinical Interventions:
                        </span>
                        <ul className="text-xs text-slate-600 space-y-0.5 list-disc pl-4">
                          {phase.interventions.map((inv, idx) => (
                            <li key={idx}>{inv}</li>
                          ))}
                        </ul>
                      </div>

                      {phase.clearanceRequired && (
                        <div className="p-2 rounded bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span><strong>Biological Clearance Rule: </strong>{phase.clearanceRequired}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Staged Mechanics */}
            {activeTab === 'mechanics' && (
              <div className="space-y-3.5">
                {plan.mechanicsSequence?.map((phase, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {phase.phase}
                      </span>
                      <span className="px-2.5 py-0.5 bg-slate-200 text-slate-800 rounded font-bold text-[10px]">
                        {phase.duration}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium">{phase.objectives}</p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                      <span className="font-bold text-slate-900">Archwires:</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-mono font-medium">
                        {phase.wires}
                      </span>
                    </div>

                    {phase.elastics && (
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="font-bold text-slate-900">Elastics:</span>
                        <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded font-medium">
                          {phase.elastics}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Wire Sequence */}
            {activeTab === 'wires' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Calibrated metallurgical progression optimized for {plan.treatmentModality?.primary || 'Fixed Mechanics'}:
                </p>
                <div className="space-y-2">
                  {plan.wireSequence?.map((wire, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center gap-3 text-xs">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-mono font-semibold text-slate-800">{wire}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Anchorage & Elastics */}
            {activeTab === 'anchorage' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Anchor className="w-3.5 h-3.5 text-blue-600" />
                      Anchorage Strategy
                    </span>
                    <Badge variant="outline" className="text-[10px] bg-white font-bold">
                      {plan.anchoragePlan?.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600">{plan.anchoragePlan?.rationale}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {plan.anchoragePlan?.devices?.map((d, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 bg-white border border-slate-200 rounded font-medium text-slate-700">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-teal-600" />
                      Intermaxillary Elastic Protocol
                    </span>
                    <Badge variant="outline" className="text-[10px] bg-teal-50 text-teal-800 border-teal-200 font-bold">
                      {plan.elasticProtocol?.type}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div><span className="text-slate-500">Force: </span><strong>{plan.elasticProtocol?.force}</strong></div>
                    <div><span className="text-slate-500">Wear: </span><strong>{plan.elasticProtocol?.wearSchedule}</strong></div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Retention */}
            {activeTab === 'retention' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Dual Retention Strategy
                  </span>
                  <div className="space-y-1.5 text-xs">
                    <div><strong className="text-slate-800">Maxillary:</strong> {plan.retentionProtocol?.maxillary}</div>
                    <div><strong className="text-slate-800">Mandibular:</strong> {plan.retentionProtocol?.mandibular}</div>
                    <div><strong className="text-slate-800">Schedule:</strong> {plan.retentionProtocol?.wearSchedule}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 6: Evidence Base */}
            {activeTab === 'evidence' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Live PubMed Grounded Citations (NCBI E-Utilities)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Real PMIDs / DOIs</span>
                </div>

                {plan.evidenceCitations?.map((cit, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
                      <span className="font-bold text-blue-800">{cit.author} ({cit.year}) • {cit.journal}</span>
                      <div className="flex items-center gap-1">
                        {cit.pmid && (
                          <a
                            href={cit.url || `https://pubmed.ncbi.nlm.nih.gov/${cit.pmid}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 transition-colors"
                          >
                            <span>PMID: {cit.pmid}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {cit.doi && (
                          <a
                            href={`https://doi.org/${cit.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200 transition-colors"
                          >
                            <span>DOI ↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-slate-800 italic leading-snug">"{cit.title}"</div>
                    <p className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/80 leading-relaxed">
                      <strong className="text-slate-800">Key Clinical Takeaway: </strong>{cit.takeaway}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 7: Specialized Protocols */}
            {activeTab === 'protocols' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Targeted biomechanical guidelines for complex clinical scenarios (impaction, adult expansion, Class III protraction, open bite):
                </p>

                {(plan.specializedProtocols || []).map((sp, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                        {sp.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-600">
                        {sp.evidenceCitation}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">
                      {sp.protocolName}
                    </h4>

                    <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-indigo-100 leading-relaxed">
                      {sp.keyTakeaway}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Diagnosis Problem List & Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              Diagnostic Problem List
            </h4>
            <div className="text-xs space-y-1.5 text-slate-700">
              <div><strong className="text-slate-900">Skeletal:</strong> {plan.diagnosisSummary?.skeletal}</div>
              <div><strong className="text-slate-900">Dental:</strong> {plan.diagnosisSummary?.dental}</div>
              <div><strong className="text-slate-900">Soft Tissue:</strong> {plan.diagnosisSummary?.softTissue}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Treatment Objectives
            </h4>
            <ul className="text-xs space-y-1 text-slate-700 list-disc pl-4">
              {plan.objectives?.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Export Plan Modal */}
    {showExportModal && (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Treatment Plan Summary Report</h3>
              <p className="text-xs text-slate-500">Patient: {plan.patientName || 'Patient'} • Attending Clinician</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleCopy} className="text-xs gap-1.5 cursor-pointer">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button size="sm" onClick={() => window.print()} className="text-xs gap-1.5 bg-blue-600 text-white cursor-pointer">
                <Printer className="w-3.5 h-3.5" />
                Print
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowExportModal(false)} className="text-xs cursor-pointer">
                ✕
              </Button>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-800">
            <div className="p-3 bg-slate-50 rounded-lg border">
              <strong>Prescription:</strong> {plan.treatmentModality?.primary}
              <br />
              <strong>Extraction Plan:</strong> {plan.extractionDecision?.decision} {plan.extractionDecision?.teeth?.join(', ')}
              <br />
              <strong>Estimated Duration:</strong> {plan.estimatedDuration}
            </div>

            <div>
              <strong className="block text-slate-900 mb-1">Diagnosis:</strong>
              <p className="text-slate-600">{plan.diagnosisSummary?.dental} {plan.diagnosisSummary?.skeletal}</p>
            </div>

            <div>
              <strong className="block text-slate-900 mb-1">Master 6-Phase Sequence:</strong>
              <div className="space-y-1.5">
                {masterPhases.map(p => (
                  <div key={p.phaseNumber} className="p-2 border rounded bg-slate-50 flex items-center justify-between">
                    <span><strong>Phase {p.phaseNumber}: {p.title}</strong> ({p.timeline})</span>
                    <span className="font-mono text-[10px] text-blue-700">{p.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <strong className="block text-slate-900 mb-1">Staged Mechanics:</strong>
              <div className="space-y-2">
                {plan.mechanicsSequence?.map((m, i) => (
                  <div key={i} className="p-2 border rounded bg-slate-50">
                    <span className="font-bold text-blue-900">{m.phase} ({m.duration}):</span> {m.objectives}
                    <div className="text-[11px] text-slate-600 mt-0.5">Wire: {m.wires}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <strong className="block text-slate-900 mb-1">Retention:</strong>
              <p className="text-slate-600">{plan.retentionProtocol?.maxillary} (Upper), {plan.retentionProtocol?.mandibular} (Lower)</p>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}