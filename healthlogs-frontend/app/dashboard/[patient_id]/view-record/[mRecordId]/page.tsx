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
  let data = await fetch(`${url}api/v1/users/patient/${patient_id}`, {
    method: "GET", // You can change this to POST, PUT, etc. depending on your needs
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  let currentPatient = await data.json();
  console.log(currentPatient);
  let fetchMRecord = await fetch(`${url}api/v1/medicalRecord/${mRecordId}`, {
    method: "GET", // You can change this to POST, PUT, etc. depending on your needs
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  let medicalRecord = await fetchMRecord.json();
  console.log(medicalRecord);
  return (
    <main className="">
      <GetMRecordById
        encounter={medicalRecord.medicalRecord}
        patient={currentPatient.currentPatient}
      />
    </main>
  );
}
