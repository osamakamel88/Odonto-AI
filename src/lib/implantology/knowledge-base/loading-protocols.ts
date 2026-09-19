export type LoadingType = 'immediate' | 'early' | 'conventional' | 'progressive' | 'delayed';

/**
 * LoadingProtocol represents clinical guidelines for implant prosthetic loading timelines.
 */
export interface LoadingProtocol {
  id: string;
  name: string;
  type: LoadingType;
  timing: string;
  description: string;
  minimumISQ: number;
  minimumInsertionTorque: number; // Ncm
  indications: string[];
  contraindications: string[];
  prostheticConsiderations: string[];
  occlusionGuidelines: string[];
  followUpSchedule: string[];
  evidenceLevel: 'high' | 'moderate' | 'low';
  successRate: string;
  clinicalTips: string[];
}

export const loadingProtocols: LoadingProtocol[] = [
  {
    id: 'immediate-loading',
    name: 'Immediate Loading Protocol',
    type: 'immediate',
    timing: '< 48 hours',
    description: 'Provisional restoration placed within 48 hours of implant placement.',
    minimumISQ: 70,
    minimumInsertionTorque: 35,
    indications: ['Anterior esthetic zone', 'All-on-4 / full arch splinted', 'Excellent bone quality'],
    contraindications: ['Bruxism', 'Poor bone quality (D4)', 'Heavy smoking', 'Need for extensive bone grafting'],
    prostheticConsiderations: ['Cross-arch splinting for full arch', 'Screw-retained preferred', 'Rigid provisional material'],
    occlusionGuidelines: ['Clear of centric occlusion in single units', 'No eccentric contacts', 'Bilateral balanced occlusion for full arch'],
    followUpSchedule: ['1 week', '2 weeks', '4 weeks', '8 weeks'],
    evidenceLevel: 'high',
    successRate: '95-98% (case selected)',
    clinicalTips: ['Patient compliance with soft diet is mandatory', 'Do not remove provisional for 8 weeks']
  },
  {
    id: 'early-loading',
    name: 'Early Loading Protocol',
    type: 'early',
    timing: '1-6 weeks',
    description: 'Restoration placed after initial soft tissue healing but before complete osseointegration.',
    minimumISQ: 65,
    minimumInsertionTorque: 25,
    indications: ['Active surface implants (e.g., SLActive)', 'Good primary stability', 'Posterior regions with favorable loading forces'],
    contraindications: ['Parafunctional habits', 'Short implants < 8mm', 'Untreated periodontitis'],
    prostheticConsiderations: ['Can be provisional or final restoration', 'Careful cementation if using cement'],
    occlusionGuidelines: ['Light centric contacts', 'No working or non-working interferences'],
    followUpSchedule: ['2 weeks post-loading', '1 month', '3 months'],
    evidenceLevel: 'high',
    successRate: '96%',
    clinicalTips: ['Verify ISQ at loading time to ensure no dip in stability']
  },
  {
    id: 'conventional-loading',
    name: 'Conventional Loading Protocol',
    type: 'conventional',
    timing: '3-6 months',
    description: 'Standard protocol allowing for complete biologic osseointegration before loading.',
    minimumISQ: 60,
    minimumInsertionTorque: 15,
    indications: ['Standard cases', 'Any bone density', 'Single units in posterior'],
    contraindications: ['None specific to loading timing'],
    prostheticConsiderations: ['Standard prosthetic workflows', 'Digital or conventional impressions'],
    occlusionGuidelines: ['Normal occlusion parameters for implant restorations', 'Mutually protected occlusion'],
    followUpSchedule: ['At delivery', '1 month', '6 months', 'Yearly'],
    evidenceLevel: 'high',
    successRate: '>98%',
    clinicalTips: ['Mandible typically requires 3 months, maxilla 4-6 months']
  },
  {
    id: 'progressive-loading',
    name: 'Progressive Loading',
    type: 'progressive',
    timing: '3-6 months (gradual)',
    description: 'Gradual introduction of occlusal forces using provisionals with varying occlusal materials.',
    minimumISQ: 55,
    minimumInsertionTorque: 15,
    indications: ['Poor bone quality (D4)', 'Short implants', 'Parafunction/Bruxism', 'Compromised sites'],
    contraindications: ['Uncooperative patients', 'Immediate loading cases'],
    prostheticConsiderations: ['Use acrylic provisionals first, then transition to composite, then ceramic'],
    occlusionGuidelines: ['Start out of occlusion, gradually bring into light occlusion over weeks'],
    followUpSchedule: ['Every 2-4 weeks during progressive phase'],
    evidenceLevel: 'moderate',
    successRate: '90-95%',
    clinicalTips: ["Allows for bone remodeling and increased density around the implant (Frost's mechanostat theory)"]
  },
  {
    id: 'delayed-loading',
    name: 'Delayed Loading',
    type: 'delayed',
    timing: '> 6 months',
    description: 'Extended healing period before any prosthetic loading.',
    minimumISQ: 50, // Initial, expected to rise
    minimumInsertionTorque: 10,
    indications: ['Extensive GBR / vertical augmentation', 'Sinus lifts (staged or simultaneous with poor primary stability)', 'Irradiated bone', 'Severely compromised bone'],
    contraindications: ['Patient demanding quick results (relative)'],
    prostheticConsiderations: ['May require soft tissue re-entry and conditioning'],
    occlusionGuidelines: ['Standard guidelines once loaded'],
    followUpSchedule: ['At uncovering', 'At delivery', '1 month', '6 months'],
    evidenceLevel: 'high',
    successRate: 'Highly dependent on the grafting procedure success',
    clinicalTips: ['Do not rush; biology takes time, especially for graft consolidation']
  }
];

/**
 * Recommends a loading protocol based on clinical metrics and site conditions.
 * @param isq Implant Stability Quotient (ISQ)
 * @param insertionTorque Final insertion torque in Ncm
 * @param boneDensity 'D1', 'D2', 'D3', or 'D4'
 * @param site Specific site or region (e.g. 'anterior', 'posterior', 'maxilla', 'mandible')
 * @returns LoadingProtocol
 */
export function recommendLoadingProtocol(isq: number, insertionTorque: number, boneDensity: string, site: string): LoadingProtocol {
  if (isq >= 70 && insertionTorque >= 35 && boneDensity !== 'D4') {
    return loadingProtocols.find(p => p.id === 'immediate-loading') as LoadingProtocol;
  }
  if (isq >= 65 && insertionTorque >= 25) {
    return loadingProtocols.find(p => p.id === 'early-loading') as LoadingProtocol;
  }
  return loadingProtocols.find(p => p.id === 'conventional-loading') as LoadingProtocol;
}
