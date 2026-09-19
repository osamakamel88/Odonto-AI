"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Layers, 
  Ruler, 
  Activity, 
  ShieldCheck, 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Crosshair, 
  Bookmark, 
  ExternalLink,
  Zap,
  ShieldAlert,
  SlidersHorizontal,
  Drill,
  Wrench,
  RotateCw
} from 'lucide-react';

export interface ImplantPlanData {
  patientName?: string;
  patientAge?: number;
  fdiPosition?: number;
  chiefComplaint?: string;
  aiEngineSource?: string;
  generatedAt?: string;
  siteAssessment: {
    fdiPosition: number;
    region: string;
    boneQuality: string;
    boneQuantity: string;
    boneDimensions: {
      widthMm: number;
      heightMm: number;
    };
    augmentationNeeded: boolean;
    augmentationType: string;
    augmentationDetails: string;
  };
  fixtureSelection: {
    recommendedBrand: string;
    system: string;
    diameterMm: number;
    lengthMm: number;
    platformType: string;
    connection: string;
    surface: string;
    shape: string;
    rationale: string[];
    alternatives: string[];
  };
  surgicalProtocol: {
    flapDesign: string;
    drillingSequence: {
      step: number;
      drill: string;
      diameter: string;
      speedRpm: string;
      irrigation: string;
      notes: string;
    }[];
    targetInsertionTorqueNcm: string;
    targetISQ: string;
    sinusLiftRequired: boolean;
    sinusProtocol: string;
    gbrProtocol: string;
    healingDuration: string;
  };
  loadingProtocol: {
    type: string;
    timingWeeks: string;
    prerequisites: string[];
    occlusalConsiderations: string[];
  };
  prostheticPlan: {
    restorationType: string;
    retentionType: string;
    abutmentType: string;
    abutmentCuffHeightMm: number;
    abutmentAngulation: number;
    crownMaterial: string;
    screwTorqueNcm: number;
    crownToImplantRatio: number;
    cantileverRisk: string;
    laboratoryInstructions: string[];
  };
  riskAssessment: {
    overallRisk: string;
    riskScore: number;
    clearanceStatus: string;
    keyRisks: string[];
    mitigationStrategies: string[];
  };
  evidenceCitations: {
    author: string;
    year: string;
    title: string;
    journal: string;
    clinicalTakeaway: string;
  }[];
}

export interface ImplantPlanBuilderProps {
  plan?: ImplantPlanData;
  isLoading?: boolean;
}

export function ImplantPlanBuilder({ plan, isLoading = false }: ImplantPlanBuilderProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'fixture' | 'surgical' | 'prosthetics' | 'risk' | 'evidence'>('overview');
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <Card className="border-slate-200 shadow-md">
        <CardContent className="p-12 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <div className="text-center">
            <h3 className="text-base font-bold text-slate-900">Synthesizing Surgical Implant Plan</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Calculating Misch bone density protocols, fixture diameter margins, primary stability ISQ, and prosthetic screw torques...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!plan) {
    return (
      <Card className="border-dashed border-slate-300">
        <CardContent className="p-12 text-center text-slate-500">
          <Drill className="w-10 h-10 mx-auto text-slate-400 mb-2" />
          <p className="text-sm font-medium">No implant treatment plan generated yet.</p>
          <p className="text-xs text-slate-400 mt-1">Select an FDI site, enter bone measurements, and click "Generate Surgical Plan".</p>
        </CardContent>
      </Card>
    );
  }

  const handleCopyPlan = () => {
    const summary = `
ODONTO AI - DENTAL IMPLANT SURGICAL & PROSTHETIC PLAN
Patient: ${plan.patientName || 'Patient'} | Site: FDI #${plan.siteAssessment.fdiPosition}
------------------------------------------------------------
RECOMMENDED FIXTURE:
- Brand & System: ${plan.fixtureSelection.recommendedBrand} - ${plan.fixtureSelection.system}
- Dimensions: Ø ${plan.fixtureSelection.diameterMm} mm x ${plan.fixtureSelection.lengthMm} mm
- Connection: ${plan.fixtureSelection.connection} (${plan.fixtureSelection.platformType})
- Target Torque: ${plan.surgicalProtocol.targetInsertionTorqueNcm} | Target ISQ: ${plan.surgicalProtocol.targetISQ}

SURGICAL SPECIFICATIONS:
- Flap Design: ${plan.surgicalProtocol.flapDesign}
- Sinus Status: ${plan.surgicalProtocol.sinusProtocol}
- GBR / Bone Augmentation: ${plan.surgicalProtocol.gbrProtocol}
- Healing Timeline: ${plan.surgicalProtocol.healingDuration}

PROSTHETIC SPECIFICATIONS:
- Restoration: ${plan.prostheticPlan.restorationType} (${plan.prostheticPlan.retentionType})
- Abutment: ${plan.prostheticPlan.abutmentType} (Cuff: ${plan.prostheticPlan.abutmentCuffHeightMm}mm, Angulation: ${plan.prostheticPlan.abutmentAngulation}°)
- Screw Torque: ${plan.prostheticPlan.screwTorqueNcm} Ncm
- Crown-to-Implant Ratio: ${plan.prostheticPlan.crownToImplantRatio}

RISK & CLEARANCE:
- Level: ${plan.riskAssessment.overallRisk.toUpperCase()} (Score: ${plan.riskAssessment.riskScore}/100)
- Clearance: ${plan.riskAssessment.clearanceStatus}
------------------------------------------------------------
Generated by ${plan.aiEngineSource} at ${plan.generatedAt}
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'fixture', label: 'Fixture & Screws', icon: Drill },
    { id: 'surgical', label: 'Surgical Protocol', icon: Wrench },
    { id: 'prosthetics', label: 'Prosthetic Plan', icon: Layers },
    { id: 'risk', label: 'Risk & Clearance', icon: ShieldAlert },
    { id: 'evidence', label: 'Evidence Base', icon: Bookmark },
  ] as const;

  return (
    <Card className="border-slate-200 shadow-md overflow-hidden">
      {/* Plan Header */}
      <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-xs">
                Site FDI #{plan.siteAssessment.fdiPosition}
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs font-mono">
                {plan.fixtureSelection.recommendedBrand} Ø{plan.fixtureSelection.diameterMm} x {plan.fixtureSelection.lengthMm}mm
              </Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                Torque: {plan.prostheticPlan.screwTorqueNcm} Ncm
              </Badge>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-2">
              {plan.patientName || 'Patient'} — Implant Treatment Plan
            </h2>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
              <span>{plan.siteAssessment.region}</span>
              <span>•</span>
              <span>Engine: {plan.aiEngineSource}</span>
              <span>•</span>
              <span>{plan.generatedAt}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyPlan}
              className="bg-slate-800/80 hover:bg-slate-700 text-white border-slate-700 text-xs gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Plan'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="bg-slate-800/80 hover:bg-slate-700 text-white border-slate-700 text-xs gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </Button>
          </div>
        </div>

        {/* 6-Column Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 mt-6 pt-4 border-t border-slate-800/80">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{t.label}</span>
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Target Site</span>
                <div className="text-lg font-bold text-slate-900 mt-1">FDI #{plan.siteAssessment.fdiPosition}</div>
                <div className="text-xs text-slate-600 mt-0.5">{plan.siteAssessment.region}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Bone Architecture</span>
                <div className="text-lg font-bold text-slate-900 mt-1">{plan.siteAssessment.boneQuality}</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Width: {plan.siteAssessment.boneDimensions.widthMm}mm | Height: {plan.siteAssessment.boneDimensions.heightMm}mm
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Fixture Specs</span>
                <div className="text-lg font-bold text-blue-700 mt-1">
                  Ø {plan.fixtureSelection.diameterMm} x {plan.fixtureSelection.lengthMm} mm
                </div>
                <div className="text-xs text-slate-600 mt-0.5">{plan.fixtureSelection.recommendedBrand} {plan.fixtureSelection.system}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Prosthetic Retention</span>
                <div className="text-lg font-bold text-emerald-700 mt-1 capitalize">{plan.prostheticPlan.retentionType}</div>
                <div className="text-xs text-slate-600 mt-0.5">Torque: {plan.prostheticPlan.screwTorqueNcm} Ncm</div>
              </div>
            </div>

            {/* Bone Augmentation Banner */}
            <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
              plan.siteAssessment.augmentationNeeded
                ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            }`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                plan.siteAssessment.augmentationNeeded ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {plan.siteAssessment.augmentationNeeded ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              </div>
              <div>
                <div className="font-bold text-sm">
                  {plan.siteAssessment.augmentationNeeded
                    ? `Bone Augmentation Required: ${plan.siteAssessment.augmentationType.toUpperCase()}`
                    : 'Native Bone Volume Fully Sufficient'}
                </div>
                <p className="text-xs mt-1 leading-relaxed">
                  {plan.siteAssessment.augmentationDetails}
                </p>
              </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Drill className="w-3.5 h-3.5 text-blue-600" />
                  Primary Surgical Highlights
                </h4>
                <ul className="text-xs space-y-1.5 text-slate-700">
                  <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">Flap Approach:</span>
                    <span className="font-semibold capitalize">{plan.surgicalProtocol.flapDesign}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">Target Insertion Torque:</span>
                    <span className="font-semibold">{plan.surgicalProtocol.targetInsertionTorqueNcm}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">Primary Stability ISQ:</span>
                    <span className="font-semibold">{plan.surgicalProtocol.targetISQ}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">Expected Healing:</span>
                    <span className="font-semibold">{plan.surgicalProtocol.healingDuration}</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal-600" />
                  Prosthetic Specifications
                </h4>
                <ul className="text-xs space-y-1.5 text-slate-700">
                  <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">Superstructure:</span>
                    <span className="font-semibold">{plan.prostheticPlan.restorationType}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">Abutment Connection:</span>
                    <span className="font-semibold truncate max-w-[200px]">{plan.prostheticPlan.abutmentType}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">Crown-to-Implant Ratio:</span>
                    <span className="font-semibold">{plan.prostheticPlan.crownToImplantRatio}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">Restorative Screw Torque:</span>
                    <span className="font-semibold text-blue-700">{plan.prostheticPlan.screwTorqueNcm} Ncm</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FIXTURE & SCREWS */}
        {activeTab === 'fixture' && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <Badge className="bg-blue-100 text-blue-800 border-none font-bold text-xs">
                    Primary Recommendation
                  </Badge>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {plan.fixtureSelection.recommendedBrand} {plan.fixtureSelection.system}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {plan.fixtureSelection.connection} • {plan.fixtureSelection.platformType}
                  </p>
                </div>
                <div className="text-right sm:self-auto">
                  <div className="text-2xl font-black text-blue-700 font-mono">
                    Ø {plan.fixtureSelection.diameterMm} x {plan.fixtureSelection.lengthMm} mm
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">Platform Switched</span>
                </div>
              </div>

              {/* Rationale Bullet Points */}
              <div className="mt-4 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Clinical Selection Rationale:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  {plan.fixtureSelection.rationale.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Screws & Torque Specification */}
              <div className="mt-5 p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-blue-700" />
                    Prosthetic Screw Torque Specification
                  </div>
                  <p className="text-xs text-blue-800">
                    Tighten to calibrated <span className="font-bold font-mono">{plan.prostheticPlan.screwTorqueNcm} Ncm</span> with torque wrench. Retorque after 10-minute settling interval.
                  </p>
                </div>
                <Badge className="bg-blue-600 text-white text-sm px-3 py-1 font-mono font-bold self-start sm:self-auto">
                  {plan.prostheticPlan.screwTorqueNcm} Ncm
                </Badge>
              </div>
            </div>

            {/* Compatible Alternatives */}
            {plan.fixtureSelection.alternatives.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Compatible Alternative Systems
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {plan.fixtureSelection.alternatives.map((alt, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{alt}</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500">Alternative #{idx + 1}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SURGICAL PROTOCOL */}
        {activeTab === 'surgical' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Flap Design:</span>
                <Badge className="bg-white text-slate-800 border-slate-200 font-bold">{plan.surgicalProtocol.flapDesign}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Target Torque:</span>
                <Badge className="bg-blue-100 text-blue-800 border-none font-bold">{plan.surgicalProtocol.targetInsertionTorqueNcm}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Target ISQ:</span>
                <Badge className="bg-teal-100 text-teal-800 border-none font-bold">{plan.surgicalProtocol.targetISQ}</Badge>
              </div>
            </div>

            {/* Drilling Sequence Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Drill className="w-3.5 h-3.5 text-blue-600" />
                Step-by-Step Drilling Sequence
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5 sm:p-3 w-12 text-center">Step</th>
                      <th className="p-2.5 sm:p-3">Drill Type</th>
                      <th className="p-2.5 sm:p-3">Diameter</th>
                      <th className="p-2.5 sm:p-3">Speed (RPM)</th>
                      <th className="p-2.5 sm:p-3 hidden sm:table-cell">Irrigation</th>
                      <th className="p-2.5 sm:p-3">Clinical Instructions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {plan.surgicalProtocol.drillingSequence.map((step) => (
                      <tr key={step.step} className="hover:bg-slate-50/60">
                        <td className="p-2.5 sm:p-3 font-mono font-bold text-center text-blue-600">
                          {step.step}
                        </td>
                        <td className="p-2.5 sm:p-3 font-semibold text-slate-800">{step.drill}</td>
                        <td className="p-2.5 sm:p-3 font-mono text-slate-600">{step.diameter}</td>
                        <td className="p-2.5 sm:p-3 font-mono text-teal-700 font-semibold">{step.speedRpm}</td>
                        <td className="p-2.5 sm:p-3 text-slate-500 hidden sm:table-cell capitalize">{step.irrigation}</td>
                        <td className="p-2.5 sm:p-3 text-slate-600">{step.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* GBR & Sinus Protocols */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Sinus Protocol</span>
                <p className="text-xs text-slate-700 leading-relaxed">{plan.surgicalProtocol.sinusProtocol}</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">GBR & Grafting Protocol</span>
                <p className="text-xs text-slate-700 leading-relaxed">{plan.surgicalProtocol.gbrProtocol}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROSTHETIC PLAN */}
        {activeTab === 'prosthetics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Restoration Type</span>
                <div className="text-base font-bold text-slate-900 mt-1">{plan.prostheticPlan.restorationType}</div>
                <Badge className="mt-2 bg-blue-100 text-blue-800 border-none font-semibold text-[10px] capitalize">
                  {plan.prostheticPlan.retentionType}
                </Badge>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Abutment Selection</span>
                <div className="text-base font-bold text-slate-900 mt-1">{plan.prostheticPlan.abutmentType}</div>
                <p className="text-xs text-slate-600 mt-1">
                  Cuff: {plan.prostheticPlan.abutmentCuffHeightMm}mm | Angulation: {plan.prostheticPlan.abutmentAngulation}°
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Biomechanical Lever (C/I)</span>
                <div className="text-base font-bold text-emerald-700 mt-1 font-mono">
                  Ratio: {plan.prostheticPlan.crownToImplantRatio}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{plan.prostheticPlan.cantileverRisk}</p>
              </div>
            </div>

            {/* Laboratory Instructions */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                Dental Laboratory Fabrication Instructions
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {plan.prostheticPlan.laboratoryInstructions.map((inst, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-mono font-bold text-blue-600 shrink-0">{i + 1}.</span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 5: RISK & CLEARANCE */}
        {activeTab === 'risk' && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Surgical Clearance Verdict</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {plan.riskAssessment.clearanceStatus}
                </h3>
              </div>
              <div className="text-right">
                <Badge className={`text-sm px-3 py-1 font-bold uppercase ${
                  plan.riskAssessment.overallRisk === 'low'
                    ? 'bg-emerald-100 text-emerald-800'
                    : plan.riskAssessment.overallRisk === 'moderate'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {plan.riskAssessment.overallRisk} Risk ({plan.riskAssessment.riskScore}/100)
                </Badge>
              </div>
            </div>

            {/* Key Risks */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Identified Clinical Risks:</h4>
              <div className="space-y-2">
                {plan.riskAssessment.keyRisks.map((k, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg border border-rose-100 bg-rose-50/50 text-xs text-rose-950">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{k}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mitigation Strategies */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Mitigation & Safety Checklist:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {plan.riskAssessment.mitigationStrategies.map((m, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: EVIDENCE BASE */}
        {activeTab === 'evidence' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Key peer-reviewed implantology literature supporting this patient’s surgical and restorative design:
            </p>
            <div className="grid grid-cols-1 gap-3">
              {plan.evidenceCitations.map((c, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{c.author} ({c.year})</span>
                    <Badge variant="outline" className="text-[10px] text-slate-500">{c.journal}</Badge>
                  </div>
                  <div className="text-xs font-semibold text-blue-700 italic">"{c.title}"</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800 font-semibold">Clinical Takeaway:</strong> {c.clinicalTakeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
