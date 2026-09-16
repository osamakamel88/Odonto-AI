"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getToothName } from '@/lib/orthodontics/tooth-notation';

export type ToothStatus = 'healthy' | 'caries' | 'restoration' | 'missing' | 'impacted' | 'extraction_planned' | 'tad_site';

export interface ToothChartProps {
  initialStatuses?: Record<number, ToothStatus>;
  onChange?: (statuses: Record<number, ToothStatus>) => void;
  readOnly?: boolean;
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

const STATUS_CONFIG: Record<ToothStatus, { label: string; color: string; bg: string; border: string }> = {
  healthy: { label: 'Sound / Healthy', color: 'text-slate-700', bg: 'bg-white hover:bg-slate-50', border: 'border-slate-300' },
  caries: { label: 'Active Caries', color: 'text-rose-700', bg: 'bg-rose-100 hover:bg-rose-200', border: 'border-rose-400' },
  restoration: { label: 'Restored', color: 'text-blue-700', bg: 'bg-blue-100 hover:bg-blue-200', border: 'border-blue-400' },
  missing: { label: 'Missing / Unerupted', color: 'text-slate-400', bg: 'bg-slate-200 line-through', border: 'border-slate-400' },
  impacted: { label: 'Impacted', color: 'text-purple-700', bg: 'bg-purple-100 hover:bg-purple-200', border: 'border-purple-400' },
  extraction_planned: { label: 'Extraction Planned', color: 'text-amber-800', bg: 'bg-amber-200 font-bold', border: 'border-amber-500' },
  tad_site: { label: 'TAD Anchorage Site', color: 'text-teal-800', bg: 'bg-teal-200', border: 'border-teal-500' }
};

export function ToothChart({ initialStatuses = {}, onChange, readOnly = false }: ToothChartProps) {
  const [statuses, setStatuses] = useState<Record<number, ToothStatus>>({
    16: 'caries',
    18: 'impacted',
    25: 'restoration',
    28: 'impacted',
    38: 'impacted',
    46: 'restoration',
    48: 'impacted',
    ...initialStatuses
  });

  const [activeTool, setActiveTool] = useState<ToothStatus>('extraction_planned');
  const [hoveredTooth, setHoveredTooth] = useState<number | null>(null);

  const handleToothClick = (tooth: number) => {
    if (readOnly) return;
    const current = statuses[tooth] || 'healthy';
    const next = current === activeTool ? 'healthy' : activeTool;
    const updated = { ...statuses, [tooth]: next };
    setStatuses(updated);
    if (onChange) onChange(updated);
  };

  const getToothNameSafe = (tooth: number) => {
    try {
      return getToothName(tooth.toString());
    } catch {
      return `Tooth #${tooth}`;
    }
  };

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="pb-3 border-b bg-slate-50/50 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold text-slate-900">
            Interactive FDI Odontogram (Tooth Chart)
          </CardTitle>
          <p className="text-xs text-slate-500">Click teeth to mark condition or plan orthodontic extractions / TAD sites</p>
        </div>

        {/* Hovered Tooth Info */}
        <div className="text-right">
          {hoveredTooth ? (
            <div className="text-xs">
              <span className="font-bold text-blue-700">Tooth #{hoveredTooth}</span>
              <span className="text-slate-500 block text-[11px]">{getToothNameSafe(hoveredTooth)}</span>
            </div>
          ) : (
            <span className="text-xs text-slate-400">Hover over a tooth</span>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Tool Palette */}
        {!readOnly && (
          <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-100 rounded-lg text-xs">
            <span className="text-[11px] font-semibold text-slate-600 mr-1">Active Brush:</span>
            {(Object.keys(STATUS_CONFIG) as ToothStatus[]).map((st) => (
              <button
                key={st}
                onClick={() => setActiveTool(st)}
                className={`px-2 py-1 rounded text-[11px] transition-all border ${
                  activeTool === st 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm font-semibold' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {STATUS_CONFIG[st].label}
              </button>
            ))}
          </div>
        )}

        {/* Dental Arches Representation */}
        <div className="space-y-6 py-2">
          {/* Upper Arch */}
          <div>
            <div className="text-center text-[11px] font-semibold text-slate-500 mb-1 tracking-wider uppercase">
              Upper Arch (Maxillary) — Right to Left
            </div>
            <div className="flex justify-center items-center gap-1 overflow-x-auto pb-1">
              {UPPER_TEETH.map((t, idx) => {
                const status = statuses[t] || 'healthy';
                const cfg = STATUS_CONFIG[status];
                const isMidline = idx === 7;

                return (
                  <React.Fragment key={t}>
                    <button
                      onClick={() => handleToothClick(t)}
                      onMouseEnter={() => setHoveredTooth(t)}
                      onMouseLeave={() => setHoveredTooth(null)}
                      className={`w-8 h-12 rounded border text-xs font-semibold flex flex-col items-center justify-between p-1 transition-all ${cfg.bg} ${cfg.border} ${cfg.color} ${
                        hoveredTooth === t ? 'ring-2 ring-blue-500 scale-105 z-10' : ''
                      }`}
                      title={`${t}: ${getToothNameSafe(t)} (${cfg.label})`}
                    >
                      <span className="text-[10px] opacity-75">{t}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                    </button>
                    {isMidline && (
                      <div className="w-0.5 h-12 bg-rose-400 mx-1 flex-shrink-0" title="Maxillary Midline" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Lower Arch */}
          <div>
            <div className="text-center text-[11px] font-semibold text-slate-500 mb-1 tracking-wider uppercase">
              Lower Arch (Mandibular) — Right to Left
            </div>
            <div className="flex justify-center items-center gap-1 overflow-x-auto pb-1">
              {LOWER_TEETH.map((t, idx) => {
                const status = statuses[t] || 'healthy';
                const cfg = STATUS_CONFIG[status];
                const isMidline = idx === 7;

                return (
                  <React.Fragment key={t}>
                    <button
                      onClick={() => handleToothClick(t)}
                      onMouseEnter={() => setHoveredTooth(t)}
                      onMouseLeave={() => setHoveredTooth(null)}
                      className={`w-8 h-12 rounded border text-xs font-semibold flex flex-col items-center justify-between p-1 transition-all ${cfg.bg} ${cfg.border} ${cfg.color} ${
                        hoveredTooth === t ? 'ring-2 ring-blue-500 scale-105 z-10' : ''
                      }`}
                      title={`${t}: ${getToothNameSafe(t)} (${cfg.label})`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                      <span className="text-[10px] opacity-75">{t}</span>
                    </button>
                    {isMidline && (
                      <div className="w-0.5 h-12 bg-rose-400 mx-1 flex-shrink-0" title="Mandibular Midline" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Clinical Notes Strip */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border">
          <div className="flex gap-4">
            <span>Extractions Planned: <strong className="text-amber-800 font-bold">{Object.values(statuses).filter(s => s === 'extraction_planned').length}</strong></span>
            <span>TAD Sites: <strong className="text-teal-800 font-bold">{Object.values(statuses).filter(s => s === 'tad_site').length}</strong></span>
            <span>Caries to Restore: <strong className="text-rose-800 font-bold">{Object.values(statuses).filter(s => s === 'caries').length}</strong></span>
          </div>
          <span className="text-[11px] text-slate-500">ISO 3950 / FDI Two-Digit Notation System</span>
        </div>
      </CardContent>
    </Card>
  );
}