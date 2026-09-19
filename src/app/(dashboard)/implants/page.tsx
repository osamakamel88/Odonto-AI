"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImplantSiteSelector } from '@/components/clinical/implant-site-selector';
import { BoneAssessmentCard } from '@/components/clinical/bone-assessment-card';
import { ImplantPlanBuilder, ImplantPlanData } from '@/components/clinical/implant-plan-builder';
import { BoneDensity } from '@/lib/implantology/knowledge-base/bone-classification';
import { 
  Sparkles, 
  Drill, 
  Layers, 
  Ruler, 
  Activity, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  RotateCcw,
  Sliders,
  UserCheck,
  Building2,
  FileText,
  AlertTriangle
} from 'lucide-react';

export default function ImplantPlanningPage() {
  // Patient info state
  const [patientName, setPatientName] = useState('Sarah Jenkins');
  const [patientAge, setPatientAge] = useState<number>(42);
  const [patientGender, setPatientGender] = useState<'male' | 'female'>('female');
  const [chiefComplaint, setChiefComplaint] = useState('Replacement of fractured upper molar with dental implant');

  // Site parameters state
  const [selectedFdi, setSelectedFdi] = useState<number>(16);
  const [boneWidth, setBoneWidth] = useState<number>(6.5);
  const [boneHeight, setBoneHeight] = useState<number>(9.5);
  const [boneDensity, setBoneDensity] = useState<BoneDensity>('D2');
  const [isImmediateSocket, setIsImmediateSocket] = useState<boolean>(false);
  const [socketType, setSocketType] = useState<'Type-1' | 'Type-2' | 'Type-3'>('Type-1');
  const [preferredBrand, setPreferredBrand] = useState<string>('Straumann');
  const [interarchSpace, setInterarchSpace] = useState<number>(8.0);
  const [gingivalThickness, setGingivalThickness] = useState<number>(2.5);

  // Medical profile state
  const [smokingStatus, setSmokingStatus] = useState<'non-smoker' | 'light-smoker' | 'heavy-smoker'>('non-smoker');
  const [diabetesStatus, setDiabetesStatus] = useState<'none' | 'controlled-hba1c-under-7' | 'moderate-hba1c-7-8' | 'uncontrolled-hba1c-over-8'>('none');
  const [bruxism, setBruxism] = useState<boolean>(false);
  const [bisphosphonates, setBisphosphonates] = useState<boolean>(false);
  const [anticoagulants, setAnticoagulants] = useState<boolean>(false);
  const [historyOfPeriodontitis, setHistoryOfPeriodontitis] = useState<'none' | 'treated-stable' | 'active-untreated'>('none');

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [generatedPlan, setGeneratedPlan] = useState<ImplantPlanData | undefined>(undefined);

  // Presets
  const applyPreset = (presetKey: 'anterior-aesthetic' | 'posterior-sinus' | 'mandibular-molar' | 'immediate-socket') => {
    if (presetKey === 'anterior-aesthetic') {
      setPatientName('Emily Vance');
      setPatientAge(29);
      setPatientGender('female');
      setChiefComplaint('Missing upper front tooth after sports trauma; wants natural smile restoration');
      setSelectedFdi(11);
      setBoneWidth(6.0);
      setBoneHeight(12.0);
      setBoneDensity('D2');
      setIsImmediateSocket(false);
      setPreferredBrand('Straumann');
      setSmokingStatus('non-smoker');
      setDiabetesStatus('none');
      setBruxism(false);
    } else if (presetKey === 'posterior-sinus') {
      setPatientName('Robert Miller');
      setPatientAge(58);
      setPatientGender('male');
      setChiefComplaint('Missing upper right first molar for 4 years; chewing difficulty');
      setSelectedFdi(16);
      setBoneWidth(7.0);
      setBoneHeight(5.5); // Requires crestal sinus lift
      setBoneDensity('D3');
      setIsImmediateSocket(false);
      setPreferredBrand('Nobel Biocare');
      setSmokingStatus('non-smoker');
      setDiabetesStatus('none');
      setBruxism(false);
    } else if (presetKey === 'mandibular-molar') {
      setPatientName('David Chen');
      setPatientAge(51);
      setPatientGender('male');
      setChiefComplaint('Extracted lower first molar; needs strong implant restoration');
      setSelectedFdi(36);
      setBoneWidth(7.5);
      setBoneHeight(10.5);
      setBoneDensity('D1');
      setIsImmediateSocket(false);
      setPreferredBrand('Zimmer Biomet');
      setSmokingStatus('non-smoker');
      setDiabetesStatus('none');
      setBruxism(true);
    } else if (presetKey === 'immediate-socket') {
      setPatientName('Sophia Al-Mansoor');
      setPatientAge(35);
      setPatientGender('female');
      setChiefComplaint('Vertical root fracture on premolar; desires same-day extraction and implant');
      setSelectedFdi(24);
      setBoneWidth(6.5);
      setBoneHeight(13.0);
      setBoneDensity('D2');
      setIsImmediateSocket(true);
      setSocketType('Type-1');
      setPreferredBrand('Straumann');
      setSmokingStatus('non-smoker');
      setDiabetesStatus('none');
      setBruxism(false);
    }
  };

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    setPipelineStep(1);

    // Visual progression animation through 5 implant planning layers
    const timer1 = setTimeout(() => setPipelineStep(2), 350);
    const timer2 = setTimeout(() => setPipelineStep(3), 700);
    const timer3 = setTimeout(() => setPipelineStep(4), 1050);
    const timer4 = setTimeout(() => setPipelineStep(5), 1400);

    try {
      const payload = {
        patientData: {
          name: patientName,
          age: patientAge,
          gender: patientGender,
          chiefComplaint
        },
        siteData: {
          fdiPosition: selectedFdi,
          boneWidth,
          boneHeight,
          boneDensity,
          isImmediateSocket,
          socketType,
          interarchSpace,
          gingivalThickness,
          sinusFloorDistance: (Math.floor(selectedFdi / 10) <= 2 && (selectedFdi % 10) >= 4) ? boneHeight : undefined,
          ianDistance: (Math.floor(selectedFdi / 10) >= 3 && (selectedFdi % 10) >= 4) ? boneHeight : undefined
        },
        medicalProfile: {
          smokingStatus,
          diabetesStatus,
          bruxism,
          bisphosphonates,
          anticoagulants,
          historyOfPeriodontitis
        },
        preferredBrand
      };

      const response = await fetch('/api/ai/generate-implant-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success && result.data) {
        setTimeout(() => {
          setGeneratedPlan(result.data);
          setIsGenerating(false);
          setPipelineStep(0);
        }, 1800);
      } else {
        setIsGenerating(false);
        setPipelineStep(0);
      }
    } catch (err) {
      console.error('Failed to generate implant plan:', err);
      setIsGenerating(false);
      setPipelineStep(0);
    }
  };

  // Auto-generate initial plan on mount
  useEffect(() => {
    handleGeneratePlan();
  }, []);

  const pipelineLayers = [
    { step: 1, name: 'CBCT Mapping', detail: '3D Dimensions & Margins' },
    { step: 2, name: 'Misch Density', detail: 'Hounsfield Units & Quality' },
    { step: 3, name: 'Fixture Geometry', detail: 'Diameter, Length & Taper' },
    { step: 4, name: 'Surgical Protocol', detail: 'Drill Speeds & Torque' },
    { step: 5, name: 'Prosthetic Synthesis', detail: 'Abutments & Screw Specs' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Drill className="w-6 h-6 text-blue-600" />
              Dental Implant Planning Studio
            </h1>
            <Badge className="bg-teal-100 text-teal-800 border-none font-semibold text-xs">
              AI Biomechanical Engine
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Precision fixture selection, bone density protocols, sinus lift calculations, and prosthetic screw specifications
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleGeneratePlan}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 gap-2 shadow-xs cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Computing Biomechanics...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Surgical Plan</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Preset Case Quick-Select Strip */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-blue-600" />
          Clinical Benchmark Cases:
        </span>
        <button
          type="button"
          onClick={() => applyPreset('anterior-aesthetic')}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-all cursor-pointer"
        >
          #11 Anterior Aesthetic Zone
        </button>
        <button
          type="button"
          onClick={() => applyPreset('posterior-sinus')}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-all cursor-pointer"
        >
          #16 Sinus Lift (OSFE Crestal)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('mandibular-molar')}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-all cursor-pointer"
        >
          #36 Mandibular Molar / Bruxism
        </button>
        <button
          type="button"
          onClick={() => applyPreset('immediate-socket')}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-all cursor-pointer"
        >
          #24 Immediate Socket (Type 1)
        </button>
      </div>

      {/* 5-Layer Biomechanical Pipeline Status */}
      {isGenerating && (
        <Card className="border-blue-200 bg-blue-50/50 shadow-xs animate-in fade-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                Synthesizing 5-Layer Implant Plan
              </span>
              <span className="text-xs text-blue-700 font-semibold font-mono">Layer {pipelineStep} of 5</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {pipelineLayers.map((layer) => {
                const isPassed = pipelineStep > layer.step;
                const isCurrent = pipelineStep === layer.step;
                return (
                  <div
                    key={layer.step}
                    className={`p-2.5 rounded-lg border text-xs transition-all ${
                      isPassed
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                        : isCurrent
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs scale-102'
                        : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>{layer.step}. {layer.name}</span>
                      {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isCurrent ? 'text-blue-100' : 'text-slate-500'}`}>
                      {layer.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Grid: Patient & Medical Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Patient Clinical Data */}
        <Card className="border-slate-200 shadow-xs">
          <CardHeader className="p-4 sm:p-5 border-b border-slate-100">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              Patient & System Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700">Patient Full Name</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700">Age</label>
                <input
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(parseInt(e.target.value) || 30)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-900"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700">Gender</label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-900 bg-white"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700">Preferred Implant System</label>
              <select
                value={preferredBrand}
                onChange={(e) => setPreferredBrand(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-blue-700 bg-white"
              >
                <option value="Straumann">Straumann (Bone Level BLT / SLActive)</option>
                <option value="Nobel Biocare">Nobel Biocare (NobelActive / Conical)</option>
                <option value="Zimmer Biomet">Zimmer Biomet (TSV / Trabecular Metal)</option>
                <option value="Dentsply Sirona">Dentsply Sirona (Astra Tech EV)</option>
                <option value="BioHorizons">BioHorizons (Tapered Internal Laser-Lok)</option>
                <option value="Osstem">Osstem (TS III SA / Hiossen)</option>
                <option value="MegaGen">MegaGen (AnyRidge Knife-Edge)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700">Chief Complaint & Clinical Notes</label>
              <textarea
                rows={2}
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-900 resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Column 2 & 3: Medical Risk Factors & Restorative Clearance */}
        <Card className="border-slate-200 shadow-xs lg:col-span-2">
          <CardHeader className="p-4 sm:p-5 border-b border-slate-100 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Medical History & Biomechanical Risk Screening
            </CardTitle>
            <span className="text-[11px] text-slate-500">Evidence-based complication scoring</span>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Tobacco */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <label className="font-bold text-slate-700 block">Tobacco Smoking</label>
                <select
                  value={smokingStatus}
                  onChange={(e) => setSmokingStatus(e.target.value as any)}
                  className="w-full px-2 py-1.5 border rounded-md border-slate-200 bg-white text-xs font-medium"
                >
                  <option value="non-smoker">Non-smoker</option>
                  <option value="light-smoker">Light (&lt;10 cig/day)</option>
                  <option value="heavy-smoker">Heavy (&gt;10 cig/day)</option>
                </select>
              </div>

              {/* Diabetes */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <label className="font-bold text-slate-700 block">Diabetes / Glycemic Control</label>
                <select
                  value={diabetesStatus}
                  onChange={(e) => setDiabetesStatus(e.target.value as any)}
                  className="w-full px-2 py-1.5 border rounded-md border-slate-200 bg-white text-xs font-medium"
                >
                  <option value="none">No Diabetes</option>
                  <option value="controlled-hba1c-under-7">Controlled (HbA1c &lt; 7.0%)</option>
                  <option value="moderate-hba1c-7-8">Moderate (HbA1c 7.0 - 8.0%)</option>
                  <option value="uncontrolled-hba1c-over-8">Uncontrolled (HbA1c &gt; 8.0%)</option>
                </select>
              </div>

              {/* Periodontitis */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <label className="font-bold text-slate-700 block">Periodontal Disease History</label>
                <select
                  value={historyOfPeriodontitis}
                  onChange={(e) => setHistoryOfPeriodontitis(e.target.value as any)}
                  className="w-full px-2 py-1.5 border rounded-md border-slate-200 bg-white text-xs font-medium"
                >
                  <option value="none">Healthy Periodontium</option>
                  <option value="treated-stable">Treated &amp; Stable (SPT)</option>
                  <option value="active-untreated">Active Untreated</option>
                </select>
              </div>
            </div>

            {/* Checkbox Toggles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                bruxism ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <input
                  type="checkbox"
                  checked={bruxism}
                  onChange={(e) => setBruxism(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Bruxism / Parafunction</span>
              </label>

              <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                bisphosphonates ? 'bg-rose-50 border-rose-300 text-rose-950 font-semibold' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <input
                  type="checkbox"
                  checked={bisphosphonates}
                  onChange={(e) => setBisphosphonates(e.target.checked)}
                  className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                />
                <span>Bisphosphonate / MRONJ</span>
              </label>

              <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                anticoagulants ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <input
                  type="checkbox"
                  checked={anticoagulants}
                  onChange={(e) => setAnticoagulants(e.target.checked)}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span>Anticoagulant Therapy</span>
              </label>

              <div className="flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-slate-50">
                <span className="text-slate-600 font-medium">Interarch Space:</span>
                <span className="font-bold font-mono text-slate-900">{interarchSpace} mm</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FDI Interactive Chart */}
      <ImplantSiteSelector
        selectedFdi={selectedFdi}
        onSelectSite={(fdi) => setSelectedFdi(fdi)}
      />

      {/* Bone Assessment & Dimension Sliders */}
      <BoneAssessmentCard
        fdiPosition={selectedFdi}
        boneWidth={boneWidth}
        boneHeight={boneHeight}
        boneDensity={boneDensity}
        isImmediateSocket={isImmediateSocket}
        socketType={socketType}
        onWidthChange={(w) => setBoneWidth(w)}
        onHeightChange={(h) => setBoneHeight(h)}
        onDensityChange={(d) => setBoneDensity(d)}
        onImmediateSocketChange={(immed) => setIsImmediateSocket(immed)}
        onSocketTypeChange={(st) => setSocketType(st)}
      />

      {/* Treatment Plan Results */}
      <ImplantPlanBuilder
        plan={generatedPlan}
        isLoading={isGenerating}
      />
    </div>
  );
}
