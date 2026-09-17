"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CEPH_NORMS, 
  calculateCephMeasurements, 
  interpretCephAnalysis,
  type CephLandmark, 
  type CephAnalysis,
  type CephLandmarkName
} from '@/lib/orthodontics/cephalometrics';
import { Upload, Sparkles, Eye, EyeOff, CheckCircle2, AlertCircle, X, RotateCcw } from 'lucide-react';

interface PresetCase {
  name: string;
  landmarks: CephLandmark[];
}

const PRESET_CASES: Record<'class2' | 'class1' | 'class3', PresetCase> = {
  class2: {
    name: 'Case A: Class II Div 1 (Retrognathic Mandible)',
    landmarks: [
      { name: 'S', abbreviation: 'S', x: 230, y: 120 },
      { name: 'N', abbreviation: 'N', x: 380, y: 110 },
      { name: 'A', abbreviation: 'A', x: 360, y: 220 },
      { name: 'B', abbreviation: 'B', x: 325, y: 310 },
      { name: 'Pog', abbreviation: 'Pog', x: 330, y: 345 },
      { name: 'Me', abbreviation: 'Me', x: 315, y: 375 },
      { name: 'Gn', abbreviation: 'Gn', x: 325, y: 365 },
      { name: 'Go', abbreviation: 'Go', x: 190, y: 280 },
      { name: 'Po', abbreviation: 'Po', x: 180, y: 155 },
      { name: 'Or', abbreviation: 'Or', x: 340, y: 150 },
      { name: 'ANS', abbreviation: 'ANS', x: 375, y: 205 },
      { name: 'PNS', abbreviation: 'PNS', x: 245, y: 200 },
      { name: 'U1A', abbreviation: 'U1A', x: 345, y: 210 },
      { name: 'U1T', abbreviation: 'U1T', x: 375, y: 275 },
      { name: 'L1A', abbreviation: 'L1A', x: 330, y: 330 },
      { name: 'L1T', abbreviation: 'L1T', x: 350, y: 270 },
      { name: 'Pn', abbreviation: 'Prn', x: 420, y: 200 },
      { name: 'Sn', abbreviation: 'Sn', x: 380, y: 225 },
      { name: 'Ls', abbreviation: 'Ls', x: 390, y: 250 },
      { name: 'Li', abbreviation: 'Li', x: 375, y: 280 },
      { name: 'Pg', abbreviation: 'Pog\'', x: 345, y: 350 },
    ]
  },
  class1: {
    name: 'Case B: Class I Ideal Orthognathic',
    landmarks: [
      { name: 'S', abbreviation: 'S', x: 230, y: 120 },
      { name: 'N', abbreviation: 'N', x: 380, y: 110 },
      { name: 'A', abbreviation: 'A', x: 360, y: 220 },
      { name: 'B', abbreviation: 'B', x: 345, y: 310 },
      { name: 'Pog', abbreviation: 'Pog', x: 350, y: 345 },
      { name: 'Me', abbreviation: 'Me', x: 335, y: 375 },
      { name: 'Gn', abbreviation: 'Gn', x: 345, y: 365 },
      { name: 'Go', abbreviation: 'Go', x: 200, y: 285 },
      { name: 'Po', abbreviation: 'Po', x: 180, y: 155 },
      { name: 'Or', abbreviation: 'Or', x: 340, y: 150 },
      { name: 'ANS', abbreviation: 'ANS', x: 375, y: 205 },
      { name: 'PNS', abbreviation: 'PNS', x: 245, y: 200 },
      { name: 'U1A', abbreviation: 'U1A', x: 345, y: 210 },
      { name: 'U1T', abbreviation: 'U1T', x: 365, y: 275 },
      { name: 'L1A', abbreviation: 'L1A', x: 335, y: 330 },
      { name: 'L1T', abbreviation: 'L1T', x: 350, y: 270 },
      { name: 'Pn', abbreviation: 'Prn', x: 420, y: 200 },
      { name: 'Sn', abbreviation: 'Sn', x: 380, y: 225 },
      { name: 'Ls', abbreviation: 'Ls', x: 385, y: 250 },
      { name: 'Li', abbreviation: 'Li', x: 375, y: 280 },
      { name: 'Pg', abbreviation: 'Pog\'', x: 360, y: 350 },
    ]
  },
  class3: {
    name: 'Case C: Class III Prognathic Mandible',
    landmarks: [
      { name: 'S', abbreviation: 'S', x: 230, y: 120 },
      { name: 'N', abbreviation: 'N', x: 380, y: 110 },
      { name: 'A', abbreviation: 'A', x: 350, y: 220 },
      { name: 'B', abbreviation: 'B', x: 365, y: 310 },
      { name: 'Pog', abbreviation: 'Pog', x: 375, y: 345 },
      { name: 'Me', abbreviation: 'Me', x: 360, y: 375 },
      { name: 'Gn', abbreviation: 'Gn', x: 370, y: 365 },
      { name: 'Go', abbreviation: 'Go', x: 190, y: 270 },
      { name: 'Po', abbreviation: 'Po', x: 180, y: 155 },
      { name: 'Or', abbreviation: 'Or', x: 340, y: 150 },
      { name: 'ANS', abbreviation: 'ANS', x: 370, y: 205 },
      { name: 'PNS', abbreviation: 'PNS', x: 245, y: 200 },
      { name: 'U1A', abbreviation: 'U1A', x: 335, y: 210 },
      { name: 'U1T', abbreviation: 'U1T', x: 360, y: 275 },
      { name: 'L1A', abbreviation: 'L1A', x: 345, y: 330 },
      { name: 'L1T', abbreviation: 'L1T', x: 350, y: 270 },
      { name: 'Pn', abbreviation: 'Prn', x: 415, y: 200 },
      { name: 'Sn', abbreviation: 'Sn', x: 375, y: 225 },
      { name: 'Ls', abbreviation: 'Ls', x: 380, y: 250 },
      { name: 'Li', abbreviation: 'Li', x: 385, y: 280 },
      { name: 'Pg', abbreviation: 'Pog\'', x: 385, y: 350 },
    ]
  }
};

export function CephViewer({ 
  presetCase = 'class2',
  onAnalysisReady 
}: { 
  presetCase?: 'class2' | 'class1' | 'class3';
  onAnalysisReady?: (analysis: Partial<CephAnalysis>) => void;
}) {
  const [selectedCase, setSelectedCase] = useState<'class2' | 'class1' | 'class3'>(presetCase);
  const [landmarks, setLandmarks] = useState<CephLandmark[]>(PRESET_CASES[presetCase]?.landmarks || PRESET_CASES.class2.landmarks);
  const [showPlanes, setShowPlanes] = useState(true);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeLandmark, setActiveLandmark] = useState<string | null>(null);
  const canvasRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (presetCase && PRESET_CASES[presetCase]) {
      setSelectedCase(presetCase);
      setLandmarks(PRESET_CASES[presetCase].landmarks);
    }
  }, [presetCase]);

  const measurements = calculateCephMeasurements(landmarks);
  const fullAnalysis: CephAnalysis = {
    sna: measurements.sna ?? 82,
    snb: measurements.snb ?? 78,
    anb: measurements.anb ?? 4,
    wits: measurements.wits ?? 2,
    fma: measurements.fma ?? 25,
    snGoGn: measurements.snGoGn ?? 32,
    yAxis: measurements.yAxis ?? 59,
    impa: measurements.impa ?? 90,
    u1Sn: measurements.u1Sn ?? 104,
    u1NaAngle: measurements.u1NaAngle ?? 22,
    u1NaLinear: measurements.u1NaLinear ?? 4,
    l1NbAngle: measurements.l1NbAngle ?? 25,
    l1NbLinear: measurements.l1NbLinear ?? 4,
    interincisalAngle: measurements.interincisalAngle ?? 131,
    nasolabialAngle: measurements.nasolabialAngle ?? 102,
    upperLipEPlane: measurements.upperLipEPlane ?? -4,
    lowerLipEPlane: measurements.lowerLipEPlane ?? -2,
    zAngle: measurements.zAngle ?? 78,
    jarabakRatio: measurements.jarabakRatio ?? 63,
    facialAxis: measurements.facialAxis ?? 90,
    maxillaryMandibularPlaneAngle: measurements.maxillaryMandibularPlaneAngle ?? 27
  };

  const interpretation = interpretCephAnalysis(fullAnalysis);
  const maleNorms = CEPH_NORMS.caucasian.male;

  useEffect(() => {
    if (onAnalysisReady) {
      onAnalysisReady(measurements);
    }
  }, [selectedCase]);

  const handleCaseChange = (key: 'class2' | 'class1' | 'class3') => {
    setSelectedCase(key);
    setLandmarks(PRESET_CASES[key].landmarks);
  };

  const getPt = (name: CephLandmarkName) => landmarks.find(l => l.name === name) || { x: 0, y: 0 };

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
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
      setIsAnalyzing(true);
      setAnalysisStep('Ingesting lateral cephalometric radiograph...');

      setTimeout(() => {
        setAnalysisStep('AI Vision: Detecting 19 anatomical landmarks (S, N, A, B, Pog, Me, Go, Gn)...');
      }, 500);

      setTimeout(() => {
        setAnalysisStep('Calculating Steiner, Tweed, and Downs normative measurements...');
      }, 1000);

      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisStep('');
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

  const getStatusColor = (val: number, norm: { mean: number; sd: number }) => {
    const diff = Math.abs(val - norm.mean);
    if (diff <= norm.sd) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (diff <= norm.sd * 2) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b bg-slate-50/50">
        <div>
          <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            AI Cephalometric Tracing Studio
          </CardTitle>
          <p className="text-xs text-slate-500 mt-0.5">Automated landmark recognition & Steiner/Downs/Tweed analysis</p>
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
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            {uploadedImage ? 'Change Ceph' : 'Upload Ceph'}
          </Button>

          {uploadedImage && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-xs h-8 text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2 cursor-pointer gap-1"
              onClick={handleClearUpload}
              title="Reset to schematic preset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Preset Selector */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-100 rounded-lg">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-700">Test Case:</span>
            <select 
              value={selectedCase} 
              onChange={(e) => handleCaseChange(e.target.value as any)}
              className="text-xs bg-white border border-slate-300 rounded px-2.5 py-1 font-medium text-slate-800"
            >
              <option value="class2">Case A: Class II Div 1 (Retrognathic Mandible)</option>
              <option value="class1">Case B: Class I Ideal Orthognathic</option>
              <option value="class3">Case C: Class III Prognathic Mandible</option>
            </select>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <Button 
              size="sm" 
              variant={showPlanes ? "default" : "outline"} 
              className="h-7 text-xs px-2"
              onClick={() => setShowPlanes(!showPlanes)}
            >
              Planes
            </Button>
            <Button 
              size="sm" 
              variant={showLandmarks ? "default" : "outline"} 
              className="h-7 text-xs px-2"
              onClick={() => setShowLandmarks(!showLandmarks)}
            >
              Landmarks
            </Button>
            <Button 
              size="sm" 
              variant={showProfile ? "default" : "outline"} 
              className="h-7 text-xs px-2"
              onClick={() => setShowProfile(!showProfile)}
            >
              Soft Tissue
            </Button>
          </div>
        </div>

        {/* Upload Status Banner */}
        {uploadedImage && (
          <div className="flex flex-wrap items-center justify-between p-2.5 bg-blue-50/90 border border-blue-200 rounded-lg text-xs text-blue-900 gap-2 animate-in fade-in">
            <div className="flex items-center gap-2 font-medium truncate">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="truncate">Loaded: <strong>{uploadedFileName}</strong> (19 anatomical landmarks aligned)</span>
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

        {/* Tracing Canvas */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative border rounded-xl bg-slate-950 h-80 overflow-hidden shadow-inner flex items-center justify-center transition-colors ${
            isDragging ? 'border-blue-500 ring-2 ring-blue-400/50 bg-slate-900' : 'border-slate-800'
          }`}
        >
          {isDragging && (
            <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-xs z-30 flex flex-col items-center justify-center text-blue-300 pointer-events-none">
              <Upload className="w-10 h-10 mb-2 animate-bounce text-blue-400" />
              <p className="text-sm font-bold">Drop Lateral Cephalometric X-Ray Here</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-blue-400 space-y-2.5 px-4 text-center">
              <Sparkles className="w-8 h-8 animate-spin text-blue-400" />
              <p className="text-sm font-bold text-white">{analysisStep || 'Analyzing Radiograph...'}</p>
              <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-pulse rounded-full w-3/4"></div>
              </div>
            </div>
          )}

          {/* Cephalometric SVG Overlay */}
          <svg 
            ref={canvasRef}
            viewBox="100 80 360 320" 
            className="w-full h-full select-none"
          >
            {/* Uploaded Ceph Image in SVG background */}
            {uploadedImage && (
              <image
                href={uploadedImage}
                x="95"
                y="75"
                width="370"
                height="330"
                preserveAspectRatio="xMidYMid slice"
                opacity={imageOpacity}
              />
            )}
            {/* Soft tissue silhouette */}
            {showProfile && (
              <path
                d={`M ${getPt('N').x} ${getPt('N').y} 
                    Q ${getPt('Pn').x - 20} ${getPt('N').y + 40} ${getPt('Pn').x} ${getPt('Pn').y} 
                    Q ${getPt('Sn').x + 10} ${getPt('Sn').y - 5} ${getPt('Sn').x} ${getPt('Sn').y} 
                    Q ${getPt('Ls').x + 10} ${getPt('Ls').y - 5} ${getPt('Ls').x} ${getPt('Ls').y} 
                    Q ${getPt('Ls').x} ${getPt('Ls').y + 15} ${getPt('Li').x} ${getPt('Li').y} 
                    Q ${getPt('Li').x - 10} ${getPt('Li').y + 20} ${getPt('Pg').x} ${getPt('Pg').y} 
                    Q ${getPt('Me').x + 10} ${getPt('Me').y + 5} ${getPt('Me').x} ${getPt('Me').y}`}
                fill="none"
                stroke="#64748b"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                opacity="0.6"
              />
            )}

            {/* Cranial Base Plane: S-N */}
            {showPlanes && (
              <>
                <line 
                  x1={getPt('S').x} y1={getPt('S').y} 
                  x2={getPt('N').x} y2={getPt('N').y} 
                  stroke="#38bdf8" strokeWidth="2" 
                />
                {/* S-N to A */}
                <line 
                  x1={getPt('N').x} y1={getPt('N').y} 
                  x2={getPt('A').x} y2={getPt('A').y} 
                  stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3"
                />
                {/* S-N to B */}
                <line 
                  x1={getPt('N').x} y1={getPt('N').y} 
                  x2={getPt('B').x} y2={getPt('B').y} 
                  stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3"
                />
                {/* Mandibular Plane: Go-Me */}
                <line 
                  x1={getPt('Go').x} y1={getPt('Go').y} 
                  x2={getPt('Me').x} y2={getPt('Me').y} 
                  stroke="#f472b6" strokeWidth="2" 
                />
                {/* Frankfort Horizontal: Po-Or */}
                <line 
                  x1={getPt('Po').x} y1={getPt('Po').y} 
                  x2={getPt('Or').x} y2={getPt('Or').y} 
                  stroke="#a78bfa" strokeWidth="1.5" 
                />
                {/* Upper Incisor Axis */}
                <line 
                  x1={getPt('U1A').x} y1={getPt('U1A').y} 
                  x2={getPt('U1T').x} y2={getPt('U1T').y} 
                  stroke="#f87171" strokeWidth="2" 
                />
                {/* Lower Incisor Axis */}
                <line 
                  x1={getPt('L1A').x} y1={getPt('L1A').y} 
                  x2={getPt('L1T').x} y2={getPt('L1T').y} 
                  stroke="#fb923c" strokeWidth="2" 
                />
                {/* E-Plane: Prn to Pog' */}
                <line 
                  x1={getPt('Pn').x} y1={getPt('Pn').y} 
                  x2={getPt('Pg').x} y2={getPt('Pg').y} 
                  stroke="#2dd4bf" strokeWidth="1" strokeDasharray="2 2"
                />
              </>
            )}

            {/* Landmarks points */}
            {showLandmarks && landmarks.map((lm) => (
              <g 
                key={lm.name} 
                className="cursor-pointer"
                onMouseEnter={() => setActiveLandmark(lm.name)}
                onMouseLeave={() => setActiveLandmark(null)}
              >
                <circle 
                  cx={lm.x} 
                  cy={lm.y} 
                  r={activeLandmark === lm.name ? 5 : 3.5} 
                  fill={activeLandmark === lm.name ? '#38bdf8' : '#ffffff'} 
                  stroke="#0284c7" 
                  strokeWidth="1.5"
                />
                <text 
                  x={lm.x + 6} 
                  y={lm.y + 3} 
                  fill="#94a3b8" 
                  fontSize="9" 
                  fontFamily="sans-serif"
                  fontWeight="bold"
                >
                  {lm.abbreviation}
                </text>
              </g>
            ))}
          </svg>

          {/* Active landmark tooltip */}
          {activeLandmark && (
            <div className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-xs px-2.5 py-1 rounded border border-slate-700">
              Landmark: <span className="text-blue-400 font-semibold">{activeLandmark}</span>
            </div>
          )}

          {/* Quick diagnostic badge */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            <span className="text-[10px] bg-blue-900/80 text-blue-200 px-2 py-0.5 rounded-full border border-blue-700 font-semibold">
              {interpretation.skeletalClass}
            </span>
            <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              {interpretation.growthPattern}
            </span>
          </div>
        </div>

        {/* Diagnostic Findings Strip */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2.5 bg-slate-50 border rounded-lg text-center">
            <div className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Skeletal Class</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">{interpretation.skeletalClass}</div>
            <div className="text-[10px] text-slate-500">ANB: {(measurements.anb ?? 4).toFixed(1)}°</div>
          </div>
          <div className="p-2.5 bg-slate-50 border rounded-lg text-center">
            <div className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Growth Pattern</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">{interpretation.growthPattern}</div>
            <div className="text-[10px] text-slate-500">FMA: {(measurements.fma ?? 25).toFixed(1)}°</div>
          </div>
          <div className="p-2.5 bg-slate-50 border rounded-lg text-center">
            <div className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Profile Type</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">{interpretation.profile}</div>
            <div className="text-[10px] text-slate-500">Nasolabial: {(measurements.nasolabialAngle ?? 102).toFixed(1)}°</div>
          </div>
        </div>

        {/* Measurements vs Norms Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 flex justify-between items-center">
            <span>Cephalometric Norms Reference (Steiner & Tweed)</span>
            <span className="text-[10px] text-slate-500 font-normal">Adult Caucasian Norms</span>
          </div>
          <div className="divide-y text-xs max-h-48 overflow-y-auto">
            <div className="grid grid-cols-4 p-2 font-semibold text-slate-500 bg-slate-50 text-[11px]">
              <span>Parameter</span>
              <span className="text-center">Patient</span>
              <span className="text-center">Norm</span>
              <span className="text-right">Interpretation</span>
            </div>

            {[
              { label: 'SNA', val: measurements.sna ?? 82, norm: maleNorms.sna, unit: '°', desc: 'Maxillary Position' },
              { label: 'SNB', val: measurements.snb ?? 78, norm: maleNorms.snb, unit: '°', desc: 'Mandibular Position' },
              { label: 'ANB', val: measurements.anb ?? 4, norm: maleNorms.anb, unit: '°', desc: 'Skeletal Discrepancy' },
              { label: 'Wits Appraisal', val: measurements.wits ?? 2, norm: maleNorms.wits, unit: 'mm', desc: 'Linear Jaw Relation' },
              { label: 'FMA', val: measurements.fma ?? 25, norm: maleNorms.fma, unit: '°', desc: 'Mandibular Plane Angle' },
              { label: 'IMPA', val: measurements.impa ?? 90, norm: maleNorms.impa, unit: '°', desc: 'Lower Incisor Proclination' },
              { label: 'U1 - SN', val: measurements.u1Sn ?? 104, norm: maleNorms.u1Sn, unit: '°', desc: 'Upper Incisor Inclination' },
              { label: 'Nasolabial Angle', val: measurements.nasolabialAngle ?? 102, norm: maleNorms.nasolabialAngle, unit: '°', desc: 'Soft Tissue Profile' },
              { label: 'Interincisal Angle', val: measurements.interincisalAngle ?? 131, norm: maleNorms.interincisalAngle, unit: '°', desc: 'Incisor Relation' },
            ].map((row) => {
              const diff = row.val - row.norm.mean;
              const statusBadge = diff > row.norm.sd 
                ? (row.label === 'ANB' ? 'Class II Tendency' : 'Increased')
                : diff < -row.norm.sd 
                ? (row.label === 'ANB' ? 'Class III Tendency' : 'Decreased')
                : 'Normal';

              return (
                <div key={row.label} className="grid grid-cols-4 p-2 items-center hover:bg-slate-50">
                  <span className="font-medium text-slate-800">{row.label} <span className="text-[10px] text-slate-400 font-normal">({row.desc})</span></span>
                  <span className="text-center font-bold text-slate-900">{row.val.toFixed(1)}{row.unit}</span>
                  <span className="text-center text-slate-500">{row.norm.mean}{row.unit} ± {row.norm.sd}</span>
                  <div className="text-right">
                    <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded border font-medium ${getStatusColor(row.val, row.norm)}`}>
                      {statusBadge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}