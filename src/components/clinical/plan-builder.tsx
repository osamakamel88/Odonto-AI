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
  ShieldCheck,
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
  ListOrdered
} from 'lucide-react';
import { 
  STUDIO_DICTIONARY, 
  StudioLanguage, 
  MASTER_PHASE_TRANSLATIONS 
} from '@/lib/i18n/studio-dictionary';

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
      phase: 'Phase 2: Space Closure & Retraction',
      duration: '6–8 Months',
      objectives: 'En-masse maxillary anterior retraction on rigid posted archwires using nickel-titanium closed-coil springs (150g).',
      wires: '0.019"x0.025" Stainless Steel with soldered brass hooks',
      elastics: 'Class II Short elastics (3/16", 4.5 oz) for sagittal anchorage support'
    },
    {
      phase: 'Phase 3: Finishing & Detailing',
      duration: '3–4 Months',
      objectives: 'Settle occlusion, establish solid Class I canine and molar intercuspation, coordinate arch forms.',
      wires: '0.019"x0.025" TMA with artistic first and second-order bends',
      elastics: 'Triangular finishing elastics (1/8", 2.5 oz)'
    }
  ],
  anchoragePlan: {
    type: 'Maximum Anchorage (Group A)',
    devices: ['Transpalatal Arch (TPA 0.036")', 'Bilateral Infrazygomatic Crest (IZC) Miniscrews (2.0 x 12mm)'],
    rationale: 'Prevent mesial migration of maxillary first molars during 6mm incisor retraction; preserve molar Class II relationship.'
  },
  wireSequence: [
    '0.014" CuNiTi (Initial alignment & leveling)',
    '0.016" CuNiTi (Derotation & bracket slot expression)',
    '0.016"x0.022" CuNiTi (Transitional arch form coordination)',
    '0.019"x0.025" Stainless Steel posted (Rigid working wire for space closure)',
    '0.019"x0.025" TMA (Beta-titanium detailing and finishing)'
  ],
  elasticProtocol: {
    type: 'Class II Sagittal Elastics',
    force: '4.5 oz (Medium Heavy)',
    wearSchedule: 'Full-time wear (22 hours/day, changing twice daily)',
    timing: 'Initiated during space closure on rigid 0.019x0.025 SS archwires'
  },
  retentionProtocol: {
    maxillary: 'Essix vacuum-formed clear retainer (1.0mm) full coverage to second molars',
    mandibular: 'Fixed bonded lingual retainer wire (.0175" multistrand) canine-to-canine (3–3)',
    wearSchedule: 'Full-time (22 hrs/day) for 6 months, transitioning to nightly wear indefinitely',
    duration: 'Indefinite retention strongly recommended to prevent physiological aging relapse'
  },
  evidenceCitations: [
    {
      author: 'McLaughlin, Bennett & Trevisi',
      year: '2001',
      title: 'Systemized Orthodontic Treatment Mechanics',
      journal: 'Mosby Elsevier',
      takeaway: 'Light continuous forces with versatile pre-adjusted bracket system allow predictable sliding mechanics.'
    },
    {
      author: 'Proffit WR, Fields HW, Sarver DM',
      year: '2019',
      title: 'Contemporary Orthodontics (6th Edition)',
      journal: 'Elsevier',
      takeaway: 'Anchorage control during premolar extraction space closure dictates facial profile aesthetics.'
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
  experienceLevel = 'beginner',
  lang = 'en'
}: { 
  plan?: TreatmentPlanData; 
  isGenerating?: boolean;
  onExportPdf?: () => void;
  experienceLevel?: 'beginner' | 'expert';
  lang?: StudioLanguage;
}) {
  const t = STUDIO_DICTIONARY[lang] || STUDIO_DICTIONARY.en;
  const isAr = lang === 'ar';

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
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 font-bold text-[10px]">{t.phaseStatus.completed}</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300 font-bold text-[10px]">{t.phaseStatus.in_progress}</Badge>;
      case 'scheduled':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300 font-bold text-[10px]">{t.phaseStatus.scheduled}</Badge>;
      default:
        return <Badge variant="outline" className="text-slate-500 border-slate-300 text-[10px]">{t.phaseStatus.pending}</Badge>;
    }
  };

  return (
    <>
    <Card className="shadow-sm border-slate-200 bg-white overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Studio Header Toolbar */}
      <CardHeader className="pb-3 border-b bg-slate-50/70 px-5 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <CardTitle className="text-base font-bold text-slate-900">
                {t.planTitle}
              </CardTitle>
              <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200 font-bold gap-1">
                <Sparkles className="w-3 h-3 text-blue-500" />
                {t.engineBadge}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.planSubtitle}
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
              {educationMode ? t.juniorModeToggle : t.consultantModeToggle}
            </Button>

            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs h-8 gap-1.5 bg-white hover:bg-slate-50 border-slate-300 text-slate-800 font-semibold cursor-pointer shadow-xs"
              onClick={handleExportClick}
            >
              <FileDown className="w-3.5 h-3.5 text-blue-600" />
              {t.exportSummaryBtn}
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
                <span className="text-[11px] text-slate-400">({plan.patientAge || 15} {isAr ? 'سنة' : 'yrs'})</span>
                <span className="px-2 py-0.5 bg-blue-500/30 text-blue-300 border border-blue-400/40 rounded font-semibold text-[10px]">
                  {plan.diagnosisSummary?.angleClass || 'Class I'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {isAr ? 'الشكوى الرئيسية:' : 'Chief Complaint:'} <span className="font-medium text-amber-300 italic">"{plan.chiefComplaint || 'Orthodontic alignment'}"</span>
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-2 ${isAr ? 'text-left' : 'text-right'}`}>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 rounded-lg border border-slate-700 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-slate-200">
                {isAr ? 'المحرك البيوميكانيكي المزدوج' : (plan.aiEngineSource || 'Biomechanical Dual-Engine')}
              </span>
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
                <span>
                  {isAr 
                    ? 'نمط طبيب الامتياز الأكاديمي: شروح وحواجز أمان سريرية مفعلة' 
                    : 'Academic Junior Mode: Clinical Guardrails & Guidance Active'}
                </span>
              </div>
              <Badge className="bg-indigo-600 text-white border-none text-[9px] font-bold">
                {isAr ? 'طبيب امتياز / حديث التخرج' : 'Level: Fresh Graduate'}
              </Badge>
            </div>

            <p className="text-indigo-950 leading-relaxed text-[11px]">
              {isAr
                ? 'استراتيجية العلاج البيوميكانيكي تعتمد على أقصى درجات المرسى العظمي لسحب القواطع على أسلاك صلبة مستطيلة لتقليل البروز الأفقي دون إمالة القواطع السفلية خارج حدود العظم السنخي.'
                : (plan.aiReasoning || 'Biomechanical strategy prioritizes maximum anchorage retraction on posted rigid steel wires to eliminate overjet without flaring lower incisors beyond the symphysis.')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div className="p-2 rounded-lg bg-white border border-indigo-100 space-y-0.5">
                <span className="font-bold text-indigo-900 text-[10px] block uppercase">
                  {isAr ? 'حاجز أمان مثلث تويد:' : 'Tweed Triangle Safeguard:'}
                </span>
                <span className="text-[11px] text-slate-600">
                  {isAr 
                    ? 'الحفاظ على القواطع السفلية داخل العظم السنخي (IMPA 90° ± 5°).' 
                    : 'Preserve lower incisors inside biological symphysis (IMPA 90° ± 5°).'}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-indigo-100 space-y-0.5">
                <span className="font-bold text-teal-900 text-[10px] block uppercase">
                  {isAr ? 'هامش أمان عصب الفك IAN:' : 'IAN Safety Clearance:'}
                </span>
                <span className="text-[11px] text-slate-600">
                  {isAr 
                    ? 'الحفاظ على مسافة أمان لا تقل عن 2.0 مم عن قناة عصب الفك السفلي.' 
                    : 'Maintain ≥ 2.0mm safety boundary from inferior alveolar nerve canal.'}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-indigo-100 space-y-0.5">
                <span className="font-bold text-blue-900 text-[10px] block uppercase">
                  {isAr ? 'تدرج أسلاك البروفيت:' : 'Proffit Wire Progression:'}
                </span>
                <span className="text-[11px] text-slate-600">
                  {isAr 
                    ? 'يمنع منعاً باتاً تطبيق قوى السحب على أسلاك دائرية؛ استخدم الستانلس ستيل المستطيل.' 
                    : 'Never apply retraction forces on round wires; use posted rectangular steel.'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Senior Consultant Mode (High Density, Rapid Execution) */
          <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-700">
              <Briefcase className="w-4 h-4 text-slate-800 shrink-0" />
              <span className="font-bold text-slate-900">{isAr ? 'نمط الاستشاري الخبير:' : 'Senior Consultant Mode:'}</span>
              <span className="text-slate-500">{isAr ? 'بيانات بيوميكانيكية مكثفة وقيم تنفيذية مباشرة مفعلة.' : 'Concise biomechanical parameters & direct execution values active.'}</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-600" dir="ltr">
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
                {t.modalityTitle}
              </span>
              <Badge className="bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5">
                {isAr ? '٢٠–٢٤ شهراً' : (plan.estimatedDuration || '20–24 Months')}
              </Badge>
            </div>

            <h3 className="text-sm font-bold text-slate-900">
              {isAr 
                ? 'تقويم شامل ثابت سلكي (وصفة MBT قياس سلوت 0.022 بوصة)' 
                : (plan.treatmentModality?.primary || 'Fixed Pre-adjusted Appliance System')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isAr 
                ? 'نظام MBT Versatile+ مع تعويض عزم -6 درجات للقواطع المركزية العلوية لمنع انكفائها أثناء السحب' 
                : plan.treatmentModality?.prescription}
            </p>

            {plan.treatmentModality?.alternatives && plan.treatmentModality.alternatives.length > 0 && (
              <div className="pt-2 border-t border-blue-200/60 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">{t.alternativesLabel}: </span>
                <span>{isAr ? 'قوالب التقويم الشفافة مع أجنحة تقديم الفك السفلي' : plan.treatmentModality.alternatives[0]}</span>
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
                {t.extractionTitle}
              </span>
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
                plan.extractionDecision?.decision === 'Extraction'
                  ? 'bg-amber-200 text-amber-900 border-amber-300'
                  : 'bg-emerald-200 text-emerald-900 border-emerald-300'
              }`}>
                {plan.extractionDecision?.decision === 'Extraction' 
                  ? t.extractionIndicated 
                  : t.nonExtractionIndicated}
              </span>
            </div>

            {plan.extractionDecision?.teeth && plan.extractionDecision.teeth.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-xs font-semibold text-slate-700">{t.teethToExtract}</span>
                {plan.extractionDecision.teeth.map((tUnit, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-amber-200 text-amber-950 font-bold text-[11px] rounded-md border border-amber-300 shadow-2xs">
                    {isAr 
                      ? (tUnit.includes('14') ? 'الضاحك الأول العلوي الأيمن (#14)' : tUnit.includes('24') ? 'الضاحك الأول العلوي الأيسر (#24)' : tUnit)
                      : tUnit}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-xs font-semibold text-emerald-800">
                ✓ {isAr ? 'علاج تحفظي بدون خلع: المحافظة على كامل محيط القوس السنخي' : 'Non-Extraction Protocol: Preservation of full arch perimeter'}
              </div>
            )}

            <p className="text-xs text-slate-600 leading-relaxed">
              {isAr 
                ? 'خلع الضواحك العلوية الأولى يوفر 14 مم من محيط القوس: كافية تماماً لإرجاع القواطع 6 مم ورص التزاحم دون التأثير سلباً على الوجه.' 
                : plan.extractionDecision?.rationale}
            </p>
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
              <span>{t.tabs.masterPhases}</span>
            </button>

            <button
              onClick={() => setActiveTab('mechanics')}
              className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer truncate ${
                activeTab === 'mechanics' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {t.tabs.mechanics}
            </button>
            <button
              onClick={() => setActiveTab('wires')}
              className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer truncate ${
                activeTab === 'wires' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {t.tabs.wires}
            </button>
            <button
              onClick={() => setActiveTab('anchorage')}
              className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer truncate ${
                activeTab === 'anchorage' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {t.tabs.anchorage}
            </button>
            <button
              onClick={() => setActiveTab('retention')}
              className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer truncate ${
                activeTab === 'retention' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {t.tabs.retention}
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer truncate ${
                activeTab === 'evidence' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {t.tabs.evidence}
            </button>
            <button
              onClick={() => setActiveTab('protocols')}
              className={`py-2 px-1 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1 truncate ${
                activeTab === 'protocols' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <span>{t.tabs.protocols}</span>
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
                      {t.masterPhasesTitle}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {isAr 
                        ? 'اضغط على حالة أي مرحلة لتحديث متابعتها من معلقة حتى مكتملة' 
                        : 'Click any phase status to advance tracking state from pending to completed'}
                    </p>
                  </div>
                  <Link href="/implants">
                    <Button size="sm" variant="outline" className="h-7 text-xs border-teal-300 text-teal-700 bg-teal-50 hover:bg-teal-100 gap-1 font-semibold cursor-pointer">
                      <Drill className="w-3 h-3 text-teal-600" />
                      <span>{t.openImplantBtn}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-3">
                  {masterPhases.map((phase) => {
                    const trans = MASTER_PHASE_TRANSLATIONS[phase.phaseNumber]?.[lang] || MASTER_PHASE_TRANSLATIONS[phase.phaseNumber]?.en;
                    const phaseTitle = trans?.title || phase.title;
                    const phaseDiscipline = trans?.discipline || phase.discipline;
                    const phaseTimeline = trans?.timeline || phase.timeline;
                    const phaseObjectives = trans?.clinicalObjectives || phase.clinicalObjectives;
                    const phaseInterventions = trans?.interventions || phase.interventions;
                    const phaseClearance = trans?.clearanceRequired || phase.clearanceRequired;

                    return (
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
                                {phaseTitle}
                              </span>
                              <span className="text-[11px] text-slate-500 block">
                                {phaseDiscipline} • <strong className="text-slate-700">{phaseTimeline}</strong>
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {phase.targetTeeth && phase.targetTeeth.length > 0 && (
                              <div className="flex items-center gap-1">
                                {phase.targetTeeth.map(tTooth => (
                                  <Badge key={tTooth} variant="outline" className="bg-white text-slate-700 border-slate-200 text-[10px] font-mono">
                                    {tTooth}
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
                          <strong className="text-slate-900">{t.phaseLabels.objectives} </strong>{phaseObjectives}
                        </p>

                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            {t.phaseLabels.interventions}
                          </span>
                          <ul className={`text-xs text-slate-600 space-y-0.5 list-disc ${isAr ? 'pr-4' : 'pl-4'}`}>
                            {phaseInterventions.map((inv, idx) => (
                              <li key={idx}>{inv}</li>
                            ))}
                          </ul>
                        </div>

                        {phaseClearance && (
                          <div className="p-2 rounded bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                            <span><strong>{t.phaseLabels.clearance} </strong>{phaseClearance}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                        {isAr 
                          ? (phase.phase.includes('1') ? 'المرحلة 1: الرص والمحاذاة (Alignment & Leveling)' : phase.phase.includes('2') ? 'المرحلة 2: غلق المسافات وإرجاع القواطع (Space Closure)' : 'المرحلة 3: الإنهاء والتطابق الإطباقي (Finishing)') 
                          : phase.phase}
                      </span>
                      <span className="px-2.5 py-0.5 bg-slate-200 text-slate-800 rounded font-bold text-[10px]">
                        {isAr 
                          ? (phase.duration.includes('4–6') ? '٤–٦ أشهر' : phase.duration.includes('6–8') ? '٦–٨ أشهر' : '٣–٤ أشهر')
                          : phase.duration}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium">
                      {isAr
                        ? (phase.objectives.includes('Derotate') 
                            ? 'تعديل دوران الأسنان، وتعديل منحنى سبي، وفك التزاحم، وتجهيز أسلاك ستانلس ستيل مستطيلة صلبة للعمل.'
                            : phase.objectives.includes('En-masse')
                            ? 'إرجاع القواطع العلوية ككتلة واحدة (En-masse) على أسلاك صلبة مزودة بمقابض ويايات شد NiTi مغلقة بقوة 150 جم.'
                            : 'تطابق الإطباق النهائي، وتحقيق إطباق صنف أول متداخل للأنياب والأضراس، وتنسيق أقواس الفكين.')
                        : phase.objectives}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                      <span className="font-bold text-slate-900">{isAr ? 'الأسلاك المستخدمة:' : 'Archwires:'}</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-mono font-medium" dir="ltr">
                        {phase.wires}
                      </span>
                    </div>

                    {phase.elastics && (
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="font-bold text-slate-900">{isAr ? 'المطاط التقويمي:' : 'Elastics:'}</span>
                        <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded font-medium">
                          {isAr 
                            ? (phase.elastics.includes('Class II') ? 'مطاط صنف ثانٍ قصير (3/16 بوصة، 4.5 أونصة) لدعم المرسى السهمي' : 'مطاط إنهاء مثلث (1/8 بوصة، 2.5 أونصة)')
                            : phase.elastics}
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
                  {isAr 
                    ? 'تدرج ميتالورجي دقيق ومعاير متوافق مع نظام التقويم المعتمد:' 
                    : `Calibrated metallurgical progression optimized for ${plan.treatmentModality?.primary || 'Fixed Mechanics'}:`}
                </p>
                <div className="space-y-2">
                  {plan.wireSequence?.map((wire, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center gap-3 text-xs">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-mono font-semibold text-slate-800" dir="ltr">{wire}</span>
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
                      {t.anchorageTitle}
                    </span>
                    <Badge variant="outline" className="text-[10px] bg-white font-bold">
                      {isAr ? 'مرسى عظمي مطلق (Class A)' : plan.anchoragePlan?.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600">
                    {isAr 
                      ? 'منع تحرك الأضراس العلوية الأولى للأمام أثناء سحب القواطع مسافة 6 مم، للحفاظ على علاقة الأضراس في الصنف الثاني وإطباق الأنياب في الصنف الأول.' 
                      : plan.anchoragePlan?.rationale}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {plan.anchoragePlan?.devices?.map((d, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 bg-white border border-slate-200 rounded font-medium text-slate-700">
                        {isAr 
                          ? (d.includes('Transpalatal') ? 'قوس حنكي صلب (TPA 0.036")' : 'مسامير تقويم هيكلية IZC ثنائية (2.0 × 12 مم)')
                          : d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-teal-600" />
                      {t.elasticsTitle}
                    </span>
                    <Badge variant="outline" className="text-[10px] bg-teal-50 text-teal-800 border-teal-200 font-bold">
                      {isAr ? 'مطاط صنف ثانٍ سهمي' : plan.elasticProtocol?.type}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div><span className="text-slate-500">{isAr ? 'القوة: ' : 'Force: '}</span><strong>{isAr ? '4.5 أونصة (متوسط إلى قوي)' : plan.elasticProtocol?.force}</strong></div>
                    <div><span className="text-slate-500">{isAr ? 'الارتداء: ' : 'Wear: '}</span><strong>{isAr ? 'ارتداء كامل ٢٢ ساعة/يوم (تغيير مرتين يومياً)' : plan.elasticProtocol?.wearSchedule}</strong></div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Retention */}
            {activeTab === 'retention' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    {t.retentionTitle}
                  </span>
                  <div className="space-y-1.5 text-xs">
                    <div>
                      <strong className="text-slate-800">{isAr ? 'الفك العلوي: ' : 'Maxillary: '}</strong>
                      {isAr ? 'جهاز إيسيكس الشفاف (Essix 1.0mm) يغطي كامل القوس حتى الأضراس الثانية' : plan.retentionProtocol?.maxillary}
                    </div>
                    <div>
                      <strong className="text-slate-800">{isAr ? 'الفك السفلي: ' : 'Mandibular: '}</strong>
                      {isAr ? 'سلك لساني دائم ملصوق من الناب للناب (3-3 Bonded Lingual Retainer سلك .0175" مجدول)' : plan.retentionProtocol?.mandibular}
                    </div>
                    <div>
                      <strong className="text-slate-800">{isAr ? 'جدول الارتداء: ' : 'Schedule: '}</strong>
                      {isAr ? 'ارتداء كامل (22 ساعة/يوم) لمدة 6 أشهر، ثم الانتقال لارتداء ليلي دائم للحفاظ على النتيجة' : plan.retentionProtocol?.wearSchedule}
                    </div>
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
                    {t.evidenceTitle}
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
                      <strong className="text-slate-800">{isAr ? 'الفائدة الإكلينيكية المستخلصة: ' : 'Key Clinical Takeaway: '}</strong>
                      {isAr 
                        ? (cit.author.includes('McLaughlin')
                            ? 'القوى الخفيفة المستمرة مع أجهزة التقويم سابقة الضبط تسمح بميكانيكا انزلاقية محكومة وآمنة تماماً.'
                            : cit.author.includes('Proffit')
                            ? 'التحكم الدقيق في المرسى العظمي أثناء غلق مسافات خلع الضواحك هو العامل الحاسم في جماليات مظهر الشفاه والوجه.'
                            : 'يجب الحفاظ على القواطع السفلية داخل حدود العظم السنخي الحيوي (زاوية IMPA 90° ± 5°).')
                        : cit.takeaway}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 7: Specialized Protocols */}
            {activeTab === 'protocols' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  {isAr 
                    ? 'إرشادات بيوميكانيكية تخصصية للحالات السريرية المعقدة (انطمار الأسنان، التوسيع الهيكلي، الصنف الثالث، العضة المفتوحة):'
                    : 'Targeted biomechanical guidelines for complex clinical scenarios (impaction, adult expansion, Class III protraction, open bite):'}
                </p>

                {(plan.specializedProtocols || []).map((sp, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                        {isAr ? 'بروتوكول سرعة النمو والتوقيت الهيكلي CVM' : sp.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-600">
                        {sp.evidenceCitation}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">
                      {isAr ? 'نافذة طفرة نمو الفك السفلي البلوغية Baccetti CVM CS3-CS4' : sp.protocolName}
                    </h4>

                    <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-indigo-100 leading-relaxed">
                      {isAr 
                        ? 'الاستجابة العظمية التقويمية القصوى نشطة حالياً. يجب تعظيم التصحيح السهمي قبل اكتمال مرحلة النضوج CS5.'
                        : sp.keyTakeaway}
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
              {t.diagSummaryTitle}
            </h4>
            <div className="text-xs space-y-1.5 text-slate-700">
              <div>
                <strong className="text-slate-900">{t.skeletalLabel}: </strong> 
                {isAr 
                  ? 'علاقة هيكلية صنف ثانٍ (ANB 5.2°، Wits +3.5 مم) ناتجة عن تراجع الفك السفلي؛ نمط نمو قياسي (FMA 25°).'
                  : plan.diagnosisSummary?.skeletal}
              </div>
              <div>
                <strong className="text-slate-900">{t.dentalLabel}: </strong> 
                {isAr 
                  ? 'سوء إطباق صنف ثانٍ تقسيم 1؛ بروز أفقي 8 مم؛ عضة عميقة 5.5 مم؛ تزاحم علوي متوسط (-5 مم).'
                  : plan.diagnosisSummary?.dental}
              </div>
              <div>
                <strong className="text-slate-900">{t.softTissueLabel}: </strong> 
                {isAr 
                  ? 'مظهر جانبي محدب؛ عدم كفاءة إطباق الشفاه مع فجوة 3.5 مم عند الراحة؛ انحصار الشفة السفلية خلف القواطع العلوية.'
                  : plan.diagnosisSummary?.softTissue}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {t.objectivesTitle}
            </h4>
            <ul className={`text-xs space-y-1 text-slate-700 list-disc ${isAr ? 'pr-4' : 'pl-4'}`}>
              {isAr ? [
                'تصحيح التباين الهيكلي والسني السهمي للوصول لعلاقة صنف أول للأنياب والأضراس.',
                'تقليل البروز الأفقي من 8.0 مم إلى المعدل المثالي (2.0 مم) لإلغاء انحصار الشفة وتقليل خطر الرضوض.',
                'تعديل منحنى سبي وتسوية العضة العميقة للوصول إلى تراكب رأسي 2.0 مم.',
                'فك التزاحم الأمامي للفك العلوي بالكامل دون إمالة القواطع للدهليز.',
                'تحقيق التوازن التجميلي للأنسجة الرخوة والوصول لكفاءة وإغلاق طبيعي للشفاه عند الراحة.'
              ].map((obj, i) => (
                <li key={i}>{obj}</li>
              )) : (
                plan.objectives?.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Export Plan Modal */}
    {showExportModal && (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5 animate-in fade-in zoom-in-95" dir={isAr ? 'rtl' : 'ltr'}>
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{isAr ? 'تقرير ملخص خطة العلاج المعتمدة' : 'Treatment Plan Summary Report'}</h3>
              <p className="text-xs text-slate-500">{isAr ? `المريض: ${plan.patientName || 'المريض'} • الطبيب المعالج` : `Patient: ${plan.patientName || 'Patient'} • Attending Clinician`}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleCopy} className="text-xs gap-1.5 cursor-pointer">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t.copiedBtn : t.copyBtn}
              </Button>
              <Button size="sm" onClick={() => window.print()} className="text-xs gap-1.5 bg-blue-600 text-white cursor-pointer">
                <Printer className="w-3.5 h-3.5" />
                {isAr ? 'طباعة' : 'Print'}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowExportModal(false)} className="text-xs cursor-pointer">
                ✕
              </Button>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-800">
            <div className="p-3 bg-slate-50 rounded-lg border">
              <strong>{t.prescriptionLabel}:</strong> {isAr ? 'تقويم شامل ثابت سلكي (وصفة MBT 0.022")' : plan.treatmentModality?.primary}
              <br />
              <strong>{t.extractionTitle}:</strong> {plan.extractionDecision?.decision === 'Extraction' ? t.extractionIndicated : t.nonExtractionIndicated}
              <br />
              <strong>{isAr ? 'المدة التقديرية:' : 'Estimated Duration:'}</strong> {isAr ? '٢٠–٢٤ شهراً' : plan.estimatedDuration}
            </div>

            <div>
              <strong className="block text-slate-900 mb-1">{t.diagSummaryTitle}:</strong>
              <p className="text-slate-600">{plan.diagnosisSummary?.dental} {plan.diagnosisSummary?.skeletal}</p>
            </div>

            <div>
              <strong className="block text-slate-900 mb-1">{t.masterPhasesTitle}:</strong>
              <div className="space-y-1.5">
                {masterPhases.map(p => {
                  const trans = MASTER_PHASE_TRANSLATIONS[p.phaseNumber]?.[lang];
                  const pTitle = trans?.title || p.title;
                  const pTimeline = trans?.timeline || p.timeline;
                  return (
                    <div key={p.phaseNumber} className="p-2 border rounded bg-slate-50 flex items-center justify-between">
                      <span><strong>{isAr ? `المرحلة ${p.phaseNumber}: ${pTitle}` : `Phase ${p.phaseNumber}: ${pTitle}`}</strong> ({pTimeline})</span>
                      <span className="font-mono text-[10px] text-blue-700">{t.phaseStatus[p.status]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <strong className="block text-slate-900 mb-1">{t.mechanicsTitle}:</strong>
              <div className="space-y-2">
                {plan.mechanicsSequence?.map((m, i) => (
                  <div key={i} className="p-2 border rounded bg-slate-50">
                    <span className="font-bold text-blue-900">{m.phase} ({m.duration}):</span> {m.objectives}
                    <div className="text-[11px] text-slate-600 mt-0.5">{isAr ? 'السلك:' : 'Wire:'} {m.wires}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <strong className="block text-slate-900 mb-1">{t.retentionTitle}:</strong>
              <p className="text-slate-600">{plan.retentionProtocol?.maxillary} ({isAr ? 'علوي' : 'Upper'}), {plan.retentionProtocol?.mandibular} ({isAr ? 'سفلي' : 'Lower'})</p>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}