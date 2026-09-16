"use client";

import React, { useState, useEffect } from 'react';
import { PlanBuilder, TreatmentPlanData } from '@/components/clinical/plan-builder';
import { CephViewer } from '@/components/clinical/ceph-viewer';
import { ToothChart } from '@/components/clinical/tooth-chart';
import { PanoramicViewer } from '@/components/clinical/panoramic-viewer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getMockPatients } from '@/lib/db/mock-data';
import { 
  Sparkles, 
  UserCheck, 
  Stethoscope, 
  Sliders, 
  RefreshCw, 
  CheckCircle2, 
  Edit3, 
  UserPlus, 
  SlidersHorizontal 
} from 'lucide-react';

export default function GeneratePlanPage() {
  const patients = getMockPatients();
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id);
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Custom patient input state
  const [customPatient, setCustomPatient] = useState({
    name: 'Dr. Osama Custom Patient',
    age: 16,
    gender: 'female',
    chiefComplaint: 'Severe underbite and crowded lower teeth',
    angleClass: 'Class III',
    overjet: -3.5,
    overbite: 1.0,
    crowdingUpper: 'moderate'
  });

  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'expert'>('beginner');
  const [modality, setModality] = useState<'fixed_mbt' | 'aligners' | 'functional' | 'surgical'>('fixed_mbt');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [generatedPlan, setGeneratedPlan] = useState<TreatmentPlanData | undefined>(undefined);

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Derive Ceph preset case from patient Angle Class
  const currentAngle = isCustomMode ? customPatient.angleClass : (activePatient.clinicalRecords[0]?.angleClass || 'Class II');
  const currentOverjet = isCustomMode ? customPatient.overjet : ((activePatient.clinicalRecords[0] as any)?.overjet ?? 2);

  const cephPresetCase: 'class1' | 'class2' | 'class3' = 
    currentAngle.toLowerCase().includes('iii') || currentOverjet < 0
      ? 'class3'
      : currentAngle.toLowerCase().includes('ii') || currentOverjet > 4
      ? 'class2'
      : 'class1';

  // Auto-generate initial plan when patient changes
  useEffect(() => {
    handleGenerate(false);
  }, [selectedPatientId, isCustomMode, modality, experienceLevel]);

  const handleGenerate = async (showPipelineAnimation: boolean = true) => {
    setIsGenerating(true);
    setCurrentStep(1);

    // Smooth visual progression through all 7 layers
    if (showPipelineAnimation) {
      for (let i = 2; i <= 7; i++) {
        setTimeout(() => setCurrentStep(i), (i - 1) * 350);
      }
    }

    try {
      const payload = isCustomMode ? {
        patientData: {
          name: customPatient.name,
          age: customPatient.age,
          gender: customPatient.gender,
          chiefComplaint: customPatient.chiefComplaint,
          clinicalFindings: {
            angleClass: customPatient.angleClass,
            overjet: customPatient.overjet,
            overbite: customPatient.overbite,
            crowdingUpper: customPatient.crowdingUpper
          }
        },
        clinicalFindings: {
          angleClass: customPatient.angleClass,
          overjet: customPatient.overjet,
          overbite: customPatient.overbite,
          crowdingUpper: customPatient.crowdingUpper
        },
        experienceLevel,
        modality
      } : {
        patientData: {
          name: `${activePatient.firstName} ${activePatient.lastName}`,
          age: 14,
          gender: activePatient.gender,
          chiefComplaint: activePatient.chiefComplaint,
          clinicalFindings: activePatient.clinicalRecords[0]
        },
        clinicalFindings: activePatient.clinicalRecords[0],
        experienceLevel,
        modality
      };

      const response = await fetch('/api/ai/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const waitTime = showPipelineAnimation ? 2400 : 150;
        setTimeout(() => {
          setGeneratedPlan(resData.data);
          setIsGenerating(false);
          setCurrentStep(0);
        }, waitTime);
      } else {
        setIsGenerating(false);
        setCurrentStep(0);
      }
    } catch (err) {
      console.error('Plan generation error:', err);
      setIsGenerating(false);
      setCurrentStep(0);
    }
  };

  const layersStatus = [
    { num: 1, name: 'Ceph Tracing', detail: 'Skeletal ANB/Wits' },
    { num: 2, name: 'Panoramic OPG', detail: 'FDI Segmentation' },
    { num: 3, name: 'Pathology AI', detail: 'Pre-Ortho Clearance' },
    { num: 4, name: '3D Arch Space', detail: 'Bolton & Perimeter' },
    { num: 5, name: 'CBCT Boundary', detail: 'Cortical Limits' },
    { num: 6, name: 'Clinical CoT', detail: 'Orthodontic Logic' },
    { num: 7, name: 'Plan Synthesis', detail: 'Staged Biomechanics' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Treatment Planning Studio</h1>
            <Badge className="bg-blue-100 text-blue-800 border-none font-semibold">
              7-Layer AI Pipeline
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Synthesizing evidence-based biomechanics, archwire progressions, and extraction protocols
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={() => handleGenerate(true)} 
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 shadow-md shadow-blue-500/20 px-5 transition-all"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Processing Layer {currentStep || 1} of 7...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Synthesize Plan with AI</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 7-Layer Progress Pipeline Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {layersStatus.map((l) => {
          const isCurrent = isGenerating && currentStep === l.num;
          const isPassed = isGenerating && currentStep > l.num;
          const isDone = !isGenerating && generatedPlan !== undefined;

          return (
            <div 
              key={l.num} 
              className={`p-2.5 rounded-lg border text-center transition-all ${
                isCurrent 
                  ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300 scale-105 shadow-sm' 
                  : isPassed || isDone
                  ? 'bg-emerald-50/70 border-emerald-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                <span>Layer {l.num}</span>
                {isPassed || isDone ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                ) : isCurrent ? (
                  <RefreshCw className="w-3 h-3 text-blue-600 animate-spin" />
                ) : null}
              </div>
              <div className="text-xs font-bold text-slate-800 truncate">{l.name}</div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">{l.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Patient Mode Selector & Configuration Strip */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-2 border-b bg-slate-50/50 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Clinical Case Input</span>
            <span className="text-[11px] text-slate-500">— Test with preset patients or enter custom numbers</span>
          </div>

          {/* Preset vs Custom Mode Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200 rounded-lg text-xs">
            <button
              onClick={() => setIsCustomMode(false)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                !isCustomMode ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Preset Cases
            </button>
            <button
              onClick={() => setIsCustomMode(true)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                isCustomMode ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Custom Patient Form
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {!isCustomMode ? (
            /* Mode A: Preset Patients Selector */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                  Select Patient Case
                </label>
                <select 
                  value={selectedPatientId} 
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.firstName} {p.lastName} — {p.chiefComplaint} ({p.clinicalRecords[0]?.angleClass || 'Class I'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
                  Clinician Experience Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setExperienceLevel('beginner')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                      experienceLevel === 'beginner' 
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Fresh Graduate (Rationale)
                  </button>
                  <button
                    type="button"
                    onClick={() => setExperienceLevel('expert')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                      experienceLevel === 'expert' 
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Specialist (Concise)
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-teal-600" />
                  Target Modality Preference
                </label>
                <select 
                  value={modality} 
                  onChange={(e) => setModality(e.target.value as any)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800"
                >
                  <option value="fixed_mbt">Fixed MBT 0.022" Appliance (Standard)</option>
                  <option value="aligners">Clear Aligner Therapy (Staged Protocol)</option>
                  <option value="functional">Functional Appliance (Twin Block / Herbst)</option>
                  <option value="surgical">Combined Orthognathic Surgery</option>
                </select>
              </div>
            </div>
          ) : (
            /* Mode B: Custom Patient Clinical Findings Form */
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Patient Name</label>
                  <input
                    type="text"
                    value={customPatient.name}
                    onChange={(e) => setCustomPatient({ ...customPatient, name: e.target.value })}
                    className="w-full border rounded-lg p-2 bg-slate-50 font-medium"
                    placeholder="Patient full name"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Age & Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={customPatient.age}
                      onChange={(e) => setCustomPatient({ ...customPatient, age: Number(e.target.value) })}
                      className="border rounded-lg p-2 bg-slate-50 font-medium"
                      placeholder="Age"
                    />
                    <select
                      value={customPatient.gender}
                      onChange={(e) => setCustomPatient({ ...customPatient, gender: e.target.value })}
                      className="border rounded-lg p-2 bg-slate-50 font-medium"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Angle Classification</label>
                  <select
                    value={customPatient.angleClass}
                    onChange={(e) => setCustomPatient({ ...customPatient, angleClass: e.target.value })}
                    className="w-full border rounded-lg p-2 bg-slate-50 font-medium"
                  >
                    <option value="Class I">Class I Malocclusion</option>
                    <option value="Class II div 1">Class II Division 1 (Severe Overjet)</option>
                    <option value="Class II div 2">Class II Division 2 (Deep Bite)</option>
                    <option value="Class III">Class III (Underbite / Crossbite)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Chief Complaint</label>
                  <input
                    type="text"
                    value={customPatient.chiefComplaint}
                    onChange={(e) => setCustomPatient({ ...customPatient, chiefComplaint: e.target.value })}
                    className="w-full border rounded-lg p-2 bg-slate-50 font-medium"
                    placeholder="Patient chief complaint"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-lg border">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Overjet (mm) <span className="text-slate-400 font-normal">(- for underbite, + for protrusion)</span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={customPatient.overjet}
                    onChange={(e) => setCustomPatient({ ...customPatient, overjet: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 bg-white font-bold text-blue-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Overbite (mm) <span className="text-slate-400 font-normal">(- for open bite, + for deep bite)</span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={customPatient.overbite}
                    onChange={(e) => setCustomPatient({ ...customPatient, overbite: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 bg-white font-bold text-blue-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Arch Crowding</label>
                  <select
                    value={customPatient.crowdingUpper}
                    onChange={(e) => setCustomPatient({ ...customPatient, crowdingUpper: e.target.value })}
                    className="w-full border rounded-lg p-2 bg-white font-medium"
                  >
                    <option value="none">None / Spaced</option>
                    <option value="mild">Mild (1–3mm)</option>
                    <option value="moderate">Moderate (4–6mm)</option>
                    <option value="severe">Severe (7mm+)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Studio Grid: Diagnostic Imaging vs Plan Output */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column: Clinical & Radiographic Findings */}
        <div className="space-y-6">
          <CephViewer presetCase={cephPresetCase} />
          <ToothChart />
          <PanoramicViewer />
        </div>

        {/* Right Column: AI Treatment Plan Output */}
        <div className="space-y-6">
          <PlanBuilder plan={generatedPlan} isGenerating={isGenerating} />
        </div>
      </div>
    </div>
  );
}