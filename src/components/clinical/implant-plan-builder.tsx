"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Layers, 
  Ruler, 
  Activity, 
  ShieldCheck, 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Crosshair, 
  Bookmark, 
  ExternalLink, 
  Zap, 
  ShieldAlert, 
  SlidersHorizontal, 
  Drill, 
  Wrench, 
  RotateCw 
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';
import { getToothName } from '@/lib/orthodontics/tooth-notation';

function translateBoneQuality(quality: string, isAr: boolean): string {
  if (!isAr) return quality;
  if (quality.includes('D1')) return 'عظم قشري كثيف (D1)';
  if (quality.includes('D2')) return 'عظم قشري مسامي / لب خشن (D2)';
  if (quality.includes('D3')) return 'عظم قشري رقيق / لب ناعم (D3)';
  if (quality.includes('D4')) return 'عظم إسفنجي مسامي رخو (D4)';
  return quality;
}

function translateRegion(region: string, isAr: boolean): string {
  if (!isAr) return region;
  const lower = (region || '').toLowerCase();
  if (lower.includes('anterior') && lower.includes('maxilla')) return 'المنطقة الأمامية للفك العلوي (المنطقة الجمالية)';
  if (lower.includes('posterior') && lower.includes('maxilla')) return 'المنطقة الخلفية للفك العلوي (منطقة الجيب الفكي)';
  if (lower.includes('anterior') && lower.includes('mandible')) return 'المنطقة الأمامية للفك السفلي (بين الثقبتين الذقنيتين)';
  if (lower.includes('posterior') && lower.includes('mandible')) return 'المنطقة الخلفية للفك السفلي (فوق القناة العصبية IAN)';
  return region;
}

function translateRetention(retention: string, isAr: boolean): string {
  if (!isAr) return retention;
  const lower = (retention || '').toLowerCase();
  if (lower.includes('screw')) return 'تثبيت بمسامير (Screw-Retained)';
  if (lower.includes('cement')) return 'تثبيت بالإسمنت (Cement-Retained)';
  if (lower.includes('hybrid')) return 'تثبيت هجين (Hybrid)';
  return retention;
}

function translateAugmentationType(type: string, isAr: boolean): string {
  if (!isAr) return (type || '').toUpperCase();
  const lower = (type || '').toLowerCase();
  if (lower.includes('horizontal') || lower.includes('gbr')) return 'تطعيم عظمي أفقي موجه (GBR)';
  if (lower.includes('vertical')) return 'تطعيم عظمي رأسي (Vertical GBR)';
  if (lower.includes('lateral')) return 'رفع قاع الجيب الفكي بالنافذة الجانبية (Lateral Sinus Lift)';
  if (lower.includes('crestal') || lower.includes('osfe')) return 'رفع قاع الجيب الداخلي عبر قمة العظم (Crestal OSFE)';
  if (lower.includes('split')) return 'شق وتوسيع الحافة السنخية (Ridge Split)';
  return (type || '').toUpperCase();
}

function translateAugmentationDetails(details: string, type: string, needed: boolean, isAr: boolean): string {
  if (!isAr) return details;
  if (!needed) {
    return 'حجم وسماكة العظم الطبيعي كافية تماماً لاحتواء الزرعة مع الحفاظ على صفيحة دهليزية لا تقل عن 1.5 مم وبدون الحاجة لأي تطعيم إضافي.';
  }
  const lower = ((type || '') + ' ' + (details || '')).toLowerCase();
  if (lower.includes('sinus') || lower.includes('crestal') || lower.includes('subantral')) {
    return 'يلزم إجراء رفع لقاع الجيب الفكي لتعويض الارتفاع الرأسي الناقص وإضافة طعم عظمي متوافق حيوياً لدعم ثبات واستقرار قمة الزرعة.';
  }
  if (lower.includes('horizontal') || lower.includes('gbr') || lower.includes('contour') || lower.includes('buccal')) {
    return 'يلزم إجراء تطعيم عظمي موجه (GBR) باستخدام طعم عظمي بطيء الامتصاص وغشاء كولاجيني لحماية الصفيحة الدهليزية الخارجية وضمان سماكة عظمية ≥ 1.5 مم.';
  }
  if (lower.includes('vertical')) {
    return 'يلزم تطعيم عظمي رأسي لتعويض الامتصاص الرأسي الحاد وتوفير مسافة أمان رأسية كافية فوق الهياكل التشريحية الحيوية.';
  }
  return details;
}

function translateFlap(flap: string, isAr: boolean): string {
  if (!isAr) return flap;
  const lower = (flap || '').toLowerCase();
  if (lower.includes('sulcular') || lower.includes('mid-crestal')) return 'شق قمي منتصف الحافة مع امتداد ميزابي (Mid-Crestal)';
  if (lower.includes('flapless') || lower.includes('papilla')) return 'بدون شريحة (Flapless) أو شريحة حامية للحليمات اللثوية';
  if (lower.includes('trapezoidal') || lower.includes('envelope')) return 'شريحة شبه منحرفة كاملة السُمك (Full-Thickness)';
  return flap;
}

function translateHealing(duration: string, isAr: boolean): string {
  if (!isAr) return duration;
  if (duration.includes('3-4')) return '3 - 4 أشهر (التئام قياسي)';
  if (duration.includes('4-6')) return '4 - 6 أشهر (تطعيم عظمي مصاحب)';
  if (duration.includes('6')) return '6 أشهر (عظم مسامي D4 أو رفع جيب)';
  if (duration.includes('8-12')) return '8 - 12 أسبوعاً (تحميل مبكر)';
  return duration;
}

function translateRestoration(rest: string, isAr: boolean): string {
  if (!isAr) return rest;
  const lower = (rest || '').toLowerCase();
  if (lower.includes('screw')) return 'تاج مفرد مثبت بمسمار (Screw-Retained Crown)';
  if (lower.includes('cement')) return 'تاج مفرد مثبت بالإسمنت (Cement-Retained Crown)';
  if (lower.includes('bridge')) return 'جسر تعويضي مدعوم بزرعات';
  if (lower.includes('all-on-4')) return 'تركيبة قوس كامل مدعومة بزرعات (All-on-4)';
  return rest;
}

function translateAbutment(abutment: string, isAr: boolean): string {
  if (!isAr) return abutment;
  const lower = (abutment || '').toLowerCase();
  if (lower.includes('zirconia') || lower.includes('ti-base')) return 'دعامة زركونيا مخصصة مع قاعدة تيتانيوم (Ti-Base)';
  if (lower.includes('multi-unit')) return 'دعامة متعددة الوحدات (Multi-Unit)';
  if (lower.includes('stock') && lower.includes('straight')) return 'دعامة تيتانيوم قياسية مستقيمة';
  if (lower.includes('angled')) return 'دعامة تيتانيوم مائلة بزاوية';
  return abutment;
}

function translateClearance(clearance: string, isAr: boolean): string {
  if (!isAr) return clearance;
  const lower = (clearance || '').toLowerCase();
  if (lower.includes('guided')) return 'معتمد للجراحة بالدليل الجراحي الرقمي (Guided Surgery)';
  if (lower.includes('precautions')) return 'معتمد مع اتخاذ احتياطات إكلينيكية إضافية';
  if (lower.includes('high risk')) return 'خطورة مرتفعة - يتطلب إجراءات تحضيرية أولاً';
  return clearance;
}

function translateRiskLevel(level: string, isAr: boolean): string {
  if (!isAr) return level;
  const lower = (level || '').toLowerCase();
  if (lower === 'low') return 'منخفض الخطورة';
  if (lower === 'moderate') return 'متوسط الخطورة';
  if (lower === 'high') return 'مرتفع الخطورة';
  return level;
}

function translateRationale(text: string, isAr: boolean): string {
  if (!isAr) return text;
  const lower = text.toLowerCase();
  if (lower.includes('diameter') && (lower.includes('buccal') || lower.includes('plate'))) {
    return 'القطر المختار يضمن بقاء صفيحة عظمية لا تقل عن 1.5 مم دهليزياً ولسانياً لمنع تراجع العظم.';
  }
  if (lower.includes('length') && lower.includes('bicortical')) {
    return 'طول الزرعة يوفر مساحة سطحية كافية وتوزيعاً متوازناً لقوى المضغ الرأسية.';
  }
  if (lower.includes('tapered') || lower.includes('stability')) {
    return 'التصميم المخروطي يوفر انضغاطاً عظمياً مثالياً وثباتاً أولياً فائقاً في هذا النمط العظمي.';
  }
  if (lower.includes('platform')) {
    return 'تبديل المنصة (Platform Switching) يحافظ على القمة العظمية والأنسجة الرخوة المحيطة.';
  }
  return text;
}

function translateLabInstruction(inst: string, isAr: boolean): string {
  if (!isAr) return inst;
  const lower = inst.toLowerCase();
  if (lower.includes('screw') && (lower.includes('access') || lower.includes('lingual') || lower.includes('occlusal') || lower.includes('retained'))) {
    return 'توجيه مخرج مسمار التثبيت نحو السطح الحنكي/اللساني أو الإطباقي وتجنب الواجهة التجميلية.';
  }
  if (lower.includes('ti-base') || lower.includes('bonding')) {
    return 'استخدام قاعدة تيتانيوم (Ti-Base) ملائمة مع الربط الكيميائي المحكم داخل المعمل.';
  }
  if (lower.includes('emergence') || lower.includes('contour')) {
    return 'تشكيل بروفايل البزوغ (Emergence Profile) بانسيابية طبيعية لدعم الحليمات اللثوية وتفادي انحصار الطعام.';
  }
  if (lower.includes('passive') || lower.includes('fit')) {
    return 'التحقق الدقيق من التوافق السلبي الخالي من الإجهادات الميكانيكية (Passive Fit).';
  }
  if (lower.includes('occlusal') || lower.includes('contact')) {
    return 'تصميم إطباقي خفيف يراعي حركية المفصل وغياب رباط السن الداعم (Light Centric Occlusion).';
  }
  return inst;
}

function translateRiskItem(risk: string, isAr: boolean): string {
  if (!isAr) return risk;
  const lower = risk.toLowerCase();
  if (lower.includes('smoking')) return 'التدخين: زيادة خطر التهاب محيط الزرعة (Peri-implantitis) وبطء الاندماج العظمي.';
  if (lower.includes('diabetes')) return 'السكري: احتمالية بطء التئام الأنسجة الرخوة وضعف استجابة التجدد العظمي.';
  if (lower.includes('bruxism') || lower.includes('parafunction')) return 'الجز على الأسنان (Bruxism): أحمال إطباقية مفرطة تهدد بارتخاء أو كسر مسمار التركيبة.';
  if (lower.includes('bone') && (lower.includes('width') || lower.includes('plate') || lower.includes('buccal'))) return 'رقة الصفيحة العظمية الخارجية: خطر انكشاف لولب الزرعة وانحسار اللثة التجميلية.';
  if (lower.includes('sinus')) return 'قرب قاع الجيب الفكي: خطر اختراق الغشاء المخاطي ما لم يُنفذ رفع الجيب بدقة.';
  if (lower.includes('nerve') || lower.includes('ian')) return 'قرب العصب السنخي السفلي: خطر تنميل الشفة في حال تجاوز هوامش الأمان (≥ 2 مم).';
  return risk;
}

function translateMitigationItem(mit: string, isAr: boolean): string {
  if (!isAr) return mit;
  const lower = mit.toLowerCase();
  if (lower.includes('guide') || lower.includes('surgical guide')) return 'استخدام دليل جراحي رقمي مجسم (Surgical Guide) لضمان زاوية الغرس وعمق الأمان بدقة عالية.';
  if (lower.includes('night guard') || lower.includes('splint')) return 'تصنيع واقٍ ليلي واقٍ من الصك (Occlusal Splint) لحماية الزرعة من الإجهاد الميكانيكي المفرط.';
  if (lower.includes('torque') && lower.includes('wrench')) return 'معايرة عزم الربط بمفتاح العزم الطبي وإعادة الشد بعد 10 دقائق لتفادي ارتخاء المسمار.';
  if (lower.includes('chlorhexidine') || lower.includes('antibiotic')) return 'استخدام غسول الفم كلورهيكسيدين 0.12% والتغطية الوقائية بالمضادات الحيوية لتقليل البكتيريا.';
  if (lower.includes('gbr') || lower.includes('membrane')) return 'تطبيق التطعيم العظمي الموجه (GBR) مع غشاء كولاجيني لحماية وتعزيز الصفيحة الخارجية.';
  return mit;
}

function translateDrillInfo(drill: string, notes: string, isAr: boolean): { drill: string; notes: string } {
  if (!isAr) return { drill, notes };
  let d = drill;
  let n = notes;
  const dLower = drill.toLowerCase();
  const nLower = notes.toLowerCase();

  if (dLower.includes('round') || dLower.includes('lance') || dLower.includes('pilot')) {
    d = 'دريل التوجيه المبدئي (Pilot Drill)';
  } else if (dLower.includes('twist') || dLower.includes('drill')) {
    d = `دريل توسيع عظمي (${drill})`;
  } else if (dLower.includes('tap')) {
    d = 'دريل تسنين العظم (Bone Tap)';
  } else if (dLower.includes('countersink')) {
    d = 'دريل توسيع العنق (Countersink)';
  }

  if (nLower.includes('trajectory') || nLower.includes('depth')) {
    n = 'تحديد المسار المحوري وعمق العمل الجراحي تحت تبريد مستمر.';
  } else if (nLower.includes('full depth') || nLower.includes('saline')) {
    n = 'تجهيز لكامل العمق المطلوب بتبريد ملحي معتاد بدون ضغط مفرط.';
  } else if (nLower.includes('undersized') || nLower.includes('condensation')) {
    n = 'تجهيز نفق حفر أصغر من قطر الزرعة لتكثيف العظم وتحقيق ثبات أولي عالي.';
  } else if (nLower.includes('tap') || nLower.includes('compression')) {
    n = 'تسنين يدوي خفيف لتفادي الإجهاد الضاغط المفرط على قشرة العظم.';
  }

  return { drill: d, notes: n };
}

export interface ImplantPlanData {
  patientName?: string;
  patientAge?: number;
  fdiPosition?: number;
  chiefComplaint?: string;
  aiEngineSource?: string;
  generatedAt?: string;
  siteAssessment: {
    fdiPosition: number;
    region: string;
    boneQuality: string;
    boneQuantity: string;
    boneDimensions: {
      widthMm: number;
      heightMm: number;
    };
    augmentationNeeded: boolean;
    augmentationType: string;
    augmentationDetails: string;
  };
  fixtureSelection: {
    recommendedBrand: string;
    system: string;
    diameterMm: number;
    lengthMm: number;
    platformType: string;
    connection: string;
    surface: string;
    shape: string;
    rationale: string[];
    alternatives: string[];
  };
  surgicalProtocol: {
    flapDesign: string;
    drillingSequence: {
      step: number;
      drill: string;
      diameter: string;
      speedRpm: string;
      irrigation: string;
      notes: string;
    }[];
    targetInsertionTorqueNcm: string;
    targetISQ: string;
    sinusLiftRequired: boolean;
    sinusProtocol: string;
    gbrProtocol: string;
    healingDuration: string;
  };
  loadingProtocol: {
    type: string;
    timingWeeks: string;
    prerequisites: string[];
    occlusalConsiderations: string[];
  };
  prostheticPlan: {
    restorationType: string;
    retentionType: string;
    abutmentType: string;
    abutmentCuffHeightMm: number;
    abutmentAngulation: number;
    crownMaterial: string;
    screwTorqueNcm: number;
    crownToImplantRatio: number;
    cantileverRisk: string;
    laboratoryInstructions: string[];
  };
  riskAssessment: {
    overallRisk: string;
    riskScore: number;
    clearanceStatus: string;
    keyRisks: string[];
    mitigationStrategies: string[];
  };
  evidenceCitations: {
    author: string;
    year: string;
    title: string;
    journal: string;
    clinicalTakeaway: string;
  }[];
}

export interface ImplantPlanBuilderProps {
  plan?: ImplantPlanData;
  isLoading?: boolean;
}

export function ImplantPlanBuilder({ plan, isLoading = false }: ImplantPlanBuilderProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'fixture' | 'surgical' | 'prosthetics' | 'risk' | 'evidence'>('overview');
  const [copied, setCopied] = useState(false);
  const { isAr } = useLanguage();

  if (isLoading) {
    return (
      <Card className="border-slate-200 shadow-md">
        <CardContent className="p-12 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <div className="text-center">
            <h3 className="text-base font-bold text-slate-900">
              {isAr ? 'جاري تخليق الخطة الجراحية للزراعة بالذكاء الاصطناعي' : 'Synthesizing Surgical Implant Plan'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              {isAr
                ? 'حساب بروتوكولات كثافة العظم Misch D1-D4، هوامش أقطار الزرعات، عزم الثبات الأولي ISQ، وعزم ربط المسامير التعويضية...'
                : 'Calculating Misch bone density protocols, fixture diameter margins, primary stability ISQ, and prosthetic screw torques...'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!plan) {
    return (
      <Card className="border-dashed border-slate-300">
        <CardContent className="p-12 text-center text-slate-500">
          <Drill className="w-10 h-10 mx-auto text-slate-400 mb-2" />
          <p className="text-sm font-medium">
            {isAr ? 'لم يتم توليد خطة علاجية لزراعة الأسنان بعد.' : 'No implant treatment plan generated yet.'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {isAr
              ? 'اختر موضع السن من شارت FDI وأدخل قياسات العظم ثم اضغط "توليد الخطة الجراحية بالذكاء الاصطناعي".'
              : 'Select an FDI site, enter bone measurements, and click "Generate Surgical Plan".'
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleCopyPlan = () => {
    const summary = `
ODONTO AI - DENTAL IMPLANT SURGICAL & PROSTHETIC PLAN
Patient: ${plan.patientName || 'Patient'} | Site: FDI #${plan.siteAssessment.fdiPosition}
------------------------------------------------------------
RECOMMENDED FIXTURE:
- Brand & System: ${plan.fixtureSelection.recommendedBrand} - ${plan.fixtureSelection.system}
- Dimensions: Ø ${plan.fixtureSelection.diameterMm} mm x ${plan.fixtureSelection.lengthMm} mm
- Connection: ${plan.fixtureSelection.connection} (${plan.fixtureSelection.platformType})
- Target Torque: ${plan.surgicalProtocol.targetInsertionTorqueNcm} | Target ISQ: ${plan.surgicalProtocol.targetISQ}

SURGICAL SPECIFICATIONS:
- Flap Design: ${plan.surgicalProtocol.flapDesign}
- Sinus Status: ${plan.surgicalProtocol.sinusProtocol}
- GBR / Bone Augmentation: ${plan.surgicalProtocol.gbrProtocol}
- Healing Timeline: ${plan.surgicalProtocol.healingDuration}

PROSTHETIC SPECIFICATIONS:
- Restoration: ${plan.prostheticPlan.restorationType} (${plan.prostheticPlan.retentionType})
- Abutment: ${plan.prostheticPlan.abutmentType} (Cuff: ${plan.prostheticPlan.abutmentCuffHeightMm}mm, Angulation: ${plan.prostheticPlan.abutmentAngulation}°)
- Screw Torque: ${plan.prostheticPlan.screwTorqueNcm} Ncm
- Crown-to-Implant Ratio: ${plan.prostheticPlan.crownToImplantRatio}

RISK & CLEARANCE:
- Level: ${plan.riskAssessment.overallRisk.toUpperCase()} (Score: ${plan.riskAssessment.riskScore}/100)
- Clearance: ${plan.riskAssessment.clearanceStatus}
------------------------------------------------------------
Generated by ${plan.aiEngineSource} at ${plan.generatedAt}
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const tabs = [
    { id: 'overview', label: isAr ? 'نظرة عامة' : 'Overview', icon: FileText },
    { id: 'fixture', label: isAr ? 'الزرعة والمسامير' : 'Fixture & Screws', icon: Drill },
    { id: 'surgical', label: isAr ? 'البروتوكول الجراحي' : 'Surgical Protocol', icon: Wrench },
    { id: 'prosthetics', label: isAr ? 'الخطة التعويضية' : 'Prosthetic Plan', icon: Layers },
    { id: 'risk', label: isAr ? 'تقييم المخاطر' : 'Risk & Clearance', icon: ShieldAlert },
    { id: 'evidence', label: isAr ? 'الأبحاث المحكمة' : 'Evidence Base', icon: Bookmark },
  ] as const;

  return (
    <Card className="border-slate-200 shadow-md overflow-hidden select-none" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Plan Header */}
      <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-xs">
                {isAr ? `الموضع السنخي FDI #${plan.siteAssessment.fdiPosition}` : `Site FDI #${plan.siteAssessment.fdiPosition}`}
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs font-mono">
                {plan.fixtureSelection.recommendedBrand} Ø{plan.fixtureSelection.diameterMm} x {plan.fixtureSelection.lengthMm}mm
              </Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                {isAr ? `عزم المسامير: ${plan.prostheticPlan.screwTorqueNcm} Ncm` : `Torque: ${plan.prostheticPlan.screwTorqueNcm} Ncm`}
              </Badge>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-2">
              {plan.patientName || (isAr ? 'المريض' : 'Patient')} — {isAr ? 'خطة زراعة الأسنان والجراحة المعتمدة' : 'Implant Treatment Plan'}
            </h2>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
              <span>{translateRegion(plan.siteAssessment.region, isAr)}</span>
              <span>•</span>
              <span>{isAr ? `المحرك: ${plan.aiEngineSource}` : `Engine: ${plan.aiEngineSource}`}</span>
              <span>•</span>
              <span>{plan.generatedAt}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyPlan}
              className="bg-slate-800/80 hover:bg-slate-700 text-white border-slate-700 text-xs gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (isAr ? 'تم النسخ' : 'Copy Plan') : (isAr ? 'نسخ الخطة' : 'Copy Plan')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="bg-slate-800/80 hover:bg-slate-700 text-white border-slate-700 text-xs gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              {isAr ? 'طباعة' : 'Print'}
            </Button>
          </div>
        </div>


        {/* 6-Column Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 mt-6 pt-4 border-t border-slate-800/80">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{t.label}</span>
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {isAr ? 'موضع الزرعة السنخي' : 'Target Site'}
                </span>
                <div className="text-lg font-bold text-slate-900 mt-1">
                  {isAr ? `الموضع FDI #${plan.siteAssessment.fdiPosition}` : `FDI #${plan.siteAssessment.fdiPosition}`}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {isAr ? getToothName(String(plan.siteAssessment.fdiPosition), 'ar') : plan.siteAssessment.region}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {isAr ? 'بنية وكثافة العظم' : 'Bone Architecture'}
                </span>
                <div className="text-lg font-bold text-slate-900 mt-1">
                  {translateBoneQuality(plan.siteAssessment.boneQuality, isAr)}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {isAr 
                    ? `العرض: ${plan.siteAssessment.boneDimensions.widthMm} مم | الارتفاع: ${plan.siteAssessment.boneDimensions.heightMm} مم`
                    : `Width: ${plan.siteAssessment.boneDimensions.widthMm}mm | Height: ${plan.siteAssessment.boneDimensions.heightMm}mm`
                  }
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {isAr ? 'مواصفات الزرعة' : 'Fixture Specs'}
                </span>
                <div className="text-lg font-bold text-blue-700 mt-1 font-mono">
                  {isAr 
                    ? `Ø ${plan.fixtureSelection.diameterMm} × ${plan.fixtureSelection.lengthMm} مم` 
                    : `Ø ${plan.fixtureSelection.diameterMm} x ${plan.fixtureSelection.lengthMm} mm`
                  }
                </div>
                <div className="text-xs text-slate-600 mt-0.5">{plan.fixtureSelection.recommendedBrand} {plan.fixtureSelection.system}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {isAr ? 'نوع التثبيت التعويضي' : 'Prosthetic Retention'}
                </span>
                <div className="text-lg font-bold text-emerald-700 mt-1 capitalize">
                  {translateRetention(plan.prostheticPlan.retentionType, isAr)}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {isAr 
                    ? `عزم المسمار: ${plan.prostheticPlan.screwTorqueNcm} نيوتن.سم` 
                    : `Torque: ${plan.prostheticPlan.screwTorqueNcm} Ncm`
                  }
                </div>
              </div>
            </div>

            {/* Bone Augmentation Banner */}
            <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
              plan.siteAssessment.augmentationNeeded
                ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            }`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                plan.siteAssessment.augmentationNeeded ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {plan.siteAssessment.augmentationNeeded ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              </div>
              <div>
                <div className="font-bold text-sm">
                  {plan.siteAssessment.augmentationNeeded
                    ? (isAr 
                        ? `تطعيم عظمي مطلوب: ${translateAugmentationType(plan.siteAssessment.augmentationType, isAr)}` 
                        : `Bone Augmentation Required: ${plan.siteAssessment.augmentationType.toUpperCase()}`
                      )
                    : (isAr 
                        ? 'حجم وسماكة العظم الطبيعي كافية تماماً' 
                        : 'Native Bone Volume Fully Sufficient'
                      )
                  }
                </div>
                <p className="text-xs mt-1 leading-relaxed">
                  {translateAugmentationDetails(
                    plan.siteAssessment.augmentationDetails,
                    plan.siteAssessment.augmentationType,
                    plan.siteAssessment.augmentationNeeded,
                    isAr
                  )}
                </p>
              </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Drill className="w-3.5 h-3.5 text-blue-600" />
                  {isAr ? 'أبرز معالم البروتوكول الجراحي' : 'Primary Surgical Highlights'}
                </h4>
                <ul className="text-xs space-y-1.5 text-slate-700">
                  <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">{isAr ? 'تصميم الشريحة الجراحية:' : 'Flap Approach:'}</span>
                    <span className="font-semibold">{translateFlap(plan.surgicalProtocol.flapDesign, isAr)}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">{isAr ? 'عزم الإدخال المستهدف:' : 'Target Insertion Torque:'}</span>
                    <span className="font-semibold font-mono">{plan.surgicalProtocol.targetInsertionTorqueNcm}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">{isAr ? 'الثبات الأولي (مقياس ISQ):' : 'Primary Stability ISQ:'}</span>
                    <span className="font-semibold font-mono">{plan.surgicalProtocol.targetISQ}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">{isAr ? 'مدة الالتئام والاندماج المتوقعة:' : 'Expected Healing:'}</span>
                    <span className="font-semibold">{translateHealing(plan.surgicalProtocol.healingDuration, isAr)}</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal-600" />
                  {isAr ? 'المواصفات التعويضية والتركيبات' : 'Prosthetic Specifications'}
                </h4>
                <ul className="text-xs space-y-1.5 text-slate-700">
                  <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">{isAr ? 'التركيبة النهائية:' : 'Superstructure:'}</span>
                    <span className="font-semibold">{translateRestoration(plan.prostheticPlan.restorationType, isAr)}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">{isAr ? 'نوع الدعامة والوصلة:' : 'Abutment Connection:'}</span>
                    <span className="font-semibold truncate max-w-[200px]">{translateAbutment(plan.prostheticPlan.abutmentType, isAr)}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">{isAr ? 'نسبة التاج إلى الزرعة (C/I):' : 'Crown-to-Implant Ratio:'}</span>
                    <span className="font-semibold font-mono">{plan.prostheticPlan.crownToImplantRatio}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">{isAr ? 'عزم ربط مسمار التركيبة:' : 'Restorative Screw Torque:'}</span>
                    <span className="font-semibold text-blue-700 font-mono">{plan.prostheticPlan.screwTorqueNcm} {isAr ? 'نيوتن.سم' : 'Ncm'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FIXTURE & SCREWS */}
        {activeTab === 'fixture' && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <Badge className="bg-blue-100 text-blue-800 border-none font-bold text-xs">
                    {isAr ? 'التوصية الجراحية الأولى' : 'Primary Recommendation'}
                  </Badge>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {plan.fixtureSelection.recommendedBrand} {plan.fixtureSelection.system}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {plan.fixtureSelection.connection} • {plan.fixtureSelection.platformType}
                  </p>
                </div>
                <div className="text-start sm:text-right sm:self-auto">
                  <div className="text-2xl font-black text-blue-700 font-mono">
                    Ø {plan.fixtureSelection.diameterMm} x {plan.fixtureSelection.lengthMm} mm
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {isAr ? 'تصميم تبديل المنصة (Platform Switched)' : 'Platform Switched'}
                  </span>
                </div>
              </div>

              {/* Rationale Bullet Points */}
              <div className="mt-4 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isAr ? 'مسوغات الاختيار الإكلينيكي والبيوميكانيكي:' : 'Clinical Selection Rationale:'}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  {plan.fixtureSelection.rationale.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{translateRationale(r, isAr)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Screws & Torque Specification */}
              <div className="mt-5 p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-blue-700" />
                    {isAr ? 'مواصفات عزم ربط مسمار التركيبة' : 'Prosthetic Screw Torque Specification'}
                  </div>
                  <p className="text-xs text-blue-800">
                    {isAr 
                      ? `يتم الربط بعزم معاير بقيمة ${plan.prostheticPlan.screwTorqueNcm} نيوتن.سم باستخدام مفتاح العزم الطبي. يُعاد الربط بعد 10 دقائق لتفادي ارتخاء المسمار.`
                      : `Tighten to calibrated ${plan.prostheticPlan.screwTorqueNcm} Ncm with torque wrench. Retorque after 10-minute settling interval.`
                    }
                  </p>
                </div>
                <Badge className="bg-blue-600 text-white text-sm px-3 py-1 font-mono font-bold self-start sm:self-auto">
                  {plan.prostheticPlan.screwTorqueNcm} {isAr ? 'نيوتن.سم' : 'Ncm'}
                </Badge>
              </div>
            </div>

            {/* Compatible Alternatives */}
            {plan.fixtureSelection.alternatives.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {isAr ? 'الأنظمة البديلة المتوافقة مع أبعاد العظم' : 'Compatible Alternative Systems'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {plan.fixtureSelection.alternatives.map((alt, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{alt}</span>
                      <Badge variant="outline" className="text-[10px] text-slate-500">
                        {isAr ? `بديل رقم ${idx + 1}` : `Alternative #${idx + 1}`}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SURGICAL PROTOCOL */}
        {activeTab === 'surgical' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">{isAr ? 'تصميم الشريحة:' : 'Flap Design:'}</span>
                <Badge className="bg-white text-slate-800 border-slate-200 font-bold">
                  {translateFlap(plan.surgicalProtocol.flapDesign, isAr)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">{isAr ? 'عزم الإدخال المستهدف:' : 'Target Torque:'}</span>
                <Badge className="bg-blue-100 text-blue-800 border-none font-bold font-mono">{plan.surgicalProtocol.targetInsertionTorqueNcm}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">{isAr ? 'الثبات الأولي (ISQ):' : 'Target ISQ:'}</span>
                <Badge className="bg-teal-100 text-teal-800 border-none font-bold font-mono">{plan.surgicalProtocol.targetISQ}</Badge>
              </div>
            </div>

            {/* Drilling Sequence Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Drill className="w-3.5 h-3.5 text-blue-600" />
                {isAr ? 'تسلسل خطوات الحفر والتجهيز العظمي' : 'Step-by-Step Drilling Sequence'}
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-start text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5 sm:p-3 w-12 text-center">{isAr ? 'الخطوة' : 'Step'}</th>
                      <th className="p-2.5 sm:p-3">{isAr ? 'نوع الدريل (Drill)' : 'Drill Type'}</th>
                      <th className="p-2.5 sm:p-3">{isAr ? 'القطر' : 'Diameter'}</th>
                      <th className="p-2.5 sm:p-3">{isAr ? 'السرعة (RPM)' : 'Speed (RPM)'}</th>
                      <th className="p-2.5 sm:p-3 hidden sm:table-cell">{isAr ? 'التبريد' : 'Irrigation'}</th>
                      <th className="p-2.5 sm:p-3">{isAr ? 'التعليمات الإكلينيكية والملاحظات' : 'Clinical Instructions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {plan.surgicalProtocol.drillingSequence.map((step) => {
                      const dInfo = translateDrillInfo(step.drill, step.notes, isAr);
                      return (
                        <tr key={step.step} className="hover:bg-slate-50/60">
                          <td className="p-2.5 sm:p-3 font-mono font-bold text-center text-blue-600">
                            {step.step}
                          </td>
                          <td className="p-2.5 sm:p-3 font-semibold text-slate-800">{dInfo.drill}</td>
                          <td className="p-2.5 sm:p-3 font-mono text-slate-600">{step.diameter}</td>
                          <td className="p-2.5 sm:p-3 font-mono text-teal-700 font-semibold">{step.speedRpm}</td>
                          <td className="p-2.5 sm:p-3 text-slate-500 hidden sm:table-cell">
                            {isAr ? 'تبريد ملحي مستمر' : step.irrigation}
                          </td>
                          <td className="p-2.5 sm:p-3 text-slate-600">{dInfo.notes}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* GBR & Sinus Protocols */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {isAr ? 'بروتوكول التعامل مع الجيب الفكي (Sinus)' : 'Sinus Protocol'}
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {isAr 
                    ? (plan.surgicalProtocol.sinusLiftRequired
                        ? 'يلزم إجراء رفع لقاع الجيب الفكي لتعويض الارتفاع المتاح وإضافة طعم عظمي متوافق حيوياً لدعم ثبات واستقرار قمة الزرعة.'
                        : 'غير مطلوب (الارتفاع المتاح تحت الجيب كافٍ تماماً لاستيعاب طول الزرعة بأمان).'
                      )
                    : plan.surgicalProtocol.sinusProtocol
                  }
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {isAr ? 'بروتوكول التطعيم العظمي الموجه (GBR)' : 'GBR & Grafting Protocol'}
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {isAr
                    ? (plan.siteAssessment.augmentationNeeded
                        ? 'تطعيم عظمي موجه (GBR) بطعم بطيء الامتصاص وغشاء كولاجيني لحماية الصفيحة الدهليزية الخارجية وضمان سماكة ≥ 1.5 مم.'
                        : 'تطعيم كنتوري موضعي إذا كانت الصفيحة الخارجية أقل من 1.5 مم، مع سلامة الصفيحة الدهليزية الطبيعية.'
                      )
                    : plan.surgicalProtocol.gbrProtocol
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROSTHETIC PLAN */}
        {activeTab === 'prosthetics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {isAr ? 'نوع التركيبة النهائية' : 'Restoration Type'}
                </span>
                <div className="text-base font-bold text-slate-900 mt-1">
                  {translateRestoration(plan.prostheticPlan.restorationType, isAr)}
                </div>
                <Badge className="mt-2 bg-blue-100 text-blue-800 border-none font-semibold text-[10px] capitalize">
                  {translateRetention(plan.prostheticPlan.retentionType, isAr)}
                </Badge>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {isAr ? 'مواصفات الدعامة (Abutment)' : 'Abutment Selection'}
                </span>
                <div className="text-base font-bold text-slate-900 mt-1">
                  {translateAbutment(plan.prostheticPlan.abutmentType, isAr)}
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {isAr
                    ? `ارتفاع الطوق اللثوي: ${plan.prostheticPlan.abutmentCuffHeightMm} مم | زاوية الميل: ${plan.prostheticPlan.abutmentAngulation}°`
                    : `Cuff: ${plan.prostheticPlan.abutmentCuffHeightMm}mm | Angulation: ${plan.prostheticPlan.abutmentAngulation}°`
                  }
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {isAr ? 'الذراع البيوميكانيكي (C/I Ratio)' : 'Biomechanical Lever (C/I)'}
                </span>
                <div className="text-base font-bold text-emerald-700 mt-1 font-mono">
                  {isAr ? `النسبة: ${plan.prostheticPlan.crownToImplantRatio}` : `Ratio: ${plan.prostheticPlan.crownToImplantRatio}`}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {isAr 
                    ? (plan.prostheticPlan.crownToImplantRatio < 1.0 
                        ? 'نسبة مثالية ملائمة لتوزيع القوى الإطباقية بدون إجهاد رافعة.' 
                        : 'نسبة مقبولة تتطلب إطباقاً متوازناً وتفادي أي امتداد كابولي (Cantilever).'
                      )
                    : plan.prostheticPlan.cantileverRisk
                  }
                </p>
              </div>
            </div>

            {/* Laboratory Instructions */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                {isAr ? 'تعليمات التصنيع لمعمل تركيبات الأسنان' : 'Dental Laboratory Fabrication Instructions'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {plan.prostheticPlan.laboratoryInstructions.map((inst, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-mono font-bold text-blue-600 shrink-0">{i + 1}.</span>
                    <span>{translateLabInstruction(inst, isAr)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 5: RISK & CLEARANCE */}
        {activeTab === 'risk' && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {isAr ? 'قرار الاعتماد الجراحي وخلو الموانع' : 'Surgical Clearance Verdict'}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {translateClearance(plan.riskAssessment.clearanceStatus, isAr)}
                </h3>
              </div>
              <div className="text-start sm:text-right">
                <Badge className={`text-sm px-3 py-1 font-bold ${
                  plan.riskAssessment.overallRisk === 'low'
                    ? 'bg-emerald-100 text-emerald-800'
                    : plan.riskAssessment.overallRisk === 'moderate'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {translateRiskLevel(plan.riskAssessment.overallRisk, isAr)} ({plan.riskAssessment.riskScore}/100)
                </Badge>
              </div>
            </div>

            {/* Key Risks */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {isAr ? 'المخاطر الإكلينيكية والتشريحية المرصودة:' : 'Identified Clinical Risks:'}
              </h4>
              <div className="space-y-2">
                {plan.riskAssessment.keyRisks.map((k, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg border border-rose-100 bg-rose-50/50 text-xs text-rose-950">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{translateRiskItem(k, isAr)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mitigation Strategies */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {isAr ? 'قائمة تدابير الأمان والوقاية البيوميكانيكية:' : 'Mitigation & Safety Checklist:'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {plan.riskAssessment.mitigationStrategies.map((m, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{translateMitigationItem(m, isAr)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: EVIDENCE BASE */}
        {activeTab === 'evidence' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              {isAr
                ? 'أبرز الأبحاث والدراسات المحكمة في طب زراعة الأسنان الداعمة للقرار الجراحي والتعويضي لهذه الحالة:'
                : 'Key peer-reviewed implantology literature supporting this patient’s surgical and restorative design:'
              }
            </p>
            <div className="grid grid-cols-1 gap-3">
              {plan.evidenceCitations.map((c, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{c.author} ({c.year})</span>
                    <Badge variant="outline" className="text-[10px] text-slate-500">{c.journal}</Badge>
                  </div>
                  <div className="text-xs font-semibold text-blue-700 italic">"{c.title}"</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800 font-semibold">
                      {isAr ? 'الخلاصة الإكلينيكية المعتمدة: ' : 'Clinical Takeaway: '}
                    </strong>
                    {c.clinicalTakeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
