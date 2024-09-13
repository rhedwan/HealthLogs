export interface PatientRecord {
  diagnosis: {
    description: string;
    startDate: string;
  };
  physicalExamination: {
    bloodPressure: {
      systolicPressure: number;
      diastolicPressure: number;
    };
    temperature: string;
    weight: number;
    height: number;
    pulse: number;
  };
  _id: string;
  patient: string;
  vistType: string;
  department: string;
  chiefComplaint: string;
  healthConcerns: string;
  medications: [
    {
      prescriptionDetails: {
        recorded: string;
        prescriber: string;
        refills: number;
        quantity: number;
      };
      name: string;
      sig: string;
      startDate: string;
      _id: string;
      id: string;
    }
  ];
  subjectiveNote: string;
  objectiveNote: string;
  assessmentNote: string;
  createdBy: {
    _id: string[];
    firstName: string[];
    lastName: string[];
    role: string[];
    photo: string[];
    dateOfBirth: string[];
    homeAddress: string;
    phoneNumber: string[];
    medicalBackground: {
      bloodGroup: string[];
      genotype: string[];
    };
    occupation: string[];
    religion: string[];
    ethnic: string[];
    maritalStatus: string[];
  };
  documents: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Medication {
  name: string;
  sig: string;
  startDate: string;
  _id: string;
  prescriptionDetails: {
    recorded: string;
    prescriber: string;
    refills: number;
    quantity: number;
  };
}
