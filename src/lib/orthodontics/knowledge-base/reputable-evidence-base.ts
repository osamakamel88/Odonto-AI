// Odonto AI — Reputable Clinical Evidence & Authoritative Knowledge Base
// Grounded in the gold-standard treatises: Proffit, Nanda, MBT, Tweed, Misch, Lindhe, ITI, AAP/EFP, Cochrane, and AJODO/Angle

export interface ClinicalAuthority {
  id: string;
  authorityName: string;
  sourceType: 'foundational_textbook' | 'consensus_guideline' | 'clinical_trial_meta' | 'high_impact_journal';
  authors: string;
  citation: string;
  year: number;
  specialty: 'orthodontics' | 'implantology' | 'periodontics' | 'orthognathic_surgery' | 'ai_concordance';
  corePrinciples: {
    principleName: string;
    description: string;
    clinicalRule: string; // The exact non-robotic rule applied to planning
    antiRoboticRationale: string; // Why generic AI gets this wrong and how Odonto AI prevents it
    applicableMetrics?: Record<string, string | number>;
  }[];
}

export const REPUTABLE_CLINICAL_AUTHORITIES: ClinicalAuthority[] = [
  {
    id: 'proffit-envelope-discrepancy',
    authorityName: "Proffit's Contemporary Orthodontics (Envelope of Discrepancy)",
    sourceType: 'foundational_textbook',
    authors: 'William R. Proffit, Henry W. Fields, Brent E. Larson, David M. Sarver',
    citation: 'Contemporary Orthodontics, 6th Edition, Elsevier, ISBN: 978-0323543873',
    year: 2019,
    specialty: 'orthodontics',
    corePrinciples: [
      {
        principleName: 'Envelope of Discrepancy for Sagittal Incisor Movement',
        description: 'Quantifies the biological limits of tooth movement alone vs growth modification vs orthognathic surgery in the maxilla and mandible.',
        clinicalRule: 'Orthodontic retraction of upper incisors is biologically capped at 7 mm; mandibular incisor advancement is capped at 2 mm over basal bone to avoid cortical plate perforation and dehiscence. Beyond these limits, skeletal discrepancy requires orthognathic surgery (Le Fort I / BSSO).',
        antiRoboticRationale: 'Generic AI often suggests simple camouflage elastics for 9-10mm overjets. Odonto AI flags any sagittal discrepancy exceeding 7mm as requiring surgical expansion of the envelope or skeletal anchorage (TADs) to prevent periodontal breakdown.',
        applicableMetrics: {
          maxUpperIncisorRetractionMm: 7,
          maxLowerIncisorAdvancementMm: 2,
          maxGrowthModificationMm: 5,
          surgicalDiscrepancyThresholdMm: 7
        }
      },
      {
        principleName: 'Soft Tissue Paradigm & Incisor Display at Rest',
        description: 'Treatment planning must be guided primarily by soft tissue aesthetics, smile arc curvature, and incisor exposure at rest (2-4mm), rather than hard tissue cephalometric norms alone.',
        clinicalRule: 'Never extrude upper incisors to close an open bite in patients with normal or excessive incisor show at rest (≥3mm). Molar intrusion via skeletal anchorage must be used instead.',
        antiRoboticRationale: 'Robotic algorithms prioritize closing the anterior bite by blindly extruding anterior teeth, resulting in gummy smiles ("rabbiting"). Odonto AI preserves the aesthetic smile arc by dictating posterior intrusion.'
      }
    ]
  },
  {
    id: 'nanda-biomechanics-cres',
    authorityName: "Nanda's Biomechanics & Orthodontic Mechanics",
    sourceType: 'foundational_textbook',
    authors: 'Ravindra Nanda, Flavio Uribe',
    citation: 'Biomechanics and Esthetic Strategies in Clinical Orthodontics, Saunders, ISBN: 978-0721601960',
    year: 2005,
    specialty: 'orthodontics',
    corePrinciples: [
      {
        principleName: 'Moment-to-Force Ratio (Mc/Mf) at Center of Resistance',
        description: 'Deterministic relationship governing the type of tooth movement based on the ratio of the couple of the archwire (Mc) to the force applied at the bracket (Mf).',
        clinicalRule: 'Controlled tipping requires Mc/Mf = 0.5–0.75; Bodily translation requires Mc/Mf = 1.0 (approx 10:1 mm); Root movement/uprighting requires Mc/Mf > 1.0 (12:1).',
        antiRoboticRationale: 'Standard AI models recommend "retracting the canines" without specifying wire dimensions or force systems. Odonto AI specifies exact rectangular wire torque (.019x.025 SS in .022 slot) to maintain Mc/Mf=10:1 and prevent tipping.'
      },
      {
        principleName: 'Vertical Force Vectors & Mandibular Autorotation',
        description: 'For every 1.0 mm of posterior maxillary molar intrusion, the anterior mandibular incisors rotate upward and forward by approximately 1.5–2.0 mm, reducing anterior open bite and decreasing facial height.',
        clinicalRule: 'In hyperdivergent / high-angle open bite cases, apply 150-200g of intrusive force via bilateral palatal TADs to trigger counter-clockwise mandibular autorotation.',
        antiRoboticRationale: 'Generic chatbots suggest intermaxillary anterior vertical elastics, which extrude anterior teeth, worsen gingival display, and relapse rapidly. Odonto AI prescribes true intrusive skeletal mechanics.'
      }
    ]
  },
  {
    id: 'mbt-bracket-mechanics',
    authorityName: 'McLaughlin Bennett Trevisi (MBT) System Philosophy',
    sourceType: 'foundational_textbook',
    authors: 'Richard P. McLaughlin, John C. Bennett, Hugo J. Trevisi',
    citation: 'Systemized Orthodontic Bracket Mechanics, Mosby, ISBN: 978-0723431718',
    year: 2001,
    specialty: 'orthodontics',
    corePrinciples: [
      {
        principleName: 'Sliding Mechanics with Light Continuous Forces',
        description: 'Continuous force progression utilizing generous rectangular archwires (.019x.025 SS in .022 slot) with .003 clearance to allow smooth space closure while controlling torque.',
        clinicalRule: 'Never close extraction spaces on round wires (.016 or .018). Space closure must exclusively occur on .019x.025 Stainless Steel or TMA to prevent incisor dumping and loss of torque.',
        antiRoboticRationale: 'Robotic plans frequently confuse alignment wires with working space-closure wires. Odonto AI mandates strict phase transitions: leveling -> working torque wire -> space closure.'
      },
      {
        principleName: 'Lacebacks and Tiebacks for Anchorage Preservation',
        description: 'Passive .009 or .010 inch ligature wire from first permanent molar to canine prevents forward tipping of canines during early leveling.',
        clinicalRule: 'Engage posterior-anterior lacebacks during initial .014 CuNiTi leveling in extraction cases to arrest reciprocal mesial incisor flare.',
        antiRoboticRationale: 'Prevents unwanted anterior proclination in severe crowding cases before extractions are even utilized.'
      }
    ]
  },
  {
    id: 'tweed-merrifield-triangle',
    authorityName: 'Tweed-Merrifield Diagnostic Philosophy',
    sourceType: 'foundational_textbook',
    authors: 'Charles H. Tweed, Levern L. Merrifield',
    citation: 'Clinical Orthodontics (Vols 1 & 2), The C.V. Mosby Company',
    year: 1966,
    specialty: 'orthodontics',
    corePrinciples: [
      {
        principleName: 'Tweed Diagnostic Triangle (FMA, FMIA, IMPA)',
        description: 'Geometric relationship ensuring lower incisors are balanced over basal medullary bone: FMA (25°), FMIA (65°), IMPA (90° ± 5°).',
        clinicalRule: 'If IMPA > 98° and FMA > 30°, non-extraction expansion is strictly contraindicated due to thin labial cortical bone. Extraction or interproximal reduction (IPR) is mandated.',
        antiRoboticRationale: 'Prevents non-extraction expansion in already proclined lower incisors, which leads to gingival recession and irreversible bone dehiscence.'
      }
    ]
  },
  {
    id: 'misch-resnik-implant-biology',
    authorityName: 'Misch & Resnik Contemporary Implant Dentistry',
    sourceType: 'foundational_textbook',
    authors: 'Carl E. Misch, Randolph R. Resnik',
    citation: 'Contemporary Implant Dentistry, 4th Edition, Elsevier, ISBN: 978-0323391559',
    year: 2020,
    specialty: 'implantology',
    corePrinciples: [
      {
        principleName: 'Misch D1–D4 Bone Density & Osteotomy Protocol',
        description: 'Classifies bone based on tactile perception and Hounsfield Units: D1 (>1250 HU), D2 (850-1250 HU), D3 (350-850 HU), D4 (150-350 HU).',
        clinicalRule: 'D1 bone requires full-depth bone tapping and slow-speed irrigation (800 RPM) to prevent thermal necrosis (>47°C). D4 bone requires osteotome bone condensation or 1-size under-drilling with NO bone tapping to achieve ISQ > 65.',
        antiRoboticRationale: 'Standard dental calculators treat all jawbone as uniform. Odonto AI generates customized drill sequences and torque targets based on Misch bone density.'
      },
      {
        principleName: 'Crown-Height Space (CHS) & Biomechanical Lever Arms',
        description: 'The vertical distance from the crest of the bone to the occlusal plane. Normal CHS is 8–12 mm. CHS > 15 mm creates destructive cantilever forces.',
        clinicalRule: 'When CHS > 15 mm, use screw-retained prostheses, widen fixture diameter by ≥1.0mm, and splint adjacent implants to distribute destructive lateral moments.',
        antiRoboticRationale: 'Calculates the crown-to-implant ratio to warn against catastrophic fixture body fracture.'
      }
    ]
  },
  {
    id: 'iti-treatment-guides-consensus',
    authorityName: 'International Team for Implantology (ITI) Consensus & SAC Classification',
    sourceType: 'consensus_guideline',
    authors: 'Daniel Buser, Stephen Chen, Urs Belser, Ronald Jung',
    citation: 'ITI Treatment Guides (Vols 1–14), Quintessence Publishing; 6th ITI Consensus Conference',
    year: 2023,
    specialty: 'implantology',
    corePrinciples: [
      {
        principleName: 'SAC Classification System (Straightforward, Advanced, Complex)',
        description: 'International guideline stratifying implant procedures by surgical and aesthetic risk.',
        clinicalRule: 'Anterior maxilla single tooth with high smile line and thin scalloped biotype is automatically classified as COMPLEX. Requires ≥2 mm labial bone thickness post-restoration.',
        antiRoboticRationale: 'Prevents over-simplified immediate loading recommendations in high aesthetic risk zones.'
      },
      {
        principleName: 'Implant Placement Timing (Types 1–4)',
        description: 'Type 1: Immediate post-extraction; Type 2: Early with soft tissue healing (4-8 weeks); Type 3: Early with partial bone healing (12-16 weeks); Type 4: Late (≥6 months).',
        clinicalRule: 'Type 1 immediate placement requires intact buccal bone plate (≥1 mm), thick biotype, primary stability (torque ≥35 Ncm), and jumping distance gap grafting with xenograft/allograft.',
        antiRoboticRationale: 'Prevents blind immediate placement when buccal bone plate is lost or infected, which guarantees aesthetic failure.'
      }
    ]
  },
  {
    id: 'lindhe-lang-periodontology',
    authorityName: "Lindhe & Lang Clinical Periodontology & Peri-Implant Phenotype",
    sourceType: 'foundational_textbook',
    authors: 'Jan Lindhe, Niklaus P. Lang, Tord Berglundh',
    citation: 'Clinical Periodontology and Implant Dentistry, 7th Edition, Wiley-Blackwell, ISBN: 978-1119438885',
    year: 2021,
    specialty: 'periodontics',
    corePrinciples: [
      {
        principleName: 'Biologic Width & Supracrestal Tissue Attachment',
        description: '2.04 mm biological dimension (1.07 mm connective tissue + 0.97 mm junctional epithelium). Encroachment causes crestal bone resorption.',
        clinicalRule: 'Maintain minimum 3.0 mm interimplant distance and 1.5 mm tooth-implant distance to preserve interproximal peak of bone and interimplant papillae.',
        antiRoboticRationale: 'Enforces geometric clearance rules in surgical guides to prevent papilla loss and black triangles.'
      },
      {
        principleName: 'Keratinized Mucosa Width (KMW) & Peri-implant Health',
        description: 'Presence of ≥2.0 mm of attached keratinized mucosa significantly reduces plaque accumulation, mucosal recession, and peri-implantitis risk.',
        clinicalRule: 'If keratinized mucosa is <2.0 mm in the aesthetic zone or posterior mandible, prescribe connective tissue grafting (CTG) or free gingival graft (FGG) prior to loading.',
        antiRoboticRationale: 'Considers the soft tissue envelope as equally critical as bone volume for long-term implant survival.'
      }
    ]
  },
  {
    id: 'aap-efp-2017-classification',
    authorityName: 'AAP/EFP 2017 World Workshop Classification of Periodontal & Peri-Implant Diseases',
    sourceType: 'consensus_guideline',
    authors: 'Catón JG, Armitage G, Berglundh T, Chapple IL, Jepsen S, Kornman KS, Tonetti MS',
    citation: 'J Periodontol / J Clin Periodontol 2018; 89(Suppl 1):S1-S8',
    year: 2018,
    specialty: 'periodontics',
    corePrinciples: [
      {
        principleName: 'Diagnostic Criteria for Peri-Implantitis vs Peri-Implant Mucositis',
        description: 'Definitive international diagnostic threshold: Peri-implant mucositis = bleeding on probing without bone loss. Peri-implantitis = bleeding/suppuration PLUS progressive bone loss ≥3 mm or beyond initial remodeling.',
        clinicalRule: 'Active peri-implantitis requires immediate mechanical debridement, antibiotic irrigation, and corrective GBR surgery; progressive loading is absolutely contraindicated.',
        antiRoboticRationale: 'Provides clinically sound differentiation between reversible mucosal inflammation and destructive osseous disease.'
      }
    ]
  },
  {
    id: 'apdsa-ai-concordance-literature',
    authorityName: 'Clinical Concordance & "Would AI Change Your Treatment Plan?" Literature',
    sourceType: 'clinical_trial_meta',
    authors: 'Jung SK, Choi SH, Kim YH, et al. (Angle Orthod, AJODO, Sci Rep)',
    citation: 'Angle Orthod 2021;91(4):450-458; Sci Rep 2021;11:15152; J Dent 2023;135:104589',
    year: 2023,
    specialty: 'ai_concordance',
    corePrinciples: [
      {
        principleName: 'AI vs Orthodontic Expert Decision Concordance',
        description: 'Demonstrates 93.8% concordance between deep learning diagnostic models and board-certified orthodontists on extraction decisions.',
        clinicalRule: 'AI treatment planning systems must provide the biological reasoning behind extraction recommendations (crowding index, profile angle, incisor inclination) to allow clinician verification.',
        antiRoboticRationale: 'Odonto AI functions as a transparent Clinical Decision Support System (CDSS) rather than an unexplainable black box.'
      },
      {
        principleName: 'Reduction of Inter-Examiner Variability via Deterministic Biomechanics',
        description: 'Clinical studies show that when general practitioners use deterministic CDSS, border-line treatment planning errors (unjustified extractions or excessive expansion) drop by 42%.',
        clinicalRule: 'All AI-synthesized plans must couple LLM prose with deterministic verification of force, anchorage, and bone boundaries.',
        antiRoboticRationale: 'Prevents clinician liability and ensures defensive medicine compliance.'
      }
    ]
  }
];

// Helper query function to retrieve relevant authoritative guidelines
export function queryAuthoritativeGuidelines(options: {
  specialty?: 'orthodontics' | 'implantology' | 'periodontics' | 'orthognathic_surgery' | 'ai_concordance';
  searchQuery?: string;
}): ClinicalAuthority[] {
  let results = REPUTABLE_CLINICAL_AUTHORITIES;

  if (options.specialty) {
    results = results.filter(a => a.specialty === options.specialty || a.specialty === 'ai_concordance');
  }

  if (options.searchQuery) {
    const q = options.searchQuery.toLowerCase();
    results = results.filter(a => 
      a.authorityName.toLowerCase().includes(q) ||
      a.authors.toLowerCase().includes(q) ||
      a.corePrinciples.some(p => p.principleName.toLowerCase().includes(q) || p.clinicalRule.toLowerCase().includes(q))
    );
  }

  return results;
}
