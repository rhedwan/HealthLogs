export interface User {
  medicalBackground?: { bloodGroup?: string; genotype?: string };
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  role: string;
  fileId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  photo?: string;
  dateOfBirth: string;
  homeAddress: string;
  phoneNumber: string;
  occupation?: string;
  religion?: string;
  ethnic?: string;
  position: string;
  maritalStatus: string;
  age: number;
  id: string;
}
