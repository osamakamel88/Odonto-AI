export const FDI_TEETH = {
  permanent: [
    '18', '17', '16', '15', '14', '13', '12', '11', '21', '22', '23', '24', '25', '26', '27', '28',
    '48', '47', '46', '45', '44', '43', '42', '41', '31', '32', '33', '34', '35', '36', '37', '38'
  ],
  primary: [
    '55', '54', '53', '52', '51', '61', '62', '63', '64', '65',
    '85', '84', '83', '82', '81', '71', '72', '73', '74', '75'
  ]
};

export const UNIVERSAL_TEETH = {
  permanent: [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
    '32', '31', '30', '29', '28', '27', '26', '25', '24', '23', '22', '21', '20', '19', '18', '17'
  ],
  primary: [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'T', 'S', 'R', 'Q', 'P', 'O', 'N', 'M', 'L', 'K'
  ]
};

export function fdiToUniversal(fdi: string): string {
  const isPrimary = ['5', '6', '7', '8'].includes(fdi[0]);
  if (isPrimary) {
    const index = FDI_TEETH.primary.indexOf(fdi);
    return index !== -1 ? UNIVERSAL_TEETH.primary[index] : fdi;
  }
  const index = FDI_TEETH.permanent.indexOf(fdi);
  return index !== -1 ? UNIVERSAL_TEETH.permanent[index] : fdi;
}

export function universalToFdi(universal: string): string {
  const isPrimary = /^[A-T]$/.test(universal);
  if (isPrimary) {
    const index = UNIVERSAL_TEETH.primary.indexOf(universal);
    return index !== -1 ? FDI_TEETH.primary[index] : universal;
  }
  const index = UNIVERSAL_TEETH.permanent.indexOf(universal);
  return index !== -1 ? FDI_TEETH.permanent[index] : universal;
}

export function fdiToPalmer(fdi: string): string {
  if (fdi.length !== 2) return fdi;
  const q = parseInt(fdi[0], 10);
  const tooth = fdi[1];
  
  const isPrimary = q >= 5 && q <= 8;
  const toothName = isPrimary ? String.fromCharCode(64 + parseInt(tooth)) : tooth; // A-E for 1-5
  
  let quadrantSymbol = '';
  if (q === 1 || q === 5) quadrantSymbol = 'UR';
  if (q === 2 || q === 6) quadrantSymbol = 'UL';
  if (q === 3 || q === 7) quadrantSymbol = 'LL';
  if (q === 4 || q === 8) quadrantSymbol = 'LR';
  
  return `${quadrantSymbol}${toothName}`;
}

export function getToothName(fdi: string, lang: 'en' | 'ar' = 'en'): string {
  const digit2 = fdi[1];
  const q = parseInt(fdi[0]);
  const isPrimary = q >= 5 && q <= 8;
  
  if (lang === 'ar') {
    const namesPermanentAr: Record<string, string> = {
      '1': 'القاطع المركزي (الثنية)',
      '2': 'القاطع الجانبي (الرباعية)',
      '3': 'الناب',
      '4': 'الضاحك الأول',
      '5': 'الضاحك الثاني',
      '6': 'الضرس الأول',
      '7': 'الضرس الثاني',
      '8': 'ضرس العقل'
    };

    const namesPrimaryAr: Record<string, string> = {
      '1': 'القاطع المركزي اللبني',
      '2': 'القاطع الجانبي اللبني',
      '3': 'الناب اللبني',
      '4': 'الضرس اللبني الأول',
      '5': 'الضرس اللبني الثاني'
    };

    const toothName = isPrimary ? namesPrimaryAr[digit2] : namesPermanentAr[digit2];
    const arch = (q === 1 || q === 2 || q === 5 || q === 6) ? 'العلوي' : 'السفلي';
    const side = (q === 1 || q === 4 || q === 5 || q === 8) ? 'الأيمن' : 'الأيسر';
    
    return `${toothName} ${arch} ${side}`;
  }

  const namesPermanent: Record<string, string> = {
    '1': 'Central Incisor',
    '2': 'Lateral Incisor',
    '3': 'Canine',
    '4': 'First Premolar',
    '5': 'Second Premolar',
    '6': 'First Molar',
    '7': 'Second Molar',
    '8': 'Third Molar'
  };

  const namesPrimary: Record<string, string> = {
    '1': 'Central Incisor',
    '2': 'Lateral Incisor',
    '3': 'Canine',
    '4': 'First Molar',
    '5': 'Second Molar'
  };

  const toothName = isPrimary ? namesPrimary[digit2] : namesPermanent[digit2];
  
  let arch = (q === 1 || q === 2 || q === 5 || q === 6) ? 'Maxillary' : 'Mandibular';
  let side = (q === 1 || q === 4 || q === 5 || q === 8) ? 'Right' : 'Left';
  
  return `${isPrimary ? 'Primary ' : ''}${arch} ${side} ${toothName}`;
}


// Simplified SVGs for tooth rendering
export const TOOTH_SVG_PATHS = {
  incisor: "M10 10 Q20 5 30 10 L30 40 Q20 45 10 40 Z",
  canine: "M20 5 L30 15 L25 40 Q20 45 15 40 L10 15 Z",
  premolar: "M15 10 Q20 5 25 10 L30 20 L25 40 L15 40 L10 20 Z",
  molar: "M10 15 Q20 5 30 15 L35 25 L30 40 L10 40 L5 25 Z"
};

export function getToothSvgPath(fdi: string): string {
  const digit2 = fdi[1];
  const q = parseInt(fdi[0]);
  const isPrimary = q >= 5 && q <= 8;
  
  if (digit2 === '1' || digit2 === '2') return TOOTH_SVG_PATHS.incisor;
  if (digit2 === '3') return TOOTH_SVG_PATHS.canine;
  if (isPrimary && (digit2 === '4' || digit2 === '5')) return TOOTH_SVG_PATHS.molar;
  if (digit2 === '4' || digit2 === '5') return TOOTH_SVG_PATHS.premolar;
  return TOOTH_SVG_PATHS.molar;
}
