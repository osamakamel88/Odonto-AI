"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Layers, 
  Sparkles, 
  Ruler, 
  Scan, 
  Box, 
  ShieldCheck, 
  BrainCircuit, 
  CheckCircle2, 
  ChevronRight, 
  Activity,
  Maximize2
} from 'lucide-react';

export const PIPELINE_LAYERS = [
  {
    step: 1,
    name: 'Cephalometric Tracing',
    subtitle: 'Skeletal & Dentoalveolar Norms',
    icon: Ruler,
    tag: 'ANB & Wits Appraisal',
    description: 'Automated 16-landmark lateral ceph identification. Computes Steiner, Tweed, and McNamara measurements to classify Class I/II/III skeletal patterns.',
    clinicalFocus: 'Eliminates manual tracing error while calculating Jarabak ratio and vertical growth tendency (hyperdivergent vs hypodivergent).'
  },
  {
    step: 2,
    name: 'Panoramic OPG Segmentation',
    subtitle: 'FDI Tooth Charting & Root Health',
    icon: Scan,
    tag: '32-Tooth Segmentation',
    description: 'Full-mouth radiograph analysis identifying impactions (canines, third molars), root parallelism, root lengths, and condylar asymmetry.',
    clinicalFocus: 'Screens for root dilacerations, congenitally missing teeth, and root resorption before applying biomechanical force.'
  },
  {
    step: 3,
    name: 'Pre-Ortho Clearance AI',
    subtitle: 'Periodontal & Bone Level Guard',
    icon: ShieldCheck,
    tag: 'Biological Clearance',
    description: 'Screens crestal alveolar bone height, furcation involvement, and periapical radiolucencies prior to initiating orthodontic tooth movement.',
    clinicalFocus: 'Ensures no active periodontal disease exists, preventing irreversible alveolar bone loss and iatrogenic mobility.'
  },
  {
    step: 4,
    name: '3D Arch Space & Bolton Analysis',
    subtitle: 'Arch Perimeter & Tooth Size Discrepancy',
    icon: Box,
    tag: 'Anterior 77.2% | Overall 91.3%',
    description: 'Calculates mesiodistal tooth widths from 3D digital dental casts. Evaluates anterior and overall Bolton ratios and arch crowding in millimeters.',
    clinicalFocus: 'Determines whether crowding can be solved by expansion, IPR, or if premolar extractions are biologically required.'
  },
  {
    step: 5,
    name: 'Cortical Boundary Verification',
    subtitle: 'Alveolar Bone Thickness Limits',
    icon: Maximize2,
    tag: 'CBCT Boundary Guard',
    description: 'Calculates the thickness of the buccal and lingual cortical plates. Prevents incisor proclination from violating cortical boundaries.',
    clinicalFocus: 'Eliminates gingival recession and bone dehiscence by respecting the biological envelope of tooth movement.'
  },
  {
    step: 6,
    name: 'Clinical Chain-of-Thought (CoT)',
    subtitle: 'Orthodontic Decision Engine',
    icon: BrainCircuit,
    tag: 'Biomechanical Reasoning',
    description: 'Multi-step clinical reasoning evaluating skeletal maturation (CVM), facial aesthetics (E-plane, nasolabial angle), and patient chief complaint.',
    clinicalFocus: 'Formulates prioritized treatment objectives and ranks treatment modalities with pros, cons, and evidence citations.'
  },
  {
    step: 7,
    name: 'Staged Plan Synthesis',
    subtitle: 'Archwires, Mechanics & Retention',
    icon: Layers,
    tag: 'Complete Clinical Plan',
    description: 'Generates a ready-to-execute staged treatment plan: archwire sequence (.014 CuNiTi to .019x.025 SS), elastics, anchorage, and dual retention.',
    clinicalFocus: 'Provides chairside mechanics tables, tooth-by-tooth FDI bracket prescriptions, and patient consent documentation.'
  }
];

export function EngineShowcase() {
  const [selectedLayer, setSelectedLayer] = useState(PIPELINE_LAYERS[0]);

  return (
    <section id="engine" className="py-24 sm:py-32 relative bg-slate-900 border-t border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="bg-teal-500/10 text-teal-300 border-teal-500/20 text-xs px-3 py-1 font-semibold rounded-full">
            Clinical Architecture
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            The 7-Layer Clinical AI Pipeline.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Generic LLMs hallucinate tooth numbers and force levels. Odonto AI runs a 7-stage deterministic diagnostic pipeline before synthesizing any clinical plan.
          </p>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-16">
          <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 font-mono">
              85%
            </div>
            <div className="text-xs font-semibold text-slate-300 mt-1">Diagnosis Time Saved</div>
            <p className="text-[11px] text-slate-500 mt-0.5">From ceph to staged plan</p>
          </div>

          <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400 font-mono">
              100%
            </div>
            <div className="text-xs font-semibold text-slate-300 mt-1">Biological Safety Check</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Cortical bone boundary limits</p>
          </div>

          <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-mono">
              0 mm
            </div>
            <div className="text-xs font-semibold text-slate-300 mt-1">Anchor Loss with TADs</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Calculated skeletal vectors</p>
          </div>

          <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-teal-300 font-mono">
              11+
            </div>
            <div className="text-xs font-semibold text-slate-300 mt-1">Evidence Modules</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Peer-reviewed orthodontic data</p>
          </div>
        </div>

        {/* Interactive Layer Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical Layer Stepper */}
          <div className="lg:col-span-6 space-y-2">
            {PIPELINE_LAYERS.map((layer) => {
              const LayerIcon = layer.icon;
              const isSelected = selectedLayer.step === layer.step;

              return (
                <button
                  key={layer.step}
                  type="button"
                  onClick={() => setSelectedLayer(layer)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                      : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}>
                      {layer.step}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold truncate text-white">
                        {layer.name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {layer.subtitle}
                      </div>
                    </div>
                  </div>
                  <Badge className={`text-[10px] shrink-0 font-mono ${
                    isSelected ? 'bg-blue-600 text-white border-none' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}>
                    {layer.tag}
                  </Badge>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Layer Deep Dive Card */}
          <div className="lg:col-span-6 bg-slate-950/80 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white shadow-md">
                  <selectedLayer.icon className="w-5 h-5" />
                </div>
                <div>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-[10px] font-mono">
                    Layer 0{selectedLayer.step} of 07
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                    {selectedLayer.name}
                  </h3>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  How This Layer Works:
                </span>
                <p className="leading-relaxed text-slate-300">
                  {selectedLayer.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/50 space-y-1 text-xs">
                <span className="font-bold text-blue-300 block flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-teal-400" />
                  Clinical & Biomechanical Safety Value:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedLayer.clinicalFocus}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">Experience this live in the Treatment Studio</span>
              <Link href="/plans/generate">
                <Button size="sm" className="bg-white text-slate-950 hover:bg-slate-100 text-xs font-semibold rounded-full gap-1.5">
                  <span>Open Studio</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
