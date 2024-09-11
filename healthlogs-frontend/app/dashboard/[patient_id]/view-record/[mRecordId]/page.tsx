import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Home, Mail, Phone, User, Users } from "lucide-react";
import GetMRecordById from "./GetMRecordById";
import { cookies } from "next/headers";

interface EncounterDetailsPageProps {
  actualPatient?: {
    firstName: string;
    lastName: string;
    fileId: string;
    gender: string;
    role: string;
    ethnic: string;
    religion: string;
    maritalStatus: string;
    dateOfBirth: string;
    email: string;
    occupation: string;
    age: number;
    medicalBackground: {
      bloodGroup: string;
      genotype: string;
    };
  };
  actualEncounter?: {
    encounterType: string;
    noteType: string;
    date: string;
    seenBy: string;
    chiefComplaint: string;
    height: string;
    weight: string;
    bmi: string;
    bloodPressure: string;
    temperature: string;
    pulse: string;
  };
}
// export default function EncounterDetailsPage({
//   actualPatient,
//   actualEncounter,
// }: EncounterDetailsPageProps) {
export default async function EncounterDetailsPage({
  params,
}: {
  params: { mRecordId: string; patient_id: string };
}) {
  const { mRecordId, patient_id } = params;
  const url = process.env.API_URL;
  const token = cookies().get("session")?.value;
  let fetchPatient = await fetch(`${url}api/v1/users/patient/${patient_id}`, {
    method: "GET", // You can change this to POST, PUT, etc. depending on your needs
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  let currentPatient = await fetchPatient.json();
  let patient = await currentPatient.currentPatient;
  let fetchMRecord = await fetch(`${url}api/v1/medicalRecord/${mRecordId}`, {
    method: "GET", // You can change this to POST, PUT, etc. depending on your needs
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  let medicalRecord = await fetchMRecord.json();
  return (
    <main className="flex-1 p-8 overflow-auto">
      <div className="container mx-auto">
        {/* Patient Details */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src="/placeholder.svg?height=80&width=80"
                  alt={`${patient.firstName} ${patient.lastName}`}
                />
                <AvatarFallback>
                  {patient.firstName[0]}
                  {patient.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">
                  {patient.firstName} {patient.lastName}
                </CardTitle>
                <CardDescription>Patient ID: {patient.fileId}</CardDescription>
                <div className="flex space-x-2 mt-2">
                  <Badge variant="outline">{patient.gender}</Badge>
                  <Badge variant="outline">{patient.role}</Badge>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList>
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="medical">Medical Info</TabsTrigger>
                <TabsTrigger value="contact">Contact Info</TabsTrigger>
              </TabsList>
              <TabsContent value="personal">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">Ethnicity:</span>
                    <span className="text-sm">{patient.ethnic}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">Religion:</span>
                    <span className="text-sm">{patient.religion}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">Marital Status:</span>
                    <span className="text-sm">{patient.maritalStatus}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">Date of Birth:</span>
                    <span className="text-sm">
                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">Occupation:</span>
                    <span className="text-sm">{patient.occupation}</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="medical">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Blood Group:</span>
                    <span className="text-sm">
                      {patient.medicalBackground.bloodGroup}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Genotype:</span>
                    <span className="text-sm">
                      {patient.medicalBackground.genotype}
                    </span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="contact">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm">{patient.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">Phone:</span>
                    <span className="text-sm">{patient.phoneNumber}</span>
                  </div>
                  <div className="col-span-2 flex items-start space-x-2">
                    <Home className="h-4 w-4 opacity-70 mt-1" />
                    <div>
                      <span className="text-sm font-medium">Address:</span>
                      <p className="text-sm">{patient.homeAddress}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <GetMRecordById encounter={medicalRecord.medicalRecord} />
      </div>
    </main>
  );
}
