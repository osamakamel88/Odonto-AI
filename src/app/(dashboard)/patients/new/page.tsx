"use client";

import React from 'react';
import { ClinicalFindingsForm } from '@/components/clinical/clinical-findings-form';
import { useLanguage } from '@/lib/i18n/language-context';

export default function NewPatientPage() {
  const { isAr } = useLanguage();

  return (
    <div className="space-y-6" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {isAr ? 'إدخال ملف مريض جديد والفحص السريري' : 'New Patient Intake & Clinical Records'}
        </h2>
      </div>
      <ClinicalFindingsForm />
    </div>
  );
}