/**
 * Comprehensive Implantology Risk Analysis Engine
 * Evaluates systemic health conditions, pharmacological risks (MRONJ/bleeding),
 * behavioral factors (smoking/bruxism), and site-specific anatomical hazards.
 */

import {
  RiskFactor,
  riskFactors,
  implantComplications,
  ImplantComplication
} from './knowledge-base/complication-database';

export interface PatientMedicalProfile {
  smokingStatus: 'non-smoker' | 'light-smoker' | 'heavy-smoker'; // light: <10/day, heavy: >10/day
  diabetesStatus: 'none' | 'controlled-hba1c-under-7' | 'moderate-hba1c-7-8' | 'uncontrolled-hba1c-over-8';
  bisphosphonates: {
    taking: boolean;
    route?: 'oral' | 'intravenous';
    durationYears?: number;
    drugName?: string;
  };
  anticoagulants: {
    taking: boolean;
    drugClass?: 'antiplatelet' | 'warfarin' | 'doac-noac';
    inrLevel?: number;
  };
  historyOfPeriodontitis: 'none' | 'treated-stable' | 'active-untreated';
  bruxismOrClenching: boolean;
  radiationTherapyHeadNeck: boolean;
  radiationDoseGy?: number;
  osteoporosis: boolean;
  immunosuppressed: boolean;
  cardiovascularRisk?: 'none' | 'controlled-hypertension' | 'recent-mi-under-6-months';
}

export interface SiteAnatomicalRisks {
  distanceToIAN?: number; // mm
  distanceToSinusFloor?: number; // mm
  distanceToAdjacentRoots?: number; // mm
  buccalBoneThickness?: number; // mm
  keratinizedMucosaWidth?: number; // mm
  lingualConcavity?: boolean;
}

export interface RiskAnalysisInput {
  patient: PatientMedicalProfile;
  site?: SiteAnatomicalRisks;
  fdiPosition?: number;
}

export interface RiskItem {
  id: string;
  factor: string;
  category: 'systemic' | 'pharmacological' | 'behavioral' | 'anatomical';
  severity: 'mild' | 'moderate' | 'severe' | 'contraindication';
  impactDescription: string;
  mitigationProtocol: string[];
  points: number;
}

export interface RiskAnalysisResult {
  riskScore: number; // 0-100
  riskCategory: 'low' | 'moderate' | 'high' | 'contraindicated';
  clearanceStatus: 'cleared' | 'cleared-with-precautions' | 'medical-consult-required' | 'contraindicated';
  systemicRisks: RiskItem[];
  anatomicalRisks: RiskItem[];
  highRiskComplications: ImplantComplication[];
  preoperativeChecklist: string[];
  intraoperativeProtocols: string[];
  postoperativeMaintenance: string[];
  summaryStatement: string;
}

/**
 * Main Risk Analyzer
 */
export function analyzeImplantRisks(input: RiskAnalysisInput): RiskAnalysisResult {
  const { patient, site } = input;
  const systemicRisks: RiskItem[] = [];
  const anatomicalRisks: RiskItem[] = [];
  let totalScore = 0;

  // 1. Smoking Analysis
  if (patient.smokingStatus === 'heavy-smoker') {
    const points = 25;
    totalScore += points;
    systemicRisks.push({
      id: 'smoking-heavy',
      factor: 'Heavy Tobacco Smoking (>10 cigarettes/day)',
      category: 'behavioral',
      severity: 'severe',
      impactDescription: 'Doubles implant failure rate, causes peripheral vasoconstriction, and severely increases peri-implantitis risk.',
      mitigationProtocol: [
        'Advise smoking cessation protocol: stop 1-2 weeks before surgery and 8 weeks after.',
        'Avoid immediate loading and immediate placement.',
        'Anticipate higher marginal bone loss; consider rough-surface implants with high biocompatibility.'
      ],
      points
    });
  } else if (patient.smokingStatus === 'light-smoker') {
    const points = 12;
    totalScore += points;
    systemicRisks.push({
      id: 'smoking-light',
      factor: 'Light Tobacco Smoking (<10 cigarettes/day)',
      category: 'behavioral',
      severity: 'moderate',
      impactDescription: 'Moderate increase in biological complications and delayed soft tissue wound healing.',
      mitigationProtocol: [
        'Recommend smoking cessation during the initial 2-week mucosal healing phase.',
        'Reinforce rigorous hygiene maintenance.'
      ],
      points
    });
  }

  // 2. Diabetes Assessment
  if (patient.diabetesStatus === 'uncontrolled-hba1c-over-8') {
    const points = 35;
    totalScore += points;
    systemicRisks.push({
      id: 'diabetes-uncontrolled',
      factor: 'Uncontrolled Diabetes Mellitus (HbA1c > 8.0%)',
      category: 'systemic',
      severity: 'contraindication',
      impactDescription: 'Severe microvascular impairment, impaired neutrophil chemotaxis, high infection rate, and failure of osseointegration.',
      mitigationProtocol: [
        'Postpone elective implant placement until glycaemic control improves (target HbA1c < 7.5%).',
        'Refer to endocrinologist for diabetes optimization.',
        'Once controlled, administer prophylactic antibiotics and extend healing times.'
      ],
      points
    });
  } else if (patient.diabetesStatus === 'moderate-hba1c-7-8') {
    const points = 15;
    totalScore += points;
    systemicRisks.push({
      id: 'diabetes-moderate',
      factor: 'Moderately Controlled Diabetes (HbA1c 7.0% - 8.0%)',
      category: 'systemic',
      severity: 'moderate',
      impactDescription: 'Moderate delay in initial osseointegration kinetics and prolonged soft tissue maturation.',
      mitigationProtocol: [
        'Preoperative antibiotic prophylaxis (Amoxicillin 2g 1 hr prior or Clindamycin 600mg).',
        'Extend conventional healing phase by 4-8 weeks before restorative loading.',
        'Use chlorhexidine 0.12% oral rinses for 14 days post-op.'
      ],
      points
    });
  }

  // 3. Bisphosphonates & Antiresorptive Therapy (MRONJ Risk)
  if (patient.bisphosphonates?.taking) {
    const isIV = patient.bisphosphonates.route === 'intravenous';
    const years = patient.bisphosphonates.durationYears || 1;

    if (isIV) {
      const points = 45;
      totalScore += points;
      systemicRisks.push({
        id: 'bisphosphonates-iv',
        factor: 'Intravenous Bisphosphonates (Zometa / Aredia)',
        category: 'pharmacological',
        severity: 'contraindication',
        impactDescription: 'Extremely high risk of Medication-Related Osteonecrosis of the Jaw (MRONJ) with surgical trauma to bone.',
        mitigationProtocol: [
          'Elective dental implants are strictly CONTRAINDICATED in patients with oncologic IV bisphosphonate history.',
          'Explore non-surgical restorative alternatives (conventional removable or resin-bonded bridges).'
        ],
        points
      });
    } else if (years >= 3) {
      const points = 20;
      totalScore += points;
      systemicRisks.push({
        id: 'bisphosphonates-oral-long',
        factor: `Oral Bisphosphonates (${years} years duration)`,
        category: 'pharmacological',
        severity: 'severe',
        impactDescription: 'Elevated MRONJ risk after 3-4 years of oral antiresorptive exposure due to drug accumulation.',
        mitigationProtocol: [
          'Obtain specialized informed consent detailing MRONJ symptoms.',
          'Consider drug holiday discussion with prescribing physician if systemically appropriate.',
          'Ensure strict atraumatic surgical technique, rounded bone margins, and complete primary tension-free soft tissue coverage.'
        ],
        points
      });
    } else {
      const points = 10;
      totalScore += points;
      systemicRisks.push({
        id: 'bisphosphonates-oral-short',
        factor: 'Oral Bisphosphonates (< 3 years duration)',
        category: 'pharmacological',
        severity: 'mild',
        impactDescription: 'Low baseline MRONJ risk, but patient vigilance and informed consent required.',
        mitigationProtocol: [
          'Full-thickness flap with minimal periosteal stripping.',
          'Prophylactic chlorhexidine and close follow-up until mucosal seal is mature.'
        ],
        points
      });
    }
  }

  // 4. Anticoagulant / Bleeding Risk
  if (patient.anticoagulants?.taking) {
    const points = 12;
    totalScore += points;
    systemicRisks.push({
      id: 'anticoagulant-therapy',
      factor: `Anticoagulant / Antiplatelet Medication (${patient.anticoagulants.drugClass || 'antithrombotic'})`,
      category: 'pharmacological',
      severity: 'moderate',
      impactDescription: 'Increased risk of intraoperative bleeding, hematoma formation, and secondary wound breakdown.',
      mitigationProtocol: [
        'Do NOT empirically stop anticoagulants without physician consultation.',
        patient.anticoagulants.drugClass === 'warfarin' ? `Verify INR within 24 hours of surgery (therapeutic safe range: 2.0 - 3.0; current: ${patient.anticoagulants.inrLevel || 'unspecified'}).` : 'Schedule morning surgery to observe hemostasis.',
        'Use local hemostatic agents: oxidized regenerated cellulose (Surgicel), tranexamic acid 4.8% mouthwash, and secure cross-mattress sutures.'
      ],
      points
    });
  }

  // 5. Periodontitis History
  if (patient.historyOfPeriodontitis === 'active-untreated') {
    const points = 30;
    totalScore += points;
    systemicRisks.push({
      id: 'periodontitis-active',
      factor: 'Active Untreated Periodontitis',
      category: 'systemic',
      severity: 'contraindication',
      impactDescription: 'Pathogenic periodontal biofilm seeds peri-implant sulcus, resulting in 3x-4x higher early peri-implantitis and bone loss.',
      mitigationProtocol: [
        'Postpone implant surgery until full-mouth periodontal therapy is completed (plaque score < 20%, BOP < 15%, no pockets > 5mm).',
        'Implant placement should only proceed during stable supportive periodontal therapy (SPT).'
      ],
      points
    });
  } else if (patient.historyOfPeriodontitis === 'treated-stable') {
    const points = 10;
    totalScore += points;
    systemicRisks.push({
      id: 'periodontitis-treated',
      factor: 'History of Treated / Stabilized Periodontitis',
      category: 'systemic',
      severity: 'mild',
      impactDescription: 'Susceptible host response; requires strict lifelong supportive peri-implant maintenance.',
      mitigationProtocol: [
        'Enroll in 3-month supportive maintenance recall program.',
        'Design cleansable prosthetic emergence profiles with easily accessible interproximal cleaning embrasures.'
      ],
      points
    });
  }

  // 6. Bruxism / Occlusal Overload
  if (patient.bruxismOrClenching) {
    const points = 18;
    totalScore += points;
    systemicRisks.push({
      id: 'bruxism-overload',
      factor: 'Parafunctional Habits (Bruxism / Clenching)',
      category: 'behavioral',
      severity: 'severe',
      impactDescription: 'Absence of periodontal ligament mechanoreceptors leads to 3x higher screw loosening, porcelain fracture, and marginal bone micro-fracture.',
      mitigationProtocol: [
        'Avoid single narrow-diameter implants in posterior sectors.',
        'Use wide platform fixtures or splinted crowns.',
        'Fabricate custom hard acrylic occlusal stabilization splint (nightguard) immediately after restoration.',
        'Design flat occlusal anatomy with reduced cusp inclination and wide contact areas.'
      ],
      points
    });
  }

  // 7. Radiation Therapy
  if (patient.radiationTherapyHeadNeck) {
    const points = 35;
    totalScore += points;
    systemicRisks.push({
      id: 'radiation-head-neck',
      factor: `Head & Neck Radiation Therapy (${patient.radiationDoseGy ? patient.radiationDoseGy + ' Gy' : 'documented'})`,
      category: 'systemic',
      severity: 'severe',
      impactDescription: 'Endarteritis obliterans causes permanent hypovascularity and hypocellularity, creating high osteoradionecrosis (ORN) hazard.',
      mitigationProtocol: [
        'Hyperbaric Oxygen (HBO) protocol consideration (20 dives pre-op, 10 dives post-op) for doses > 50 Gy.',
        'Use profuse chilled saline cooling and sharp disposable drill sets.',
        'Allow prolonged healing periods of at least 6-9 months before uncovery.'
      ],
      points
    });
  }

  // 8. Site-Specific Anatomical Risks
  if (site) {
    if (site.distanceToIAN !== undefined && site.distanceToIAN < 2.0) {
      const points = 25;
      totalScore += points;
      anatomicalRisks.push({
        id: 'ian-proximity',
        factor: `Critical IAN Canal Proximity (${site.distanceToIAN}mm < 2.0mm safe margin)`,
        category: 'anatomical',
        severity: 'severe',
        impactDescription: 'Risk of permanent inferior alveolar nerve paresthesia, dysesthesia, or complete numbness of the lower lip and chin.',
        mitigationProtocol: [
          'Maintain minimum 2.0mm safety zone above superior cortical border of the mandibular canal.',
          'Use computer-guided surgical template with physical drill stops.',
          'Select shorter implant fixture (e.g., 6.0mm or 8.0mm) to respect nerve clearance.'
        ],
        points
      });
    }

    if (site.distanceToAdjacentRoots !== undefined && site.distanceToAdjacentRoots < 1.5) {
      const points = 15;
      totalScore += points;
      anatomicalRisks.push({
        id: 'root-proximity',
        factor: `Adjacent Root Proximity (${site.distanceToAdjacentRoots}mm < 1.5mm standard)`,
        category: 'anatomical',
        severity: 'moderate',
        impactDescription: 'Risk of collateral root devitalization, external root resorption, or implant osseointegration failure.',
        mitigationProtocol: [
          'Verify radiographic divergence of roots before drilling.',
          'Use narrow diameter fixture (3.0 - 3.3mm) or orthodontically open inter-radicular space prior to placement.'
        ],
        points
      });
    }

    if (site.lingualConcavity) {
      const points = 20;
      totalScore += points;
      anatomicalRisks.push({
        id: 'lingual-concavity',
        factor: 'Submandibular Lingual Fossa Concavity',
        category: 'anatomical',
        severity: 'severe',
        impactDescription: 'Danger of lingual cortical plate perforation with life-threatening sublingual / submental artery hemorrhage and airway obstruction.',
        mitigationProtocol: [
          'Inspect CBCT cross-sections carefully for undercut depth.',
          'Angle osteotomy trajectory slightly labial to parallel the lingual plate cortex.',
          'Digital finger palpation along the lingual shelf during all osteotomy drills.'
        ],
        points
      });
    }

    if (site.buccalBoneThickness !== undefined && site.buccalBoneThickness < 1.0) {
      const points = 10;
      totalScore += points;
      anatomicalRisks.push({
        id: 'thin-buccal-bone',
        factor: `Thin Buccal Bone Plate (${site.buccalBoneThickness}mm < 1.5-2.0mm)`,
        category: 'anatomical',
        severity: 'moderate',
        impactDescription: 'High likelihood of complete buccal cortical resorption, thread exposure, and gingival recession.',
        mitigationProtocol: [
          'Simultaneous contour GBR with particulate deproteinized bovine bone (Bio-Oss) and collagen membrane.',
          'Palatal / lingual-biased implant trajectory to preserve buccal envelope.'
        ],
        points
      });
    }
  }

  // Determine Categorical Level
  const cappedScore = Math.min(totalScore, 100);
  let riskCategory: RiskAnalysisResult['riskCategory'] = 'low';
  let clearanceStatus: RiskAnalysisResult['clearanceStatus'] = 'cleared';

  const hasContraindication = systemicRisks.some(r => r.severity === 'contraindication');

  if (hasContraindication || cappedScore >= 70) {
    riskCategory = 'contraindicated';
    clearanceStatus = 'contraindicated';
  } else if (cappedScore >= 45) {
    riskCategory = 'high';
    clearanceStatus = 'medical-consult-required';
  } else if (cappedScore >= 20) {
    riskCategory = 'moderate';
    clearanceStatus = 'cleared-with-precautions';
  } else {
    riskCategory = 'low';
    clearanceStatus = 'cleared';
  }

  // Match relevant complications from KB
  const highRiskComplications: ImplantComplication[] = [];
  if (patient.smokingStatus !== 'non-smoker' || patient.historyOfPeriodontitis !== 'none') {
    const periImp = implantComplications.find(c => c.id.includes('peri-implantitis') || c.name.toLowerCase().includes('peri-implantitis'));
    if (periImp) highRiskComplications.push(periImp);
  }
  if (site?.distanceToIAN !== undefined && site.distanceToIAN < 2.0) {
    const nerveComp = implantComplications.find(c => c.id === 'surg-001' || c.name.toLowerCase().includes('nerve'));
    if (nerveComp) highRiskComplications.push(nerveComp);
  }
  if (patient.bruxismOrClenching) {
    const screwComp = implantComplications.find(c => c.id.includes('screw') || c.name.toLowerCase().includes('screw loosening'));
    if (screwComp) highRiskComplications.push(screwComp);
  }

  // Build Checklists
  const preoperativeChecklist: string[] = [
    'Comprehensive CBCT multiplanar analysis with 1:1 cross-sectional measurements.',
    'Oral prophylaxis and full-mouth plaque score < 20% verification.',
    'Signed informed consent detailing customized risk factors and alternatives.'
  ];
  if (clearanceStatus === 'medical-consult-required') {
    preoperativeChecklist.unshift('Formal written clearance letter from patient’s treating medical specialist.');
  }

  const intraoperativeProtocols: string[] = [
    'Strict aseptic surgical field with sterile irrigation lines.',
    'Low-speed drilling (800-1200 rpm) with continuous chilled physiological saline cooling.',
    'Verify primary stability: minimum 30-35 Ncm insertion torque and ISQ ≥ 65.'
  ];

  const postoperativeMaintenance: string[] = [
    'Chlorhexidine gluconate 0.12% rinse twice daily for 14 days.',
    'Suture removal at 10-14 days with mucosal healing evaluation.',
    'Baseline periapical radiograph immediately post-placement and at uncovery/loading.'
  ];

  // Summary Statement
  let summaryStatement = `Patient presents with low systemic and anatomical risk (Risk Score: ${cappedScore}/100). Standard surgical and restorative protocols apply.`;
  if (clearanceStatus === 'contraindicated') {
    summaryStatement = `Implant placement is currently CONTRAINDICATED (Risk Score: ${cappedScore}/100) due to severe systemic or local hazards. Optimize risk factors or pursue non-invasive prosthetic alternatives.`;
  } else if (clearanceStatus === 'medical-consult-required') {
    summaryStatement = `High clinical complexity (Risk Score: ${cappedScore}/100). Physician consultation and tailored surgical precautions are mandatory before proceeding.`;
  } else if (clearanceStatus === 'cleared-with-precautions') {
    summaryStatement = `Moderate risk profile (Risk Score: ${cappedScore}/100). Treatment is feasible with targeted risk mitigation strategies and reinforced maintenance.`;
  }

  return {
    riskScore: cappedScore,
    riskCategory,
    clearanceStatus,
    systemicRisks,
    anatomicalRisks,
    highRiskComplications,
    preoperativeChecklist,
    intraoperativeProtocols,
    postoperativeMaintenance,
    summaryStatement
  };
}
