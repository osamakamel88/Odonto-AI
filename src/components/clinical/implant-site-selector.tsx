"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getToothName } from '@/lib/orthodontics/tooth-notation';
import { 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Crosshair,
  ShieldAlert,
  Compass
} from 'lucide-react';

export interface ImplantSiteSelectorProps {
  selectedFdi: number;
  onSelectSite: (fdi: number) => void;
  missingTeeth?: number[];
  onToggleMissing?: (fdi: number) => void;
}

const UPPER_TEETH = [
  18, 17, 16, 15, 14, 13, 12, 11,
  21, 22, 23, 24, 25, 26, 27, 28
];

const LOWER_TEETH = [
  48, 47, 46, 45, 44, 43, 42, 41,
  31, 32, 33, 34, 35, 36, 37, 38
];

export function ImplantSiteSelector({
  selectedFdi,
  onSelectSite,
  missingTeeth = [16, 24, 36, 46],
  onToggleMissing
}: ImplantSiteSelectorProps) {
  const [hoveredTooth, setHoveredTooth] = useState<number | null>(null);

  const getToothRegionName = (fdi: number) => {
    const quad = Math.floor(fdi / 10);
    const tooth = fdi % 10;
    const isUpper = quad === 1 || quad === 2;
    const isAnt = tooth <= 3;
    if (isUpper) return isAnt ? 'Anterior Maxilla (Aesthetic Zone)' : 'Posterior Maxilla (Sinus Zone)';
    return isAnt ? 'Anterior Mandible (Interforaminal)' : 'Posterior Mandible (IAN Canal Zone)';
  };

  const isAestheticZone = (fdi: number) => {
    const quad = Math.floor(fdi / 10);
    const tooth = fdi % 10;
    return (quad === 1 || quad === 2) && tooth <= 5;
  };

  const getAnatomicalWarning = (fdi: number) => {
    const quad = Math.floor(fdi / 10);
    const tooth = fdi % 10;
    if ((quad === 1 || quad === 2) && tooth >= 5) {
      return 'Maxillary sinus floor proximity — CBCT subantral height assessment required';
    }
    if ((quad === 3 || quad === 4) && tooth >= 5) {
      return 'Inferior alveolar nerve (IAN) canal proximity — maintain ≥ 2.0mm safety zone';
    }
    if ((quad === 3 || quad === 4) && tooth === 4) {
      return 'Mental foramen & anterior loop proximity — verify loop extent on 3D CBCT';
    }
    if (isAestheticZone(fdi)) {
      return 'High aesthetic demand — maintain ≥ 2.0mm facial bone plate to avoid recession';
    }
    return 'Verify adjacent root parallelism (minimum 1.5mm distance)';
  };

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <Crosshair className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                FDI Implant Site Selection
                <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-[10px]">
                  Interactive Chart
                </Badge>
              </CardTitle>
              <p className="text-xs text-slate-300 mt-0.5">
                Click any FDI tooth position to select it as the target implant placement site
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-300"></span>
              Selected Site
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              Missing / Edentulous
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Upper Arch (Maxilla) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              Maxillary Arch (Upper Jaw)
            </span>
            <span className="text-[11px] text-slate-600 font-medium">Right → Midline → Left</span>
          </div>
          <div className="grid grid-cols-16 gap-1 sm:gap-1.5 overflow-x-auto pb-1">
            {UPPER_TEETH.map((tooth) => {
              const isSelected = selectedFdi === tooth;
              const isMissing = missingTeeth.includes(tooth);
              const isAesthetic = isAestheticZone(tooth);

              return (
                <button
                  key={tooth}
                  type="button"
                  onClick={() => onSelectSite(tooth)}
                  onMouseEnter={() => setHoveredTooth(tooth)}
                  onMouseLeave={() => setHoveredTooth(null)}
                  className={`relative flex flex-col items-center justify-center p-1.5 sm:p-2.5 rounded-lg border text-xs font-mono transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105 z-10 ring-2 ring-blue-300'
                      : isMissing
                      ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 hover:border-amber-400'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                  title={`${tooth} - ${getToothName(String(tooth))}`}
                >
                  <span className="text-[10px] sm:text-xs font-bold">{tooth}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 mt-1 animate-pulse" />
                  )}
                  {isMissing && !isSelected && (
                    <span className="text-[9px] text-amber-600 font-sans font-semibold mt-0.5">GAP</span>
                  )}
                  {isAesthetic && !isSelected && !isMissing && (
                    <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1" title="Aesthetic zone" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lower Arch (Mandible) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              Mandibular Arch (Lower Jaw)
            </span>
            <span className="text-[11px] text-slate-600 font-medium">Right → Midline → Left</span>
          </div>
          <div className="grid grid-cols-16 gap-1 sm:gap-1.5 overflow-x-auto pb-1">
            {LOWER_TEETH.map((tooth) => {
              const isSelected = selectedFdi === tooth;
              const isMissing = missingTeeth.includes(tooth);

              return (
                <button
                  key={tooth}
                  type="button"
                  onClick={() => onSelectSite(tooth)}
                  onMouseEnter={() => setHoveredTooth(tooth)}
                  onMouseLeave={() => setHoveredTooth(null)}
                  className={`relative flex flex-col items-center justify-center p-1.5 sm:p-2.5 rounded-lg border text-xs font-mono transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105 z-10 ring-2 ring-blue-300'
                      : isMissing
                      ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 hover:border-amber-400'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                  title={`${tooth} - ${getToothName(String(tooth))}`}
                >
                  <span className="text-[10px] sm:text-xs font-bold">{tooth}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 mt-1 animate-pulse" />
                  )}
                  {isMissing && !isSelected && (
                    <span className="text-[9px] text-amber-600 font-sans font-semibold mt-0.5">GAP</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Site Details Banner */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-base shrink-0 border border-blue-200">
              #{selectedFdi}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  {getToothName(String(selectedFdi))}
                </span>
                <Badge className={isAestheticZone(selectedFdi) ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-700'}>
                  {getToothRegionName(selectedFdi)}
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{getAnatomicalWarning(selectedFdi)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {onToggleMissing && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onToggleMissing(selectedFdi)}
                className="text-xs text-slate-600 hover:text-slate-900"
              >
                {missingTeeth.includes(selectedFdi) ? 'Mark as Present' : 'Mark as Edentulous Gap'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
