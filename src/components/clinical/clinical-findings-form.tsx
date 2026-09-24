"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToothChart, ToothStatus } from './tooth-chart';
import { saveStoredPatient } from '@/lib/patients-store';
import { 
  UserPlus, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  Stethoscope, 
  Zap,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/language-context';

export function ClinicalFindingsForm() {
  const router = useRouter();
  const { lang, isAr } = useLanguage();

  // Demographics State
  const [firstName, setFirstName] = useState(isAr ? 'أحمد' : 'John');
  const [lastName, setLastName] = useState(isAr ? 'محمد' : 'Doe');
  const [age, setAge] = useState<number>(15);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [phone, setPhone] = useState('+20 (100) 123-4567');
  const [email, setEmail] = useState('patient@example.com');
  const [chiefComplaint, setChiefComplaint] = useState(
    isAr 
      ? 'عضة معكوسة أمامية شديدة وصعوبة في مضغ الطعام وبروز الفك السفلي' 
      : 'Severe underbite and lower teeth in front of upper teeth'
  );

  // Clinical Examination State
  const [angleClass, setAngleClass] = useState('Class III');
  const [overjet, setOverjet] = useState<number>(-4.0);
  const [overbite, setOverbite] = useState<number>(1.0);
  const [crowdingUpper, setCrowdingUpper] = useState('moderate');
  const [crowdingLower, setCrowdingLower] = useState('moderate');
  const [lipCompetence, setLipCompetence] = useState('competent');
  const [facialProfile, setFacialProfile] = useState('concave');
  const [impa, setImpa] = useState<number>(86);
  const [tmjStatus, setTmjStatus] = useState('normal');
  const [extraFindings, setExtraFindings] = useState(
    isAr
      ? 'استبعاد الصنف الثالث الكاذب. عضة صنف ثالث هيكلي حقيقي مع بروز عظم الفك السفلي وتعويض سنخي بتراجع القواطع السفلية.'
      : 'Pseudo Class III ruled out. True skeletal discrepancy with mandibular prognathism.'
  );

  // Odontogram tracking
  const [toothStatuses, setToothStatuses] = useState<Record<number, ToothStatus>>({});

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Quick Preset Handlers
  const applyPreset = (preset: 'class3' | 'class2' | 'bimax' | 'openbite') => {
    if (preset === 'class3') {
      setFirstName(isAr ? 'يوسف' : 'John');
      setLastName(isAr ? 'عمر' : 'Doe');
      setAge(15);
      setGender('male');
      setAngleClass('Class III');
      setOverjet(-4.0);
      setOverbite(1.0);
      setCrowdingUpper('moderate');
      setCrowdingLower('mild');
      setFacialProfile('concave');
      setLipCompetence('competent');
      setImpa(86);
      setChiefComplaint(
        isAr 
          ? 'عضة معكوسة أمامية شديدة، تقدم الفك السفلي، وصعوبة في قضم الطعام' 
          : 'Severe underbite, front teeth crossbite, difficulty chewing'
      );
      setExtraFindings(
        isAr 
          ? 'صنف ثالث هيكلي حقيقي، بروز أفقي سالب (-4 مم)، ميل تعويضي بالقواطع السفلية للداخل' 
          : 'Skeletal Class III, negative overjet, retroclined lower incisors compensatory'
      );
    } else if (preset === 'class2') {
      setFirstName(isAr ? 'سارة' : 'Sarah');
      setLastName(isAr ? 'محمود' : 'Class II Severe Overjet');
      setAge(14);
      setGender('female');
      setAngleClass('Class II div 1');
      setOverjet(8.5);
      setOverbite(5.0);
      setCrowdingUpper('severe');
      setCrowdingLower('moderate');
      setFacialProfile('convex');
      setLipCompetence('incompetent');
      setImpa(102);
      setChiefComplaint(
        isAr 
          ? 'بروز شديد في الأسنان الأمامية العلوية، عدم القدرة على غلق الشفاه، وعضة عميقة' 
          : 'Front teeth stick out significantly, lip trap, deep bite'
      );
      setExtraFindings(
        isAr 
          ? 'صنف ثانٍ هيكلي، زاوية ANB 6 درجات، بروز أفقي حاد 8.5 مم، عدم كفاءة إطباق الشفاه' 
          : 'Skeletal Class II, ANB 6°, severe overjet 8.5mm, lip incompetence'
      );
    } else if (preset === 'bimax') {
      setFirstName(isAr ? 'آدم' : 'Adam');
      setLastName(isAr ? 'طارق' : 'Bimaxillary Protrusion');
      setAge(22);
      setGender('male');
      setAngleClass('Class I');
      setOverjet(6.0);
      setOverbite(3.0);
      setCrowdingUpper('severe');
      setCrowdingLower('severe');
      setFacialProfile('convex');
      setLipCompetence('incompetent');
      setImpa(104);
      setChiefComplaint(
        isAr 
          ? 'بروز شديد في أسنان الفكين معاً وإجهاد عضلات الوجه عند محاولة إغلاق الفم' 
          : 'Teeth protrude too far forward, lips strained to close'
      );
      setExtraFindings(
        isAr 
          ? 'بروز سنخي ثنائي بالفكين (Bimaxillary protrusion)، خلع الضواحك الأربعة مستطب لإرجاع البروفايل' 
          : 'Bimaxillary dentoalveolar protrusion, upper and lower premolar extractions indicated'
      );
    } else if (preset === 'openbite') {
      setFirstName(isAr ? 'إيلينا' : 'Elena');
      setLastName(isAr ? 'خالد' : 'Anterior Open Bite');
      setAge(18);
      setGender('female');
      setAngleClass('Class I');
      setOverjet(2.5);
      setOverbite(-4.5);
      setCrowdingUpper('mild');
      setCrowdingLower('mild');
      setFacialProfile('straight');
      setLipCompetence('incompetent');
      setImpa(96);
      setChiefComplaint(
        isAr 
          ? 'الأسنان الأمامية لا تلتقي نهائياً عند الإطباق مع عادة دفع اللسان للأمام' 
          : 'My front teeth do not touch when biting, tongue thrust habit'
      );
      setExtraFindings(
        isAr 
          ? 'عضة أمامية مفتوحة -4.5 مم، نمط نمو عمودي متباعد (Hyperdivergent)، زاوية فكية منفرجة' 
          : 'Anterior open bite -4.5mm, hyperdivergent growth pattern, high mandibular plane angle'
      );
    }
  };

  const handleSave = async (redirectToPlanStudio: boolean = false) => {
    setIsSubmitting(true);

    const plannedExtractions: string[] = [];
    const missingTeeth: string[] = [];
    Object.entries(toothStatuses).forEach(([tooth, status]) => {
      if (status === 'extraction_planned') plannedExtractions.push(tooth);
      if (status === 'missing') missingTeeth.push(tooth);
    });

    const newPatientData = {
      firstName: firstName.trim() || (isAr ? 'مريض' : 'New'),
      lastName: lastName.trim() || (isAr ? 'جديد' : 'Patient'),
      age: Number(age) || 16,
      dateOfBirth: new Date(new Date().getFullYear() - (Number(age) || 16), 0, 1).toISOString(),
      gender,
      phone: phone.trim() || 'N/A',
      email: email.trim() || 'patient@example.com',
      chiefComplaint: chiefComplaint.trim() || (isAr ? 'استشارة تقويم أسنان' : 'Orthodontic consultation'),
      status: 'active',
      clinicalRecords: [
        {
          angleClass,
          overjet: Number(overjet),
          overbite: Number(overbite),
          crowdingUpper,
          crowdingLower,
          lipCompetence,
          facialProfile,
          impa: Number(impa),
          missingTeeth,
          extraFindings: `${extraFindings} ${plannedExtractions.length > 0 ? `| Planned Extractions: ${plannedExtractions.join(', ')}` : ''}`.trim()
        }
      ]
    };

    // Save locally via store
    const saved = saveStoredPatient(newPatientData as any);

    // Also attempt backend API call in background
    try {
      await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saved)
      });
    } catch (e) {
      console.warn('API POST skipped or failed, local store populated:', e);
    }

    setSavedSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      if (redirectToPlanStudio) {
        router.push(`/plans/generate?patientId=${saved.id}`);
      } else {
        router.push('/patients');
      }
    }, 450);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 select-none" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Top Banner with Quick Presets */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg border border-blue-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-500/20 text-blue-300 rounded-lg">
                <Stethoscope className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold">
                {isAr ? 'إدخال ملف مريض تقويم جديد والفحص السريري' : 'New Orthodontic Patient Intake'}
              </h2>
              <Badge className="bg-blue-500/30 text-blue-200 border-none font-semibold">
                {isAr ? 'فحص سريري ومزامنة فورية' : 'Clinical Exam & AI Sync'}
              </Badge>
            </div>
            <p className="text-xs text-blue-200/80 mt-1 max-w-2xl">
              {isAr
                ? 'أدخل بيانات المريض، المقاييس الإطباقية، وحالة الأسنان. الحفظ يقوم بربط الحالة فورياً باستوديو تخطيط التقويم سباعي الطبقات لتخليق الخطة المعتمدة.'
                : 'Input patient records, occlusal metrics, and tooth statuses. Saving automatically links with the 7-Layer AI Treatment Planning Studio for biomechanical synthesis.'
              }
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-blue-200 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> 
              {isAr ? 'سيناريوهات سريرية فورية:' : 'One-Click Presets:'}
            </span>
            <button
              type="button"
              onClick={() => applyPreset('class3')}
              className="px-2.5 py-1 text-xs font-semibold bg-blue-800/80 hover:bg-blue-700 text-white rounded-lg border border-blue-600/50 transition-all cursor-pointer"
            >
              {isAr ? 'صنف ثالث (عضة معكوسة -4 مم)' : 'Class III (-4mm Underbite)'}
            </button>
            <button
              type="button"
              onClick={() => applyPreset('class2')}
              className="px-2.5 py-1 text-xs font-semibold bg-blue-800/80 hover:bg-blue-700 text-white rounded-lg border border-blue-600/50 transition-all cursor-pointer"
            >
              {isAr ? 'صنف ثانٍ (بروز +8.5 مم)' : 'Class II (+8.5mm Overjet)'}
            </button>
            <button
              type="button"
              onClick={() => applyPreset('bimax')}
              className="px-2.5 py-1 text-xs font-semibold bg-blue-800/80 hover:bg-blue-700 text-white rounded-lg border border-blue-600/50 transition-all cursor-pointer"
            >
              {isAr ? 'بروز ثنائي بالفكين (Bimax)' : 'Bimaxillary Protrusion'}
            </button>
            <button
              type="button"
              onClick={() => applyPreset('openbite')}
              className="px-2.5 py-1 text-xs font-semibold bg-blue-800/80 hover:bg-blue-700 text-white rounded-lg border border-blue-600/50 transition-all cursor-pointer"
            >
              {isAr ? 'عضة مفتوحة (-4.5 مم)' : 'Open Bite (-4.5mm)'}
            </button>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs font-medium">
            <strong>{isAr ? 'تم حفظ ملف المريض بنجاح!' : 'Patient saved successfully!'}</strong>{' '}
            {isAr ? 'جاري الانتقال إلى العرض المطلوب...' : 'Redirecting to your requested view...'}
          </div>
        </div>
      )}

      {/* Form Card 1: Patient Demographics */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/70 border-b pb-3">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-blue-600 shrink-0" />
            <CardTitle className="text-base font-bold text-slate-800">
              {isAr ? '١. البيانات الشخصية والشكوى الرئيسية' : '1. Patient Demographics'}
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-slate-500">
            {isAr ? 'هوية المريض والسبب الأساسي لطلب استشارة التقويم' : 'Basic patient identity and primary complaint'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'الاسم الأول *' : 'First Name *'}
            </label>
            <input 
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={isAr ? 'مثال: أحمد' : 'e.g. John'}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'اسم العائلة *' : 'Last Name *'}
            </label>
            <input 
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={isAr ? 'مثال: محمد' : 'e.g. Doe'}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'العمر (بالسنوات) *' : 'Age (Years) *'}
            </label>
            <input 
              type="number"
              min={6}
              max={80}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'النوع البيولوجي *' : 'Gender *'}
            </label>
            <select 
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
            >
              <option value="male">{isAr ? 'ذكر' : 'Male'}</option>
              <option value="female">{isAr ? 'أنثى' : 'Female'}</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'رقم الهاتف' : 'Phone Number'}
            </label>
            <input 
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'الشكوى الرئيسية للمريض *' : 'Chief Complaint *'}
            </label>
            <input 
              type="text"
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              placeholder={
                isAr
                  ? 'صف سبب الاستشارة (مثال: عضة معكوسة شديدة، تزاحم حاد بالأسنان، بروز الشفاه)'
                  : 'Describe what the patient wants treated (e.g., severe underbite, teeth crowding, smile aesthetics)'
              }
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Card 2: Orthodontic Clinical Examination */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/70 border-b pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600 shrink-0" />
            <CardTitle className="text-base font-bold text-slate-800">
              {isAr ? '٢. الفحص الإكلينيكي وتصنيف أنجل' : '2. Orthodontic Clinical Examination'}
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-slate-500">
            {isAr
              ? 'المقاييس السنية والهيكلية الدقيقة المستخدمة في خوارزميات قرارات الخلع وميكانيكا الرصف'
              : 'Precise dental and skeletal parameters used by the AI engine to ground mechanics and extraction logic'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'تصنيف أنجل لسوء الإطباق *' : 'Angle Classification *'}
            </label>
            <select 
              value={angleClass}
              onChange={(e) => setAngleClass(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
            >
              <option value="Class I">
                {isAr ? 'صنف أول (علاقة أضراس طبيعية - Class I)' : 'Class I (Normal Molar Relationship)'}
              </option>
              <option value="Class II div 1">
                {isAr ? 'صنف ثانٍ تقسيم 1 (بروز القواطع العلوية - Class II div 1)' : 'Class II div 1 (Proclined Upper Incisors)'}
              </option>
              <option value="Class II div 2">
                {isAr ? 'صنف ثانٍ تقسيم 2 (تراجع القواطع وعضة عميقة - Class II div 2)' : 'Class II div 2 (Retroclined Upper Incisors)'}
              </option>
              <option value="Class III">
                {isAr ? 'صنف ثالث (عضة معكوسة وبروز الفك السفلي - Class III)' : 'Class III (Mesiocclusion / Underbite)'}
              </option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {isAr ? 'البروز الأفقي (أوفرجت مم) *' : 'Overjet (mm) *'}
              </label>
              <span className="text-[10px] text-slate-500">
                {isAr ? '(- قيمة سالبة = عضة معكوسة)' : '(- value = underbite)'}
              </span>
            </div>
            <input 
              type="number"
              step="0.5"
              value={overjet}
              onChange={(e) => setOverjet(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              {isAr
                ? 'المعدل الطبيعي: +2 مم. القيمة السالبة (-4 مم) تدل على عضة معكوسة أمامية.'
                : 'Norm: +2.0 mm. Negative value (e.g. -4 mm) indicates anterior crossbite / underbite.'
              }
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {isAr ? 'التراكب الرأسي (أوفربايت مم) *' : 'Overbite (mm) *'}
              </label>
              <span className="text-[10px] text-slate-500">
                {isAr ? '(- قيمة سالبة = عضة مفتوحة)' : '(- value = open bite)'}
              </span>
            </div>
            <input 
              type="number"
              step="0.5"
              value={overbite}
              onChange={(e) => setOverbite(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              {isAr
                ? 'المعدل الطبيعي: +2 مم. القيمة السالبة (-3 مم) تدل على عضة أمامية مفتوحة.'
                : 'Norm: +2.0 mm. Negative value (e.g. -3 mm) indicates anterior open bite.'
              }
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'تزاحم / تباعد القوس العلوي' : 'Upper Arch Crowding / Spacing'}
            </label>
            <select 
              value={crowdingUpper}
              onChange={(e) => setCrowdingUpper(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
            >
              <option value="none">{isAr ? 'بدون تزاحم / مرصوف جيداً (0 مم)' : 'None / Well Aligned (0 mm)'}</option>
              <option value="mild">{isAr ? 'تزاحم خفيف (أقل من 3 مم)' : 'Mild Crowding (< 3 mm)'}</option>
              <option value="moderate">{isAr ? 'تزاحم متوسط (3 - 6 مم)' : 'Moderate Crowding (3 - 6 mm)'}</option>
              <option value="severe">{isAr ? 'تزاحم شديد (أكثر من 6 مم)' : 'Severe Crowding (> 6 mm)'}</option>
              <option value="spacing">{isAr ? 'مسافات وتباعد عام بالأسنان' : 'Generalized Spacing'}</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'تزاحم / تباعد القوس السفلي' : 'Lower Arch Crowding / Spacing'}
            </label>
            <select 
              value={crowdingLower}
              onChange={(e) => setCrowdingLower(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
            >
              <option value="none">{isAr ? 'بدون تزاحم / مرصوف جيداً (0 مم)' : 'None / Well Aligned (0 mm)'}</option>
              <option value="mild">{isAr ? 'تزاحم خفيف (أقل من 3 مم)' : 'Mild Crowding (< 3 mm)'}</option>
              <option value="moderate">{isAr ? 'تزاحم متوسط (3 - 6 مم)' : 'Moderate Crowding (3 - 6 mm)'}</option>
              <option value="severe">{isAr ? 'تزاحم شديد (أكثر من 6 مم)' : 'Severe Crowding (> 6 mm)'}</option>
              <option value="spacing">{isAr ? 'مسافات وتباعد عام بالأسنان' : 'Generalized Spacing'}</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'ميل القواطع السفلية (IMPA بالدرجات)' : 'Lower Incisor Proclination (IMPA)'}
            </label>
            <input 
              type="number"
              value={impa}
              onChange={(e) => setImpa(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              {isAr
                ? 'المعيار الطبيعي لتويد: 90° ± 5°. القيم فوق 98° تمنع التوسيع التحفظي لتجنب انحسار اللثة.'
                : 'Norm: 90° ± 5°. Values > 98° indicate proclination and limit non-extraction expansion.'
              }
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'بروفايل وملامح الوجه' : 'Facial Profile'}
            </label>
            <select 
              value={facialProfile}
              onChange={(e) => setFacialProfile(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
            >
              <option value="straight">{isAr ? 'مستقيم / متناسق (Straight)' : 'Straight / Orthognathic'}</option>
              <option value="convex">{isAr ? 'محدب (ميل نحو الصنف الثاني - Convex)' : 'Convex (Class II tendency)'}</option>
              <option value="concave">{isAr ? 'مقعر (بروز الذقن / صنف ثالث - Concave)' : 'Concave (Class III / Prominent Chin)'}</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'كفاءة إطباق الشفاه عند الراحة' : 'Lip Competence'}
            </label>
            <select 
              value={lipCompetence}
              onChange={(e) => setLipCompetence(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
            >
              <option value="competent">{isAr ? 'كفؤة (إطباق طبيعي للشفاه بدون جهد)' : 'Competent (Lips seal naturally at rest)'}</option>
              <option value="incompetent">{isAr ? 'غير كفؤة (فجوة بين الشفاه أكثر من 3-4 مم)' : 'Incompetent (Interlabial gap > 3-4 mm)'}</option>
              <option value="potentially_incompetent">{isAr ? 'عدم كفاءة محتمل (الشفة محبوسة خلف القواطع)' : 'Potentially Incompetent (Lower lip trapped)'}</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'حالة المفصل الفكي الصدغي (TMJ)' : 'TMJ Status'}
            </label>
            <select 
              value={tmjStatus}
              onChange={(e) => setTmjStatus(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
            >
              <option value="normal">{isAr ? 'طبيعي / بدون أي أعراض' : 'Normal / Asymptomatic'}</option>
              <option value="clicking">{isAr ? 'طقطقة وأصوات بالمفصل (Clicking)' : 'Clicking / Joint Sounds'}</option>
              <option value="pain">{isAr ? 'ألم عند المضغ أو الجس السريري' : 'Pain on Palpation or Mastication'}</option>
              <option value="locking">{isAr ? 'انغلاق أو محدودية في فتح الفم' : 'Locking / Restricted Opening'}</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {isAr ? 'الملاحظات السريرية والفحوصات الإضافية' : 'Clinical Findings & Orthodontic Notes'}
            </label>
            <textarea 
              rows={2}
              value={extraFindings}
              onChange={(e) => setExtraFindings(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal"
              placeholder={
                isAr
                  ? 'ملاحظات إضافية، حالة النمو العظمي، العضة المعكوسة الخلفية، متطلبات الاستشارة الجراحية...'
                  : 'Additional findings, growth status, crossbite notes, surgical consult requirements...'
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Card 3: Interactive FDI Odontogram */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/70 border-b pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-amber-100 text-amber-800 rounded font-bold text-xs">FDI</span>
              <CardTitle className="text-base font-bold text-slate-800">
                {isAr ? '٣. مخطط الأسنان التفاعلي FDI وتحديد الأسنان المرشحة للخلع' : '3. Interactive FDI Odontogram & Planned Extractions'}
              </CardTitle>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">
              {isAr
                ? 'اضغط على أي سن لتحديد حالته (خلع مخطط، تسوس، فقدان، أو مرسى زرعات TADs)'
                : 'Click teeth to mark planned extractions, caries, or TAD sites'
              }
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <ToothChart 
            initialStatuses={toothStatuses}
            onChange={(updated) => setToothStatuses(updated)}
            lang={lang}
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200">
        <Link href="/patients">
          <Button variant="outline" type="button" className="gap-2 text-xs text-slate-600 cursor-pointer">
            <ArrowLeft className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} /> 
            {isAr ? 'العودة لقائمة المرضى' : 'Back to Patient List'}
          </Button>
        </Link>

        <div className="flex items-center gap-3">
          <Button 
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => handleSave(false)}
            className="text-xs font-semibold px-4 border-slate-300 hover:bg-slate-100 cursor-pointer"
          >
            {isSubmitting ? (isAr ? 'جاري الحفظ...' : 'Saving...') : (isAr ? 'حفظ الفحص فقط' : 'Save Findings')}
          </Button>

          <Button 
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs gap-2 px-5 shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            {isSubmitting 
              ? (isAr ? 'جاري الحفظ والتجهيز...' : 'Saving & Preparing...') 
              : (isAr ? 'حفظ والانتقال لاستوديو تخطيط التقويم 🚀' : 'Save & Launch Treatment Plan Studio 🚀')
            }
          </Button>
        </div>
      </div>
    </div>
  );
}