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
import { CalendarDays, Mail, User, FileText, Plus } from "lucide-react";
import Link from "next/link";

interface PhysicalExamination {
  temperature: string;
  bloodPressure: string;
  weight: number;
}

interface PatientRecord {
  _id: string;
  vistType: string;
  department: string;
  description: string;
  physicalExamination: PhysicalExamination;
  createdAt: string;
}

interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  occupation: string;
  religion: string;
  ethnic: string;
  maritalStatus: string;
  medicalBackground: {
    bloodGroup: string;
    genotype: string;
  };
  email: string;
  dateOfBirth: string;
  role: string;
  fileId: string;
  createdAt: string;
  age: number;
  patientRecord: PatientRecord[];
}

export default function Page({ params }: { params: { id: string } }) {
  // In a real application, you would fetch this data based on the params.id
  const patient: Patient = {
    _id: "66cd8daac6e6f750dfe3dac8",
    firstName: "Ridwan",
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
    email: "nmmm.s@example.com",
    dateOfBirth: "2000-05-23T00:00:00.000Z",
    role: "patient",
    fileId: "1724747178",
    createdAt: "2024-08-27T08:26:18.220Z",
    age: 24,
    patientRecord: [
      {
        _id: "66cdc2f4a143cc9b69e0b1a7",
        vistType: "Emergency",
        department: "Cardiology",
        description:
          "Patient presents with chest pain and shortness of breath.",
        physicalExamination: {
          temperature: "98.6°F",
          bloodPressure: "120/80 mmHg",
          weight: 70,
        },
        createdAt: "2024-08-27T12:13:40.637Z",
      },
      {
        _id: "66cdc7b4a143cc9b69e0b1ad",
        vistType: "Emergency",
        department: "Cardiology",
        description:
          "Patient presents with chest pain and shortness of breath.",
        physicalExamination: {
          temperature: "98.6°F",
          bloodPressure: "120/80 mmHg",
          weight: 70,
        },
        createdAt: "2024-08-27T12:33:56.158Z",
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
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
                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm">{patient.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">Occupation:</span>
                    <span className="text-sm">{patient.occupation}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 opacity-70" />
                    <span className="text-sm font-medium">Age:</span>
                    <span className="text-sm">{patient.age}</span>
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

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patient Records</h2>
        <Link href={`/dashboard/create/record/${patient._id}`}>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add New Record
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {patient.patientRecord.map((record) => (
          <Card key={record._id}>
            <CardHeader>
              <CardTitle className="text-lg">
                {record.vistType} - {record.department}
              </CardTitle>
              <CardDescription>
                {new Date(record.createdAt).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">{record.description}</p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="font-medium">Temperature:</span>{" "}
                  {record.physicalExamination.temperature}
                </div>
                <div>
                  <span className="font-medium">Blood Pressure:</span>{" "}
                  {record.physicalExamination.bloodPressure}
                </div>
                <div>
                  <span className="font-medium">Weight:</span>{" "}
                  {record.physicalExamination.weight} kg
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end space-x-2">
        <Link href={`/dashboard/create/appointment/${patient._id}`}>
          <Button>Create Appointment</Button>
        </Link>
      </div>
    </div>
  );
}
