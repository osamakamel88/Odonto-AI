import React from 'react';
import { ClinicalFindingsForm } from '@/components/clinical/clinical-findings-form';

export default function NewPatientPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">New Patient</h2>
      </div>
      <ClinicalFindingsForm />
    </div>
  );
}