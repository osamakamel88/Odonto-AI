/**
 * 3D Dental Cast & Arch Geometry Generator
 * 
 * Generates anatomical dental arch coordinates, tooth crown dimensions, and
 * biomechanical morphing trajectories (from crowded malocclusion to ideal parabolic arch).
 * Based on Wheeler's Dental Anatomy & Bonwill-Hawley Arch Form.
 */

export interface Tooth3DData {
  fdi: number;
  name: string;
  type: 'incisor_central' | 'incisor_lateral' | 'canine' | 'premolar' | 'molar';
  arch: 'maxillary' | 'mandibular';
  side: 'right' | 'left';
  mesiodistalWidthMm: number;
  crownHeightMm: number;
  buccolingualDepthMm: number;
  // Initial maloccluded position & rotation
  initialPos: [number, number, number]; // [x, y, z]
  initialRot: [number, number, number]; // [rx, ry, rz] in radians
  // Target aligned position & rotation
  targetPos: [number, number, number];
  targetRot: [number, number, number];
}

// Standard tooth dimensions according to Wheeler's Dental Anatomy (mm)
export const TOOTH_DIMENSIONS: Record<number, { width: number; height: number; depth: number }> = {
  // Maxillary Right
  18: { width: 9.0, height: 6.5, depth: 10.0 },
  17: { width: 9.5, height: 7.0, depth: 11.0 },
  16: { width: 10.5, height: 7.5, depth: 11.0 },
  15: { width: 7.0, height: 8.0, depth: 9.0 },
  14: { width: 7.5, height: 8.5, depth: 9.0 },
  13: { width: 7.5, height: 9.5, depth: 8.0 },
  12: { width: 6.5, height: 9.0, depth: 6.0 },
  11: { width: 8.5, height: 10.0, depth: 7.0 },
  // Maxillary Left
  21: { width: 8.5, height: 10.0, depth: 7.0 },
  22: { width: 6.5, height: 9.0, depth: 6.0 },
  23: { width: 7.5, height: 9.5, depth: 8.0 },
  24: { width: 7.5, height: 8.5, depth: 9.0 },
  25: { width: 7.0, height: 8.0, depth: 9.0 },
  26: { width: 10.5, height: 7.5, depth: 11.0 },
  27: { width: 9.5, height: 7.0, depth: 11.0 },
  28: { width: 9.0, height: 6.5, depth: 10.0 },
  // Mandibular Left
  38: { width: 10.0, height: 6.5, depth: 9.5 },
  37: { width: 10.5, height: 7.0, depth: 10.0 },
  36: { width: 11.0, height: 7.5, depth: 10.5 },
  35: { width: 7.0, height: 8.0, depth: 8.0 },
  34: { width: 7.0, height: 8.5, depth: 7.5 },
  33: { width: 7.0, height: 10.0, depth: 7.5 },
  32: { width: 5.5, height: 9.0, depth: 6.0 },
  31: { width: 5.0, height: 8.5, depth: 5.5 },
  // Mandibular Right
  41: { width: 5.0, height: 8.5, depth: 5.5 },
  42: { width: 5.5, height: 9.0, depth: 6.0 },
  43: { width: 7.0, height: 10.0, depth: 7.5 },
  44: { width: 7.0, height: 8.5, depth: 7.5 },
  45: { width: 7.0, height: 8.0, depth: 8.0 },
  46: { width: 11.0, height: 7.5, depth: 10.5 },
  47: { width: 10.5, height: 7.0, depth: 10.0 },
  48: { width: 10.0, height: 6.5, depth: 9.5 }
};

export const TOOTH_NAMES: Record<number, string> = {
  11: 'Maxillary Right Central Incisor',
  12: 'Maxillary Right Lateral Incisor',
  13: 'Maxillary Right Canine',
  14: 'Maxillary Right 1st Premolar',
  15: 'Maxillary Right 2nd Premolar',
  16: 'Maxillary Right 1st Molar',
  17: 'Maxillary Right 2nd Molar',
  21: 'Maxillary Left Central Incisor',
  22: 'Maxillary Left Lateral Incisor',
  23: 'Maxillary Left Canine',
  24: 'Maxillary Left 1st Premolar',
  25: 'Maxillary Left 2nd Premolar',
  26: 'Maxillary Left 1st Molar',
  27: 'Maxillary Left 2nd Molar',
  31: 'Mandibular Left Central Incisor',
  32: 'Mandibular Left Lateral Incisor',
  33: 'Mandibular Left Canine',
  34: 'Mandibular Left 1st Premolar',
  35: 'Mandibular Left 2nd Premolar',
  36: 'Mandibular Left 1st Molar',
  37: 'Mandibular Left 2nd Molar',
  41: 'Mandibular Right Central Incisor',
  42: 'Mandibular Right Lateral Incisor',
  43: 'Mandibular Right Canine',
  44: 'Mandibular Right 1st Premolar',
  45: 'Mandibular Right 2nd Premolar',
  46: 'Mandibular Right 1st Molar',
  47: 'Mandibular Right 2nd Molar'
};

/**
 * Computes ideal parabolic Bonwill-Hawley arch coordinates for a tooth.
 * Parabolic curve equation: y = ax^2 (in occlusal X-Z plane).
 */
function computeParabolicCoord(
  indexFromMidline: number, // 0 to 6
  isMaxillary: boolean,
  isLeft: boolean
): { pos: [number, number, number]; rot: [number, number, number] } {
  // Arch parameters (in scale units, ~0.1 scale to Three.js world coordinates)
  const archWidth = isMaxillary ? 2.4 : 2.2;
  const archDepth = isMaxillary ? 2.6 : 2.4;
  const yLevel = isMaxillary ? 0.7 : -0.7; // Vertical occlusion clearance

  // Normalized parameter along the arch curve (0 at central incisor, 1 at 2nd molar)
  const t = (indexFromMidline + 0.5) / 7.0;
  
  // Arch curvature parametrization
  const x = Math.sin(t * Math.PI * 0.48) * archWidth * (isLeft ? 1 : -1);
  const z = (Math.cos(t * Math.PI * 0.45) - 1.0) * archDepth + 0.8;
  
  // Tangent angle for anatomical tooth rotation facing outward
  const tangentAngle = Math.atan2(
    Math.cos(t * Math.PI * 0.48) * (isLeft ? 1 : -1),
    -Math.sin(t * Math.PI * 0.45) * 1.2
  );

  return {
    pos: [x, yLevel, z],
    rot: [0, tangentAngle + (isLeft ? 0 : Math.PI), 0]
  };
}

/**
 * Generates the full dual-arch set of 28 permanent teeth with initial (crowded)
 * and target (ideal aligned) coordinate states.
 */
export function generateFullDentition3D(): Tooth3DData[] {
  const teeth: Tooth3DData[] = [];

  // Maxillary Right Quadrant (17 to 11)
  const maxRightFDI = [11, 12, 13, 14, 15, 16, 17];
  // Maxillary Left Quadrant (21 to 27)
  const maxLeftFDI = [21, 22, 23, 24, 25, 26, 27];
  // Mandibular Left Quadrant (31 to 37)
  const mandLeftFDI = [31, 32, 33, 34, 35, 36, 37];
  // Mandibular Right Quadrant (41 to 47)
  const mandRightFDI = [41, 42, 43, 44, 45, 46, 47];

  const processQuadrant = (fdiList: number[], isMax: boolean, isLeft: boolean) => {
    fdiList.forEach((fdi, idx) => {
      const dim = TOOTH_DIMENSIONS[fdi] || { width: 7.5, height: 8.5, depth: 8.0 };
      const { pos: targetPos, rot: targetRot } = computeParabolicCoord(idx, isMax, isLeft);

      // Create realistic pre-treatment malocclusion offsets
      let initOffsetX = 0;
      let initOffsetY = 0;
      let initOffsetZ = 0;
      let initRotY = 0;

      if (idx === 0) {
        // Central incisor: slight labial tilt and minor rotation
        initOffsetZ += isMax ? 0.15 : -0.1;
        initRotY += isLeft ? 0.1 : -0.1;
      } else if (idx === 1) {
        // Lateral incisor: typically palatally/lingually blocked out in crowding
        initOffsetZ -= isMax ? 0.22 : 0.18;
        initRotY += isLeft ? -0.25 : 0.25;
      } else if (idx === 2) {
        // Canine: typically high and labially ectopic
        initOffsetY += isMax ? 0.25 : -0.15;
        initOffsetZ += isMax ? 0.2 : 0.15;
        initRotY += isLeft ? 0.2 : -0.2;
      } else if (idx === 3) {
        // First premolar: slight mesial tipping
        initOffsetX += isLeft ? -0.08 : 0.08;
      }

      const initialPos: [number, number, number] = [
        targetPos[0] + initOffsetX,
        targetPos[1] + initOffsetY,
        targetPos[2] + initOffsetZ
      ];

      const initialRot: [number, number, number] = [
        targetRot[0],
        targetRot[1] + initRotY,
        targetRot[2]
      ];

      let type: Tooth3DData['type'] = 'incisor_central';
      if (idx === 0) type = 'incisor_central';
      else if (idx === 1) type = 'incisor_lateral';
      else if (idx === 2) type = 'canine';
      else if (idx === 3 || idx === 4) type = 'premolar';
      else type = 'molar';

      teeth.push({
        fdi,
        name: TOOTH_NAMES[fdi] || `Tooth ${fdi}`,
        type,
        arch: isMax ? 'maxillary' : 'mandibular',
        side: isLeft ? 'left' : 'right',
        mesiodistalWidthMm: dim.width,
        crownHeightMm: dim.height,
        buccolingualDepthMm: dim.depth,
        initialPos,
        initialRot,
        targetPos,
        targetRot
      });
    });
  };

  processQuadrant(maxRightFDI, true, false);
  processQuadrant(maxLeftFDI, true, true);
  processQuadrant(mandLeftFDI, false, true);
  processQuadrant(mandRightFDI, false, false);

  return teeth;
}

/**
 * Interpolates tooth position and rotation between initial crowded state (t = 0)
 * and target aligned parabolic arch state (t = 1).
 */
export function interpolateToothTransform(
  tooth: Tooth3DData,
  progress: number, // 0.0 to 1.0
  archSeparationOffset: number = 0 // Extra Y displacement to disarticulate arches
): { pos: [number, number, number]; rot: [number, number, number] } {
  // Smooth easeInOut curve
  const t = progress < 0.5 
    ? 2 * progress * progress 
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  const yExtra = tooth.arch === 'maxillary' ? archSeparationOffset : -archSeparationOffset;

  const posX = tooth.initialPos[0] + (tooth.targetPos[0] - tooth.initialPos[0]) * t;
  const posY = (tooth.initialPos[1] + (tooth.targetPos[1] - tooth.initialPos[1]) * t) + yExtra;
  const posZ = tooth.initialPos[2] + (tooth.targetPos[2] - tooth.initialPos[2]) * t;

  const rotX = tooth.initialRot[0] + (tooth.targetRot[0] - tooth.initialRot[0]) * t;
  const rotY = tooth.initialRot[1] + (tooth.targetRot[1] - tooth.initialRot[1]) * t;
  const rotZ = tooth.initialRot[2] + (tooth.targetRot[2] - tooth.initialRot[2]) * t;

  return {
    pos: [posX, posY, posZ],
    rot: [rotX, rotY, rotZ]
  };
}
