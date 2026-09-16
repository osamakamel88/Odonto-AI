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
import { Sparkles, UserCheck, Stethoscope, Sliders, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function GeneratePlanPage() {
  const patients = getMockPatients();
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id);
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'expert'>('beginner');
  const [modality, setModality] = useState<'fixed_mbt' | 'aligners' | 'functional' | 'surgical'>('fixed_mbt');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [generatedPlan, setGeneratedPlan] = useState<TreatmentPlanData | undefined>(undefined);

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Auto-generate initial plan when patient changes
  useEffect(() => {
    handleGenerate(false);
  }, [selectedPatientId, modality, experienceLevel]);

  const handleGenerate = async (showPipelineAnimation: boolean = true) => {
    setIsGenerating(true);
    setCurrentStep(1);

    // Smooth animation across all 7 layers
    const layerTimers: NodeJS.Timeout[] = [];
    if (showPipelineAnimation) {
      for (let i = 2; i <= 7; i++) {
        layerTimers.push(setTimeout(() => setCurrentStep(i), (i - 1) * 350));
      }
    }

    try {
      const response = await fetch('/api/ai/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        })
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        // Wait until layer 7 completes visually before setting result
        const waitTime = showPipelineAnimation ? 2400 : 200;
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
                <span>Re-Synthesize Plan with AI</span>
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

      {/* Patient & Modality Configuration Strip */}
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Patient Selector */}
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

            {/* Experience Level (Education Mode) */}
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
                  Fresh Graduate (with Rationale)
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

            {/* Target Modality Preference */}
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
                <option value="functional">Functional Appliance Phase (Twin Block / Herbst)</option>
                <option value="surgical">Combined Orthognathic Surgery</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Studio Grid: Diagnostic Imaging vs Plan Output */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column: Clinical & Radiographic Findings */}
        <div className="space-y-6">
          <CephViewer />
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