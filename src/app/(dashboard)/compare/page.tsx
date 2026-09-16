"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Scale, 
  ShieldAlert, 
  Smile, 
  Sliders,
  ChevronRight
} from 'lucide-react';

interface TreatmentOptionComparison {
  id: string;
  name: string;
  category: string;
  duration: string;
  complianceLevel: 'Low' | 'Moderate' | 'High';
  profileImpact: string;
  relapseRisk: 'Low' | 'Moderate' | 'High';
  estimatedCost: string;
  complexity: number; // 1-5
  evidenceGrade: 'A (High RCT)' | 'B (Systematic Review)' | 'C (Expert Consensus)';
  pros: string[];
  cons: string[];
  idealPatient: string;
}

const COMPARISON_PRESETS: Record<string, { title: string; subtitle: string; options: TreatmentOptionComparison[] }> = {
  class2_adult: {
    title: 'Adult Skeletal Class II Div 1 with 8mm Overjet',
    subtitle: 'Evaluate Extraction Camouflage vs Non-Extraction Distalization vs Orthognathic Surgery',
    options: [
      {
        id: 'opt1',
        name: 'Option 1: Maxillary 1st Premolar Extractions (14, 24)',
        category: 'Fixed Camouflage Orthodontics (MBT 0.022")',
        duration: '20–24 Months',
        complianceLevel: 'Moderate',
        profileImpact: 'Significant lip profile balance, eliminates lip incompetence and lip trap',
        relapseRisk: 'Low',
        estimatedCost: 'Standard ($4,500 - $5,500)',
        complexity: 3,
        evidenceGrade: 'A (High RCT)',
        pros: [
          'Direct space closure achieves complete 6mm overjet reduction',
          'Does not depend on patient growth (ideal for adults)',
          'Preserves lower incisors within bone boundary',
          'Highly predictable torque control with rectangular wires'
        ],
        cons: [
          'Loss of two virgin permanent premolars',
          'Requires maximum anchorage (TPA or TADs)',
          'Slight risk of dark triangles in elderly patients'
        ],
        idealPatient: 'Adult with retrognathic mandible, severe overjet, and incompetent lips wanting non-surgical correction.'
      },
      {
        id: 'opt2',
        name: 'Option 2: Non-Extraction with TAD Maxillary Distalization & Aligners',
        category: 'Clear Aligners + Skeletal Anchorage (TADs)',
        duration: '24–28 Months',
        complianceLevel: 'High',
        profileImpact: 'Mild soft tissue improvement, limited lip retraction',
        relapseRisk: 'Moderate',
        estimatedCost: 'Premium ($6,500 - $7,500)',
        complexity: 4,
        evidenceGrade: 'B (Systematic Review)',
        pros: [
          'Avoids extracting healthy premolars',
          'High aesthetics and hygiene during treatment',
          'TADs prevent anchorage loss',
          'Patient preference for removable aligners'
        ],
        cons: [
          'Severe compliance requirement (22 hrs/day)',
          'Distalization limited by anatomical retro-molar room',
          'Increased duration compared to premolar extraction',
          'TAD failure risk (10-15%)'
        ],
        idealPatient: 'Aesthetically conscious adult with mild crowding, willing to wear aligners 22h/day, refusing extractions.'
      },
      {
        id: 'opt3',
        name: 'Option 3: Combined Surgical-Orthodontic BSSO Mandibular Advancement',
        category: 'Orthognathic Surgery + Fixed Decompensation',
        duration: '18–22 Months',
        complianceLevel: 'Low',
        profileImpact: 'Dramatic profile transformation, optimal chin projection and airway volume',
        relapseRisk: 'Low',
        estimatedCost: 'Hospital / Surgical ($15,000+)',
        complexity: 5,
        evidenceGrade: 'A (High RCT)',
        pros: [
          'Normalizes underlying skeletal base discrepancy (ANB from 6° to 2°)',
          'Significantly expands pharyngeal airway volume',
          'Ideal facial aesthetics and chin prominence',
          'Non-extraction dental mechanics'
        ],
        cons: [
          'General anesthesia and hospital surgical risks',
          'Neurosensory paresthesia of inferior alveolar nerve risk',
          'High financial commitment',
          'Temporary worsening of facial profile during pre-surgical decompensation'
        ],
        idealPatient: 'Adult with severe mandibular retrognathia, obstructive sleep apnea signs, seeking optimal facial aesthetics.'
      }
    ]
  },
  class1_crowding: {
    title: 'Severe Class I Bimaxillary Crowding (8mm Upper / 7mm Lower)',
    subtitle: 'Extraction of Four First Premolars vs Non-Extraction Arch Expansion with IPR',
    options: [
      {
        id: 'c1_opt1',
        name: 'Option A: Four First Premolars Extraction (14, 24, 34, 44)',
        category: 'Fixed MBT Appliances',
        duration: '18–22 Months',
        complianceLevel: 'Low',
        profileImpact: 'Relieves lip strain and bimaxillary protrusion',
        relapseRisk: 'Low',
        estimatedCost: 'Standard ($4,500)',
        complexity: 3,
        evidenceGrade: 'A (High RCT)',
        pros: [
          'Sufficient space to resolve 8mm crowding without proclining incisors',
          'Maintains incisor roots centered inside cortical plates',
          'Reduces gingival recession risk'
        ],
        cons: [
          'Irreversible tooth loss',
          'Careful space closure mechanics needed to prevent bite deepening'
        ],
        idealPatient: 'Patients with thin periodontal biotype and severe crowding where expansion causes recession.'
      },
      {
        id: 'c1_opt2',
        name: 'Option B: Non-Extraction with Rapid Palatal Expansion & IPR',
        category: 'Skeletal Expansion + Clear Aligners',
        duration: '22–26 Months',
        complianceLevel: 'Moderate',
        profileImpact: 'Broad smile arc, slight incisal advancement',
        relapseRisk: 'Moderate',
        estimatedCost: 'Moderate ($5,500)',
        complexity: 3,
        evidenceGrade: 'B (Systematic Review)',
        pros: [
          'All permanent teeth preserved',
          'Broadens smile corridor and bucco-lingual dimension'
        ],
        cons: [
          'Enamel reduction (IPR) across multiple interproximal sites',
          'Potential for lower incisor labial proclination beyond symphysis'
        ],
        idealPatient: 'Patients with transverse constriction, thick periodontal biotype, and mild profile retrusion.'
      }
    ]
  }
};

export default function CompareTreatmentsPage() {
  const [selectedCaseKey, setSelectedCaseKey] = useState<string>('class2_adult');
  const activeCase = COMPARISON_PRESETS[selectedCaseKey];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Treatment Plan Comparison Studio</h1>
            <Badge className="bg-indigo-100 text-indigo-800 border-none font-semibold">
              Trade-Off Analytics
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Evaluate alternative orthodontic mechanics, risk profiles, duration, and patient suitability side-by-side
          </p>
        </div>

        {/* Case Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">Case Scenario:</span>
          <select 
            value={selectedCaseKey} 
            onChange={(e) => setSelectedCaseKey(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800"
          >
            <option value="class2_adult">Adult Class II Overjet (Extraction vs Aligners vs Surgery)</option>
            <option value="class1_crowding">Severe Crowding (Four Premolars vs Expansion/IPR)</option>
          </select>
        </div>
      </div>

      {/* Case Header Banner */}
      <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">{activeCase.title}</h2>
          <p className="text-xs text-slate-300 mt-0.5">{activeCase.subtitle}</p>
        </div>
        <Badge variant="outline" className="text-slate-300 border-slate-700 text-xs">
          Comparing {activeCase.options.length} Modalities
        </Badge>
      </div>

      {/* Side by Side Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-${activeCase.options.length} gap-6`}>
        {activeCase.options.map((opt, idx) => (
          <Card key={opt.id} className="border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <CardHeader className="pb-3 border-b bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {opt.category}
                </span>
                <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
              </div>
              <CardTitle className="text-base font-bold text-slate-900 mt-2">
                {opt.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-4 flex-1 flex flex-col justify-between text-xs">
              {/* Core Metrics Strip */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Duration</span>
                  <strong className="text-slate-800 text-xs">{opt.duration}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Compliance</span>
                  <strong className={`text-xs ${
                    opt.complianceLevel === 'High' ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {opt.complianceLevel}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Relapse Risk</span>
                  <strong className={`text-xs ${
                    opt.relapseRisk === 'Low' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {opt.relapseRisk}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cost Level</span>
                  <strong className="text-slate-800 text-xs">{opt.estimatedCost.split(' ')[0]}</strong>
                </div>
              </div>

              {/* Profile Impact */}
              <div className="space-y-1">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <Smile className="w-3 h-3 text-indigo-500" />
                  Facial Soft Tissue Impact:
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed bg-indigo-50/50 p-2 rounded border border-indigo-100">
                  {opt.profileImpact}
                </p>
              </div>

              {/* Pros */}
              <div className="space-y-1.5">
                <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Clinical Advantages:
                </span>
                <ul className="space-y-1 pl-4 list-disc text-[11px] text-emerald-950">
                  {opt.pros.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="space-y-1.5">
                <span className="font-bold text-rose-800 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <XCircle className="w-3 h-3 text-rose-600" />
                  Drawbacks & Biological Costs:
                </span>
                <ul className="space-y-1 pl-4 list-disc text-[11px] text-rose-950">
                  {opt.cons.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Ideal Patient Profile */}
              <div className="border-t pt-2 space-y-1 text-[11px]">
                <strong className="text-slate-900 block text-[10px] uppercase tracking-wider">Target Patient:</strong>
                <p className="text-slate-600 italic">{opt.idealPatient}</p>
              </div>

              <div className="pt-2">
                <Button className="w-full text-xs font-semibold h-8 bg-slate-900 hover:bg-blue-600 text-white gap-1.5">
                  <span>Adopt This Modality</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
