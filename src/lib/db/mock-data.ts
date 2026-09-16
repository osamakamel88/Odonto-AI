// Mock Data for Odonto AI

export const tenants = [
  { id: 't1', name: 'Smile Studio', slug: 'smile-studio', plan: 'pro', createdAt: new Date() },
  { id: 't2', name: 'City Orthodontics', slug: 'city-orthodontics', plan: 'starter', createdAt: new Date() }
];

export const users = [
  { id: 'u1', tenantId: 't1', clerkId: 'c1', email: 'dr.smith@smilestudio.com', name: 'Dr. John Smith', role: 'orthodontist', experienceLevel: 'expert' },
  { id: 'u2', tenantId: 't1', clerkId: 'c2', email: 'sarah@smilestudio.com', name: 'Sarah Assistant', role: 'assistant', experienceLevel: 'intermediate' },
  { id: 'u3', tenantId: 't2', clerkId: 'c3', email: 'dr.jane@cityortho.com', name: 'Dr. Jane Doe', role: 'owner', experienceLevel: 'expert' }
];

export const patients = [
  { 
    id: 'p1', tenantId: 't1', firstName: 'Emma', lastName: 'Johnson', dateOfBirth: new Date('2009-05-14'), 
    gender: 'female', phone: '555-0101', email: 'emma.j@example.com', chiefComplaint: 'My top teeth stick out',
    medicalHistory: { conditions: [], allergies: [] }, dentalHistory: { previousOrtho: false }, status: 'active',
    clinicalRecords: [
      { angleClass: 'Class II div 1', overjet: 8, overbite: 5, crowdingUpper: 'moderate', crowdingLower: 'mild', lipCompetence: 'incompetent' }
    ]
  },
  {
    id: 'p2', tenantId: 't1', firstName: 'Michael', lastName: 'Williams', dateOfBirth: new Date('1998-11-20'),
    gender: 'male', phone: '555-0102', email: 'michael.w@example.com', chiefComplaint: 'My teeth are really crooked',
    medicalHistory: { conditions: [], allergies: [] }, dentalHistory: { previousOrtho: false }, status: 'active',
    clinicalRecords: [
      { angleClass: 'Class I', overjet: 3, overbite: 3, crowdingUpper: 'severe', crowdingLower: 'severe', lipCompetence: 'competent' }
    ]
  },
  {
    id: 'p3', tenantId: 't1', firstName: 'Lucas', lastName: 'Brown', dateOfBirth: new Date('2011-08-05'),
    gender: 'male', phone: '555-0103', email: 'lucas.b@example.com', chiefComplaint: 'Underbite developing',
    medicalHistory: { conditions: ['asthma'], allergies: [] }, dentalHistory: { previousOrtho: false }, status: 'active',
    clinicalRecords: [
      { angleClass: 'Class III', overjet: -2, overbite: 1, crowdingUpper: 'mild', crowdingLower: 'mild', lipCompetence: 'competent' }
    ]
  },
  {
    id: 'p4', tenantId: 't1', firstName: 'Olivia', lastName: 'Davis', dateOfBirth: new Date('1993-02-17'),
    gender: 'female', phone: '555-0104', email: 'olivia.d@example.com', chiefComplaint: 'My front teeth don\'t touch',
    medicalHistory: { conditions: [], allergies: ['penicillin'] }, dentalHistory: { previousOrtho: true }, status: 'active',
    clinicalRecords: [
      { angleClass: 'Class I', overjet: 2, overbite: -4, crowdingUpper: 'none', crowdingLower: 'mild', extraFindings: 'Tongue thrust' }
    ]
  },
  {
    id: 'p5', tenantId: 't2', firstName: 'James', lastName: 'Miller', dateOfBirth: new Date('2007-10-30'),
    gender: 'male', phone: '555-0105', email: 'james.m@example.com', chiefComplaint: 'Deep bite',
    medicalHistory: { conditions: [], allergies: [] }, dentalHistory: { previousOrtho: false }, status: 'active',
    clinicalRecords: [
      { angleClass: 'Class II div 2', overjet: 2, overbite: 8, crowdingUpper: 'moderate', crowdingLower: 'moderate', extraFindings: 'Retroclined upper incisors' }
    ]
  },
  {
    id: 'p6', tenantId: 't2', firstName: 'Sophia', lastName: 'Wilson', dateOfBirth: new Date('2014-04-12'),
    gender: 'female', phone: '555-0106', email: 'sophia.w@example.com', chiefComplaint: 'Crossbite on the right',
    medicalHistory: { conditions: [], allergies: [] }, dentalHistory: { previousOrtho: false }, status: 'active',
    clinicalRecords: [
      { angleClass: 'Class I', crossbites: ['Right posterior'], extraFindings: 'Narrow maxilla' }
    ]
  },
  {
    id: 'p7', tenantId: 't2', firstName: 'Isabella', lastName: 'Moore', dateOfBirth: new Date('2001-07-22'),
    gender: 'female', phone: '555-0107', email: 'isabella.m@example.com', chiefComplaint: 'Teeth stick out too much',
    medicalHistory: { conditions: [], allergies: [] }, dentalHistory: { previousOrtho: false }, status: 'active',
    clinicalRecords: [
      { angleClass: 'Class I', overjet: 6, overbite: 4, crowdingUpper: 'mild', crowdingLower: 'mild', facialProfile: 'convex', extraFindings: 'Bimaxillary protrusion' }
    ]
  },
  {
    id: 'p8', tenantId: 't2', firstName: 'Ethan', lastName: 'Taylor', dateOfBirth: new Date('2008-12-09'),
    gender: 'male', phone: '555-0108', email: 'ethan.t@example.com', chiefComplaint: 'Missing adult tooth',
    medicalHistory: { conditions: [], allergies: [] }, dentalHistory: { previousOrtho: false }, status: 'active',
    clinicalRecords: [
      { angleClass: 'Class I', impactedTeeth: ['13'], extraFindings: 'Impacted canine, ectopic eruption' }
    ]
  }
];

export const getMockPatients = () => patients;
export const getMockPatient = (id: string) => patients.find(p => p.id === id);
