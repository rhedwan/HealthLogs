import React from "react";
import { verifySession } from "@/lib/session";
import { CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import { calculateAge } from "@/lib/utils";

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
      <div className="bg-white px-5 py-5">
        <div className="flex justify-between">
          <div className="flex items-center space-x-1">
            <Avatar className="h-8 w-8">
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
              <div className="text-lg flex space-x-3 items-center">
                {/* <div className="flex items-center space-x-1">
                  <p>
                    {patient.firstName} {patient.lastName}
                  </p>
                  <Separator orientation="vertical" />
                  <p className="text-sm text-muted-foreground">
                    {patient.fileId}
                  </p>
                </div> */}
                <div className="flex h-5 items-center space-x-2 text-sm">
                  <p className="text-base font-semibold">
                    {patient.firstName} {patient.lastName}
                  </p>
                  <Separator orientation="vertical" />
                  <p className="text-sm text-muted-foreground">
                    {patient.fileId}
                  </p>
                  <Separator orientation="vertical" />

                  <Badge variant="outline">{patient.gender}</Badge>
                  <Separator orientation="vertical" />
                  <Badge variant="outline">
                    {calculateAge(patient.dateOfBirth as Date)} {" yrs"}
                  </Badge>
                  <Separator orientation="vertical" />
                  <Badge variant="outline">{patient.role}</Badge>
                  <Separator orientation="vertical" />
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </CardHeader> */}
        {/* <CardContent> */}
        {/* <Tabs defaultValue="personal" className="w-full">
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
          </Tabs> */}
        {/* </CardContent> */}
      </div>

      {/* </Card> */}

      {children}
    </main>
  );
}
