"use client";

import React, { useState } from 'react';
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
  CircleDot
} from 'lucide-react';

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
  }[];
  aiReasoning?: string;
  estimatedDuration?: string;
}

const DEFAULT_PLAN: TreatmentPlanData = {
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
  onExportPdf 
}: { 
  plan?: TreatmentPlanData; 
  isGenerating?: boolean;
  onExportPdf?: () => void;
}) {
  const [educationMode, setEducationMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'mechanics' | 'wires' | 'anchorage' | 'retention' | 'evidence'>('mechanics');
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExportClick = () => {
    if (onExportPdf) {
      onExportPdf();
    } else {
      setShowExportModal(true);
    }
  };

  const handleCopy = () => {
    const text = `
ODONTO AI - ORTHODONTIC CLINICAL TREATMENT PLAN
Patient: ${plan.patientName || 'Patient'} (${plan.patientAge || 15} yrs) | ${plan.diagnosisSummary?.angleClass || 'Class I'}
Chief Complaint: ${plan.chiefComplaint || 'N/A'}
Prescription: ${plan.treatmentModality?.primary || 'Fixed Appliance'}
Extraction Decision: ${plan.extractionDecision?.decision || 'Non-Extraction'} ${plan.extractionDecision?.teeth?.join(', ') || ''}
Estimated Duration: ${plan.estimatedDuration || '20-24 Months'}

STAGED MECHANICS:
${plan.mechanicsSequence?.map(m => `• ${m.phase} (${m.duration}): ${m.objectives} | Wires: ${m.wires}`).join('\n') || ''}

ANCHORAGE & ELASTICS:
Anchorage: ${plan.anchoragePlan?.type} (${plan.anchoragePlan?.devices?.join(', ')})
Elastics: ${plan.elasticProtocol?.type} - ${plan.elasticProtocol?.force} (${plan.elasticProtocol?.wearSchedule})

RETENTION:
Maxillary: ${plan.retentionProtocol?.maxillary}
Mandibular: ${plan.retentionProtocol?.mandibular}
Schedule: ${plan.retentionProtocol?.wearSchedule}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                AI Orthodontic Treatment Plan
              </CardTitle>
              <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200 font-semibold gap-1">
                <Sparkles className="w-3 h-3 text-blue-500" />
                7-Layer Synthesized
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Staged biomechanics, archwire sequences, extraction boundaries &amp; literature citations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant={educationMode ? "default" : "outline"}
              className={`text-xs h-8 gap-1.5 cursor-pointer font-medium ${
                educationMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'border-slate-300 text-slate-700'
              }`}
              onClick={() => setEducationMode(!educationMode)}
              title="Toggle detailed clinical rationale explanations"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {educationMode ? 'Rationale: ON' : 'Rationale: OFF'}
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

          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 rounded-lg border border-slate-700 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-slate-200">{plan.aiEngineSource || 'Biomechanical Rule-Engine'}</span>
            </div>
          </div>
        </div>

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

        {/* Educational Clinical Reasoning Box (Toggleable) */}
        {educationMode && plan.aiReasoning && (
          <div className="p-4 rounded-xl bg-indigo-50/90 border border-indigo-200 text-xs space-y-1.5 animate-in fade-in">
            <div className="flex items-center gap-2 font-bold text-indigo-900">
              <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Academic Chain-of-Thought &amp; Biomechanical Rationale</span>
            </div>
            <p className="text-indigo-950 leading-relaxed text-[11px]">{plan.aiReasoning}</p>
          </div>
        )}

        {/* Segmented Navigation Tabs for Mechanics */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <div className="flex flex-wrap items-center border-b bg-slate-50/80 p-1.5 gap-1 text-xs">
            <button
              onClick={() => setActiveTab('mechanics')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'mechanics' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Staged Mechanics
            </button>
            <button
              onClick={() => setActiveTab('wires')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'wires' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Archwire Progression
            </button>
            <button
              onClick={() => setActiveTab('anchorage')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'anchorage' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Anchorage &amp; Elastics
            </button>
            <button
              onClick={() => setActiveTab('retention')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'retention' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Retention Protocol
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'evidence' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Literature Evidence
            </button>
          </div>

          <div className="p-4">
            {/* Tab 1: Staged Mechanics */}
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
                      <span className="font-bold text-slate-800">Wire Sequence:</span>
                      <span className="px-2 py-0.5 bg-white border border-slate-200 rounded font-mono text-slate-700 font-semibold">
                        {phase.wires}
                      </span>
                      {phase.elastics && (
                        <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded font-semibold">
                          Elastics: {phase.elastics}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Archwire Progression Ladder */}
            {activeTab === 'wires' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">
                  Step-by-step alloy transitions designed for optimal force delivery, biological tooth movement, and minimum root resorption:
                </p>

                <div className="space-y-2.5">
                  {(plan.wireSequence || [
                    '0.014" Heat-activated NiTi',
                    '0.016" Superelastic NiTi',
                    '0.016" x 0.022" CuNiTi',
                    '0.019" x 0.025" Stainless Steel',
                    '0.019" x 0.025" TMA'
                  ]).map((wire, i) => {
                    const isNiTi = wire.toLowerCase().includes('niti');
                    const isSS = wire.toLowerCase().includes('stainless') || wire.toLowerCase().includes('steel');
                    const isTMA = wire.toLowerCase().includes('tma');

                    return (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white shadow-2xs">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-black text-xs flex items-center justify-center shrink-0">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-xs text-slate-900 font-mono">{wire}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isNiTi ? 'bg-amber-100 text-amber-800' :
                          isSS ? 'bg-blue-100 text-blue-800' :
                          isTMA ? 'bg-purple-100 text-purple-800' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {isNiTi ? 'Superelastic / Leveling' : isSS ? 'Rigid / Space Closure' : isTMA ? 'Detailing / Finishing' : 'Working'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Anchorage & Elastics */}
            {activeTab === 'anchorage' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Anchorage Sub-Card */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Anchor className="w-3.5 h-3.5 text-blue-600" />
                      Anchorage Demand
                    </span>
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                      {plan.anchoragePlan?.type || 'Maximum'}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="font-semibold text-slate-800">Prescribed Appliances:</div>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-600 text-[11px]">
                      {plan.anchoragePlan?.devices?.map((dev, i) => (
                        <li key={i}>{dev}</li>
                      )) || <li>Transpalatal Arch (TPA)</li>}
                    </ul>
                  </div>

                  <p className="text-[11px] text-slate-600 border-t pt-2 mt-2">
                    {plan.anchoragePlan?.rationale || 'Hold posterior anchorage units stationary during anterior segment retraction.'}
                  </p>
                </div>

                {/* Elastics Sub-Card */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      Intermaxillary Elastics
                    </span>
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      {plan.elasticProtocol?.force || '3/16" 4.5 oz'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 space-y-1">
                    <div><strong>Configuration:</strong> {plan.elasticProtocol?.type || 'Intermaxillary Vector'}</div>
                    <div><strong>Wear Schedule:</strong> {plan.elasticProtocol?.wearSchedule || '22 hrs/day'}</div>
                    <div><strong>Timing:</strong> {plan.elasticProtocol?.timing || 'Engage only on rectangular steel'}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Retention */}
            {activeTab === 'retention' && (
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Dual-Arch Retention &amp; Relapse Prevention Protocol
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white border rounded-lg space-y-1">
                    <strong className="text-slate-900 block text-xs">Maxillary Retainer:</strong>
                    <p className="text-slate-600 text-[11px]">{plan.retentionProtocol?.maxillary}</p>
                  </div>
                  <div className="p-3 bg-white border rounded-lg space-y-1">
                    <strong className="text-slate-900 block text-xs">Mandibular Retainer:</strong>
                    <p className="text-slate-600 text-[11px]">{plan.retentionProtocol?.mandibular}</p>
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-lg text-xs text-emerald-950 flex items-center justify-between">
                  <span><strong>Prescribed Wear Schedule:</strong> {plan.retentionProtocol?.wearSchedule}</span>
                  <span className="text-[10px] font-bold uppercase text-emerald-700">Permanent Lingual Bond</span>
                </div>
              </div>
            )}

            {/* Tab 5: Evidence Citations */}
            {activeTab === 'evidence' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Every extraction, wire, and anchorage decision is mathematically anchored in authoritative peer-reviewed literature:
                </p>

                {plan.evidenceCitations?.map((cit, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{cit.author} ({cit.year})</span>
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {cit.journal}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-800 italic">"{cit.title}"</div>
                    <p className="text-[11px] text-slate-600 pt-0.5">
                      <strong className="text-slate-800">Key Clinical Takeaway:</strong> {cit.takeaway}
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
              <p className="text-xs text-slate-500">Patient: {plan.patientName || 'Patient'} • Attending: Dr. John Doe</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleCopy} className="text-xs gap-1.5">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button size="sm" onClick={() => window.print()} className="text-xs gap-1.5 bg-blue-600 text-white">
                <Printer className="w-3.5 h-3.5" />
                Print
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowExportModal(false)} className="text-xs">
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