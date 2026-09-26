"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Layers, 
  Ruler, 
  Scan, 
  Box, 
  ShieldCheck, 
  BrainCircuit, 
  CheckCircle2, 
  ChevronRight, 
  Activity,
  Maximize2,
  ExternalLink
} from 'lucide-react';

export const PIPELINE_LAYERS = [
  {
    step: 1,
    name: 'Cephalometric Tracing',
    subtitle: 'Skeletal & Dentoalveolar Norms',
    icon: Ruler,
    tag: 'ANB & Wits Appraisal',
    description: 'Automated 16-landmark lateral ceph identification. Computes Steiner, Tweed, and McNamara measurements to classify Class I/II/III skeletal patterns.',
    clinicalFocus: 'Eliminates manual tracing error while calculating Jarabak ratio and vertical growth tendency (hyperdivergent vs hypodivergent).'
  },
  {
    step: 2,
    name: 'Panoramic OPG Segmentation',
    subtitle: 'FDI Tooth Charting & Root Health',
    icon: Scan,
    tag: '32-Tooth Segmentation',
    description: 'Full-mouth radiograph analysis identifying impactions (canines, third molars), root parallelism, root lengths, and condylar asymmetry.',
    clinicalFocus: 'Screens for root dilacerations, congenitally missing teeth, and root resorption before applying biomechanical force.'
  },
  {
    step: 3,
    name: 'Pre-Ortho Clearance AI',
    subtitle: 'Periodontal & Bone Level Guard',
    icon: ShieldCheck,
    tag: 'Biological Clearance',
    description: 'Screens crestal alveolar bone height, furcation involvement, and periapical radiolucencies prior to initiating orthodontic tooth movement.',
    clinicalFocus: 'Ensures no active periodontal disease exists, preventing irreversible alveolar bone loss and iatrogenic mobility.'
  },
  {
    step: 4,
    name: '3D Arch Space & Bolton Analysis',
    subtitle: 'Arch Perimeter & Tooth Size Discrepancy',
    icon: Box,
    tag: 'Anterior 77.2% | Overall 91.3%',
    description: 'Calculates mesiodistal tooth widths from 3D digital dental casts. Evaluates anterior and overall Bolton ratios and arch crowding in millimeters.',
    clinicalFocus: 'Determines whether crowding can be solved by expansion, IPR, or if premolar extractions are biologically required.'
  },
  {
    step: 5,
    name: 'Cortical Boundary Verification',
    subtitle: 'Alveolar Bone Thickness Limits',
    icon: Maximize2,
    tag: 'CBCT Boundary Guard',
    description: 'Calculates the thickness of the buccal and lingual cortical plates. Prevents incisor proclination from violating cortical boundaries.',
    clinicalFocus: 'Eliminates gingival recession and bone dehiscence by respecting the biological envelope of tooth movement.'
  },
  {
    step: 6,
    name: 'Clinical Chain-of-Thought (CoT)',
    subtitle: 'Orthodontic Decision Engine',
    icon: BrainCircuit,
    tag: 'Biomechanical Reasoning',
    description: 'Multi-step clinical reasoning evaluating skeletal maturation (CVM), facial aesthetics (E-plane, nasolabial angle), and patient chief complaint.',
    clinicalFocus: 'Formulates prioritized treatment objectives and ranks treatment modalities with pros, cons, and evidence citations.'
  },
  {
    step: 7,
    name: 'Staged Plan Synthesis',
    subtitle: 'Archwires, Mechanics & Retention',
    icon: Layers,
    tag: 'Complete Clinical Plan',
    description: 'Generates a ready-to-execute staged treatment plan: archwire sequence (.014 CuNiTi to .019x.025 SS), elastics, anchorage, and dual retention.',
    clinicalFocus: 'Provides chairside mechanics tables, tooth-by-tooth FDI bracket prescriptions, and patient consent documentation.'
  }
];

import { useLanguage } from '@/lib/i18n/language-context';

export function EngineShowcase() {
  const [selectedLayer, setSelectedLayer] = useState(PIPELINE_LAYERS[0]);
  const { lang, isAr } = useLanguage();

  const layersAr = [
    {
      step: 1,
      name: 'تتبع السيفالومتريك',
      subtitle: 'المعايير الهيكلية والسنخية (Steiner & Tweed)',
      tag: 'تحليل ANB و Wits',
      description: 'تحديد آلي لـ 16 نقطة تشريحية على أشعة الرأس الجانبية. حساب زوايا ستاينر وتويد وماكنمارا لتصنيف العضة الهيكلية (صنف I / II / III).',
      clinicalFocus: 'يلغي أخطاء التتبع اليدوي ويحسب نسبة جاراباك (Jarabak) واتجاه نمو الوجه (أفقي أم عمودي) بدقة عالية.'
    },
    {
      step: 2,
      name: 'تجزئة بانوراما الأسنان OPG',
      subtitle: 'ترقيم الـ 32 سناً وفحص صحة الجذور',
      tag: 'تجزئة FDI الدقيقة',
      description: 'تحليل شامل للأشعة البانورامية لكشف الأسنان المطمورة (الأنياب وأضراس العقل)، وتوازي الجذور، وأطوالها، وتناظر لقمة الفك السفلي.',
      clinicalFocus: 'يرصد انحناءات الجذور الحادة، والأسنان المفقودة وراثياً، وارتشاف الجذور قبل تطبيق أي قوة تقويمية.'
    },
    {
      step: 3,
      name: 'التصريح اللثوي السريري AI',
      subtitle: 'حارس مستوى العظم وصحة اللثة',
      tag: 'تصريح أمان بيولوجي',
      description: 'فحص ارتفاع العظم السنخي ومستويات مفترق الجذور (Furcation) وخلو ذروة الجذور من الآفات قبل الشروع في تحريك الأسنان.',
      clinicalFocus: 'يضمن عدم وجود أي التهاب لثوي نشط، مانعاً تراجع العظم السنخي الحاد أو حركة الأسنان الصدمية.'
    },
    {
      step: 4,
      name: 'مساحة القوس وتحليل بولتون',
      subtitle: 'محيط القوس وتفاوت أحجام الأسنان',
      tag: 'الأمامي 77.2% | الكلي 91.3%',
      description: 'حساب العرض الإنسي الوحشي للأسنان من النماذج الرقمية ثلاثية الأبعاد، وتقييم نسب بولتون الأمامية والكلية والتزاحم بالملليمتر.',
      clinicalFocus: 'يحدد رياضياً ما إذا كان التزاحم يعالج بالتوسيع أو البرد بين السني (IPR) أو إذا كان خلع الضواحك حتمياً بيولوجياً.'
    },
    {
      step: 5,
      name: 'التحقق من حدود العظم القشري',
      subtitle: 'حماية صفيحة العظم الدهليزي وزاوية IMPA',
      tag: 'أمان بيوميكانيكي حتمي',
      description: 'فحص سماكة العظم في المقاطع المستعرضة، وفرض حد حتمي لميلان القواطع السفلية (IMPA ≤ 95°) لمنع خروج الجذور خارج العظم.',
      clinicalFocus: 'يمنع انحسار اللثة الصدمي وتكشف جذور الأسنان عبر منع دفع القواطع خارج الحيز العظمي الصلب.'
    },
    {
      step: 6,
      name: 'الاستدلال السريري الموجه',
      subtitle: 'منطق شجرة القرارات السريرية المحكومة',
      tag: 'استدلال سريري CoT',
      description: 'تطبيق خوارزميات الاستدلال السريري لوزن خيارات التقويم: جراحة الفكين مقابل التمويه، وأولويات ترتيب حركة الأسنان.',
      clinicalFocus: 'يربط المشكلات الهيكلية والسنية معاً، لترتيب أهداف العلاج بدون أي تضارب بيوميكانيكي.'
    },
    {
      step: 7,
      name: 'تخليق خطة العلاج التوثيقية',
      subtitle: 'تسلسل الأسلاك، المطاطات، والتثبيت',
      tag: 'خطة سريرية متكاملة',
      description: 'توليد خطة علاج جاهزة للتنفيذ: تدرج مقاسات الأسلاك (من CuNiTi 0.014 إلى SS 0.019x0.025)، عيار المطاطات، التثبيت، وتوثيق PubMed.',
      clinicalFocus: 'يوفر جداول ميكانيكا العيادة خطوة بخطوة، ووصفات عزم البراكتات لكل سن بنظام FDI، واستمارات إقرار المريض.'
    }
  ];

  const currentLayers = isAr ? layersAr : PIPELINE_LAYERS;
  const currentSelected = currentLayers.find(l => l.step === selectedLayer.step) || currentLayers[0];

  return (
    <section id="engine" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="bg-teal-50 text-teal-800 border-teal-200 text-xs px-3.5 py-1 font-semibold rounded-full shadow-xs">
            {isAr ? 'المعمارية السريرية الحتمية' : 'Clinical Architecture'}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {isAr ? 'خط الأنابيب التشخيصي السباعي للذكاء الاصطناعي.' : 'The 7-Layer Clinical AI Pipeline.'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'نماذج الذكاء الاصطناعي العامة قد تهلوس بأرقام الأسنان ومقادير القوى. تطبق Odonto AI خط أنابيب تشخيصي حتمي من 7 مراحل قبل صياغة أي خطة علاج سريرية.'
              : 'Generic LLMs hallucinate tooth numbers and force levels. Odonto AI executes a 7-stage deterministic diagnostic pipeline before synthesizing any clinical plan.'}
          </p>
        </div>

        {/* Live Metrics Grid in Clean Light Apple Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-16">
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-blue-600 font-mono">
              85%
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1.5">
              {isAr ? 'توفير في وقت التشخيص' : 'Diagnosis Time Saved'}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isAr ? 'من تتبع السيفالومتريك إلى الخطة' : 'From ceph tracing to final plan'}
            </p>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-teal-600 font-mono">
              100%
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1.5">
              {isAr ? 'فحص الأمان البيولوجي' : 'Biological Safety Check'}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isAr ? 'حدود العظم وزاوية IMPA' : 'Cortical bone boundary limits'}
            </p>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-indigo-600 font-mono">
              0 mm
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1.5">
              {isAr ? 'فقدان التثبيت مع TADs' : 'Anchor Loss with TADs'}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isAr ? 'متجهات قوى هيكلية محسوبة' : 'Calculated skeletal vectors'}
            </p>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-mono">
              11+
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1.5">
              {isAr ? 'وحدة معرفية محكمة' : 'Evidence Modules'}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isAr ? 'أبحاث ومعايير تقويمية عالمية' : 'Peer-reviewed orthodontic data'}
            </p>
          </div>
        </div>

        {/* Interactive Layer Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical Layer Stepper */}
          <div className="lg:col-span-6 space-y-2">
            {currentLayers.map((layer) => {
              const originalLayer = PIPELINE_LAYERS.find(p => p.step === layer.step) || PIPELINE_LAYERS[0];
              const LayerIcon = originalLayer.icon;
              const isSelected = selectedLayer.step === layer.step;

              return (
                <button
                  key={layer.step}
                  type="button"
                  onClick={() => setSelectedLayer(originalLayer)}
                  className={`w-full text-left rtl:text-right p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-400 text-slate-900 shadow-xs ring-1 ring-blue-300'
                      : 'bg-white border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {layer.step}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold truncate text-slate-900">
                        {layer.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {layer.subtitle}
                      </div>
                    </div>
                  </div>
                  <Badge className={`text-[10px] shrink-0 font-mono ${
                    isSelected ? 'bg-blue-600 text-white border-none' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {layer.tag}
                  </Badge>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Layer Deep Dive Card */}
          <div className="lg:col-span-6 bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                  <selectedLayer.icon className="w-5 h-5" />
                </div>
                <div>
                  <Badge className="bg-blue-100 text-blue-800 border-none text-[10px] font-mono font-bold">
                    {isAr ? `الطبقة 0${selectedLayer.step} من 07` : `Layer 0${selectedLayer.step} of 07`}
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                    {currentSelected.name}
                  </h3>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  {isAr ? 'كيف تعمل هذه الطبقة:' : 'How This Layer Works:'}
                </span>
                <p className="leading-relaxed text-slate-700">
                  {currentSelected.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1 text-xs shadow-xs">
                <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-teal-600" />
                  {isAr ? 'القيمة السريرية والأمان البيوميكانيكي:' : 'Clinical & Biomechanical Safety Value:'}
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {currentSelected.clinicalFocus}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isAr ? 'متاح ومدمج في استوديو العلاج المباشر' : 'Available live in Treatment Studio'}
              </span>
              <Link href="/plans/generate">
                <Button size="sm" className="bg-slate-950 text-white hover:bg-blue-600 text-xs font-semibold rounded-full gap-1.5 transition-colors">
                  <span>{isAr ? 'فتح الاستوديو' : 'Open Studio'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scientific Transparency & Under the Hood Callout */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-5 border border-slate-800 shadow-md">
          <div className="space-y-1.5 text-center sm:text-left rtl:sm:text-right">
            <div className="flex flex-wrap items-center justify-center sm:justify-start rtl:sm:justify-start gap-2">
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-[10px] uppercase font-bold tracking-wider">
                {isAr ? 'شفافية علمية وأكاديمية كاملة' : 'Full Scientific Transparency'}
              </Badge>
              <span className="text-xs font-bold text-slate-200">
                {isAr ? 'قاعدة أدلة محكمة وقواعد بيوميكانيكية صارمة' : 'Peer-Reviewed Evidence Base & Biomechanical Rules'}
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {isAr
                ? 'اطلع على معادلات السيفالومتريك التفصيلية، وبروتوكولات حفر العظم Misch D1–D4، ونظام الاسترجاع المباشر من NCBI PubMed، وأكثر من 14 دراسة مرجعية في دليل الطبيب الشامل.'
                : 'Inspect our exact cephalometric formulas, Misch D1–D4 drilling protocols, PubMed NCBI live RAG pipeline, and 14+ landmark study citations in our complete clinician manual.'}
            </p>
          </div>
          <a
            href="/resources.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-950 hover:bg-blue-50 text-xs font-bold transition-all shrink-0 shadow-sm cursor-pointer hover:shadow-md"
          >
            <span>{isAr ? 'المصادر والمراجع السريرية 🔬' : 'Resources & References 🔬'}</span>
            <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
          </a>
        </div>
      </div>
    </section>
  );
}
