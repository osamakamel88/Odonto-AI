"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Clock, FileText, Search } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/language-context';
import { APP_DICTIONARY } from '@/lib/i18n/app-dictionary';

interface StagedPlanItem {
  id: string;
  patientEn: string;
  patientAr: string;
  age: number;
  diagnosisEn: string;
  diagnosisAr: string;
  modalityEn: string;
  modalityAr: string;
  extractionEn: string;
  extractionAr: string;
  isExtraction: boolean;
  durationEn: string;
  durationAr: string;
  date: string;
  statusEn: string;
  statusAr: string;
  aiConfidence: string;
}

const STAGED_PLANS: StagedPlanItem[] = [
  {
    id: 'plan-1',
    patientEn: 'Sarah Jenkins',
    patientAr: 'سارة جينكينز',
    age: 14,
    diagnosisEn: 'Angle Class II Div 1 (ANB 5.2°, OJ 8mm)',
    diagnosisAr: 'صنف ثانٍ تقسيم 1 (زاوية ANB 5.2°، بروز 8 مم)',
    modalityEn: 'Fixed MBT 0.022" Appliance',
    modalityAr: 'تقويم ثابت معدني - وصفة MBT 0.022"',
    extractionEn: 'Extraction (14, 24)',
    extractionAr: 'خلع ضواحك علوية (14، 24)',
    isExtraction: true,
    durationEn: '20–24 Months',
    durationAr: '20–24 شهراً',
    date: '2026-03-12',
    statusEn: 'Active Treatment',
    statusAr: 'علاج نشط بالعيادة',
    aiConfidence: '96%'
  },
  {
    id: 'plan-2',
    patientEn: 'Michael Chen',
    patientAr: 'مايكل تشن',
    age: 25,
    diagnosisEn: 'Class I Severe Maxillary & Mandibular Crowding',
    diagnosisAr: 'صنف أول - تزاحم حاد بالفكين العلوي والسفلي',
    modalityEn: 'Clear Aligners with IPR & Skeletal Expansion',
    modalityAr: 'قوالب شفافة مع برد مينا وتوسيع هيكلي',
    extractionEn: 'Non-Extraction',
    extractionAr: 'بدون خلع (تحفظي)',
    isExtraction: false,
    durationEn: '18–20 Months',
    durationAr: '18–20 شهراً',
    date: '2026-03-08',
    statusEn: 'Clinician Approved',
    statusAr: 'معتمد سريرياً',
    aiConfidence: '94%'
  },
  {
    id: 'plan-3',
    patientEn: 'Lucas Vance',
    patientAr: 'لوكاس فانس',
    age: 12,
    diagnosisEn: 'Developing Class III Anterior Crossbite & Reverse Overjet',
    diagnosisAr: 'صنف ثالث في طور النمو - عضة معكوسة أمامية',
    modalityEn: 'Interceptive Reverse-Pull Facemask + RPE',
    modalityAr: 'قناع الشد العكسي للوجه + جهاز Hyrax RPE',
    extractionEn: 'Phase 1 Orthopedic',
    extractionAr: 'مرحلة أولى عظمية وقائية',
    isExtraction: false,
    durationEn: '9–12 Months',
    durationAr: '9–12 شهراً',
    date: '2026-03-02',
    statusEn: 'In Progress',
    statusAr: 'قيد التنفيذ والمتابعة',
    aiConfidence: '91%'
  },
  {
    id: 'plan-4',
    patientEn: 'Chloe Martinez',
    patientAr: 'كلوي مارتينيز',
    age: 30,
    diagnosisEn: 'Class I Anterior Open Bite (3mm) with Tongue Thrust',
    diagnosisAr: 'صنف أول - عضة أمامية مفتوحة 3 مم مع دفع اللسان',
    modalityEn: 'Clear Aligners with Posterior Intrusion & Habit Appliance',
    modalityAr: 'قوالب شفافة لغرز الأضراس وجهاز منع دفع اللسان',
    extractionEn: 'Non-Extraction',
    extractionAr: 'بدون خلع (تحفظي)',
    isExtraction: false,
    durationEn: '14–16 Months',
    durationAr: '14–16 شهراً',
    date: '2026-02-24',
    statusEn: 'Completed / Retention',
    statusAr: 'مكتمل / مرحلة التثبيت',
    aiConfidence: '95%'
  }
];

export default function PlansPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { lang, isAr } = useLanguage();
  const t = APP_DICTIONARY[lang] || APP_DICTIONARY.en;

  const filteredPlans = STAGED_PLANS.filter(p => {
    const q = searchQuery.toLowerCase();
    const patientMatch = isAr ? p.patientAr.includes(searchQuery) : p.patientEn.toLowerCase().includes(q);
    const diagnosisMatch = isAr ? p.diagnosisAr.includes(searchQuery) : p.diagnosisEn.toLowerCase().includes(q);
    const modalityMatch = isAr ? p.modalityAr.includes(searchQuery) : p.modalityEn.toLowerCase().includes(q);
    return patientMatch || diagnosisMatch || modalityMatch;
  });

  return (
    <div className="space-y-6 select-none" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">{t.plansPage.title}</h1>
            <Badge className="bg-blue-100 text-blue-800 border-none font-semibold">
              {STAGED_PLANS.length} {isAr ? 'بروتوكولات مرحلية' : 'Staged Protocols'}
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {t.plansPage.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/plans/generate">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-semibold cursor-pointer">
              <Sparkles className="h-4 w-4" /> {t.plansPage.createNewBtn}
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className={`w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ${isAr ? 'right-3' : 'left-3'}`} />
        <input
          type="text"
          placeholder={t.plansPage.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full bg-white border border-slate-300 rounded-lg py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isAr ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
          }`}
        />
      </div>

      {/* Plans Table */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className={`w-full text-xs ${isAr ? 'text-right' : 'text-left'}`}>
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">{t.plansPage.colPatient}</th>
                  <th className="px-6 py-3.5">{isAr ? 'التشخيص التقويمي' : 'Orthodontic Diagnosis'}</th>
                  <th className="px-6 py-3.5">{t.plansPage.colModality}</th>
                  <th className="px-6 py-3.5">{isAr ? 'قرار الخلع' : 'Extraction Protocol'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'المدة التقديرية' : 'Duration'}</th>
                  <th className="px-6 py-3.5">{t.plansPage.colStatus}</th>
                  <th className={`px-6 py-3.5 ${isAr ? 'text-left' : 'text-right'}`}>{t.plansPage.colActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPlans.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {(isAr ? p.patientAr : p.patientEn)[0]}
                        </div>
                        <div>
                          <span className="text-slate-900 block font-bold text-xs">
                            {isAr ? p.patientAr : p.patientEn}
                          </span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {p.age} {isAr ? 'سنة' : 'years old'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 max-w-xs font-medium">
                      {isAr ? p.diagnosisAr : p.diagnosisEn}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                        {isAr ? p.modalityAr : p.modalityEn}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                        p.isExtraction
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isAr ? p.extractionAr : p.extractionEn}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{isAr ? p.durationAr : p.durationEn}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {isAr ? p.statusAr : p.statusEn}
                      </span>
                    </td>
                    <td className={`px-6 py-4 ${isAr ? 'text-left' : 'text-right'}`}>
                      <Link href="/plans/generate">
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer">
                          <FileText className="w-3 h-3" />
                          {t.plansPage.viewPlan}
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