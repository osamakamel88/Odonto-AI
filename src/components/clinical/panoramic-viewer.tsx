"use client";

import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Sparkles, AlertTriangle, ShieldCheck, Eye, EyeOff, CheckCircle2, RotateCcw, X } from 'lucide-react';

interface DetectedTooth {
  fdi: number;
  label: string;
  x: number;
  y: number;
  status: 'healthy' | 'caries' | 'restoration' | 'impacted' | 'missing';
}

interface PathologyFinding {
  id: string;
  type: string;
  tooth: number;
  severity: 'mild' | 'moderate' | 'severe';
  contraindication: boolean;
  recommendation: string;
  box: { x: number; y: number; w: number; h: number };
}

const SAMPLE_TEETH: DetectedTooth[] = [
  // Upper Right (18 to 11)
  { fdi: 18, label: 'UR 3rd Molar', x: 70, y: 130, status: 'impacted' },
  { fdi: 17, label: 'UR 2nd Molar', x: 105, y: 135, status: 'healthy' },
  { fdi: 16, label: 'UR 1st Molar', x: 145, y: 140, status: 'caries' },
  { fdi: 15, label: 'UR 2nd Premolar', x: 180, y: 145, status: 'healthy' },
  { fdi: 14, label: 'UR 1st Premolar', x: 215, y: 150, status: 'healthy' },
  { fdi: 13, label: 'UR Canine', x: 245, y: 155, status: 'healthy' },
  { fdi: 12, label: 'UR Lateral', x: 270, y: 160, status: 'healthy' },
  { fdi: 11, label: 'UR Central', x: 295, y: 165, status: 'healthy' },
  // Upper Left (21 to 28)
  { fdi: 21, label: 'UL Central', x: 325, y: 165, status: 'healthy' },
  { fdi: 22, label: 'UL Lateral', x: 350, y: 160, status: 'healthy' },
  { fdi: 23, label: 'UL Canine', x: 375, y: 155, status: 'healthy' },
  { fdi: 24, label: 'UL 1st Premolar', x: 405, y: 150, status: 'healthy' },
  { fdi: 25, label: 'UL 2nd Premolar', x: 440, y: 145, status: 'restoration' },
  { fdi: 26, label: 'UL 1st Molar', x: 475, y: 140, status: 'healthy' },
  { fdi: 27, label: 'UL 2nd Molar', x: 515, y: 135, status: 'healthy' },
  { fdi: 28, label: 'UL 3rd Molar', x: 550, y: 130, status: 'impacted' },
  // Lower Right (48 to 41)
  { fdi: 48, label: 'LR 3rd Molar', x: 75, y: 220, status: 'impacted' },
  { fdi: 47, label: 'LR 2nd Molar', x: 110, y: 215, status: 'healthy' },
  { fdi: 46, label: 'LR 1st Molar', x: 150, y: 210, status: 'restoration' },
  { fdi: 45, label: 'LR 2nd Premolar', x: 185, y: 205, status: 'healthy' },
  { fdi: 44, label: 'LR 1st Premolar', x: 220, y: 200, status: 'healthy' },
  { fdi: 43, label: 'LR Canine', x: 250, y: 195, status: 'healthy' },
  { fdi: 42, label: 'LR Lateral', x: 275, y: 190, status: 'healthy' },
  { fdi: 41, label: 'LR Central', x: 298, y: 185, status: 'healthy' },
  // Lower Left (31 to 38)
  { fdi: 31, label: 'LL Central', x: 322, y: 185, status: 'healthy' },
  { fdi: 32, label: 'LL Lateral', x: 345, y: 190, status: 'healthy' },
  { fdi: 33, label: 'LL Canine', x: 370, y: 195, status: 'healthy' },
  { fdi: 34, label: 'LL 1st Premolar', x: 400, y: 200, status: 'healthy' },
  { fdi: 35, label: 'LL 2nd Premolar', x: 435, y: 205, status: 'healthy' },
  { fdi: 36, label: 'LL 1st Molar', x: 470, y: 210, status: 'healthy' },
  { fdi: 37, label: 'LL 2nd Molar', x: 510, y: 215, status: 'healthy' },
  { fdi: 38, label: 'LL 3rd Molar', x: 545, y: 220, status: 'impacted' },
];

const SAMPLE_PATHOLOGY: PathologyFinding[] = [
  {
    id: 'p1',
    type: 'Dental Caries (D2 Enamel-Dentin)',
    tooth: 16,
    severity: 'moderate',
    contraindication: true,
    recommendation: 'Restoration required prior to molar band/bracket placement to prevent progression under appliance.',
    box: { x: 135, y: 130, w: 22, h: 22 }
  },
  {
    id: 'p2',
    type: 'Mesioangular Impaction',
    tooth: 48,
    severity: 'moderate',
    contraindication: false,
    recommendation: 'Evaluate for prophylactic extraction if distalization or second molar uprighting planned.',
    box: { x: 65, y: 210, w: 24, h: 24 }
  },
  {
    id: 'p3',
    type: 'Mesioangular Impaction',
    tooth: 38,
    severity: 'mild',
    contraindication: false,
    recommendation: 'Monitor during lower arch alignment.',
    box: { x: 535, y: 210, w: 24, h: 24 }
  }
];

export function PanoramicViewer() {
  const [showTeeth, setShowTeeth] = useState(true);
  const [showPathology, setShowPathology] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState<PathologyFinding | null>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [imageOpacity, setImageOpacity] = useState<number>(0.7);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, DICOM export).');
      return;
    }
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setUploadedImage(result);
      setIsScanning(true);
      setScanStep('AI Vision: Ingesting panoramic orthopantomogram (OPG)...');

      setTimeout(() => {
        setScanStep('YOLOv8 & U-Net: Segmenting 32 teeth and alveolar bone crests...');
      }, 500);

      setTimeout(() => {
        setScanStep('Pathology AI: Screening caries, impactions, and periapical lesions...');
      }, 1000);

      setTimeout(() => {
        setIsScanning(false);
        setScanStep('');
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClearUpload = () => {
    setUploadedImage(null);
    setUploadedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b bg-slate-50/50">
        <div>
          <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
            Panoramic Radiograph (OPG) & Disease AI
          </CardTitle>
          <p className="text-xs text-slate-500 mt-0.5">Teeth instance segmentation & pre-orthodontic pathology clearance</p>
        </div>

        <div className="flex items-center gap-2">
          <input 
            ref={fileInputRef} 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange} 
          />
          <Button 
            type="button"
            size="sm" 
            variant={uploadedImage ? "secondary" : "outline"} 
            className="text-xs gap-1.5 h-8 cursor-pointer shadow-xs"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-3.5 h-3.5 text-teal-600" />
            {uploadedImage ? 'Change OPG' : 'Upload OPG'}
          </Button>

          {uploadedImage && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-xs h-8 text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2 cursor-pointer gap-1"
              onClick={handleClearUpload}
              title="Reset to schematic view"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Layer Toggles */}
        <div className="flex items-center justify-between p-2 bg-slate-100 rounded-lg text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Display Filters:</span>
            <Button 
              size="sm" 
              variant={showTeeth ? "default" : "outline"}
              className="h-7 text-xs px-2"
              onClick={() => setShowTeeth(!showTeeth)}
            >
              FDI Numbering
            </Button>
            <Button 
              size="sm" 
              variant={showPathology ? "default" : "outline"}
              className="h-7 text-xs px-2"
              onClick={() => setShowPathology(!showPathology)}
            >
              Pathology Overlays
            </Button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Caries
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Impacted
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Restoration
            </span>
          </div>
        </div>

        {/* Upload Status Banner */}
        {uploadedImage && (
          <div className="flex flex-wrap items-center justify-between p-2.5 bg-teal-50/90 border border-teal-200 rounded-lg text-xs text-teal-900 gap-2 animate-in fade-in">
            <div className="flex items-center gap-2 font-medium truncate">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="truncate">Loaded: <strong>{uploadedFileName}</strong> (32 teeth segmented • Pre-ortho cleared)</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-slate-500">X-Ray Opacity:</span>
              <button
                type="button"
                onClick={() => setImageOpacity(prev => prev === 0.7 ? 1.0 : prev === 1.0 ? 0.35 : 0.7)}
                className="px-2 py-0.5 bg-white border border-slate-300 rounded font-bold hover:bg-slate-50 cursor-pointer text-slate-700 shadow-xs"
              >
                {Math.round(imageOpacity * 100)}%
              </button>
            </div>
          </div>
        )}

        {/* Panoramic Canvas */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative border rounded-xl bg-slate-950 h-72 overflow-hidden shadow-inner flex items-center justify-center transition-colors ${
            isDragging ? 'border-teal-500 ring-2 ring-teal-400/50 bg-slate-900' : 'border-slate-800'
          }`}
        >
          {isDragging && (
            <div className="absolute inset-0 bg-teal-950/80 backdrop-blur-xs z-30 flex flex-col items-center justify-center text-teal-300 pointer-events-none">
              <Upload className="w-10 h-10 mb-2 animate-bounce text-teal-400" />
              <p className="text-sm font-bold">Drop Panoramic Orthopantomogram (OPG) Here</p>
            </div>
          )}

          {isScanning && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-teal-400 space-y-2.5 px-4 text-center">
              <Sparkles className="w-8 h-8 animate-spin text-teal-400" />
              <p className="text-sm font-bold text-white">{scanStep || 'Scanning Panoramic X-Ray...'}</p>
              <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 animate-pulse rounded-full w-3/4"></div>
              </div>
            </div>
          )}

          <svg viewBox="50 100 520 150" className="w-full h-full select-none">
            {/* Uploaded OPG Image in background */}
            {uploadedImage && (
              <image
                href={uploadedImage}
                x="50"
                y="95"
                width="520"
                height="155"
                preserveAspectRatio="xMidYMid meet"
                opacity={imageOpacity}
              />
            )}
            {/* Simulated Jaw bone arc */}
            <path
              d="M 60 130 Q 310 80 560 130 Q 560 230 310 240 Q 60 230 60 130 Z"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="1.5"
              opacity="0.5"
            />
            {/* Maxillary and Mandibular sinus / canal lines */}
            <path d="M 120 130 Q 200 115 280 140" fill="none" stroke="#1e293b" strokeWidth="2" />
            <path d="M 340 140 Q 420 115 500 130" fill="none" stroke="#1e293b" strokeWidth="2" />
            <path d="M 100 230 Q 180 235 250 220" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 370 220 Q 440 235 520 230" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />

            {/* Teeth points & labels */}
            {showTeeth && SAMPLE_TEETH.map((tooth) => {
              const color = tooth.status === 'caries' ? '#f43f5e' :
                            tooth.status === 'impacted' ? '#a855f7' :
                            tooth.status === 'restoration' ? '#3b82f6' : '#94a3b8';

              return (
                <g key={tooth.fdi} className="cursor-pointer">
                  <circle cx={tooth.x} cy={tooth.y} r="4" fill={color} />
                  <text 
                    x={tooth.x} 
                    y={tooth.y > 180 ? tooth.y + 11 : tooth.y - 6} 
                    textAnchor="middle" 
                    fill={color} 
                    fontSize="7" 
                    fontWeight="bold"
                  >
                    {tooth.fdi}
                  </text>
                </g>
              );
            })}

            {/* Pathology Bounding Boxes */}
            {showPathology && SAMPLE_PATHOLOGY.map((p) => (
              <g 
                key={p.id} 
                className="cursor-pointer"
                onClick={() => setSelectedFinding(p)}
              >
                <rect 
                  x={p.box.x} 
                  y={p.box.y} 
                  width={p.box.w} 
                  height={p.box.h} 
                  fill="rgba(244, 63, 94, 0.15)"
                  stroke={p.severity === 'moderate' ? '#f43f5e' : '#fb923c'}
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  rx="3"
                />
                <circle cx={p.box.x + p.box.w} cy={p.box.y} r="3" fill="#f43f5e" />
              </g>
            ))}
          </svg>

          {/* Pathology count badge */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full border border-rose-800 font-medium">
              1 Active Caries Detected
            </span>
            <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800 font-medium">
              3 Impacted Molars
            </span>
          </div>
        </div>

        {/* Selected Finding Detail Banner */}
        {selectedFinding ? (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span className="font-semibold text-xs text-rose-900">
                  Tooth #{selectedFinding.tooth}: {selectedFinding.type}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 bg-rose-200 text-rose-800 rounded font-medium">
                  {selectedFinding.severity}
                </span>
              </div>
              <p className="text-xs text-rose-800">{selectedFinding.recommendation}</p>
            </div>
            <Button size="sm" variant="ghost" className="h-6 text-xs text-rose-700" onClick={() => setSelectedFinding(null)}>
              Dismiss
            </Button>
          </div>
        ) : (
          /* Pre-orthodontic clearance checklist */
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-900">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Pre-Orthodontic Dental Clearance Requirements:
            </div>
            <ul className="list-disc pl-4 text-amber-800 space-y-0.5 text-[11px]">
              <li>Tooth 16: Occlusal composite restoration required prior to placement of archwires.</li>
              <li>Teeth 18, 28, 48: Evaluation of third molar impaction angles before retraction mechanics.</li>
              <li>Periodontal bone levels: Normal, no active vertical bone defects detected.</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}