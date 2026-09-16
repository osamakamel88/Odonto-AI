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
  ChevronUp
} from 'lucide-react';

export interface TreatmentPlanData {
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
    dental: 'Angle Class II Division 1 malocclusion; Overjet 8.0mm; Overbite 5.5mm (Deep bite); Moderate upper arch crowding (-5mm); Mild lower arch crowding (-2.5mm); Coincident midlines.',
    softTissue: 'Convex facial profile; Lip incompetence with 3.5mm interlabial gap at rest; Lower lip trap behind maxillary central incisors; Acute nasolabial angle (92°).',
    angleClass: 'Class II Division 1'
  },
  objectives: [
    'Correct sagittal skeletal and dental discrepancy to Class I molar and canine relationships.',
    'Reduce overjet from 8.0mm to ideal (2.0mm) to alleviate soft tissue lip trap and reduce trauma risk.',
    'Level the Curve of Spee and correct deep bite to 2.0mm overbite.',
    'Resolve maxillary and mandibular anterior crowding.',
    'Attain soft tissue balance and achieve lip competence at rest.'
  ],
  treatmentModality: {
    primary: 'Fixed Comprehensive Orthodontics (MBT 0.022" Slot Prescription)',
    prescription: 'MBT Versatile+ Appliance System with -6° upper central torque compensation',
    alternatives: ['Twin Block functional appliance followed by fixed appliances (if within peak pubertal growth)', 'Clear Aligner therapy with Class II precision wings / mandibular advancement'],
    rationale: 'Fixed preadjusted appliance offers precise root torque control required for upper anterior retraction without uncontrolled tipping.'
  },
  extractionDecision: {
    decision: 'Extraction',
    teeth: ['Tooth 14 (Upper Right 1st Premolar)', 'Tooth 24 (Upper Left 1st Premolar)'],
    rationale: 'Extraction of upper first premolars only provides 14mm of space: 5mm for resolving maxillary crowding and 9mm for complete overjet reduction and canine retraction into solid Class I relationship without retroclining lower incisors.',
    boltonAnalysisNote: 'Overall Bolton ratio 91.2% (Normal). Extraction of upper premolars maintains harmonious posterior interdigitation.'
  },
  mechanicsSequence: [
    {
      phase: 'Phase 1: Leveling & Alignment',
      duration: '4–6 Months',
      objectives: 'Correct individual tooth rotations, level the occlusal plane, resolve crowding.',
      wires: '0.014 NiTi → 0.016 NiTi → 0.016x0.022 CuNiTi',
      elastics: 'No intermaxillary elastics during initial alignment'
    },
    {
      phase: 'Phase 2: Working Phase & Overjet Reduction',
      duration: '8–10 Months',
      objectives: 'En-masse maxillary anterior retraction on rigid archwire with sliding mechanics; Close extraction spaces.',
      wires: '0.019x0.025 Stainless Steel with posted archwires',
      elastics: 'Class II elastics (3/16" 4.5 oz) worn full-time; TAD-assisted retraction optional'
    },
    {
      phase: 'Phase 3: Detailing & Finishing',
      duration: '3–4 Months',
      objectives: 'Root parallelism verification on panoramic radiograph, marginal ridge leveling, settle posterior occlusion.',
      wires: '0.019x0.025 TMA or 0.017x0.025 Braided Steel',
      elastics: 'Triangular finishing elastics (1/8" 3.5 oz) bilaterally for 6 weeks'
    }
  ],
  anchoragePlan: {
    type: 'Maximum to Absolute Anchorage',
    devices: ['Transpalatal Arch (TPA) across teeth 16 and 26', 'Optional bilateral infrazygomatic (IZC) mini-screws/TADs if patient compliance is borderline'],
    rationale: 'Full retraction of anterior segment without mesial loss of upper molars is critical to achieving full 6mm overjet reduction.'
  },
  wireSequence: [
    '0.014" Heat-activated Nickel-Titanium (Initial alignment)',
    '0.016" Superelastic NiTi (Derotation & bracket expression)',
    '0.016" x 0.022" Copper-NiTi (Torque introduction)',
    '0.019" x 0.025" Stainless Steel posted (Retraction & space closure)',
    '0.019" x 0.025" Titanium-Molybdenum Alloy (TMA) (Finishing bends)'
  ],
  elasticProtocol: {
    type: 'Class II Vector Elastics',
    force: '3/16" medium force (4.5 oz)',
    wearSchedule: '22 hours/day, change twice daily',
    timing: 'Initiated only once 0.019x0.025 SS rigid working archwires are fully seated'
  },
  retentionProtocol: {
    maxillary: 'Removable Essix (Vacuum-Formed Retainer) covering second molars',
    mandibular: 'Bonded 3-3 multi-strand stainless steel lingual wire (teeth 33 to 43) plus nocturnal Essix overlay',
    wearSchedule: 'Full-time for initial 6 months (except meals), transitioning to nocturnal wear indefinitely',
    duration: 'Lifelong retention advised to preserve anterior alignment'
  },
  risksAndConsent: [
    'External apical root resorption risk (evaluated at 1.5mm average for maxillary incisors during comprehensive retraction).',
    'Black triangle formation between maxillary central incisors if gingival papilla is deficient.',
    'Relapse tendency if retainer wear compliance is suboptimal.',
    'Demineralization / white spot lesions around brackets if oral hygiene is not scrupulously maintained.'
  ],
  evidenceCitations: [
    {
      author: 'Proffit WR, Fields HW, Sarver DM',
      year: '2019',
      title: 'Contemporary Orthodontics (6th Edition)',
      journal: 'Elsevier Health Sciences',
      takeaway: 'Extraction of maxillary first premolars is gold-standard for Class II camouflage when mandibular growth is complete.'
    },
    {
      author: 'Bishara SE, Cummins DM, Zaher AR',
      year: '1997',
      title: 'Comparisons of extraction vs nonextraction on soft tissue profile',
      journal: 'American Journal of Orthodontics and Dentofacial Orthopedics (AJO-DO)',
      takeaway: 'Maxillary premolar extraction in Class II div 1 patients reliably normalizes the nasolabial angle and achieves lip competence without detrimental profile flattening.'
    },
    {
      author: 'Littlewood SJ, Millett DT, Doubleday B',
      year: '2016',
      title: 'Retention procedures for stabilising tooth position after treatment with orthodontic braces',
      journal: 'Cochrane Database of Systematic Reviews',
      takeaway: 'Combination of bonded mandibular lingual retainer and vacuum-formed maxillary retainer yields highest stability against anterior crowding relapse.'
    }
  ],
  aiReasoning: 'Analysis indicates an adult skeletal Class II discrepancy with significant overjet and lip trap. Because the patient is beyond the peak of mandibular growth, functional orthopedic acceleration is unlikely to correct the 8mm overjet alone. Camouflage mechanics via bilateral upper first premolar extraction with maximum anchorage allows complete reduction of the overjet, resolves crowding, and normalizes the soft tissue profile while avoiding mandibular incisor proclination beyond the anatomical symphyseal cortical envelope.',
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
  const [educationMode, setEducationMode] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>('mechanics');
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleSection = (sec: string) => {
    setExpandedSection(expandedSection === sec ? null : sec);
  };

  const handleExportClick = () => {
    if (onExportPdf) {
      onExportPdf();
    } else {
      setShowExportModal(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `
ORTHODONTIC TREATMENT PLAN - ODONTO AI
Prescription: ${plan.treatmentModality?.primary || 'Fixed Appliance'} (${plan.treatmentModality?.prescription || ''})
Duration: ${plan.estimatedDuration || '20-24 Months'}
Extraction Decision: ${plan.extractionDecision?.decision || 'Non-Extraction'} ${plan.extractionDecision?.teeth?.join(', ') || ''}

DIAGNOSIS:
Skeletal: ${plan.diagnosisSummary?.skeletal || ''}
Dental: ${plan.diagnosisSummary?.dental || ''}

OBJECTIVES:
${plan.objectives?.map((o, i) => `${i + 1}. ${o}`).join('\n') || ''}

STAGED MECHANICS:
${plan.mechanicsSequence?.map(m => `${m.phase} (${m.duration}): ${m.objectives} | Wires: ${m.wires}`).join('\n') || ''}

RETENTION PROTOCOL:
Maxillary: ${plan.retentionProtocol?.maxillary || ''}
Mandibular: ${plan.retentionProtocol?.mandibular || ''}
Wear: ${plan.retentionProtocol?.wearSchedule || ''}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="pb-3 border-b bg-slate-50/50 flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-bold text-slate-900">
              AI Orthodontic Treatment Plan
            </CardTitle>
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 gap-1">
              <Sparkles className="w-3 h-3" />
              Evidence-Based
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Staged biomechanics, archwire sequences, extraction decisions & literature citations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant={educationMode ? "default" : "outline"}
            className="text-xs h-8 gap-1.5"
            onClick={() => setEducationMode(!educationMode)}
            title="Toggle clinical reasoning & educational explanations"
          >
            <BookOpen className="w-3.5 h-3.5" />
            {educationMode ? 'Education: ON' : 'Education: OFF'}
          </Button>

          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs h-8 gap-1.5 bg-white hover:bg-slate-50 border-slate-300 text-slate-800 font-semibold"
            onClick={handleExportClick}
          >
            <FileDown className="w-3.5 h-3.5 text-blue-600" />
            Export Plan
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Treatment Overview Hero Strip */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-blue-300 font-semibold uppercase tracking-wider">Primary Prescription</span>
            <h3 className="text-base font-bold text-white mt-0.5">
              {plan.treatmentModality?.primary || 'Comprehensive Fixed Appliance'}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">{plan.treatmentModality?.prescription}</p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-center px-3 py-1 bg-white/10 rounded-lg backdrop-blur-sm">
              <span className="text-[10px] text-blue-200 block uppercase">Estimated Time</span>
              <strong className="text-sm font-bold text-white">{plan.estimatedDuration || '22 Mos'}</strong>
            </div>
            <div className="text-center px-3 py-1 bg-white/10 rounded-lg backdrop-blur-sm">
              <span className="text-[10px] text-blue-200 block uppercase">Extraction Plan</span>
              <strong className={`text-sm font-bold ${plan.extractionDecision?.decision === 'Extraction' ? 'text-amber-300' : 'text-emerald-300'}`}>
                {plan.extractionDecision?.decision || 'Non-Extraction'}
              </strong>
            </div>
          </div>
        </div>

        {/* Educational Clinical Reasoning Box (Toggleable) */}
        {educationMode && plan.aiReasoning && (
          <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-indigo-900">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>Clinical Rationale & Biomechanical Logic (Education Mode)</span>
            </div>
            <p className="text-indigo-950 leading-relaxed text-[11px]">{plan.aiReasoning}</p>
          </div>
        )}

        {/* Diagnosis & Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border bg-slate-50 space-y-1.5">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              Diagnostic Summary
            </h4>
            <div className="text-xs space-y-1 text-slate-700">
              <div><strong className="text-slate-900">Skeletal:</strong> {plan.diagnosisSummary?.skeletal}</div>
              <div><strong className="text-slate-900">Dental:</strong> {plan.diagnosisSummary?.dental}</div>
              <div><strong className="text-slate-900">Soft Tissue:</strong> {plan.diagnosisSummary?.softTissue}</div>
            </div>
          </div>

          <div className="p-3 rounded-lg border bg-slate-50 space-y-1.5">
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

        {/* Extraction Analysis Card */}
        {plan.extractionDecision && (
          <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/60 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Extraction Analysis: {plan.extractionDecision.decision}</span>
              </div>
              {plan.extractionDecision.teeth && (
                <div className="flex gap-1">
                  {plan.extractionDecision.teeth.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded font-semibold text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p className="text-amber-950 text-[11px] leading-relaxed">{plan.extractionDecision.rationale}</p>
            {plan.extractionDecision.boltonAnalysisNote && (
              <p className="text-amber-800 text-[10px] italic border-t border-amber-200 pt-1">
                Bolton Discrepancy: {plan.extractionDecision.boltonAnalysisNote}
              </p>
            )}
          </div>
        )}

        {/* Staged Mechanics Sequence */}
        <div className="border rounded-lg overflow-hidden">
          <div 
            className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-800 flex justify-between items-center cursor-pointer hover:bg-slate-200"
            onClick={() => toggleSection('mechanics')}
          >
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Staged Mechanics & Progression Timeline
            </span>
            {expandedSection === 'mechanics' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>

          {expandedSection === 'mechanics' && (
            <div className="p-3 space-y-3 bg-white divide-y">
              {plan.mechanicsSequence?.map((phase, idx) => (
                <div key={idx} className={`pt-2.5 first:pt-0 space-y-1`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-900">{phase.phase}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium text-[10px]">
                      {phase.duration}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700"><strong>Goals:</strong> {phase.objectives}</div>
                  <div className="text-xs text-slate-600"><strong>Archwires:</strong> <span className="font-medium text-slate-900">{phase.wires}</span></div>
                  {phase.elastics && (
                    <div className="text-xs text-indigo-700"><strong>Elastics:</strong> {phase.elastics}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Archwire Protocol & Elastics Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Wire Sequence */}
          <div className="p-3 rounded-lg border bg-slate-50 space-y-1.5 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Archwire Sequence</h4>
            <ol className="list-decimal pl-4 space-y-0.5 text-slate-700 text-[11px]">
              {plan.wireSequence?.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ol>
          </div>

          {/* Elastics & Anchorage */}
          <div className="p-3 rounded-lg border bg-slate-50 space-y-2 text-xs">
            <div>
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Elastics Protocol</h4>
              <p className="text-slate-700 text-[11px] mt-0.5">
                {plan.elasticProtocol?.type} ({plan.elasticProtocol?.force}), {plan.elasticProtocol?.wearSchedule}.
              </p>
            </div>
            <div className="border-t pt-1.5">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Anchorage Management</h4>
              <p className="text-slate-700 text-[11px] mt-0.5">
                <strong>{plan.anchoragePlan?.type}:</strong> {plan.anchoragePlan?.devices?.join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Retention Protocol */}
        <div className="p-3 rounded-lg border bg-slate-50 text-xs space-y-1">
          <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Retention & Relapse Prevention Protocol
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-700 mt-1">
            <div><strong>Maxillary:</strong> {plan.retentionProtocol?.maxillary}</div>
            <div><strong>Mandibular:</strong> {plan.retentionProtocol?.mandibular}</div>
          </div>
          <p className="text-[10px] text-slate-500 italic mt-1">
            Schedule: {plan.retentionProtocol?.wearSchedule} ({plan.retentionProtocol?.duration})
          </p>
        </div>

        {/* Evidence Citations (Literature Backbone) */}
        <div className="border rounded-lg overflow-hidden">
          <div 
            className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-800 flex justify-between items-center cursor-pointer hover:bg-slate-200"
            onClick={() => toggleSection('citations')}
          >
            <span className="flex items-center gap-2">
              <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
              Orthodontic Literature Evidence & Citations ({plan.evidenceCitations?.length || 0})
            </span>
            {expandedSection === 'citations' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>

          {expandedSection === 'citations' && (
            <div className="p-3 space-y-2 bg-white divide-y text-xs">
              {plan.evidenceCitations?.map((cit, i) => (
                <div key={i} className="pt-2 first:pt-0 space-y-0.5">
                  <div className="font-bold text-slate-900">{cit.title}</div>
                  <div className="text-[11px] text-slate-500">{cit.author} ({cit.year}) — <em>{cit.journal}</em></div>
                  <div className="text-[11px] text-indigo-900 bg-indigo-50/70 p-1.5 rounded mt-1">
                    <strong>Key finding:</strong> {cit.takeaway}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>

    {/* Export / Print Prescription Modal */}
    {showExportModal && (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Official Clinical Document
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">Orthodontic Treatment Plan Prescription</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleCopy} className="text-xs h-8">
                {copied ? '✓ Copied to Clipboard' : 'Copy Text'}
              </Button>
              <Button size="sm" onClick={handlePrint} className="text-xs h-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Print / Save PDF
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowExportModal(false)}>
                ✕
              </Button>
            </div>
          </div>

          {/* Printable Prescription Content */}
          <div className="p-6 bg-slate-50 border rounded-xl space-y-4 text-xs font-sans">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">ODONTO AI SPECIALIZED ORTHODONTICS</h3>
                <p className="text-[11px] text-slate-500">Evidence-Based Clinical Decision Support</p>
              </div>
              <div className="text-right text-[11px] text-slate-600">
                <div>Date: {new Date().toLocaleDateString()}</div>
                <div>Attending: Dr. Osama Kamel</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-lg border">
              <div>
                <strong className="text-slate-900 block uppercase text-[10px]">Primary Prescription</strong>
                <span className="text-blue-700 font-bold text-sm">{plan.treatmentModality?.primary}</span>
                <p className="text-slate-600 mt-0.5">{plan.treatmentModality?.prescription}</p>
              </div>
              <div>
                <strong className="text-slate-900 block uppercase text-[10px]">Extraction Decision</strong>
                <span className={`font-bold text-sm ${plan.extractionDecision?.decision === 'Extraction' ? 'text-amber-800' : 'text-emerald-700'}`}>
                  {plan.extractionDecision?.decision} {plan.extractionDecision?.teeth?.length ? `(${plan.extractionDecision.teeth.join(', ')})` : ''}
                </span>
                <p className="text-slate-600 mt-0.5">Estimated Duration: {plan.estimatedDuration}</p>
              </div>
            </div>

            <div className="space-y-1">
              <strong className="text-slate-900 block uppercase text-[10px]">Diagnostic Summary</strong>
              <p className="text-slate-700"><strong>Skeletal:</strong> {plan.diagnosisSummary?.skeletal}</p>
              <p className="text-slate-700"><strong>Dental:</strong> {plan.diagnosisSummary?.dental}</p>
              <p className="text-slate-700"><strong>Soft Tissue:</strong> {plan.diagnosisSummary?.softTissue}</p>
            </div>

            <div className="space-y-1">
              <strong className="text-slate-900 block uppercase text-[10px]">Staged Mechanics Sequence</strong>
              <div className="space-y-2">
                {plan.mechanicsSequence?.map((m, idx) => (
                  <div key={idx} className="bg-white p-2 rounded border">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{m.phase}</span>
                      <span className="text-slate-500 font-normal">{m.duration}</span>
                    </div>
                    <div className="text-slate-600 mt-0.5">Goals: {m.objectives}</div>
                    <div className="text-blue-700 mt-0.5">Archwires: {m.wires}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <strong className="text-slate-900 block uppercase text-[10px]">Archwire Sequence</strong>
                <ul className="list-disc pl-4 text-slate-700 space-y-0.5 mt-1">
                  {plan.wireSequence?.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong className="text-slate-900 block uppercase text-[10px]">Retention Protocol</strong>
                <p className="text-slate-700 mt-1">Maxillary: {plan.retentionProtocol?.maxillary}</p>
                <p className="text-slate-700">Mandibular: {plan.retentionProtocol?.mandibular}</p>
                <p className="text-slate-500 italic mt-0.5">Schedule: {plan.retentionProtocol?.wearSchedule}</p>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center text-[10px] text-slate-400">
              <span>Verified with Odonto AI Clinical Decision Support Engine</span>
              <span>Orthodontist Signature: _______________________</span>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}