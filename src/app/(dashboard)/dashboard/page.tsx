"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Sparkles, 
  Plus, 
  ArrowRight, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Compass
} from 'lucide-react';
import Link from 'next/link';
import { getStoredPatients } from '@/lib/patients-store';
import { useLanguage } from '@/lib/i18n/language-context';
import { APP_DICTIONARY } from '@/lib/i18n/app-dictionary';

export default function DashboardPage() {
  const patients = getStoredPatients();
  const { lang, isAr } = useLanguage();
  const t = APP_DICTIONARY[lang] || APP_DICTIONARY.en;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-800/60 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.dashboard.badge}</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {t.dashboard.welcomeBack}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-200">
              {isAr ? 'د. جون دو' : 'Dr. John Doe'}
            </span>
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            {t.dashboard.welcomeSub}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/plans/generate">
              <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30 px-6 cursor-pointer">
                <Sparkles className="w-4 h-4" /> {t.dashboard.openStudioBtn}
              </Button>
            </Link>
            <Link href="/patients/new">
              <Button size="lg" variant="outline" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold cursor-pointer">
                <Plus className="w-4 h-4" /> {t.dashboard.newPatientIntakeBtn}
              </Button>
            </Link>
            <Link href="/knowledge">
              <Button size="lg" variant="ghost" className="gap-2 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-medium cursor-pointer">
                <Compass className="w-4 h-4" /> {t.dashboard.knowledgeLibBtn}
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className={`absolute ${isAr ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'} top-0 bottom-0 w-1/3 from-blue-600/20 to-transparent pointer-events-none`} />
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/patients" className="block group">
          <Card className="border-slate-200 shadow-sm group-hover:border-blue-300 group-hover:shadow-md transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t.dashboard.activePatientsLabel}
              </CardTitle>
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">
                {patients.length} {t.dashboard.recordsUnit}
              </div>
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <span>{t.dashboard.addedThisWeek}</span>
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/plans/generate" className="block group">
          <Card className="border-slate-200 shadow-sm group-hover:border-indigo-300 group-hover:shadow-md transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t.dashboard.aiStudioLabel}
              </CardTitle>
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Layers className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">
                {t.dashboard.liveSynthesis}
              </div>
              <p className="text-xs text-indigo-600 font-semibold mt-1">
                {t.dashboard.liveSynthesisSub}
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/plans" className="block group">
          <Card className="border-slate-200 shadow-sm group-hover:border-teal-300 group-hover:shadow-md transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t.dashboard.stagedPlansLabel}
              </CardTitle>
              <div className="p-2 rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <FileText className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">
                342 {t.dashboard.plansGenerated}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {t.dashboard.plansSub}
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.dashboard.clinicalAccuracyLabel}
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-slate-900">
              {t.dashboard.accuracyRate}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t.dashboard.accuracySub}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 1-Click Interactive Clinical Case Starters */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              {t.dashboard.instantTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {t.dashboard.instantSubtitle}
            </p>
          </div>
          <Link href="/plans/generate">
            <span className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              {t.dashboard.viewAllInStudio} <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/plans/generate?patientId=p1" className="block group">
            <Card className="p-4 border-slate-200 group-hover:border-blue-500 group-hover:shadow-md transition-all cursor-pointer bg-white">
              <div className="flex items-center justify-between text-xs mb-2">
                <Badge className="bg-rose-50 text-rose-700 border-rose-200">
                  {t.dashboard.cases.class2Title}
                </Badge>
                <span className="font-bold text-slate-400 font-mono" dir="ltr">OJ: +8.0mm</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                {t.dashboard.cases.class2Subtitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {t.dashboard.cases.class2Desc}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                <span>{t.dashboard.synthesizePlanBtn}</span>
                <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </div>
            </Card>
          </Link>

          <Link href="/plans/generate?patientId=p3" className="block group">
            <Card className="p-4 border-slate-200 group-hover:border-blue-500 group-hover:shadow-md transition-all cursor-pointer bg-white">
              <div className="flex items-center justify-between text-xs mb-2">
                <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200">
                  {t.dashboard.cases.class3Title}
                </Badge>
                <span className="font-bold text-slate-400 font-mono" dir="ltr">OJ: -2.0mm</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                {t.dashboard.cases.class3Subtitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {t.dashboard.cases.class3Desc}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                <span>{t.dashboard.synthesizePlanBtn}</span>
                <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </div>
            </Card>
          </Link>

          <Link href="/plans/generate?patientId=p4" className="block group">
            <Card className="p-4 border-slate-200 group-hover:border-blue-500 group-hover:shadow-md transition-all cursor-pointer bg-white">
              <div className="flex items-center justify-between text-xs mb-2">
                <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                  {t.dashboard.cases.openBiteTitle}
                </Badge>
                <span className="font-bold text-slate-400 font-mono" dir="ltr">OB: -4.0mm</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                {t.dashboard.cases.openBiteSubtitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {t.dashboard.cases.openBiteDesc}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                <span>{t.dashboard.synthesizePlanBtn}</span>
                <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </div>
            </Card>
          </Link>

          <Link href="/plans/generate?patientId=p2" className="block group">
            <Card className="p-4 border-slate-200 group-hover:border-blue-500 group-hover:shadow-md transition-all cursor-pointer bg-white">
              <div className="flex items-center justify-between text-xs mb-2">
                <Badge className="bg-teal-50 text-teal-700 border-teal-200">
                  {t.dashboard.cases.crowdingTitle}
                </Badge>
                <span className="font-bold text-slate-400 font-mono" dir="ltr">&gt; 7mm Deficit</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                {t.dashboard.cases.crowdingSubtitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {t.dashboard.cases.crowdingDesc}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                <span>{t.dashboard.synthesizePlanBtn}</span>
                <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Patient Directory Table Preview */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/70 border-b flex flex-row items-center justify-between py-4">
          <div>
            <CardTitle className="text-base font-bold text-slate-800">
              {t.dashboard.tableTitle}
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              {t.dashboard.tableSubtitle}
            </CardDescription>
          </div>
          <Link href="/patients/new">
            <Button size="sm" className="gap-1 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> {t.dashboard.newPatientIntakeBtn}
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left" dir={isAr ? 'rtl' : 'ltr'}>
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3">{t.dashboard.colPatient}</th>
                  <th className="px-6 py-3">{t.dashboard.colClassification}</th>
                  <th className="px-6 py-3">{t.dashboard.colComplaint}</th>
                  <th className="px-6 py-3">{t.dashboard.colMeasurements}</th>
                  <th className={`px-6 py-3 ${isAr ? 'text-left' : 'text-right'}`}>{t.dashboard.colAction}</th>
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
                      OJ: <strong className="font-mono" dir="ltr">{(p.clinicalRecords?.[0] as any)?.overjet ?? 2}mm</strong> | OB: <strong className="font-mono" dir="ltr">{(p.clinicalRecords?.[0] as any)?.overbite ?? 2}mm</strong>
                    </td>
                    <td className={`px-6 py-3.5 ${isAr ? 'text-left' : 'text-right'}`}>
                      <Link href={`/plans/generate?patientId=${p.id}`}>
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-blue-600 hover:bg-blue-50 cursor-pointer">
                          <Sparkles className="w-3 h-3" />
                          {t.dashboard.planStudioAction}
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