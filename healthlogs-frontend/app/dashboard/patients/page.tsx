import React from "react";
import { cookies } from "next/headers";
import PatientTable from "@/features/Patient/PatientTable";

export type PatientSchema = {
  _id?: React.Key | null | undefined;
  id: React.Key | null | undefined;
  firstName: string;
  lastName: string;
  prn: string;
  dateOfBirth: string;
  gender: string;
  homeAddress: string;
  mobilePhone: number;
  phoneNumber: number;
  accessed: string;
  medicalBackground: {
    bloodGroup: string;
    genotype: string;
  };
  occupation: string;
  religion: string;
  ethnic: string;
  maritalStatus: string;
  email: string;
  role: string;
  fileId: string | number;
  createdAt: any;
  updatedAt: string | number | Date;
  age: number;
};
export default async function PatientListPage() {
  const url = process.env.API_URL;
  const token = cookies().get("session")?.value;
  let data = await fetch(`${url}api/v1/users`, {
    method: "GET", // You can change this to POST, PUT, etc. depending on your needs
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  let patients_data = await data.json();

  return (
    <main className="flex-1 px-4 overflow-auto">
      <h2 className="text-2xl font-bold mb-6">
        {patients_data.results} recent patients
      </h2>
      <PatientTable patients_data={patients_data} />
    </main>
  );
}
