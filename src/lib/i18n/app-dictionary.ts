// Odonto AI — Global Application Bilingual Dictionary (English & Egyptian Arabic Medical Terminology)

import { StudioLanguage } from './studio-dictionary';

export interface AppTranslations {
  // Navigation & Shell
  nav: {
    brandSubtitle: string;
    treatmentStudio: string;
    treatmentStudioBadge: string;
    implantPlanning: string;
    implantPlanningBadge: string;
    patients: string;
    dashboard: string;
    treatmentPlans: string;
    comparisonStudio: string;
    knowledgeBase: string;
    referenceSection: string;
    resourcesReferences: string;
    clinicianName: string;
    clinicianTitle: string;
  };

  // Global Header
  header: {
    suiteTitle: string;
    suiteSubtitle: string;
    treatmentStudioBtn: string;
    newPatientBtn: string;
    newPatientShort: string;
    studioShort: string;
  };

  // Footer
  footer: {
    tagline: string;
    developedBy: string;
    company: string;
  };

  // Dashboard Page
  dashboard: {
    badge: string;
    welcomeBack: string;
    welcomeSub: string;
    openStudioBtn: string;
    newPatientIntakeBtn: string;
    knowledgeLibBtn: string;

    // KPI Cards
    activePatientsLabel: string;
    recordsUnit: string;
    addedThisWeek: string;
    aiStudioLabel: string;
    liveSynthesis: string;
    liveSynthesisSub: string;
    stagedPlansLabel: string;
    plansGenerated: string;
    plansSub: string;
    clinicalAccuracyLabel: string;
    accuracyRate: string;
    accuracySub: string;

    // Instant Case Biomechanics
    instantTitle: string;
    instantSubtitle: string;
    viewAllInStudio: string;
    synthesizePlanBtn: string;

    cases: {
      class2Title: string;
      class2Subtitle: string;
      class2Desc: string;
      class3Title: string;
      class3Subtitle: string;
      class3Desc: string;
      openBiteTitle: string;
      openBiteSubtitle: string;
      openBiteDesc: string;
      crowdingTitle: string;
      crowdingSubtitle: string;
      crowdingDesc: string;
    };

    // Recent Patients Table
    tableTitle: string;
    tableSubtitle: string;
    colPatient: string;
    colClassification: string;
    colComplaint: string;
    colMeasurements: string;
    colAction: string;
    planStudioAction: string;
  };

  // Implant Planning Studio Page
  implants: {
    pageTitle: string;
    pageSubtitle: string;
    generatePlanBtn: string;
    generatingText: string;
    tourBtn: string;
    presetsLabel: string;
    presets: {
      anterior: string;
      posteriorSinus: string;
      mandibularMolar: string;
      immediateSocket: string;
    };
    patientInfoTitle: string;
    siteParamsTitle: string;
    medicalProfileTitle: string;
    boneDensityLabel: string;
    boneWidthLabel: string;
    boneHeightLabel: string;
    immediateSocketToggle: string;
    implantBrandLabel: string;
  };

  // Patients Directory Page
  patientsPage: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    newPatientBtn: string;
    allFilter: string;
    activeFilter: string;
    completedFilter: string;
    colName: string;
    colAgeGender: string;
    colAngleClass: string;
    colChiefComplaint: string;
    colStatus: string;
    colLastVisit: string;
    colActions: string;
    viewCase: string;
    launchPlan: string;
  };

  // Treatment Plans Directory Page
  plansPage: {
    title: string;
    subtitle: string;
    createNewBtn: string;
    searchPlaceholder: string;
    colPlanTitle: string;
    colPatient: string;
    colModality: string;
    colStatus: string;
    colPhases: string;
    colLastUpdated: string;
    colActions: string;
    viewPlan: string;
  };

  // Comparison Studio Page
  comparePage: {
    title: string;
    subtitle: string;
    selectPlan1: string;
    selectPlan2: string;
    sideBySideTitle: string;
    tradeoffsTitle: string;
    recommendationTitle: string;
    compareBtn: string;
  };

  // Knowledge Base Page
  knowledgePage: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    tabBiomechanics: string;
    tabAppliances: string;
    tabImplants: string;
    tabEvidence: string;
    tabCephNorms: string;
    exploreLibrary: string;
  };
}

export const APP_DICTIONARY: Record<StudioLanguage, AppTranslations> = {
  en: {
    nav: {
      brandSubtitle: 'Orthodontic SaaS',
      treatmentStudio: 'Treatment Studio',
      treatmentStudioBadge: 'Main',
      implantPlanning: 'Implant Planning',
      implantPlanningBadge: 'New',
      patients: 'Patients',
      dashboard: 'Dashboard',
      treatmentPlans: 'Treatment Plans',
      comparisonStudio: 'Comparison Studio',
      knowledgeBase: 'Knowledge Base',
      referenceSection: 'Reference & Evidence',
      resourcesReferences: 'Resources & References',
      clinicianName: 'Dr. John Doe',
      clinicianTitle: 'Orthodontic Specialist'
    },
    header: {
      suiteTitle: 'Clinical Suite',
      suiteSubtitle: 'AI Treatment Planning & Biomechanics',
      treatmentStudioBtn: 'Treatment Studio',
      newPatientBtn: 'New Patient',
      newPatientShort: 'New',
      studioShort: 'Studio'
    },
    footer: {
      tagline: '7-Layer Clinical Orthodontic AI Suite',
      developedBy: 'Developed & Designed by',
      company: 'Recode Developments'
    },
    dashboard: {
      badge: 'Next-Gen Orthodontic SaaS • 7-Layer Biomechanical AI',
      welcomeBack: 'Welcome back,',
      welcomeSub: 'Odonto AI streamlines orthodontic diagnosis, cephalometric tracing, and staged biomechanical mechanics. Ground your extraction vs. non-extraction decisions in peer-reviewed clinical science.',
      openStudioBtn: 'Open Treatment Studio',
      newPatientIntakeBtn: '+ New Patient Intake',
      knowledgeLibBtn: 'Knowledge Library',

      activePatientsLabel: 'Active Patients',
      recordsUnit: 'Records',
      addedThisWeek: '+3 added this week',
      aiStudioLabel: '7-Layer AI Studio',
      liveSynthesis: 'Live Synthesis',
      liveSynthesisSub: 'Ceph • OPG • Biomechanics',
      stagedPlansLabel: 'Staged Treatment Plans',
      plansGenerated: 'Generated',
      plansSub: 'Extraction & Non-extraction',
      clinicalAccuracyLabel: 'Clinical Accuracy',
      accuracyRate: '98.4%',
      accuracySub: 'PAR / Tweed Norms Validated',

      instantTitle: 'Instant Case Biomechanics (1-Click Test Scenarios)',
      instantSubtitle: 'Jump straight into the Treatment Studio with pre-configured malocclusion metrics:',
      viewAllInStudio: 'View All in Studio',
      synthesizePlanBtn: 'Synthesize Plan',

      cases: {
        class2Title: 'Class II Div 1',
        class2Subtitle: 'Severe Overjet & Deep Bite',
        class2Desc: 'Bilateral 1st premolar extraction with Maximum TPA anchorage & Class II elastics.',
        class3Title: 'Class III',
        class3Subtitle: 'Underbite & Reverse Overjet',
        class3Desc: 'Maxillary expansion (Hyrax RPE) + Petit reverse-pull protraction facemask.',
        openBiteTitle: 'Open Bite',
        openBiteSubtitle: 'Anterior Open Bite & Tongue Thrust',
        openBiteDesc: 'Posterior molar intrusion with aligners + lingual spurs for mandibular autorotation.',
        crowdingTitle: 'Severe Crowding',
        crowdingSubtitle: 'Arch Perimeter Crowding',
        crowdingDesc: 'Four 1st premolar extractions to protect lower labial cortical plate and IMPA 90°.'
      },

      tableTitle: 'Recent Orthodontic Patients',
      tableSubtitle: 'Select any patient to immediately evaluate their 7-layer plan',
      colPatient: 'Patient Name',
      colClassification: 'Classification',
      colComplaint: 'Chief Complaint',
      colMeasurements: 'Overjet / Overbite',
      colAction: 'Action',
      planStudioAction: 'Plan Studio'
    },
    implants: {
      pageTitle: 'Implant Planning Studio',
      pageSubtitle: '5-Layer deterministic surgical implant synthesizer with Misch D1–D4 bone classification & 14 fixture catalogs',
      generatePlanBtn: 'Generate Surgical Plan',
      generatingText: 'Synthesizing Surgical Plan...',
      tourBtn: 'Tour Guide',
      presetsLabel: 'Load Clinical Preset Scenarios:',
      presets: {
        anterior: 'Anterior Maxilla (#11 - Aesthetic Zone)',
        posteriorSinus: 'Posterior Maxilla (#16 - Sinus Lift)',
        mandibularMolar: 'Posterior Mandible (#36 - Dense D2)',
        immediateSocket: 'Immediate Socket (#21 - Elian Type 1)'
      },
      patientInfoTitle: 'Patient Demographics & Chief Complaint',
      siteParamsTitle: 'Anatomical Site & Bone Volume Parameters',
      medicalProfileTitle: 'Medical Risk Screening & Complications',
      boneDensityLabel: 'Bone Density Classification (Misch)',
      boneWidthLabel: 'Alveolar Crest Width (mm)',
      boneHeightLabel: 'Available Bone Height (mm)',
      immediateSocketToggle: 'Immediate Extraction Socket Protocol',
      implantBrandLabel: 'Preferred Implant System Catalog'
    },
    patientsPage: {
      title: 'Patient Clinical Records',
      subtitle: 'Manage orthodontic and implant patient profiles, clinical findings, and treatment trajectories',
      searchPlaceholder: 'Search patients by name, complaint, or angle class...',
      newPatientBtn: 'New Patient Intake',
      allFilter: 'All Cases',
      activeFilter: 'Active Treatment',
      completedFilter: 'Retention / Completed',
      colName: 'Patient Name',
      colAgeGender: 'Age & Biological Sex',
      colAngleClass: 'Angle Malocclusion',
      colChiefComplaint: 'Chief Complaint',
      colStatus: 'Clinical Status',
      colLastVisit: 'Last Record Date',
      colActions: 'Actions',
      viewCase: 'View Case',
      launchPlan: 'Launch Studio'
    },
    plansPage: {
      title: 'Master Treatment Plans',
      subtitle: 'Comprehensive multi-phase staged orthodontic biomechanics and surgical implantology plans',
      createNewBtn: 'Synthesize New Plan',
      searchPlaceholder: 'Search treatment plans by patient, prescription, or date...',
      colPlanTitle: 'Plan Title & Prescription',
      colPatient: 'Patient Name',
      colModality: 'Treatment Modality',
      colStatus: 'Plan Status',
      colPhases: 'Active Phase',
      colLastUpdated: 'Last Generated',
      colActions: 'Actions',
      viewPlan: 'Open in Studio'
    },
    comparePage: {
      title: 'Treatment Alternative Comparison Studio',
      subtitle: 'Side-by-side biomechanical evaluation of extraction vs non-extraction, aligners vs fixed, and surgical options',
      selectPlan1: 'Select Primary Plan Option (e.g. Non-Extraction Fixed MBT)',
      selectPlan2: 'Select Alternative Plan Option (e.g. 4-Premolar Extraction Aligners)',
      sideBySideTitle: 'Side-by-Side Biomechanical Metrics Matrix',
      tradeoffsTitle: 'Clinical Trade-offs, Facial Aesthetics & Biological Risks',
      recommendationTitle: 'Consensus Clinical Decision Recommendation',
      compareBtn: 'Run Comparative Analysis'
    },
    knowledgePage: {
      title: 'Clinical Orthodontic & Implant Knowledge Base',
      subtitle: 'Comprehensive peer-reviewed reference database: wire progressions, bracket prescriptions, elastics, and bone biology',
      searchPlaceholder: 'Search clinical knowledge base (e.g. MBT torque, Class II elastics, Misch D2, Alt-RAMEC)...',
      tabBiomechanics: 'Biomechanical Mechanics',
      tabAppliances: 'Bracket Systems & Wires',
      tabImplants: 'Implant Catalogs & Bone',
      tabEvidence: 'PubMed Evidence Grounding',
      tabCephNorms: 'Cephalometric Norms',
      exploreLibrary: 'Explore Complete Library'
    }
  },

  ar: {
    nav: {
      brandSubtitle: 'برمجيات التقويم والزراعة',
      treatmentStudio: 'استوديو تخطيط التقويم',
      treatmentStudioBadge: 'الرئيسي',
      implantPlanning: 'تخطيط زراعة الأسنان',
      implantPlanningBadge: 'جديد',
      patients: 'سجلات المرضى',
      dashboard: 'لوحة التحكم الإكلينيكية',
      treatmentPlans: 'خطط العلاج المعتمدة',
      comparisonStudio: 'مقارنة البدائل العلاجية',
      knowledgeBase: 'قاعدة المعرفة السريرية',
      referenceSection: 'المراجع والأبحاث السريرية',
      resourcesReferences: 'المصادر والأبحاث المحكمة',
      clinicianName: 'د. جون دو',
      clinicianTitle: 'استشاري تقويم الأسنان والفكين'
    },
    header: {
      suiteTitle: 'المنظومة السريرية',
      suiteSubtitle: 'تخطيط التقويم والبيوميكانيكا بالذكاء الاصطناعي',
      treatmentStudioBtn: 'استوديو التقويم',
      newPatientBtn: 'إدخال مريض جديد',
      newPatientShort: 'مريض جديد',
      studioShort: 'الاستوديو'
    },
    footer: {
      tagline: 'أودونتو • المنظومة السريرية الذكية سباعية الطبقات للتقويم والزراعة',
      developedBy: 'تطوير وتصميم',
      company: 'ريكود للحلول البرمجية المتطورة'
    },
    dashboard: {
      badge: 'الجيل القادم لبرمجيات التقويم • ذكاء بيوميكانيكي سباعي الطبقات',
      welcomeBack: 'مرحباً بك يا دكتور،',
      welcomeSub: 'منظومة أودونتو تيسر التشخيص التقويمي السليم، التتبع السيفالومتري الآلي، وتسلسل الميكانيكا الحركية. اتخذ قرارات الخلع والمحافظة على الأسنان استناداً إلى أحدث الأبحاث السريرية المحكمة.',
      openStudioBtn: 'فتح استوديو العلاج',
      newPatientIntakeBtn: '+ إدخال حالة جديدة',
      knowledgeLibBtn: 'مكتبة المعرفة السريرية',

      activePatientsLabel: 'المرضى النشطون بالعيادة',
      recordsUnit: 'سجلات',
      addedThisWeek: '+3 أضيفوا هذا الأسبوع',
      aiStudioLabel: 'استوديو الذكاء الاصطناعي',
      liveSynthesis: 'تخليق لحظي معتمد',
      liveSynthesisSub: 'سيفالومتريكس • بانوراما • بيوميكانيكا',
      stagedPlansLabel: 'خطط العلاج المرحلية',
      plansGenerated: 'خطة مخلقة',
      plansSub: 'حالات خلع وعلاج تحفظي',
      clinicalAccuracyLabel: 'الدقة السريرية المعتمدة',
      accuracyRate: '98.4%',
      accuracySub: 'معايير PAR وتويد المعتمدة',

      instantTitle: 'حالات بيوميكانيكية فورية (سيناريوهات اختبار بضغطة واحدة)',
      instantSubtitle: 'انتقل مباشرة إلى استوديو العلاج مع مقاييس إطباقية مبرمجة وجاهزة للاختبار:',
      viewAllInStudio: 'استعراض الكل في الاستوديو',
      synthesizePlanBtn: 'تخليق الخطة',

      cases: {
        class2Title: 'صنف ثانٍ تقسيم 1',
        class2Subtitle: 'بروز أفقي شديد وعضة عميقة',
        class2Desc: 'خلع ضواحك علوية أولى مع أقصى مرسى TPA ومطاط صنف ثانٍ لسحب القواطع.',
        class3Title: 'صنف ثالث',
        class3Subtitle: 'عضة معكوسة وبروز الفك السفلي',
        class3Desc: 'توسيع الفك العلوي (Hyrax RPE) مع قناع الشد العكسي للوجه (Facemask).',
        openBiteTitle: 'عضة مفتوحة',
        openBiteSubtitle: 'عضة أمامية مفتوحة ودفع اللسان',
        openBiteDesc: 'غرز الأضراس الخلفية بالقوالب الشفافة ومساند منع دفع اللسان لتدوير الفك السفلي.',
        crowdingTitle: 'تزاحم سنخي شديد',
        crowdingSubtitle: 'عجز حاد في محيط القوس السنخي',
        crowdingDesc: 'خلع 4 ضواحك لحماية الصفيحة العظمية السنخية وزاوية القواطع IMPA 90°.'
      },

      tableTitle: 'أحدث سجلات المرضى بالعيادة',
      tableSubtitle: 'اختر أي مريض لتقييم خطته العلاجية سباعية الطبقات فورياً',
      colPatient: 'اسم المريض',
      colClassification: 'تصنيف الإطباق',
      colComplaint: 'الشكوى الرئيسية',
      colMeasurements: 'البروز الأفقي / التراكب الرأسي',
      colAction: 'الإجراء المباشر',
      planStudioAction: 'استوديو الخطة'
    },
    implants: {
      pageTitle: 'استوديو تخطيط زراعة الأسنان وجراحة الفكين',
      pageSubtitle: 'محرك جراحي خماسي الطبقات مدعوم بتصنيف كثافة العظم Misch D1–D4 وكتالوجات 14 شركة زرعات عالمية',
      generatePlanBtn: 'توليد الخطة الجراحية بالذكاء الاصطناعي',
      generatingText: 'جاري توليد الخطة الجراحية...',
      tourBtn: 'جولة تعريفية',
      presetsLabel: 'سيناريوهات سريرية مبرمجة للاختبار الفوري:',
      presets: {
        anterior: 'الفك العلوي الأمامي (#11 - المنطقة الجمالية)',
        posteriorSinus: 'الفك العلوي الخلفي (#16 - رفع الجيب الأنفي)',
        mandibularMolar: 'الفك السفلي الخلفي (#36 - عظم كثيف D2)',
        immediateSocket: 'خلع وغرس فوري (#21 - تصنيف Elian 1)'
      },
      patientInfoTitle: 'بيانات المريض والشكوى الرئيسية',
      siteParamsTitle: 'موضع السن ومقاييس كتلة وكثافة العظم',
      medicalProfileTitle: 'الفحص الطبي وعوامل الخطورة وموانع الجراحة',
      boneDensityLabel: 'تصنيف كثافة العظم (Misch Bone Density)',
      boneWidthLabel: 'عرض الحافة السنخية (بالمليمتر)',
      boneHeightLabel: 'ارتفاع العظم المتاح فوق العصب أو الجيب (بالمليمتر)',
      immediateSocketToggle: 'بروتوكول الزراعة الفورية عقب الخلع',
      implantBrandLabel: 'كتالوج وماركة نظام الزرعات المفضل'
    },
    patientsPage: {
      title: 'سجلات المرضى والفحص السريري',
      subtitle: 'إدارة ملفات مرضى التقويم والزراعة، الفحوصات الإكلينيكية، ومتابعة تطور الحالات',
      searchPlaceholder: 'ابحث عن مريض بالاسم، الشكوى، أو تصنيف الحالة...',
      newPatientBtn: 'إدخال ملف مريض جديد',
      allFilter: 'جميع الحالات',
      activeFilter: 'علاج نشط بالعيادة',
      completedFilter: 'مرحلة التثبيت / منتهي',
      colName: 'اسم المريض',
      colAgeGender: 'العمر والنوع',
      colAngleClass: 'تصنيف سوء الإطباق',
      colChiefComplaint: 'الشكوى الرئيسية',
      colStatus: 'الحالة السريرية',
      colLastVisit: 'تاريخ آخر تسجيل',
      colActions: 'الإجراءات',
      viewCase: 'عرض الملف',
      launchPlan: 'استوديو الخطة'
    },
    plansPage: {
      title: 'سجل خطط العلاج المعتمدة',
      subtitle: 'استعراض خطط التقويم والبيوميكانيكا المرحلية وزراعة الأسنان المخلقة بالذكاء الاصطناعي',
      createNewBtn: 'تخليق خطة جديدة',
      searchPlaceholder: 'ابحث عن خطة باسم المريض، نوع الجهاز، أو التاريخ...',
      colPlanTitle: 'عنوان الخطة والوصفة التقويمية',
      colPatient: 'اسم المريض',
      colModality: 'نظام وتقنية العلاج',
      colStatus: 'حالة الخطة',
      colPhases: 'المرحلة النشطة',
      colLastUpdated: 'تاريخ التوليد',
      colActions: 'الإجراءات',
      viewPlan: 'فتح في الاستوديو'
    },
    comparePage: {
      title: 'استوديو مقارنة البدائل العلاجية',
      subtitle: 'تقييم بيوميكانيكي مقارن: خلع الضواحك مقابل المحافظة، التقويم الشفاف مقابل الثابت، والحلول الجراحية',
      selectPlan1: 'اختر البديل العلاجي الأول (مثال: تقويم ثابت MBT بدون خلع)',
      selectPlan2: 'اختر البديل العلاجي الثاني (مثال: تقويم شفاف مع خلع ضواحك)',
      sideBySideTitle: 'مصفوفة المقارنة البيوميكانيكية المتزامنة',
      tradeoffsTitle: 'الموازنات الإكلينيكية وجماليات الوجه ومخاطر الحركة السنية',
      recommendationTitle: 'التوصية السريرية المعتمدة وفقاً للأبحاث',
      compareBtn: 'تشغيل التحليل المقارن'
    },
    knowledgePage: {
      title: 'قاعدة المعرفة السريرية للتقويم والزراعة',
      subtitle: 'مرجع علمي محكم: تسلسل أسلاك التقويم، عزم البراكتات، مطاط الفكين، وعلم أحياء العظام والزرعات',
      searchPlaceholder: 'ابحث في قاعدة المعرفة (مثل: عزم MBT، مطاط صنف ثانٍ، كثافة Misch D2، Alt-RAMEC)...',
      tabBiomechanics: 'الميكانيكا الحركية',
      tabAppliances: 'أنظمة البراكتات والأسلاك',
      tabImplants: 'كتالوجات الزرعات والعظم',
      tabEvidence: 'أبحاث PubMed المحكمة',
      tabCephNorms: 'المعايير السيفالومترية',
      exploreLibrary: 'استكشاف المكتبة بالكامل'
    }
  }
};
