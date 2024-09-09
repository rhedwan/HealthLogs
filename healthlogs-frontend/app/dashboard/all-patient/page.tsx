import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";

export type PatientSchema = {
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
  console.log(patients_data);
  return (
    <main className="flex-1 p-8 overflow-auto">
      <h2 className="text-2xl font-bold mb-6">12 recent patients</h2>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Input placeholder="All providers" className="w-40" />
            <Button variant="outline">Scheduled</Button>
            <Button variant="outline" className="bg-blue-100 text-blue-700">
              Recent
            </Button>
            <Button variant="outline">Show inactive</Button>
          </div>
          <div className="flex items-center space-x-2">
            <Input placeholder="Search all patients" className="w-64" />
            <Link href="/dashboard/create/new-patient">
              <Button className="bg-orange-500 text-white hover:bg-orange-600">
                Add patient
              </Button>
            </Link>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>FIRST</TableHead>
              <TableHead>LAST</TableHead>
              <TableHead>PRN</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>CONTACT INFO</TableHead>
              <TableHead>ACCESSED</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients_data.patients.map((patient: PatientSchema) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                    <Link
                      href={`/dashboard/${patient.id}`}
                      className="font-medium text-blue-600"
                    >
                      {patient.firstName}
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="text-blue-600">
                  {patient.lastName}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {patient.fileId}
                </TableCell>
                <TableCell>
                  <p>{formatDate(patient.dateOfBirth, "DD-MM-YYYY")}</p>
                  <p className="text-sm text-gray-500">{patient.gender}</p>
                </TableCell>
                <TableCell>
                  <p>{patient.homeAddress}</p>
                  <p className="text-sm text-gray-500">{patient.phoneNumber}</p>
                </TableCell>
                <TableCell>
                  {formatDate(patient.createdAt, "DD-MM-YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
