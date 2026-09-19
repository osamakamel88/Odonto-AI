import { NextResponse } from 'next/server';
import { openai } from '@/lib/ai/openai';
import { IMPLANT_PLAN_SYSTEM_PROMPT, buildImplantPlanUserPrompt } from '@/lib/ai/prompts/implant-plan';
import {
  selectFixtures,
  assessBoneSite,
  calculateProstheticPlan,
  analyzeImplantRisks,
  BoneDensity,
  getDrillingSequence,
  sinusLiftProtocols,
  gbrProtocols
} from '@/lib/implantology';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      patientData = {},
      siteData = {},
      medicalProfile = {},
      preferredBrand
    } = body;

    const patientName = patientData?.name || 'Implant Patient';
    const patientAge = Number(patientData?.age) || 45;
    const gender = patientData?.gender || 'male';
    const chiefComplaint = patientData?.chiefComplaint || 'Replacement of missing tooth with implant';

    const fdiPosition = Number(siteData?.fdiPosition) || 16;
    const boneWidth = Number(siteData?.boneWidth) || 6.5;
    const boneHeight = Number(siteData?.boneHeight) || 11.0;
    const boneDensity: BoneDensity = siteData?.boneDensity || 'D2';
    const interarchSpace = Number(siteData?.interarchSpace) || 8.0;
    const gingivalThickness = Number(siteData?.gingivalThickness) || 2.5;
    const angulationOffset = Number(siteData?.angulationOffset) || 5;

    // Check OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    const hasValidKey = apiKey && apiKey.startsWith('sk-') && !apiKey.includes('placeholder') && apiKey !== 'sk-your-key-here';

    // 1. Try OpenAI Live Call
    if (hasValidKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const response = await openai.chat.completions.create(
          {
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: `${IMPLANT_PLAN_SYSTEM_PROMPT}\nIncorporate exact patient "${patientName}", Tooth #${fdiPosition}, Width: ${boneWidth}mm, Height: ${boneHeight}mm, Density: ${boneDensity}.`
              },
              {
                role: 'user',
                content: buildImplantPlanUserPrompt({
                  patient: { name: patientName, age: patientAge, gender, chiefComplaint },
                  site: {
                    fdiPosition,
                    boneWidth,
                    boneHeight,
                    boneDensity,
                    isImmediateSocket: siteData?.isImmediateSocket,
                    socketType: siteData?.socketType,
                    sinusFloorDistance: siteData?.sinusFloorDistance,
                    ianDistance: siteData?.ianDistance,
                    interarchSpace,
                    gingivalThickness
                  },
                  medicalProfile,
                  preferredBrand
                })
              }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.2
          },
          { signal: controller.signal }
        );

        clearTimeout(timeoutId);
        const parsed = JSON.parse(response.choices[0].message.content || '{}');

        if (parsed && (parsed.fixtureSelection || parsed.siteAssessment || parsed.surgicalProtocol)) {
          return NextResponse.json({
            success: true,
            source: 'OpenAI GPT-4o (Live Surgical CoT)',
            data: {
              patientName,
              patientAge,
              fdiPosition,
              chiefComplaint,
              aiEngineSource: 'OpenAI GPT-4o (Cloud Reasoning)',
              generatedAt: new Date().toLocaleTimeString(),
              ...parsed
            }
          });
        }
      } catch (err: any) {
        console.warn('OpenAI live call failed or timed out for implant plan. Executing deterministic Implantology Engine:', err?.message);
      }
    }

    // 2. High-Fidelity Deterministic Fallback Engine
    // Runs mathematical calculators for fixtures, bone, prosthetics, and risk
    const fixtureResult = selectFixtures({
      fdiPosition,
      boneWidth,
      boneHeight,
      boneDensity,
      loadingIntent: siteData?.loadingIntent || 'conventional',
      aestheticZone: siteData?.isAestheticZone,
      preferredBrand
    });

    const boneResult = assessBoneSite({
      fdiPosition,
      boneWidth,
      boneHeight,
      boneDensity,
      isImmediateSocket: siteData?.isImmediateSocket,
      socketType: siteData?.socketType,
      sinusFloorDistance: siteData?.sinusFloorDistance,
      ianDistance: siteData?.ianDistance,
      keratinizedTissueWidth: siteData?.keratinizedTissueWidth
    });

    const bestFixtureRec = fixtureResult.recommendations[0];
    const chosenDiameter = bestFixtureRec ? bestFixtureRec.recommendedDiameter : Math.min(boneWidth - 3, 4.3);
    const chosenLength = bestFixtureRec ? bestFixtureRec.recommendedLength : Math.min(boneHeight - 2, 10.0);
    const chosenBrand = bestFixtureRec?.fixture.brand || preferredBrand || 'Straumann';
    const chosenSystem = bestFixtureRec?.fixture.system || 'Bone Level Tapered (BLT)';

    const prostheticResult = calculateProstheticPlan({
      fdiPosition,
      implantLength: chosenLength,
      implantDiameter: chosenDiameter,
      implantSystem: chosenBrand,
      interarchSpace,
      gingivalThickness,
      implantAngulationOffset: angulationOffset,
      parafunction: medicalProfile?.bruxism,
      isAestheticZone: siteData?.isAestheticZone
    });

    const riskResult = analyzeImplantRisks({
      patient: {
        smokingStatus: medicalProfile?.smokingStatus || 'non-smoker',
        diabetesStatus: medicalProfile?.diabetesStatus || 'none',
        bisphosphonates: {
          taking: !!medicalProfile?.bisphosphonates,
          route: medicalProfile?.bisphosphonateRoute || 'oral',
          durationYears: medicalProfile?.bisphosphonateYears || 1
        },
        anticoagulants: {
          taking: !!medicalProfile?.anticoagulants,
          drugClass: medicalProfile?.anticoagulantClass || 'antiplatelet'
        },
        historyOfPeriodontitis: medicalProfile?.historyOfPeriodontitis || 'none',
        bruxismOrClenching: !!medicalProfile?.bruxism,
        radiationTherapyHeadNeck: !!medicalProfile?.radiation,
        osteoporosis: !!medicalProfile?.osteoporosis,
        immunosuppressed: !!medicalProfile?.immunosuppressed
      },
      site: {
        distanceToIAN: siteData?.ianDistance,
        distanceToSinusFloor: siteData?.sinusFloorDistance,
        distanceToAdjacentRoots: siteData?.distanceToAdjacentRoots,
        buccalBoneThickness: boneResult.safetyMargins.buccalPlateExpected,
        keratinizedMucosaWidth: siteData?.keratinizedTissueWidth
      },
      fdiPosition
    });

    const rawDrillSequence = getDrillingSequence(boneDensity, chosenSystem);
    const drillingSequence = rawDrillSequence.steps.map((s, idx) => ({
      step: idx + 1,
      drill: s.drill,
      diameter: s.diameter,
      speedRpm: s.speed,
      irrigation: s.irrigation,
      notes: s.notes
    }));

    // Synthesize structured result matching schema
    const synthesizedPlan = {
      patientName,
      patientAge,
      fdiPosition,
      chiefComplaint,
      aiEngineSource: 'Odonto Biomechanical Implant Engine (Deterministic Fallback)',
      generatedAt: new Date().toLocaleTimeString(),
      siteAssessment: {
        fdiPosition,
        region: boneResult.region,
        boneQuality: `${boneDensity} (${boneResult.densityProfile.name})`,
        boneQuantity: `Lekholm & Zarb Type-${boneResult.lekholmQuality} / Quality-${boneResult.lekholmQuantity}`,
        boneDimensions: {
          widthMm: boneWidth,
          heightMm: boneHeight
        },
        augmentationNeeded: boneResult.augmentationRequired,
        augmentationType: boneResult.recommendedAugmentations[0]?.type || 'none',
        augmentationDetails: boneResult.recommendedAugmentations[0]?.rationale || 'Adequate native bone volume. No pre-implant augmentation required.'
      },
      fixtureSelection: {
        recommendedBrand: chosenBrand,
        system: chosenSystem,
        diameterMm: chosenDiameter,
        lengthMm: chosenLength,
        platformType: bestFixtureRec?.fixture.platformType || 'conical-connection',
        connection: bestFixtureRec?.fixture.connection || 'CrossFit / Morse Taper',
        surface: bestFixtureRec?.fixture.surface || 'SLActive',
        shape: bestFixtureRec?.fixture.shape || 'tapered',
        rationale: bestFixtureRec?.rationale || [
          `Diameter ${chosenDiameter}mm maintains ≥ 1.5mm buccal and lingual cortical plates.`,
          `Length ${chosenLength}mm provides sufficient bicortical engagement and surface area.`,
          `Tapered body provides optimal primary stability in ${boneDensity} bone.`
        ],
        alternatives: fixtureResult.recommendations.slice(1, 3).map(r => `${r.fixture.brand} ${r.fixture.name} (Ø${r.recommendedDiameter} x ${r.recommendedLength}mm)`)
      },
      surgicalProtocol: {
        flapDesign: siteData?.isImmediateSocket ? 'flapless or papilla-sparing' : (boneResult.augmentationRequired ? 'trapezoidal / full-thickness envelope' : 'mid-crestal with sulcular extension'),
        drillingSequence,
        targetInsertionTorqueNcm: boneDensity === 'D4' ? '25-35 Ncm' : '35-45 Ncm',
        targetISQ: boneDensity === 'D4' ? '≥ 60' : '≥ 70',
        sinusLiftRequired: boneResult.recommendedAugmentations.some(a => a.type.includes('sinus-lift')),
        sinusProtocol: boneResult.recommendedAugmentations.find(a => a.type.includes('sinus-lift'))?.primaryProcedure || 'Not required (sufficient subantral height)',
        gbrProtocol: boneResult.recommendedAugmentations.find(a => a.type.includes('gbr') || a.type.includes('ridge-split'))?.primaryProcedure || 'Contour GBR with collagen membrane if buccal plate < 1.5mm',
        healingDuration: boneDensity === 'D4' ? '6 months' : (boneResult.augmentationRequired ? '4-6 months' : '3-4 months')
      },
      loadingProtocol: {
        type: siteData?.loadingIntent || (boneDensity === 'D4' || boneResult.augmentationRequired ? 'delayed' : 'conventional'),
        timingWeeks: boneResult.augmentationRequired ? '16-24 weeks' : (boneDensity === 'D1' || boneDensity === 'D2' ? '8-12 weeks' : '16 weeks'),
        prerequisites: [
          'Insertion torque ≥ 35 Ncm verified at placement',
          'ISQ value ≥ 70 measured by Resonance Frequency Analysis (Osstell)',
          'Radiographic confirmation of crestal bone stability with zero radiolucency',
          'Absence of mobility, pain, or peri-implant bleeding on gentle probing'
        ],
        occlusalConsiderations: [
          'Flat occlusal table with reduced cusp inclination (max 15-20°)',
          'Centric contacts positioned over long axis of the fixture',
          'Complete disclusion in lateral excursions (canine guidance or mutually protected occlusion)',
          'Protective occlusal nightguard delivered post-restoration'
        ]
      },
      prostheticPlan: {
        restorationType: prostheticResult.material.recommendedMaterial === 'zirconia-layered' ? 'Aesthetic Layered Zirconia Crown' : 'Screw-Retained Monolithic Zirconia Crown',
        retentionType: prostheticResult.retention.recommendedType,
        abutmentType: prostheticResult.abutment.name,
        abutmentCuffHeightMm: prostheticResult.abutment.recommendedCuffHeight,
        abutmentAngulation: prostheticResult.abutment.angulationDegrees,
        crownMaterial: prostheticResult.material.recommendedMaterial,
        screwTorqueNcm: prostheticResult.screwTorque.abutmentScrewTorqueNcm,
        crownToImplantRatio: prostheticResult.crownToImplant.ratio,
        cantileverRisk: prostheticResult.cantileverGuidelines ? prostheticResult.cantileverGuidelines.formula : 'Single unit restoration: No cantilever forces present.',
        laboratoryInstructions: [
          `Fabricate ${prostheticResult.retention.recommendedType} crown using ${prostheticResult.material.recommendedMaterial}.`,
          `Torque specification: ${prostheticResult.screwTorque.abutmentScrewTorqueNcm} Ncm per manufacturer protocol.`,
          `Design scalloped emergence profile matching natural contralateral emergence.`,
          `Place screw access hole through central fossa/cingulum.`
        ]
      },
      riskAssessment: {
        overallRisk: riskResult.riskCategory,
        riskScore: riskResult.riskScore,
        clearanceStatus: riskResult.summaryStatement,
        keyRisks: riskResult.systemicRisks.concat(riskResult.anatomicalRisks).map(r => `${r.factor}: ${r.impactDescription}`),
        mitigationStrategies: riskResult.systemicRisks.flatMap(r => r.mitigationProtocol).slice(0, 6)
      },
      evidenceCitations: [
        {
          author: 'Misch CE, et al.',
          year: '2005',
          title: 'Bone density: a key determinant for clinical success in implant dentistry',
          journal: 'Contemporary Implant Dentistry',
          clinicalTakeaway: 'Bone density directly dictates surgical drilling modifications, healing duration, and initial primary stability.'
        },
        {
          author: 'Buser D, et al.',
          year: '2017',
          title: 'Modern surgical concepts for immediate implant placement in the esthetic zone',
          journal: 'Periodontol 2000',
          clinicalTakeaway: 'Dual-zone grafting and minimum 2mm facial bone thickness prevent long-term soft tissue recession.'
        },
        {
          author: 'Tarnow DP, et al.',
          year: '2000',
          title: 'The effect of inter-implant distance on the height of inter-implant bone crest',
          journal: 'J Periodontol',
          clinicalTakeaway: 'A minimum of 3mm between adjacent implants preserves the inter-implant crestal bone and papillary height.'
        }
      ]
    };

    return NextResponse.json({
      success: true,
      source: 'Odonto Biomechanical Implant Engine (Verified Fallback)',
      data: synthesizedPlan
    });

  } catch (error: any) {
    console.error('Fatal error in generate-implant-plan API route:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to generate implant treatment plan' },
      { status: 500 }
    );
  }
}
