"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getStoredPatients, StoredPatient } from '@/lib/patients-store';
import { Search, Plus, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/language-context';
import { APP_DICTIONARY } from '@/lib/i18n/app-dictionary';

export default function PatientsPage() {
  const { lang, isAr } = useLanguage();
  const t = APP_DICTIONARY[lang] || APP_DICTIONARY.en;

  const [searchQuery, setSearchQuery] = useState('');
  const [allPatients, setAllPatients] = useState<StoredPatient[]>([]);

  useEffect(() => {
    setAllPatients(getStoredPatients());
  }, []);

  const filteredPatients = allPatients.filter(p => 
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.chiefComplaint || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.clinicalRecords?.[0]?.angleClass || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">{t.patientsPage.title}</h1>
            <Badge className="bg-blue-100 text-blue-800 border-none font-semibold">
              {allPatients.length} {isAr ? 'سجلات نشطة' : 'Active Records'}
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {t.patientsPage.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/patients/new">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-semibold cursor-pointer">
              <Plus className="h-4 w-4" /> {t.patientsPage.newPatientBtn}
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className={`w-4 h-4 absolute ${isAr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} />
        <input
          type="text"
          placeholder={t.patientsPage.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full bg-white border border-slate-300 rounded-lg ${isAr ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      {/* Patient Table */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left" dir={isAr ? 'rtl' : 'ltr'}>
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">{t.patientsPage.colName}</th>
                  <th className="px-6 py-3.5">{t.patientsPage.colAgeGender}</th>
                  <th className="px-6 py-3.5">{t.patientsPage.colAngleClass}</th>
                  <th className="px-6 py-3.5">{t.patientsPage.colChiefComplaint}</th>
                  <th className="px-6 py-3.5">{isAr ? 'البروز / التراكب' : 'Overjet / Overbite'}</th>
                  <th className="px-6 py-3.5">{t.patientsPage.colStatus}</th>
                  <th className={`px-6 py-3.5 ${isAr ? 'text-left' : 'text-right'}`}>{t.patientsPage.colActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.map(p => {
                  const cr = p.clinicalRecords?.[0];
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                            {p.firstName?.[0] || 'P'}{p.lastName?.[0] || ''}
                          </div>
                          <div>
                            <Link href={`/plans/generate?patientId=${p.id}`}>
                              <span className="text-blue-600 hover:underline cursor-pointer block text-xs">
                                {p.firstName} {p.lastName}
                              </span>
                            </Link>
                            <span className="text-[10px] text-slate-400 font-normal">{p.phone || 'N/A'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium capitalize">
                        {isAr ? (p.gender === 'female' ? 'أنثى' : 'ذكر') : p.gender}، {p.age || 15} {isAr ? 'سنة' : 'yrs'}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="bg-slate-50 text-slate-800 border-slate-300 font-bold text-[11px]">
                          {cr?.angleClass || 'Class I'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-slate-700 max-w-xs truncate">
                        {p.chiefComplaint || (isAr ? 'فحص تقويم واستشارة' : 'Consultation')}
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-mono" dir="ltr">
                        OJ: +{(cr as any)?.overjet ?? 2.0}mm | OB: +{(cr as any)?.overbite ?? 2.0}mm
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-semibold">
                          {isAr ? 'نشط بالعيادة' : (p.status || 'Active')}
                        </Badge>
                      </td>
                      <td className={`px-6 py-4 ${isAr ? 'text-left' : 'text-right'}`}>
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/plans/generate?patientId=${p.id}`}>
                            <Button size="sm" variant="outline" className="h-7 text-xs gap-1 border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold cursor-pointer">
                              <Sparkles className="w-3 h-3 text-blue-600" />
                              <span>{t.patientsPage.launchPlan}</span>
                            </Button>
                          </Link>
                        </div>
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