"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Plus, Clock, FileText, CheckCircle2, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';

export default function PlansPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const plans = [
    {
      id: 'plan-1',
      patient: 'Sarah Jenkins',
      age: 14,
      diagnosis: 'Angle Class II Div 1 (ANB 5.2°, OJ 8mm)',
      modality: 'Fixed MBT 0.022" Appliance',
      extraction: 'Extraction (14, 24)',
      duration: '20–24 Months',
      date: '2026-03-12',
      status: 'Active Treatment',
      aiConfidence: '96%'
    },
    {
      id: 'plan-2',
      patient: 'Michael Chen',
      age: 25,
      diagnosis: 'Class I Severe Maxillary & Mandibular Crowding',
      modality: 'Clear Aligners with IPR & Skeletal Expansion',
      extraction: 'Non-Extraction',
      duration: '18–20 Months',
      date: '2026-03-08',
      status: 'Clinician Approved',
      aiConfidence: '94%'
    },
    {
      id: 'plan-3',
      patient: 'Lucas Vance',
      age: 12,
      diagnosis: 'Developing Class III Anterior Crossbite & Reverse Overjet',
      modality: 'Interceptive Reverse-Pull Facemask + RPE',
      extraction: 'Phase 1 Orthopedic',
      duration: '9–12 Months',
      date: '2026-03-02',
      status: 'In Progress',
      aiConfidence: '91%'
    },
    {
      id: 'plan-4',
      patient: 'Chloe Martinez',
      age: 30,
      diagnosis: 'Class I Anterior Open Bite (3mm) with Tongue Thrust',
      modality: 'Clear Aligners with Posterior Intrusion & Habit Appliance',
      extraction: 'Non-Extraction',
      duration: '14–16 Months',
      date: '2026-02-24',
      status: 'Completed / Retention',
      aiConfidence: '95%'
    }
  ];

  const filteredPlans = plans.filter(p => 
    p.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.modality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Treatment Plans Archive</h1>
            <Badge className="bg-blue-100 text-blue-800 border-none font-semibold">
              {plans.length} Staged Protocols
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Browse and review comprehensive orthodontic treatment plans generated with AI assistance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/plans/generate">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-semibold">
              <Sparkles className="h-4 w-4" /> Generate New Plan
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search plans by patient, diagnosis, or modality..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Plans Table */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Patient Case</th>
                  <th className="px-6 py-3.5">Orthodontic Diagnosis</th>
                  <th className="px-6 py-3.5">Prescribed Modality</th>
                  <th className="px-6 py-3.5">Extraction Protocol</th>
                  <th className="px-6 py-3.5">Duration</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPlans.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                          {p.patient[0]}
                        </div>
                        <div>
                          <span className="text-slate-900 block font-bold text-xs">{p.patient}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{p.age} years old</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 max-w-xs font-medium">
                      {p.diagnosis}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                        {p.modality}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                        p.extraction.includes('Extraction') && !p.extraction.includes('Non') 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {p.extraction}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{p.duration}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/plans/generate`}>
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <FileText className="w-3 h-3" />
                          Open Plan
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