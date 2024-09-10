export interface PatientAllergy {
  _id: string;
  patient: string;
  allergen: string;
  severity: string;
  reaction: string;
  onset: string;
  date: string;
  comment: string;
  status: string;
  __v: number;
}
