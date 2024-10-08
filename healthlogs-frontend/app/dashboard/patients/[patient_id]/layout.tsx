import React from "react";
import { verifySession } from "@/lib/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import { calculateAge } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BriefcaseBusiness,
  Calendar,
  CalendarDays,
  FileText,
  Home,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Settings,
  User,
  Users,
  UsersRound,
} from "lucide-react";
import PatientPDFGenerator from "@/components/system/GeneratePatientPdf";
import PatientCardPdf from "@/components/system/GeneratePatientCard";
interface RootLayoutProps {
  children: React.ReactNode;
  params: { patient_id: string };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const session = await verifySession();
  const { patient_id } = params;
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
  let patient = currentPatient.currentPatient;
  console.log(patient);
  return (
    <main className="flex-1 overflow-auto px-3">
      {/* <Card className="m-0 p-0"> */}
      {/* <CardHeader> */}
      <Card className="mt-6 mb-3">
        <CardHeader>
          <div className=" flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={patient.photo}
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
                  <Badge variant="outline">
                    {patient.role.charAt(0).toUpperCase() +
                      patient.role.slice(1).toLowerCase()}
                  </Badge>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-col -space-y-4 items-end">
              <PatientPDFGenerator patientData={patient} />
              <PatientCardPdf patientData={patient} />
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
                  <UsersRound className="h-4 w-4 opacity-70" />
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
                  <BriefcaseBusiness className="h-4 w-4 opacity-70" />
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

      {/* </Card> */}

      {children}
    </main>
  );
}
