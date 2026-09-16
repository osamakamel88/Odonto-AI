"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PlanBuilder, TreatmentPlanData } from '@/components/clinical/plan-builder';
import { CephViewer } from '@/components/clinical/ceph-viewer';
import { ToothChart } from '@/components/clinical/tooth-chart';
import { PanoramicViewer } from '@/components/clinical/panoramic-viewer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getStoredPatients, StoredPatient } from '@/lib/patients-store';
import { 
  Sparkles, 
  UserCheck, 
  Stethoscope, 
  Sliders, 
  RefreshCw, 
  CheckCircle2, 
  Edit3, 
  UserPlus, 
  SlidersHorizontal,
  Plus,
  Zap,
  HelpCircle,
  X,
  ChevronRight,
  ChevronLeft,
  Info,
  Layers
} from 'lucide-react';
import Link from 'next/link';

function GeneratePlanContent() {
  const searchParams = useSearchParams();
  const urlPatientId = searchParams.get('patientId');

  const [patients, setPatients] = useState<StoredPatient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  // 3-Step Interactive Tour State
  const [showTour, setShowTour] = useState<boolean>(true);
  const [tourStep, setTourStep] = useState<number>(1);

  // Custom patient input state matching user test case
  const [customPatient, setCustomPatient] = useState({
    name: 'John Doe',
    age: 15,
    gender: 'male',
    chiefComplaint: 'Severe underbite and lower teeth in front of upper teeth',
    angleClass: 'Class III',
    overjet: -4.0,
    overbite: 1.0,
    crowdingUpper: 'moderate',
    impa: 86
  });

  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'expert'>('beginner');
  const [modality, setModality] = useState<'fixed_mbt' | 'aligners' | 'functional' | 'surgical'>('fixed_mbt');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [generatedPlan, setGeneratedPlan] = useState<TreatmentPlanData | undefined>(undefined);

  // Load patients from storage on mount
  useEffect(() => {
    const list = getStoredPatients();
    setPatients(list);
    if (urlPatientId && list.some(p => p.id === urlPatientId)) {
      setSelectedPatientId(urlPatientId);
      setIsCustomMode(false);
    } else if (list.length > 0) {
      setSelectedPatientId(list[0].id);
    }
  }, [urlPatientId]);

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Derive Ceph preset case from patient Angle Class
  const currentAngle = isCustomMode 
    ? customPatient.angleClass 
    : (activePatient?.clinicalRecords?.[0]?.angleClass || 'Class II');
  const currentOverjet = isCustomMode 
    ? customPatient.overjet 
    : ((activePatient?.clinicalRecords?.[0] as any)?.overjet ?? 2);

  const cephPresetCase: 'class1' | 'class2' | 'class3' = 
    currentAngle.toLowerCase().includes('iii') || currentOverjet < 0
      ? 'class3'
      : currentAngle.toLowerCase().includes('ii') || currentOverjet > 4
      ? 'class2'
      : 'class1';

  // Auto-generate initial plan when patient changes
  useEffect(() => {
    if (activePatient || isCustomMode) {
      handleGenerate(false);
    }
  }, [selectedPatientId, isCustomMode, modality, experienceLevel]);

  const applyCustomPreset = (preset: 'class3' | 'class2' | 'bimax' | 'openbite') => {
    setIsCustomMode(true);
    if (preset === 'class3') {
      setCustomPatient({
        name: 'John Doe',
        age: 15,
        gender: 'male',
        chiefComplaint: 'Severe underbite and lower teeth in front of upper teeth',
        angleClass: 'Class III',
        overjet: -4.0,
        overbite: 1.0,
        crowdingUpper: 'moderate',
        impa: 86
      });
    } else if (preset === 'class2') {
      setCustomPatient({
        name: 'Sarah Severe Class II',
        age: 14,
        gender: 'female',
        chiefComplaint: 'Severe overjet, upper teeth stick out significantly',
        angleClass: 'Class II div 1',
        overjet: 8.5,
        overbite: 5.0,
        crowdingUpper: 'severe',
        impa: 102
      });
    } else if (preset === 'bimax') {
      setCustomPatient({
        name: 'Adam Bimaxillary Case',
        age: 22,
        gender: 'male',
        chiefComplaint: 'Protruding lips and crowded teeth',
        angleClass: 'Class I',
        overjet: 6.0,
        overbite: 3.0,
        crowdingUpper: 'severe',
        impa: 104
      });
    } else if (preset === 'openbite') {
      setCustomPatient({
        name: 'Elena Open Bite',
        age: 18,
        gender: 'female',
        chiefComplaint: 'Front teeth do not touch when biting',
        angleClass: 'Class I',
        overjet: 2.5,
        overbite: -4.5,
        crowdingUpper: 'mild',
        impa: 96
      });
    }
  };

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
          name: activePatient ? `${activePatient.firstName} ${activePatient.lastName}` : 'Patient',
          age: activePatient?.age || 15,
          gender: activePatient?.gender || 'male',
          chiefComplaint: activePatient?.chiefComplaint || 'Orthodontic checkup',
          clinicalFindings: activePatient?.clinicalRecords?.[0]
        },
        clinicalFindings: activePatient?.clinicalRecords?.[0],
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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
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

        <div className="flex flex-wrap items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setShowTour(!showTour)} 
            className="text-xs font-semibold gap-1.5 border-blue-200 text-blue-700 bg-blue-50/60 hover:bg-blue-100 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            {showTour ? 'Hide 3-Step Guide' : '💡 3-Step Quick Guide'}
          </Button>

          <Link href="/patients/new">
            <Button variant="outline" className="text-xs font-semibold gap-1.5 border-slate-300 cursor-pointer">
              <Plus className="w-3.5 h-3.5 text-blue-600" /> New Patient Intake
            </Button>
          </Link>

          <Button 
            onClick={() => handleGenerate(true)} 
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 shadow-md shadow-blue-500/20 px-5 transition-all cursor-pointer"
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

      {/* Interactive Skippable 3-Step Brief Guide */}
      {showTour && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 shadow-xl border border-blue-700/80 animate-in fade-in slide-in-from-top-3">
          {/* Header row of Tour */}
          <div className="flex items-center justify-between border-b border-blue-800/80 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-amber-400/20 text-amber-300 rounded-md font-bold text-xs flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Quick Start
              </span>
              <span className="text-sm font-bold text-white tracking-wide">How to Generate an Orthodontic Treatment Plan</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Step indicator dots */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((stepNum) => (
                  <button
                    key={stepNum}
                    onClick={() => setTourStep(stepNum)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      tourStep === stepNum ? 'w-6 bg-amber-400' : 'w-2 bg-blue-700 hover:bg-blue-600'
                    }`}
                    title={`Go to Step ${stepNum}`}
                  />
                ))}
              </div>

              <span className="text-xs text-blue-300 font-semibold">Step {tourStep} of 3</span>

              <button 
                onClick={() => setShowTour(false)}
                className="text-blue-300 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                title="Skip and close guide"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tour Step Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Description Column */}
            <div className="md:col-span-8 space-y-3">
              {tourStep === 1 && (
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-xs font-semibold mb-2">
                    <UserCheck className="w-3.5 h-3.5" /> Step 1: Select Case or Enter Custom Patient
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Choose an existing clinical case or enter custom measurements
                  </h3>
                  <p className="text-xs text-blue-200/90 leading-relaxed mt-1">
                    Select from 8 pre-validated patient records (Emma Johnson, Lucas Brown) or click 
                    <strong className="text-amber-300"> "Custom Patient Form"</strong> to input your patient's exact 
                    <strong> Overjet</strong> (- for underbites, + for severe protrusion), <strong>Overbite</strong>, and <strong>Arch Crowding</strong> in millimeters.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-[11px] text-blue-300">Quick Test:</span>
                    <button
                      type="button"
                      onClick={() => applyCustomPreset('class3')}
                      className="px-2.5 py-1 text-xs font-semibold bg-blue-800 hover:bg-blue-700 text-white rounded-md border border-blue-600 cursor-pointer"
                    >
                      Load Class III Underbite (-4mm)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyCustomPreset('class2')}
                      className="px-2.5 py-1 text-xs font-semibold bg-blue-800 hover:bg-blue-700 text-white rounded-md border border-blue-600 cursor-pointer"
                    >
                      Load Class II Severe Overjet (+8.5mm)
                    </button>
                  </div>
                </div>
              )}

              {tourStep === 2 && (
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold mb-2">
                    <Sliders className="w-3.5 h-3.5" /> Step 2: Set Modality & Clinician Level
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Choose appliance system and explanation depth
                  </h3>
                  <p className="text-xs text-blue-200/90 leading-relaxed mt-1">
                    Select your preferred treatment appliance: <strong>Fixed MBT 0.022" Appliances</strong>, <strong>Clear Aligners</strong>, <strong>Functional Orthopedics</strong>, or <strong>Orthognathic Surgery</strong>. Toggle <strong>"Fresh Graduate"</strong> for comprehensive biomechanical chain-of-thought rationale, or <strong>"Specialist"</strong> for concise clinical staging.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-[11px] text-blue-300">Target Modality:</span>
                    <span className="px-2 py-0.5 bg-indigo-800/80 rounded text-xs text-indigo-200 border border-indigo-600 font-medium">
                      Fixed MBT / Aligners / Functional
                    </span>
                  </div>
                </div>
              )}

              {tourStep === 3 && (
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-semibold mb-2">
                    <Layers className="w-3.5 h-3.5" /> Step 3: Run the 7-Layer AI Pipeline
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Synthesize plan and inspect staged mechanics
                  </h3>
                  <p className="text-xs text-blue-200/90 leading-relaxed mt-1">
                    Click the blue <strong className="text-white">"Synthesize Plan with AI"</strong> button. The engine evaluates Ceph angles (ANB/Wits), FDI tooth chart, pre-ortho disease clearance, and cortical limits. It outputs an exact extraction rationale, archwire progression, elastic wear schedule, and literature citations.
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-emerald-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Every recommendation mathematically correlates with your input numbers.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Action Navigation Column */}
            <div className="md:col-span-4 flex flex-col items-end justify-center gap-3 border-t md:border-t-0 md:border-l border-blue-800/80 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2 w-full justify-end">
                {tourStep > 1 && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setTourStep(tourStep - 1)}
                    className="text-xs bg-transparent border-blue-700 text-blue-200 hover:bg-white/10 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Prev
                  </Button>
                )}

                {tourStep < 3 ? (
                  <Button 
                    size="sm"
                    onClick={() => setTourStep(tourStep + 1)}
                    className="text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-1 cursor-pointer"
                  >
                    Next Step <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                ) : (
                  <Button 
                    size="sm"
                    onClick={() => {
                      setShowTour(false);
                      handleGenerate(true);
                    }}
                    className="text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold gap-1 cursor-pointer shadow-md"
                  >
                    Synthesize Plan Now 🚀
                  </Button>
                )}
              </div>

              <button 
                onClick={() => setShowTour(false)}
                className="text-[11px] text-blue-300 hover:text-white underline cursor-pointer"
              >
                Skip Tour & Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

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
              className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                !isCustomMode ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Select Patient Case
            </button>
            <button
              onClick={() => setIsCustomMode(true)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
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
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    Patient Record
                  </span>
                  <Link href="/patients/new" className="text-[11px] text-blue-600 hover:underline flex items-center gap-0.5">
                    <Plus className="w-3 h-3" /> Add New
                  </Link>
                </label>
                <select 
                  value={selectedPatientId} 
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.firstName} {p.lastName} — {p.chiefComplaint} ({p.clinicalRecords?.[0]?.angleClass || 'Class I'})
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
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
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
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
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
              {/* Quick Preset Buttons in Custom Form */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-blue-50/70 rounded-lg border border-blue-200">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Load Preset Numbers:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyCustomPreset('class3')}
                    className="px-2.5 py-1 text-xs font-semibold bg-white text-blue-700 border border-blue-300 rounded-md hover:bg-blue-100 transition-all cursor-pointer shadow-xs"
                  >
                    Class III Underbite (-4mm)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCustomPreset('class2')}
                    className="px-2.5 py-1 text-xs font-semibold bg-white text-blue-700 border border-blue-300 rounded-md hover:bg-blue-100 transition-all cursor-pointer shadow-xs"
                  >
                    Severe Class II (+8.5mm Overjet)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCustomPreset('bimax')}
                    className="px-2.5 py-1 text-xs font-semibold bg-white text-blue-700 border border-blue-300 rounded-md hover:bg-blue-100 transition-all cursor-pointer shadow-xs"
                  >
                    Bimaxillary Protrusion (+6mm)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCustomPreset('openbite')}
                    className="px-2.5 py-1 text-xs font-semibold bg-white text-blue-700 border border-blue-300 rounded-md hover:bg-blue-100 transition-all cursor-pointer shadow-xs"
                  >
                    Open Bite (-4.5mm)
                  </button>
                </div>
              </div>

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
                      <option value="male">Male</option>
                      <option value="female">Female</option>
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

export default function GeneratePlanPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Treatment Planning Studio...</div>}>
      <GeneratePlanContent />
    </Suspense>
  );
}