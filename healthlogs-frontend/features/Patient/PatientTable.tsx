"use client";
import React, { useState } from "react";
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
// import { formatDate } from "@/lib/utils";
import { PatientSchema } from "@/app/dashboard/patients/page";
import moment from "moment";

const PatientTable = ({ patients_data }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("fileId");
  const [sortDirection, setSortDirection] = useState("asc");

  const filteredAndSortedPatients = patients_data.patients
    .filter((patient: any) =>
      patient.fileId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: any, b: any) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        {/* <div className="flex items-center space-x-2">
          <Input placeholder="All providers" className="w-40" />
          <Button variant="outline">Scheduled</Button>
          <Button variant="outline" className="bg-blue-100 text-blue-700">
            Recent
          </Button>
          <Button variant="outline">Show inactive</Button>
        </div> */}
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search by File ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
            aria-label="Search patients"
          />
        </div>
        <Link href="/dashboard/create/new-patient">
          <Button className="bg-[#7457D3] hover:bg-[#5E45A8]">
            Add patient
          </Button>
        </Link>
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
          {filteredAndSortedPatients.map((patient: PatientSchema) => (
            <TableRow key={patient.id}>
              <TableCell>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                  <Link
                    href={`/dashboard/patients/${patient.id}`}
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
                <p>{moment(patient.dateOfBirth).format("DD-MM-YYYY")}</p>
                <p className="text-sm text-gray-500">{patient.gender}</p>
              </TableCell>
              <TableCell>
                <p>{patient.homeAddress}</p>
                <p className="text-sm text-gray-500">{patient.phoneNumber}</p>
              </TableCell>
              <TableCell>
                {moment(patient.createdAt).format("DD-MM-YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientTable;
