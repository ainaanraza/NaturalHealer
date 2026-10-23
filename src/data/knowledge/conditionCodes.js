// Classification codes for the conditions in the remedy library (WHO ICD-11, release v2026-01).
//
// - icd11: the closest ICD-11 MMS code. Verified against the ICD-11 code listings in October 2026.
//   Using a code as a reference is allowed under ICD-11's CC BY-ND 3.0 IGO licence.
// - tm2Group: the ICD-11 Traditional Medicine Module 2 (Ayurveda, Siddha, Unani) group the
//   condition falls under, only where the match is unambiguous. Choosing the exact TM2 disorder
//   code is a clinical judgement, so it is left for a qualified practitioner (status 'draft').
//
// Our library entries are written for home care, so codes describe the closest match, not a diagnosis.

export const ICD11_RELEASE = '2026-01'
export const ICD11_BROWSER = `https://icd.who.int/browse/${ICD11_RELEASE}/mms/en`

export const conditionCodes = {
  cold: {
    icd11: { code: 'CA00', title: 'Acute nasopharyngitis' },
    tm2Group: { range: 'SK90–SK9Z', title: 'Nose disorders (TM2)' },
  },
  indigestion: {
    icd11: { code: 'DD90.3', title: 'Functional dyspepsia', note: 'ICD-11 lists "indigestion" as a synonym.' },
    tm2Group: { range: 'SM10–SM7Z', title: 'Gastro-intestinal disorders (TM2)' },
  },
  headache: {
    icd11: { code: '8A81', title: 'Tension-type headache' },
    tm2Group: { range: 'SK00–SK5Z', title: 'Head, brain, nerve and movement disorders (TM2)' },
  },
  acne: {
    icd11: { code: 'ED80', title: 'Acne' },
    tm2Group: { range: 'SN40–SN5Z', title: 'Skin disorders (TM2)' },
  },
  joint: {
    icd11: { code: 'ME82', title: 'Pain in joint' },
    tm2Group: { range: 'SP10–SP1Z', title: 'Joint disorders (TM2)' },
  },
  insomnia: {
    icd11: { code: '7A0Z', title: 'Insomnia disorders, unspecified', note: 'Chronic insomnia is 7A00; short-term insomnia is 7A01.' },
    tm2Group: null,
  },
  anxiety: {
    icd11: { code: 'MB24.3', title: 'Anxiety', note: 'A symptom code. Anxiety disorders are diagnosed by a clinician and coded separately.' },
    tm2Group: { range: 'SQ00–SQ4Z', title: 'Mental, emotional and behavioural disorders (TM2)' },
  },
  constipation: {
    icd11: { code: 'ME05.0', title: 'Constipation', note: 'Functional constipation, diagnosed by a clinician, is DD91.1.' },
    tm2Group: { range: 'SM10–SM7Z', title: 'Gastro-intestinal disorders (TM2)' },
  },
  diabetes: {
    icd11: { code: '5A11', title: 'Type 2 diabetes mellitus', note: 'The library entry supports type 2 diabetes alongside medical care.' },
    tm2Group: null,
  },
  hypertension: {
    icd11: { code: 'BA00', title: 'Essential hypertension' },
    tm2Group: null,
  },
  eczema: {
    icd11: { code: 'EA80', title: 'Atopic eczema' },
    tm2Group: { range: 'SN40–SN5Z', title: 'Skin disorders (TM2)' },
  },
  arthritis: {
    icd11: { code: 'FA0Z', title: 'Osteoarthritis, unspecified', note: 'Closest match for general arthritis support; inflammatory arthritis such as rheumatoid arthritis is coded differently.' },
    tm2Group: { range: 'SP10–SP1Z', title: 'Joint disorders (TM2)' },
  },
}

export const codeReview = { status: 'draft', reviewer: null, reviewedAt: null }
