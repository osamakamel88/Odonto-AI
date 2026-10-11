// Odonto AI — Landing Page Bilingual Dictionary (English & Professional Medical Egyptian Arabic)

export interface LandingTranslations {
  header: {
    specialties: string;
    engine: string;
    implants: string;
    comparison: string;
    evidence: string;
    manual: string;
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
      manual: 'Training Manual 📖',
      resources: 'Resources & PubMed 🔬',
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
        'Proffit & Nanda Biomechanics',
        'Misch D1–D4 & ITI SAC Guidelines',
        'Live NCBI PubMed RAG Evidence',
        'Zero Clinical Hallucination'
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
      engine: 'المحرك السباعي (7-Layers)',
      implants: 'استوديو الزراعة',
      comparison: 'مقارنة المنظومة بالمنافسين',
      evidence: 'الأدلة ومكتبة PubMed',
      manual: 'دليل التدريب والتشغيل 📖',
      resources: 'المصادر والمراجع 🔬',
      faq: 'الأسئلة السريرية الشائعة',
      implantsBtn: 'زراعة الأسنان',
      launchStudioBtn: 'دخول استوديو العلاج'
    },
    hero: {
      eyebrow: 'المساعد السريري الذكي لتقويم وزراعة الأسنان في العيادة',
      titleLine1: 'مساعدك السريري في العيادة.',
      titleLine2: 'من صورة الأشعة لخطة العلاج المتكاملة في ثوانٍ.',
      subtitle: 'بدل ما تقعد 25 دقيقة تشف على أشعة السيفالو بالمسطرة وتضيع وقت العيادة.. أودونتو بيحلل أشعة السيفالو والبانوراما بضغطة زرار واحدة، ويحسب زوايا العظم والأسنان، ويطلعلك خطة علاج تنفيذية متكاملة خطوة بخطوة: مقاسات الأسلاك، المطاطات، قرار الخلع مبرر علمياً، ومقاسات الزرعات بدقة متناهية وبدون أي هلوسة.',
      launchStudioBtn: 'فتح استوديو العلاج وتجربة حالة',
      exploreImplantsBtn: 'استكشاف استوديو زراعة الأسنان',
      trustItems: [
        'تتبع وشَفّ السيفالومتريك في 5 ثوانٍ (Steiner & Tweed)',
        'حساب تسلسل الأسلاك وقوى الشد بيوميكانيكياً',
        'حسم قرار الخلع ومسافة أمان عصب الفك (2 مم عن IAN)',
        'صفر هلوسة طبية — كل رقم موثق بأبحاث PubMed'
      ],
      previewTitle: 'Odonto AI — استوديو التخطيط السريري المباشر',
      activeCaseBadge: 'حالة تجريبية نشطة: عضة معكوسة صنف ثالث (Class III Underbite)',
      layers: [
        { num: 1, name: 'تتبع السيفالومتريك', sub: 'زاوية ANB -3.2° / ويتس -4 مم' },
        { num: 2, name: 'تجزئة البانوراما OPG', sub: 'فحص وترقيم 32 سن بنظام FDI' },
        { num: 3, name: 'التصريح اللثوي AI', sub: 'تأكيد سلامة العظم وخلو الجيوب' },
        { num: 4, name: 'ميزانية الفراغ وبولتون', sub: 'نسبة بولتون الأمامية 77.2%' },
        { num: 5, name: 'حدود العظم القشري', sub: 'حماية القواطع داخل العظم IMPA' },
        { num: 6, name: 'الاستدلال السريري CoT', sub: 'موازنة الجراحة مع التمويه التقويمي' },
        { num: 7, name: 'تخليق خطة العلاج', sub: 'تسلسل الأسلاك والمطاطات والمثبتات' }
      ],
      diagTitle: 'التشخيص الهيكلي السيفالومتري للحالة',
      skeletalClassBadge: 'صنف ثالث هيكلي (Skeletal Class III)',
      anbLabel: 'زاوية ANB',
      anbValue: '-3.2° (الطبيعي: 2°)',
      witsLabel: 'مؤشر ويتس (Wits)',
      witsValue: '-4.0 مم',
      overjetLabel: 'البروز الأفقي (Overjet)',
      overjetValue: '-4.0 مم (عضة معكوسة)',
      diagDesc: 'بروز واضح في الفك السفلي مع عضة أمامية معكوسة. يوصي النظام بإلغاء التعويض السنّي (Decompensation) متبوعاً بجراحة فكين لتقديم الفك العلوي وتأخير السفلي (BSSO + Le Fort I).',
      planTitle: 'الخطة البيوميكانيكية المتكاملة المخلّقة',
      stagedBadge: 'ميكانيكا مرحلية متدرجة',
      p1Phase: 'مرحلة 1:',
      p1Desc: 'الرصف والتسوية — أسلاك CuNiTi حرارية من 0.014 إلى 0.018 (6 أشهر)',
      p2Phase: 'مرحلة 2:',
      p2Desc: 'إلغاء التعويض السني — سلك صلب SS 0.019x0.025 مع مطاطات صنف ثالث Class III (8 أشهر)',
      sxPhase: 'الجراحة:',
      sxDesc: 'إرجاع الفك السفلي (BSSO 4.5 مم) + تقديم الفك العلوي (Le Fort I 2.0 مم)',
      estDuration: 'المدة التقديرية الإجمالية: 22-26 شهراً',
      openInStudio: 'فتح الحالة وتعديلها في الاستوديو'
    },
    why: {
      badge: 'ليه أودونتو مختلف عن أي برنامج تاني؟',
      title: 'مش مجرد شات بوت.. دي منظومة تشغيل سريرية متكاملة لعيادتك',
      cards: [
        {
          title: 'بيصنع خطة علاج تنفيذية مش مجرد كشف صوري',
          desc: 'البرامج التانية (زي Overjet و Pearl) بتعلم بمربع أحمر على التسوس وتقف.. أودونتو بيكمل المشوار: بيصنعلك خطة علاج كاملة من 6 مراحل، بتسلسل مقاسات الأسلاك، قوى المطاطات، التثبيت، وجدول المواعيد.',
          metric: 'المنافسون: صفر خطط علاج'
        },
        {
          title: 'خط فحص سباعي يضمن سلامة المريض وقانونية عيادتك',
          desc: 'كل حالة بتعدي على 7 طبقات فحص إجبارية: شَفّ السيفالو، فحص البانوراما، سلامة اللثة، حساب التزاحم وبولتون، حدود العظم القشري، الاستدلال السريري، وتخليق الخطة.',
          metric: '7 طبقات أمان بيولوجي'
        },
        {
          title: 'استوديو زراعة أسنان بدقة الميكرون',
          desc: 'بيختار مقاس الزرعة وطولها من كتالوجات 14 شركة عالمية، ويبعد 2 مم كاملين عن عصب الفك (IAN)، ويحسب كثافة العظم Misch D1-D4 وسرعة الدريل وعزم ربط البرغي بالنيوتن/سم.',
          metric: '14 كتالوج زراعة عالمي'
        },
        {
          title: 'أبحاث حية وموثقة لحظياً من PubMed',
          desc: 'كل خطوة وتوصية علاجية مدعومة بدراسات علمية من كبرى دوريات التقويم العالمية (AJODO و Angle Orthodontist و JCO) مربوطة لحظياً بمكتبة NCBI الطبية — مفيش أي كلام مرسل أو غير مثبت.',
          metric: 'توثيق سريري لحظي'
        },
        {
          title: 'صفر هلوسة طبية وتحقق فيزيائي صارم',
          desc: 'المنظومة مبنية بمعمارية مزدوجة: الذكاء الاصطناعي شغال فوق محرك رياضي وفيزيائي صارم. زوايا الجمجمة ومقاسات الأسلاك وقوى الشد بتتحسب بمعادلات دقيقة قبل صياغة التقرير.',
          metric: 'تحقق رياضي وفيزيائي 100%'
        },
        {
          title: '6 تخصصات سريرية في منصة واحدة متكاملة',
          desc: 'بيغطي جراحة تقويم الفكين، الألاينرز الشفافة، البراكتس الثابتة (MBT/Roth/Damon)، التقويم الوقائي للأطفال، زرعات التثبيت المؤقتة TADs، وزراعة الأسنان في بيئة عمل واحدة.',
          metric: '6 تخصصات سريرية'
        }
      ]
    },
    implants: {
      badge: 'التكامل السريري بين التقويم والزراعة',
      titleLine1: 'تخطيط زراعة الأسنان.',
      titleLine2: 'مقاسات آمنة وحماية تامة لعصب الفك والجيب الأنفي.',
      desc: 'انتقل بسلاسة من فتح مسافات التقويم لغرس الزرعات السنية. أودونتو بيقيس العظم المتاح في الأشعة المقطعية CBCT، ويحدد حاجة رفع الجيب الأنفي، ويديك تسلسل دريلات الحفر وعزم ربط البراغي بدقة الميكرون.',
      highlights: [
        '14 كتالوج معتمد لكبرى الشركات العالمية: Straumann, Nobel Biocare, Zimmer, Dentsply, BioHorizons, Osstem, MegaGen وغيرها',
        'محرك كثافة العظم Misch D1–D4 لتحديد سرعة الحفر والتبريد حسب وحدات هاونسفيلد (HU) لمنع احتراق خلايا العظم',
        'حاسبة رفع الجيب الأنفي الأوتوماتيكية: الرفع المغلق (OSFE Summers) لو العظم المتبقي ≥ 5 مم، أو الرفع المفتوح الجانبي لو أقل',
        'حساب عزم ربط براغي التركيبات بدقة (25-35 Ncm) ونسبة طول التاج إلى الزرعة (C/I Ratio) لتفادي تخلخل المسامير والكسر'
      ],
      ctaBtn: 'فتح استوديو تخطيط زراعة الأسنان',
      cardToothName: 'الضرس الأول العلوي الأيمن (#16)',
      cardToothRegion: 'الفك العلوي الخلفي (منطقة قاع الجيب الأنفي)',
      cardStatusBadge: 'مؤشر لرفع الجيب الأنفي المغلق (OSFE)',
      boneWidthLabel: 'عرض العظم المتاح',
      boneWidthStatus: 'آمن (≥ 5.5 مم)',
      boneHeightLabel: 'ارتفاع العظم المتبقي',
      boneHeightStatus: 'رفع مغلق OSFE بمقدار +3 مم',
      mischDensityLabel: 'كثافة العظم (Misch)',
      mischDensityVal: '550 HU (عظم مسامي D3)',
      recFixtureLabel: 'الزرعة الموصى بها:',
      primaryStabilityLabel: 'الثبات الأولي المتوقع:',
      prostheticConnLabel: 'اتصال الدعامة التعويضية:'
    },
    faq: {
      badge: 'الأسئلة السريرية الشائعة',
      title: 'الأسئلة اللي بيسألها كل طبيب أسنان',
      subtitle: 'إجابات واضحة ومباشرة مبنية على الأدلة السريرية عن إمكانيات أودونتو، وحدود الأمان الطبية، واستخداماته اليومية في العيادة.',
      items: [
        {
          q: 'ما الذي يقدمه أودونتو ولا تقدمه برمجيات مثل Overjet و Pearl؟',
          a: 'برمجيات Overjet و Pearl أدوات ممتازة لكشف التسوس وتآكل العظم في الأشعة السينية. لكنها تقف عند مجرد وضع مربع أحمر على التسوس وتنتهي وظيفتها هناك — لا تصنع خطة علاج، ولا تحسب زوايا السيفالو، ولا تفهم ميكانيكا حركة الأسنان، ولا تساعدك في اختيار مقاسات الزرعات. أودونتو يبدأ من حيث ينتهون: يأخذ الأشعة ويولد خطة علاج تنفيذية كاملة بمراحلها الست: تسلسل الأسلاك، قوى المطاطات، خوارزمية قرار الخلع المبررة، وبروتوكول التثبيت النهائي ومقاسات الزرعات.'
        },
        {
          q: 'ماذا يستطيع أودونتو فعله بصورة أشعة فقط (سيفالومتريك + بانوراما)؟',
          a: 'بمجرد رفع صورة أشعة السيفالو، يقوم أودونتو في 5 ثوانٍ بتحديد 16 نقطة تشريحية (Landmarks) وحساب كافة زوايا ستاينر وتويد وماكنمارا (SNA, SNB, ANB, Wits, FMA, IMPA) وتحديد نمط نمو الوجه (أفقي أم عمودي). ومع صورة البانوراما، يجزئ الـ 32 سناً، ويرصد الأنياب المطمورة، ويفحص توازي الجذور، ويقيس مستوى العظم اللثوي. ثم يدمج القياسين ليحدد لك فوراً: هل الحالة صنف أول أم ثانٍ أم ثالث؟ هل تحتاج خلعاً؟ وما تسلسل الأسلاك الأنسب لحركتها؟'
        },
        {
          q: 'هل يغير الذكاء الاصطناعي قراراتك السريرية؟ وكيف يتجنب أودونتو الردود الروبوتية الجافة؟',
          a: 'أودونتو مصمم ليكون "مساعداً سريرياً موثوقاً" وليس بديلاً عن عقل الطبيب. لتجنب الردود الروبوتية السطحية، تغذي المنظومة عقلها السريري بأمهات مراجع التقويم والزراعة: ميكانيكا Proffit ومراكز المقاومة لـ Nanda، ووصفات MBT/Roth، وتصنيفات Misch D1-D4 للعظم، وأدلة ITI SAC للزراعة. المنظومة تشرح لك "لماذا" تم اختيار هذا الإجراء وما هي البدائل التي تم استبعادها وسبب استبعادها مع رابط البحث المحكم من PubMed.'
        },
        {
          q: 'هل تدعم المنظومة حالات جراحة تقويم الفكين (Orthognathic Surgery)؟',
          a: 'نعم بكل تأكيد وبدقة فائقة. تشمل المنظومة بروتوكولات جراحية مفصلة لعمليات قص عظم الفك العلوي Le Fort I (للتقديم والرفع وتعديل الميلان)، وعمليات قص عظم الفك السفلي BSSO (للتقديم والتأخير)، وعمليات تجميل الذقن (Genioplasty)، وبروتوكول الجراحة أولاً (Surgery-First Approach) المستفيد من ظاهرة تسريع حركة الأسنان الحيوية (RAP). كما تحسب تلقائياً أهداف إزالة التعويض السني (Decompensation) وتنسيق عرض القوسين قبل الجراحة.'
        },
        {
          q: 'كيف تضمن المنظومة عدم إصابة عصب الفك السفلي (IAN) أثناء زراعة الأسنان؟',
          a: 'يفرض المحرك الجراحي في أودونتو قاعدة أمان صلبة غير قابلة للتجاوز: الحفاظ على مسافة أمان لا تقل عن 2.0 مم فوق القناة العصبية للفك السفلي (IAN Canal)، وسماكة لا تقل عن 1.5 مم من العظم القشري الدهليزي. يقرأ النظام قياسات الارتفاع والعرض من الأشعة المقطعية CBCT ويختار تلقائياً أبعاد الزرعة (القطر والطول) من كتالوجات 14 شركة معتمدة بما يضمن ثباتاً أولياً كافياً (ISQ) دون الاقتراب من مسار العصب، مما يحميك من أي مضاعفات أو تنميل دائم للمريض.'
        },
        {
          q: 'كيف تمنع أودونتو الهلوسة الطبية واختراع أرقام عشوائية؟',
          a: 'على عكس نماذج الذكاء الاصطناعي العامة التي قد تخترع أرقاماً غير واقعية، تعمل أودونتو بمعمارية محرك مزدوج (Dual-Engine Architecture): طبقة استدلال ذكية مدعومة بمحرك بيوميكانيكي حتمي. كافة زوايا السيفالومتريك (SNA, SNB, ANB, Wits)، ومحيط القوس، ونسب بولتون، وتدرج الأسلاك تخضع لمعادلات رياضية وفيزيائية حتمية قبل أن يتدخل الذكاء الاصطناعي لصياغة التقرير.'
        }
      ]
    },
    finalCta: {
      badge: 'جاهز للاستخدام السريري الفوري في عيادتك',
      title: 'جاهز تختبر أودونتو في عيادتك اليوم؟',
      subtitle: 'انضم لمئات أطباء وجراحي الأسنان اللي بيعتمدوا على Odonto AI لتخليق خطط علاج متكاملة ومدعومة بأحدث الأبحاث العلمية في ثوانٍ معدودة.',
      launchStudioBtn: 'فتح استوديو العلاج وتجربة حالة فوراً',
      exploreImplantsBtn: 'تجربة استوديو الزراعة',
      note: 'منظومة سحابية بالكامل • لا تحتاج برامج معقدة أو دونجل • معتمدة على أدلة وبراهين طبية محكمة'
    }
  }
};
