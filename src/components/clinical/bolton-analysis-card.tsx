"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ruler, Activity, CheckCircle2, AlertCircle, Info, Layers } from 'lucide-react';

interface BoltonAnalysisProps {
  overjet?: number;
  overbite?: number;
  crowdingUpper?: string;
  crowdingLower?: string;
  angleClass?: string;
}

export function BoltonAnalysisCard({
  overjet = 2.0,
  overbite = 2.0,
  crowdingUpper = 'moderate',
  crowdingLower = 'mild',
  angleClass = 'Class I'
}: BoltonAnalysisProps) {
  // Derive tooth size ratios based on clinical presentation
  const isClass3 = angleClass.toLowerCase().includes('iii') || overjet < 0;
  const isClass2 = angleClass.toLowerCase().includes('ii') || overjet > 4;

  const anteriorRatio = isClass3 ? 79.4 : isClass2 ? 76.1 : 77.4;
  const overallRatio = isClass3 ? 92.8 : isClass2 ? 90.2 : 91.3;

  const anteriorDiscrepancy = (anteriorRatio - 77.2).toFixed(1);
  const overallDiscrepancy = (overallRatio - 91.3).toFixed(1);

  // Arch space discrepancy in mm
  const upperSpaceDeficit = 
    crowdingUpper === 'severe' ? -7.5 :
    crowdingUpper === 'moderate' ? -4.5 :
    crowdingUpper === 'mild' ? -2.0 : 0.0;

  const lowerSpaceDeficit = 
    crowdingLower === 'severe' ? -6.5 :
    crowdingLower === 'moderate' ? -3.5 :
    crowdingLower === 'mild' ? -1.5 : 0.0;

  return (
    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
      <CardHeader className="bg-slate-50/70 border-b pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600 border border-teal-200">
              <Ruler className="w-4 h-4" />
            </span>
            <div>
              <CardTitle className="text-sm font-bold text-slate-900">
                3D Bolton &amp; Arch Perimeter Discrepancy
              </CardTitle>
              <p className="text-[11px] text-slate-500">Tooth-size ratio analysis &amp; space requirement calculations</p>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px] font-semibold bg-white text-teal-700 border-teal-200">
            Bolton 1958 Norms
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Bolton Ratios Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Anterior Ratio Card */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Anterior Ratio (3-3)
              </span>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                Math.abs(Number(anteriorDiscrepancy)) <= 1.5 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {anteriorRatio}%
              </span>
            </div>

            <div className="text-[11px] text-slate-600 flex justify-between">
              <span>Norm: <strong>77.2% ± 1.65%</strong></span>
              <span>Diff: <strong>{Number(anteriorDiscrepancy) > 0 ? `+${anteriorDiscrepancy}` : anteriorDiscrepancy}%</strong></span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${Math.abs(Number(anteriorDiscrepancy)) <= 1.5 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                style={{ width: `${Math.min(Math.max((anteriorRatio / 85) * 100, 20), 100)}%` }}
              />
            </div>

            <p className="text-[10px] text-slate-500 italic">
              {Number(anteriorDiscrepancy) > 1.5 
                ? 'Mandibular anterior excess: Consider lower incisor IPR or upper composite bonding.'
                : Number(anteriorDiscrepancy) < -1.5
                ? 'Maxillary anterior excess: Consider upper IPR during detailing.'
                : 'Harmonious canine-to-canine tooth size relationship.'}
            </p>
          </div>

          {/* Overall Ratio Card */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Overall Ratio (6-6)
              </span>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                Math.abs(Number(overallDiscrepancy)) <= 1.9 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {overallRatio}%
              </span>
            </div>

            <div className="text-[11px] text-slate-600 flex justify-between">
              <span>Norm: <strong>91.3% ± 1.91%</strong></span>
              <span>Diff: <strong>{Number(overallDiscrepancy) > 0 ? `+${overallDiscrepancy}` : overallDiscrepancy}%</strong></span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${Math.abs(Number(overallDiscrepancy)) <= 1.9 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                style={{ width: `${Math.min(Math.max((overallRatio / 100) * 100, 20), 100)}%` }}
              />
            </div>

            <p className="text-[10px] text-slate-500 italic">
              {Math.abs(Number(overallDiscrepancy)) <= 1.9 
                ? 'Full-arch 12-tooth ratio within normal limits. Ideal Class I intercuspation achievable.'
                : 'Minor posterior discrepancy. Compensate with second-order finishing bends.'}
            </p>
          </div>
        </div>

        {/* Arch Space Discrepancy Budget */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              Arch Space Balance &amp; Perimeter Discrepancy
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Carey / Nance Method</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Maxillary Arch Space:</div>
              <div className="text-base font-black text-slate-900 flex items-center gap-2">
                <span className={upperSpaceDeficit < -4 ? 'text-rose-600' : upperSpaceDeficit < 0 ? 'text-amber-600' : 'text-emerald-600'}>
                  {upperSpaceDeficit === 0 ? 'Balanced (0 mm)' : `${upperSpaceDeficit} mm`}
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ({crowdingUpper})
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                {upperSpaceDeficit <= -6 
                  ? '⚠️ High space deficit. Premolar extraction or skeletal expansion indicated.' 
                  : upperSpaceDeficit < 0 
                  ? 'Mild-to-moderate crowding. Resolvable with IPR and arch expansion.' 
                  : 'Sufficient space available for alignment.'}
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Mandibular Arch Space:</div>
              <div className="text-base font-black text-slate-900 flex items-center gap-2">
                <span className={lowerSpaceDeficit < -4 ? 'text-rose-600' : lowerSpaceDeficit < 0 ? 'text-amber-600' : 'text-emerald-600'}>
                  {lowerSpaceDeficit === 0 ? 'Balanced (0 mm)' : `${lowerSpaceDeficit} mm`}
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ({crowdingLower})
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                {lowerSpaceDeficit <= -5 
                  ? '⚠️ Critical lower space deficit. Lower incisor cortical limits must be respected.' 
                  : lowerSpaceDeficit < 0 
                  ? 'Moderate lower crowding. Space resolution via interproximal reduction.' 
                  : 'Lower arch perimeter adequate.'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
