export function classifyAngle(molarRelation: string, canineRelation: string): string {
  const m = molarRelation.toLowerCase();
  const c = canineRelation.toLowerCase();

  let molarClass = 'Class I';
  if (m.includes('class ii')) molarClass = 'Class II';
  if (m.includes('class iii')) molarClass = 'Class III';

  let canineClass = 'Class I';
  if (c.includes('class ii')) canineClass = 'Class II';
  if (c.includes('class iii')) canineClass = 'Class III';

  return `Molar: ${molarClass}, Canine: ${canineClass}`;
}

export function classifyIncisorRelation(overjet: number, overbite: number, isReversed: boolean): string {
  if (isReversed || overjet < 0) {
    return 'Class III - Lower incisor edge lies anterior to the cingulum plateau of upper incisors.';
  }
  if (overjet > 4) {
    return 'Class II Division 1 - Increased overjet with proclined or normally inclined upper incisors.';
  }
  if (overjet <= 4 && overbite >= 4) {
    return 'Class II Division 2 - Upper central incisors retroclined, overjet usually minimum but may be increased.';
  }
  return 'Class I - Lower incisor edge lies on or below the cingulum plateau of upper incisors.';
}

export function classifySkeletalBase(sna: number, snb: number, anb: number): string {
  if (anb > 4) return 'Skeletal Class II';
  if (anb < 0) return 'Skeletal Class III';
  return 'Skeletal Class I';
}

export function assessCrowding(archLength: number, toothSizesSum: number): string {
  const diff = toothSizesSum - archLength;
  if (diff <= 0) return 'No crowding / Spaced';
  if (diff <= 3) return `Mild crowding (${diff.toFixed(1)} mm)`;
  if (diff <= 6) return `Moderate crowding (${diff.toFixed(1)} mm)`;
  return `Severe crowding (${diff.toFixed(1)} mm)`;
}

export function boltonAnalysis(upperTeethWidths: number[], lowerTeethWidths: number[]) {
  const sumUpperTotal = upperTeethWidths.slice(0, 12).reduce((a, b) => a + b, 0); // 6 to 6
  const sumLowerTotal = lowerTeethWidths.slice(0, 12).reduce((a, b) => a + b, 0); // 6 to 6
  const sumUpperAnterior = upperTeethWidths.slice(3, 9).reduce((a, b) => a + b, 0); // 3 to 3
  const sumLowerAnterior = lowerTeethWidths.slice(3, 9).reduce((a, b) => a + b, 0); // 3 to 3

  const overallRatio = (sumLowerTotal / sumUpperTotal) * 100;
  const anteriorRatio = (sumLowerAnterior / sumUpperAnterior) * 100;

  const normalOverall = 91.3;
  const normalAnterior = 77.2;

  let overallExcess = 0;
  let excessArch = 'none';

  if (overallRatio > normalOverall) {
    overallExcess = sumLowerTotal - (sumUpperTotal * normalOverall / 100);
    excessArch = 'Mandibular';
  } else if (overallRatio < normalOverall) {
    overallExcess = sumUpperTotal - (sumLowerTotal / (normalOverall / 100));
    excessArch = 'Maxillary';
  }

  return {
    overallRatio,
    anteriorRatio,
    overallExcess,
    excessArch
  };
}

export function spaceAnalysis(archPerimeter: number, toothWidthsSum: number, leewaySpace: number = 0) {
  const spaceAvailable = archPerimeter;
  const spaceRequired = toothWidthsSum - leewaySpace;
  const discrepancy = spaceAvailable - spaceRequired;

  return {
    spaceAvailable,
    spaceRequired,
    discrepancy,
    status: discrepancy >= 0 ? 'Space Sufficient' : 'Space Deficient'
  };
}
