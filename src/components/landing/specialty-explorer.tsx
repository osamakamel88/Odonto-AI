"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck, 
  Layers, 
  Ruler, 
  Drill, 
  Compass, 
  Stethoscope, 
  Anchor,
  BookOpen,
  Check
} from 'lucide-react';

export interface SpecialtyData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: any;
  leadParagraph: string;
  clinicalCapabilities: {
    title: string;
    description: string;
    metric?: string;
  }[];
  biomechanicalHighlights: string[];
  evidenceCitations: string[];
  ctaText: string;
  ctaHref: string;
}

export const SPECIALTIES: SpecialtyData[] = [
  {
    id: 'surgical',
    badge: 'Maxillofacial & Orthognathic Surgery',
    title: 'Surgical Orthodontics',
    subtitle: 'Decompensation, Staging & Fixation Coordination',
    icon: Stethoscope,
    leadParagraph: 'Designed in collaboration with oral and maxillofacial surgeons. Odonto AI automates multi-plane skeletal decompensation, surgical splint coordination, and rapid alignment sequencing for severe Class II, Class III, and craniofacial asymmetries.',
    clinicalCapabilities: [
      {
        title: '3-Plane Skeletal Trajectory Modeling',
        description: 'Simulate precise Le Fort I (advancement, impaction, downgrafting) and BSSO (setback, advancement) vectors with soft tissue profile prediction.',
        metric: 'Le Fort I & BSSO Vectors'
      },
      {
        title: 'Deterministic Decompensation Targets',
        description: 'Computes exact incisor torque adjustments (IMPA to 90° ± 3°, U1-SN to 102° ± 2°) to eliminate dentoalveolar compensations before surgical repositioning.',
        metric: 'IMPA / U1-NA Objectives'
      },
      {
        title: 'Surgery-First Protocol (SFA)',
        description: 'Harnesses the Regional Acceleratory Phenomenon (RAP) for accelerated post-surgical tooth movement (4–6x velocity) in non-crowded skeletal discrepancies.',
        metric: 'RAP Kinetic Window'
      },
      {
        title: 'Inferior Alveolar Nerve Safety Boundary',
        description: 'Automated 3D CBCT safety clearance from osteotomy cuts to the mandibular canal, preventing neurosensory paresthesia of the inferior alveolar nerve.',
        metric: '≥ 2.0mm Safety Clearance'
      }
    ],
    biomechanicalHighlights: [
      'Simultaneous transverse coordination and arch width matching prior to surgical splint fabrication',
      'Rigid stabilization staging (0.019 x 0.025 Stainless Steel archwires with soldered surgical hooks)',
      'Management of the curve of Spee: intentional leveling vs surgical step osteotomy'
    ],
    evidenceCitations: [
      'Proffit WR, et al. Contemporary Treatment of Dentofacial Deformity. Mosby; 2003.',
      'Baek SH, et al. Surgery-first approach in skeletal Class III malocclusion. Angle Orthod. 2010.'
    ],
    ctaText: 'Plan Orthognathic Case in Studio',
    ctaHref: '/plans/generate'
  },
  {
    id: 'aligners',
    badge: 'Clear Aligner Biomechanics',
    title: 'Digital Aligner Therapy',
    subtitle: 'Velocity Control, Attachment Physics & Staging',
    icon: Sparkles,
    leadParagraph: 'Overcome the biological limitations of commercial black-box aligner setups. Odonto AI evaluates root surface area, bone boundary constraints, and attachment geometry to guarantee predictable clinical tracking without mid-course corrections.',
    clinicalCapabilities: [
      {
        title: 'Staged Displacement Velocity Limiters',
        description: 'Strict biological limits capped at 0.20mm linear translation and 2.0° rotation per aligner stage prevent tracking failure and periodontal dehiscence.',
        metric: '0.20mm / 2.0° Per Stage'
      },
      {
        title: 'Physics-Based Attachment Geometry',
        description: 'Generates active surface angles (ellipsoidal, beveled, optimized root control) calibrated to root surface area and moment-to-force ratios (Mc/Mf).',
        metric: 'Moment-to-Force Ratios'
      },
      {
        title: 'Dynamic IPR & Expansion Sequencing',
        description: 'Coordinates transverse skeletal expansion before interproximal enamel reduction, preserving maximum biological enamel and preventing Bolton discrepancies.',
        metric: 'Bolton Ratio Calibrated'
      },
      {
        title: 'Vertical Deep Bite & Open Bite Staging',
        description: 'Integrates automated anterior bite turbos, posterior intrusion anchors, and staged vertical elastics to correct overbite predictably.',
        metric: 'Gnathological Curve Staging'
      }
    ],
    biomechanicalHighlights: [
      'Eliminates tracking failure in difficult premolar rotations and canine root uprighting',
      'Generates patient compliance wear schedules calibrated to periodontal bone level',
      'Objective non-extraction expansion vs premolar extraction decision algorithm'
    ],
    evidenceCitations: [
      'Kravitz ND, et al. How well do clear aligners work? A prospective clinical study. AJO-DO. 2009.',
      'Hahn W, et al. Force generation of clear aligners in rotational movements. J Orofac Orthop. 2010.'
    ],
    ctaText: 'Generate Clear Aligner Plan',
    ctaHref: '/plans/generate'
  },
  {
    id: 'fixed',
    badge: 'Straight-Wire & Self-Ligating',
    title: 'Comprehensive Fixed Mechanics',
    subtitle: 'Prescription Modeling, Archwires & Space Closure',
    icon: Layers,
    leadParagraph: 'Built for master clinicians utilizing MBT, Roth, Damon, or custom bracket prescriptions. Odonto AI optimizes archwire sequences, friction mechanics, extraction space closure, and periodontal safety margins.',
    clinicalCapabilities: [
      {
        title: 'Prescription Torque & Tip Modeling',
        description: 'Compares torque, tip, and in-out specifications across .022" and .018" slot systems (MBT, Roth, Damon Standard/High/Low Torque) to complement facial biotype.',
        metric: '.022" & .018" Prescriptions'
      },
      {
        title: 'Metallurgical Wire Progression Engine',
        description: 'Calculates transition timing from thermal CuNiTi leveling to Beta-Titanium (TMA) working arches to Stainless Steel finishing with exact force-deflection curves.',
        metric: 'CuNiTi → TMA → SS'
      },
      {
        title: 'Extraction Space Closure Mechanics',
        description: 'Calculates sliding mechanics vs closing loop mechanics, anchor loss budgeting (minimum, moderate, maximum), and anterior torque preservation.',
        metric: 'Anchor Budget Calculation'
      },
      {
        title: 'Root Resorption Risk Index (RRRI)',
        description: 'Predictive algorithm analyzing apex morphology (pipette, blunt, normal), heavy force duration, and travel distance to ensure light, continuous force levels.',
        metric: 'Apex Morphology Screening'
      }
    ],
    biomechanicalHighlights: [
      'Standardized bracket height placement guides customized to marginal ridge alignment',
      'Intermaxillary elastic vectors (Class II, Class III, vertical, triangular, crossbite) with force oz',
      'Passive vs active self-ligation friction analysis for periodontally compromised patients'
    ],
    evidenceCitations: [
      'McLaughlin RP, Bennett JC, Trevisi HJ. Systemized Orthodontic Treatment Mechanics. Mosby; 2001.',
      'Bishara SE. Textbook of Orthodontics. Saunders; 2001.'
    ],
    ctaText: 'Explore Fixed Mechanics Studio',
    ctaHref: '/plans/generate'
  },
  {
    id: 'interceptive',
    badge: 'Early Mixed Dentition (Phase I)',
    title: 'Interceptive Orthodontics',
    subtitle: 'Growth Staging, Space Supervision & Skeletal Expansion',
    icon: Compass,
    leadParagraph: 'Identify eruptive anomalies early and redirect skeletal growth during peak velocity. Odonto AI evaluates Cervical Vertebral Maturation (CVM), skeletal expansion, and serial extraction protocols.',
    clinicalCapabilities: [
      {
        title: 'CVM Skeletal Maturation Staging',
        description: 'Evaluates C2, C3, and C4 vertebral morphology (CS1 to CS6) on lateral cephalometrics to pinpoint the exact adolescent mandibular growth spurt.',
        metric: 'CS1–CS6 Peak Growth Timing'
      },
      {
        title: 'Skeletal Palatal Expansion (RPE / MARPE)',
        description: 'Assesses midpalatal suture obliteration stage to recommend tooth-borne Hyrax vs bone-borne micro-implant expanders (MSE).',
        metric: 'Suture Resistance Scoring'
      },
      {
        title: 'Serial Extraction Protocol Guidance',
        description: 'Evidence-based guidance for severe tooth-size/arch-length discrepancies: staged extraction of primary canines → first primary molars → first premolars.',
        metric: 'Dewel & Tweed Protocols'
      },
      {
        title: 'Skeletal Class III Protraction Protocols',
        description: 'Determines optimal orthopedic force vectors for reverse-pull facemasks (Petit) combined with alternate rapid expansion and constriction (Alt-RAMEC).',
        metric: 'Sutural Release Mechanics'
      }
    ],
    biomechanicalHighlights: [
      'Early canine impaction prevention through timely primary canine extraction',
      'Custom habit-breaker appliance design for chronic thumb sucking and tongue thrusting',
      'Space supervision and leeway space preservation utilizing lower lingual holding arches (LLHA)'
    ],
    evidenceCitations: [
      'Baccetti T, Franchi L, McNamara JA. The Cervical Vertebral Maturation (CVM) method. Semin Orthod. 2005.',
      'McNamara JA. Maxillary transverse deficiency. AJO-DO. 2000.'
    ],
    ctaText: 'Assess Mixed Dentition Case',
    ctaHref: '/plans/generate'
  },
  {
    id: 'tads',
    badge: 'Temporary Anchorage Devices (TADs)',
    title: 'Skeletal Anchorage & Miniscrews',
    subtitle: 'Extra-Alveolar Screws, Intrusion & Molar Distalization',
    icon: Anchor,
    leadParagraph: 'Attain true absolute anchorage with zero reciprocal tooth loss. Odonto AI calculates extra-alveolar insertion trajectories at the infrazygomatic crest (IZC) and buccal shelf for uncompromised sagittal and vertical movement.',
    clinicalCapabilities: [
      {
        title: 'Extra-Alveolar Placement Site Planning',
        description: 'Calculates cortical bone depth and insertion angulations for 12–14mm extra-alveolar screws in the IZC and mandibular buccal shelf.',
        metric: 'IZC & Buccal Shelf Sites'
      },
      {
        title: 'True Molar Intrusion Vectors',
        description: 'Calculates force vectors and center of resistance for true maxillary and mandibular molar intrusion, correcting severe anterior open bites without surgery.',
        metric: '3–4mm True Intrusion'
      },
      {
        title: 'Total Arch En-Masse Distalization',
        description: 'Non-extraction correction of complete Class II and Class III malocclusions via full-arch sagittal distalization against skeletal anchorage.',
        metric: '6–8mm Retraction Potential'
      },
      {
        title: 'MARPE / MSE Bicortical Anchorage',
        description: 'Models 4-screw bicortical engagement through the palatal bone and nasal floor for parallel skeletal midpalatal suture split in mature patients.',
        metric: 'Bicortical Engagement Index'
      }
    ],
    biomechanicalHighlights: [
      'Eliminates patient compliance dependency in adult non-extraction correction',
      'Calibrated insertion torque thresholds (8–12 Ncm) to ensure primary stability without bone necrosis',
      'Anatomical hazard boundary verification avoiding dental roots and maxillary sinus lining'
    ],
    evidenceCitations: [
      'Chang CH, Lin JS, Roberts WE. Extra-alveolar bone screws for skeletal anchorage. Semin Orthod. 2018.',
      'Park HS, et al. Micro-implant anchorage for treatment of severe gummy smile. AJO-DO. 2001.'
    ],
    ctaText: 'Compute Anchorage Requirements',
    ctaHref: '/plans/generate'
  },
  {
    id: 'implants',
    badge: 'Implantology & Interdisciplinary Care',
    title: 'Dental Implant Planning Studio',
    subtitle: 'Fixture Sizing, Misch Density & Screw Torque Specifications',
    icon: Drill,
    leadParagraph: 'The ultimate bridge between orthodontics and implant restorative dentistry. Plan post-orthodontic edentulous spaces with computerized fixture sizing, Misch bone density drilling sequences, sinus lift protocols, and calibrated screw torques.',
    clinicalCapabilities: [
      {
        title: 'Deterministic Fixture Sizing Algorithm',
        description: 'Analyzes 3D CBCT bone dimensions to recommend diameter and length honoring the 1.5mm buccal plate and 2.0mm IAN rules.',
        metric: '14 Major Implant Catalogs'
      },
      {
        title: 'Misch Bone Density (D1–D4) Engine',
        description: 'Translates Hounsfield Units into custom drilling sequences, tap requirements, and expected ISQ primary stability values.',
        metric: 'HU-Calibrated Drill RPM'
      },
      {
        title: 'Subantral Sinus Lift Calculator',
        description: 'Automatically determines Crestal OSFE (Summers) vs Lateral Window technique based on residual bone height.',
        metric: '< 4mm Staged / 4–8mm Simultaneous'
      },
      {
        title: 'Prosthetic Screw & Torque Engine',
        description: 'Calculates calibrated manufacturer torque (25–35 Ncm), abutment cuff height, and Crown-to-Implant (C/I) lever ratios.',
        metric: 'Screw vs Cement Matrix'
      }
    ],
    biomechanicalHighlights: [
      'Elian socket classification for immediate post-extraction implant placement',
      'Dual-zone grafting and custom healing abutment emergence profile guidance',
      'Medical screening for bisphosphonate MRONJ, anticoagulants, and heavy smoking'
    ],
    evidenceCitations: [
      'Misch CE. Contemporary Implant Dentistry. 3rd ed. Mosby; 2007.',
      'Buser D, et al. Modern surgical concepts for immediate implant placement. Periodontol 2000. 2017.'
    ],
    ctaText: 'Open Implant Planning Studio',
    ctaHref: '/implants'
  }
];

export const SPECIALTIES_AR: Record<string, Partial<SpecialtyData>> = {
  surgical: {
    badge: 'جراحة تقويم الفكين والوجه والجمجمة',
    title: 'جراحة تقويم الفكين (Orthognathic Surgery)',
    subtitle: 'إلغاء التعويض السني، تخطيط مراحل الجراحة وتثبيت الفكين',
    leadParagraph: 'صممت بالتعاون مع جراحي الوجه والفكين. تحسب أودونتو مسارات إلغاء التعويض السني في المستويات الثلاثة، وتنسيق أجهزة التثبيت الجراحي، وتسلسل الرصف السريع للحالات الشديدة من الصنف الثاني والثالث وعدم تناسق الوجه.',
    clinicalCapabilities: [
      {
        title: 'نمذجة مسارات حركة العظم ثلاثية الأبعاد',
        description: 'محاكاة دقيقة لقص عظم الفك العلوي Le Fort I (تقديم، غرس، تعديل ميل) وقص الفك السفلي BSSO مع التنبؤ بملامح الشفتين والوجه.',
        metric: 'متجهات Le Fort I و BSSO'
      },
      {
        title: 'أهداف إلغاء التعويض السني الحتمية',
        description: 'حساب عزم ميل القواطع بدقة (IMPA إلى 90° ± 3° و U1-SN إلى 102° ± 2°) لإزالة التعويض الطبيعي قبل إعادة تموضع الفك جراحياً.',
        metric: 'أهداف زوايا IMPA و U1-NA'
      },
      {
        title: 'بروتوكول الجراحة أولاً (SFA)',
        description: 'الاستفادة من ظاهرة تسريع حركة الأسنان (RAP) لحركة أسنان أسرع 4 إلى 6 أضعاف بعد الجراحة في الحالات التي لا تعاني من تزاحم حرج.',
        metric: 'نافذة التسريع الحيوي RAP'
      },
      {
        title: 'حماية عصب الفك السفلي (IAN Clearance)',
        description: 'فحص آلي في الأشعة المقطعية لضمان مسافة أمان ≥ 2.0 مم بين خطوط قص العظم والقناة العصبية لمنع أي تنميل دائم.',
        metric: 'مسافة أمان ≥ 2.0 مم'
      }
    ],
    biomechanicalHighlights: [
      'تنسيق عرض القوسين العلوي والسفلي معاً قبل تصنيع الجبائر الجراحية (Splints)',
      'تثبيت فكي صلب بأسلاك Stainless Steel مقاس 0.019x0.025 مع خطافات جراحية ملحومة',
      'معالجة منحنى سبي (Curve of Spee): تسوية كاملة مسبقة أو قص عظم مدرج أثناء الجراحة'
    ],
    ctaText: 'تخطيط حالة جراحة فكين في الاستوديو'
  },
  aligners: {
    badge: 'بيوميكانيكا التقويم الشفاف',
    title: 'التقويم الشفاف الرقمي (Clear Aligners)',
    subtitle: 'التحكم في سرعة الإزاحة، هندسة الأتاتشمنت ومراحل القوالب',
    leadParagraph: 'تجاوز قيود قوالب التقويم التجاري المبهمة. تقيّم أودونتو مساحة سطح الجذر، وحدود العظم القشري، وهندسة الأتاتشمنت لضمان تتبع سريري متوقع بنسبة 100% دون الحاجة لتعديلات منتصف الطريق (Refinements).',
    clinicalCapabilities: [
      {
        title: 'محددات سرعة الإزاحة البيولوجية',
        description: 'سقف حتمي صارم بمقدار 0.20 مم للإزاحة الخطية و2.0° للدوران لكل قالب لمنع فشل التتبع وانحسار اللثة.',
        metric: '0.20 مم / 2.0° لكل مرحلة'
      },
      {
        title: 'هندسة الأتاتشمنت الفيزيائية',
        description: 'توليد زوايا الأسطح الفعالة (بيضاوية، مشطوفة، للتحكم في الجذر) متوافقة مع مساحة الجذر ونسب العزم إلى القوة (Mc/Mf).',
        metric: 'نسب العزم إلى القوة'
      },
      {
        title: 'تصنيف استجابة المينا للبرد (IPR)',
        description: 'حساب دقيق لكمية البرد بين السني اللازمة بالملليمتر وتوزيعها تدريجياً عبر القوالب لمنع حساسية الأسنان وتراكم البلاك.',
        metric: 'توزيع IPR المتدرج'
      },
      {
        title: 'محاكاة استجابة العظم الحيوية',
        description: 'التحقق من بقاء مركز مقاومة الأسنان داخل العظم الإسفنجي أثناء حركات الغرس والبثق المعقدة.',
        metric: 'أمان الحيز السنخي'
      }
    ],
    biomechanicalHighlights: [
      'تسلسل مدروس: توسيع الفك أولاً، يليه فك التزاحم، ثم إغلاق المسافات بالتتابع',
      'قوى خفيفة مستمرة (50-100 جم) متناسبة مع سمك ونوع البلاستيك الحراري',
      'تنبؤ بيولوجي دقيق بمعدلات الارتداد لتحديد فترات ارتداء كل قالب بدقة'
    ],
    ctaText: 'تخطيط حالة ألاينرز في الاستوديو'
  },
  fixed: {
    badge: 'حاصرات التقويم الثابتة والميكانيكا المتدرجة',
    title: 'التقويم الثابت الشامل (Comprehensive Fixed)',
    subtitle: 'وصفات MBT و Roth و Damon وتدرج الأسلاك المعدنية',
    leadParagraph: 'إدارة متكاملة لحالات التقويم بالأجهزة الثابتة من البداية حتى الفنش. يحسب النظام نسب الاحتكاك، وعزم الانحراف لكل سلك، وجدول مطاطات الشد بين الفكين بناءً على قواعد Proffit و Tweed.',
    clinicalCapabilities: [
      {
        title: 'محاكاة وصفات البراكتس العالمية',
        description: 'اختيار عزم وميلان البراكتس (MBT, Roth, Damon) بحجم الشق 0.022" أو 0.018" بما يلائم ملامح الوجه وزاوية القواطع.',
        metric: 'وصفات MBT / Roth / Damon'
      },
      {
        title: 'تدرج تسلسل الأسلاك الحتمي',
        description: 'من أسلاك الرصف والتسوية فائقة المرونة (0.014 CuNiTi) إلى أسلاك الصلب المستطيلة (0.019x0.025 SS) لإغلاق المسافات بعزم دوران محكوم.',
        metric: 'تسلسل CuNiTi ← TMA ← SS'
      },
      {
        title: 'خوارزمية حسم قرار الخلع',
        description: 'حساب عجز محيط الفك ونسبة بولتون وزاوية القواطع السفلية لحسم قرار خلع 4 ضواحك أو التوسيع بدون خلع بدون أي تخمين.',
        metric: 'خوارزمية قرار الخلع'
      },
      {
        title: 'بروتوكولات التثبيت المزدوج',
        description: 'تصميم مثبتات سلكية ملصقة (Fixed 3-3) مع مثبتات شفافة (Essix) لحماية الحالة من الارتداد مدى الحياة.',
        metric: 'تثبيت مزدوج دائم'
      }
    ],
    biomechanicalHighlights: [
      'تطبيق قوى بيولوجية خفيفة مستمرة لتجنب ارتشاف قمم الجذور (Root Resorption)',
      'استخدام قوى إغلاق مسافات لا تتجاوز 150-200 جم بواسطة نوابض NiTi مغلقة',
      'معايرة زوايا المطاطات بين الفكين (Class II / Class III / Box) بدقة الأونصة'
    ],
    ctaText: 'تخطيط تقويم ثابت في الاستوديو'
  },
  interceptive: {
    badge: 'التقويم في مرحلة التسنين المختلط',
    title: 'التقويم الوقائي والمبكر (Interceptive Orthodontics)',
    subtitle: 'توجيه نمو الفكين وحفظ المسافات وتعديل العادات الفموية',
    leadParagraph: 'اكتشاف وعلاج مشاكل إطباق الأسنان والفكين في سن مبكرة (7-11 سنة). تمنع المنظومة تطور الحالات البسيطة إلى تشوهات هيكلية معقدة تستلزم جراحة فكين في المستقبل.',
    clinicalCapabilities: [
      {
        title: 'تحديد مرحلة نمو الفقرات العنقية (CVM)',
        description: 'تحليل شكل فقرات الرقبة C2-C4 لتحديد هل الطفل في طفرة النمو لتقديم الفك بأجهزة وظيفية مثل Twin Block.',
        metric: 'مراحل النمو CVM I–VI'
      },
      {
        title: 'تحليل تاناكا-جونستون للتسنين المختلط',
        description: 'التنبؤ بحجم الأنياب والضواحك المدفونة من قياس القواطع السفلية فقط بدون تعريض الطفل لأشعة إضافية.',
        metric: 'معادلة تاناكا-جونستون'
      },
      {
        title: 'تصميم أجهزة كسر العادات السيئة',
        description: 'بروتوكولات علاج مص الأصابع ودفع اللسان عبر أجهزة Tongue Crib و Bluegrass لمنع تكون العضة المفتوحة.',
        metric: 'حواجز اللسان ومصدات الشفاه'
      },
      {
        title: 'توسيع الفك العلوي السريع (RPE)',
        description: 'حساب عدد لفات مسمار التوسيع اليومية (0.5 مم/يوم) لفك درز منتصف الحنك وتصحيح العضة المعكوسة.',
        metric: 'بروتوكول RPE و Alt-RAMEC'
      }
    ],
    biomechanicalHighlights: [
      'الخلع التسلسلي للأسنان اللبنية في حالات التزاحم الحرج لتسهيل بزوغ الأسنان الدائمة',
      'حفظ المسافات بواسطة أجهزة Band & Loop و LLHA لمنع انزلاق الأضراس للأمام',
      'تعديل مسار الأنياب المطمورة مبكراً بخلع الناب اللبني لتفادي جراحة الكشف'
    ],
    ctaText: 'تقييم حالة تسنين مختلط للأطفال'
  },
  tads: {
    badge: 'زرعات التثبيت العظمي المؤقتة',
    title: 'المرسى الهيكلي وزرعات التقويم (TADs Miniscrews)',
    subtitle: 'المسامير خارج السنخية، غرس الأضراس والترجيع الكلي للأسنان',
    leadParagraph: 'تحقيق ثبات عظمي مطلق (Absolute Anchorage) بدون أي فقدان ارتدادي لحركة الأسنان الخلفية. تحسب أودونتو زوايا ومسارات الغرس في العظم خارج السنخي (IZC و Buccal Shelf).',
    clinicalCapabilities: [
      {
        title: 'تخطيط مواقع الغرس خارج السنخي',
        description: 'حساب سمك العظم القشري وزوايا الغرس لمسامير 12-14 مم في عظم الوجنة (IZC) ورف الفك السفلي (Buccal Shelf).',
        metric: 'مواقع IZC و Buccal Shelf'
      },
      {
        title: 'متجهات غرس الأضراس الحقيقية (Molar Intrusion)',
        description: 'حساب قوى الغرس ومراكز المقاومة لغرس الأضراس 3-4 مم وعلاج العضة المفتوحة الشديدة دون جراحة.',
        metric: 'غرس حقيقي 3-4 مم'
      },
      {
        title: 'الترجيع الكلي لكامل القوس السني (En-Masse)',
        description: 'تصحيح حالات الصنف الثاني والثالث بالكامل بدون خلع أسنان عبر ترجيع القوس بالكامل على زرعات عظمية.',
        metric: 'ترجيع 6-8 مم'
      },
      {
        title: 'المرسى ثنائي القشرة لأجهزة MARPE/MSE',
        description: 'نمذجة اختراق 4 مسامير لعظم الحنك وقاع الأنف لشق درز الحنك في المرضى البالغين بعد اكتمال النمو.',
        metric: 'تثبيت ثنائي القشرة Bicortical'
      }
    ],
    biomechanicalHighlights: [
      'إلغاء الاعتماد التام على تعاون المريض وارتداء المطاطات في تصحيح العضة',
      'معايرة عزم إدخال المسامير (8-12 Ncm) لضمان الثبات الأولي وتجنب موت العظم',
      'فحص مسافات الأمان لتجنب الاصطدام بجذور الأسنان أو بطانة الجيب الأنفي'
    ],
    ctaText: 'حساب متطلبات المرسى الهيكلي'
  },
  implants: {
    badge: 'الزراعة والتكامل بين التخصصات',
    title: 'استوديو زراعة الأسنان (Implant Planning Studio)',
    subtitle: 'حسابات كثافة العظم، رفع الجيب الأنفي، وعزم ربط البراغي',
    leadParagraph: 'تخطيط جراحي وتعويضي متكامل للزرعات السنية وفق أعلى معايير ITI SAC. تدمج المنظومة بين قياسات العظم في الأشعة المقطعية، وتحديد مواقع الأعصاب، واختيار أبعاد الزرعة المناسبة بدقة متناهية.',
    clinicalCapabilities: [
      {
        title: 'محرك كثافة العظم Misch D1-D4',
        description: 'تحديد سرعة الدريل وبروتوكول الحفر المبرد حسب وحدات هاونسفيلد لمنع احتراق العظم وضمان ثبات الزرعة.',
        metric: 'تصنيف Misch D1–D4'
      },
      {
        title: 'حماية عصب الفك السفلي (IAN Guard)',
        description: 'مسافة أمان صلبة ≥ 2.0 مم فوق القناة العصبية و1.5 مم عظم قشري دهليزي لحماية المريض وعيادتك.',
        metric: 'أمان ≥ 2.0 مم فوق العصب'
      },
      {
        title: 'حاسبة رفع الجيب الأنفي الأوتوماتيكية',
        description: 'تقييم ارتفاع العظم المتبقي لتحديد الرفع المغلق (OSFE) لو العظم ≥ 5 مم أو نافذة الرفع الجانبي المفتوح لو أقل.',
        metric: 'حاسبة Summers OSFE / Lateral'
      },
      {
        title: 'عيار عزم ربط البراغي التعويضية',
        description: 'حساب عزم الربط بدقة (25-35 Ncm) وفق توصيات الشركات الـ 14 المعتمدة لمنع تخلخل أو كسر مسامير التركيبات.',
        metric: 'عزم 25-35 Ncm'
      }
    ],
    biomechanicalHighlights: [
      'حساب نسبة طول التاج إلى الزرعة (Crown-to-Implant Ratio) لتفادي القوى العازمة الزائدة',
      'تحديد نوع الطعم العظمي والغشاء الحيوي المناسب في حالات الترقيع العظمي (GBR)',
      'اختيار نوع التثبيت (مثبت ببرغي Screw-retained مقابل مثبت بإسمنت Cement-retained)'
    ],
    ctaText: 'فتح استوديو تخطيط زراعة الأسنان'
  }
};

import { useLanguage } from '@/lib/i18n/language-context';

export function SpecialtyExplorer() {
  const [activeTab, setActiveTab] = useState<string>('surgical');
  const { lang, isAr } = useLanguage();
  const baseSpecialty = SPECIALTIES.find(s => s.id === activeTab) || SPECIALTIES[0];
  const arData = SPECIALTIES_AR[activeTab];
  const activeSpecialty = isAr && arData ? { ...baseSpecialty, ...arData } : baseSpecialty;
  const Icon = baseSpecialty.icon;

  const tabTitlesAr: Record<string, string> = {
    surgical: 'جراحة تقويم الفكين',
    aligners: 'التقويم الشفاف الرقمي',
    fixed: 'التقويم الثابت الشامل',
    interceptive: 'التقويم الوقائي والمبكر',
    tads: 'المرسى الهيكلي وزرعات TADs',
    implants: 'استوديو زراعة الأسنان'
  };

  return (
    <section id="specialties" className="py-24 sm:py-32 bg-slate-50/60 border-t border-b border-slate-200/80 relative overflow-hidden">
      {/* Subtle Light Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-100/50 via-teal-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-3.5 py-1 font-semibold rounded-full shadow-xs">
            {isAr ? 'من أطباء التقويم، لأطباء التقويم' : 'By Orthodontists, For Orthodontists'}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {isAr ? 'مصممة لكافة تخصصات تحريك الأسنان والفكين.' : 'Engineered for Every Discipline of Tooth Movement.'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'من إزالة التعويض الجراحي إلى التحكم في سرعة التقويم الشفاف وحسابات الزرعات، توفر Odonto AI ذكاءً سريرياً مبنياً على الحقائق البيولوجية.'
              : 'From surgical decompensation to digital aligner velocity control and restorative implant sizing, Odonto AI provides specialty-specific clinical intelligence grounded in biological reality.'}
          </p>
        </div>

        {/* Apple-Style Light Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-12 mb-10 max-w-5xl mx-auto">
          {SPECIALTIES.map((spec) => {
            const SpecIcon = spec.icon;
            const isActive = activeTab === spec.id;
            return (
              <button
                key={spec.id}
                type="button"
                onClick={() => setActiveTab(spec.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-md shadow-slate-950/15 scale-102'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-xs'
                }`}
              >
                <SpecIcon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                <span>{isAr ? (tabTitlesAr[spec.id] || spec.title) : spec.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Specialty Showcase Card (Pure Apple White Card) */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.06)] transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Specialty Description & Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <Badge className="bg-teal-50 text-teal-800 border-teal-200 text-[11px] font-semibold mb-3">
                  {activeSpecialty.badge}
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span>{activeSpecialty.title}</span>
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                  {activeSpecialty.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeSpecialty.leadParagraph}
              </p>

              {/* Key Biomechanical Principles */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  {isAr ? 'معايير الأمان البيوميكانيكي السريرية:' : 'Biomechanical Standard of Care:'}
                </span>
                <ul className="space-y-2">
                  {activeSpecialty.biomechanicalHighlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Literature Citations */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  {isAr ? 'المراجع والأدلة السريرية المعتمدة:' : 'Foundational Clinical Literature:'}
                </span>
                {activeSpecialty.evidenceCitations.map((cite, i) => (
                  <div key={i} className="text-[11px] text-slate-600 italic">
                    • {cite}
                  </div>
                ))}
              </div>

              {/* Call-to-action Button */}
              <div className="pt-2">
                <Link href={activeSpecialty.ctaHref}>
                  <Button className="h-11 px-6 text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md shadow-blue-600/20 transition-all cursor-pointer group flex items-center gap-2">
                    <span>{isAr ? 'فتح الحالة في الاستوديو السريري' : activeSpecialty.ctaText}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isAr ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: 4 Clinical Capabilities Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeSpecialty.clinicalCapabilities.map((cap, i) => (
                <div
                  key={i}
                  className="bg-slate-50/70 border border-slate-200/80 hover:border-blue-400 hover:bg-white rounded-2xl p-5 transition-all space-y-3 shadow-xs hover:shadow-md group"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-mono font-bold">
                      0{i + 1}
                    </span>
                    {cap.metric && (
                      <Badge className="bg-white text-teal-700 border-slate-200 text-[10px] font-mono font-semibold shadow-xs">
                        {cap.metric}
                      </Badge>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {cap.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
