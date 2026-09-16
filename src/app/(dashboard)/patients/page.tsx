"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMockPatients } from '@/lib/db/mock-data';
import { Search, Plus, Sparkles, FileText, ArrowRight, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const allPatients = getMockPatients();

  const filteredPatients = allPatients.filter(p => 
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.clinicalRecords[0]?.angleClass?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Orthodontic Patients</h1>
            <Badge className="bg-blue-100 text-blue-800 border-none font-semibold">
              {allPatients.length} Active Records
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage patient records, clinical exams, cephalometric tracings, and staged AI treatment plans
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/patients/new">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-semibold">
              <Plus className="h-4 w-4" /> New Patient
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search patients by name, complaint, or Angle class..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Patient Table */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Patient Name</th>
                  <th className="px-6 py-3.5">Gender / Age</th>
                  <th className="px-6 py-3.5">Angle Classification</th>
                  <th className="px-6 py-3.5">Chief Complaint</th>
                  <th className="px-6 py-3.5">Overjet / Overbite</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.map(p => {
                  const cr = p.clinicalRecords[0];
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                            {p.firstName[0]}{p.lastName[0]}
                          </div>
                          <div>
                            <span className="text-blue-600 hover:underline cursor-pointer block text-xs">
                              {p.firstName} {p.lastName}
                            </span>
                            <span className="text-[10px] text-slate-400 font-normal">{p.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium capitalize">
                        {p.gender}, 14 yrs
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded font-semibold text-[11px] border border-slate-200">
                          {cr?.angleClass || 'Class I'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-700 max-w-xs truncate" title={p.chiefComplaint}>
                        {p.chiefComplaint}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        OJ: <strong className="text-slate-900">{(cr as any)?.overjet ?? 2}mm</strong> | OB: <strong className="text-slate-900">{(cr as any)?.overbite ?? 2}mm</strong>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/plans/generate`}>
                          <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Sparkles className="w-3 h-3" />
                            Plan Studio
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}