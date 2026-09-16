"use client";

import React, { useState } from 'react';
import { PlanBuilder, TreatmentPlanData } from '@/components/clinical/plan-builder';
import { CephViewer } from '@/components/clinical/ceph-viewer';
import { ToothChart } from '@/components/clinical/tooth-chart';
import { PanoramicViewer } from '@/components/clinical/panoramic-viewer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getMockPatients } from '@/lib/db/mock-data';
import { Sparkles, UserCheck, Stethoscope, Sliders, RefreshCw, CheckCircle } from 'lucide-react';

export default function GeneratePlanPage() {
  const patients = getMockPatients();
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id);
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'expert'>('beginner');
  const [modality, setModality] = useState<'fixed_mbt' | 'aligners' | 'functional' | 'surgical'>('fixed_mbt');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [generatedPlan, setGeneratedPlan] = useState<TreatmentPlanData | undefined>(undefined);

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setCurrentStep(1);

    try {
      // Step simulation for all 7 AI layers
      const timer1 = setTimeout(() => setCurrentStep(2), 600);
      const timer2 = setTimeout(() => setCurrentStep(3), 1200);
      const timer3 = setTimeout(() => setCurrentStep(4), 1800);

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
          experienceLevel,
          modality
        })
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setGeneratedPlan(resData.data);
      }
    } catch (err) {
      console.error('Plan generation error:', err);
    } finally {
      setIsGenerating(false);
      setCurrentStep(0);
    }
  };

  const layersStatus = [
    { num: 1, name: 'Cephalometric Skeletal Tracing', status: 'Active' },
    { num: 2, name: 'Panoramic Tooth Segmentation', status: 'Active' },
    { num: 3, name: 'Pre-Ortho Disease Clearance', status: 'Cleared' },
    { num: 4, name: '3D Arch Space Discrepancy', status: 'Calculated' },
    { num: 5, name: 'CBCT Cortical Envelope Limit', status: 'Verified' },
    { num: 6, name: 'Dental Clinical Reasoning (CoT)', status: 'Active' },
    { num: 7, name: 'Orthodontic Plan Synthesis & Evidence', status: 'Synthesized' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Treatment Planning Studio</h1>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none font-semibold">
              7-Layer AI Pipeline
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Feed clinical findings, radiographs, and cephs to synthesize evidence-backed orthodontic protocols
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 shadow-md shadow-blue-500/20 px-5"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Pipeline (Layer {currentStep || 1}/7)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Plan with GPT-4o</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 7-Layer Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {layersStatus.map((l) => (
          <div 
            key={l.num} 
            className={`p-2.5 rounded-lg border text-center transition-all ${
              isGenerating && currentStep === l.num 
                ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-300 scale-105' 
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="text-[10px] text-slate-400 font-bold uppercase">Layer {l.num}</div>
            <div className="text-xs font-semibold text-slate-800 truncate mt-0.5" title={l.name}>{l.name}</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] text-emerald-700 font-medium">{l.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Strip */}
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
                    {p.firstName} {p.lastName} — {p.chiefComplaint} ({p.clinicalRecords[0]?.angleClass})
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