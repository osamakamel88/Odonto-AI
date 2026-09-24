"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PlanBuilder, TreatmentPlanData } from '@/components/clinical/plan-builder';
import { CephViewer } from '@/components/clinical/ceph-viewer';
import { ToothChart } from '@/components/clinical/tooth-chart';
import { PanoramicViewer } from '@/components/clinical/panoramic-viewer';
import { BoltonAnalysisCard } from '@/components/clinical/bolton-analysis-card';
import { Dental3DViewer } from '@/components/clinical/dental-3d-viewer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getStoredPatients, StoredPatient } from '@/lib/patients-store';
import { 
  Sparkles, 
  UserCheck, 
  Stethoscope, 
  Sliders, 
  RefreshCw, 
  CheckCircle2, 
  Plus, 
  Zap, 
  Layers, 
  Ruler, 
  Languages 
} from 'lucide-react';
import Link from 'next/link';
import { OnboardingTour } from '@/components/clinical/onboarding-tour';
import { STUDIO_DICTIONARY, StudioLanguage } from '@/lib/i18n/studio-dictionary';

function GeneratePlanContent() {
  const searchParams = useSearchParams();
  const urlPatientId = searchParams.get('patientId');

  // Bilingual State (persisted in localStorage)
  const [lang, setLang] = useState<StudioLanguage>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('odonto_studio_lang') as StudioLanguage;
      if (savedLang === 'en' || savedLang === 'ar') {
        setLang(savedLang);
      }
    }
  }, []);

  const switchLanguage = (newLang: StudioLanguage) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('odonto_studio_lang', newLang);
    }
  };

  const t = STUDIO_DICTIONARY[lang] || STUDIO_DICTIONARY.en;
  const isAr = lang === 'ar';

  const [patients, setPatients] = useState<StoredPatient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [activeDiagnosticTab, setActiveDiagnosticTab] = useState<'ceph' | 'odontogram' | 'panoramic' | 'bolton' | 'model3d'>('ceph');

  // Interactive Onboarding Tour State
  const [showTour, setShowTour] = useState<boolean>(false);

  // Custom patient input state matching user test case
  const [customPatient, setCustomPatient] = useState({
    name: 'John Doe',
    age: 15,
    gender: 'male',
    chiefComplaint: 'Severe underbite and lower teeth in front of upper teeth',
    angleClass: 'Class III',
    overjet: -4.0,
    overbite: 1.0,
    crowdingUpper: 'moderate',
    impa: 86
  });

  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'expert'>('beginner');
  const [modality, setModality] = useState<'fixed_mbt' | 'aligners' | 'functional' | 'surgical'>('fixed_mbt');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [generatedPlan, setGeneratedPlan] = useState<TreatmentPlanData | undefined>(undefined);

  // Load patients from storage on mount
  useEffect(() => {
    const list = getStoredPatients();
    setPatients(list);
    if (urlPatientId && list.some(p => p.id === urlPatientId)) {
      setSelectedPatientId(urlPatientId);
      setIsCustomMode(false);
    } else if (list.length > 0) {
      setSelectedPatientId(list[0].id);
    }
  }, [urlPatientId]);

  // Auto-launch interactive onboarding tour on first visit if not completed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem('odonto_onboarding_completed');
      if (!completed) {
        const timer = setTimeout(() => {
          setShowTour(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Derive Ceph preset case from patient Angle Class
  const currentAngle = isCustomMode 
    ? customPatient.angleClass 
    : (activePatient?.clinicalRecords?.[0]?.angleClass || 'Class II');
  const currentOverjet = isCustomMode 
    ? customPatient.overjet 
    : ((activePatient?.clinicalRecords?.[0] as any)?.overjet ?? 2);
  const currentOverbite = isCustomMode 
    ? customPatient.overbite 
    : ((activePatient?.clinicalRecords?.[0] as any)?.overbite ?? 2);
  const currentCrowding = isCustomMode 
    ? customPatient.crowdingUpper 
    : ((activePatient?.clinicalRecords?.[0] as any)?.crowdingUpper || 'moderate');

  const cephPresetCase: 'class1' | 'class2' | 'class3' = 
    currentAngle.toLowerCase().includes('iii') || currentOverjet < 0
      ? 'class3'
      : currentAngle.toLowerCase().includes('ii') || currentOverjet > 4
      ? 'class2'
      : 'class1';

  // Auto-generate initial plan when patient changes
  useEffect(() => {
    if (activePatient || isCustomMode) {
      handleGenerate(false);
    }
  }, [selectedPatientId, isCustomMode, modality, experienceLevel]);

  const applyCustomPreset = (preset: 'class3' | 'class2' | 'bimax' | 'openbite') => {
    setIsCustomMode(true);
    if (preset === 'class3') {
      setCustomPatient({
        name: isAr ? 'أحمد حسن (صنف ثالث)' : 'John Doe',
        age: 15,
        gender: 'male',
        chiefComplaint: isAr ? 'عضة معكوسة وبروز الفك السفلي أمام العلوي' : 'Severe underbite and lower teeth in front of upper teeth',
        angleClass: 'Class III',
        overjet: -4.0,
        overbite: 1.0,
        crowdingUpper: 'moderate',
        impa: 86
      });
    } else if (preset === 'class2') {
      setCustomPatient({
        name: isAr ? 'سارة محمود (بروز حاد صنف ثانٍ)' : 'Sarah Severe Class II',
        age: 14,
        gender: 'female',
        chiefComplaint: isAr ? 'بروز شديد في الأسنان العلوية وصعوبة قفل الشفاه' : 'Severe overjet, upper teeth stick out significantly',
        angleClass: 'Class II div 1',
        overjet: 8.5,
        overbite: 5.0,
        crowdingUpper: 'severe',
        impa: 102
      });
    } else if (preset === 'bimax') {
      setCustomPatient({
        name: isAr ? 'آدم كريم (بروز ثنائي للفكين)' : 'Adam Bimaxillary Case',
        age: 22,
        gender: 'male',
        chiefComplaint: isAr ? 'بروز في الشفاه وتزاحم في الأسنان العلوية والسفلية' : 'Protruding lips and crowded teeth',
        angleClass: 'Class I',
        overjet: 6.0,
        overbite: 3.0,
        crowdingUpper: 'severe',
        impa: 104
      });
    } else if (preset === 'openbite') {
      setCustomPatient({
        name: isAr ? 'إلينا ماجد (عضة مفتوحة)' : 'Elena Open Bite',
        age: 18,
        gender: 'female',
        chiefComplaint: isAr ? 'الأسنان الأمامية لا تتلامس عند العض مع صعوبة في بلع الطعام' : 'Front teeth do not touch when biting',
        angleClass: 'Class I',
        overjet: 2.5,
        overbite: -4.5,
        crowdingUpper: 'mild',
        impa: 96
      });
    }
  };

  const handleGenerate = async (showPipelineAnimation: boolean = true) => {
    setIsGenerating(true);
    setCurrentStep(1);

    // Smooth visual progression through all 7 layers
    if (showPipelineAnimation) {
      for (let i = 2; i <= 7; i++) {
        setTimeout(() => setCurrentStep(i), (i - 1) * 350);
      }
    }

    try {
      const payload = isCustomMode ? {
        patientData: {
          name: customPatient.name,
          age: customPatient.age,
          gender: customPatient.gender,
          chiefComplaint: customPatient.chiefComplaint,
          clinicalFindings: {
            angleClass: customPatient.angleClass,
            overjet: customPatient.overjet,
            overbite: customPatient.overbite,
            crowdingUpper: customPatient.crowdingUpper
          }
        },
        clinicalFindings: {
          angleClass: customPatient.angleClass,
          overjet: customPatient.overjet,
          overbite: customPatient.overbite,
          crowdingUpper: customPatient.crowdingUpper
        },
        experienceLevel,
        modality
      } : {
        patientData: {
          name: activePatient ? `${activePatient.firstName} ${activePatient.lastName}` : 'Patient',
          age: activePatient?.age || 15,
          gender: activePatient?.gender || 'male',
          chiefComplaint: activePatient?.chiefComplaint || 'Orthodontic checkup',
          clinicalFindings: activePatient?.clinicalRecords?.[0]
        },
        clinicalFindings: activePatient?.clinicalRecords?.[0],
        experienceLevel,
        modality
      };

      const response = await fetch('/api/ai/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const waitTime = showPipelineAnimation ? 2400 : 150;
        setTimeout(() => {
          setGeneratedPlan(resData.data);
          setIsGenerating(false);
          setCurrentStep(0);
        }, waitTime);
      } else {
        setIsGenerating(false);
        setCurrentStep(0);
      }
    } catch (err) {
      console.error('Plan generation error:', err);
      setIsGenerating(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t.studioTitle}
            </h1>
            <Badge className="bg-blue-100 text-blue-800 border-none font-semibold text-xs">
              {t.pipelineBadge}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.studioSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Authentic Bilingual Language Switcher Pill */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => switchLanguage('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                lang === 'en'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch to English"
            >
              <span>🇺🇸</span>
              <span>English</span>
            </button>
            <button
              type="button"
              onClick={() => switchLanguage('ar')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                lang === 'ar'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="التبديل إلى المصطلحات الطبية العربية المصرية"
            >
              <span>🇪🇬</span>
              <span>العربية</span>
            </button>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowTour(true)} 
            className="flex-1 sm:flex-initial text-xs font-bold gap-1.5 border-blue-300 text-blue-700 bg-blue-50/80 hover:bg-blue-100 cursor-pointer shadow-2xs"
            title={isAr ? "جولة تعريفية تفاعلية لتوضيح خطوات الاستخدام" : "Interactive walkthrough of the studio"}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {t.tourBtn}
          </Button>

          <Link href="/patients/new" className="flex-1 sm:flex-initial">
            <Button variant="outline" size="sm" className="w-full text-xs font-semibold gap-1.5 border-slate-300 cursor-pointer">
              <Plus className="w-3.5 h-3.5 text-blue-600" /> {t.intakeBtn}
            </Button>
          </Link>

          <Button 
            id="tour-generate-btn"
            size="sm"
            onClick={() => handleGenerate(true)} 
            disabled={isGenerating}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 shadow-md shadow-blue-500/20 px-4 h-9 transition-all cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                <span>{t.synthesizingText.replace('{X}', String(currentStep || 1))}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.synthesizeBtn}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Active Interactive Skippable Onboarding Tour */}
      <OnboardingTour 
        isOpen={showTour} 
        onClose={() => setShowTour(false)}
        onFinish={() => {
          handleGenerate(true);
        }}
      />

      {/* 7-Layer Progress Pipeline Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {t.layers.map((l) => {
          const isCurrent = isGenerating && currentStep === l.num;
          const isPassed = isGenerating && currentStep > l.num;
          const isDone = !isGenerating && generatedPlan !== undefined;

          return (
            <div 
              key={l.num} 
              className={`p-2.5 rounded-lg border text-center transition-all ${
                isCurrent 
                  ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300 scale-105 shadow-sm' 
                  : isPassed || isDone
                  ? 'bg-emerald-50/70 border-emerald-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                <span>{t.layerTitle} {l.num}</span>
                {isPassed || isDone ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                ) : isCurrent ? (
                  <RefreshCw className="w-3 h-3 text-blue-600 animate-spin" />
                ) : null}
              </div>
              <div className="text-xs font-bold text-slate-800 truncate">{l.name}</div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">{l.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Patient Mode Selector & Configuration Strip */}
      <Card id="tour-patient-section" className="shadow-sm border-slate-200">
        <CardHeader className="pb-2 border-b bg-slate-50/50 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">{t.caseInputTitle}</span>
            <span className="text-[11px] text-slate-500">{t.caseInputSubtitle}</span>
          </div>

          {/* Preset vs Custom Mode Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200 rounded-lg text-xs">
            <button
              onClick={() => setIsCustomMode(false)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                !isCustomMode ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.selectPatientTab}
            </button>
            <button
              onClick={() => setIsCustomMode(true)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                isCustomMode ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.customPatientTab}
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {!isCustomMode ? (
            /* Mode A: Preset Patients Selector */
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                      {t.patientRecordLabel}
                    </span>
                    <Link href="/patients/new" className="text-[11px] text-blue-600 hover:underline flex items-center gap-0.5">
                      <Plus className="w-3 h-3" /> {t.addNewPatient}
                    </Link>
                  </label>
                  <select 
                    value={selectedPatientId} 
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800"
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.firstName} {p.lastName} — {p.chiefComplaint} ({p.clinicalRecords?.[0]?.angleClass || 'Class I'})
                      </option>
                    ))}
                  </select>
                </div>

                <div id="tour-modality-level" className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
                      {t.clinicianLevelLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setExperienceLevel('beginner')}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          experienceLevel === 'beginner' 
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {t.juniorModeBtn}
                      </button>
                      <button
                        type="button"
                        onClick={() => setExperienceLevel('expert')}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          experienceLevel === 'expert' 
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {t.seniorModeBtn}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-teal-600" />
                      {t.modalityLabel}
                    </label>
                    <select 
                      value={modality} 
                      onChange={(e) => setModality(e.target.value as any)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800"
                    >
                      <option value="fixed_mbt">{t.modalities.fixed_mbt}</option>
                      <option value="aligners">{t.modalities.aligners}</option>
                      <option value="functional">{t.modalities.functional}</option>
                      <option value="surgical">{t.modalities.surgical}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Clinical Baseline strip in Mode A */}
              <div id="tour-clinical-measurements" className="mt-3.5 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-blue-600" />
                    {t.clinicalBaselineLabel}
                  </span>
                  <Badge variant="outline" className="bg-white text-blue-800 border-blue-200 font-bold px-2 py-0.5 shadow-2xs">
                    {currentAngle}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-slate-700">
                  <span>{isAr ? 'البروز الأفقي (Overjet):' : 'Overjet:'} <strong className="text-slate-900 font-mono" dir="ltr">{currentOverjet > 0 ? `+${currentOverjet}` : currentOverjet} mm</strong></span>
                  <span>{isAr ? 'التراكب الرأسي (Overbite):' : 'Overbite:'} <strong className="text-slate-900 font-mono" dir="ltr">{currentOverbite > 0 ? `+${currentOverbite}` : currentOverbite} mm</strong></span>
                  <span>{isAr ? 'التزاحم السنخي:' : 'Crowding:'} <strong className="text-slate-900 capitalize font-medium">{currentCrowding}</strong></span>
                  <span className="text-[11px] text-slate-400" dir="ltr">IMPA: ~86°</span>
                </div>
              </div>
            </div>
          ) : (
            /* Mode B: Custom Patient Clinical Findings Form */
            <div className="space-y-4">
              {/* Quick Preset Buttons in Custom Form */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-blue-50/70 rounded-lg border border-blue-200">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> {t.presetsLabel}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyCustomPreset('class3')}
                    className="px-2.5 py-1 text-xs font-semibold bg-white text-blue-700 border border-blue-300 rounded-md hover:bg-blue-100 transition-all cursor-pointer shadow-xs"
                  >
                    {t.presetClass3}
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCustomPreset('class2')}
                    className="px-2.5 py-1 text-xs font-semibold bg-white text-blue-700 border border-blue-300 rounded-md hover:bg-blue-100 transition-all cursor-pointer shadow-xs"
                  >
                    {t.presetClass2}
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCustomPreset('bimax')}
                    className="px-2.5 py-1 text-xs font-semibold bg-white text-blue-700 border border-blue-300 rounded-md hover:bg-blue-100 transition-all cursor-pointer shadow-xs"
                  >
                    {t.presetBimax}
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCustomPreset('openbite')}
                    className="px-2.5 py-1 text-xs font-semibold bg-white text-blue-700 border border-blue-300 rounded-md hover:bg-blue-100 transition-all cursor-pointer shadow-xs"
                  >
                    {t.presetOpenBite}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{t.fullNameLabel}</label>
                  <input
                    type="text"
                    value={customPatient.name}
                    onChange={(e) => setCustomPatient({ ...customPatient, name: e.target.value })}
                    className="w-full border rounded-lg p-2 bg-slate-50 font-medium"
                    placeholder={t.fullNamePlaceholder}
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{t.ageLabel} &amp; {t.genderLabel}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={customPatient.age}
                      onChange={(e) => setCustomPatient({ ...customPatient, age: Number(e.target.value) })}
                      className="border rounded-lg p-2 bg-slate-50 font-medium"
                      placeholder="Age"
                    />
                    <select
                      value={customPatient.gender}
                      onChange={(e) => setCustomPatient({ ...customPatient, gender: e.target.value })}
                      className="border rounded-lg p-2 bg-slate-50 font-medium"
                    >
                      <option value="male">{t.genderMale}</option>
                      <option value="female">{t.genderFemale}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{t.angleClassLabel}</label>
                  <select
                    value={customPatient.angleClass}
                    onChange={(e) => setCustomPatient({ ...customPatient, angleClass: e.target.value })}
                    className="w-full border rounded-lg p-2 bg-slate-50 font-medium"
                  >
                    <option value="Class I">{t.angleClasses.class1}</option>
                    <option value="Class II div 1">{t.angleClasses.class2_1}</option>
                    <option value="Class II div 2">{t.angleClasses.class2_2}</option>
                    <option value="Class III">{t.angleClasses.class3}</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{t.complaintLabel}</label>
                  <input
                    type="text"
                    value={customPatient.chiefComplaint}
                    onChange={(e) => setCustomPatient({ ...customPatient, chiefComplaint: e.target.value })}
                    className="w-full border rounded-lg p-2 bg-slate-50 font-medium"
                    placeholder={t.complaintPlaceholder}
                  />
                </div>
              </div>

              <div id="tour-clinical-measurements" className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-lg border">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {t.overjetLabel} <span className="text-slate-400 font-normal">{t.overjetSub}</span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={customPatient.overjet}
                    onChange={(e) => setCustomPatient({ ...customPatient, overjet: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 bg-white font-bold text-blue-700"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {t.overbiteLabel} <span className="text-slate-400 font-normal">{t.overbiteSub}</span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={customPatient.overbite}
                    onChange={(e) => setCustomPatient({ ...customPatient, overbite: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 bg-white font-bold text-blue-700"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{t.crowdingUpperLabel}</label>
                  <select
                    value={customPatient.crowdingUpper}
                    onChange={(e) => setCustomPatient({ ...customPatient, crowdingUpper: e.target.value })}
                    className="w-full border rounded-lg p-2 bg-white font-medium"
                  >
                    <option value="none">{t.crowdingOptions.none}</option>
                    <option value="mild">{t.crowdingOptions.mild}</option>
                    <option value="moderate">{t.crowdingOptions.moderate}</option>
                    <option value="severe">{t.crowdingOptions.severe}</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Studio Grid: Diagnostic Imaging vs Plan Output */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Left Column: Segmented Diagnostic Records Hub */}
        <div className="space-y-4">
          {/* Segmented Diagnostic Records Hub Card */}
          <div id="tour-diagnostic-hub" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Hub Header & Status Bar */}
            <div className="bg-slate-50/90 border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="p-1.5 rounded-lg bg-blue-600 text-white shadow-xs shrink-0">
                  <Layers className="w-3.5 h-3.5" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      {t.diagHubTitle}
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {t.liveSyncBadge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    {isAr ? 'الحالة: ' : 'Case: '}<strong className="text-slate-800">{isCustomMode ? customPatient.name : `${activePatient?.firstName} ${activePatient?.lastName}`}</strong> • {currentAngle} • OJ: {currentOverjet}mm
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1.5">
                <Badge variant="outline" className="text-[11px] bg-white text-slate-700 border-slate-200 font-bold px-2 py-0.5 shadow-2xs">
                  {activeDiagnosticTab === 'ceph' && (isAr ? '📐 التتبع السيفالومتري' : '📐 Ceph Tracing')}
                  {activeDiagnosticTab === 'odontogram' && (isAr ? '🦷 مخطط الأسنان FDI' : '🦷 FDI Chart')}
                  {activeDiagnosticTab === 'panoramic' && (isAr ? '🩻 أشعة البانوراما' : '🩻 OPG X-Ray')}
                  {activeDiagnosticTab === 'bolton' && (isAr ? '📊 تحليل بولتون 3D' : '📊 Bolton Space')}
                  {activeDiagnosticTab === 'model3d' && (isAr ? '🧊 مجسم الأسنان 3D' : '🧊 3D Digital Cast')}
                </Badge>
              </div>
            </div>

            {/* Segmented Navigation Tab Buttons */}
            <div className="p-2 bg-slate-100/90 border-b border-slate-200/80 overflow-x-auto no-scrollbar">
              <div className="grid grid-cols-5 gap-1.5 min-w-[420px] text-center">
                {/* Tab 1: Ceph */}
                <button
                  type="button"
                  onClick={() => setActiveDiagnosticTab('ceph')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                    activeDiagnosticTab === 'ceph'
                      ? 'bg-white text-blue-700 font-bold shadow-xs border-blue-200 ring-2 ring-blue-500/20'
                      : 'bg-white/60 hover:bg-white text-slate-600 hover:text-slate-900 border-slate-200/60'
                  }`}
                >
                  <span className="text-base leading-none mb-1">📐</span>
                  <span className="text-xs font-bold leading-tight">{t.tabCephShort}</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full mt-1 bg-blue-50 text-blue-700 uppercase tracking-wider" dir="ltr">
                    {cephPresetCase}
                  </span>
                </button>

                {/* Tab 2: FDI Odontogram */}
                <button
                  type="button"
                  onClick={() => setActiveDiagnosticTab('odontogram')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                    activeDiagnosticTab === 'odontogram'
                      ? 'bg-white text-blue-700 font-bold shadow-xs border-blue-200 ring-2 ring-blue-500/20'
                      : 'bg-white/60 hover:bg-white text-slate-600 hover:text-slate-900 border-slate-200/60'
                  }`}
                >
                  <span className="text-base leading-none mb-1">🦷</span>
                  <span className="text-xs font-bold leading-tight">{t.tabOdontogramShort}</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full mt-1 bg-slate-100 text-slate-700">
                    {isAr ? '32 سناً' : '32 Teeth'}
                  </span>
                </button>

                {/* Tab 3: Panoramic OPG */}
                <button
                  type="button"
                  onClick={() => setActiveDiagnosticTab('panoramic')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                    activeDiagnosticTab === 'panoramic'
                      ? 'bg-white text-blue-700 font-bold shadow-xs border-blue-200 ring-2 ring-blue-500/20'
                      : 'bg-white/60 hover:bg-white text-slate-600 hover:text-slate-900 border-slate-200/60'
                  }`}
                >
                  <span className="text-base leading-none mb-1">🩻</span>
                  <span className="text-xs font-bold leading-tight">{t.tabPanoramicShort}</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full mt-1 bg-emerald-50 text-emerald-700">
                    {isAr ? 'أمان تام' : 'HD Clear'}
                  </span>
                </button>

                {/* Tab 4: Bolton Analysis */}
                <button
                  type="button"
                  onClick={() => setActiveDiagnosticTab('bolton')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                    activeDiagnosticTab === 'bolton'
                      ? 'bg-white text-teal-700 font-bold shadow-xs border-teal-200 ring-2 ring-teal-500/20'
                      : 'bg-white/60 hover:bg-white text-slate-600 hover:text-slate-900 border-slate-200/60'
                  }`}
                >
                  <span className="text-base leading-none mb-1">📊</span>
                  <span className="text-xs font-bold leading-tight">{t.tabBoltonShort}</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full mt-1 bg-teal-50 text-teal-700" dir="ltr">
                    77.2% Norm
                  </span>
                </button>

                {/* Tab 5: 3D Study Model */}
                <button
                  type="button"
                  onClick={() => setActiveDiagnosticTab('model3d')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                    activeDiagnosticTab === 'model3d'
                      ? 'bg-white text-indigo-700 font-black shadow-xs border-indigo-300 ring-2 ring-indigo-500/30'
                      : 'bg-indigo-50/70 hover:bg-indigo-100/80 text-indigo-900 font-bold border-indigo-200 shadow-2xs'
                  }`}
                >
                  <span className="text-base leading-none mb-1">🧊</span>
                  <span className="text-xs font-bold leading-tight flex items-center gap-0.5">
                    {t.tabModel3dShort}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1 bg-indigo-600 text-white flex items-center gap-0.5 shadow-2xs">
                    <Sparkles className="w-2.5 h-2.5" />
                    WebGL
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Diagnostic View */}
          <div className="transition-opacity duration-200">
            {activeDiagnosticTab === 'ceph' && (
              <CephViewer presetCase={cephPresetCase} />
            )}
            {activeDiagnosticTab === 'odontogram' && (
              <ToothChart lang={lang} />
            )}
            {activeDiagnosticTab === 'panoramic' && (
              <PanoramicViewer />
            )}
            {activeDiagnosticTab === 'bolton' && (
              <BoltonAnalysisCard 
                overjet={currentOverjet} 
                overbite={currentOverbite} 
                crowdingUpper={currentCrowding} 
                angleClass={currentAngle} 
                lang={lang}
              />
            )}
            {activeDiagnosticTab === 'model3d' && (
              <Dental3DViewer />
            )}
          </div>

          {/* Diagnostic Quick-Nav Overview Ribbon */}
          <div className="flex flex-wrap gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-xs">
            <div 
              onClick={() => setActiveDiagnosticTab('ceph')}
              className={`flex-1 min-w-[110px] p-2 rounded-lg cursor-pointer transition-all border ${
                activeDiagnosticTab === 'ceph' ? 'bg-blue-50/80 border-blue-300 shadow-xs' : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{isAr ? 'سيفالومتري سهمي' : 'Ceph Sagittal'}</div>
              <div className="font-bold text-slate-800 text-xs mt-0.5 flex items-center justify-between gap-1">
                <span className="whitespace-nowrap">ANB / Wits</span>
                <span className="text-blue-600 text-[11px] font-semibold uppercase shrink-0" dir="ltr">{cephPresetCase}</span>
              </div>
            </div>

            <div 
              onClick={() => setActiveDiagnosticTab('odontogram')}
              className={`flex-1 min-w-[110px] p-2 rounded-lg cursor-pointer transition-all border ${
                activeDiagnosticTab === 'odontogram' ? 'bg-blue-50/80 border-blue-300 shadow-xs' : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{isAr ? 'مخطط الأسنان' : 'Odontogram'}</div>
              <div className="font-bold text-slate-800 text-xs mt-0.5 flex items-center justify-between gap-1">
                <span className="whitespace-nowrap">{t.tabOdontogramShort}</span>
                <span className="text-slate-600 text-[11px] font-semibold shrink-0">{isAr ? '32 سناً' : '32 Teeth'}</span>
              </div>
            </div>

            <div 
              onClick={() => setActiveDiagnosticTab('panoramic')}
              className={`flex-1 min-w-[110px] p-2 rounded-lg cursor-pointer transition-all border ${
                activeDiagnosticTab === 'panoramic' ? 'bg-blue-50/80 border-blue-300 shadow-xs' : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{isAr ? 'أشعة بانوراما' : 'Panoramic OPG'}</div>
              <div className="font-bold text-slate-800 text-xs mt-0.5 flex items-center justify-between gap-1">
                <span className="whitespace-nowrap">{isAr ? 'الفحص اللثوي' : 'Pathology'}</span>
                <span className="text-emerald-600 text-[11px] font-semibold shrink-0">{isAr ? 'سليم' : 'Cleared'}</span>
              </div>
            </div>

            <div 
              onClick={() => setActiveDiagnosticTab('bolton')}
              className={`flex-1 min-w-[110px] p-2 rounded-lg cursor-pointer transition-all border ${
                activeDiagnosticTab === 'bolton' ? 'bg-teal-50/80 border-teal-300 shadow-xs' : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{isAr ? 'نسب بولتون' : 'Bolton Ratio'}</div>
              <div className="font-bold text-slate-800 text-xs mt-0.5 flex items-center justify-between gap-1">
                <span className="whitespace-nowrap">{isAr ? 'الأسنان الأمامية' : 'Anterior'}</span>
                <span className="text-teal-700 text-[11px] font-semibold shrink-0" dir="ltr">77.2%</span>
              </div>
            </div>

            <div 
              onClick={() => setActiveDiagnosticTab('model3d')}
              className={`flex-1 min-w-[110px] p-2 rounded-lg cursor-pointer transition-all border ${
                activeDiagnosticTab === 'model3d' ? 'bg-indigo-50/80 border-indigo-300 shadow-xs' : 'border-indigo-100/80 bg-indigo-50/40 hover:bg-indigo-50/80'
              }`}
            >
              <div className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider flex items-center gap-1">
                <span>{isAr ? 'مجسم كاست 3D' : '3D Study Cast'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              </div>
              <div className="font-bold text-slate-800 text-xs mt-0.5 flex items-center justify-between gap-1">
                <span className="whitespace-nowrap">{isAr ? 'الفكين معاً' : 'Dual Arch'}</span>
                <span className="text-indigo-700 text-[11px] font-bold shrink-0">WebGL 3D</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Treatment Plan Output */}
        <div className="space-y-6">
          <PlanBuilder 
            plan={generatedPlan} 
            isGenerating={isGenerating} 
            experienceLevel={experienceLevel}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}

export default function GeneratePlanPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Treatment Planning Studio...</div>}>
      <GeneratePlanContent />
    </Suspense>
  );
}