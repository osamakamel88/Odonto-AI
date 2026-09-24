"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getToothName } from '@/lib/orthodontics/tooth-notation';
import { 
  Sparkles, 
  Drill, 
  Layers, 
  Activity 
} from 'lucide-react';
import { 
  STUDIO_DICTIONARY, 
  StudioLanguage, 
  TOOTH_RECOMMENDATIONS_AR 
} from '@/lib/i18n/studio-dictionary';

export type ToothStatus = 'healthy' | 'caries' | 'restoration' | 'missing' | 'impacted' | 'extraction_planned' | 'tad_site';

export interface ToothChartProps {
  initialStatuses?: Record<number, ToothStatus>;
  onChange?: (statuses: Record<number, ToothStatus>) => void;
  readOnly?: boolean;
  lang?: StudioLanguage;
}

const UPPER_TEETH = [
  // Upper Right (18 down to 11)
  18, 17, 16, 15, 14, 13, 12, 11,
  // Upper Left (21 up to 28)
  21, 22, 23, 24, 25, 26, 27, 28
];

const LOWER_TEETH = [
  // Lower Right (48 down to 41)
  48, 47, 46, 45, 44, 43, 42, 41,
  // Lower Left (31 up to 38)
  31, 32, 33, 34, 35, 36, 37, 38
];

const STATUS_COLOR_CONFIG: Record<ToothStatus, { color: string; bg: string; border: string }> = {
  healthy: { color: 'text-slate-700', bg: 'bg-white hover:bg-slate-50', border: 'border-slate-300' },
  caries: { color: 'text-rose-700', bg: 'bg-rose-100 hover:bg-rose-200', border: 'border-rose-400' },
  restoration: { color: 'text-blue-700', bg: 'bg-blue-100 hover:bg-blue-200', border: 'border-blue-400' },
  missing: { color: 'text-slate-400', bg: 'bg-slate-200 line-through', border: 'border-slate-400' },
  impacted: { color: 'text-purple-700', bg: 'bg-purple-100 hover:bg-purple-200', border: 'border-purple-400' },
  extraction_planned: { color: 'text-amber-800', bg: 'bg-amber-200 font-bold', border: 'border-amber-500' },
  tad_site: { color: 'text-teal-800', bg: 'bg-teal-200', border: 'border-teal-500' }
};

interface ToothClinicalRecommendation {
  condition: string;
  clinicalDecision: string;
  phase: string;
  urgency: 'high' | 'medium' | 'routine';
  protocolNotes: string;
}

const getRecommendationEn = (tooth: number, status: ToothStatus): ToothClinicalRecommendation => {
  switch (status) {
    case 'caries':
      return {
        condition: 'Active Coronal Radiolucency (Enamel-Dentin)',
        clinicalDecision: 'Direct Resin Composite Restoration before bracket bonding',
        phase: 'Phase 3: Restorative & Endo',
        urgency: 'high',
        protocolNotes: 'Ensure 0 bleeding on probing & sound marginal enamel margin.'
      };
    case 'missing':
      return {
        condition: 'Edentulous Ridge / Congenitally Absent',
        clinicalDecision: 'Orthodontic Space Opening / Consolidation & Implant Placement',
        phase: 'Phase 5: Implantology & Surgery',
        urgency: 'medium',
        protocolNotes: 'Verify 7.0mm mesiodistal space and 1.5mm buccal cortical plate rule.'
      };
    case 'impacted':
      return {
        condition: 'Complete Alveolar Impaction / Eruption Failure',
        clinicalDecision: 'Surgical Exposure & Gold Chain Cantilever Traction (or Extraction)',
        phase: 'Phase 4: Orthodontic Biomechanics',
        urgency: 'high',
        protocolNotes: 'CBCT 3D localization to assess adjacent root resorption risk.'
      };
    case 'extraction_planned':
      return {
        condition: 'Severe Arch Perimeter Crowding Discrepancy',
        clinicalDecision: 'Therapeutic Premolar Extraction for En-Masse Retraction',
        phase: 'Phase 4: Orthodontic Biomechanics',
        urgency: 'high',
        protocolNotes: 'Preserve posterior anchorage and apply negative central incisor torque.'
      };
    case 'tad_site':
      return {
        condition: 'Skeletal Absolute Anchorage Indication',
        clinicalDecision: 'Interradicular / Infrazygomatic Crest (IZC) Miniscrew Insertion',
        phase: 'Phase 4: Orthodontic Biomechanics',
        urgency: 'medium',
        protocolNotes: 'Verify 1.0mm periodontal ligament clearance & 8-10 Ncm insertion torque.'
      };
    case 'restoration':
      return {
        condition: 'Existing Stable Restoration',
        clinicalDecision: 'Evaluate marginal integrity & etch porcelain with HF acid if applicable',
        phase: 'Phase 3: Restorative & Endo',
        urgency: 'routine',
        protocolNotes: 'Verify secondary caries absence via bitewing radiographs.'
      };
    default:
      return {
        condition: 'Sound / Healthy Dentition',
        clinicalDecision: 'Standard bracket bonding & direct alignment',
        phase: 'Phase 4: Orthodontic Biomechanics',
        urgency: 'routine',
        protocolNotes: 'Prophylaxis & 37% phosphoric acid etching.'
      };
  }
};

const ARABIC_TOOTH_NAMES: Record<number, string> = {
  18: 'ضرس العقل العلوي الأيمن (18)',
  17: 'الضرس الثاني العلوي الأيمن (17)',
  16: 'الضرس الأول العلوي الأيمن (16)',
  15: 'الضاحك الثاني العلوي الأيمن (15)',
  14: 'الضاحك الأول العلوي الأيمن (14)',
  13: 'الناب العلوي الأيمن (13)',
  12: 'القاطع الجانبي العلوي الأيمن (12)',
  11: 'القاطع المركزي العلوي الأيمن (11)',
  21: 'القاطع المركزي العلوي الأيسر (21)',
  22: 'القاطع الجانبي العلوي الأيسر (22)',
  23: 'الناب العلوي الأيسر (23)',
  24: 'الضاحك الأول العلوي الأيسر (24)',
  25: 'الضاحك الثاني العلوي الأيسر (25)',
  26: 'الضرس الأول العلوي الأيسر (26)',
  27: 'الضرس الثاني العلوي الأيسر (27)',
  28: 'ضرس العقل العلوي الأيسر (28)',
  38: 'ضرس العقل السفلي الأيسر (38)',
  37: 'الضرس الثاني السفلي الأيسر (37)',
  36: 'الضرس الأول السفلي الأيسر (36)',
  35: 'الضاحك الثاني السفلي الأيسر (35)',
  34: 'الضاحك الأول السفلي الأيسر (34)',
  33: 'الناب السفلي الأيسر (33)',
  32: 'القاطع الجانبي السفلي الأيسر (32)',
  31: 'القاطع المركزي السفلي الأيسر (31)',
  41: 'القاطع المركزي السفلي الأيمن (41)',
  42: 'القاطع الجانبي السفلي الأيمن (42)',
  43: 'الناب السفلي الأيمن (43)',
  44: 'الضاحك الأول السفلي الأيمن (44)',
  45: 'الضاحك الثاني السفلي الأيمن (45)',
  46: 'الضرس الأول السفلي الأيمن (46)',
  47: 'الضرس الثاني السفلي الأيمن (47)',
  48: 'ضرس العقل السفلي الأيمن (48)',
};

export function ToothChart({ 
  initialStatuses = {}, 
  onChange, 
  readOnly = false,
  lang = 'en'
}: ToothChartProps) {
  const t = STUDIO_DICTIONARY[lang] || STUDIO_DICTIONARY.en;
  const isAr = lang === 'ar';

  const [statuses, setStatuses] = useState<Record<number, ToothStatus>>({
    16: 'caries',
    18: 'impacted',
    25: 'restoration',
    28: 'impacted',
    36: 'missing',
    38: 'impacted',
    46: 'restoration',
    48: 'impacted',
    ...initialStatuses
  });

  const [activeTool, setActiveTool] = useState<ToothStatus>('extraction_planned');
  const [hoveredTooth, setHoveredTooth] = useState<number | null>(null);
  const [breakdownFilter, setBreakdownFilter] = useState<'all' | 'caries' | 'extractions' | 'implants'>('all');

  const handleToothClick = (tooth: number) => {
    if (readOnly) return;
    const current = statuses[tooth] || 'healthy';
    const next = current === activeTool ? 'healthy' : activeTool;
    const updated = { ...statuses, [tooth]: next };
    setStatuses(updated);
    if (onChange) onChange(updated);
  };

  const getToothNameSafe = (tooth: number) => {
    if (isAr && ARABIC_TOOTH_NAMES[tooth]) {
      return ARABIC_TOOTH_NAMES[tooth];
    }
    try {
      return getToothName(tooth.toString());
    } catch {
      return `Tooth #${tooth}`;
    }
  };

  const getRecommendation = (tooth: number, status: ToothStatus): ToothClinicalRecommendation => {
    if (isAr && TOOTH_RECOMMENDATIONS_AR[status]) {
      return TOOTH_RECOMMENDATIONS_AR[status];
    }
    return getRecommendationEn(tooth, status);
  };

  // Compile list of all affected teeth
  const affectedTeeth = Object.entries(statuses)
    .filter(([_, status]) => status !== 'healthy')
    .map(([toothStr, status]) => {
      const toothNum = Number(toothStr);
      return {
        toothNum,
        name: getToothNameSafe(toothNum),
        status,
        recommendation: getRecommendation(toothNum, status)
      };
    })
    .sort((a, b) => a.toothNum - b.toothNum);

  const filteredAffectedTeeth = breakdownFilter === 'all'
    ? affectedTeeth
    : breakdownFilter === 'caries'
    ? affectedTeeth.filter(t => t.status === 'caries' || t.status === 'restoration')
    : breakdownFilter === 'extractions'
    ? affectedTeeth.filter(t => t.status === 'extraction_planned' || t.status === 'impacted' || t.status === 'tad_site')
    : affectedTeeth.filter(t => t.status === 'missing');

  return (
    <Card className="shadow-sm border-slate-200" dir={isAr ? 'rtl' : 'ltr'}>
      <CardHeader className="pb-3 border-b bg-slate-50/50 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>{t.toothChartTitle}</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] font-mono">
              32-Tooth FDI
            </Badge>
          </CardTitle>
          <p className="text-xs text-slate-500">
            {t.toothChartSubtitle}
          </p>
        </div>

        {/* Hovered Tooth Info */}
        <div className={isAr ? "text-left" : "text-right"}>
          {hoveredTooth ? (
            <div className="text-xs">
              <span className="font-bold text-blue-700">#{hoveredTooth}</span>
              <span className="text-slate-500 block text-[11px] truncate max-w-[200px]">{getToothNameSafe(hoveredTooth)}</span>
            </div>
          ) : (
            <span className="text-xs text-slate-400">{t.clickToUpdate}</span>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Tool Palette */}
        {!readOnly && (
          <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-100 rounded-lg text-xs">
            <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
              <Activity className="w-3 h-3 text-slate-500" />
              {t.activeBrush}
            </span>
            {(Object.keys(t.statuses) as ToothStatus[]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setActiveTool(st)}
                className={`px-2.5 py-1 rounded text-[11px] transition-all border cursor-pointer ${
                  activeTool === st 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-bold' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 font-medium'
                }`}
              >
                {t.statuses[st]}
              </button>
            ))}
          </div>
        )}

        {/* Dental Arches Representation */}
        <div className="space-y-6 py-2">
          {/* Upper Arch */}
          <div>
            <div className="text-center text-[11px] font-bold text-slate-500 mb-1.5 tracking-wider uppercase">
              {t.upperArch}
            </div>
            <div className="flex justify-center items-center gap-1 overflow-x-auto pb-1" dir="ltr">
              {UPPER_TEETH.map((tNum, idx) => {
                const status = statuses[tNum] || 'healthy';
                const colorCfg = STATUS_COLOR_CONFIG[status];
                const isMidline = idx === 7;

                return (
                  <React.Fragment key={tNum}>
                    <button
                      type="button"
                      onClick={() => handleToothClick(tNum)}
                      onMouseEnter={() => setHoveredTooth(tNum)}
                      onMouseLeave={() => setHoveredTooth(null)}
                      className={`w-8 h-12 rounded border text-xs font-semibold flex flex-col items-center justify-between p-1 transition-all cursor-pointer ${colorCfg.bg} ${colorCfg.border} ${colorCfg.color} ${
                        hoveredTooth === tNum ? 'ring-2 ring-blue-500 scale-105 z-10 shadow-sm' : ''
                      }`}
                      title={`#${tNum} - ${getToothNameSafe(tNum)} (${t.statuses[status]})`}
                    >
                      <span className="text-[9px] font-mono font-bold">{tNum}</span>
                      <div className="w-2.5 h-2.5 rounded-full border border-current opacity-60" />
                      <span className="text-[8px] uppercase tracking-tighter truncate w-full text-center">
                        {status === 'healthy' ? 'OK' : status.slice(0, 3)}
                      </span>
                    </button>
                    {isMidline && (
                      <div className="w-0.5 h-10 bg-slate-300 mx-1 rounded-full self-center" title="Dental Midline" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Lower Arch */}
          <div>
            <div className="text-center text-[11px] font-bold text-slate-500 mb-1.5 tracking-wider uppercase">
              {t.lowerArch}
            </div>
            <div className="flex justify-center items-center gap-1 overflow-x-auto pb-1" dir="ltr">
              {LOWER_TEETH.map((tNum, idx) => {
                const status = statuses[tNum] || 'healthy';
                const colorCfg = STATUS_COLOR_CONFIG[status];
                const isMidline = idx === 7;

                return (
                  <React.Fragment key={tNum}>
                    <button
                      type="button"
                      onClick={() => handleToothClick(tNum)}
                      onMouseEnter={() => setHoveredTooth(tNum)}
                      onMouseLeave={() => setHoveredTooth(null)}
                      className={`w-8 h-12 rounded border text-xs font-semibold flex flex-col items-center justify-between p-1 transition-all cursor-pointer ${colorCfg.bg} ${colorCfg.border} ${colorCfg.color} ${
                        hoveredTooth === tNum ? 'ring-2 ring-blue-500 scale-105 z-10 shadow-sm' : ''
                      }`}
                      title={`#${tNum} - ${getToothNameSafe(tNum)} (${t.statuses[status]})`}
                    >
                      <span className="text-[8px] uppercase tracking-tighter truncate w-full text-center">
                        {status === 'healthy' ? 'OK' : status.slice(0, 3)}
                      </span>
                      <div className="w-2.5 h-2.5 rounded-full border border-current opacity-60" />
                      <span className="text-[9px] font-mono font-bold">{tNum}</span>
                    </button>
                    {isMidline && (
                      <div className="w-0.5 h-10 bg-slate-300 mx-1 rounded-full self-center" title="Dental Midline" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Clinical Summary Counts */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border">
          <div className="flex flex-wrap gap-4">
            <span>{t.summaryCounts.extractions} <strong className="text-amber-800 font-bold">{Object.values(statuses).filter(s => s === 'extraction_planned').length}</strong></span>
            <span>{t.summaryCounts.tadSites} <strong className="text-teal-800 font-bold">{Object.values(statuses).filter(s => s === 'tad_site').length}</strong></span>
            <span>{t.summaryCounts.caries} <strong className="text-rose-800 font-bold">{Object.values(statuses).filter(s => s === 'caries').length}</strong></span>
            <span>{t.summaryCounts.missing} <strong className="text-indigo-800 font-bold">{Object.values(statuses).filter(s => s === 'missing').length}</strong></span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">ISO 3950 / FDI Notation</span>
        </div>

        {/* ENHANCED AFFECTED TOOTH BREAKDOWN & CLINICAL DECISION MATRIX */}
        <div className="pt-2 border-t border-slate-200 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {t.decisionMatrixTitle}
              </h4>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 text-[11px]">
              <button
                type="button"
                onClick={() => setBreakdownFilter('all')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  breakdownFilter === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t.matrixFilters.all} ({affectedTeeth.length})
              </button>
              <button
                type="button"
                onClick={() => setBreakdownFilter('caries')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  breakdownFilter === 'caries' ? 'bg-slate-800 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t.matrixFilters.caries}
              </button>
              <button
                type="button"
                onClick={() => setBreakdownFilter('extractions')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  breakdownFilter === 'extractions' ? 'bg-slate-800 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t.matrixFilters.ortho}
              </button>
              <button
                type="button"
                onClick={() => setBreakdownFilter('implants')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  breakdownFilter === 'implants' ? 'bg-slate-800 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t.matrixFilters.implants}
              </button>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <div className="overflow-x-auto max-h-[280px]">
              <table className="w-full text-left border-collapse text-xs" dir={isAr ? 'rtl' : 'ltr'}>
                <thead className="sticky top-0 bg-slate-50 border-b border-slate-200">
                  <tr className="text-[11px] font-bold text-slate-700 uppercase">
                    <th className="py-2.5 px-3 w-[15%]">{t.matrixColumns.tooth}</th>
                    <th className="py-2.5 px-3 w-[22%]">{t.matrixColumns.condition}</th>
                    <th className="py-2.5 px-3 w-[35%]">{t.matrixColumns.decision}</th>
                    <th className="py-2.5 px-3 w-[18%]">{t.matrixColumns.phase}</th>
                    <th className={`py-2.5 px-3 w-[10%] ${isAr ? 'text-left' : 'text-right'}`}>{t.matrixColumns.action}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAffectedTeeth.length > 0 ? (
                    filteredAffectedTeeth.map((tooth) => {
                      const colorCfg = STATUS_COLOR_CONFIG[tooth.status];
                      const rec = tooth.recommendation;
                      const isMissing = tooth.status === 'missing';

                      return (
                        <tr key={tooth.toothNum} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 px-3">
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-mono">
                                #{tooth.toothNum}
                              </span>
                              <span className="truncate max-w-[140px] text-[11px] text-slate-600 font-normal">
                                {tooth.name}
                              </span>
                            </div>
                          </td>

                          <td className="py-2.5 px-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${colorCfg.bg} ${colorCfg.border} ${colorCfg.color}`}>
                              {t.statuses[tooth.status]}
                            </span>
                            <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[160px]">
                              {rec.condition}
                            </div>
                          </td>

                          <td className="py-2.5 px-3">
                            <div className="font-bold text-slate-900 text-[11px] leading-snug">
                              {rec.clinicalDecision}
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              {rec.protocolNotes}
                            </div>
                          </td>

                          <td className="py-2.5 px-3">
                            <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200 text-[10px] font-semibold whitespace-nowrap">
                              {rec.phase.split(':')[0]}
                            </Badge>
                          </td>

                          <td className={`py-2.5 px-3 ${isAr ? 'text-left' : 'text-right'}`}>
                            {isMissing ? (
                              <Link href="/implants">
                                <Button size="sm" className="h-6 px-2 text-[10px] font-bold bg-teal-600 hover:bg-teal-700 text-white rounded gap-1 cursor-pointer">
                                  <Drill className="w-3 h-3" />
                                  <span>{t.actions.planImplant}</span>
                                </Button>
                              </Link>
                            ) : (
                              <span className="text-[10px] font-semibold text-emerald-600">
                                {t.actions.logged}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-xs text-slate-400">
                        {isAr ? 'لا توجد أسنان مسجلة تطابق الفلتر الحالي.' : 'No affected teeth matching current filter.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}