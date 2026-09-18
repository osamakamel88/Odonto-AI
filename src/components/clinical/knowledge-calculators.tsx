"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  determineCVMStage, 
  analyzeCVMGrowth, 
  CVMStage, 
  VertebralCharacteristics 
} from '@/lib/orthodontics/cvm-growth';
import { 
  analyzeMixedDentition 
} from '@/lib/orthodontics/mixed-dentition';
import { 
  TAD_SITE_PROTOCOLS, 
  TADAnatomicalSite 
} from '@/lib/orthodontics/tad-protocols';
import { 
  Activity, 
  Ruler, 
  Anchor, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ChevronRight, 
  Info, 
  Zap, 
  Layers 
} from 'lucide-react';

export function KnowledgeCalculators() {
  const [activeTool, setActiveTool] = useState<'cvm' | 'mixed' | 'tad' | 'aligner'>('cvm');

  // --- Tool 1: CVM Growth Stager State ---
  const [cvmFeatures, setCvmFeatures] = useState<VertebralCharacteristics>({
    c2Concavity: true,
    c3Concavity: true,
    c4Concavity: false,
    c3Shape: 'horizontal_rectangular',
    c4Shape: 'trapezoid'
  });

  const calculatedStage = determineCVMStage(cvmFeatures);
  const cvmAnalysis = analyzeCVMGrowth(calculatedStage);

  // --- Tool 2: Mixed Dentition Space Calculator State ---
  const [tooth31, setTooth31] = useState<number>(5.5);
  const [tooth32, setTooth32] = useState<number>(6.0);
  const [tooth41, setTooth41] = useState<number>(5.5);
  const [tooth42, setTooth42] = useState<number>(6.0);
  const [mandSpaceAvailable, setMandSpaceAvailable] = useState<number>(68.0);

  const mixedResult = analyzeMixedDentition(
    { tooth31, tooth32, tooth41, tooth42 },
    undefined,
    mandSpaceAvailable
  );

  // --- Tool 3: TAD Protocol State ---
  const [selectedTADSite, setSelectedTADSite] = useState<TADAnatomicalSite>('IZC');
  const tadDetails = TAD_SITE_PROTOCOLS[selectedTADSite];

  return (
    <div className="space-y-6">
      {/* Tool Navigation Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTool('cvm')}
          className={'flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ' + (
            activeTool === 'cvm'
              ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          )}
        >
          <Activity className="w-3.5 h-3.5 text-blue-600" />
          <span>CVM Growth Stager</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('mixed')}
          className={'flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ' + (
            activeTool === 'mixed'
              ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          )}
        >
          <Ruler className="w-3.5 h-3.5 text-teal-600" />
          <span>Mixed Dentition Space</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('tad')}
          className={'flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ' + (
            activeTool === 'tad'
              ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          )}
        >
          <Anchor className="w-3.5 h-3.5 text-indigo-600" />
          <span>TAD Safe-Zone Matrix</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('aligner')}
          className={'flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ' + (
            activeTool === 'aligner'
              ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          )}
        >
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          <span>Aligner Velocity Limits</span>
        </button>
      </div>

      {/* TOOL 1: CVM Growth Maturation Calculator */}
      {activeTool === 'cvm' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          {/* Left: Interactive Vertebral Morphology Selectors */}
          <Card className="lg:col-span-6 border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  Cervical Vertebral Morphology (Baccetti &amp; Franchi)
                </CardTitle>
                <Badge variant="outline" className="text-[10px] bg-white text-blue-700 border-blue-200">
                  C2 • C3 • C4 Ceph Tracing
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  1. Inferior Border Concavities (Notching)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCvmFeatures({ ...cvmFeatures, c2Concavity: !cvmFeatures.c2Concavity })}
                    className={'p-3 rounded-xl border text-left transition-all cursor-pointer ' + (
                      cvmFeatures.c2Concavity ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-300' : 'bg-slate-50 border-slate-200'
                    )}
                  >
                    <div className="text-xs font-bold text-slate-900">C2 (Odontoid)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {cvmFeatures.c2Concavity ? '✓ Concave Lower Border' : 'Flat Inferior Border'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCvmFeatures({ ...cvmFeatures, c3Concavity: !cvmFeatures.c3Concavity })}
                    className={'p-3 rounded-xl border text-left transition-all cursor-pointer ' + (
                      cvmFeatures.c3Concavity ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-300' : 'bg-slate-50 border-slate-200'
                    )}
                  >
                    <div className="text-xs font-bold text-slate-900">C3 Body</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {cvmFeatures.c3Concavity ? '✓ Concave Lower Border' : 'Flat Inferior Border'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCvmFeatures({ ...cvmFeatures, c4Concavity: !cvmFeatures.c4Concavity })}
                    className={'p-3 rounded-xl border text-left transition-all cursor-pointer ' + (
                      cvmFeatures.c4Concavity ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-300' : 'bg-slate-50 border-slate-200'
                    )}
                  >
                    <div className="text-xs font-bold text-slate-900">C4 Body</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {cvmFeatures.c4Concavity ? '✓ Concave Lower Border' : 'Flat Inferior Border'}
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  2. C3 Vertebral Body Geometric Shape
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'trapezoid', label: 'Trapezoid (Tapered)', stageHint: 'CS1–CS2' },
                    { id: 'horizontal_rectangular', label: 'Horiz. Rectangular', stageHint: 'CS3–CS4' },
                    { id: 'square', label: 'Square (1:1 Ratio)', stageHint: 'CS5' },
                    { id: 'vertical_rectangular', label: 'Vert. Rectangular', stageHint: 'CS6' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCvmFeatures({ ...cvmFeatures, c3Shape: s.id as any })}
                      className={'p-2.5 rounded-lg border text-left transition-all cursor-pointer ' + (
                        cvmFeatures.c3Shape === s.id
                          ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      )}
                    >
                      <div className="font-semibold text-xs">{s.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{s.stageHint}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  3. C4 Vertebral Body Geometric Shape
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'trapezoid', label: 'Trapezoid (Tapered)', stageHint: 'CS1–CS2' },
                    { id: 'horizontal_rectangular', label: 'Horiz. Rectangular', stageHint: 'CS3–CS4' },
                    { id: 'square', label: 'Square (1:1 Ratio)', stageHint: 'CS5' },
                    { id: 'vertical_rectangular', label: 'Vert. Rectangular', stageHint: 'CS6' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCvmFeatures({ ...cvmFeatures, c4Shape: s.id as any })}
                      className={'p-2.5 rounded-lg border text-left transition-all cursor-pointer ' + (
                        cvmFeatures.c4Shape === s.id
                          ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      )}
                    >
                      <div className="font-semibold text-xs">{s.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{s.stageHint}</div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right: Calculated CVM Clinical Guidance */}
          <Card className="lg:col-span-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader className="bg-slate-50/70 border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Biological Maturity Diagnostic</span>
                  <CardTitle className="text-base font-extrabold text-blue-900">
                    {cvmAnalysis.stageName}
                  </CardTitle>
                </div>
                <Badge className={'font-bold ' + (
                  calculatedStage === 'CS3' || calculatedStage === 'CS4'
                    ? 'bg-emerald-600 text-white'
                    : calculatedStage === 'CS5' || calculatedStage === 'CS6'
                    ? 'bg-slate-700 text-white'
                    : 'bg-blue-600 text-white'
                )}>
                  {cvmAnalysis.growthStatus.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Pubertal Growth Velocity Window</div>
                <div className="text-xs font-semibold text-slate-800 mt-0.5 leading-relaxed">
                  {cvmAnalysis.peakMandibularGrowthWindow}
                </div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t text-xs text-slate-600">
                  <span>Skeletal Growth Remaining:</span>
                  <strong className="text-blue-700 font-bold">~{cvmAnalysis.skeletalGrowthPercentageRemaining}%</strong>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Orthopedic Appliance Responsiveness
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 bg-white rounded-lg border">
                    <div className="text-[10px] text-slate-400 font-bold">Twin Block / Functional</div>
                    <div className="font-bold text-slate-800 text-xs mt-0.5">
                      {cvmAnalysis.clinicalImplications.functionalAppliancesTwinBlock}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border">
                    <div className="text-[10px] text-slate-400 font-bold">Rapid Palatal Expansion (RPE)</div>
                    <div className="font-bold text-slate-800 text-xs mt-0.5">
                      {cvmAnalysis.clinicalImplications.rapidPalatalExpansionRPE}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border">
                    <div className="text-[10px] text-slate-400 font-bold">Facemask / Protraction</div>
                    <div className="font-bold text-slate-800 text-xs mt-0.5">
                      {cvmAnalysis.clinicalImplications.maxillaryProtractionFacemask}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border">
                    <div className="text-[10px] text-slate-400 font-bold">Orthognathic Surgery Safety</div>
                    <div className="font-bold text-slate-800 text-xs mt-0.5">
                      {cvmAnalysis.clinicalImplications.orthognathicSurgeryTiming}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-950 leading-relaxed">
                <strong>Clinical Takeaway: </strong>{cvmAnalysis.recommendationSummary}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TOOL 2: Tanaka-Johnston Mixed Dentition Space Calculator */}
      {activeTool === 'mixed' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          {/* Left: Input Lower Incisor Widths */}
          <Card className="lg:col-span-6 border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-teal-600" />
                  Tanaka-Johnston Mixed Dentition Space Analysis
                </CardTitle>
                <Badge variant="outline" className="text-[10px] bg-white text-teal-700 border-teal-200">
                  FDI 31, 32, 41, 42
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter the mesiodistal widths of the 4 erupted mandibular permanent incisors to predict the widths of the unerupted permanent canines and premolars without radiation exposure:
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tooth 42 (LR Lateral)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tooth42}
                    onChange={(e) => setTooth42(Number(e.target.value))}
                    className="w-full border rounded-lg p-2.5 bg-slate-50 font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tooth 41 (LR Central)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tooth41}
                    onChange={(e) => setTooth41(Number(e.target.value))}
                    className="w-full border rounded-lg p-2.5 bg-slate-50 font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tooth 31 (LL Central)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tooth31}
                    onChange={(e) => setTooth31(Number(e.target.value))}
                    className="w-full border rounded-lg p-2.5 bg-slate-50 font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tooth 32 (LL Lateral)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tooth32}
                    onChange={(e) => setTooth32(Number(e.target.value))}
                    className="w-full border rounded-lg p-2.5 bg-slate-50 font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-2 border-t">
                <label className="font-bold text-slate-700 block mb-1 text-xs">
                  Mandibular Arch Space Available (mm)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={mandSpaceAvailable}
                  onChange={(e) => setMandSpaceAvailable(Number(e.target.value))}
                  className="w-full border rounded-lg p-2.5 bg-white font-bold text-teal-700"
                />
                <span className="text-[10px] text-slate-400">Total arch perimeter from mesial of 36 to mesial of 46</span>
              </div>
            </CardContent>
          </Card>

          {/* Right: Calculated Predictions */}
          <Card className="lg:col-span-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-teal-50/30">
            <CardHeader className="bg-slate-50/70 border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Prediction Engine Results</span>
                  <CardTitle className="text-base font-extrabold text-teal-900">
                    Space Discrepancy &amp; Leeway Budget
                  </CardTitle>
                </div>
                <Badge className="bg-teal-600 text-white font-bold">
                  Sum: {mixedResult.lowerIncisorsSum} mm
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-xl border border-teal-100 shadow-xs">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Maxillary Quadrant (3,4,5)</div>
                  <div className="text-lg font-black text-slate-800 mt-1">
                    {mixedResult.predictedMaxillaryCaninePremolarQuadrantWidth} mm
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Formula: (Sum / 2) + 11.0mm</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-teal-100 shadow-xs">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Mandibular Quadrant (3,4,5)</div>
                  <div className="text-lg font-black text-slate-800 mt-1">
                    {mixedResult.predictedMandibularCaninePremolarQuadrantWidth} mm
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Formula: (Sum / 2) + 10.5mm</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border text-xs space-y-2">
                <div className="font-bold text-slate-800 flex items-center justify-between">
                  <span>Total Mandibular Space Required:</span>
                  <span className="text-teal-700 font-bold">
                    {(mixedResult.predictedMandibularTotalRequired + mixedResult.lowerIncisorsSum).toFixed(1)} mm
                  </span>
                </div>
                <div className="font-bold text-slate-800 flex items-center justify-between">
                  <span>Space Available:</span>
                  <span className="text-slate-900 font-bold">{mandSpaceAvailable} mm</span>
                </div>
                <div className="pt-2 border-t flex items-center justify-between font-extrabold text-sm">
                  <span>Net Discrepancy:</span>
                  <span className={
                    mandSpaceAvailable - (mixedResult.predictedMandibularTotalRequired + mixedResult.lowerIncisorsSum) < 0
                      ? 'text-rose-600'
                      : 'text-emerald-600'
                  }>
                    {(mandSpaceAvailable - (mixedResult.predictedMandibularTotalRequired + mixedResult.lowerIncisorsSum)).toFixed(1)} mm
                  </span>
                </div>
              </div>

              <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl text-xs text-teal-950 leading-relaxed">
                <strong>Leeway Space Strategy: </strong>{mixedResult.spacePreservationStrategy}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TOOL 3: TAD Safe-Zone & Screw Matrix */}
      {activeTool === 'tad' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          {/* Left: Site Selector Buttons */}
          <div className="lg:col-span-4 space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Select Anatomical Insertion Zone
            </label>
            {(Object.keys(TAD_SITE_PROTOCOLS) as TADAnatomicalSite[]).map((site) => {
              const item = TAD_SITE_PROTOCOLS[site];
              const isSelected = selectedTADSite === site;

              return (
                <button
                  key={site}
                  type="button"
                  onClick={() => setSelectedTADSite(site)}
                  className={'w-full p-3 rounded-xl border text-left transition-all cursor-pointer ' + (
                    isSelected
                      ? 'bg-indigo-50 border-indigo-500 shadow-sm ring-1 ring-indigo-300'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.name}</span>
                    <Badge variant="outline" className="text-[9px] bg-white font-bold text-indigo-700 border-indigo-200">
                      {item.diameterMm}x{item.lengthMm}mm
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">{item.primaryBiomechanicalIndications[0]}</p>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Anatomical Protocol */}
          <Card className="lg:col-span-8 border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/70 border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Skeletal Anchorage Protocol</span>
                  <CardTitle className="text-base font-extrabold text-indigo-900">
                    {tadDetails.name}
                  </CardTitle>
                </div>
                <Badge className="bg-indigo-600 text-white font-bold">
                  {tadDetails.material}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 bg-slate-50 rounded-lg border">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Dimensions</div>
                  <div className="font-bold text-slate-800 text-xs mt-0.5">{tadDetails.diameterMm} mm × {tadDetails.lengthMm} mm</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Insertion Angle</div>
                  <div className="font-bold text-slate-800 text-xs mt-0.5">{tadDetails.insertionAngleDegrees.split(' ')[0]}°</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Torque Limit</div>
                  <div className="font-bold text-slate-800 text-xs mt-0.5">{tadDetails.insertionTorqueLimitNcm}</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Cortical Bone</div>
                  <div className="font-bold text-slate-800 text-xs mt-0.5">{tadDetails.corticalBoneThickness.split(',')[0]}</div>
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                  Anatomical Landmarks &amp; Safe Zone
                </div>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border">
                  {tadDetails.anatomicalLandmarks}. {tadDetails.safeZoneDepthLimits}
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                  Primary Biomechanical Indications
                </div>
                <ul className="space-y-1">
                  {tadDetails.primaryBiomechanicalIndications.map((ind, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-indigo-950 leading-relaxed">
                <strong>Complication Avoidance: </strong>{tadDetails.complicationPrecautions}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TOOL 4: Aligner Movement Velocities & Biomechanical Thresholds */}
      {activeTool === 'aligner' && (
        <Card className="border-slate-200 shadow-sm animate-in fade-in">
          <CardHeader className="bg-slate-50/70 border-b pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" />
                  Clear Aligner Movement Thresholds &amp; Staging Velocities
                </CardTitle>
                <p className="text-[11px] text-slate-500">Based on Sandra Tai (Clear Aligner Technique) &amp; Align Technology clinical guidelines</p>
              </div>
              <Badge className="bg-amber-500 text-slate-950 font-bold">
                Predictability Limits
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100/80 text-slate-700 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-2.5">Tooth Movement Type</th>
                    <th className="p-2.5">Max Velocity Per Aligner</th>
                    <th className="p-2.5">Predictability Level</th>
                    <th className="p-2.5">Required Attachment Geometry</th>
                    <th className="p-2.5">Clinical Caveat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">Incisor Mesiodistal Tipping</td>
                    <td className="p-2.5">0.25 mm / stage</td>
                    <td className="p-2.5"><Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px]">High (&gt;80%)</Badge></td>
                    <td className="p-2.5">Conventional vertical rectangular</td>
                    <td className="p-2.5">Ensure contact points are open with light IPR before tipping.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">Premolar / Canine Derotation</td>
                    <td className="p-2.5">1.5° to 2.0° / stage</td>
                    <td className="p-2.5"><Badge className="bg-amber-100 text-amber-800 border-none text-[10px]">Moderate (~60%)</Badge></td>
                    <td className="p-2.5">Optimized rotation attachment (semi-lunar bevel)</td>
                    <td className="p-2.5">Round premolars slip inside aligner plastic without attachments.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">Molar Distalization (Sequential)</td>
                    <td className="p-2.5">0.25 mm / stage</td>
                    <td className="p-2.5"><Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px]">High (~85%)</Badge></td>
                    <td className="p-2.5">Horizontal beveled on 2nd molars</td>
                    <td className="p-2.5">Sequential staging: 50% movement of 2nd molar before 1st molar begins.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">Anterior Absolute Extrusion</td>
                    <td className="p-2.5">0.10 to 0.15 mm / stage</td>
                    <td className="p-2.5"><Badge className="bg-rose-100 text-rose-800 border-none text-[10px]">Low (&lt;35%)</Badge></td>
                    <td className="p-2.5">Extrusion beveled attachment or button + elastic</td>
                    <td className="p-2.5">Most difficult movement in aligners; plastic rides off incisal edge.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">Incisor Root Torque (Lingual / Labial)</td>
                    <td className="p-2.5">1.0° to 1.5° / stage</td>
                    <td className="p-2.5"><Badge className="bg-amber-100 text-amber-800 border-none text-[10px]">Moderate (~50%)</Badge></td>
                    <td className="p-2.5">Power ridges (pressure areas in plastic)</td>
                    <td className="p-2.5">Requires overcorrection of +5° to account for aligner lag.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
