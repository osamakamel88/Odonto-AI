"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PlanBuilder, TreatmentPlanData } from '@/components/clinical/plan-builder';
import { CephViewer } from '@/components/clinical/ceph-viewer';
import { ToothChart } from '@/components/clinical/tooth-chart';
import { PanoramicViewer } from '@/components/clinical/panoramic-viewer';
import { BoltonAnalysisCard } from '@/components/clinical/bolton-analysis-card';
import { Dental3DViewer } from '@/components/clinical/dental-3d-viewer';
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
  Layers,
  Ruler,
  Scan,
  Maximize2,
  Box
} from 'lucide-react';
import Link from 'next/link';
import { OnboardingTour } from '@/components/clinical/onboarding-tour';

function GeneratePlanContent() {
  const searchParams = useSearchParams();
  const urlPatientId = searchParams.get('patientId');

  const [patients, setPatients] = useState<StoredPatient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [activeDiagnosticTab, setActiveDiagnosticTab] = useState<'ceph' | 'odontogram' | 'panoramic' | 'bolton' | 'model3d'>('ceph');

  // Interactive Onboarding Tour State
  const [showTour, setShowTour] = useState<boolean>(false);

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

  // Auto-launch interactive onboarding tour on first visit if not completed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem('odonto_onboarding_completed');
      if (!completed) {
        const timer = setTimeout(() => {
          setShowTour(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Derive Ceph preset case from patient Angle Class
  const currentAngle = isCustomMode 
    ? customPatient.angleClass 
    : (activePatient?.clinicalRecords?.[0]?.angleClass || 'Class II');
  const currentOverjet = isCustomMode 
    ? customPatient.overjet 
    : ((activePatient?.clinicalRecords?.[0] as any)?.overjet ?? 2);
  const currentOverbite = isCustomMode 
    ? customPatient.overbite 
    : ((activePatient?.clinicalRecords?.[0] as any)?.overbite ?? 2);
  const currentCrowding = isCustomMode 
    ? customPatient.crowdingUpper 
    : ((activePatient?.clinicalRecords?.[0] as any)?.crowdingUpper || 'moderate');

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Treatment Planning Studio</h1>
            <Badge className="bg-blue-100 text-blue-800 border-none font-semibold text-xs">
              7-Layer AI Pipeline
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Synthesizing evidence-based biomechanics, archwire progressions, and extraction protocols
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowTour(true)} 
            className="flex-1 sm:flex-initial text-xs font-bold gap-1.5 border-blue-300 text-blue-700 bg-blue-50/80 hover:bg-blue-100 cursor-pointer shadow-2xs"
            title="جولة تعريفية تفاعلية لتوضيح خطوات الاستخدام"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            جولة تعريفية (Tour)
          </Button>

          <Link href="/patients/new" className="flex-1 sm:flex-initial">
            <Button variant="outline" size="sm" className="w-full text-xs font-semibold gap-1.5 border-slate-300 cursor-pointer">
              <Plus className="w-3.5 h-3.5 text-blue-600" /> Intake
            </Button>
          </Link>

          <Button 
            id="tour-generate-btn"
            size="sm"
            onClick={() => handleGenerate(true)} 
            disabled={isGenerating}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 shadow-md shadow-blue-500/20 px-4 h-9 transition-all cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                <span>Layer {currentStep || 1} of 7...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Synthesize Plan with AI</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Active Interactive Skippable Onboarding Tour */}
      <OnboardingTour 
        isOpen={showTour} 
        onClose={() => setShowTour(false)}
        onFinish={() => {
          handleGenerate(true);
        }}
      />

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
      <Card id="tour-patient-section" className="shadow-sm border-slate-200">
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
            <div>
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

                <div id="tour-modality-level" className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              {/* Clinical Baseline strip in Mode A */}
              <div id="tour-clinical-measurements" className="mt-3.5 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-blue-600" />
                    Clinical Baseline:
                  </span>
                  <Badge variant="outline" className="bg-white text-blue-800 border-blue-200 font-bold px-2 py-0.5 shadow-2xs">
                    {currentAngle}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-slate-700">
                  <span>Overjet: <strong className="text-slate-900 font-mono">{currentOverjet > 0 ? `+${currentOverjet}` : currentOverjet} mm</strong></span>
                  <span>Overbite: <strong className="text-slate-900 font-mono">{currentOverbite > 0 ? `+${currentOverbite}` : currentOverbite} mm</strong></span>
                  <span>Crowding: <strong className="text-slate-900 capitalize font-medium">{currentCrowding}</strong></span>
                  <span className="text-[11px] text-slate-400">IMPA: ~86°</span>
                </div>
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

              <div id="tour-clinical-measurements" className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-lg border">
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Left Column: Segmented Diagnostic Records Hub */}
        <div className="space-y-4">
          {/* Segmented Diagnostic Records Hub Card */}
          <div id="tour-diagnostic-hub" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Hub Header & Status Bar */}
            <div className="bg-slate-50/90 border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="p-1.5 rounded-lg bg-blue-600 text-white shadow-xs shrink-0">
                  <Layers className="w-3.5 h-3.5" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Diagnostic Records Hub
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Sync
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    Case: <strong className="text-slate-800">{isCustomMode ? customPatient.name : `${activePatient?.firstName} ${activePatient?.lastName}`}</strong> • {currentAngle} • OJ: {currentOverjet}mm
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1.5">
                <Badge variant="outline" className="text-[11px] bg-white text-slate-700 border-slate-200 font-bold px-2 py-0.5 shadow-2xs">
                  {activeDiagnosticTab === 'ceph' && '📐 Ceph Tracing'}
                  {activeDiagnosticTab === 'odontogram' && '🦷 FDI Chart'}
                  {activeDiagnosticTab === 'panoramic' && '🩻 OPG X-Ray'}
                  {activeDiagnosticTab === 'bolton' && '📊 Bolton Space'}
                  {activeDiagnosticTab === 'model3d' && '🧊 3D Digital Cast'}
                </Badge>
              </div>
            </div>

            {/* Segmented Navigation Tab Buttons */}
            <div className="p-2 bg-slate-100/90 border-b border-slate-200/80 overflow-x-auto no-scrollbar">
              <div className="grid grid-cols-5 gap-1.5 min-w-[420px] text-center">
                {/* Tab 1: Ceph */}
                <button
                  type="button"
                  onClick={() => setActiveDiagnosticTab('ceph')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                    activeDiagnosticTab === 'ceph'
                      ? 'bg-white text-blue-700 font-bold shadow-xs border-blue-200 ring-2 ring-blue-500/20'
                      : 'bg-white/60 hover:bg-white text-slate-600 hover:text-slate-900 border-slate-200/60'
                  }`}
                >
                  <span className="text-base leading-none mb-1">📐</span>
                  <span className="text-xs font-bold leading-tight">Ceph</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full mt-1 bg-blue-50 text-blue-700 uppercase tracking-wider">
                    {cephPresetCase}
                  </span>
                </button>

                {/* Tab 2: FDI Odontogram */}
                <button
                  type="button"
                  onClick={() => setActiveDiagnosticTab('odontogram')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                    activeDiagnosticTab === 'odontogram'
                      ? 'bg-white text-blue-700 font-bold shadow-xs border-blue-200 ring-2 ring-blue-500/20'
                      : 'bg-white/60 hover:bg-white text-slate-600 hover:text-slate-900 border-slate-200/60'
                  }`}
                >
                  <span className="text-base leading-none mb-1">🦷</span>
                  <span className="text-xs font-bold leading-tight">FDI Chart</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full mt-1 bg-slate-100 text-slate-700">
                    32 Teeth
                  </span>
                </button>

                {/* Tab 3: Panoramic OPG */}
                <button
                  type="button"
                  onClick={() => setActiveDiagnosticTab('panoramic')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                    activeDiagnosticTab === 'panoramic'
                      ? 'bg-white text-blue-700 font-bold shadow-xs border-blue-200 ring-2 ring-blue-500/20'
                      : 'bg-white/60 hover:bg-white text-slate-600 hover:text-slate-900 border-slate-200/60'
                  }`}
                >
                  <span className="text-base leading-none mb-1">🩻</span>
                  <span className="text-xs font-bold leading-tight">OPG X-Ray</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full mt-1 bg-emerald-50 text-emerald-700">
                    HD Clear
                  </span>
                </button>

                {/* Tab 4: Bolton Analysis */}
                <button
                  type="button"
                  onClick={() => setActiveDiagnosticTab('bolton')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                    activeDiagnosticTab === 'bolton'
                      ? 'bg-white text-teal-700 font-bold shadow-xs border-teal-200 ring-2 ring-teal-500/20'
                      : 'bg-white/60 hover:bg-white text-slate-600 hover:text-slate-900 border-slate-200/60'
                  }`}
                >
                  <span className="text-base leading-none mb-1">📊</span>
                  <span className="text-xs font-bold leading-tight">Bolton</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full mt-1 bg-teal-50 text-teal-700">
                    77.2% Norm
                  </span>
                </button>

                {/* Tab 5: 3D Study Model */}
                <button
                  type="button"
                  onClick={() => setActiveDiagnosticTab('model3d')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                    activeDiagnosticTab === 'model3d'
                      ? 'bg-white text-indigo-700 font-black shadow-xs border-indigo-300 ring-2 ring-indigo-500/30'
                      : 'bg-indigo-50/70 hover:bg-indigo-100/80 text-indigo-900 font-bold border-indigo-200 shadow-2xs'
                  }`}
                >
                  <span className="text-base leading-none mb-1">🧊</span>
                  <span className="text-xs font-bold leading-tight flex items-center gap-0.5">
                    3D Model
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1 bg-indigo-600 text-white flex items-center gap-0.5 shadow-2xs">
                    <Sparkles className="w-2.5 h-2.5" />
                    WebGL
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Diagnostic View */}
          <div className="transition-opacity duration-200">
            {activeDiagnosticTab === 'ceph' && (
              <CephViewer presetCase={cephPresetCase} />
            )}
            {activeDiagnosticTab === 'odontogram' && (
              <ToothChart />
            )}
            {activeDiagnosticTab === 'panoramic' && (
              <PanoramicViewer />
            )}
            {activeDiagnosticTab === 'bolton' && (
              <BoltonAnalysisCard 
                overjet={currentOverjet} 
                overbite={currentOverbite} 
                crowdingUpper={currentCrowding} 
                angleClass={currentAngle} 
              />
            )}
            {activeDiagnosticTab === 'model3d' && (
              <Dental3DViewer />
            )}
          </div>

          {/* Diagnostic Quick-Nav Overview Ribbon */}
          <div className="flex flex-wrap gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-xs">
            <div 
              onClick={() => setActiveDiagnosticTab('ceph')}
              className={`flex-1 min-w-[110px] p-2 rounded-lg cursor-pointer transition-all border ${
                activeDiagnosticTab === 'ceph' ? 'bg-blue-50/80 border-blue-300 shadow-xs' : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ceph Sagittal</div>
              <div className="font-bold text-slate-800 text-xs mt-0.5 flex items-center justify-between gap-1">
                <span className="whitespace-nowrap">ANB / Wits</span>
                <span className="text-blue-600 text-[11px] font-semibold uppercase shrink-0">{cephPresetCase}</span>
              </div>
            </div>

            <div 
              onClick={() => setActiveDiagnosticTab('odontogram')}
              className={`flex-1 min-w-[110px] p-2 rounded-lg cursor-pointer transition-all border ${
                activeDiagnosticTab === 'odontogram' ? 'bg-blue-50/80 border-blue-300 shadow-xs' : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Odontogram</div>
              <div className="font-bold text-slate-800 text-xs mt-0.5 flex items-center justify-between gap-1">
                <span className="whitespace-nowrap">FDI Chart</span>
                <span className="text-slate-600 text-[11px] font-semibold shrink-0">32 Teeth</span>
              </div>
            </div>

            <div 
              onClick={() => setActiveDiagnosticTab('panoramic')}
              className={`flex-1 min-w-[110px] p-2 rounded-lg cursor-pointer transition-all border ${
                activeDiagnosticTab === 'panoramic' ? 'bg-blue-50/80 border-blue-300 shadow-xs' : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Panoramic OPG</div>
              <div className="font-bold text-slate-800 text-xs mt-0.5 flex items-center justify-between gap-1">
                <span className="whitespace-nowrap">Pathology</span>
                <span className="text-emerald-600 text-[11px] font-semibold shrink-0">Cleared</span>
              </div>
            </div>

            <div 
              onClick={() => setActiveDiagnosticTab('bolton')}
              className={`flex-1 min-w-[110px] p-2 rounded-lg cursor-pointer transition-all border ${
                activeDiagnosticTab === 'bolton' ? 'bg-teal-50/80 border-teal-300 shadow-xs' : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bolton Ratio</div>
              <div className="font-bold text-slate-800 text-xs mt-0.5 flex items-center justify-between gap-1">
                <span className="whitespace-nowrap">Anterior</span>
                <span className="text-teal-700 text-[11px] font-semibold shrink-0">77.2%</span>
              </div>
            </div>

            <div 
              onClick={() => setActiveDiagnosticTab('model3d')}
              className={`flex-1 min-w-[110px] p-2 rounded-lg cursor-pointer transition-all border ${
                activeDiagnosticTab === 'model3d' ? 'bg-indigo-50/80 border-indigo-300 shadow-xs' : 'border-indigo-100/80 bg-indigo-50/40 hover:bg-indigo-50/80'
              }`}
            >
              <div className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider flex items-center gap-1">
                <span>3D Study Cast</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              </div>
              <div className="font-bold text-slate-800 text-xs mt-0.5 flex items-center justify-between gap-1">
                <span className="whitespace-nowrap">Dual Arch</span>
                <span className="text-indigo-700 text-[11px] font-bold shrink-0">WebGL 3D</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Treatment Plan Output */}
        <div className="space-y-6">
          <PlanBuilder 
            plan={generatedPlan} 
            isGenerating={isGenerating} 
            experienceLevel={experienceLevel}
          />
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