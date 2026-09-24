"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BoneDensity, 
  MISCH_BONE_DENSITY
} from '@/lib/implantology/knowledge-base/bone-classification';
import { 
  Layers, 
  Ruler, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';

export interface BoneAssessmentCardProps {
  fdiPosition: number;
  boneWidth: number;
  boneHeight: number;
  boneDensity: BoneDensity;
  isImmediateSocket: boolean;
  socketType?: 'Type-1' | 'Type-2' | 'Type-3';
  sinusFloorDistance?: number;
  ianDistance?: number;
  onWidthChange: (w: number) => void;
  onHeightChange: (h: number) => void;
  onDensityChange: (d: BoneDensity) => void;
  onImmediateSocketChange: (immediate: boolean) => void;
  onSocketTypeChange: (type: 'Type-1' | 'Type-2' | 'Type-3') => void;
}

export function BoneAssessmentCard({
  fdiPosition,
  boneWidth,
  boneHeight,
  boneDensity,
  isImmediateSocket,
  socketType = 'Type-1',
  onWidthChange,
  onHeightChange,
  onDensityChange,
  onImmediateSocketChange,
  onSocketTypeChange
}: BoneAssessmentCardProps) {
  const { isAr } = useLanguage();
  const quad = Math.floor(fdiPosition / 10);
  const tooth = fdiPosition % 10;
  const isUpper = quad === 1 || quad === 2;
  const isPosteriorUpper = isUpper && tooth >= 4;
  const isPosteriorLower = !isUpper && tooth >= 4;

  const currentDensityProfile = MISCH_BONE_DENSITY[boneDensity];

  // Derive Seibert Classification
  let seibertType = isAr ? 'سليم (كافٍ تماماً)' : 'None (Sufficient)';
  let seibertColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
  if (boneWidth < 5.5 && boneHeight >= 10.0) {
    seibertType = isAr ? 'سيبيرت 1 (نقص أفقي)' : 'Seibert Class I (Horizontal Defect)';
    seibertColor = 'bg-amber-100 text-amber-800 border-amber-200';
  } else if (boneWidth >= 5.5 && boneHeight < 8.0) {
    seibertType = isAr ? 'سيبيرت 2 (نقص رأسي)' : 'Seibert Class II (Vertical Defect)';
    seibertColor = 'bg-orange-100 text-orange-800 border-orange-200';
  } else if (boneWidth < 5.5 && boneHeight < 8.0) {
    seibertType = isAr ? 'سيبيرت 3 (نقص مركب)' : 'Seibert Class III (Combined Defect)';
    seibertColor = 'bg-rose-100 text-rose-800 border-rose-200';
  }

  // Predicted buccal plate remaining after 4.0mm implant
  const predictedBuccal = Math.max(0, (boneWidth - 4.0) * 0.4);
  const isBuccalSafe = predictedBuccal >= 1.5;

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden select-none" dir={isAr ? 'rtl' : 'ltr'}>
      <CardHeader className="p-4 sm:p-5 bg-white border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2 gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              {isAr ? 'بنية وكثافة العظم السنخي' : 'Bone Architecture & Density'}
              <Badge className={seibertColor + ' text-[10px] border'}>
                {seibertType}
              </Badge>
            </CardTitle>
            <p className="text-xs text-slate-500">
              {isAr
                ? `تصنيف Misch وتحليل أبعاد العظم بأشعة CBCT للموضع #${fdiPosition}`
                : `Misch bone classification and CBCT bone dimensional analysis for site #${fdiPosition}`
              }
            </p>
          </div>
        </div>

        {/* Immediate Socket Toggle */}
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-200 text-xs">
          <span className="font-medium text-slate-600 px-1">
            {isAr ? 'حالة السنخ:' : 'Socket Status:'}
          </span>
          <button
            type="button"
            onClick={() => onImmediateSocketChange(false)}
            className={`px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
              !isImmediateSocket 
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? 'عظم ملتئم' : 'Healed Ridge'}
          </button>
          <button
            type="button"
            onClick={() => onImmediateSocketChange(true)}
            className={`px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
              isImmediateSocket 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isAr ? 'غرس فوري عقب الخلع' : 'Immediate Extraction'}
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Elian Socket Type Selector (If Immediate) */}
        {isImmediateSocket && (
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 animate-in fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                {isAr ? 'تصنيف Elian للغرس الفوري في جيب الخلع' : 'Elian Immediate Socket Classification'}
              </span>
              <span className="text-[11px] text-blue-700 hidden sm:inline">
                {isAr ? 'يحدد طريقة ملء الفراغ والتركيب المؤقت' : 'Dictates gap management and provisionalization'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { 
                  type: 'Type-1' as const, 
                  label: isAr ? 'النوع 1 (مثالي)' : 'Type 1 (Ideal)', 
                  desc: isAr ? 'عظم ولثة سليمين تماماً' : 'Intact bone & soft tissue' 
                },
                { 
                  type: 'Type-2' as const, 
                  label: isAr ? 'النوع 2 (عظم متناقص)' : 'Type 2 (Reduced Bone)', 
                  desc: isAr ? 'لثة سليمة مع نقص بالعظم' : 'Intact soft tissue, reduced bone' 
                },
                { 
                  type: 'Type-3' as const, 
                  label: isAr ? 'النوع 3 (عجز حاد)' : 'Type 3 (Deficient)', 
                  desc: isAr ? 'فقدان بالعظم والأنسجة الرخوة' : 'Both bone & soft tissue deficient' 
                }
              ].map((s) => (
                <button
                  key={s.type}
                  type="button"
                  onClick={() => onSocketTypeChange(s.type)}
                  className={`p-2 rounded-lg border text-start transition-all cursor-pointer ${
                    socketType === s.type
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-700 border-blue-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-xs font-bold">{s.label}</div>
                  <div className={`text-[10px] mt-0.5 ${socketType === s.type ? 'text-blue-100' : 'text-slate-500'}`}>
                    {s.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Misch Density 4-Card Selector */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
            <Activity className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            {isAr ? 'تصنيف كثافة العظم وفقاً لـ Misch' : 'Misch Bone Density Classification'}
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {(['D1', 'D2', 'D3', 'D4'] as BoneDensity[]).map((d) => {
              const profile = MISCH_BONE_DENSITY[d];
              const isSelected = boneDensity === d;

              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => onDensityChange(d)}
                  className={`p-3 rounded-xl border text-start transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-200 text-teal-950 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{d}</span>
                    <Badge className={`text-[10px] ${
                      isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {profile.hounsfieldUnits.min}+ HU
                    </Badge>
                  </div>
                  <div className="text-xs font-semibold mt-1 text-slate-900 truncate">
                    {profile.name}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {profile.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bone Dimensions Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
          {/* Bone Width Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                {isAr ? 'عرض الحافة السنخية (دهليزي - لساني)' : 'Crestal Ridge Width (Bucco-Lingual)'}
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={2.0}
                  max={14.0}
                  step={0.5}
                  value={boneWidth}
                  onChange={(e) => onWidthChange(parseFloat(e.target.value) || 2.0)}
                  className="w-16 px-2 py-1 text-center text-xs font-bold font-mono border rounded-md border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-xs font-semibold text-slate-500">
                  {isAr ? 'مم' : 'mm'}
                </span>
              </div>
            </div>

            <input
              type="range"
              min={3.0}
              max={12.0}
              step={0.5}
              value={boneWidth}
              onChange={(e) => onWidthChange(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />

            {/* Visual Margin Feedback */}
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-500">
                {isAr ? 'الصفيحة العظمية الخارجية المتوقعة:' : 'Predicted Facial Plate:'}
              </span>
              <span className={`font-semibold flex items-center gap-1 ${
                isBuccalSafe ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {isBuccalSafe ? <CheckCircle2 className="w-3 h-3 shrink-0" /> : <AlertTriangle className="w-3 h-3 shrink-0" />}
                {predictedBuccal.toFixed(1)} {isAr ? 'مم' : 'mm'}{' '}
                {isBuccalSafe 
                  ? (isAr ? '(آمن ≥ 1.5 مم)' : '(Safe ≥ 1.5mm)') 
                  : (isAr ? '(ناقص < 1.5 مم)' : '(Deficient < 1.5mm)')
                }
              </span>
            </div>
          </div>

          {/* Bone Height Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                {isAr ? 'ارتفاع العظم المتاح فوق العصب/الجيب' : 'Available Bone Height (Crestal to Hazard)'}
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={3.0}
                  max={20.0}
                  step={0.5}
                  value={boneHeight}
                  onChange={(e) => onHeightChange(parseFloat(e.target.value) || 3.0)}
                  className="w-16 px-2 py-1 text-center text-xs font-bold font-mono border rounded-md border-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <span className="text-xs font-semibold text-slate-500">
                  {isAr ? 'مم' : 'mm'}
                </span>
              </div>
            </div>

            <input
              type="range"
              min={4.0}
              max={18.0}
              step={0.5}
              value={boneHeight}
              onChange={(e) => onHeightChange(parseFloat(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />

            {/* Anatomical Hazard Feedback */}
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-500">
                {isPosteriorUpper 
                  ? (isAr ? 'قاع الجيب الفكي:' : 'Subantral Floor:') 
                  : isPosteriorLower 
                  ? (isAr ? 'هامش القناة العصبية IAN:' : 'IAN Canal Margin:') 
                  : (isAr ? 'قشرة العظم الذروية:' : 'Apical Cortex:')
                }
              </span>
              <span className={`font-semibold ${
                boneHeight >= 10.0 ? 'text-emerald-700' : boneHeight >= 6.0 ? 'text-amber-700' : 'text-rose-700'
              }`}>
                {boneHeight >= 10.0 
                  ? (isAr ? 'زرعة قياسية 10-12 مم متاحة بأمان' : 'Standard 10-12mm fixture feasible') 
                  : boneHeight >= 6.0 
                  ? (isAr ? 'زرعة قصيرة أو رفع جيب بسيط مطلوب' : 'Short fixture or elevation required') 
                  : (isAr ? 'يلزم تطعيم عظمي رأسي واسع' : 'Extensive vertical grafting needed')
                }
              </span>
            </div>
          </div>
        </div>

        {/* Real-Time Surgical Protocol Advice */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs">
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="space-y-1">
            <div className="font-bold text-slate-900">
              {isAr 
                ? `استراتيجية الحفر والتجهيز لكثافة ${boneDensity} (${currentDensityProfile.name}):` 
                : `Drilling Strategy for ${boneDensity} (${currentDensityProfile.name}):`
              }
            </div>
            <p className="text-slate-600">
              {currentDensityProfile.drillingProtocol}{' '}
              {isAr ? 'الثبات الأولي المتوقع:' : 'Expected Primary Stability ISQ:'}{' '}
              {currentDensityProfile.expectedISQ.min} - {currentDensityProfile.expectedISQ.max} ISQ.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
