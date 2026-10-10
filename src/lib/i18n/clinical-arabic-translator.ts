/**
 * Odonto AI — Dynamic Clinical Arabic Translator
 * 
 * Provides crystal-clear, comprehensive, and clinically accurate Arabic translations
 * for all treatment plan components, diagnoses, biomechanics, wires, and protocols.
 * 
 * Explains complex English terms and acronyms in simple, professional Egyptian/Arab dental terminology
 * so that any dentist, assistant, or clinic manager can immediately understand and use the system.
 */

import { TreatmentPlanData, MasterPhaseItem } from '@/components/clinical/plan-builder';

// ---------------------------------------------------------------------------
// 1. Tooth Names in Arabic (FDI Notation)
// ---------------------------------------------------------------------------
export const TOOTH_NAMES_AR: Record<string, string> = {
  // Maxillary Right (Quadrant 1)
  '11': 'الثنية العلوية اليمنى (Upper Right Central Incisor #11)',
  '12': 'الرباعية العلوية اليمنى (Upper Right Lateral Incisor #12)',
  '13': 'الناب العلوي الأيمن (Upper Right Canine #13)',
  '14': 'الضاحك الأول العلوي الأيمن (Upper Right 1st Premolar #14)',
  '15': 'الضاحك الثاني العلوي الأيمن (Upper Right 2nd Premolar #15)',
  '16': 'الضرس الأول العلوي الأيمن (Upper Right 1st Molar #16)',
  '17': 'الضرس الثاني العلوي الأيمن (Upper Right 2nd Molar #17)',
  '18': 'ضرس العقل العلوي الأيمن (Upper Right 3rd Molar #18)',

  // Maxillary Left (Quadrant 2)
  '21': 'الثنية العلوية اليسرى (Upper Left Central Incisor #21)',
  '22': 'الرباعية العلوية اليسرى (Upper Left Lateral Incisor #22)',
  '23': 'الناب العلوي الأيسر (Upper Left Canine #23)',
  '24': 'الضاحك الأول العلوي الأيسر (Upper Left 1st Premolar #24)',
  '25': 'الضاحك الثاني العلوي الأيسر (Upper Left 2nd Premolar #25)',
  '26': 'الضرس الأول العلوي الأيسر (Upper Left 1st Molar #26)',
  '27': 'الضرس الثاني العلوي الأيسر (Upper Left 2nd Molar #27)',
  '28': 'ضرس العقل العلوي الأيسر (Upper Left 3rd Molar #28)',

  // Mandibular Left (Quadrant 3)
  '31': 'الثنية السفلية اليسرى (Lower Left Central Incisor #31)',
  '32': 'الرباعية السفلية اليسرى (Lower Left Lateral Incisor #32)',
  '33': 'الناب السفلي الأيسر (Lower Left Canine #33)',
  '34': 'الضاحك الأول السفلي الأيسر (Lower Left 1st Premolar #34)',
  '35': 'الضاحك الثاني السفلي الأيسر (Lower Left 2nd Premolar #35)',
  '36': 'الضرس الأول السفلي الأيسر (Lower Left 1st Molar #36)',
  '37': 'الضرس الثاني السفلي الأيسر (Lower Left 2nd Molar #37)',
  '38': 'ضرس العقل السفلي الأيسر (Lower Left 3rd Molar #38)',

  // Mandibular Right (Quadrant 4)
  '41': 'الثنية السفلية اليمنى (Lower Right Central Incisor #41)',
  '42': 'الرباعية السفلية اليمنى (Lower Right Lateral Incisor #42)',
  '43': 'الناب السفلي الأيمن (Lower Right Canine #43)',
  '44': 'الضاحك الأول السفلي الأيمن (Lower Right 1st Premolar #44)',
  '45': 'الضاحك الثاني السفلي الأيمن (Lower Right 2nd Premolar #45)',
  '46': 'الضرس الأول السفلي الأيمن (Lower Right 1st Molar #46)',
  '47': 'الضرس الثاني السفلي الأيمن (Lower Right 2nd Molar #47)',
  '48': 'ضرس العقل السفلي الأيمن (Lower Right 3rd Molar #48)',
};

export function formatToothNameAr(toothStr: string): string {
  const digits = toothStr.replace(/[^0-9]/g, '');
  if (digits && TOOTH_NAMES_AR[digits]) {
    return TOOTH_NAMES_AR[digits];
  }
  return toothStr;
}

// ---------------------------------------------------------------------------
// 2. Dynamic Diagnosis Translator
// ---------------------------------------------------------------------------
export function translateSkeletalDiagnosisAr(skeletal?: string, angleClass?: string): string {
  if (!skeletal) return 'علاقة هيكلية متوازنة بين الفكين (صنف أول هيكلي).';
  const s = skeletal.toLowerCase();
  const a = (angleClass || '').toLowerCase();

  if (s.includes('class iii') || a.includes('class iii') || s.includes('prognath') || s.includes('underbite')) {
    return 'علاقة هيكلية صنف ثالث (Class III Skeletal): تقدم في الفك السفلي بالنسبة للعلوي أو تراجع هيكلي في الفك العلوي (Maxillary Deficiency)، مع ميل لنمو الوجه المقعر.';
  }
  if (s.includes('class ii') || a.includes('class ii') || s.includes('retrognath')) {
    if (s.includes('div 2') || a.includes('div 2')) {
      return 'علاقة هيكلية صنف ثانٍ تقسيم 2 (Class II Div 2): تراجع نسبي في الفك السفلي مع نمو أفقي منخفض التباعد (Hypodivergent) وعضة عميقة هيكلية مغلقة.';
    }
    return 'علاقة هيكلية صنف ثانٍ (Class II Skeletal): تراجع في عظم الفك السفلي أو تقدم في الفك العلوي، مما يسبب بروزاً أفقياً وتبايناً سهمياً بين الفكين.';
  }
  if (s.includes('bimax') || s.includes('protrusion')) {
    return 'بروز ثنائي هيكلي لقاعدتي الفكين (Bimaxillary Protrusion) مع بروز الشفاه وضيق نسبي في محيط العظم السنخي.';
  }
  if (s.includes('open') || s.includes('hyperdivergent')) {
    return 'نمط نمو رأسي مفرط التباعد (Hyperdivergent / Long Face) مع ميل لتباعد الفكين وعضة هيكلية مفتوحة.';
  }
  return skeletal;
}

export function translateDentalDiagnosisAr(dental?: string, angleClass?: string): string {
  if (!dental) return 'إطباق سني صنف أول طبيعي.';
  const d = dental.toLowerCase();
  const a = (angleClass || '').toLowerCase();

  if (d.includes('class iii') || a.includes('class iii')) {
    return 'سوء إطباق صنف ثالث (Angle Class III): عضة معكوسة أمامية (Reverse Overjet / Underbite) حيث تتقدم القواطع السفلية أمام العلوية، مع علاقة صنف ثالث للأنياب والأضراس.';
  }
  if (d.includes('div 2') || a.includes('div 2')) {
    return 'سوء إطباق صنف ثانٍ تقسيم 2 (Class II Div 2): عضة عميقة شديدة (Deep Bite) مع انكفاء وميلان القواطع المركزية العلوية للداخل (Retroclined) وبروز الرباعيات.';
  }
  if (d.includes('class ii') || a.includes('class ii')) {
    return 'سوء إطباق صنف ثانٍ تقسيم 1 (Class II Div 1): بروز حاد في القواطع العلوية (Overjet كبير) مع عضة عميقة وتزاحم في الأسنان، وعلاقة صنف ثانٍ للأضراس والأنياب.';
  }
  if (d.includes('open bite')) {
    return 'عضة أمامية مفتوحة (Anterior Open Bite): انعدام التلامس الرأسي بين القواطع العلوية والسفلية، غالباً بسبب عادة دفع اللسان أو بزوغ مفرط للأضراس الخلفية.';
  }
  if (d.includes('crowd')) {
    return 'تزاحم سني ملحوظ (Crowding) وعدم انتظام في رصف الأسنان ناتج عن عدم تناسب حجم الأسنان مع محيط القوس الفكي.';
  }
  return dental;
}

export function translateSoftTissueDiagnosisAr(softTissue?: string): string {
  if (!softTissue) return 'توازن طبيعي للأنسجة الرخوة والشفاه عند الراحة.';
  const st = softTissue.toLowerCase();

  if (st.includes('concave') || st.includes('prognath')) {
    return 'مظهر جانبي مقعر للوجه (Concave Profile): بروز واضح في الذقن مع تسطح أو تراجع نسبي في الشفة العلوية.';
  }
  if (st.includes('convex') || st.includes('incompetence') || st.includes('trap')) {
    return 'مظهر جانبي محدب للوجه (Convex Profile): عدم كفاءة إطباق الشفاه عند الراحة (Lip Incompetence)، مع انحصار الشفة السفلية خلف الأسنان العلوية البارزة.';
  }
  if (st.includes('bimax') || st.includes('protrud')) {
    return 'بروز واضح في الشفتين العلوية والسفلية أمام خط الجمال (E-Line) مع شد عضلي عند محاولة إغلاق الفم.';
  }
  return softTissue;
}

// ---------------------------------------------------------------------------
// 3. Dynamic Objectives Translator
// ---------------------------------------------------------------------------
export function translateObjectivesAr(objectives?: string[], angleClass?: string): string[] {
  if (!objectives || objectives.length === 0) {
    return [
      'رصف ومحاذاة كامل أقواس الأسنان وتصحيح التزاحم.',
      'تحقيق إطباق مثالي ومتداخل صنف أول للأنياب والأضراس.',
      'تنسيق أبعاد القوسين العلوي والسفلي وضمان توازن الابتسامة.'
    ];
  }

  const a = (angleClass || '').toLowerCase();

  return objectives.map((obj) => {
    const o = obj.toLowerCase();
    if (o.includes('class i molar') || o.includes('sagittal')) {
      if (a.includes('class iii')) {
        return 'تصحيح العلاقة السهمية والوصول لإطباق صنف أول متداخل للأنياب والأضراس عبر تقديم الأسنان العلوية أو إرجاع السفلية.';
      }
      return 'تصحيح التباين السهمي بين الفكين للوصول إلى علاقة صنف أول مثالية للأنياب والأضراس.';
    }
    if (o.includes('overjet')) {
      if (a.includes('class iii') || o.includes('reverse') || o.includes('negative')) {
        return 'تصحيح العضة المعكوسة وتحقيق بروز أفقي إيجابي طبيعي (Overjet 2.0 مم) لحماية الأسنان من التآكل.';
      }
      return 'تقليل البروز الأفقي للأسنان العلوية من القياس الزائد إلى المعدل الطبيعي (2.0 مم) لحماية الشفاه وإلغاء انحصارها.';
    }
    if (o.includes('curve of spee') || o.includes('overbite') || o.includes('deep bite')) {
      return 'تعديل منحنى سبي (Curve of Spee) وتصحيح العضة العميقة للوصول لتغطية رأسية مثالية (Overbite 2.0 مم).';
    }
    if (o.includes('open bite')) {
      return 'إغلاق العضة المفتوحة وتحقيق تراكب رأسي إيجابي (Overbite +2.0 مم) عبر غرس الأضراس الخلفية أو رصف القواطع.';
    }
    if (o.includes('crowd')) {
      return 'فك التزاحم السني ورصف وتعديل دوران كافة الأسنان دون إمالتها خارج حدود العظم القشري.';
    }
    if (o.includes('soft tissue') || o.includes('lip')) {
      return 'تحقيق التوازن الجمالي للأنسجة الرخوة والوصول لإغلاق طبيعي مريح للشفاه عند الراحة (Lip Competence).';
    }
    return obj;
  });
}

// ---------------------------------------------------------------------------
// 4. Extraction Decision Translator
// ---------------------------------------------------------------------------
export function translateExtractionRationaleAr(
  decision?: string,
  teeth?: string[],
  rationale?: string
): { decisionAr: string; teethAr: string[]; rationaleAr: string } {
  const isExt = decision === 'Extraction';
  const isBorderline = decision === 'Borderline';

  if (!isExt && !isBorderline) {
    return {
      decisionAr: 'علاج تحفظي بدون خلع (Non-Extraction)',
      teethAr: [],
      rationaleAr: 'علاج محافظ دون أي خلع للأسنان الدائمة: مساحة القوس السنخي كافية لرصف الأسنان عبر التوسيع اللطيف أو البرد بين السني (IPR) ضمن الحدود الحيوية للعظم القشري.'
    };
  }

  if (isBorderline) {
    return {
      decisionAr: 'حالة حدودية حرجة (Borderline Case)',
      teethAr: (teeth || []).map(formatToothNameAr),
      rationaleAr: 'حالة دقيقة بين الخلع وبدون خلع: ينصح ببدء الرصف بسلك خفيف ومراقبة ميلان القواطع (IMPA) وسماكة العظم الشفوي قبل تثبيت قرار الخلع النهائي.'
    };
  }

  // Extraction case
  const teethFormatted = (teeth || []).map(formatToothNameAr);
  let customRationale = rationale;

  if (!customRationale || customRationale.includes('14mm')) {
    const teethList = teeth && teeth.length > 0 ? teeth.join(', ') : 'الضواحك المحددة';
    customRationale = `الخلع العلاجي لـ (${teethList}) يوفر المساحة الصافية اللازمة لفك التزاحم الشديد وإرجاع الأسنان البارزة دون دفع الجذور خارج حدود الصفيحة العظمية السنخية.`;
  }

  return {
    decisionAr: 'خلع علاجي مطلوب حتمياً (Therapeutic Extraction)',
    teethAr: teethFormatted,
    rationaleAr: customRationale
  };
}

// ---------------------------------------------------------------------------
// 5. Mechanics & Wire Sequences Translator
// ---------------------------------------------------------------------------
export function translateMechanicsPhaseAr(phase: {
  phase: string;
  duration: string;
  objectives: string;
  wires: string;
  elastics?: string;
}): { phaseTitleAr: string; durationAr: string; objectivesAr: string; elasticsAr?: string } {
  const p = phase.phase.toLowerCase();
  const obj = phase.objectives.toLowerCase();

  let phaseTitleAr = phase.phase;
  if (p.includes('1') || p.includes('align') || p.includes('level')) {
    phaseTitleAr = 'المرحلة 1: الرص والمحاذاة وتسوية القوس (Alignment & Leveling)';
  } else if (p.includes('2') || p.includes('space') || p.includes('retract') || p.includes('closure')) {
    phaseTitleAr = 'المرحلة 2: غلق المسافات والتحكم السهمي (Space Closure & Retraction)';
  } else if (p.includes('3') || p.includes('finish') || p.includes('detail')) {
    phaseTitleAr = 'المرحلة 3: الإنهاء وضبط التطابق الإطباقي (Finishing & Detailing)';
  }

  let durationAr = phase.duration
    .replace(/months?/gi, 'أشهر')
    .replace(/weeks?/gi, 'أسابيع')
    .replace(/–|-/g, '–');

  let objectivesAr = phase.objectives;
  if (obj.includes('derotate') || obj.includes('level curve') || obj.includes('unravel')) {
    objectivesAr = 'تعديل دوران الأسنان (Derotation)، وتسوية منحنى سبي، وفك التزاحم، وتجهيز أسلاك ستانلس ستيل مستطيلة صلبة للعمل.';
  } else if (obj.includes('en-masse') || obj.includes('retraction') || obj.includes('closed-coil')) {
    objectivesAr = 'إرجاع القواطع ككتلة واحدة (En-masse Retraction) على أسلاك صلبة مزودة بمقابض ويايات شد NiTi مغلقة بقوة 150 جم محكومة.';
  } else if (obj.includes('settle') || obj.includes('intercuspation') || obj.includes('coordinate')) {
    objectivesAr = 'تطابق الإطباق النهائي المتداخل للأنياب والأضراس، وتنسيق أقواس الفكين بدقة لضمان استقرار طويل الأمد.';
  } else if (obj.includes('protraction') || obj.includes('underbite')) {
    objectivesAr = 'تقديم الأسنان العلوية وتصحيح العضة المعكوسة الأمامية مع تثبيت إطباق صنف أول متوازن.';
  }

  let elasticsAr = phase.elastics;
  if (phase.elastics) {
    const el = phase.elastics.toLowerCase();
    if (el.includes('class ii')) {
      elasticsAr = 'مطاط صنف ثانٍ (Class II Elastics: 3/16 بوصة، 4.5 أونصة) لدعم إرجاع القواطع العلوية ومنع فقدان المرسى';
    } else if (el.includes('class iii')) {
      elasticsAr = 'مطاط صنف ثالث (Class III Elastics: 3/16 بوصة، 4.5 أونصة) للمساعدة في تقديم الفك العلوي وإرجاع السفلي';
    } else if (el.includes('triang') || el.includes('box') || el.includes('settl')) {
      elasticsAr = 'مطاط إنهاء مثلثي خفيف (1/8 بوصة، 2.5 أونصة) لتطابق الإطباق الرأسي المتداخل بين الفكين';
    }
  }

  return { phaseTitleAr, durationAr, objectivesAr, elasticsAr };
}

// ---------------------------------------------------------------------------
// 6. Anchorage & Retention Translator
// ---------------------------------------------------------------------------
export function translateAnchorageAr(anchorage?: {
  type?: string;
  devices?: string[];
  rationale?: string;
}): { typeAr: string; devicesAr: string[]; rationaleAr: string } {
  if (!anchorage) {
    return {
      typeAr: 'مرسى متبادل قياسي (Reciprocal Anchorage)',
      devicesAr: ['أسلاك تقويم صلبة متوافقة'],
      rationaleAr: 'الاعتماد على توازن القوى المتبادلة بين الأسنان الأمامية والخلفية دون الحاجة لدعامات عظمية خارجية.'
    };
  }

  let typeAr = anchorage.type || 'مرسى عظمي';
  const t = (anchorage.type || '').toLowerCase();
  if (t.includes('maximum') || t.includes('group a')) {
    typeAr = 'مرسى عظمي مطلق حرج (Maximum Anchorage - Group A)';
  } else if (t.includes('moderate') || t.includes('group b')) {
    typeAr = 'مرسى متوسط متبادل (Moderate Anchorage - Group B)';
  } else if (t.includes('minimum') || t.includes('group c')) {
    typeAr = 'مرسى أدنى لسحب الأضراس للأمام (Minimum Anchorage - Group C)';
  }

  const devicesAr = (anchorage.devices || []).map((d) => {
    const dl = d.toLowerCase();
    if (dl.includes('transpalatal') || dl.includes('tpa')) {
      return 'قوس حنكي صلب (TPA 0.036") لتثبيت الأضراس العلوية';
    }
    if (dl.includes('izc') || dl.includes('infrazygomatic')) {
      return 'مسامير تقويم عظمية IZC ثنائية الجانب خارج الجذور (2.0 × 12 مم)';
    }
    if (dl.includes('buccal shelf')) {
      return 'مسامير عظمية في رف الفك السفلي Buccal Shelf (2.0 × 10 مم)';
    }
    if (dl.includes('lingual holding') || dl.includes('llha')) {
      return 'قوس لساني حافظ للفك السفلي (Lower Lingual Holding Arch)';
    }
    return d;
  });

  return {
    typeAr,
    devicesAr,
    rationaleAr: anchorage.rationale || 'التحكم الدقيق في المرسى العظمي لضمان حركة الأسنان المستهدفة فقط ومنع حركة الأضراس غير المرغوبة.'
  };
}

export function translateRetentionAr(retention?: {
  maxillary?: string;
  mandibular?: string;
  wearSchedule?: string;
}): { maxAr: string; mandAr: string; schedAr: string } {
  return {
    maxAr: retention?.maxillary || 'جهاز إيسيكس الشفاف (Essix 1.0mm) يغطي كامل القوس حتى الأضراس الثانية لحماية العضة وقوس الابتسامة',
    mandAr: retention?.mandibular || 'سلك لساني دائم ملصوق من الناب للناب (3-3 Bonded Lingual Retainer سلك .0175" مجدول) لمنع عودة التزاحم',
    schedAr: retention?.wearSchedule || 'ارتداء كامل ٢٢ ساعة/يوم لأول ٦ أشهر، ثم الانتقال لارتداء ليلي دائم غير محدد المدة للحفاظ على النتيجة'
  };
}
