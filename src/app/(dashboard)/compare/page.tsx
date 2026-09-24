"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  XCircle, 
  Smile, 
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/language-context';
import { APP_DICTIONARY } from '@/lib/i18n/app-dictionary';

interface TreatmentOptionComparison {
  id: string;
  nameEn: string;
  nameAr: string;
  categoryEn: string;
  categoryAr: string;
  durationEn: string;
  durationAr: string;
  complianceLevelEn: 'Low' | 'Moderate' | 'High';
  complianceLevelAr: string;
  profileImpactEn: string;
  profileImpactAr: string;
  relapseRiskEn: 'Low' | 'Moderate' | 'High';
  relapseRiskAr: string;
  estimatedCostEn: string;
  estimatedCostAr: string;
  complexity: number; // 1-5
  prosEn: string[];
  prosAr: string[];
  consEn: string[];
  consAr: string[];
  idealPatientEn: string;
  idealPatientAr: string;
}

interface CasePreset {
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  options: TreatmentOptionComparison[];
}

const COMPARISON_PRESETS: Record<string, CasePreset> = {
  class2_adult: {
    titleEn: 'Adult Skeletal Class II Div 1 with 8mm Overjet',
    titleAr: 'عضة صنف ثانٍ هيكلي للبالغين مع بروز أفقي 8 مم (Class II Div 1)',
    subtitleEn: 'Evaluate Extraction Camouflage vs Non-Extraction Distalization vs Orthognathic Surgery',
    subtitleAr: 'تقييم خلع الضواحك للتمويه مقابل الإرجاع بالزرعات التقويمية (TADs) مقابل جراحة الفكين (BSSO)',
    options: [
      {
        id: 'opt1',
        nameEn: 'Option 1: Maxillary 1st Premolar Extractions (14, 24)',
        nameAr: 'البديل الأول: خلع الضواحك العلوية الأولى (14، 24) مع تقويم MBT',
        categoryEn: 'Fixed Camouflage Orthodontics (MBT 0.022")',
        categoryAr: 'تمويه تقويمي ثابت (وصفة MBT 0.022")',
        durationEn: '20–24 Months',
        durationAr: '20–24 شهراً',
        complianceLevelEn: 'Moderate',
        complianceLevelAr: 'متوسط',
        profileImpactEn: 'Significant lip profile balance, eliminates lip incompetence and lip trap',
        profileImpactAr: 'تحسن ملحوظ في تناسق الشفاه وتراجع البروز، والقضاء التام على حبس الشفة السفلية (Lip trap)',
        relapseRiskEn: 'Low',
        relapseRiskAr: 'منخفض',
        estimatedCostEn: 'Standard ($4,500 - $5,500)',
        estimatedCostAr: 'معياري ($4,500 - $5,500)',
        complexity: 3,
        prosEn: [
          'Direct space closure achieves complete 6mm overjet reduction',
          'Does not depend on patient growth (ideal for adults)',
          'Preserves lower incisors within bone boundary',
          'Highly predictable torque control with rectangular wires'
        ],
        prosAr: [
          'إغلاق مسافة الخلع مباشرة يضمن تقليل البروز بمقدار 6 مم بالكامل',
          'لا يعتمد على نمو المريض العظمي (مثالي ومجرب للمرضى البالغين)',
          'يحافظ على جذور القواطع السفلية داخل الصفيحة العظمية السليمة',
          'تحكم فائق وتنبؤ دقيق في زوايا التورك عبر الأسلاك المستطيلة'
        ],
        consEn: [
          'Loss of two virgin permanent premolars',
          'Requires maximum anchorage (TPA or TADs)',
          'Slight risk of dark triangles in elderly patients'
        ],
        consAr: [
          'فقدان ضاحكين دائمين سليمين تماماً',
          'يتطلب أقصى درجات المرسى السنخي (TPA أو زرعات TADs)',
          'احتمال طفيف لظهور مثلثات سوداء لثوية لدى كبار السن'
        ],
        idealPatientEn: 'Adult with retrognathic mandible, severe overjet, and incompetent lips wanting non-surgical correction.',
        idealPatientAr: 'مريض بالغ يعاني من تراجع الفك السفلي وبروز أفقي شديد وعدم كفاءة الشفاه ويرفض التدخل الجراحي.'
      },
      {
        id: 'opt2',
        nameEn: 'Option 2: Non-Extraction with TAD Maxillary Distalization & Aligners',
        nameAr: 'البديل الثاني: علاج تحفظي بدون خلع عبر إرجاع الأسنان بالزرعات والألاينرز',
        categoryEn: 'Clear Aligners + Skeletal Anchorage (TADs)',
        categoryAr: 'قوالب شفافة + مرسى عظمي (زرعات TADs)',
        durationEn: '24–28 Months',
        durationAr: '24–28 شهراً',
        complianceLevelEn: 'High',
        complianceLevelAr: 'عالي جداً',
        profileImpactEn: 'Mild soft tissue improvement, limited lip retraction',
        profileImpactAr: 'تحسن طفيف في الأنسجة الرخوة مع تراجع محدود في بروز الشفاه',
        relapseRiskEn: 'Moderate',
        relapseRiskAr: 'متوسط',
        estimatedCostEn: 'Premium ($6,500 - $7,500)',
        estimatedCostAr: 'مرتفع ($6,500 - $7,500)',
        complexity: 4,
        prosEn: [
          'Avoids extracting healthy premolars',
          'High aesthetics and hygiene during treatment',
          'TADs prevent anchorage loss',
          'Patient preference for removable aligners'
        ],
        prosAr: [
          'المحافظة على جميع الضواحك الطبيعية دون أي خلع',
          'جماليات عالية وسهولة تنظيف الأسنان طوال فترة العلاج',
          'زرعات TADs تمنع فقدان المرسى السنخي وتوفر ثباتاً مطلقاً',
          'تفضيل المريض للقوالب الشفافة المتحركة مقارنة بالحاصرات المعدنية'
        ],
        consEn: [
          'Severe compliance requirement (22 hrs/day)',
          'Distalization limited by anatomical retro-molar room',
          'Increased duration compared to premolar extraction',
          'TAD failure risk (10-15%)'
        ],
        consAr: [
          'يتطلب التزاماً صارماً بارتداء القوالب 22 ساعة يومياً',
          'مسافة الإرجاع الخلفي محدودة بتشريح المساحة خلف الأضراس',
          'مدة علاج أطول بنحو 4-6 أشهر مقارنة بالخلع',
          'احتمال فشل أو حركة زرعة الـ TAD بنسبة 10-15%'
        ],
        idealPatientEn: 'Aesthetically conscious adult with mild crowding, willing to wear aligners 22h/day, refusing extractions.',
        idealPatientAr: 'مريض بالغ يهتم بالمظهر الجمالي ولديه تزاحم خفيف ومستعد للالتزام الصارم 22 ساعة يومياً ويرفض الخلع نهائياً.'
      },
      {
        id: 'opt3',
        nameEn: 'Option 3: Combined Surgical-Orthodontic BSSO Mandibular Advancement',
        nameAr: 'البديل الثالث: جراحة تقويمية مشتركة لتقديم الفك السفلي (BSSO)',
        categoryEn: 'Orthognathic Surgery + Fixed Decompensation',
        categoryAr: 'جراحة الفكين التقويمية + إزالة التعويض السني',
        durationEn: '18–22 Months',
        durationAr: '18–22 شهراً',
        complianceLevelEn: 'Low',
        complianceLevelAr: 'منخفض',
        profileImpactEn: 'Dramatic profile transformation, optimal chin projection and airway volume',
        profileImpactAr: 'تحول جذري في ملامح الوجه وبروز الذقن وتوسيع مثالي لمجرى التنفس البلعومي',
        relapseRiskEn: 'Low',
        relapseRiskAr: 'منخفض',
        estimatedCostEn: 'Hospital / Surgical ($15,000+)',
        estimatedCostAr: 'جراحي بالمستشفى ($15,000+)',
        complexity: 5,
        prosEn: [
          'Normalizes underlying skeletal base discrepancy (ANB from 6° to 2°)',
          'Significantly expands pharyngeal airway volume',
          'Ideal facial aesthetics and chin prominence',
          'Non-extraction dental mechanics'
        ],
        prosAr: [
          'تصحيح الخلل الهيكلي الأصلي في قاعدة الفكين (خفض ANB من 6° إلى 2°)',
          'توسيع ملحوظ في حجم مجرى التنفس البلعومي والوقاية من انقطاع التنفس',
          'تناسق جمالي مثالي للوجه وبروز الذقن بدون مساومة على زاوية الأسنان',
          'علاج الأسنان بدون خلع الضواحك'
        ],
        consEn: [
          'General anesthesia and hospital surgical risks',
          'Neurosensory paresthesia of inferior alveolar nerve risk',
          'High financial commitment',
          'Temporary worsening of facial profile during pre-surgical decompensation'
        ],
        consAr: [
          'مخاطر التخدير الكلي وجراحة المستشفى',
          'احتمال خدر أو تنميل مؤقت في العصب السنخي السفلي (IAN paresthesia)',
          'تكلفة مالية مرتفعة',
          'تدهور مؤقت في ملامح الوجه خلال مرحلة إزالة التعويض السني قبل العملية'
        ],
        idealPatientEn: 'Adult with severe mandibular retrognathia, obstructive sleep apnea signs, seeking optimal facial aesthetics.',
        idealPatientAr: 'مريض بالغ يعاني من تراجع شديد في الفك السفلي أو أعراض ضيق التنفس، ويبحث عن النتيجة الجمالية الأفضل.'
      }
    ]
  },
  class1_crowding: {
    titleEn: 'Severe Class I Bimaxillary Crowding (8mm Upper / 7mm Lower)',
    titleAr: 'تزاحم سنخي شديد بكلا الفكين (8 مم علوي / 7 مم سفلي)',
    subtitleEn: 'Extraction of Four First Premolars vs Non-Extraction Arch Expansion with IPR',
    subtitleAr: 'مقارنة خلع 4 ضواحك أولى مقابل توسيع القوس وبرد المينا الإنتقائي (IPR)',
    options: [
      {
        id: 'c1_opt1',
        nameEn: 'Option A: Four First Premolars Extraction (14, 24, 34, 44)',
        nameAr: 'البديل (أ): خلع 4 ضواحك أولى (14، 24، 34، 44) مع حاصرات MBT',
        categoryEn: 'Fixed MBT Appliances',
        categoryAr: 'تقويم ثابت معدني MBT',
        durationEn: '18–22 Months',
        durationAr: '18–22 شهراً',
        complianceLevelEn: 'Low',
        complianceLevelAr: 'منخفض',
        profileImpactEn: 'Relieves lip strain and bimaxillary protrusion',
        profileImpactAr: 'إراحة عضلات الشفاه والتخلص من البروز السنخي الثنائي',
        relapseRiskEn: 'Low',
        relapseRiskAr: 'منخفض',
        estimatedCostEn: 'Standard ($4,500)',
        estimatedCostAr: 'معياري ($4,500)',
        complexity: 3,
        prosEn: [
          'Sufficient space to resolve 8mm crowding without proclining incisors',
          'Maintains incisor roots centered inside cortical plates',
          'Reduces gingival recession risk'
        ],
        prosAr: [
          'توفير مسافة كافية لحل تزاحم 8 مم دون ميلان القواطع خارج العظم',
          'المحافظة على جذور القواطع متمركزة بأمان داخل الصفيحة العظمية',
          'الوقاية من انحسار اللثة وتآكل العظم السنخي مستقبلاً'
        ],
        consEn: [
          'Irreversible tooth loss',
          'Careful space closure mechanics needed to prevent bite deepening'
        ],
        consAr: [
          'فقدان دائم لا رجعة فيه لـ 4 أسنان طبيعية',
          'يتطلب ميكانيكا إغلاق مسافات دقيقة لتجنب تعميق العضة (Bite deepening)'
        ],
        idealPatientEn: 'Patients with thin periodontal biotype and severe crowding where expansion causes recession.',
        idealPatientAr: 'مريض ذو نمط لثوي رقيق وتزاحم شديد حيث يؤدي التوسيع بدون خلع إلى انحسار اللثة وفقدان العظم.'
      },
      {
        id: 'c1_opt2',
        nameEn: 'Option B: Non-Extraction with Rapid Palatal Expansion & IPR',
        nameAr: 'البديل (ب): علاج تحفظي بتوسيع الفك السريع (RPE) وبرد المينا (IPR)',
        categoryEn: 'Skeletal Expansion + Clear Aligners',
        categoryAr: 'توسيع هيكلي + قوالب تقويم شفافة',
        durationEn: '22–26 Months',
        durationAr: '22–26 شهراً',
        complianceLevelEn: 'Moderate',
        complianceLevelAr: 'متوسط',
        profileImpactEn: 'Broad smile arc, slight incisal advancement',
        profileImpactAr: 'ابتسامة عريضة جذابة مع ميلان طفيف بالقواطع للأمام',
        relapseRiskEn: 'Moderate',
        relapseRiskAr: 'متوسط',
        estimatedCostEn: 'Moderate ($5,500)',
        estimatedCostAr: 'متوسط ($5,500)',
        complexity: 3,
        prosEn: [
          'All permanent teeth preserved',
          'Broadens smile corridor and bucco-lingual dimension'
        ],
        prosAr: [
          'المحافظة على جميع الأسنان الدائمة كاملة دون أي خلع',
          'توسيع دهاليز الابتسامة وعرض القوس السنخي العرضي'
        ],
        consEn: [
          'Enamel reduction (IPR) across multiple interproximal sites',
          'Potential for lower incisor labial proclination beyond symphysis'
        ],
        consAr: [
          'برد طبقة المينا (IPR) بين عدة أسنان متجاورة',
          'احتمال ميلان القواطع السفلية نحو الشفة وخروجها عن حدود عظم الذقن'
        ],
        idealPatientEn: 'Patients with transverse constriction, thick periodontal biotype, and mild profile retrusion.',
        idealPatientAr: 'مريض لديه ضيق عرضي في الفك العلوي، ونمط لثوي عظمي سميك، وتراجع طفيف في بروفايل الوجه.'
      }
    ]
  }
};

export default function CompareTreatmentsPage() {
  const [selectedCaseKey, setSelectedCaseKey] = useState<string>('class2_adult');
  const { lang, isAr } = useLanguage();
  const t = APP_DICTIONARY[lang] || APP_DICTIONARY.en;
  const activeCase = COMPARISON_PRESETS[selectedCaseKey];

  return (
    <div className="space-y-6 select-none" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">{t.comparePage.title}</h1>
            <Badge className="bg-indigo-100 text-indigo-800 border-none font-semibold">
              {isAr ? 'تحليل الموازنات السريرية' : 'Trade-Off Analytics'}
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {t.comparePage.subtitle}
          </p>
        </div>

        {/* Case Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">
            {isAr ? 'السيناريو السريري:' : 'Case Scenario:'}
          </span>
          <select 
            value={selectedCaseKey} 
            onChange={(e) => setSelectedCaseKey(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="class2_adult">
              {isAr ? 'بروز صنف ثانٍ للبالغين (الخلع مقابل الألاينرز مقابل الجراحة)' : 'Adult Class II Overjet (Extraction vs Aligners vs Surgery)'}
            </option>
            <option value="class1_crowding">
              {isAr ? 'تزاحم سنخي شديد (خلع 4 ضواحك مقابل التوسيع وبرد المينا)' : 'Severe Crowding (Four Premolars vs Expansion/IPR)'}
            </option>
          </select>
        </div>
      </div>

      {/* Case Header Banner */}
      <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between shadow-sm">
        <div>
          <h2 className="text-base font-bold text-white">
            {isAr ? activeCase.titleAr : activeCase.titleEn}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {isAr ? activeCase.subtitleAr : activeCase.subtitleEn}
          </p>
        </div>
        <Badge variant="outline" className="text-slate-300 border-slate-700 text-xs shrink-0">
          {isAr ? `مقارنة ${activeCase.options.length} بدائل علاجية` : `Comparing ${activeCase.options.length} Modalities`}
        </Badge>
      </div>

      {/* Side by Side Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-${activeCase.options.length} gap-6`}>
        {activeCase.options.map((opt, idx) => (
          <Card key={opt.id} className="border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <CardHeader className="pb-3 border-b bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {isAr ? opt.categoryAr : opt.categoryEn}
                </span>
                <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
              </div>
              <CardTitle className="text-base font-bold text-slate-900 mt-2">
                {isAr ? opt.nameAr : opt.nameEn}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-4 flex-1 flex flex-col justify-between text-xs">
              {/* Core Metrics Strip */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    {isAr ? 'المدة التقديرية' : 'Duration'}
                  </span>
                  <strong className="text-slate-800 text-xs">
                    {isAr ? opt.durationAr : opt.durationEn}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    {isAr ? 'التزام المريض' : 'Compliance'}
                  </span>
                  <strong className={`text-xs ${
                    opt.complianceLevelEn === 'High' ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {isAr ? opt.complianceLevelAr : opt.complianceLevelEn}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    {isAr ? 'مخاطر الانتكاس' : 'Relapse Risk'}
                  </span>
                  <strong className={`text-xs ${
                    opt.relapseRiskEn === 'Low' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {isAr ? opt.relapseRiskAr : opt.relapseRiskEn}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    {isAr ? 'مستوى التكلفة' : 'Cost Level'}
                  </span>
                  <strong className="text-slate-800 text-xs">
                    {isAr ? opt.estimatedCostAr.split(' ')[0] : opt.estimatedCostEn.split(' ')[0]}
                  </strong>
                </div>
              </div>

              {/* Profile Impact */}
              <div className="space-y-1">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <Smile className="w-3 h-3 text-indigo-500 shrink-0" />
                  {isAr ? 'التأثير على ملامح الوجه والأنسجة الرخوة:' : 'Facial Soft Tissue Impact:'}
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed bg-indigo-50/50 p-2 rounded border border-indigo-100">
                  {isAr ? opt.profileImpactAr : opt.profileImpactEn}
                </p>
              </div>

              {/* Pros */}
              <div className="space-y-1.5">
                <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  {isAr ? 'المزايا والفوائد الإكلينيكية:' : 'Clinical Advantages:'}
                </span>
                <ul className={`space-y-1 ${isAr ? 'pr-4' : 'pl-4'} list-disc text-[11px] text-emerald-950`}>
                  {(isAr ? opt.prosAr : opt.prosEn).map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="space-y-1.5">
                <span className="font-bold text-rose-800 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <XCircle className="w-3 h-3 text-rose-600 shrink-0" />
                  {isAr ? 'المحاذير والمخاطر البيولوجية:' : 'Drawbacks & Biological Costs:'}
                </span>
                <ul className={`space-y-1 ${isAr ? 'pr-4' : 'pl-4'} list-disc text-[11px] text-rose-950`}>
                  {(isAr ? opt.consAr : opt.consEn).map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Ideal Patient Profile */}
              <div className="border-t pt-2 space-y-1 text-[11px]">
                <strong className="text-slate-900 block text-[10px] uppercase tracking-wider">
                  {isAr ? 'الملف الإكلينيكي المثالي للحالة:' : 'Target Patient Profile:'}
                </strong>
                <p className="text-slate-600 italic">
                  {isAr ? opt.idealPatientAr : opt.idealPatientEn}
                </p>
              </div>

              <div className="pt-2">
                <Link href="/plans/generate">
                  <Button className="w-full text-xs font-semibold h-8 bg-slate-900 hover:bg-blue-600 text-white gap-1.5 cursor-pointer">
                    <span>{isAr ? 'اعتماد هذا البديل في الاستوديو' : 'Adopt This Modality'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
