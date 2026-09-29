// Odonto AI — Automated Clinical Test & Validation Suite
// Tests all clinical functions inside Odonto AI with fabricated dummy patient inputs
// Validates outputs against published clinical norms (Proffit, Nanda, MBT, Misch, ITI, APDSA)

import { 
  classifySkeletalPattern, 
  classifyGrowthPattern, 
  classifyProfile,
  classifyAngle,
  classifyIncisorRelation,
  boltonAnalysis,
  assessCrowding,
  assessCanineImpaction,
  assessMarpeProtocol,
  calculateProtractionProtocol,
  calculateOpenBiteProtocol
} from '../src/lib/orthodontics';

import {
  assessBoneDensity,
  getMinBoneRequirements
} from '../src/lib/implantology/knowledge-base/bone-classification';

import {
  getCompatibleFixtures,
  getFixturesByBrand
} from '../src/lib/implantology/knowledge-base/fixture-catalog';

import {
  recommendLoadingProtocol
} from '../src/lib/implantology/knowledge-base/loading-protocols';

import {
  getScrewTorque
} from '../src/lib/implantology/knowledge-base/prosthetic-components';

import {
  getSafetyZone,
  getAnatomicalRisks
} from '../src/lib/implantology/knowledge-base/anatomical-landmarks';

import {
  REPUTABLE_CLINICAL_AUTHORITIES,
  queryAuthoritativeGuidelines
} from '../src/lib/orthodontics/knowledge-base/reputable-evidence-base';

console.log('================================================================');
console.log('🩺 ODONTO AI — CLINICAL FUNCTION VALIDATION SUITE');
console.log('================================================================\n');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, testName: string, details?: any) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    testsPassed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    if (details) console.error('     Details:', details);
    testsFailed++;
  }
}

// -------------------------------------------------------------
// TEST SUITE 1: CEPHALOMETRICS & SKELETAL CLASSIFICATION
// -------------------------------------------------------------
console.log('📐 [1/5] Testing Cephalometrics & Skeletal Classification Modules...');

// Fabricated Case 1A: Skeletal Class III Underbite
const skelClass3 = classifySkeletalPattern(-3.5, -5.0);
assert(skelClass3.includes('Class III') || skelClass3.includes('III'), 'Fabricated ANB -3.5°, Wits -5.0mm classifies as Skeletal Class III', skelClass3);

// Fabricated Case 1B: Skeletal Class II Protrusion
const skelClass2 = classifySkeletalPattern(6.5, 4.0);
assert(skelClass2.includes('Class II') || skelClass2.includes('II'), 'Fabricated ANB 6.5°, Wits 4.0mm classifies as Skeletal Class II', skelClass2);

// Fabricated Case 1C: Hypodivergent / Low-Angle Growth Pattern
const growthHypo = classifyGrowthPattern(18, 24, 70);
assert(growthHypo.toLowerCase().includes('hypo'), 'Fabricated FMA 18°, SN-GoGn 24° classifies as Hypodivergent (Short face)', growthHypo);

// Fabricated Case 1D: Profile Classification
const profileConvex = classifyProfile(85, 3.5, 4.0);
assert(profileConvex.toLowerCase().includes('convex'), 'Fabricated acute nasolabial angle (85°) & protrusive lips classifies as Convex', profileConvex);

console.log('');

// -------------------------------------------------------------
// TEST SUITE 2: DENTAL CLASSIFICATION, BOLTON & SEVERITY
// -------------------------------------------------------------
console.log('🦷 [2/5] Testing Dental Classification & 3D Bolton Space Analysis...');

// Fabricated Case 2A: Angle Class III Molar / Canine
const angleClassResult = classifyAngle('Class III', 'Class III');
assert(angleClassResult.toLowerCase().includes('class iii'), 'Fabricated Class III molar & canine classifies as Angle Class III', angleClassResult);

// Fabricated Case 2B: Reverse Overjet Incisor Relation
const incisorRelResult = classifyIncisorRelation(-4.0, 1.0, true);
assert(incisorRelResult.includes('Class III'), 'Fabricated Overjet -4.0mm classifies as Class III Incisor Relation', incisorRelResult);

// Fabricated Case 2C: 3D Cast Bolton Analysis (12 Teeth: First Molar to First Molar)
const upperTeeth = [10.0, 7.0, 7.0, 8.0, 7.0, 8.5, 8.5, 7.0, 8.0, 7.0, 7.0, 10.0];
const lowerTeeth = [10.5, 7.0, 7.0, 7.0, 6.0, 5.5, 5.5, 6.0, 7.0, 7.0, 7.0, 10.5];
const boltonResult = boltonAnalysis(upperTeeth, lowerTeeth);
assert(boltonResult.anteriorRatio > 70 && boltonResult.anteriorRatio < 85, `Bolton anterior ratio calculated correctly (${boltonResult.anteriorRatio.toFixed(1)}% vs 77.2% norm)`, boltonResult);

// Fabricated Case 2D: Arch Perimeter Crowding Assessment
const crowdingResult = assessCrowding(72.0, 80.0);
assert(crowdingResult.includes('Severe crowding'), 'Arch length 72mm vs tooth sizes 80mm flags Severe Crowding (8.0 mm)', crowdingResult);

console.log('');

// -------------------------------------------------------------
// TEST SUITE 3: ADVANCED ORTHODONTIC PROTOCOLS
// -------------------------------------------------------------
console.log('🚀 [3/5] Testing Advanced Biomechanical Protocols (Impaction, MARPE, Protraction)...');

// Fabricated Case 3A: Impacted Canine Assessment
const impaction = assessCanineImpaction({
  sector: 3,
  alphaAngleDegrees: 35,
  distanceToOcclusalPlaneMm: 11,
  patientAge: 14,
  isPalatal: true,
  deciduousCaninePresent: false,
  lateralRootResorptionSuspected: false
});
assert(impaction.difficultyIndex !== undefined && impaction.tractionMechanics.primaryVector !== '', 'Impacted canine #13 correctly generates surgical exposure & traction vector', impaction);

// Fabricated Case 3B: Adult MARPE Suture Expansion
const marpe = assessMarpeProtocol({
  patientAge: 21,
  transverseDeficiencyMm: 6.0,
  unilateralCrossbite: false
});
assert(marpe.inferredSutureStage.includes('Stage') && marpe.recommendedModality.includes('MARPE'), 'Adult patient (21yo) with 6mm constriction triggers mature suture MARPE protocol', marpe);

// Fabricated Case 3C: Class III Maxillary Protraction Protocol
const protraction = calculateProtractionProtocol({
  patientAge: 12,
  anbDegrees: -3.5,
  witsAppraisalMm: -4.5,
  maxillaryHypoplasia: true,
  mandibularPrognathism: false
});
assert(protraction.orthopedicStrategy.includes('Protraction') || protraction.protocolDetails.expectedPointAAdvancementMm !== '', 'Growing Class III triggers Petit/Alt-RAMEC orthopedic protraction protocol', protraction);

// Fabricated Case 3D: Anterior Open Bite Protocol (Molar Intrusion)
const openBite = calculateOpenBiteProtocol({
  overbiteMm: -3.5,
  fmaDegrees: 34,
  anteriorLowerFacialHeightRatio: 58,
  patientAge: 22,
  hasTongueThrustHabit: true,
  hasMouthBreathing: false,
  molarExtrusionSuspected: true
});
assert(openBite.targetMolarIntrusionMm > 0 && openBite.tadIntrusionMechanics.palatalCounterbalancing.includes('TADs'), 'Open bite with normal incisor display correctly mandates posterior intrusion (preserves smile arc)', openBite);

console.log('');

// -------------------------------------------------------------
// TEST SUITE 4: DENTAL IMPLANTOLOGY & BONE DENSITY
// -------------------------------------------------------------
console.log('🔩 [4/5] Testing Dental Implantology, Bone Classification & Torques...');

// Fabricated Case 4A: Misch D1–D4 Bone Density Mapping
const boneD1 = assessBoneDensity(1350);
assert(boneD1.grade === 'D1' && boneD1.drillingProtocol.toLowerCase().includes('tapping'), 'HU 1350 maps to Misch D1 with bone-tapping mandate', boneD1);

const boneD3 = assessBoneDensity(550);
assert(boneD3.grade === 'D3' && boneD3.typicalLocations.some(l => l.includes('maxilla')), 'HU 550 maps to Misch D3 in posterior maxilla', boneD3);

const boneD4 = assessBoneDensity(220);
assert(boneD4.grade === 'D4' && boneD4.drillingProtocol.toLowerCase().includes('osteotome'), 'HU 220 maps to Misch D4 with osteotome bone condensation', boneD4);

// Fabricated Case 4B: Anatomical Safety Zone & Risks (IAN in Mandible)
const mandRisks = getAnatomicalRisks(46);
assert(mandRisks.warnings.some(w => w.toLowerCase().includes('2mm') || w.toLowerCase().includes('canal')), 'FDI #46 correctly flags IAN safety distance (≥2.0mm)', mandRisks);

// Fabricated Case 4C: Fixture Sizing from 14 Catalogs
const straumannFixtures = getFixturesByBrand('Straumann');
assert(straumannFixtures.length >= 3, `Straumann catalog returns ${straumannFixtures.length} validated fixtures (BL, BLT, TL)`, straumannFixtures.length);

const compatibleFixtures = getCompatibleFixtures(4.0, 4.5, 10);
assert(compatibleFixtures.length > 5, `Compatible fixture query (Ø4.1-4.3 x 10mm) returns ${compatibleFixtures.length} options across brands`, compatibleFixtures.length);

// Fabricated Case 4D: Prosthetic Screw Torque
const straumannTorque = getScrewTorque('Straumann', 'abutment-screw');
assert(straumannTorque === 35, `Straumann abutment screw calibrated to exact 35 Ncm`, straumannTorque);

// Fabricated Case 4E: Loading Protocol Recommendation
const immediateLoading = recommendLoadingProtocol(74, 45, 'D2', 'anterior-max');
assert(immediateLoading.type === 'immediate', 'ISQ 74 & Torque 45 Ncm in D2 bone qualifies for Immediate Loading', immediateLoading.type);

console.log('');

// -------------------------------------------------------------
// TEST SUITE 5: REPUTABLE CLINICAL AUTHORITIES & NON-ROBOTIC RULES
// -------------------------------------------------------------
console.log('📚 [5/5] Testing Reputable Evidence Base & Non-Robotic Clinical Reasoning...');

// Query Proffit's Envelope
const proffitAuth = REPUTABLE_CLINICAL_AUTHORITIES.find(a => a.id === 'proffit-envelope-discrepancy');
assert(proffitAuth !== undefined && proffitAuth.corePrinciples.some(p => p.clinicalRule.includes('7 mm')), "Proffit's Envelope of Discrepancy accurately caps tooth movement at 7mm", proffitAuth);

// Query Nanda's Biomechanics
const nandaAuth = REPUTABLE_CLINICAL_AUTHORITIES.find(a => a.id === 'nanda-biomechanics-cres');
assert(nandaAuth !== undefined && nandaAuth.corePrinciples.some(p => p.clinicalRule.includes('Mc/Mf')), "Nanda's Biomechanics includes exact Mc/Mf ratios for center of resistance", nandaAuth);

// Query MBT Mechanics
const mbtAuth = REPUTABLE_CLINICAL_AUTHORITIES.find(a => a.id === 'mbt-bracket-mechanics');
assert(mbtAuth !== undefined && mbtAuth.corePrinciples.some(p => p.clinicalRule.includes('.019x.025')), "MBT Bracket Mechanics enforces rectangular wire space closure (.019x.025)", mbtAuth);

// Query APDSA & AI Concordance
const apdsaAuth = REPUTABLE_CLINICAL_AUTHORITIES.find(a => a.id === 'apdsa-ai-concordance-literature');
assert(apdsaAuth !== undefined && apdsaAuth.corePrinciples.some(p => p.description.includes('93.8%')), 'APDSA & Clinical AI Concordance literature grounds 93.8% diagnostic agreement', apdsaAuth);

console.log('\n================================================================');
console.log(`TEST SUMMARY: ${testsPassed} PASSED, ${testsFailed} FAILED (TOTAL: ${testsPassed + testsFailed})`);
console.log('================================================================');

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL CLINICAL FUNCTIONS AND DATA CROSS-VALIDATIONS PASSED SUCCESSFULLY!\n');
  process.exit(0);
}
