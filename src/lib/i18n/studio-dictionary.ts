// Odonto AI — Studio Bilingual Dictionary (English & Arabic Egyptian Medical Terminology)

export type StudioLanguage = 'en' | 'ar';

export interface PhaseTranslation {
  title: string;
  discipline: string;
  timeline: string;
  clinicalObjectives: string;
  interventions: string[];
  clearanceRequired: string;
}

export interface ToothRecommendationTranslation {
  condition: string;
  clinicalDecision: string;
  phase: string;
  urgency: 'high' | 'medium' | 'routine';
  protocolNotes: string;
}

export interface StudioTranslations {
  // Top Header
  studioTitle: string;
  studioSubtitle: string;
  synthesizeBtn: string;
  synthesizingText: string;
  quickWalkthroughBtn: string;
  tourBtn: string;
  intakeBtn: string;
  pipelineBadge: string;
  langSwitchEn: string;
  langSwitchAr: string;

  // 7 Layers Progress
  layerTitle: string;
  layers: {
    num: number;
    name: string;
    detail: string;
  }[];

  // Clinical Case Input Strip
  caseInputTitle: string;
  caseInputSubtitle: string;
  selectPatientTab: string;
  customPatientTab: string;
  patientRecordLabel: string;
  addNewPatient: string;
  clinicianLevelLabel: string;
  juniorModeBtn: string;
  seniorModeBtn: string;
  modalityLabel: string;
  modalities: {
    fixed_mbt: string;
    aligners: string;
    functional: string;
    surgical: string;
  };

  // Quick Presets
  presetsLabel: string;
  presetClass2: string;
  presetClass3: string;
  presetBimax: string;
  presetOpenBite: string;

  // Custom Patient Form
  fullNameLabel: string;
  fullNamePlaceholder: string;
  ageLabel: string;
  genderLabel: string;
  genderMale: string;
  genderFemale: string;
  complaintLabel: string;
  complaintPlaceholder: string;
  angleClassLabel: string;
  angleClasses: {
    class1: string;
    class2_1: string;
    class2_2: string;
    class3: string;
  };
  overjetLabel: string;
  overjetSub: string;
  overbiteLabel: string;
  overbiteSub: string;
  crowdingUpperLabel: string;
  crowdingOptions: {
    none: string;
    mild: string;
    moderate: string;
    severe: string;
  };
  impaLabel: string;
  clinicalBaselineLabel: string;

  // Diagnostic Tabs & Hub
  diagHubTitle: string;
  liveSyncBadge: string;
  tabCeph: string;
  tabOdontogram: string;
  tabPanoramic: string;
  tabBolton: string;
  tabModel3d: string;
  tabCephShort: string;
  tabOdontogramShort: string;
  tabPanoramicShort: string;
  tabBoltonShort: string;
  tabModel3dShort: string;

  // Plan Builder Section
  planTitle: string;
  planSubtitle: string;
  engineBadge: string;
  juniorModeToggle: string;
  consultantModeToggle: string;
  juniorBadge: string;
  seniorBadge: string;
  exportSummaryBtn: string;
  copiedBtn: string;
  copyBtn: string;
  modifyBtn: string;
  openImplantBtn: string;

  // Diagnostic Summary
  diagSummaryTitle: string;
  skeletalLabel: string;
  dentalLabel: string;
  softTissueLabel: string;
  
  // Objectives & Modality
  objectivesTitle: string;
  modalityTitle: string;
  primaryAppliance: string;
  prescriptionLabel: string;
  alternativesLabel: string;
  rationaleLabel: string;

  // Extraction Decision
  extractionTitle: string;
  extractionIndicated: string;
  nonExtractionIndicated: string;
  borderlineIndicated: string;
  teethToExtract: string;

  // Master 6 Phases
  masterPhasesTitle: string;
  masterPhasesSubtitle: string;
  phaseStatus: {
    completed: string;
    in_progress: string;
    scheduled: string;
    pending: string;
  };
  phaseLabels: {
    targetTeeth: string;
    objectives: string;
    interventions: string;
    clearance: string;
    notes: string;
  };

  // Plan Tabs & Sections
  tabs: {
    masterPhases: string;
    mechanics: string;
    wires: string;
    anchorage: string;
    retention: string;
    evidence: string;
    protocols: string;
  };
  mechanicsTitle: string;
  anchorageTitle: string;
  elasticsTitle: string;
  retentionTitle: string;
  specializedProtocolsTitle: string;
  evidenceTitle: string;
  viewPubmed: string;
  juniorPearlTitle: string;

  // Tooth Chart
  toothChartTitle: string;
  toothChartSubtitle: string;
  clickToUpdate: string;
  activeBrush: string;
  upperArch: string;
  lowerArch: string;
  statuses: {
    healthy: string;
    caries: string;
    restoration: string;
    missing: string;
    impacted: string;
    extraction_planned: string;
    tad_site: string;
  };
  summaryCounts: {
    extractions: string;
    tadSites: string;
    caries: string;
    missing: string;
  };
  decisionMatrixTitle: string;
  matrixFilters: {
    all: string;
    caries: string;
    ortho: string;
    implants: string;
  };
  matrixColumns: {
    tooth: string;
    condition: string;
    decision: string;
    phase: string;
    action: string;
  };
  actions: {
    directComposite: string;
    tad: string;
    spaceOpening: string;
    extraction: string;
    planImplant: string;
    logged: string;
  };

  // Bolton Card
  boltonTitle: string;
  boltonSubtitle: string;
  anteriorRatio: string;
  overallRatio: string;
  archDiscrepancy: string;
  upperArchSpace: string;
  lowerArchSpace: string;
  idealNorm: string;
  spaceDeficit: string;
  spaceExcess: string;
  boltonNormRef: string;
}

export const STUDIO_DICTIONARY: Record<StudioLanguage, StudioTranslations> = {
  en: {
    studioTitle: 'Treatment Planning Studio',
    studioSubtitle: 'Synthesizing evidence-based biomechanics, archwire progressions, and extraction protocols',
    synthesizeBtn: 'Synthesize Plan with AI',
    synthesizingText: 'Layer {X} of 7...',
    quickWalkthroughBtn: 'Quick Walkthrough',
    tourBtn: 'Tour Guide',
    intakeBtn: 'Intake',
    pipelineBadge: '7-Layer AI Pipeline',
    langSwitchEn: 'English',
    langSwitchAr: 'العربية',

    layerTitle: 'Layer',
    layers: [
      { num: 1, name: 'Ceph Tracing', detail: 'Skeletal ANB/Wits' },
      { num: 2, name: 'Panoramic OPG', detail: 'FDI Segmentation' },
      { num: 3, name: 'Pathology AI', detail: 'Pre-Ortho Clearance' },
      { num: 4, name: '3D Arch Space', detail: 'Bolton & Perimeter' },
      { num: 5, name: 'CBCT Boundary', detail: 'Cortical Limits' },
      { num: 6, name: 'Clinical CoT', detail: 'Orthodontic Logic' },
      { num: 7, name: 'Plan Synthesis', detail: 'Staged Biomechanics' },
    ],

    caseInputTitle: 'Clinical Case Input',
    caseInputSubtitle: '— Test with preset patients or enter custom numbers',
    selectPatientTab: 'Select Patient Case',
    customPatientTab: 'Custom Patient Form',
    patientRecordLabel: 'Patient Record',
    addNewPatient: 'Add New',
    clinicianLevelLabel: 'Clinician Experience Level',
    juniorModeBtn: 'Fresh Graduate (Rationale)',
    seniorModeBtn: 'Specialist (Concise)',
    modalityLabel: 'Target Modality Preference',
    modalities: {
      fixed_mbt: 'Fixed MBT 0.022" Appliance (Standard)',
      aligners: 'Clear Aligner Therapy (Staged Protocol)',
      functional: 'Functional Appliance (Twin Block / Herbst)',
      surgical: 'Combined Orthognathic Surgery'
    },

    presetsLabel: 'Load Preset Numbers:',
    presetClass2: 'Severe Class II (+8.5mm Overjet)',
    presetClass3: 'Class III Underbite (-4mm)',
    presetBimax: 'Bimaxillary Protrusion (+6mm)',
    presetOpenBite: 'Open Bite (-4.5mm)',

    fullNameLabel: 'Patient Name',
    fullNamePlaceholder: 'Patient full name',
    ageLabel: 'Age (Years)',
    genderLabel: 'Gender',
    genderMale: 'Male',
    genderFemale: 'Female',
    complaintLabel: 'Chief Complaint',
    complaintPlaceholder: 'Patient chief complaint',
    angleClassLabel: 'Angle Classification',
    angleClasses: {
      class1: 'Class I Malocclusion',
      class2_1: 'Class II Division 1 (Severe Overjet)',
      class2_2: 'Class II Division 2 (Deep Bite)',
      class3: 'Class III (Underbite / Crossbite)'
    },
    overjetLabel: 'Overjet (mm)',
    overjetSub: '(- for underbite, + for protrusion)',
    overbiteLabel: 'Overbite (mm)',
    overbiteSub: '(- for open bite, + for deep bite)',
    crowdingUpperLabel: 'Arch Crowding',
    crowdingOptions: {
      none: 'None / Spaced',
      mild: 'Mild (1–3mm)',
      moderate: 'Moderate (4–6mm)',
      severe: 'Severe (7mm+)'
    },
    impaLabel: 'Lower Incisor IMPA (degrees)',
    clinicalBaselineLabel: 'Clinical Baseline:',

    diagHubTitle: 'Diagnostic Records Hub',
    liveSyncBadge: 'Live Sync',
    tabCeph: 'Lateral Cephalometric (Tracing & Angles)',
    tabOdontogram: 'FDI Tooth Chart (Odontogram 11-48)',
    tabPanoramic: 'Panoramic Radiograph (Pathology Triage)',
    tabBolton: '3D Bolton Analysis (Tooth Size Discrepancy)',
    tabModel3d: '3D Dental Arch Setup (Interactive Three.js)',
    tabCephShort: 'Ceph',
    tabOdontogramShort: 'FDI Chart',
    tabPanoramicShort: 'OPG X-Ray',
    tabBoltonShort: 'Bolton',
    tabModel3dShort: '3D Model',

    planTitle: 'AI Clinical Treatment Studio',
    planSubtitle: 'Staged biomechanics, emergency-to-retention sequencing & live PubMed grounding',
    engineBadge: '6-Phase Master Engine',
    juniorModeToggle: 'Junior Mode: ON',
    consultantModeToggle: 'Consultant Mode',
    juniorBadge: 'Junior Mode (Educational Pearls & Guardrails Active)',
    seniorBadge: 'Senior Consultant Mode',
    exportSummaryBtn: 'Export Summary',
    copiedBtn: 'Copied to Clipboard!',
    copyBtn: 'Copy Plan',
    modifyBtn: 'Modify Plan',
    openImplantBtn: 'Open Implant Studio',

    diagSummaryTitle: 'Diagnostic Summary',
    skeletalLabel: 'Skeletal Pattern',
    dentalLabel: 'Dental Malocclusion',
    softTissueLabel: 'Soft Tissue & Profile',

    objectivesTitle: 'Treatment Objectives',
    modalityTitle: 'Treatment Modality & Prescription',
    primaryAppliance: 'Primary Appliance System',
    prescriptionLabel: 'Prescription',
    alternativesLabel: 'Alternatives Considered',
    rationaleLabel: 'Biomechanical Rationale',

    extractionTitle: 'Extraction vs Non-Extraction Decision',
    extractionIndicated: 'Extraction Indicated',
    nonExtractionIndicated: 'Non-Extraction Approach',
    borderlineIndicated: 'Borderline Case',
    teethToExtract: 'Prescribed Extraction Units:',

    masterPhasesTitle: 'Master 6-Phase Treatment Plan (Interdisciplinary Sequencing)',
    masterPhasesSubtitle: 'Sequential therapeutic staging from urgent stabilization through surgical implantology & retention',
    phaseStatus: {
      completed: 'Completed',
      in_progress: 'In Progress',
      scheduled: 'Scheduled',
      pending: 'Pending Clearance'
    },
    phaseLabels: {
      targetTeeth: 'Target Teeth:',
      objectives: 'Clinical Objectives:',
      interventions: 'Programmed Interventions:',
      clearance: 'Clearance Required to Proceed:',
      notes: 'Clinical Notes:'
    },

    tabs: {
      masterPhases: 'Master 6 Phases',
      mechanics: 'Staged Mechanics',
      wires: 'Wire Sequence',
      anchorage: 'Anchorage & TADs',
      retention: 'Dual Retention',
      evidence: 'Live PubMed RAG',
      protocols: 'Advanced Protocols'
    },
    mechanicsTitle: 'Mechanics Sequence & Archwire Progression',
    anchorageTitle: 'Anchorage Requirements & TAD Strategy',
    elasticsTitle: 'Intermaxillary Elastic Protocol',
    retentionTitle: 'Dual Retention & Stability Protocol',
    specializedProtocolsTitle: 'Specialized Biomechanical Protocols',
    evidenceTitle: 'Peer-Reviewed Scientific Evidence (Live PubMed RAG)',
    viewPubmed: 'View on PubMed',
    juniorPearlTitle: 'Clinical Pearl for Fresh Graduates',

    toothChartTitle: 'Interactive FDI Odontogram',
    toothChartSubtitle: 'Interactive tooth charting with decision synthesis going beyond basic disease detection',
    clickToUpdate: 'Click tooth to update condition',
    activeBrush: 'Active Brush:',
    upperArch: 'Upper Arch (Maxillary) — Right to Left',
    lowerArch: 'Lower Arch (Mandibular) — Right to Left',
    statuses: {
      healthy: 'Sound / Healthy',
      caries: 'Active Caries',
      restoration: 'Restored',
      missing: 'Missing / Edentulous',
      impacted: 'Impacted',
      extraction_planned: 'Extraction Planned',
      tad_site: 'TAD Anchorage Site'
    },
    summaryCounts: {
      extractions: 'Extractions:',
      tadSites: 'TAD Sites:',
      caries: 'Caries to Restore:',
      missing: 'Missing / Implants:'
    },
    decisionMatrixTitle: 'Affected Tooth Decision Matrix (Beyond Disease Detection)',
    matrixFilters: {
      all: 'All',
      caries: 'Restorative',
      ortho: 'Ortho',
      implants: 'Implants'
    },
    matrixColumns: {
      tooth: 'Tooth (FDI)',
      condition: 'Finding Detected',
      decision: 'Synthesized Clinical Decision',
      phase: 'Phase Assignment',
      action: 'Action'
    },
    actions: {
      directComposite: 'Direct Composite',
      tad: 'TAD Miniscrew',
      spaceOpening: 'Open Space',
      extraction: 'Extract',
      planImplant: 'Plan',
      logged: 'Logged'
    },

    boltonTitle: '3D Bolton & Arch Perimeter Discrepancy',
    boltonSubtitle: 'Tooth-size ratio analysis & space requirement calculations',
    anteriorRatio: 'Anterior Ratio (3-3)',
    overallRatio: 'Overall Ratio (6-6)',
    archDiscrepancy: 'Arch Space Discrepancy',
    upperArchSpace: 'Upper Arch Space',
    lowerArchSpace: 'Lower Arch Space',
    idealNorm: 'Ideal Norm',
    spaceDeficit: 'Deficit (Crowding)',
    spaceExcess: 'Excess (Spacing)',
    boltonNormRef: 'Bolton 1958 Norms'
  },

  ar: {
    studioTitle: 'استوديو تخليق خطط علاج التقويم والزراعة',
    studioSubtitle: 'محرك تخليق بيوميكانيكي هجين يدمج تسلسل أسلاك التقويم، قرارات الخلع، وزراعة الأسنان بالأبحاث الحية',
    synthesizeBtn: 'تخليق الخطة بالذكاء الاصطناعي',
    synthesizingText: 'جاري المعالجة: الطبقة {X} من ٧...',
    quickWalkthroughBtn: 'جولة سريعة في الاستوديو',
    tourBtn: 'جولة تعريفية',
    intakeBtn: 'إدخال مريض',
    pipelineBadge: 'محرك ذكاء اصطناعي سباعي الطبقات',
    langSwitchEn: 'English',
    langSwitchAr: 'العربية (مصر)',

    layerTitle: 'الطبقة',
    layers: [
      { num: 1, name: 'التتبع السيفالومتري', detail: 'هيكلي ANB / Wits' },
      { num: 2, name: 'أشعة بانوراما OPG', detail: 'ترقيم FDI للأسنان' },
      { num: 3, name: 'فحص الأمراض AI', detail: 'أمان ما قبل التقويم' },
      { num: 4, name: 'مساحة القوس 3D', detail: 'تحليل بولتون والمحيط' },
      { num: 5, name: 'حدود الـ CBCT', detail: 'حدود العظم القشري' },
      { num: 6, name: 'التفكير السريري CoT', detail: 'منطق وخوارزميات التقويم' },
      { num: 7, name: 'تخليق الخطة النهائية', detail: 'المراحل البيوميكانيكية' },
    ],

    caseInputTitle: 'إدخال ومراجعة الحالة السريرية',
    caseInputSubtitle: '— اختبر بحالات مرضى جاهزة ومبرمجة أو أدخل أرقاماً وقياسات مخصصة',
    selectPatientTab: 'اختيار حالة مريض مسجل',
    customPatientTab: 'نموذج مريض مخصص',
    patientRecordLabel: 'ملف وسجل المريض',
    addNewPatient: 'إضافة مريض جديد',
    clinicianLevelLabel: 'مستوى خبرة الطبيب المعالج',
    juniorModeBtn: 'طبيب امتياز / خريج (إرشادات تفصيلية)',
    seniorModeBtn: 'استشاري / أخصائي (موجز ومكثف)',
    modalityLabel: 'تقنية ونظام العلاج المفضل',
    modalities: {
      fixed_mbt: 'تقويم ثابت معدني - وصفة MBT 0.022" سابقة الضبط',
      aligners: 'قوالب التقويم الشفافة (الألاينرز مع ضبط السرعة)',
      functional: 'أجهزة وظيفية لتعديل النمو (توين بلوك / هيربست)',
      surgical: 'تقويم جراحي هيكلي للفكين (لوفورت 1 / BSSO)'
    },

    presetsLabel: 'حالات سريرية جاهزة للاختبار:',
    presetClass2: 'صنف ثانٍ تقسيم 1 (بروز أفقي +8.5 مم)',
    presetClass3: 'صنف ثالث عضة معكوسة (-4 مم)',
    presetBimax: 'بروز ثنائي في الفكين (+6 مم)',
    presetOpenBite: 'عضة أمامية مفتوحة (-4.5 مم)',

    fullNameLabel: 'اسم المريض بالكامل',
    fullNamePlaceholder: 'اسم المريض ثلاثي',
    ageLabel: 'العمر (بالسنوات)',
    genderLabel: 'النوع البيولوجي',
    genderMale: 'ذكر',
    genderFemale: 'أنثى',
    complaintLabel: 'الشكوى الرئيسية للمريض (Chief Complaint)',
    complaintPlaceholder: 'مثال: بروز شديد في الأسنان العلوية، صعوبة في القضم والعض...',
    angleClassLabel: 'تصنيف إنجل للإطباق (Angle Classification)',
    angleClasses: {
      class1: 'صنف أول (Class I Malocclusion)',
      class2_1: 'صنف ثانٍ تقسيم 1 (بروز أفقي حاد)',
      class2_2: 'صنف ثانٍ تقسيم 2 (عضة عميقة وانكفاء)',
      class3: 'صنف ثالث (عضة معكوسة سفلية)'
    },
    overjetLabel: 'البروز الأفقي (أوفرجت بالمليمتر - Overjet)',
    overjetSub: '(- للعضة المعكوسة، + للبروز الأفقي)',
    overbiteLabel: 'التراكب الرأسي (أوفربايت بالمليمتر - Overbite)',
    overbiteSub: '(- للعضة المفتوحة، + للعضة العميقة)',
    crowdingUpperLabel: 'شدة تزاحم الفك العلوي (Crowding)',
    crowdingOptions: {
      none: 'منعدم / مسافات بينية',
      mild: 'خفيف (1–3 مم)',
      moderate: 'متوسط (4–6 مم)',
      severe: 'شديد (7 مم فأكثر)'
    },
    impaLabel: 'زاوية ميلان القواطع السفلية (IMPA بالدرجات)',
    clinicalBaselineLabel: 'القياسات السريرية المبدئية:',

    diagHubTitle: 'مركز الأشعة والتشخيص السريري الذكي',
    liveSyncBadge: 'مزامنة لحظية',
    tabCeph: 'التحليل السيفالومتري (النقاط والزوايا)',
    tabOdontogram: 'مخطط الأسنان التفاعلي FDI (11–48)',
    tabPanoramic: 'أشعة البانوراما (فرز الآفات والأمراض)',
    tabBolton: 'تحليل بولتون 3D (تناسق أحجام الأسنان ومحيط القوس)',
    tabModel3d: 'مجسم الأسنان ثلاثي الأبعاد (WebGL Three.js)',
    tabCephShort: 'سيفالومتريكس',
    tabOdontogramShort: 'شارت FDI',
    tabPanoramicShort: 'بانوراما OPG',
    tabBoltonShort: 'بولتون',
    tabModel3dShort: 'مجسم 3D',

    planTitle: 'استوديو خطة علاج التقويم والزراعة المعتمدة',
    planSubtitle: 'بيوميكانيكا مرحلية متكاملة، تسلسل من الطوارئ حتى التثبيت المزدوج مع توثيق PubMed',
    engineBadge: 'محرك المراحل الست الرئيسية',
    juniorModeToggle: 'نمط الامتياز: مفعل',
    consultantModeToggle: 'نمط الاستشاري',
    juniorBadge: 'نمط طبيب الامتياز (إرشادات الأمان السريرية والشروح الأكاديمية مفعلة)',
    seniorBadge: 'نمط الاستشاري الخبير (عرض مكثف ومباشر)',
    exportSummaryBtn: 'تصدير الملخص السريري',
    copiedBtn: 'تم نسخ التقرير بنجاح!',
    copyBtn: 'نسخ التقرير',
    modifyBtn: 'تعديل الميكانيكا',
    openImplantBtn: 'فتح استوديو الزراعة',

    diagSummaryTitle: 'التشخيص السريري الشامل (Diagnosis Summary)',
    skeletalLabel: 'التشخيص الهيكلي للفكين (Skeletal)',
    dentalLabel: 'التشخيص السني والإطباقي (Dental)',
    softTissueLabel: 'الأنسجة الرخوة ومظهر الوجه والشفاه (Soft Tissue)',

    objectivesTitle: 'الأهداف السريرية المحددة للعلاج (Treatment Objectives)',
    modalityTitle: 'نظام وتقنية العلاج ووصفة البراكتات (Modality & Prescription)',
    primaryAppliance: 'نظام العلاج الأساسي المعتمد',
    prescriptionLabel: 'وصفة وعزم البراكتات (Prescription)',
    alternativesLabel: 'البدائل العلاجية المدروسة',
    rationaleLabel: 'المبرر السريري والبيوميكانيكي',

    extractionTitle: 'قرار الخلع العلاجي مقابل المحافظة على الأسنان (Extraction Decision)',
    extractionIndicated: 'خلع علاجي مطلوب حتمياً',
    nonExtractionIndicated: 'علاج تحفظي بدون خلع (Non-Extraction)',
    borderlineIndicated: 'حالة حدودية حرجة (Borderline)',
    teethToExtract: 'الأسنان الموصى بخلعها علاجياً:',

    masterPhasesTitle: 'محرك خطة العلاج الرئيسي ذو الـ 6 مراحل (Interdisciplinary Sequencing)',
    masterPhasesSubtitle: 'تسلسل علاجي تكاملي صارم يبدأ بتسكين الألم حتى الزراعة والتثبيت النهائي',
    phaseStatus: {
      completed: 'مكتملة ومحققة ✓',
      in_progress: 'قيد التنفيذ حالياً ●',
      scheduled: 'مجدولة قريباً ⏱',
      pending: 'معلقة لحين استيفاء شروط الأمان'
    },
    phaseLabels: {
      targetTeeth: 'الأسنان المستهدفة:',
      objectives: 'الأهداف السريرية للمرحلة:',
      interventions: 'التدخلات العلاجية المبرمجة:',
      clearance: 'شرط الأمان للانتقال للمرحلة التالية:',
      notes: 'ملاحظات وتوجيهات إكلينيكية:'
    },

    tabs: {
      masterPhases: 'المراحل الست الرئيسية',
      mechanics: 'الميكانيكا المرحلية',
      wires: 'تسلسل الأسلاك',
      anchorage: 'المرسى وزرعات TAD',
      retention: 'التثبيت المزدوج',
      evidence: 'أبحاث PubMed الحية',
      protocols: 'البروتوكولات التخصصية'
    },
    mechanicsTitle: 'تسلسل مراحل الميكانيكا وتدرج أسلاك التقويم (Wire Progression)',
    anchorageTitle: 'خطة التحكم في المرسى العظمي والزرعات الدقيقة (Anchorage & TADs)',
    elasticsTitle: 'بروتوكول المطاط التقويمي بين الفكين (Intermaxillary Elastics)',
    retentionTitle: 'بروتوكول التثبيت النهائي المزدوج (Dual Retention Protocol)',
    specializedProtocolsTitle: 'بروتوكولات تقويمية وجراحية متقدمة مخصصة للحالة',
    evidenceTitle: 'المراجع والأبحاث السريرية المحكمة الداعمة (Live PubMed RAG)',
    viewPubmed: 'عرض البحث في PubMed',
    juniorPearlTitle: 'توجيه إكلينيكي لطبيب الامتياز والخريج (Clinical Pearl)',

    toothChartTitle: 'مخطط الأسنان التفاعلي بنظام FDI الدولي (الأسنان 11–48)',
    toothChartSubtitle: 'تشخيص تفاعلي للأسنان مع تخليق فوري للقرارات السريرية يتجاوز مجرد كشف الأمراض',
    clickToUpdate: 'اضغط على السن لتعديل حالته وتشخيصه',
    activeBrush: 'أداة التحديد النشطة:',
    upperArch: 'الفك العلوي (Maxillary) — من اليمين إلى اليسار',
    lowerArch: 'الفك السفلي (Mandibular) — من اليمين إلى اليسار',
    statuses: {
      healthy: 'سليم تماماً',
      caries: 'تسوس نشط',
      restoration: 'حشو ترميمي سليم',
      missing: 'مفقود / خالع',
      impacted: 'سن مدفون / غير بازغ',
      extraction_planned: 'خلع علاجي مخطط',
      tad_site: 'موقع زرع مسمار تقويمي (TAD)'
    },
    summaryCounts: {
      extractions: 'خلع علاجي:',
      tadSites: 'مسامير TAD:',
      caries: 'تسوسات للعلاج:',
      missing: 'أسنان مفقودة / زراعة:'
    },
    decisionMatrixTitle: 'مصفوفة القرارات السريرية للأسنان (تحويل نتائج الفحص إلى خطة عمل)',
    matrixFilters: {
      all: 'الكل',
      caries: 'الحشوات',
      ortho: 'التقويم',
      implants: 'الزراعة'
    },
    matrixColumns: {
      tooth: 'السن (FDI)',
      condition: 'العلامة المرضية بالأشعة',
      decision: 'القرار السريري المخلق',
      phase: 'المرحلة العلاجية',
      action: 'الإجراء المباشر'
    },
    actions: {
      directComposite: 'حشو كمبوزيت مباشر',
      tad: 'زرع مسمار تقويم TAD',
      spaceOpening: 'فتح مسافة تقويمية',
      extraction: 'خلع علاجي',
      planImplant: 'تخطيط الزرعة',
      logged: 'مسجل بالنظام'
    },

    boltonTitle: 'تحليل بولتون 3D وتناسق أحجام الأسنان ومحيط القوس',
    boltonSubtitle: 'حساب نسب الأسنان الهندسية وفحص العجز أو الفائض في مساحة الفك',
    anteriorRatio: 'نسبة بولتون للأسنان الأمامية (3-3)',
    overallRatio: 'نسبة بولتون الكلية لجميع الأسنان (6-6)',
    archDiscrepancy: 'العجز أو الفائض في مساحة القوس (Discrepancy)',
    upperArchSpace: 'مساحة الفك العلوي',
    lowerArchSpace: 'مساحة الفك السفلي',
    idealNorm: 'المعيار الطبيعي',
    spaceDeficit: 'عجز في المساحة (تزاحم)',
    spaceExcess: 'فائض في المساحة (مسافات)',
    boltonNormRef: 'معايير بولتون 1958 المعتمدة'
  }
};

export const MASTER_PHASE_TRANSLATIONS: Record<number, Record<StudioLanguage, PhaseTranslation>> = {
  1: {
    en: {
      title: 'Emergency & Acute Pain Relief',
      discipline: 'Endodontics & Urgent Care',
      timeline: 'Immediate (Week 1)',
      clinicalObjectives: 'Eliminate acute pain, screen for pericoronitis around impacted third molars, and stabilize active periapical lesions.',
      interventions: [
        'Operculectomy or palliative irrigation around symptomatic third molars',
        'Diagnostic pulp vitality testing on teeth with deep caries',
        'Prescribe chlorhexidine 0.12% oral rinse'
      ],
      clearanceRequired: 'Zero acute pain prior to elective orthodontic bonding.'
    },
    ar: {
      title: 'تسكين الطوارئ والألم الحاد',
      discipline: 'علاج الجذور وطوارئ الأسنان',
      timeline: 'فوري (الأسبوع الأول)',
      clinicalObjectives: 'القضاء على الألم الحاد فوراً، وفحص التهاب حول التاج (Pericoronitis) لضروس العقل المدفونة، وتثبيت الآفات حول الذروية النشطة.',
      interventions: [
        'استئصال اللثة التاجية (Operculectomy) أو غسيل مطهر ملطف حول ضروس العقل المصحوبة بأعراض',
        'اختبار حيوية العصب التشخيصي للأسنان التي تعاني من تسوسات عميقة',
        'وصف مضمضة كلورهيكسيدين 0.12% لتهدئة الأنسجة'
      ],
      clearanceRequired: 'انعدام تام للألم الحاد كشرط أمان إلزامي قبل تركيب براكتات التقويم.'
    }
  },
  2: {
    en: {
      title: 'Periodontal & Hygiene Clearance',
      discipline: 'Periodontology & Preventive Care',
      timeline: 'Weeks 2–4',
      clinicalObjectives: 'Establish pristine plaque control (<15%), verify zero active bleeding on probing, and ensure stable crestal bone height.',
      interventions: [
        'Full-mouth ultrasonic debridement and subgingival scaling & root planing (SRP)',
        'Assess biotype (thick flat vs thin scalloped) to prevent gingival dehiscence during arch expansion',
        'Fluoride varnish application to reinforce enamel against demineralization under brackets'
      ],
      clearanceRequired: 'Full periodontal clearance — active periodontitis is an absolute contraindication to orthodontic tooth movement.'
    },
    ar: {
      title: 'تقييم اللثة ونظافة الفم (Periodontal Clearance)',
      discipline: 'أمراض اللثة والعناية الوقائية',
      timeline: 'الأسابيع ٢–٤',
      clinicalObjectives: 'تحقيق مؤشر تراكم جيري وبكتيري أقل من 15%، والتأكد من انعدام النزيف عند الفحص بالمسبر (BOP 0%)، وثبات ارتفاع عظم الحافة السنخية.',
      interventions: [
        'تنظيف جير بالموجات فوق الصوتية وكشط الجذور تحت اللثة (SRP) لكامل الفم',
        'تقييم النمط الحيوي للثة (Biotype) لتجنب انحسار اللثة (Dehiscence) أثناء توسيع الفك',
        'تطبيق ورنيش الفلورايد لتقوية مينا الأسنان ضد التبقع الأبيض تحت البراكتات'
      ],
      clearanceRequired: 'أمان لثوي سريري كامل — الالتهاب اللثوي النشط مضاد استطباب حتمي ومطلق لأي حركة تقويمية للأسنان.'
    }
  },
  3: {
    en: {
      title: 'Restorative & Endodontic Stabilization',
      discipline: 'Operative & Conservative Dentistry',
      timeline: 'Month 1–2',
      clinicalObjectives: 'Excavate caries and place definitive adhesive composite restorations with sound margins before bracket bonding.',
      interventions: [
        'Tooth #16: Class II MO composite restoration with anatomical contact matrix',
        'Tooth #25: Coronal seal evaluation and composite resin build-up',
        'Silane primer protocol prepared for bonding to any existing porcelain crowns'
      ],
      clearanceRequired: 'Caries arrest verified on bitewing radiographs.'
    },
    ar: {
      title: 'الحشوات الترميمية وعلاج الجذور',
      discipline: 'العلاج التحفظي وإصلاح الأسنان',
      timeline: 'الشهر الأول–الثاني',
      clinicalObjectives: 'تنظيف كافة التسوسات ووضع حشوات كومبوزيت لاصقة نهائية ذات حواف محكمة وصحية قبل لصق البراكتات.',
      interventions: [
        'السن #16: حشو كومبوزيت صنف ثانٍ MO مع مصفوفة نقاط تلامس تشريحية',
        'السن #25: فحص الإغلاق التاجي وبناء السن براتنج الكومبوزيت',
        'تجهيز بروتوكول السيلان (Silane Primer) لربط البراكتات على التيجان الخزفية إن وجدت'
      ],
      clearanceRequired: 'توقف تام للنشاط التسوسي ومراجعته عبر أشعة العضة المجنحة (Bitewing).'
    }
  },
  4: {
    en: {
      title: 'Comprehensive Orthodontic Biomechanics',
      discipline: 'Orthodontics & Dentofacial Orthopedics',
      timeline: 'Months 2–20 (18–20 Months)',
      clinicalObjectives: 'Correct skeletal sagittal discrepancy, eliminate overjet/crowding, and coordinate maxillary and mandibular arch widths.',
      interventions: [
        'Leveling & Alignment: .014 CuNiTi -> .016 CuNiTi -> .016x.022 CuNiTi',
        'Space Closure: .019x.025 Stainless Steel posted wires with NiTi closed-coil springs (150g)',
        'Anchorage Control: Transpalatal Arch (TPA) or bilateral IZC miniscrews (2.0x12mm)',
        'Finishing: .019x.025 TMA with light vertical settling elastics'
      ],
      clearanceRequired: 'Root parallelism verified on progress panoramic radiograph before debonding.'
    },
    ar: {
      title: 'التقويم والبيوميكانيكا الشاملة (Orthodontic Biomechanics)',
      discipline: 'تقويم الأسنان وتشوهات الوجه والفكين',
      timeline: 'الشهور ٢–٢٠ (١٨–٢٠ شهراً)',
      clinicalObjectives: 'تصحيح الاختلال الهيكلي السهمي، القضاء على البروز والتزاحم، وتنسيق أبعاد القوسين العلوي والسفلي بدقة متناهية.',
      interventions: [
        'الرص والمحاذاة: أسلاك .014 CuNiTi ثم .016 CuNiTi ثم .016x.022 CuNiTi المرنة',
        'غلق المسافات: سلك ستانلس ستيل صلب .019x.025 مزود بمقابض (Hooks) ويايات شد NiTi مغلقة (150 جم)',
        'التحكم في المرسى العظمي: قوس حنكي (TPA) أو مسامير تقويم عظمية IZC ثنائية الجانب (2.0x12 مم)',
        'الإنهاء والتطابق: سلك .019x.025 TMA مع مطاط تثبيت وتطابق عمودي خفيف'
      ],
      clearanceRequired: 'توازي جذور الأسنان التام والتأكد بأشعة البانوراما المرحلية قبل فك براكتات التقويم.'
    }
  },
  5: {
    en: {
      title: 'Implantology & Surgical Intervention',
      discipline: 'Oral Implantology & Maxillofacial Surgery',
      timeline: 'Months 18–22 (Post-Space Opening)',
      clinicalObjectives: 'Rehabilitate edentulous bounded spaces or execute orthognathic osteotomies following pre-surgical incisor decompensation.',
      interventions: [
        'Site #36: Fixture placement (Straumann BLT Ø 4.1 x 10mm) honoring 1.5mm buccal plate and 2.0mm IAN safety buffer',
        'Misch D2/D3 bone density drilling sequence with sterile chilled saline irrigation (800 RPM)',
        'Subantral sinus lift: OSFE crestal osteotome elevation if residual bone height < 8mm in posterior maxilla',
        'Prosthetic screw calibrated torque delivery (35 Ncm) with 10-minute re-torque protocol'
      ],
      clearanceRequired: 'Adequate mesiodistal space (≥ 7.0mm) and parallel adjacent roots verified on CBCT.'
    },
    ar: {
      title: 'زراعة الأسنان والجراحة التكميلية (Implantology)',
      discipline: 'زراعة الأسنان وجراحة الوجه والفكين',
      timeline: 'الشهور ١٨–٢٢ (عقب فتح المسافة التقويمية)',
      clinicalObjectives: 'تعويض الفراغات السنية الخالية بزرعات متوافقة حيوياً أو إجراء عمليات جراحة الفكين بعد تعديل ميلان القواطع.',
      interventions: [
        'موضع السن #36: غرس زرعة (Straumann BLT بقطر 4.1 مم وطول 10 مم) مع هامش أمان 1.5 مم من الصفيحة الدهليزية و 2 مم فوق عصب الفك السفلي IAN',
        'بروتوكول حفر مدروس لكثافة عظم Misch D2/D3 مع تبريد مستمر بمحلول ملحي معقم مثلج (800 لفة/دقيقة)',
        'رفع قاع الجيب الفكي الأنفي: تقنية OSFE عبر القمة بالـ Osteotome في حال كان ارتفاع العظم المتبقي أقل من 8 مم',
        'عزم ربط مسمار الأباتمنت المقنن (35 نيوتن.سم) مع إعادة الربط بعد 10 دقائق لتجنب الارتخاء'
      ],
      clearanceRequired: 'مسافة إنسية وحشية كافية (≥ 7 مم) وتوازي جذور الأسنان المجاورة مؤكدة بأشعة الـ CBCT.'
    }
  },
  6: {
    en: {
      title: 'Prosthodontics, Esthetics & Dual Retention',
      discipline: 'Prosthodontics & Long-Term Retention',
      timeline: 'Months 22–24 & Indefinite Retention',
      clinicalObjectives: 'Deliver definitive implant crown restorations, finalize gnathological occlusion, and safeguard against relapse.',
      interventions: [
        'Screw-retained zirconia crown on customized titanium base (emergence profile matched to gingival cuff)',
        'Maxillary retention: Essix 1.0mm clear vacuum-formed retainer covering second molars',
        'Mandibular retention: Bonded 3–3 multi-strand stainless steel lingual wire (.0175")',
        'Wear schedule: 22 hours/day for 6 months, transitioning to indefinite nightly wear'
      ],
      clearanceRequired: 'Mutually protected occlusion verified with Shimstock foil (anterior guidance with posterior disclusion).'
    },
    ar: {
      title: 'التركيبات النهائية والتثبيت المزدوج (Dual Retention)',
      discipline: 'تركيبات الأسنان والتثبيت طويل الأمد',
      timeline: 'الشهور ٢٢–٢٤ وتثبيت ليلي مستمر',
      clinicalObjectives: 'تركيب التيجان النهائية على الزرعات، وضبط الإطباق الوظيفي الحامي، وحماية الحالة من الانتكاس (Relapse).',
      interventions: [
        'تاج زيركونيا مثبت ببرغي (Screw-retained) على قاعدة تيتانيوم مخصصة مع مراعاة مظهر الانبثاق اللثوي الطبيعي',
        'تثبيت الفك العلوي: جهاز إيسيكس الشفاف (Essix 1.0mm) يغطي حتى الأضراس الثانية',
        'تثبيت الفك السفلي: سلك لساني دائم ملصوق من الناب للناب (3-3 Bonded Lingual Retainer سلك .0175" مجدول)',
        'جدول الارتداء: ٢٢ ساعة يومياً لأول ٦ أشهر، ثم الانتقال لارتداء ليلي دائم للحفاظ على النتيجة'
      ],
      clearanceRequired: 'إطباق وظيفي حامي مع إرشاد قاطعي أمامي (Anterior Guidance) وفصل فوري للأضراس الخلفية (Posterior Disclusion).'
    }
  }
};

export const TOOTH_RECOMMENDATIONS_AR: Record<string, ToothRecommendationTranslation> = {
  caries: {
    condition: 'تسوس تاجي نشط يظهر شفافاً بالأشعة (عاج ومينا)',
    clinicalDecision: 'حشو كمبوزيت راتنجي تجميلي مباشر قبل تركيب البراكتات',
    phase: 'المرحلة 3: الحشوات وعلاج الجذور',
    urgency: 'high',
    protocolNotes: 'التأكد من انعدام النزيف اللثوي وسلامة حواف المينا قبل اللصق.'
  },
  missing: {
    condition: 'فراغ سن مفقود / خالع / غير متكون خلقياً',
    clinicalDecision: 'فتح أو تجميع المسافة تقويمياً ثم غرس زرعة سنية تعويضية',
    phase: 'المرحلة 5: زراعة الأسنان والجراحة',
    urgency: 'medium',
    protocolNotes: 'التأكد من مسافة 7 مم إنسية-وحشية و 1.5 مم عظم دهليزي على الأقل.'
  },
  impacted: {
    condition: 'سن مدفون بالكامل داخل العظم السنخي / فشل البزوغ',
    clinicalDecision: 'كشف جراحي وشد بواسطة سلسلة ذهبية (أو الخلع الجراحي إذا تعذر)',
    phase: 'المرحلة 4: التقويم والبيوميكانيكا',
    urgency: 'high',
    protocolNotes: 'تحديد الموضع الدقيق بثلاثية الأبعاد CBCT لتفادي امتصاص جذور الأسنان المجاورة.'
  },
  extraction_planned: {
    condition: 'تزاحم سنخي شديد يستلزم توفير مساحة محيطية',
    clinicalDecision: 'خلع ضاحك علاجي بهدف إرجاع القواطع ورص الأسنان (En-Masse Retraction)',
    phase: 'المرحلة 4: التقويم والبيوميكانيكا',
    urgency: 'high',
    protocolNotes: 'حماية المرسى العظمي وتطبيق عزم سالب لضبط زوايا الجذور.'
  },
  tad_site: {
    condition: 'موقع مرسى عظمي هيكلي مطلق (Skeletal Anchorage)',
    clinicalDecision: 'غرس مسمار تقويمي TAD في العظم بين الجذور أو في عظم الـ IZC',
    phase: 'المرحلة 4: التقويم والبيوميكانيكا',
    urgency: 'medium',
    protocolNotes: 'التأكد من مسافة أمان 1 مم عن أربطة الجذور وعزم ربط 8–10 نيوتن.سم.'
  },
  restoration: {
    condition: 'حشو قديم سليم ومستقر سريرياً',
    clinicalDecision: 'مراقبة حواف الحشو وتأهيل السطح بحمض الهيدروفلوريك والسيلان إن كان خزفياً',
    phase: 'المرحلة 3: الحشوات وعلاج الجذور',
    urgency: 'routine',
    protocolNotes: 'فحص عدم وجود تسوس راجع أسفل الحشو بالأشعة.'
  }
};
