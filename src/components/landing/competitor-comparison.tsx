"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { 
  Check, 
  X, 
  Lightbulb, 
  PiggyBank, 
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from "lucide-react";

interface FeatureItem {
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  odonto: boolean | string;
  overjet: boolean | string;
  pearl: boolean | string;
  dolphin: boolean | string;
  clincheck: boolean | string;
  webceph: boolean | string;
}

interface CategoryGroup {
  id: string;
  nameEn: string;
  nameAr: string;
  badgeEn?: string;
  badgeAr?: string;
  features: FeatureItem[];
}

const COMPARISON_CATEGORIES: CategoryGroup[] = [
  {
    id: "treatment-planning",
    nameEn: "Treatment Plan Synthesis (Odonto's Pioneer Zone)",
    nameAr: "تخليق خطط العلاج المرحلية (منطقة ريادة Odonto AI)",
    badgeEn: "Unique to Odonto AI",
    badgeAr: "حصرية لمنظومة Odonto AI",
    features: [
      {
        nameEn: "Multi-Phase Staged Treatment Plan Generation",
        nameAr: "تخليق خطة علاج مرحلية متعددة الأطوار",
        descEn: "Synthesizes comprehensive Phase 1–6 clinical sequences: emergency, clearance, restorative, biomechanical staging, retention.",
        descAr: "توليد تسلسلات سريرية شاملة للمراحل 1-6: الطوارئ، التصريح اللثوي، الترميم، مراحل البيوميكانيكا، والتثبيت النهائي.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        nameEn: "Archwire Sequence Calculation (CuNiTi → TMA → SS)",
        nameAr: "حساب تسلسل أسلاك التقويم (CuNiTi → TMA → SS)",
        descEn: "Deterministic force-deflection curve progression calibrated to slot size (.018 vs .022) and friction mechanics.",
        descAr: "تدرج حتمي لمنحنيات القوة والانحراف محسوب بدقة لمقاس الشق (.018 مقابل .022) وميكانيكا الاحتكاك.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        nameEn: "Bracket Prescription Modeling (MBT / Roth / Damon)",
        nameAr: "نمذجة وصفات الحاصرات (MBT / Roth / Damon)",
        descEn: "Pre-adjusted tip, torque, and in-out compensation matching facial biotype and cephalometric objectives.",
        descAr: "ضبط مسبق لزوايا الميلان (Tip) والعزم (Torque) والتعويض الداخلي/الخارجي بما يلائم النمط الوجهي والأهداف السيفالومترية.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        nameEn: "Extraction vs Non-Extraction Decision Algorithm",
        nameAr: "خوارزمية حسم قرار الخلع مقابل عدم الخلع",
        descEn: "Calculates Bolton tooth-size ratio, arch perimeter deficiency, and Tweed-Merrifield diagnostic triangle.",
        descAr: "حساب نسبة بولتون لتناسب أحجام الأسنان، ونقص محيط القوس السني، ومثلث تويد-ميريفيلد التشخيصي.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        nameEn: "Clear Aligner Staging with Biological Velocity Limits",
        nameAr: "مراحل التقويم الشفاف بحدود السرعة الحيوية",
        descEn: "Capped at 0.20mm translation and 2.0° rotation per stage to prevent tracking failure and root dehiscence.",
        descAr: "سقف أقصى 0.20 مم للإزاحة و2.0° للدوران لكل مرحلة لمنع فقدان التطابق وتراجع العظم عن الجذور.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: "Proprietary",
        webceph: false
      },
      {
        nameEn: "Orthognathic Surgical Planning (Le Fort I, BSSO, SFA)",
        nameAr: "تخطيط جراحة تقويم الفكين (Le Fort I, BSSO, SFA)",
        descEn: "Pre-surgical incisor decompensation goals, osteotomy vectors, and Surgery-First (RAP) protocol staging.",
        descAr: "أهداف إزالة التعويض السني قبل الجراحة، متجهات قص العظم، ومراحل بروتوكول الجراحة أولاً (Surgery-First).",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: "Add-On $",
        clincheck: false,
        webceph: false
      }
    ]
  },
  {
    id: "diagnostic-detection",
    nameEn: "AI-Powered Diagnostic Detection",
    nameAr: "التشخيص وكشف الآفات بالذكاء الاصطناعي",
    features: [
      {
        nameEn: "Automated Caries Detection on Bitewing/Periapical",
        nameAr: "كشف التسوس الآلي في أشعة الإطباق والذروية",
        descEn: "Pixel-level radiolucency detection calibrated to enamel vs dentin penetration boundaries.",
        descAr: "رصد الشفافية الإشعاعية على مستوى البكسل بمعايرة حدود اختراق المينا وصولاً إلى العاج.",
        odonto: "Planned",
        overjet: true,
        pearl: true,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        nameEn: "Bone Loss Measurement (Crestal Alveolar Height)",
        nameAr: "قياس تآكل العظم (ارتفاع العظم السنخي القمي)",
        descEn: "Millimetric periodontal bone level calculation across maxillary and mandibular quadrants.",
        descAr: "حساب دقيق لارتفاع مستوى العظم المحيط بالأسنان بالملم في أرباع الفكين العلوي والسفلي.",
        odonto: "Planned",
        overjet: true,
        pearl: true,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        nameEn: "32-Tooth FDI Segmentation on Panoramic OPG",
        nameAr: "تجزئة وترقيم 32 سناً بنظام FDI على البانوراما",
        descEn: "Instant dental arch identification, root angulation evaluation, and impaction screening.",
        descAr: "تحديد فوري للقوس السني، وتقييم ميلان الجذور، ومسح الأسنان المنطمرة في ثوانٍ.",
        odonto: true,
        overjet: true,
        pearl: true,
        dolphin: "Manual",
        clincheck: false,
        webceph: "Partial"
      },
      {
        nameEn: "Periapical Pathology Detection (18+ Findings)",
        nameAr: "كشف آفات ذروة الجذر (أكثر من 18 آفة مرضية)",
        descEn: "Screens periapical lesions, furcation defects, calculus, and radiolucencies before applying orthodontic force.",
        descAr: "مسح الآفات الذروية، إصابات مفرق الجذور، الرواسب الكلسية، والشفافيات قبل تطبيق قوى التقويم.",
        odonto: "Pre-Ortho Clearance",
        overjet: "Limited",
        pearl: true,
        dolphin: false,
        clincheck: false,
        webceph: false
      }
    ]
  },
  {
    id: "ceph-anatomy",
    nameEn: "Cephalometric & Anatomical Analysis",
    nameAr: "التحليل السيفالومتري والتشريحي",
    features: [
      {
        nameEn: "Automated Lateral Ceph Tracing (Steiner, Tweed, Wits)",
        nameAr: "تتبع سيفالومتري جانبي آلي (Steiner, Tweed, Wits)",
        descEn: "16-landmark automated tracing with instantaneous ANB, Wits, IMPA, and FMA angle calculations.",
        descAr: "تتبع آلي لـ 16 نقطة تشريحية مع حسابات فورية لزوايا وعلاقات ANB و Wits و IMPA و FMA.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: true,
        clincheck: false,
        webceph: true
      },
      {
        nameEn: "3D Digital Cast Bolton Tooth-Size Ratio Analysis",
        nameAr: "تحليل نسب بولتون لأحجام الأسنان على النماذج الرقمية",
        descEn: "Automated tooth-width measurement calculating Anterior (77.2%) and Overall (91.3%) Bolton ratios in mm.",
        descAr: "قياس آلي لعرض الأسنان يحسب نسبة بولتون الأمامية (77.2%) والكلية (91.3%) بالملم بدقة متناهية.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: "Manual",
        clincheck: "Internal",
        webceph: false
      },
      {
        nameEn: "CBCT Cortical Bone Boundary Verification",
        nameAr: "التحقق من حدود العظم القشري عبر الأشعة المقطعية CBCT",
        descEn: "Guards against incisor proclination violating buccal or lingual cortical plates, avoiding bone dehiscence.",
        descAr: "حماية القواطع من الميلان الزائد المخترق للصفائح القشرية الدهليزية أو اللسانية لتفادي انكشاف الجذور.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: "Limited",
        clincheck: false,
        webceph: false
      },
      {
        nameEn: "CVM Skeletal Maturation Assessment (CS1–CS6)",
        nameAr: "تقييم نضوج الفقرات العنقية العظمي (CS1–CS6)",
        descEn: "Pinpoints adolescent peak growth velocity on lateral cephalometrics to optimize orthopedic timing.",
        descAr: "تحديد قمة طفرة النمو لدى اليافعين بدقة على السيفالومتريك لاختيار التوقيت المثالي لتعديل النمو عظمياً.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      }
    ]
  },
  {
    id: "implantology",
    nameEn: "Dental Implant Planning Studio",
    nameAr: "استوديو تخطيط زراعة الأسنان",
    badgeEn: "Unique to Odonto AI",
    badgeAr: "حصرية لمنظومة Odonto AI",
    features: [
      {
        nameEn: "Misch D1–D4 Bone Density Engine",
        nameAr: "محرك تصنيف كثافة العظم Misch D1–D4",
        descEn: "Translates Hounsfield Units into custom drilling sequences, tap requirements, and ISQ stability targets.",
        descAr: "تحويل وحدات هاونسفيلد (HU) لبروتوكولات حفر مخصصة، واحتياج قلاووظ العظم، وثبات ISQ المستهدف.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        nameEn: "Fixture Sizing from 14 Major Implant Catalogs",
        nameAr: "تحديد مقاسات الزرعات من 14 كتالوجاً عالمياً",
        descEn: "Straumann, Nobel Biocare, Zimmer, Dentsply, BioHorizons, MegaGen, Osstem dimensions with 1.5mm buccal plate guard.",
        descAr: "أبعاد أنظمة Straumann و Nobel و Zimmer و Dentsply و MegaGen مع هامش أمان 1.5 مم للعظم الدهليزي.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        nameEn: "Subantral Sinus Lift Calculator (OSFE vs Lateral)",
        nameAr: "حاسبة رفع الجيب الفكي (الرفع المغلق OSFE مقابل النافذة الجانبية)",
        descEn: "Residual bone height rules: Crestal osteotome (≥5mm) vs Lateral window (<4mm staged / 4–8mm simultaneous).",
        descAr: "قواعد ارتفاع العظم المتبقي: الرفع بالدكاكات العظمية (≥5 مم) مقابل النافذة المفتوحة (<4 مم على مرحلتين / 4-8 مم فوري).",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        nameEn: "Prosthetic Screw Torque & Emergence Calculation",
        nameAr: "حساب عزم ربط براغي التعويضات وملف البزوغ",
        descEn: "Calibrated manufacturer torque specifications (25–35 Ncm), abutment cuff heights, and C/I lever ratios.",
        descAr: "معايرة عزم الربط الموصى به (25-35 Ncm)، وارتفاعات أطواق الدعامات، ونسب ذراع الرافعة (التاج/الزرعة).",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      }
    ]
  },
  {
    id: "evidence-intelligence",
    nameEn: "Evidence Grounding & Clinical Intelligence",
    nameAr: "الأدلة العلمية الموثقة والذكاء السريري",
    features: [
      {
        nameEn: "Live NCBI PubMed RAG Literature Grounding",
        nameAr: "توثيق لحظي بالأبحاث الحية من NCBI PubMed (RAG)",
        descEn: "Direct real-time query against PubMed database for peer-reviewed studies (AJODO, Angle, JCO) justifying mechanics.",
        descAr: "استعلام فوري ومباشر من قاعدة بيانات PubMed لأبحاث محكمة (AJODO, Angle, JCO) لتعليل الخطة البيوميكانيكية.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        nameEn: "Deterministic Biomechanical Engine (Zero Hallucination)",
        nameAr: "محرك بيوميكانيكي حتمي (صفر هلوسة سريرية)",
        descEn: "Dual-engine fail-safe calculating biological forces mathematically before contextual LLM plan synthesis.",
        descAr: "نظام أمان مزدوج يحسب القوى الحيوية رياضياً وبدقة قبل صياغة الذكاء الاصطناعي للنص النهائي.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      },
      {
        nameEn: "Peer-Reviewed Citation for Every Recommendation",
        nameAr: "استشهاد ببحوث محكمة لكل توصية سريرية",
        descEn: "Every extraction, wire progression, and TAD placement references established published literature with PMIDs.",
        descAr: "كل قرار خلع، وتدرج أسلاك، وغرسة تثبيت عظمي يستند إلى دراسات علمية موثقة بأرقام PMID الرسمية.",
        odonto: true,
        overjet: false,
        pearl: false,
        dolphin: false,
        clincheck: false,
        webceph: false
      }
    ]
  },
  {
    id: "deployment-cost",
    nameEn: "Deployment, Ecosystem & Economics",
    nameAr: "طريقة التشغيل، التوافق، والتكلفة الاقتصادية",
    features: [
      {
        nameEn: "Cloud-Native (No Installation or Dongles)",
        nameAr: "سحابي بالكامل (بدون تثبيت برامج أو مفاتيح USB)",
        descEn: "Instant access in any modern browser on Mac, PC, or iPad without workstation servers or hardware dongles.",
        descAr: "وصول فوري من أي متصفح حديث على أجهزة Mac و PC و iPad دون الحاجة لسيرفرات عيادة أو دونجل فيزيائي.",
        odonto: true,
        overjet: true,
        pearl: true,
        dolphin: "Desktop Dongle",
        clincheck: "Web & App",
        webceph: true
      },
      {
        nameEn: "Upfront Capital Expenditure Required",
        nameAr: "التكلفة الرأسمالية التأسيسية المطلوبة",
        descEn: "High upfront software acquisition and expensive perpetual licensing fees.",
        descAr: "تكاليف شراء البرامج الأولية المرتفعة ورسوم التراخيص الدائمة باهظة الثمن.",
        odonto: "No Upfront CapEx",
        overjet: "Enterprise Contract",
        pearl: "Enterprise Contract",
        dolphin: "$8,000 – $15,000+",
        clincheck: "Per-Case Fee",
        webceph: "Low"
      },
      {
        nameEn: "Vendor Lock-in & Laboratory Agnostic",
        nameAr: "الاحتكار التجاري والحيادية مع المعامل",
        descEn: "Clinical freedom to use any bracket prescription, any aligner lab, and any implant manufacturer.",
        descAr: "حرية سريرية تامة لاختيار أي نوع براكتات، وأي معمل شفاف، وأي شركة زراعة أسنان تفضلها.",
        odonto: "100% Agnostic",
        overjet: "Agnostic",
        pearl: "Agnostic",
        dolphin: "Agnostic",
        clincheck: "Locked (Align Only)",
        webceph: "Agnostic"
      },
      {
        nameEn: "Clinical Specialty Coverage",
        nameAr: "تغطية التخصصات السريرية في طب الأسنان",
        descEn: "Breadth of supported dental specialties in a single unified clinical interface.",
        descAr: "مدى شمول التخصصات السريرية المدعومة ضمن واجهة عمل واحدة وسلسة.",
        odonto: "6 Disciplines + Implants",
        overjet: "General Practice",
        pearl: "General Practice",
        dolphin: "Orthodontics Only",
        clincheck: "Aligners Only",
        webceph: "Ceph Tracing Only"
      }
    ]
  }
];

export function CompetitorComparison() {
  const { lang, isRTL } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredCategories = selectedFilter === "all"
    ? COMPARISON_CATEGORIES
    : COMPARISON_CATEGORIES.filter(c => c.id === selectedFilter);

  // String translator helper for competitor cell values
  const translateCellValue = (value: string): string => {
    if (lang === 'en') return value;
    switch (value) {
      case "Planned": return "مخطط له";
      case "Pre-Ortho Clearance": return "تصريح ما قبل التقويم";
      case "Proprietary": return "نظام مغلق";
      case "Add-On $": return "إضافة مدفوعة $";
      case "Manual": return "يدوي";
      case "Partial": return "جزئي";
      case "Limited": return "محدود";
      case "Internal": return "داخلي";
      case "Desktop Dongle": return "دونجل USB مكتبي";
      case "Web & App": return "ويب وتطبيق";
      case "No Upfront CapEx": return "صفر تكلفة تأسيس";
      case "Enterprise Contract": return "عقود مؤسسات باهظة";
      case "$8,000 – $15,000+": return "$8,000 – $15,000+";
      case "Per-Case Fee": return "رسوم لكل حالة";
      case "Low": return "تكلفة منخفضة";
      case "100% Agnostic": return "حيادي ومفتوح 100%";
      case "Agnostic": return "حيادي ومفتوح";
      case "Locked (Align Only)": return "محتكر (Align فقط)";
      case "6 Disciplines + Implants": return "6 تخصصات + الزراعة";
      case "General Practice": return "طب عام فقط";
      case "Orthodontics Only": return "تقويم أسنان فقط";
      case "Aligners Only": return "تقويم شفاف فقط";
      case "Ceph Tracing Only": return "رسم سيفالومتريك فقط";
      default: return value;
    }
  };

  const renderValue = (value: string | boolean, isOdonto = false) => {
    if (value === true) {
      return (
        <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full mx-auto ${
          isOdonto ? "bg-blue-600 text-white shadow-xs" : "bg-emerald-100 text-emerald-800"
        }`}>
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      );
    }
    if (value === false) {
      return (
        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-300 mx-auto">
          <X className="w-3.5 h-3.5 stroke-[2]" />
        </div>
      );
    }
    
    // Custom strings
    const translatedText = translateCellValue(value);

    if (isOdonto) {
      if (value === "Planned") {
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] font-mono font-semibold">
            {translatedText}
          </Badge>
        );
      }
      if (value === "Pre-Ortho Clearance") {
        return (
          <Badge variant="outline" className="bg-teal-50 text-teal-800 border-teal-200 text-[10px] font-mono font-semibold">
            {translatedText}
          </Badge>
        );
      }
      return (
        <span className="text-xs font-bold text-blue-700 block">
          {translatedText}
        </span>
      );
    }

    return (
      <span className="text-xs font-medium text-slate-600 block">
        {translatedText}
      </span>
    );
  };

  const totalFeaturesCount = COMPARISON_CATEGORIES.reduce((acc, c) => acc + c.features.length, 0);

  return (
    <section id="comparison" className="py-24 sm:py-32 bg-slate-50 border-t border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-3.5 py-1 font-semibold rounded-full shadow-xs">
            {lang === 'ar' ? 'مقارنة سوقية موضوعية ومحايدة' : 'Objective Market Comparison'}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {lang === 'ar' ? 'مقارنة Odonto AI مع رواد السوق العالميين.' : 'How Odonto AI Compares to Market Leaders.'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {lang === 'ar'
              ? 'مقارنة شفافة وموضوعية توضح الفارق بين برمجيات الديسكتوب القديمة، ومنصات التقويم الشفاف محدودة التخصص، وبرمجيات كشف الأمراض، مقابل منظومة ذكاء اصطناعي سريرية متكاملة.'
              : 'A fair, transparent comparison showing how legacy desktop software, single-specialty aligner platforms, and AI pathology tools compare against an integrated clinical AI system.'
            }
          </p>
        </div>

        {/* 3 Real Clinical & Financial ROI Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col space-y-3 hover:border-blue-300 transition-all text-start">
            <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-slate-900">
              {lang === 'ar' ? 'المنصة الوحيدة التي تخلّق خطط علاج' : 'The Only Platform That Plans'}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'ar' ? (
                <>
                  منصات مثل <strong className="text-slate-800">Overjet</strong> و <strong className="text-slate-800">Pearl</strong> تكتشف التسوس والآفات بالأشعة لكنها تقف هناك؛ فهي محطات تشخيصية بدون تخطيط. منصة Odonto AI تحوّل التشخيص لبرنامج عملي بتخليق خطط علاجية بيوميكانيكية مرحلية كاملة.
                </>
              ) : (
                <>
                  Competitors like <strong className="text-slate-800">Overjet</strong> and <strong className="text-slate-800">Pearl</strong> detect disease on 2D X-rays but stop there. They are diagnostic dead-ends. Odonto AI bridges detection to action by synthesizing full multi-phase biomechanical treatment plans.
                </>
              )}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col space-y-3 hover:border-teal-300 transition-all text-start">
            <div className="w-11 h-11 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 font-bold">
              <PiggyBank className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-slate-900">
              {lang === 'ar' ? 'توفير 8,000 إلى 15,000 دولار في التراخيص' : '$8,000–$15,000 in Software Savings'}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'ar' ? (
                <>
                  استغنِ تماماً عن برمجيات محطات العمل القديمة مثل <strong className="text-slate-800">Dolphin Imaging</strong> التي تفرض تراخيص أولية باهظة وتحديثات سنوية مدفوعة وسيرفرات مكلفة ومفاتيح USB Dongles عتيقة.
                </>
              ) : (
                <>
                  Eliminate legacy workstation software like <strong className="text-slate-800">Dolphin Imaging</strong> requiring massive upfront licenses, paid version upgrades, dedicated server hardware, and physical USB security dongles.
                </>
              )}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col space-y-3 hover:border-indigo-300 transition-all text-start">
            <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-slate-900">
              {lang === 'ar' ? '6 تخصصات طب أسنان في بيئة واحدة' : '6 Dental Disciplines in One'}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'ar' ? (
                <>
                  بدلاً من دفع اشتراكات متفرقة لـ ClinCheck (شفاف فقط) و Dolphin (تقويم فقط) و Overjet (تشخيص عام فقط)، تجمع Odonto AI جراحة الفكين، التقويم الثابت والشفاف، التقويم المبكر، زرعات التثبيت، وزراعة الأسنان في كابينة واحدة.
                </>
              ) : (
                <>
                  Instead of paying for ClinCheck (Aligners only), Dolphin (Ortho only), and Overjet (General only), Odonto AI covers surgical, fixed, aligners, interceptive, TADs, and implants in one seamless cockpit.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setSelectedFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedFilter === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            {lang === 'ar' ? `جميع الميزات (${totalFeaturesCount})` : `All Features (${totalFeaturesCount})`}
          </button>
          {COMPARISON_CATEGORIES.map(cat => {
            const catName = lang === 'ar' ? cat.nameAr.split(" (")[0] : cat.nameEn.split(" (")[0];
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === cat.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {catName}
              </button>
            );
          })}
        </div>

        {/* Detailed Comparison Table (Apple Light Style) */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse min-w-[1080px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-slate-700 w-[34%] text-start">
                    {lang === 'ar' ? 'القدرة السريرية والبروتوكول الطبي' : 'Clinical Capability & Protocol'}
                  </th>
                  <th className="py-5 px-4 text-center bg-blue-50/70 border-x border-blue-200/70 w-[14%]">
                    <div className="text-base font-extrabold text-blue-950">Odonto AI</div>
                    <span className="text-[10px] text-blue-700 font-semibold block uppercase tracking-wide">
                      {lang === 'ar' ? 'منصة شاملة متكاملة' : 'All-In-One Platform'}
                    </span>
                  </th>
                  <th className="py-5 px-4 text-center w-[11%]">
                    <div className="text-sm font-bold text-slate-900">Overjet</div>
                    <span className="text-[10px] text-slate-500 block">
                      {lang === 'ar' ? 'ذكاء تشخيص الآفات' : 'Pathology AI'}
                    </span>
                  </th>
                  <th className="py-5 px-4 text-center w-[11%]">
                    <div className="text-sm font-bold text-slate-900">Pearl</div>
                    <span className="text-[10px] text-slate-500 block">
                      {lang === 'ar' ? 'رأي تشخيصي ثانٍ' : 'Second Opinion'}
                    </span>
                  </th>
                  <th className="py-5 px-4 text-center w-[11%]">
                    <div className="text-sm font-bold text-slate-900">Dolphin</div>
                    <span className="text-[10px] text-slate-500 block">
                      {lang === 'ar' ? 'ديسكتوب تقليدي' : 'Legacy Desktop'}
                    </span>
                  </th>
                  <th className="py-5 px-4 text-center w-[11%]">
                    <div className="text-sm font-bold text-slate-900">ClinCheck</div>
                    <span className="text-[10px] text-slate-500 block">
                      {lang === 'ar' ? 'تقويم شفاف فقط' : 'Aligner-Only'}
                    </span>
                  </th>
                  <th className="py-5 px-4 text-center w-[8%]">
                    <div className="text-sm font-bold text-slate-900">WebCeph</div>
                    <span className="text-[10px] text-slate-500 block">
                      {lang === 'ar' ? 'رسم سيفالومتريك فقط' : 'Tracing-Only'}
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredCategories.map((category) => (
                  <React.Fragment key={category.id}>
                    {/* Category Header Row */}
                    <tr className="bg-slate-100/70 border-t border-b border-slate-200">
                      <td colSpan={7} className="py-2.5 px-6 font-bold text-[11px] uppercase tracking-wider text-slate-700">
                        <div className="flex items-center justify-between">
                          <span>{lang === 'ar' ? category.nameAr : category.nameEn}</span>
                          {(category.badgeEn || category.badgeAr) && (
                            <Badge className="bg-blue-600 text-white border-none text-[9px] font-bold px-2 py-0.5">
                              {lang === 'ar' ? category.badgeAr : category.badgeEn}
                            </Badge>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Features in this Category */}
                    {category.features.map((feature, featureIndex) => (
                      <tr 
                        key={featureIndex}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        {/* Feature Name & Description */}
                        <td className="py-3.5 px-6 space-y-0.5 text-start">
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">
                            {lang === 'ar' ? feature.nameAr : feature.nameEn}
                          </div>
                          <div className="text-[11px] text-slate-500 leading-snug">
                            {lang === 'ar' ? feature.descAr : feature.descEn}
                          </div>
                        </td>

                        {/* Odonto AI Highlight Column */}
                        <td className="py-3.5 px-4 text-center bg-blue-50/25 border-x border-blue-200/50">
                          {renderValue(feature.odonto, true)}
                        </td>

                        {/* Competitor Columns */}
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feature.overjet)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feature.pearl)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feature.dolphin)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feature.clincheck)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feature.webceph)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Action Summary */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-start">
            <div className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              <span className="font-bold text-slate-700">
                {lang === 'ar' ? 'إخلاء مسؤولية سريري: ' : 'Clinical Disclaimer: '}
              </span>
              {lang === 'ar' 
                ? 'المقارنة مبنية على الوثائق والمواصفات المتاحة علناً لعام 2026. الميزات المعلمة بـ "مخطط له" قيد التطوير النشط. منظومتا Overjet و Pearl حاصلتان على اعتماد FDA كأدوات تشخيص — بينما Odonto AI هي منظومة دعم اتخاذ القرار السريري وليست جهازاً تشخيصياً طبياً.'
                : 'Comparison based on publicly available documentation as of 2026. "Planned" features are in active engineering. Overjet and Pearl are FDA-cleared diagnostic tools — Odonto AI is a clinical decision support system, not a diagnostic medical device.'
              }
            </div>
            <Link href="/plans/generate">
              <Button size="sm" className="bg-slate-950 hover:bg-blue-600 text-white rounded-full px-5 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>{lang === 'ar' ? 'فتح استوديو العلاج' : 'Launch Treatment Studio'}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Big Interactive Bottom Banner */}
        <div className="mt-12 flex justify-center">
          <Link href="/plans/generate">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-base font-bold shadow-lg shadow-blue-600/25 transition-all cursor-pointer group flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
              <span>{lang === 'ar' ? 'شاهد Odonto AI قيد التشغيل العملي' : 'See Odonto AI in Action'}</span>
              <ArrowRight className={`ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
