import { pgTable, uuid, text, timestamp, varchar, real, integer, jsonb, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const roleEnum = pgEnum('role', ['owner', 'orthodontist', 'assistant', 'viewer']);
export const experienceLevelEnum = pgEnum('experienceLevel', ['beginner', 'intermediate', 'expert']);
export const genderEnum = pgEnum('gender', ['male', 'female', 'other', 'prefer_not_to_say']);
export const patientStatusEnum = pgEnum('patientStatus', ['active', 'completed', 'archived']);
export const angleClassEnum = pgEnum('angleClass', ['Class I', 'Class II div 1', 'Class II div 2', 'Class III']);
export const imageTypeEnum = pgEnum('imageType', ['photo_frontal', 'photo_profile', 'photo_smile', 'intraoral_right', 'intraoral_left', 'intraoral_frontal', 'intraoral_upper_occlusal', 'intraoral_lower_occlusal', 'opg', 'lateral_ceph', 'cbct', 'intraoral_scan']);
export const treatmentPlanStatusEnum = pgEnum('treatmentPlanStatus', ['draft', 'active', 'completed', 'archived']);

export const tenants = pgTable('tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  plan: varchar('plan', { length: 50 }).default('starter'),
  settings: jsonb('settings').default({}),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenantId').references(() => tenants.id),
  clerkId: varchar('clerkId', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: roleEnum('role').default('viewer').notNull(),
  experienceLevel: experienceLevelEnum('experienceLevel'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const patients = pgTable('patients', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenantId').references(() => tenants.id).notNull(),
  firstName: varchar('firstName', { length: 255 }).notNull(),
  lastName: varchar('lastName', { length: 255 }).notNull(),
  dateOfBirth: timestamp('dateOfBirth').notNull(),
  gender: genderEnum('gender').notNull(),
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  medicalHistory: jsonb('medicalHistory').default({}),
  dentalHistory: jsonb('dentalHistory').default({}),
  chiefComplaint: text('chiefComplaint'),
  status: patientStatusEnum('status').default('active').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const clinicalRecords = pgTable('clinicalRecords', {
  id: uuid('id').primaryKey().defaultRandom(),
  patientId: uuid('patientId').references(() => patients.id).notNull(),
  tenantId: uuid('tenantId').references(() => tenants.id).notNull(),
  createdById: uuid('createdById').references(() => users.id),
  angleClass: angleClassEnum('angleClass'),
  molarRelationRight: varchar('molarRelationRight', { length: 50 }),
  molarRelationLeft: varchar('molarRelationLeft', { length: 50 }),
  canineRelationRight: varchar('canineRelationRight', { length: 50 }),
  canineRelationLeft: varchar('canineRelationLeft', { length: 50 }),
  overjet: real('overjet'),
  overbite: real('overbite'),
  crowdingUpper: varchar('crowdingUpper', { length: 50 }),
  crowdingLower: varchar('crowdingLower', { length: 50 }),
  spacingUpper: varchar('spacingUpper', { length: 50 }),
  spacingLower: varchar('spacingLower', { length: 50 }),
  crossbites: jsonb('crossbites').default([]),
  missingTeeth: jsonb('missingTeeth').default([]),
  impactedTeeth: jsonb('impactedTeeth').default([]),
  midlineUpper: varchar('midlineUpper', { length: 50 }),
  midlineLower: varchar('midlineLower', { length: 50 }),
  tmjStatus: varchar('tmjStatus', { length: 255 }),
  oralHygiene: varchar('oralHygiene', { length: 50 }),
  periodontalStatus: varchar('periodontalStatus', { length: 255 }),
  lipCompetence: varchar('lipCompetence', { length: 50 }),
  facialProfile: varchar('facialProfile', { length: 50 }),
  facialSymmetry: varchar('facialSymmetry', { length: 50 }),
  extraFindings: text('extraFindings'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const images = pgTable('images', {
  id: uuid('id').primaryKey().defaultRandom(),
  patientId: uuid('patientId').references(() => patients.id).notNull(),
  tenantId: uuid('tenantId').references(() => tenants.id).notNull(),
  type: imageTypeEnum('type').notNull(),
  url: text('url').notNull(),
  filename: varchar('filename', { length: 255 }).notNull(),
  aiAnalysis: jsonb('aiAnalysis').default({}),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const cephAnalyses = pgTable('cephAnalyses', {
  id: uuid('id').primaryKey().defaultRandom(),
  recordId: uuid('recordId').references(() => clinicalRecords.id),
  imageId: uuid('imageId').references(() => images.id),
  tenantId: uuid('tenantId').references(() => tenants.id).notNull(),
  landmarks: jsonb('landmarks').default({}),
  sna: real('sna'),
  snb: real('snb'),
  anb: real('anb'),
  wits: real('wits'),
  fma: real('fma'),
  snGoGn: real('snGoGn'),
  impa: real('impa'),
  u1Sn: real('u1Sn'),
  u1NaDeg: real('u1NaDeg'),
  u1NaMm: real('u1NaMm'),
  l1NbDeg: real('l1NbDeg'),
  l1NbMm: real('l1NbMm'),
  interincisalAngle: real('interincisalAngle'),
  nasolabialAngle: real('nasolabialAngle'),
  upperLipEPlane: real('upperLipEPlane'),
  lowerLipEPlane: real('lowerLipEPlane'),
  skeletalClass: varchar('skeletalClass', { length: 50 }),
  growthPattern: varchar('growthPattern', { length: 50 }),
  profileType: varchar('profileType', { length: 50 }),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const treatmentPlans = pgTable('treatmentPlans', {
  id: uuid('id').primaryKey().defaultRandom(),
  patientId: uuid('patientId').references(() => patients.id).notNull(),
  tenantId: uuid('tenantId').references(() => tenants.id).notNull(),
  createdById: uuid('createdById').references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  status: treatmentPlanStatusEnum('status').default('draft').notNull(),
  currentVersion: integer('currentVersion').default(1).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const planVersions = pgTable('planVersions', {
  id: uuid('id').primaryKey().defaultRandom(),
  planId: uuid('planId').references(() => treatmentPlans.id).notNull(),
  tenantId: uuid('tenantId').references(() => tenants.id).notNull(),
  version: integer('version').notNull(),
  objectives: jsonb('objectives').default([]),
  treatmentType: jsonb('treatmentType').default({}),
  mechanicsSequence: jsonb('mechanicsSequence').default([]),
  extractionDecision: jsonb('extractionDecision').default({}),
  anchoragePlan: jsonb('anchoragePlan').default({}),
  wireSequence: jsonb('wireSequence').default([]),
  elasticProtocol: jsonb('elasticProtocol').default({}),
  retentionPlan: jsonb('retentionPlan').default({}),
  riskAssessment: jsonb('riskAssessment').default([]),
  evidenceCitations: jsonb('evidenceCitations').default([]),
  estimatedDuration: varchar('estimatedDuration', { length: 100 }),
  aiReasoning: text('aiReasoning'),
  clinicianNotes: text('clinicianNotes'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const auditLogs = pgTable('auditLogs', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenantId').references(() => tenants.id).notNull(),
  userId: uuid('userId').references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(),
  entityType: varchar('entityType', { length: 100 }).notNull(),
  entityId: varchar('entityId', { length: 100 }),
  details: jsonb('details').default({}),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

// Relations
export const tenantsRelations = relations(tenants, ({ many }) => ({
  users: many(users),
  patients: many(patients),
  clinicalRecords: many(clinicalRecords),
  images: many(images),
  cephAnalyses: many(cephAnalyses),
  treatmentPlans: many(treatmentPlans),
  planVersions: many(planVersions),
  auditLogs: many(auditLogs),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  tenant: one(tenants, {
    fields: [users.tenantId],
    references: [tenants.id],
  }),
  clinicalRecords: many(clinicalRecords),
  treatmentPlans: many(treatmentPlans),
  auditLogs: many(auditLogs),
}));

export const patientsRelations = relations(patients, ({ one, many }) => ({
  tenant: one(tenants, {
    fields: [patients.tenantId],
    references: [tenants.id],
  }),
  clinicalRecords: many(clinicalRecords),
  images: many(images),
  treatmentPlans: many(treatmentPlans),
}));

export const clinicalRecordsRelations = relations(clinicalRecords, ({ one, many }) => ({
  patient: one(patients, {
    fields: [clinicalRecords.patientId],
    references: [patients.id],
  }),
  tenant: one(tenants, {
    fields: [clinicalRecords.tenantId],
    references: [tenants.id],
  }),
  createdBy: one(users, {
    fields: [clinicalRecords.createdById],
    references: [users.id],
  }),
  cephAnalyses: many(cephAnalyses),
}));

export const imagesRelations = relations(images, ({ one, many }) => ({
  patient: one(patients, {
    fields: [images.patientId],
    references: [patients.id],
  }),
  tenant: one(tenants, {
    fields: [images.tenantId],
    references: [tenants.id],
  }),
  cephAnalyses: many(cephAnalyses),
}));

export const cephAnalysesRelations = relations(cephAnalyses, ({ one }) => ({
  record: one(clinicalRecords, {
    fields: [cephAnalyses.recordId],
    references: [clinicalRecords.id],
  }),
  image: one(images, {
    fields: [cephAnalyses.imageId],
    references: [images.id],
  }),
  tenant: one(tenants, {
    fields: [cephAnalyses.tenantId],
    references: [tenants.id],
  }),
}));

export const treatmentPlansRelations = relations(treatmentPlans, ({ one, many }) => ({
  patient: one(patients, {
    fields: [treatmentPlans.patientId],
    references: [patients.id],
  }),
  tenant: one(tenants, {
    fields: [treatmentPlans.tenantId],
    references: [tenants.id],
  }),
  createdBy: one(users, {
    fields: [treatmentPlans.createdById],
    references: [users.id],
  }),
  versions: many(planVersions),
}));

export const planVersionsRelations = relations(planVersions, ({ one }) => ({
  plan: one(treatmentPlans, {
    fields: [planVersions.planId],
    references: [treatmentPlans.id],
  }),
  tenant: one(tenants, {
    fields: [planVersions.tenantId],
    references: [tenants.id],
  }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  tenant: one(tenants, {
    fields: [auditLogs.tenantId],
    references: [tenants.id],
  }),
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
}));
