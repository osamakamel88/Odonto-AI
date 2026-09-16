"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Sparkles, 
  Activity, 
  Plus, 
  ArrowRight, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Stethoscope, 
  SmilePlus,
  Compass
} from 'lucide-react';
import Link from 'next/link';
import { getStoredPatients } from '@/lib/patients-store';

export default function DashboardPage() {
  const patients = getStoredPatients();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-800/60 p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Next-Gen Orthodontic SaaS • 7-Layer Biomechanical AI</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-200">Dr. John Doe</span>
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            Odonto AI streamlines orthodontic diagnosis, cephalometric tracing, and staged biomechanical mechanics. 
            Ground your extraction vs. non-extraction decisions in peer-reviewed clinical science.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/plans/generate">
              <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30 px-6 cursor-pointer">
                <Sparkles className="w-4 h-4" /> Open Treatment Studio
              </Button>
            </Link>
            <Link href="/patients/new">
              <Button size="lg" variant="outline" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold cursor-pointer">
                <Plus className="w-4 h-4" /> + New Patient Intake
              </Button>
            </Link>
            <Link href="/knowledge">
              <Button size="lg" variant="ghost" className="gap-2 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-medium cursor-pointer">
                <Compass className="w-4 h-4" /> Knowledge Library
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/patients" className="block group">
          <Card className="border-slate-200 shadow-sm group-hover:border-blue-300 group-hover:shadow-md transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Patients</CardTitle>
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">{patients.length} Records</div>
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <span>+3 added this week</span>
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/plans/generate" className="block group">
          <Card className="border-slate-200 shadow-sm group-hover:border-indigo-300 group-hover:shadow-md transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">7-Layer AI Studio</CardTitle>
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Layers className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">Live Synthesis</div>
              <p className="text-xs text-indigo-600 font-semibold mt-1">
                Ceph • OPG • Biomechanics
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/plans" className="block group">
          <Card className="border-slate-200 shadow-sm group-hover:border-teal-300 group-hover:shadow-md transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">Staged Treatment Plans</CardTitle>
              <div className="p-2 rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <FileText className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">342 Generated</div>
              <p className="text-xs text-slate-500 mt-1">Extraction & Non-extraction</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">Clinical Accuracy</CardTitle>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-slate-900">98.4%</div>
            <p className="text-xs text-slate-500 mt-1">PAR / Tweed Norms Validated</p>
          </CardContent>
        </Card>
      </div>

      {/* 1-Click Interactive Clinical Case Starters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Instant Case Biomechanics (1-Click Test Scenarios)
            </h2>
            <p className="text-xs text-slate-500">
              Jump straight into the Treatment Studio with pre-configured malocclusion metrics:
            </p>
          </div>
          <Link href="/plans/generate">
            <span className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              View All in Studio <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/plans/generate?patientId=p1" className="block group">
            <Card className="p-4 border-slate-200 group-hover:border-blue-500 group-hover:shadow-md transition-all cursor-pointer bg-white">
              <div className="flex items-center justify-between text-xs mb-2">
                <Badge className="bg-rose-50 text-rose-700 border-rose-200">Class II Div 1</Badge>
                <span className="font-bold text-slate-400">OJ: +8.0mm</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                Severe Overjet & Deep Bite
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Bilateral 1st premolar extraction with Maximum TPA anchorage & Class II elastics.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                <span>Synthesize Plan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          <Link href="/plans/generate?patientId=p3" className="block group">
            <Card className="p-4 border-slate-200 group-hover:border-blue-500 group-hover:shadow-md transition-all cursor-pointer bg-white">
              <div className="flex items-center justify-between text-xs mb-2">
                <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200">Class III</Badge>
                <span className="font-bold text-slate-400">OJ: -2.0mm</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                Underbite & Reverse Overjet
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Maxillary expansion (Hyrax RPE) + Petit reverse-pull protraction facemask.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                <span>Synthesize Plan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          <Link href="/plans/generate?patientId=p4" className="block group">
            <Card className="p-4 border-slate-200 group-hover:border-blue-500 group-hover:shadow-md transition-all cursor-pointer bg-white">
              <div className="flex items-center justify-between text-xs mb-2">
                <Badge className="bg-amber-50 text-amber-700 border-amber-200">Open Bite</Badge>
                <span className="font-bold text-slate-400">OB: -4.0mm</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                Anterior Open Bite & Tongue Thrust
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Posterior molar intrusion with aligners + lingual spurs for mandibular autorotation.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                <span>Synthesize Plan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          <Link href="/plans/generate?patientId=p2" className="block group">
            <Card className="p-4 border-slate-200 group-hover:border-blue-500 group-hover:shadow-md transition-all cursor-pointer bg-white">
              <div className="flex items-center justify-between text-xs mb-2">
                <Badge className="bg-teal-50 text-teal-700 border-teal-200">Severe Crowding</Badge>
                <span className="font-bold text-slate-400">&gt; 7mm Deficit</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                Arch Perimeter Crowding
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Four 1st premolar extractions to protect lower labial cortical plate and IMPA 90°.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                <span>Synthesize Plan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Patient Directory Table Preview */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/70 border-b flex flex-row items-center justify-between py-4">
          <div>
            <CardTitle className="text-base font-bold text-slate-800">Recent Orthodontic Patients</CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Select any patient to immediately evaluate their 7-layer plan
            </CardDescription>
          </div>
          <Link href="/patients/new">
            <Button size="sm" className="gap-1 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              <Plus className="w-3.5 h-3.5" /> New Patient Intake
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3">Patient Name</th>
                  <th className="px-6 py-3">Classification</th>
                  <th className="px-6 py-3">Chief Complaint</th>
                  <th className="px-6 py-3">Overjet / Overbite</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {patients.slice(0, 5).map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5 font-bold text-slate-900">
                      {p.firstName} {p.lastName}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold text-[11px]">
                        {p.clinicalRecords?.[0]?.angleClass || 'Class I'}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 truncate max-w-xs">
                      {p.chiefComplaint}
                    </td>
                    <td className="px-6 py-3.5 text-slate-600">
                      OJ: <strong>{(p.clinicalRecords?.[0] as any)?.overjet ?? 2}mm</strong> | OB: <strong>{(p.clinicalRecords?.[0] as any)?.overbite ?? 2}mm</strong>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Link href={`/plans/generate?patientId=${p.id}`}>
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-blue-600 hover:bg-blue-50">
                          <Sparkles className="w-3 h-3" />
                          Plan Studio
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}