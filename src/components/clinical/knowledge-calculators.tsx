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
import { useLanguage } from '@/lib/i18n/language-context';

export function KnowledgeCalculators() {
  const [activeTool, setActiveTool] = useState<'cvm' | 'mixed' | 'tad' | 'aligner'>('cvm');
  const { isAr } = useLanguage();

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
    <div className="space-y-6 select-none" dir={isAr ? 'rtl' : 'ltr'}>
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
          <span>{isAr ? 'مرحلة نمو الفقرات CVM' : 'CVM Growth Stager'}</span>
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
          <span>{isAr ? 'مسافات الأسنان المختلطة' : 'Mixed Dentition Space'}</span>
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
          <span>{isAr ? 'مناطق أمان زرعات TADs' : 'TAD Safe-Zone Matrix'}</span>
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
          <span>{isAr ? 'السرعات البيولوجية للألاينرز' : 'Aligner Velocity Limits'}</span>
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
                  {isAr ? 'مورفولوجيا الفقرات العنقية (Baccetti & Franchi)' : 'Cervical Vertebral Morphology (Baccetti & Franchi)'}
                </CardTitle>
                <Badge variant="outline" className="text-[10px] bg-white text-blue-700 border-blue-200">
                  {isAr ? 'تتبع الفقرات C2 • C3 • C4 شعاعياً' : 'C2 • C3 • C4 Ceph Tracing'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  {isAr ? '1. التقعر في الحافة السفلية للفقرات (Inferior Concavity)' : '1. Inferior Border Concavities (Notching)'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCvmFeatures({ ...cvmFeatures, c2Concavity: !cvmFeatures.c2Concavity })}
                    className={'p-3 rounded-xl border text-left transition-all cursor-pointer ' + (
                      cvmFeatures.c2Concavity ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-300' : 'bg-slate-50 border-slate-200'
                    )}
                  >
                    <div className="text-xs font-bold text-slate-900">{isAr ? 'الفقرة C2 (المحور Odontoid)' : 'C2 (Odontoid)'}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {cvmFeatures.c2Concavity 
                        ? (isAr ? '✓ تقعر بالحافة السفلية' : '✓ Concave Lower Border') 
                        : (isAr ? 'حافة سفلية مستوية' : 'Flat Inferior Border')}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCvmFeatures({ ...cvmFeatures, c3Concavity: !cvmFeatures.c3Concavity })}
                    className={'p-3 rounded-xl border text-left transition-all cursor-pointer ' + (
                      cvmFeatures.c3Concavity ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-300' : 'bg-slate-50 border-slate-200'
                    )}
                  >
                    <div className="text-xs font-bold text-slate-900">{isAr ? 'جسم الفقرة C3' : 'C3 Body'}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {cvmFeatures.c3Concavity 
                        ? (isAr ? '✓ تقعر بالحافة السفلية' : '✓ Concave Lower Border') 
                        : (isAr ? 'حافة سفلية مستوية' : 'Flat Inferior Border')}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCvmFeatures({ ...cvmFeatures, c4Concavity: !cvmFeatures.c4Concavity })}
                    className={'p-3 rounded-xl border text-left transition-all cursor-pointer ' + (
                      cvmFeatures.c4Concavity ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-300' : 'bg-slate-50 border-slate-200'
                    )}
                  >
                    <div className="text-xs font-bold text-slate-900">{isAr ? 'جسم الفقرة C4' : 'C4 Body'}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {cvmFeatures.c4Concavity 
                        ? (isAr ? '✓ تقعر بالحافة السفلية' : '✓ Concave Lower Border') 
                        : (isAr ? 'حافة سفلية مستوية' : 'Flat Inferior Border')}
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  {isAr ? '2. الشكل الهندسي لجسم الفقرة الثالثة C3' : '2. C3 Vertebral Body Geometric Shape'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'trapezoid', labelEn: 'Trapezoid (Tapered)', labelAr: 'شبه منحرف (Trapezoid)', stageHint: 'CS1–CS2' },
                    { id: 'horizontal_rectangular', labelEn: 'Horiz. Rectangular', labelAr: 'مستطيل أفقي (Horiz. Rectangular)', stageHint: 'CS3–CS4' },
                    { id: 'square', labelEn: 'Square (1:1 Ratio)', labelAr: 'مربع (Square 1:1)', stageHint: 'CS5' },
                    { id: 'vertical_rectangular', labelEn: 'Vert. Rectangular', labelAr: 'مستطيل رأسي (Vert. Rectangular)', stageHint: 'CS6' }
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
                      <div className="font-semibold text-xs">{isAr ? s.labelAr : s.labelEn}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{s.stageHint}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  {isAr ? '3. الشكل الهندسي لجسم الفقرة الرابعة C4' : '3. C4 Vertebral Body Geometric Shape'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'trapezoid', labelEn: 'Trapezoid (Tapered)', labelAr: 'شبه منحرف (Trapezoid)', stageHint: 'CS1–CS2' },
                    { id: 'horizontal_rectangular', labelEn: 'Horiz. Rectangular', labelAr: 'مستطيل أفقي (Horiz. Rectangular)', stageHint: 'CS3–CS4' },
                    { id: 'square', labelEn: 'Square (1:1 Ratio)', labelAr: 'مربع (Square 1:1)', stageHint: 'CS5' },
                    { id: 'vertical_rectangular', labelEn: 'Vert. Rectangular', labelAr: 'مستطيل رأسي (Vert. Rectangular)', stageHint: 'CS6' }
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
                      <div className="font-semibold text-xs">{isAr ? s.labelAr : s.labelEn}</div>
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
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {isAr ? 'تشخيص النضج الحيوي والنمو الهيكلي' : 'Biological Maturity Diagnostic'}
                  </span>
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
                  {isAr 
                    ? (cvmAnalysis.growthStatus === 'pre-peak' 
                        ? 'قبل طفرة النمو (Pre-Peak)' 
                        : cvmAnalysis.growthStatus === 'peak-velocity' 
                        ? 'ذروة طفرة النمو (Peak Velocity)' 
                        : cvmAnalysis.growthStatus === 'decelerating'
                        ? 'تباطؤ النمو (Decelerating)'
                        : 'بعد اكتمال طفرة النمو (Post-Peak)')
                    : cvmAnalysis.growthStatus.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase">
                  {isAr ? 'نافذة طفرة وسرعة النمو البلوغي' : 'Pubertal Growth Velocity Window'}
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-0.5 leading-relaxed">
                  {cvmAnalysis.peakMandibularGrowthWindow}
                </div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t text-xs text-slate-600">
                  <span>{isAr ? 'النمو الهيكلي المتبقي في الفكين:' : 'Skeletal Growth Remaining:'}</span>
                  <strong className="text-blue-700 font-bold">~{cvmAnalysis.skeletalGrowthPercentageRemaining}%</strong>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  {isAr ? 'مدى الاستجابة للأجهزة التقويمية الوظيفية' : 'Orthopedic Appliance Responsiveness'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 bg-white rounded-lg border">
                    <div className="text-[10px] text-slate-400 font-bold">
                      {isAr ? 'الأجهزة الوظيفية (Twin Block)' : 'Twin Block / Functional'}
                    </div>
                    <div className="font-bold text-slate-800 text-xs mt-0.5">
                      {cvmAnalysis.clinicalImplications.functionalAppliancesTwinBlock}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border">
                    <div className="text-[10px] text-slate-400 font-bold">
                      {isAr ? 'توسيع الفك السريع (RPE)' : 'Rapid Palatal Expansion (RPE)'}
                    </div>
                    <div className="font-bold text-slate-800 text-xs mt-0.5">
                      {cvmAnalysis.clinicalImplications.rapidPalatalExpansionRPE}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border">
                    <div className="text-[10px] text-slate-400 font-bold">
                      {isAr ? 'قناع الوجه للشد العظمي (Facemask)' : 'Facemask / Protraction'}
                    </div>
                    <div className="font-bold text-slate-800 text-xs mt-0.5">
                      {cvmAnalysis.clinicalImplications.maxillaryProtractionFacemask}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border">
                    <div className="text-[10px] text-slate-400 font-bold">
                      {isAr ? 'أمان وتوقيت جراحة الفكين' : 'Orthognathic Surgery Safety'}
                    </div>
                    <div className="font-bold text-slate-800 text-xs mt-0.5">
                      {cvmAnalysis.clinicalImplications.orthognathicSurgeryTiming}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-950 leading-relaxed">
                <strong>{isAr ? 'الخلاصة والتوصية السريرية: ' : 'Clinical Takeaway: '}</strong>{cvmAnalysis.recommendationSummary}
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
                  {isAr ? 'تحليل مسافات التسنين المختلط (Tanaka-Johnston)' : 'Tanaka-Johnston Mixed Dentition Space Analysis'}
                </CardTitle>
                <Badge variant="outline" className="text-[10px] bg-white text-teal-700 border-teal-200">
                  {isAr ? 'قواطع الفك السفلي 31, 32, 41, 42' : 'FDI 31, 32, 41, 42'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr 
                  ? 'أدخل قياس العرض الإنسي الوحشي (Mesiodistal Widths) للقواطع السفلية الدائمة الأربعة لحساب المسافة المتوقعة لبزوغ الأنياب والضواحك بدقة وبدون تعريض الطفل للأشعة:'
                  : 'Enter the mesiodistal widths of the 4 erupted mandibular permanent incisors to predict the widths of the unerupted permanent canines and premolars without radiation exposure:'}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isAr ? 'القاطع الجانبي السفلي الأيمن (Tooth 42)' : 'Tooth 42 (LR Lateral)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={tooth42}
                    onChange={(e) => setTooth42(Number(e.target.value))}
                    className="w-full border rounded-lg p-2.5 bg-slate-50 font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isAr ? 'القاطع المركزي السفلي الأيمن (Tooth 41)' : 'Tooth 41 (LR Central)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={tooth41}
                    onChange={(e) => setTooth41(Number(e.target.value))}
                    className="w-full border rounded-lg p-2.5 bg-slate-50 font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isAr ? 'القاطع المركزي السفلي الأيسر (Tooth 31)' : 'Tooth 31 (LL Central)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={tooth31}
                    onChange={(e) => setTooth31(Number(e.target.value))}
                    className="w-full border rounded-lg p-2.5 bg-slate-50 font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isAr ? 'القاطع الجانبي السفلي الأيسر (Tooth 32)' : 'Tooth 32 (LL Lateral)'}
                  </label>
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
                  {isAr ? 'المسافة المتاحة في القوس السفلي (ملم)' : 'Mandibular Arch Space Available (mm)'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={mandSpaceAvailable}
                  onChange={(e) => setMandSpaceAvailable(Number(e.target.value))}
                  className="w-full border rounded-lg p-2.5 bg-white font-bold text-teal-700"
                />
                <span className="text-[10px] text-slate-400">
                  {isAr ? 'محيط القوس الإجمالي من إنسي الضرس 36 إلى إنسي الضرس 46' : 'Total arch perimeter from mesial of 36 to mesial of 46'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Right: Calculated Predictions */}
          <Card className="lg:col-span-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-teal-50/30">
            <CardHeader className="bg-slate-50/70 border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {isAr ? 'نتائج محرك التنبؤ بالمساحة' : 'Prediction Engine Results'}
                  </span>
                  <CardTitle className="text-base font-extrabold text-teal-900">
                    {isAr ? 'عجز المسافة والمساحة الاحتياطية (Leeway Space)' : 'Space Discrepancy & Leeway Budget'}
                  </CardTitle>
                </div>
                <Badge className="bg-teal-600 text-white font-bold">
                  {isAr ? `المجموع: ${mixedResult.lowerIncisorsSum} ملم` : `Sum: ${mixedResult.lowerIncisorsSum} mm`}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-xl border border-teal-100 shadow-xs">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    {isAr ? 'الربع العلوي (الأنياب والضواحك 3,4,5)' : 'Maxillary Quadrant (3,4,5)'}
                  </div>
                  <div className="text-lg font-black text-slate-800 mt-1">
                    {mixedResult.predictedMaxillaryCaninePremolarQuadrantWidth} {isAr ? 'ملم' : 'mm'}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {isAr ? 'المعادلة: (المجموع ÷ 2) + 11.0 ملم' : 'Formula: (Sum / 2) + 11.0mm'}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-teal-100 shadow-xs">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    {isAr ? 'الربع السفلي (الأنياب والضواحك 3,4,5)' : 'Mandibular Quadrant (3,4,5)'}
                  </div>
                  <div className="text-lg font-black text-slate-800 mt-1">
                    {mixedResult.predictedMandibularCaninePremolarQuadrantWidth} {isAr ? 'ملم' : 'mm'}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {isAr ? 'المعادلة: (المجموع ÷ 2) + 10.5 ملم' : 'Formula: (Sum / 2) + 10.5mm'}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border text-xs space-y-2">
                <div className="font-bold text-slate-800 flex items-center justify-between">
                  <span>{isAr ? 'إجمالي المسافة المطلوبة في الفك السفلي:' : 'Total Mandibular Space Required:'}</span>
                  <span className="text-teal-700 font-bold">
                    {(mixedResult.predictedMandibularTotalRequired + mixedResult.lowerIncisorsSum).toFixed(1)} {isAr ? 'ملم' : 'mm'}
                  </span>
                </div>
                <div className="font-bold text-slate-800 flex items-center justify-between">
                  <span>{isAr ? 'المسافة المتاحة في القوس:' : 'Space Available:'}</span>
                  <span className="text-slate-900 font-bold">{mandSpaceAvailable} {isAr ? 'ملم' : 'mm'}</span>
                </div>
                <div className="pt-2 border-t flex items-center justify-between font-extrabold text-sm">
                  <span>{isAr ? 'صافي العجز أو الفائض في المسافة:' : 'Net Discrepancy:'}</span>
                  <span className={
                    mandSpaceAvailable - (mixedResult.predictedMandibularTotalRequired + mixedResult.lowerIncisorsSum) < 0
                      ? 'text-rose-600'
                      : 'text-emerald-600'
                  }>
                    {(mandSpaceAvailable - (mixedResult.predictedMandibularTotalRequired + mixedResult.lowerIncisorsSum)).toFixed(1)} {isAr ? 'ملم' : 'mm'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl text-xs text-teal-950 leading-relaxed">
                <strong>{isAr ? 'استراتيجية مسافة ليواي الاحتياطية (Leeway Strategy): ' : 'Leeway Space Strategy: '}</strong>
                {mixedResult.spacePreservationStrategy}
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
              {isAr ? 'اختر موقع الغرس التشريحي (Anatomical Zone)' : 'Select Anatomical Insertion Zone'}
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
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {isAr ? 'بروتوكول المرسى العظمي والتثبيت الهيكلي' : 'Skeletal Anchorage Protocol'}
                  </span>
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
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    {isAr ? 'الأبعاد والقياس' : 'Dimensions'}
                  </div>
                  <div className="font-bold text-slate-800 text-xs mt-0.5">{tadDetails.diameterMm} mm × {tadDetails.lengthMm} mm</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    {isAr ? 'زاوية الغرس' : 'Insertion Angle'}
                  </div>
                  <div className="font-bold text-slate-800 text-xs mt-0.5">{tadDetails.insertionAngleDegrees.split(' ')[0]}°</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    {isAr ? 'حد عزم الربط' : 'Torque Limit'}
                  </div>
                  <div className="font-bold text-slate-800 text-xs mt-0.5">{tadDetails.insertionTorqueLimitNcm}</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    {isAr ? 'سماكة العظم القشري' : 'Cortical Bone'}
                  </div>
                  <div className="font-bold text-slate-800 text-xs mt-0.5">{tadDetails.corticalBoneThickness.split(',')[0]}</div>
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                  {isAr ? 'المعالم التشريحية ومناطق الأمان (Safe Zones)' : 'Anatomical Landmarks & Safe Zone'}
                </div>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border">
                  {tadDetails.anatomicalLandmarks}. {tadDetails.safeZoneDepthLimits}
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                  {isAr ? 'دواعي الاستخدام البيوميكانيكية الأساسية' : 'Primary Biomechanical Indications'}
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
                <strong>{isAr ? 'الوقاية من المضاعفات والمحاذير السريرية: ' : 'Complication Avoidance: '}</strong>
                {tadDetails.complicationPrecautions}
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
                  {isAr ? 'الحدود البيولوجية وسرعات حركة التقويم الشفاف (Aligners)' : 'Clear Aligner Movement Thresholds & Staging Velocities'}
                </CardTitle>
                <p className="text-[11px] text-slate-500">
                  {isAr 
                    ? 'وفقاً لإرشادات الدكتورة ساندرا تاي ومحددات شركة Align Technology السريرية'
                    : 'Based on Sandra Tai (Clear Aligner Technique) & Align Technology clinical guidelines'}
                </p>
              </div>
              <Badge className="bg-amber-500 text-slate-950 font-bold">
                {isAr ? 'محددات دقة وتوقع الحركة' : 'Predictability Limits'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100/80 text-slate-700 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-2.5">{isAr ? 'نوع حركة السن (Tooth Movement)' : 'Tooth Movement Type'}</th>
                    <th className="p-2.5">{isAr ? 'أقصى سرعة لكل قالب (Max Velocity)' : 'Max Velocity Per Aligner'}</th>
                    <th className="p-2.5">{isAr ? 'مستوى التوقع (Predictability)' : 'Predictability Level'}</th>
                    <th className="p-2.5">{isAr ? 'المثبتات المطلوبة (Attachments)' : 'Required Attachment Geometry'}</th>
                    <th className="p-2.5">{isAr ? 'الملاحظة والمحاذير السريرية (Clinical Caveat)' : 'Clinical Caveat'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">
                      {isAr ? 'إمالة القواطع إنسياً أو وحشياً (Tipping)' : 'Incisor Mesiodistal Tipping'}
                    </td>
                    <td className="p-2.5">{isAr ? '0.25 ملم / لكل قالب' : '0.25 mm / stage'}</td>
                    <td className="p-2.5"><Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px]">{isAr ? 'عالي (>80%)' : 'High (>80%)'}</Badge></td>
                    <td className="p-2.5">{isAr ? 'مثبتات مستطيلة عمودية تقليدية (Vertical Rectangular)' : 'Conventional vertical rectangular'}</td>
                    <td className="p-2.5">{isAr ? 'يجب فتح نقاط التماس ببرد سني خفيف (IPR) قبل بدء الإمالة.' : 'Ensure contact points are open with light IPR before tipping.'}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">
                      {isAr ? 'تدوير الضواحك والأنياب (Derotation)' : 'Premolar / Canine Derotation'}
                    </td>
                    <td className="p-2.5">{isAr ? '1.5° إلى 2.0° / لكل قالب' : '1.5° to 2.0° / stage'}</td>
                    <td className="p-2.5"><Badge className="bg-amber-100 text-amber-800 border-none text-[10px]">{isAr ? 'متوسط (~60%)' : 'Moderate (~60%)'}</Badge></td>
                    <td className="p-2.5">{isAr ? 'مثبتات تدوير محسنة شبه هلالية مشطوفة (Optimized Rotation)' : 'Optimized rotation attachment (semi-lunar bevel)'}</td>
                    <td className="p-2.5">{isAr ? 'الضواحك المستديرة تنزلق داخل بلاستيك التقويم بدون مثبتات حركية.' : 'Round premolars slip inside aligner plastic without attachments.'}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">
                      {isAr ? 'إرجاع الأضراس المتسلسل (Molar Distalization)' : 'Molar Distalization (Sequential)'}
                    </td>
                    <td className="p-2.5">{isAr ? '0.25 ملم / لكل قالب' : '0.25 mm / stage'}</td>
                    <td className="p-2.5"><Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px]">{isAr ? 'عالي (~85%)' : 'High (~85%)'}</Badge></td>
                    <td className="p-2.5">{isAr ? 'مثبتات أفقية مشطوفة على الأضراس الثانية (Horizontal Beveled)' : 'Horizontal beveled on 2nd molars'}</td>
                    <td className="p-2.5">{isAr ? 'تدرج متسلسل: إتمام 50% من حركة الضرس الثاني قبل تحريك الضرس الأول.' : 'Sequential staging: 50% movement of 2nd molar before 1st molar begins.'}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">
                      {isAr ? 'البثق العمودي الصافي للقواطع (Extrusion)' : 'Anterior Absolute Extrusion'}
                    </td>
                    <td className="p-2.5">{isAr ? '0.10 إلى 0.15 ملم / لكل قالب' : '0.10 to 0.15 mm / stage'}</td>
                    <td className="p-2.5"><Badge className="bg-rose-100 text-rose-800 border-none text-[10px]">{isAr ? 'صعب ومنخفض التوقع (<35%)' : 'Low (<35%)'}</Badge></td>
                    <td className="p-2.5">{isAr ? 'مثبتات بثق مشطوفة أو زر مع مطاط مساعد (Button + Elastic)' : 'Extrusion beveled attachment or button + elastic'}</td>
                    <td className="p-2.5">{isAr ? 'أصعب حركة في الألاينرز؛ البلاستيك ينزلق فوق الحد القاطع دون تحريكه.' : 'Most difficult movement in aligners; plastic rides off incisal edge.'}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">
                      {isAr ? 'عزم دوران جذور القواطع (Root Torque)' : 'Incisor Root Torque (Lingual / Labial)'}
                    </td>
                    <td className="p-2.5">{isAr ? '1.0° إلى 1.5° / لكل قالب' : '1.0° to 1.5° / stage'}</td>
                    <td className="p-2.5"><Badge className="bg-amber-100 text-amber-800 border-none text-[10px]">{isAr ? 'متوسط (~50%)' : 'Moderate (~50%)'}</Badge></td>
                    <td className="p-2.5">{isAr ? 'أشرطة ضغط حركية في البلاستيك (Power Ridges)' : 'Power ridges (pressure areas in plastic)'}</td>
                    <td className="p-2.5">{isAr ? 'يتطلب تعويضاً إضافياً بمقدار +5° لمعالجة تخلف استجابة البلاستيك.' : 'Requires overcorrection of +5° to account for aligner lag.'}</td>
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
