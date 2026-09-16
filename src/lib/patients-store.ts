import { patients as basePatients } from '@/lib/db/mock-data';

export interface StoredPatient {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  age?: number;
  dateOfBirth?: Date | string;
  gender: string;
  phone: string;
  email: string;
  chiefComplaint: string;
  medicalHistory?: { conditions: string[]; allergies: string[] };
  dentalHistory?: { previousOrtho: boolean };
  status: string;
  clinicalRecords: Array<{
    angleClass: string;
    overjet?: number;
    overbite?: number;
    crowdingUpper?: string;
    crowdingLower?: string;
    lipCompetence?: string;
    facialProfile?: string;
    impa?: number;
    crossbites?: string[];
    missingTeeth?: string[];
    impactedTeeth?: string[];
    extraFindings?: string;
  }>;
}

const STORAGE_KEY = 'odonto_custom_patients_v1';

export function getStoredPatients(): StoredPatient[] {
  if (typeof window === 'undefined') {
    return basePatients as unknown as StoredPatient[];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return basePatients as unknown as StoredPatient[];
    const customList: StoredPatient[] = JSON.parse(raw);
    return [...customList, ...(basePatients as unknown as StoredPatient[])];
  } catch (err) {
    console.error('Failed to load stored patients from localStorage:', err);
    return basePatients as unknown as StoredPatient[];
  }
}

export function saveStoredPatient(patient: Omit<StoredPatient, 'id' | 'tenantId' | 'status'> & { id?: string }): StoredPatient {
  const newPatient: StoredPatient = {
    ...patient,
    id: patient.id || `p-custom-${Date.now()}`,
    tenantId: 't1',
    status: 'active',
  };

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing: StoredPatient[] = raw ? JSON.parse(raw) : [];
      // If already exists, update it, else prepend
      const index = existing.findIndex(p => p.id === newPatient.id);
      if (index >= 0) {
        existing[index] = newPatient;
      } else {
        existing.unshift(newPatient);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (err) {
      console.error('Failed to persist patient to localStorage:', err);
    }
  }

  return newPatient;
}

export function getStoredPatientById(id: string): StoredPatient | undefined {
  const all = getStoredPatients();
  return all.find(p => p.id === id);
}
