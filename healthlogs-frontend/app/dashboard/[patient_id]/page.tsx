import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Mail, User } from "lucide-react";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const patient = {
    firstName: "hello",
    lastName: "Damilare",
    gender: "Male",
    occupation: "Software Engineer",
    religion: "Islam",
    ethnic: "Yoruba",
    maritalStatus: "Single",
    medicalBackground: {
      bloodGroup: "O+",
      genotype: "AA",
    },
    email: "ridwssan.s@example.com",
    active: true,
    dateOfBirth: new Date("2000-05-23T00:00:00.000Z"),
    role: "patient",
    fileId: "1724696389",
    createdAt: new Date("2024-08-26T18:19:49.336Z"),
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
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
              <CardTitle>
                {patient.firstName} {patient.lastName}
              </CardTitle>
              <CardDescription>Patient ID: {params.id}</CardDescription>
              <div className="flex space-x-2 mt-2">
                <Badge variant="outline">{patient.gender}</Badge>
                <Badge variant="outline">{patient.role}</Badge>
                {patient.active && <Badge variant="default">Active</Badge>}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="medical">Medical Info</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <div className="grid gap-4">
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
                      {patient.dateOfBirth.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm">{patient.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">File ID:</span>
                    <span className="text-sm">{patient.fileId}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="medical">
              <div className="grid gap-4">
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
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div className="mt-4 flex justify-end space-x-2">
        <Link href="dashboard/create/appointment">
          <Button>Create Appointment</Button>
        </Link>
      </div>
    </div>
  );
}
