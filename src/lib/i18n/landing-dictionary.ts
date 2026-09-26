// Odonto AI — Landing Page Bilingual Dictionary (English & Professional Medical Egyptian Arabic)

export interface LandingTranslations {
  header: {
    specialties: string;
    engine: string;
    implants: string;
    comparison: string;
    evidence: string;
    resources: string;
    faq: string;
    implantsBtn: string;
    launchStudioBtn: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    launchStudioBtn: string;
    exploreImplantsBtn: string;
    trustItems: [string, string, string, string];
    previewTitle: string;
    activeCaseBadge: string;
    layers: { num: number; name: string; sub: string }[];
    diagTitle: string;
    skeletalClassBadge: string;
    anbLabel: string;
    anbValue: string;
    witsLabel: string;
    witsValue: string;
    overjetLabel: string;
    overjetValue: string;
    diagDesc: string;
    planTitle: string;
    stagedBadge: string;
    p1Phase: string;
    p1Desc: string;
    p2Phase: string;
    p2Desc: string;
    sxPhase: string;
    sxDesc: string;
    estDuration: string;
    openInStudio: string;
  };
  why: {
    badge: string;
    title: string;
    cards: {
      title: string;
      desc: string;
      metric: string;
    }[];
  };
  implants: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    desc: string;
    highlights: string[];
    ctaBtn: string;
    cardToothName: string;
    cardToothRegion: string;
    cardStatusBadge: string;
    boneWidthLabel: string;
    boneWidthStatus: string;
    boneHeightLabel: string;
    boneHeightStatus: string;
    mischDensityLabel: string;
    mischDensityVal: string;
    recFixtureLabel: string;
    primaryStabilityLabel: string;
    prostheticConnLabel: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    badge: string;
    title: string;
    subtitle: string;
    launchStudioBtn: string;
    exploreImplantsBtn: string;
    note: string;
  };
}

export const LANDING_DICTIONARY: Record<'en' | 'ar', LandingTranslations> = {
  en: {
    header: {
      specialties: 'Specialties',
      engine: '7-Layer Engine',
      implants: 'Implant Studio',
      comparison: 'Comparison',
      evidence: 'Evidence Base',
      resources: 'Resources & References',
      faq: 'Clinical FAQ',
      implantsBtn: 'Implants',
      launchStudioBtn: 'Launch Studio'
    },
    hero: {
      eyebrow: 'Clinical AI for Orthodontics & Implantology',
      titleLine1: 'Your Clinical Co-Pilot.',
      titleLine2: 'From Diagnosis to Treatment Plan.',
      subtitle: 'The most comprehensive and up-to-date clinical AI platform that takes you from radiograph analysis through cephalometric tracing, biomechanical planning, and dental implantology — all in one seamless workflow.',
      launchStudioBtn: 'Launch Treatment Studio',
      exploreImplantsBtn: 'Explore Implant Studio',
      trustItems: [
        'Steiner, Tweed & McNamara Ceph',
        'Misch D1–D4 Bone Density',
        'Live NCBI PubMed Evidence',
        'Dual-Engine Zero Hallucination'
      ],
      previewTitle: 'Odonto AI — Clinical Treatment Studio',
      activeCaseBadge: 'Active Case: John Doe (Class III Underbite)',
      layers: [
        { num: 1, name: 'Ceph Tracing', sub: 'ANB -3.2° / Wits -4mm' },
        { num: 2, name: 'Panoramic OPG', sub: '32-Tooth Segmentation' },
        { num: 3, name: 'Pathology AI', sub: 'Zero Bone Loss Clearance' },
        { num: 4, name: '3D Arch Space', sub: 'Bolton Anterior 77.2%' },
        { num: 5, name: 'Cortical Limit', sub: 'Buccal Plate 1.8mm' },
        { num: 6, name: 'Clinical CoT', sub: 'Surgery vs Decomp' },
        { num: 7, name: 'Plan Synthesis', sub: 'Staged Mechanics' }
      ],
      diagTitle: 'Cephalometric Skeletal Diagnosis',
      skeletalClassBadge: 'Skeletal Class III',
      anbLabel: 'ANB Angle',
      anbValue: '-3.2° (Norm: 2°)',
      witsLabel: 'Wits Appraisal',
      witsValue: '-4.0 mm',
      overjetLabel: 'Overjet',
      overjetValue: '-4.0 mm',
      diagDesc: 'Severe mandibular prognathism with anterior crossbite. AI recommends decompensation followed by bilateral sagittal split osteotomy (BSSO) setback.',
      planTitle: 'Synthesized Biomechanical Plan',
      stagedBadge: 'Staged Mechanics',
      p1Phase: 'P1:',
      p1Desc: 'Leveling & Alignment — 0.014 CuNiTi → 0.018 CuNiTi (6 months)',
      p2Phase: 'P2:',
      p2Desc: 'Incisor Decompensation — 0.019x0.025 SS with Class III elastics (8 months)',
      sxPhase: 'SX:',
      sxDesc: 'Mandibular Setback (BSSO 4.5mm) + Maxillary Advancement (Le Fort I 2.0mm)',
      estDuration: 'Estimated Duration: 22-26 months',
      openInStudio: 'Open in Studio'
    },
    why: {
      badge: 'Why Odonto AI',
      title: 'What Makes This Different.',
      cards: [
        {
          title: 'Treatment Plan Synthesis',
          desc: 'Unlike diagnostic-only tools that detect disease and stop, Odonto AI synthesizes complete multi-phase treatment plans with staged biomechanics, wire sequences, and retention protocols.',
          metric: 'Competitors: 0 Plans'
        },
        {
          title: '7-Layer Diagnostic Pipeline',
          desc: 'Every plan passes through 7 deterministic diagnostic stages: ceph tracing, OPG segmentation, pre-ortho clearance, Bolton analysis, cortical verification, clinical reasoning, and final synthesis.',
          metric: '7 Safety Layers'
        },
        {
          title: 'Dental Implant Planning',
          desc: 'Complete fixture sizing from 14 manufacturer catalogs, Misch D1-D4 bone density drilling protocols, sinus lift calculations, and calibrated prosthetic screw torques.',
          metric: '14 Implant Catalogs'
        },
        {
          title: 'Live PubMed Evidence (RAG)',
          desc: 'Every clinical recommendation is grounded in peer-reviewed literature from Angle Orthod, AJODO, and JCO via real-time NCBI PubMed retrieval — not AI hallucination.',
          metric: 'Real-Time Citations'
        },
        {
          title: 'Zero Clinical Hallucination',
          desc: 'Dual-engine architecture: an AI reasoning layer backed by a deterministic biomechanical engine. All cephalometrics and force calculations are mathematically verified before plan synthesis.',
          metric: 'Dual-Engine Verified'
        },
        {
          title: '6 Clinical Disciplines',
          desc: 'Covers surgical orthodontics, clear aligners, comprehensive fixed mechanics, interceptive orthodontics, skeletal anchorage (TADs), and dental implantology in one platform.',
          metric: '6 Specialties'
        }
      ]
    },
    implants: {
      badge: 'Interdisciplinary Extension',
      titleLine1: 'Dental Implant Planning.',
      titleLine2: 'Precision Sizing & Screw Torques.',
      desc: 'Seamlessly transition from orthodontic space opening to implant fixture placement. Odonto AI calculates bone dimensions, subantral sinus elevation needs, drilling sequences, and calibrated prosthetic screw torques.',
      highlights: [
        '14 Major Implant Catalogs: Straumann, Nobel Biocare, Zimmer, Dentsply, BioHorizons, Osstem, MegaGen',
        'Misch D1–D4 Bone Density Engine with Hounsfield Unit calibrated drilling speeds',
        'Automatic Subantral Sinus Lift Calculator: Crestal OSFE (Summers) vs Lateral Window',
        'Calibrated Prosthetic Screw Torques (25-35 Ncm) & Crown-to-Implant (C/I) lever ratios'
      ],
      ctaBtn: 'Launch Implant Planning Studio',
      cardToothName: 'Upper Right First Molar',
      cardToothRegion: 'Posterior Maxilla (Sinus Zone)',
      cardStatusBadge: 'Crestal Sinus Lift Indicated',
      boneWidthLabel: 'Bone Width',
      boneWidthStatus: 'Safe (≥ 5.5mm)',
      boneHeightLabel: 'Bone Height',
      boneHeightStatus: 'OSFE Lift +3mm',
      mischDensityLabel: 'Misch Density',
      mischDensityVal: '550 HU',
      recFixtureLabel: 'Recommended Fixture:',
      primaryStabilityLabel: 'Primary Stability:',
      prostheticConnLabel: 'Prosthetic Connection:'
    },
    faq: {
      badge: 'Clinical FAQ',
      title: 'Frequently Asked Clinical Questions',
      subtitle: "Clear, evidence-backed answers about Odonto AI's clinical capabilities, safety guardrails, and interdisciplinary scope.",
      items: [
        {
          q: 'What can Odonto AI do that Overjet and Pearl cannot?',
          a: 'Overjet and Pearl are excellent FDA-cleared diagnostic tools that detect caries, bone loss, and periapical pathology on X-rays. However, they stop at detection — they do not generate treatment plans, do not perform cephalometric analysis, do not plan orthodontic biomechanics, and do not cover implantology. Odonto AI picks up where they leave off: it synthesizes complete staged treatment plans with archwire sequences, extraction algorithms, surgical protocols, and implant fixture sizing.'
        },
        {
          q: 'Does Odonto AI handle orthognathic surgical cases?',
          a: 'Yes, absolutely. Odonto AI includes dedicated surgical protocols for Le Fort I osteotomies (advancement, impaction, downgrafting), BSSO (mandibular setback and advancement), sliding genioplasty, and Surgery-First Approaches (SFA) utilizing the Regional Acceleratory Phenomenon (RAP). It automatically models pre-surgical incisor decompensation goals and arch width coordination.'
        },
        {
          q: 'Can it calculate dental implant fixture dimensions?',
          a: 'Yes! The newly built Dental Implant Planning Studio evaluates CBCT bone width and height to calculate safe fixture diameters and lengths honoring the 1.5mm buccal cortical plate rule and 2.0mm IAN safety clearance. It calculates Misch D1–D4 bone density drilling speeds, subantral sinus lift requirements (OSFE crestal vs lateral window), and exact manufacturer prosthetic screw torque values (25–35 Ncm).'
        },
        {
          q: 'How does Odonto AI prevent clinical hallucination?',
          a: 'Unlike generic language models, Odonto AI runs a dual-engine architecture: an AI reasoning layer backed by a deterministic biomechanical engine. All skeletal cephalometrics (SNA, SNB, ANB, Wits), arch perimeter calculations, Bolton tooth-size ratios, and wire progressions are mathematically calculated before clinical plan synthesis.'
        },
        {
          q: 'Which bracket systems and archwire progressions are supported?',
          a: 'The system includes standard and custom bracket prescriptions for MBT (McLaughlin-Bennett-Trevisi), Roth, and Damon systems in .022" and .018" slot sizes. Wire progression sequences encompass superelastic thermal CuNiTi, Beta-Titanium (TMA), and rigid Stainless Steel with calibrated force-deflection ratios.'
        },
        {
          q: 'Is Odonto AI backed by peer-reviewed evidence?',
          a: 'Every treatment plan references established orthodontic literature, including published papers from the American Journal of Orthodontics and Dentofacial Orthopedics (AJODO), The Angle Orthodontist, and the Journal of Clinical Orthodontics (JCO), integrated with live NCBI PubMed search.'
        }
      ]
    },
    finalCta: {
      badge: 'Ready for Clinical Deployment',
      title: 'Ready to Experience Clinical Orthodontic AI?',
      subtitle: 'Join hundreds of orthodontists and dental surgeons using Odonto AI to synthesize evidence-backed treatment plans in seconds.',
      launchStudioBtn: 'Launch Treatment Studio',
      exploreImplantsBtn: 'Explore Implant Studio',
      note: 'Cloud-native • Zero hardware lock-in • Grounded in peer-reviewed science'
    }
  },
  ar: {
    header: {
      specialties: 'التخصصات السريرية',
      engine: 'المحرك السباعي',
      implants: 'استوديو الزراعة',
      comparison: 'مقارنة المنظومات',
      evidence: 'الأدلة والأبحاث',
      resources: 'المصادر والمراجع',
      faq: 'الأسئلة الشائعة',
      implantsBtn: 'الزراعة',
      launchStudioBtn: 'استوديو العلاج'
    },
    hero: {
      eyebrow: 'الذكاء الاصطناعي السريري لتقويم وزراعة الأسنان',
      titleLine1: 'مساعدك السريري الذكي.',
      titleLine2: 'من التشخيص المبدئي إلى خطة العلاج.',
      subtitle: 'المنظومة السريرية الأكثر شمولاً وتطوراً التي ترافقك من تحليل الأشعة وتتبع قياسات السيفالومتريك (Cephalometrics)، إلى تخطيط البيوميكانيكا التقويمية وزراعة الأسنان — في تدفق عمل موحد وخالٍ من الهلوسة.',
      launchStudioBtn: 'فتح استوديو العلاج التقويمي',
      exploreImplantsBtn: 'استكشاف استوديو زراعة الأسنان',
      trustItems: [
        'تحليلات ستاينر وتويد وماكنمارا السيفالومترية',
        'محرك كثافة العظم وفق تصنيف ميش (Misch D1–D4)',
        'أبحاث محكمة لحظياً من NCBI PubMed',
        'معمارية مزدوجة بصفر هلوسة طبية'
      ],
      previewTitle: 'Odonto AI — استوديو التخطيط السريري المتقدم',
      activeCaseBadge: 'الحالة النشطة: عضة معكوسة من الصنف الثالث (Class III Underbite)',
      layers: [
        { num: 1, name: 'تتبع السيفالومتريك', sub: 'زاوية ANB -3.2° / مؤشر Wits -4 مم' },
        { num: 2, name: 'بانوراما الأسنان OPG', sub: 'تجزئة وترقيم الـ 32 سناً' },
        { num: 3, name: 'التصريح اللثوي AI', sub: 'خلو كامل من التآكل العظمي والجيوب' },
        { num: 4, name: 'مساحة القوس وبولتون', sub: 'نسبة بولتون الأمامية 77.2%' },
        { num: 5, name: 'حدود العظم القشري', sub: 'سماكة الصفيحة العظمية 1.8 مم' },
        { num: 6, name: 'الاستدلال السريري CoT', sub: 'موازنة الجراحة مقابل التعويض السني' },
        { num: 7, name: 'تخليق خطة العلاج', sub: 'الميكانيكا وتدرج الأسلاك والمطاطات' }
      ],
      diagTitle: 'التشخيص الهيكلي السيفالومتري',
      skeletalClassBadge: 'صنف ثالث هيكلي (Class III)',
      anbLabel: 'زاوية ANB',
      anbValue: '-3.2° (المعيار: 2°)',
      witsLabel: 'مؤشر ويتس (Wits)',
      witsValue: '-4.0 مم',
      overjetLabel: 'البروز الأفقي (Overjet)',
      overjetValue: '-4.0 مم',
      diagDesc: 'بروز شديد في الفك السفلي مع عضة أمامية معكوسة. يوصي النظام بإلغاء التعويض السنّي (Decompensation) متبوعاً بجراحة تقديم الفك العلوي وتأخير الفك السفلي (BSSO + Le Fort I).',
      planTitle: 'الخطة البيوميكانيكية المخلّقة',
      stagedBadge: 'ميكانيكا مرحلية متدرجة',
      p1Phase: 'م1:',
      p1Desc: 'الرصف والمحاذاة — أسلاك CuNiTi حرارية 0.014 ← 0.018 (6 أشهر)',
      p2Phase: 'م2:',
      p2Desc: 'تصحيح ميل القواطع — سلك صلب SS 0.019x0.025 مع مطاطات صنف ثالث (8 أشهر)',
      sxPhase: 'جراحة:',
      sxDesc: 'إرجاع الفك السفلي (BSSO 4.5 مم) + تقديم الفك العلوي (Le Fort I 2.0 مم)',
      estDuration: 'المدة المقدرة للعلاج: 22-26 شهراً',
      openInStudio: 'فتح الحالة في الاستوديو'
    },
    why: {
      badge: 'لماذا منظومة Odonto AI؟',
      title: 'ما الذي يجعل هذه المنظومة استثنائية؟',
      cards: [
        {
          title: 'تخليق خطط العلاج المرحلية',
          desc: 'على عكس أدوات الذكاء الاصطناعي التشخيصية التي تكتفي برصد التسوس وتتوقف، تخلّق Odonto AI خطط علاج مرحلية متكاملة تشمل البيوميكانيكا، تدرج مقاسات الأسلاك، وبروتوكولات التثبيت لمنع الارتداد.',
          metric: 'المنافسون: 0 خطط علاج'
        },
        {
          title: 'خط الأنابيب التشخيصي السباعي',
          desc: 'تمر كل حالة عبر 7 مراحل فحص حتمية: تتبع السيفالومتريك، تجزئة أسنان البانوراما، التصريح اللثوي، ميزانية الفراغ وبولتون، حدود العظم القشري، الاستدلال السريري، والتخليق النهائي.',
          metric: '7 طبقات أمان صارمة'
        },
        {
          title: 'تخطيط زراعة الأسنان المتقدم',
          desc: 'تحديد دقيق لأبعاد الزرعات من كتالوجات 14 شركة عالمية، بروتوكولات الحفر حسب كثافة العظم (Misch D1–D4)، حاسبة رفع الجيب الفكي، وعيار عزم ربط البراغي بدقة النيوتن/سم.',
          metric: '14 كتالوج زراعة عالمي'
        },
        {
          title: 'أبحاث حية ومحكمة من PubMed',
          desc: 'كل توصية علاجية مدعومة بدراسات حية من كبرى الدوريات المحكمة (Angle Orthod, AJODO, JCO) عبر الاسترجاع المباشر من مكتبة NCBI الوطنية — دون أي اختلاق أو هلوسة.',
          metric: 'توثيق لحظي للمراجع'
        },
        {
          title: 'منظومة بصفر هلوسة سريرية',
          desc: 'معمارية مزدوجة فريدة: طبقة استدلال ذكية مدعومة بمحرك بيوميكانيكي حتمي. جميع قياسات الجمجمة وحسابات القوى يتم إجراؤها حسابياً قبل صياغة الخطة السريرية.',
          metric: 'تحقق رياضي وفيزيائي'
        },
        {
          title: '6 تخصصات سريرية في منصة واحدة',
          desc: 'تغطي جراحة تقويم الفكين، التقويم الشفاف (Aligners)، الأجهزة الثابتة (Brackets)، التقويم الوقائي المبكر، زرعات التثبيت العظمي (TADs)، وزراعة الأسنان في بيئة عمل موحدة.',
          metric: '6 تخصصات متكاملة'
        }
      ]
    },
    implants: {
      badge: 'تكامل التخصصات السريرية',
      titleLine1: 'تخطيط زراعة الأسنان.',
      titleLine2: 'مقاسات دقيقة وعزم ربط محسوب.',
      desc: 'انتقال سلس وفوري من فتح مسافات التقويم إلى غرس الزرعات السنية. تحسب Odonto AI أبعاد العظم المتاح، حاجة رفع الجيب الفكي، تسلسل دريلات الحفر، وعزم ربط براغي التعويضات بدقة الميكرون.',
      highlights: [
        '14 كتالوجاً عالمياً معتمداً: Straumann, Nobel Biocare, Zimmer, Dentsply, BioHorizons, Osstem, MegaGen وغيرها',
        'محرك كثافة العظم Misch D1–D4 بمعايرة سرعة الحفر والتبريد وفق وحدات هاونسفيلد (Hounsfield Units)',
        'حاسبة رفع الجيب الفكي الأوتوماتيكية: الرفع المغلق (OSFE Summers) مقابل نافذة الرفع المفتوح (Lateral Window)',
        'حساب عزم ربط البراغي بدقة (25-35 Ncm) ونسبة طول التاج إلى الزرعة (Crown-to-Implant Ratio)'
      ],
      ctaBtn: 'فتح استوديو تخطيط زراعة الأسنان',
      cardToothName: 'الضرس الأول العلوي الأيمن (#16)',
      cardToothRegion: 'الفك العلوي الخلفي (منطقة الجيب الفكي)',
      cardStatusBadge: 'مؤشر لرفع الجيب الفكي المغلق (OSFE)',
      boneWidthLabel: 'عرض العظم المتاح',
      boneWidthStatus: 'آمن (≥ 5.5 مم)',
      boneHeightLabel: 'ارتفاع العظم المتبقي',
      boneHeightStatus: 'رفع مغلق OSFE بمقدار +3 مم',
      mischDensityLabel: 'كثافة العظم (Misch)',
      mischDensityVal: '550 HU (متوسطة)',
      recFixtureLabel: 'الزرعة الموصى بها:',
      primaryStabilityLabel: 'الثبات الأولي المتوقع:',
      prostheticConnLabel: 'اتصال الدعامة التعويضية:'
    },
    faq: {
      badge: 'الأسئلة السريرية الشائعة',
      title: 'الأسئلة السريرية الأكثر شيوعاً',
      subtitle: 'إجابات واضحة وموثقة علمياً حول قدرات Odonto AI السريرية، ومحددات الأمان الطبية، ونطاق التخصصات المشمولة.',
      items: [
        {
          q: 'ما الذي تقدمه Odonto AI ولا تقدمه منظومات مثل Overjet و Pearl؟',
          a: 'منظومتا Overjet و Pearl أدوات تشخيصية ممتازة وحاصلة على اعتمادات FDA لكشف التسوس وتآكل العظم في الأشعة. ولكنها تقف عند مجرد الاكتشاف فقط — فلا تخلّق خطط علاج، ولا تقيس السيفالومتريك، ولا تحسب بيوميكانيكا التقويم، ولا تشمل زراعة الأسنان. منظومة Odonto AI تبدأ من حيث ينتهون: تخلّق خطط علاج مرحلية متكاملة تشمل تسلسل الأسلاك، خوارزميات قرارات الخلع، بروتوكولات جراحة الفكين، ومقاسات زرعات الأسنان.'
        },
        {
          q: 'هل تدعم المنظومة حالات جراحة تقويم الفكين (Orthognathic Surgery)؟',
          a: 'نعم بكل تأكيد. تشمل المنظومة بروتوكولات جراحية دقيقة لعمليات قص عظم الفك العلوي Le Fort I (للتقديم والرفع وتعديل الميل)، وعمليات قص عظم الفك السفلي BSSO (للتقديم والتأخير)، وتجميل الذقن (Genioplasty)، وبروتوكول الجراحة أولاً (Surgery-First Approach). كما تحسب تلقائياً أهداف إزالة التعويض السني (Decompensation) ومطابقة عرض الفكين.'
        },
        {
          q: 'هل تستطيع المنظومة حساب مقاسات زرعات الأسنان بدقة؟',
          a: 'نعم! يحلل استوديو زراعة الأسنان أبعاد العظم في الأشعة المقطعية CBCT ليختار القطر والطول الآمن وفق قاعدة الحفاظ على 1.5 مم عظم قشري دهليزي و2.0 مم مسافة أمان فوق عصب الفك السفلي (IAN). كما يحدد كثافة العظم Misch D1–D4 وسرعات الحفر، وحاجة رفع قاع الجيب الفكي، وعزم ربط براغي التركيبات بدقة (25–35 Ncm).'
        },
        {
          q: 'كيف تمنع Odonto AI الهلوسة الطبية والأخطاء السريرية؟',
          a: 'على عكس روبوتات الذكاء الاصطناعي العامة، تعمل Odonto AI بمعمارية محرك مزدوج: طبقة استدلال ذكية مدعومة بمحرك بيوميكانيكي حتمي. كافة زوايا السيفالومتريك (SNA, SNB, ANB, Wits)، وحسابات محيط القوس، ونسب بولتون، وتدرج الأسلاك تخضع لمعادلات رياضية حتمية قبل أن يتدخل الذكاء الاصطناعي لصياغة الخطة.'
        },
        {
          q: 'ما هي وصفات البراكتات وتدرجات الأسلاك المدعومة في النظام؟',
          a: 'يدعم النظام وصفات MBT و Roth و Damon بمقاسي الشق .022" و .018". وتشمل سلاسل الأسلاك سبائك CuNiTi الحرارية فائقة المرونة، وسبائك التيتانيوم-موليبدينوم (TMA)، والستانلس ستيل الصلب مع نسب قوى وانحراف محسوبة بيولوجياً بدقة.'
        },
        {
          q: 'هل توصيات Odonto AI مدعومة بأدلة وأبحاث علمية محكمة؟',
          a: 'تعتمد كل توصية علاجية على مراجع راسخة في طب وتقويم الأسنان، بما في ذلك أبحاث AJODO، و The Angle Orthodontist، و Journal of Clinical Orthodontics (JCO)، مع إمكانية البحث والاسترجاع المباشر لحظياً من مكتبة NCBI PubMed العالمية.'
        }
      ]
    },
    finalCta: {
      badge: 'جاهز للاستخدام السريري الفوري',
      title: 'هل أنت مستعد لتجربة الذكاء الاصطناعي التقويمي المتقدم؟',
      subtitle: 'انضم إلى نخبة أطباء تقويم وجراحة الأسنان الذين يعتمدون على Odonto AI لتخليق خطط علاجية مدعومة بالأبحاث في ثوانٍ معدودة.',
      launchStudioBtn: 'فتح استوديو العلاج التقويمي',
      exploreImplantsBtn: 'استكشاف استوديو الزراعة',
      note: 'منظومة سحابية بالكامل • متوافقة مع جميع الأجهزة • معتمدة على أدلة علمية محكمة'
    }
  }
};
