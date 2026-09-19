export type ComplicationCategory = 'surgical' | 'biological' | 'mechanical' | 'prosthetic' | 'aesthetic';
export type ComplicationSeverity = 'minor' | 'moderate' | 'major' | 'critical';
export type ComplicationTiming = 'intraoperative' | 'early-postop' | 'late-postop' | 'prosthetic-phase';

export interface ImplantComplication {
  id: string;
  name: string;
  category: ComplicationCategory;
  severity: ComplicationSeverity;
  timing: ComplicationTiming;
  incidenceRate: string;
  description: string;
  etiology: string[];
  riskFactors: string[];
  clinicalSigns: string[];
  diagnosticMethods: string[];
  immediateManagement: string[];
  definitiveManagement: string[];
  prevention: string[];
  prognosis: string;
  referralCriteria: string[];
}

export interface RiskFactor {
  id: string;
  name: string;
  category: 'systemic' | 'local' | 'behavioral' | 'medication';
  riskLevel: 'relative-contraindication' | 'increased-risk' | 'absolute-contraindication';
  description: string;
  affectedOutcomes: string[];
  mitigationStrategies: string[];
  evidenceLevel: 'high' | 'moderate' | 'low';
}

export const implantComplications: ImplantComplication[] = [
  // Surgical
  {
    id: 'surg-001',
    name: 'Mandibular nerve injury (IAN paresthesia)',
    category: 'surgical',
    severity: 'major',
    timing: 'intraoperative',
    incidenceRate: '0.5-5%',
    description: 'Injury to the inferior alveolar nerve during osteotomy preparation or implant placement, leading to altered sensation.',
    etiology: ['Direct trauma from drill or implant', 'Compression from hematoma', 'Thermal injury'],
    riskFactors: ['Proximity to IAN canal < 2mm', 'Inadequate imaging', 'Operator inexperience'],
    clinicalSigns: ['Numbness, tingling, or pain in the lip/chin', 'Bleeding from osteotomy'],
    diagnosticMethods: ['CBCT', 'Neurosensory testing (two-point discrimination, thermal)'],
    immediateManagement: ['Stop procedure', 'Back out implant if compressing', 'Administer steroids'],
    definitiveManagement: ['Microneurosurgery if nerve is severed', 'Wait and monitor if mild neuropraxia'],
    prevention: ['Maintain >2mm safety zone from IAN', 'Use CBCT for planning', 'Use drill stops'],
    prognosis: 'Variable; ranges from full recovery in weeks to permanent paresthesia.',
    referralCriteria: ['Severe pain', 'No improvement after 3 months', 'Suspected transection']
  },
  {
    id: 'surg-002',
    name: 'Hemorrhage (sublingual/submental artery perforation)',
    category: 'surgical',
    severity: 'critical',
    timing: 'intraoperative',
    incidenceRate: '<1%',
    description: 'Life-threatening bleeding caused by lingual cortex perforation in the anterior/premolar mandible.',
    etiology: ['Drill perforation of lingual cortex', 'Laceration of sublingual or submental vessels'],
    riskFactors: ['Severe lingual undercut', 'Inadequate flap reflection', 'Lack of CBCT'],
    clinicalSigns: ['Rapid swelling of floor of mouth', 'Airway compromise', 'Profuse bleeding'],
    diagnosticMethods: ['Clinical observation of expanding hematoma'],
    immediateManagement: ['Digital pressure on lingual aspect', 'Protect airway (intubation/cricothyroidotomy)', 'Call emergency services'],
    definitiveManagement: ['Surgical exploration and vessel ligation', 'Hospital admission'],
    prevention: ['Avoid lingual tilt', 'Palpate lingual concavity', 'Flap reflection to visualize cortex'],
    prognosis: 'Good if managed promptly; fatal if airway is compromised.',
    referralCriteria: ['Any uncontrolled bleeding', 'Airway threat']
  },
  {
    id: 'surg-003',
    name: 'Sinus membrane perforation',
    category: 'surgical',
    severity: 'moderate',
    timing: 'intraoperative',
    incidenceRate: '10-56%',
    description: 'Tearing of the Schneiderian membrane during sinus floor elevation procedures.',
    etiology: ['Excessive force', 'Sharp instruments', 'Thin membrane', 'Septa'],
    riskFactors: ['Membrane <1mm thick', 'Presence of Underwood septa', 'Maxillary cyst or pathology'],
    clinicalSigns: ['Visible tear', 'Loss of resistance', 'Valsalva maneuver positive (air bubbling)'],
    diagnosticMethods: ['Direct visualization', 'Endoscopy'],
    immediateManagement: ['Use resorbable collagen membrane to repair small tears', 'Abort procedure if large >10mm'],
    definitiveManagement: ['Allow healing for 4-6 months before re-entry if aborted'],
    prevention: ['Gentle manipulation', 'Piezoelectric surgery', 'Thorough CBCT evaluation'],
    prognosis: 'Excellent for small tears repaired properly; increased risk of graft failure and sinusitis for large tears.',
    referralCriteria: ['Large unrepairable tear', 'Development of acute sinusitis post-op']
  },
  {
    id: 'surg-004',
    name: 'Drill overheating / bone necrosis',
    category: 'surgical',
    severity: 'major',
    timing: 'intraoperative',
    incidenceRate: 'Unknown (rare with proper technique)',
    description: 'Thermal necrosis of bone caused by temperatures exceeding 47°C for more than 1 minute.',
    etiology: ['Insufficient irrigation', 'Dull drills', 'Excessive drilling pressure/speed'],
    riskFactors: ['Dense bone (Type I)', 'Inadequate cooling', 'Deep osteotomies'],
    clinicalSigns: ['Lack of primary stability', 'Fibrous encapsulation', 'Early implant failure'],
    diagnosticMethods: ['Radiographic radiolucency around implant early post-op'],
    immediateManagement: ['Avoid implant placement if bone looks charred', 'Curette affected bone'],
    definitiveManagement: ['Remove failed implant', 'Debride', 'Graft and wait for healing'],
    prevention: ['Copious chilled irrigation', 'Sharp drills', 'Intermittent drilling (pecking motion)', 'Low RPM'],
    prognosis: 'Poor for the affected site without debridement and regeneration.',
    referralCriteria: ['Extensive necrosis requiring major reconstruction']
  },
  {
    id: 'surg-005',
    name: 'Adjacent tooth/root damage',
    category: 'surgical',
    severity: 'moderate',
    timing: 'intraoperative',
    incidenceRate: '1-3%',
    description: 'Iatrogenic damage to the root of a neighboring tooth during osteotomy.',
    etiology: ['Incorrect drill angulation', 'Inadequate interdental space'],
    riskFactors: ['Converging roots', 'Space < 7mm', 'Lack of surgical guide'],
    clinicalSigns: ['Patient pain (if unanesthetized tooth)', 'Loss of vitality later'],
    diagnosticMethods: ['Periapical radiograph', 'CBCT'],
    immediateManagement: ['Back out drill', 'Redirect osteotomy if possible'],
    definitiveManagement: ['Endodontic treatment of damaged tooth', 'Extraction if severely damaged'],
    prevention: ['Use surgical guides', 'Parallel pins', 'Radiographs during surgery'],
    prognosis: 'Depends on extent of damage; minor nicks may heal, deep gouges require endo/extraction.',
    referralCriteria: ['Need for complex endodontic therapy']
  },
  {
    id: 'surg-006',
    name: 'Implant malpositioning',
    category: 'surgical',
    severity: 'major',
    timing: 'intraoperative',
    incidenceRate: 'Varies',
    description: 'Placement of the implant in an incorrect 3D position, compromising prosthetics or aesthetics.',
    etiology: ['Poor planning', 'Freehand errors', 'Anatomical restrictions'],
    riskFactors: ['Lack of guide', 'Inadequate bone volume', 'Inexperienced surgeon'],
    clinicalSigns: ['Poor emergence profile', 'Impossible restorative axis'],
    diagnosticMethods: ['Radiographs', 'Clinical inspection with guide pin'],
    immediateManagement: ['Remove and reposition if possible'],
    definitiveManagement: ['Custom abutments', 'Orthodontic extrusion', 'Implant removal (sleep/explant)'],
    prevention: ['Prosthetically driven planning', 'Computer-guided surgery'],
    prognosis: 'Guarded for ideal aesthetics if uncorrected.',
    referralCriteria: ['Complex prosthodontic correction required']
  },
  {
    id: 'surg-007',
    name: 'Primary stability failure',
    category: 'surgical',
    severity: 'moderate',
    timing: 'intraoperative',
    incidenceRate: '1-5%',
    description: 'Failure to achieve adequate insertion torque (<15 Ncm) for osseointegration.',
    etiology: ['Over-preparation of osteotomy', 'Poor bone quality (Type IV)'],
    riskFactors: ['Posterior maxilla', 'Osteoporosis', 'Short/narrow implants'],
    clinicalSigns: ['Implant spins freely in osteotomy'],
    diagnosticMethods: ['Insertion torque value', 'ISQ (Resonance Frequency Analysis)'],
    immediateManagement: ['Use wider implant', 'Undersize osteotomy', 'Submerge and allow to heal'],
    definitiveManagement: ['Two-stage approach with prolonged healing (4-6 months)'],
    prevention: ['Bone density assessment', 'Undersizing drills in soft bone', 'Tapered implants'],
    prognosis: 'Good if undisturbed during healing.',
    referralCriteria: ['Need for extensive grafting']
  },
  {
    id: 'surg-008',
    name: 'Mandible fracture',
    category: 'surgical',
    severity: 'critical',
    timing: 'intraoperative',
    incidenceRate: '<1%',
    description: 'Fracture of the mandible during or after implant placement, typically in severely atrophic ridges.',
    etiology: ['Excessive lateral force', 'Wedge effect of implant', 'Extreme atrophy'],
    riskFactors: ['Mandibular height < 10mm', 'Osteoporosis', 'Aggressive torque'],
    clinicalSigns: ['Loud crack', 'Mobility of jaw segments', 'Malocclusion', 'Severe pain'],
    diagnosticMethods: ['Panoramic radiograph', 'CBCT'],
    immediateManagement: ['Stabilize segments', 'Refer to OMFS'],
    definitiveManagement: ['Open reduction and internal fixation (ORIF)'],
    prevention: ['Avoid excessive torque in thin mandibles', 'Consider grafting first', 'Use short implants'],
    prognosis: 'Requires major surgery, delays implant therapy significantly.',
    referralCriteria: ['OMFS referral mandatory']
  },

  // Biological
  {
    id: 'bio-001',
    name: 'Peri-implantitis',
    category: 'biological',
    severity: 'major',
    timing: 'late-postop',
    incidenceRate: '12-43%',
    description: 'Plaque-associated pathological condition occurring in tissues around dental implants, characterized by inflammation in the peri-implant mucosa and subsequent progressive loss of supporting bone (>2mm).',
    etiology: ['Bacterial biofilm (similar to periodontitis)'],
    riskFactors: ['History of periodontitis', 'Smoking', 'Poor plaque control', 'Excess cement'],
    clinicalSigns: ['Bleeding on probing (BOP)', 'Suppuration', 'Increased probing depths (>6mm)', 'Mucosal erythema'],
    diagnosticMethods: ['Periodontal probing', 'Radiographic evidence of crestal bone loss'],
    immediateManagement: ['Mechanical debridement', 'Local antimicrobials', 'Oral hygiene instruction'],
    definitiveManagement: ['Surgical intervention (open flap debridement, implant surface decontamination, regenerative/resective surgery)'],
    prevention: ['Regular maintenance (3-6 month intervals)', 'Optimal 3D positioning', 'Accessible prosthesis design'],
    prognosis: 'Guarded; complete resolution is challenging. Often leads to implant loss if untreated.',
    referralCriteria: ['Advanced bone loss', 'Lack of response to non-surgical therapy', 'Complex surgical needs']
  },
  {
    id: 'bio-002',
    name: 'Peri-mucositis',
    category: 'biological',
    severity: 'minor',
    timing: 'late-postop',
    incidenceRate: '19-65%',
    description: 'Reversible inflammatory lesion of the soft tissues surrounding a dental implant, without loss of supporting bone.',
    etiology: ['Bacterial biofilm accumulation'],
    riskFactors: ['Poor oral hygiene', 'Smoking', 'Inadequate restoration contours'],
    clinicalSigns: ['BOP', 'Erythema', 'Swelling', 'No radiographic bone loss'],
    diagnosticMethods: ['Probing (BOP+)', 'Radiographs (to rule out peri-implantitis)'],
    immediateManagement: ['Mechanical debridement', 'Chlorhexidine rinse', 'OHI'],
    definitiveManagement: ['Adjust prosthesis if impeding hygiene'],
    prevention: ['Proper oral hygiene', 'Regular recall'],
    prognosis: 'Excellent; completely reversible with adequate plaque control.',
    referralCriteria: ['Progression to peri-implantitis']
  },
  {
    id: 'bio-003',
    name: 'Early implant failure',
    category: 'biological',
    severity: 'major',
    timing: 'early-postop',
    incidenceRate: '1-6%',
    description: 'Failure to establish osseointegration before prosthetic loading.',
    etiology: ['Surgical trauma (overheating)', 'Infection', 'Micromotion >150µm', 'Poor bone quality'],
    riskFactors: ['Smoking', 'Uncontrolled diabetes', 'Immediate loading with poor stability'],
    clinicalSigns: ['Pain', 'Mobility', 'Suppuration', 'Radiolucency around implant'],
    diagnosticMethods: ['Clinical mobility testing', 'Radiographs', 'ISQ'],
    immediateManagement: ['Explantation (removal of implant)'],
    definitiveManagement: ['Debride socket, graft, and wait 4-6 months for re-implantation'],
    prevention: ['Atraumatic surgery', 'Adequate healing time', 'Strict infection control'],
    prognosis: 'Good for second attempt if underlying cause is addressed.',
    referralCriteria: ['Severe infection', 'Extensive bone loss requiring complex grafting']
  },
  {
    id: 'bio-004',
    name: 'Late implant failure',
    category: 'biological',
    severity: 'major',
    timing: 'late-postop',
    incidenceRate: '3-10% over 10 years',
    description: 'Loss of osseointegration after successful initial integration and loading.',
    etiology: ['Progressive peri-implantitis', 'Biomechanical overload'],
    riskFactors: ['Bruxism', 'Smoking', 'History of periodontitis', 'Poor prosthetic design'],
    clinicalSigns: ['Mobility', 'Pain on biting', 'Severe bone loss on radiographs'],
    diagnosticMethods: ['Radiographs', 'Clinical mobility'],
    immediateManagement: ['Explantation'],
    definitiveManagement: ['Grafting and eventual re-treatment or alternative prosthetics'],
    prevention: ['Nightguards for bruxers', 'Regular maintenance', 'Proper occlusal scheme'],
    prognosis: 'Site often compromised for immediate replacement.',
    referralCriteria: ['Need for advanced reconstruction']
  },
  {
    id: 'bio-005',
    name: 'Crestal bone loss',
    category: 'biological',
    severity: 'moderate',
    timing: 'early-postop',
    incidenceRate: 'Common',
    description: 'Pathologic bone loss >0.2mm/year after initial remodeling (biologic width establishment).',
    etiology: ['Microgap location', 'Repeated abutment disconnections', 'Excessive occlusal stress'],
    riskFactors: ['Thin biotype', 'Subcrestal placement of non-platform switched implants'],
    clinicalSigns: ['Usually asymptomatic initially', 'Increasing probing depths'],
    diagnosticMethods: ['Standardized periapical radiographs'],
    immediateManagement: ['Identify and mitigate cause (e.g., adjust occlusion, improve hygiene)'],
    definitiveManagement: ['Surgical intervention if progressive (similar to peri-implantitis)'],
    prevention: ['Platform switching', 'One-abutment one-time concept', 'Thick tissue biotype'],
    prognosis: 'Stable if cause removed; progresses to peri-implantitis if ignored.',
    referralCriteria: ['Progression to peri-implantitis']
  },
  {
    id: 'bio-006',
    name: 'Soft tissue recession',
    category: 'biological',
    severity: 'moderate',
    timing: 'prosthetic-phase',
    incidenceRate: '10-25% in aesthetic zone',
    description: 'Apical migration of the peri-implant mucosal margin, exposing abutment or implant threads.',
    etiology: ['Buccal malposition of implant', 'Thin tissue biotype', 'Lack of buccal bone'],
    riskFactors: ['Immediate placement in thin biotype', 'Over-contoured restoration'],
    clinicalSigns: ['Visible metal/abutment', 'Aesthetic complaint'],
    diagnosticMethods: ['Clinical examination', 'Periodontal probing'],
    immediateManagement: ['Modify prosthesis contours'],
    definitiveManagement: ['Soft tissue grafting (CTG)', 'Removal and replacement if severely malpositioned'],
    prevention: ['Proper 3D placement (palatal bias)', 'Connective tissue grafting at placement'],
    prognosis: 'Guarded; soft tissue grafting around implants is less predictable than around teeth.',
    referralCriteria: ['Aesthetic failure requiring complex mucogingival surgery']
  },

  // Mechanical
  {
    id: 'mech-001',
    name: 'Screw loosening',
    category: 'mechanical',
    severity: 'minor',
    timing: 'prosthetic-phase',
    incidenceRate: '5-12% at 5 years',
    description: 'Loss of preload in the abutment or prosthetic screw, leading to mobility of the restoration.',
    etiology: ['Inadequate tightening torque', 'Occlusal overload', 'Non-passive fit of framework'],
    riskFactors: ['Single posterior crowns', 'Bruxism', 'External hex connections'],
    clinicalSigns: ['Clicking sound', 'Restoration mobility', 'Patient complains of loose tooth'],
    diagnosticMethods: ['Clinical examination', 'Radiograph to check for gap/fracture'],
    immediateManagement: ['Remove restoration/access hole, retighten to manufacturer specs'],
    definitiveManagement: ['Replace screw if deformed', 'Adjust occlusion', 'Evaluate framework fit'],
    prevention: ['Use torque wrench', 'Proper occlusal adjustment', 'Internal connections'],
    prognosis: 'Excellent if caught early; neglected loosening leads to screw fracture.',
    referralCriteria: ['Repeated loosening indicating fundamental design flaw']
  },
  {
    id: 'mech-002',
    name: 'Screw fracture',
    category: 'mechanical',
    severity: 'major',
    timing: 'prosthetic-phase',
    incidenceRate: '1-4%',
    description: 'Fatigue failure and breakage of the abutment or prosthetic screw inside the implant.',
    etiology: ['Chronic screw loosening', 'Severe bruxism', 'Non-passive fit'],
    riskFactors: ['History of loosening', 'Heavy occlusal forces', 'Cantilevers'],
    clinicalSigns: ['Restoration falls out with piece of screw', 'Retained fragment visible'],
    diagnosticMethods: ['Radiograph to assess fragment position'],
    immediateManagement: ['Retrieve broken fragment using specialized rescue kits'],
    definitiveManagement: ['Fabricate new prosthesis if fit was poor', 'Adjust occlusion'],
    prevention: ['Address screw loosening promptly', 'Avoid long cantilevers'],
    prognosis: 'Good if fragment can be removed without damaging internal threads; poor if internal threads destroyed.',
    referralCriteria: ['Inability to retrieve fragment']
  },
  {
    id: 'mech-003',
    name: 'Implant body fracture',
    category: 'mechanical',
    severity: 'critical',
    timing: 'late-postop',
    incidenceRate: '0.1-0.5%',
    description: 'Catastrophic structural failure of the implant fixture itself.',
    etiology: ['Metal fatigue from severe overload', 'Progressive bone loss acting as lever arm'],
    riskFactors: ['Narrow diameter implants (<3.5mm) in posterior', 'Severe bruxism', 'Advanced bone loss'],
    clinicalSigns: ['Mobility', 'Pain', 'Visible fracture on radiograph'],
    diagnosticMethods: ['Periapical radiograph'],
    immediateManagement: ['Explantation of fragments'],
    definitiveManagement: ['Grafting and replacement with wider implant if possible'],
    prevention: ['Appropriate implant diameter for site', 'Manage bruxism', 'Prevent bone loss'],
    prognosis: 'Terminal for the implant. Requires complete redo.',
    referralCriteria: ['Complex explantation and grafting required']
  },
  {
    id: 'mech-004',
    name: 'Abutment fracture',
    category: 'mechanical',
    severity: 'major',
    timing: 'prosthetic-phase',
    incidenceRate: '<1%',
    description: 'Breakage of the abutment component.',
    etiology: ['Over-preparation of custom abutment', 'Material failure (zirconia)'],
    riskFactors: ['Zirconia abutments in posterior', 'Internal connection with thin walls', 'Bruxism'],
    clinicalSigns: ['Restoration detaches with broken abutment inside'],
    diagnosticMethods: ['Clinical exam', 'Radiograph'],
    immediateManagement: ['Remove remaining abutment piece from implant'],
    definitiveManagement: ['Fabricate new abutment (preferably titanium) and crown'],
    prevention: ['Titanium bases for zirconia abutments', 'Sufficient material thickness'],
    prognosis: 'Good, usually easily restorable.',
    referralCriteria: ['Damage to implant internal connection during failure']
  },

  // Prosthetic & Aesthetic
  {
    id: 'pros-001',
    name: 'Porcelain chipping/fracture',
    category: 'prosthetic',
    severity: 'moderate',
    timing: 'prosthetic-phase',
    incidenceRate: '5-10% at 5 years',
    description: 'Fracture of the veneering porcelain on an implant-supported restoration.',
    etiology: ['Lack of proprioception in implants', 'Bruxism', 'Poor framework design'],
    riskFactors: ['Ceramo-metal restorations', 'Opposing implant restorations', 'Heavy occlusion'],
    clinicalSigns: ['Visible chip', 'Rough edge', 'Aesthetic concern'],
    diagnosticMethods: ['Clinical examination'],
    immediateManagement: ['Polish rough edges', 'Composite repair (temporary)'],
    definitiveManagement: ['Remake crown', 'Consider monolithic materials (Zirconia, e.max)'],
    prevention: ['Monolithic restorations in posterior', 'Nightguards', 'Proper occlusal design (shallow guidance)'],
    prognosis: 'Good, but repetitive failure indicates need for material or occlusal scheme change.',
    referralCriteria: ['Full arch reconstruction needed']
  },
  {
    id: 'pros-002',
    name: 'Framework fracture',
    category: 'prosthetic',
    severity: 'major',
    timing: 'prosthetic-phase',
    incidenceRate: '1-3%',
    description: 'Structural failure of the metal or zirconia framework in multi-unit prostheses.',
    etiology: ['Inadequate framework bulk', 'Long cantilevers', 'Poor alloy selection'],
    riskFactors: ['All-on-4 with long cantilevers (>1.5x AP spread)', 'Bruxism'],
    clinicalSigns: ['Mobility of a segment of the bridge', 'Visible crack'],
    diagnosticMethods: ['Clinical exam', 'Radiograph'],
    immediateManagement: ['Remove prosthesis to prevent implant damage'],
    definitiveManagement: ['Remake framework with increased dimensions or stronger material'],
    prevention: ['Respect AP spread guidelines', 'Adequate connector dimensions'],
    prognosis: 'Requires complete remake of the prosthesis.',
    referralCriteria: ['Complex prosthodontic failure']
  },
  {
    id: 'pros-003',
    name: 'Cement remnants',
    category: 'prosthetic',
    severity: 'moderate',
    timing: 'prosthetic-phase',
    incidenceRate: 'Common',
    description: 'Incomplete removal of cement leading to peri-implant inflammation and bone loss.',
    etiology: ['Deep subgingival margins', 'Excess cement used', 'Inadequate cleanup'],
    riskFactors: ['Cement-retained restorations', 'Margins >1.5mm subgingival'],
    clinicalSigns: ['Inflammation', 'BOP', 'Suppuration shortly after delivery'],
    diagnosticMethods: ['Radiographs (if cement is radiopaque)', 'Surgical exploration'],
    immediateManagement: ['Careful scaling to remove cement', 'Irrigation'],
    definitiveManagement: ['Surgical flap to ensure complete removal if deep'],
    prevention: ['Screw-retained restorations', 'Custom abutments with equigingival margins', 'Copy abutment technique'],
    prognosis: 'Good if removed early; can cause rapid severe bone loss if left.',
    referralCriteria: ['Deep cement requiring surgical access']
  },
  {
    id: 'pros-004',
    name: 'Decementation',
    category: 'prosthetic',
    severity: 'minor',
    timing: 'prosthetic-phase',
    incidenceRate: 'Frequent with temporary cements',
    description: 'Loss of retention of a cement-retained crown.',
    etiology: ['Inadequate abutment height (<4mm)', 'Excessive taper', 'Weak cement'],
    riskFactors: ['Short clinical crowns', 'Heavy occlusion'],
    clinicalSigns: ['Crown falls off'],
    diagnosticMethods: ['Clinical observation'],
    immediateManagement: ['Clean and recement'],
    definitiveManagement: ['Modify abutment (add grooves)', 'Change to stronger cement', 'Remake as screw-retained'],
    prevention: ['Adequate abutment height/taper', 'Sandblasting abutment'],
    prognosis: 'Good, easily managed.',
    referralCriteria: ['None usually']
  },
  {
    id: 'pros-005',
    name: 'Phonetic issues',
    category: 'prosthetic',
    severity: 'moderate',
    timing: 'prosthetic-phase',
    incidenceRate: 'Varies',
    description: 'Speech difficulties, such as lisping or air escape, following delivery of prosthesis.',
    etiology: ['Altered palatal contours', 'Spaces between implants/pontics (air escape)'],
    riskFactors: ['Maxillary full arch prostheses', 'Severe ridge resorption'],
    clinicalSigns: ['Patient complaints regarding "S" or "F" sounds', 'Spitting while talking'],
    diagnosticMethods: ['Speech evaluation'],
    immediateManagement: ['Identify specific sounds affected'],
    definitiveManagement: ['Add composite/pink acrylic to close spaces or alter palatal contour'],
    prevention: ['Thorough provisionalization phase to test phonetics', 'Palatal design replicating natural rugae'],
    prognosis: 'Usually adaptable by patient or correctable with modifications.',
    referralCriteria: ['Severe phonetic failure requiring complete remake']
  },
  {
    id: 'aes-001',
    name: 'Aesthetic failure',
    category: 'aesthetic',
    severity: 'major',
    timing: 'prosthetic-phase',
    incidenceRate: 'Subjective',
    description: 'Unacceptable visual outcome due to color mismatch, dark margins, black triangles, or gingival asymmetry.',
    etiology: ['Implant malposition', 'Tissue loss', 'Poor restorative materials'],
    riskFactors: ['High smile line', 'Thin biotype', 'Immediate placement without grafting'],
    clinicalSigns: ['Lack of papillae', 'Grey hue through gingiva', 'Crown too long'],
    diagnosticMethods: ['Visual assessment', 'Photography', 'Patient feedback'],
    immediateManagement: ['Manage patient expectations'],
    definitiveManagement: ['Pink porcelain', 'Soft tissue grafting', 'Remake crown', 'In extreme cases, explantation'],
    prevention: ['Comprehensive aesthetic risk assessment', 'Proper 3D placement', 'Use of zirconia abutments in thin biotypes'],
    prognosis: 'Highly dependent on etiology; some defects are impossible to correct without removal.',
    referralCriteria: ['High aesthetic expectations requiring multi-disciplinary care']
  }
];

export const riskFactors: RiskFactor[] = [
  {
    id: 'rf-001',
    name: 'Smoking',
    category: 'behavioral',
    riskLevel: 'increased-risk',
    description: 'Tobacco use impairs healing, reduces blood flow, and alters immune response.',
    affectedOutcomes: ['Osseointegration failure (2x risk)', 'Peri-implantitis', 'Graft failure'],
    mitigationStrategies: ['Smoking cessation protocol (1 week before, 8 weeks after)', 'Use of rough surface implants'],
    evidenceLevel: 'high'
  },
  {
    id: 'rf-002',
    name: 'Uncontrolled diabetes',
    category: 'systemic',
    riskLevel: 'relative-contraindication',
    description: 'Chronic hyperglycemia (HbA1c > 8%) impairs microcirculation, immune response, and bone remodeling.',
    affectedOutcomes: ['Delayed healing', 'Early implant failure', 'Increased infection risk'],
    mitigationStrategies: ['Medical consult to lower HbA1c < 7.5%', 'Prophylactic antibiotics', 'Chlorhexidine rinses'],
    evidenceLevel: 'high'
  },
  {
    id: 'rf-003',
    name: 'Osteoporosis',
    category: 'systemic',
    riskLevel: 'increased-risk',
    description: 'Metabolic bone disease leading to decreased bone density and altered remodeling.',
    affectedOutcomes: ['Primary stability failure', 'Late failure in severe cases'],
    mitigationStrategies: ['Undersize osteotomies', 'Longer healing periods', 'Surface modified implants'],
    evidenceLevel: 'moderate'
  },
  {
    id: 'rf-004',
    name: 'Bisphosphonate therapy',
    category: 'medication',
    riskLevel: 'relative-contraindication',
    description: 'Anti-resorptive medications that inhibit osteoclasts, severely affecting bone turnover.',
    affectedOutcomes: ['Medication-Related Osteonecrosis of the Jaw (MRONJ)', 'Implant failure'],
    mitigationStrategies: ['Assess route (IV absolute contraindication, Oral < 3 years low risk)', 'CTX test', 'Drug holiday consult'],
    evidenceLevel: 'high'
  },
  {
    id: 'rf-005',
    name: 'Anticoagulant therapy',
    category: 'medication',
    riskLevel: 'increased-risk',
    description: 'Use of blood thinners (Warfarin, NOACs, Antiplatelets) increasing bleeding tendency.',
    affectedOutcomes: ['Intraoperative hemorrhage', 'Post-operative hematoma'],
    mitigationStrategies: ['Check INR (target < 3.0)', 'Local hemostatic measures', 'Do not alter regimen without MD consult'],
    evidenceLevel: 'high'
  },
  {
    id: 'rf-006',
    name: 'Bruxism',
    category: 'behavioral',
    riskLevel: 'increased-risk',
    description: 'Parafunctional habit of teeth grinding or clenching, generating excessive non-axial forces.',
    affectedOutcomes: ['Mechanical failures (3x risk)', 'Screw loosening', 'Fractures', 'Late implant failure'],
    mitigationStrategies: ['Occlusal guard', 'More/wider implants', 'Shallow guidance', 'Avoid cantilevers'],
    evidenceLevel: 'high'
  },
  {
    id: 'rf-007',
    name: 'History of periodontitis',
    category: 'local',
    riskLevel: 'increased-risk',
    description: 'Past susceptibility to plaque-induced bone loss.',
    affectedOutcomes: ['Peri-implantitis (2-3x risk)', 'Late failure'],
    mitigationStrategies: ['Treat active perio before implant placement', 'Strict 3-month maintenance', 'Accessible prosthesis design'],
    evidenceLevel: 'high'
  },
  {
    id: 'rf-008',
    name: 'Radiation therapy (head/neck)',
    category: 'systemic',
    riskLevel: 'relative-contraindication',
    description: 'Prior radiation affecting vascularity and healing capacity of bone (osteoradionecrosis risk).',
    affectedOutcomes: ['Implant failure', 'Osteoradionecrosis (ORN)'],
    mitigationStrategies: ['Assess dose (>50 Gy high risk)', 'Hyperbaric oxygen (HBO) therapy consideration', 'Profound atraumatic technique'],
    evidenceLevel: 'high'
  },
  {
    id: 'rf-009',
    name: 'Immunosuppression',
    category: 'systemic',
    riskLevel: 'increased-risk',
    description: 'Compromised immune system due to disease (HIV) or medication (steroids, anti-rejection).',
    affectedOutcomes: ['Infection', 'Delayed healing', 'Early failure'],
    mitigationStrategies: ['Antibiotic prophylaxis', 'Close monitoring', 'Coordinate with physician'],
    evidenceLevel: 'moderate'
  },
  {
    id: 'rf-010',
    name: 'Poor oral hygiene',
    category: 'behavioral',
    riskLevel: 'relative-contraindication',
    description: 'Inability or unwillingness to maintain low plaque scores.',
    affectedOutcomes: ['Peri-implantitis', 'Peri-mucositis'],
    mitigationStrategies: ['Delay placement until hygiene improves', 'Extensive OHI', 'Consider alternative treatments (dentures)'],
    evidenceLevel: 'high'
  }
];

export function getComplicationsByCategory(category: ComplicationCategory): ImplantComplication[] {
  return implantComplications.filter(comp => comp.category === category);
}

export function assessPatientRiskFactors(factors: string[]): { overallRisk: 'low' | 'moderate' | 'high' | 'contraindicated'; details: RiskFactor[]; recommendations: string[] } {
  const matchedFactors = riskFactors.filter(rf => factors.includes(rf.id) || factors.includes(rf.name));
  
  let overallRisk: 'low' | 'moderate' | 'high' | 'contraindicated' = 'low';
  let recommendations: string[] = [];

  if (matchedFactors.length > 0) {
    overallRisk = 'moderate';
  }

  const hasContraindication = matchedFactors.some(rf => rf.riskLevel === 'absolute-contraindication' || rf.riskLevel === 'relative-contraindication');
  const hasMultipleIncreased = matchedFactors.filter(rf => rf.riskLevel === 'increased-risk').length >= 2;

  if (hasContraindication) {
    overallRisk = 'contraindicated';
  } else if (hasMultipleIncreased) {
    overallRisk = 'high';
  }

  matchedFactors.forEach(rf => {
    recommendations.push(...rf.mitigationStrategies);
  });

  // Remove duplicate recommendations
  recommendations = [...new Set(recommendations)];

  return {
    overallRisk,
    details: matchedFactors,
    recommendations
  };
}
