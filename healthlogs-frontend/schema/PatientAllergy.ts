export interface PatientAllergy {
  _id: string;
  patient: string;
  allergen: string;
  severity: string;
  reaction: string;
  onset: string;
  allergenInfo: string;
  date: string;
  comment: string;
  status: string;
  __v: number;
}

export const reactionList = [
  "Unknown",
  "Anaphylaxis",
  "Bloating/gas",
  "Bradycardia",
  "Chest Pain",
  "Conjunctivitis",
  "Cough",
  "Diarrhea",
  "Difficulty speaking or swallowing",
  "Dizziness/Lightheadedness",
  "Facial swelling",
  "Hives",
  "Irregular Heartbeat",
  "Itchiness",
  "Loss of consciousness",
  "Nausea",
  "Pain/cramping",
  "Patchy swelling-skin",
  "Rash - generalized",
  "Rash - localized",
  "Respiratory Distress",
  "Runny nose",
  "Shortness of breath",
  "Tachycardia",
  "Tongue swelling",
  "Vomiting",
  "Wheezing",
  "Other",
];
