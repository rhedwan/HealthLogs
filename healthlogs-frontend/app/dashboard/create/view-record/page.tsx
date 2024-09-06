"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  FileText,
  Home,
  Mail,
  MessageSquare,
  Settings,
  User,
  Users,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
export default function EncounterDetailsPage() {
  const defaultPatient = {
    firstName: "Eric",
    lastName: "DemoGastro",
    fileId: "EG629610",
    gender: "Male",
    role: "Patient",
    ethnic: "Caucasian",
    religion: "Christian",
    maritalStatus: "Married",
    dateOfBirth: "1951-05-12",
    email: "eric.demogastro@example.com",
    occupation: "Retired",
    age: 73,
    medicalBackground: {
      bloodGroup: "A+",
      genotype: "AA",
    },
  };

  const defaultEncounter = {
    encounterType: "Office Visit",
    noteType: "Progress Note",
    date: "2023-06-15",
    seenBy: "Dr. Smith",
    chiefComplaint: "Stomach pain and nausea",
    height: "70",
    weight: "180",
    bmi: "25.8",
    bloodPressure: "120/80",
    temperature: "98.6",
    pulse: "72",
  };

  // const patient = actualPatient || defaultPatient;
  // const encounter = actualEncounter || defaultEncounter;
  const patient = defaultPatient;
  const encounter = defaultEncounter;

  const weightData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Weight (lbs)",
        data: [180, 182, 181, 183, 180, 179],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const bpData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Systolic",
        data: [120, 122, 125, 123, 121, 120],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Diastolic",
        data: [80, 82, 83, 81, 80, 79],
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Patient Data Over Time",
      },
    },
  };

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
                      <span className="text-sm font-medium">
                        Marital Status:
                      </span>
                      <span className="text-sm">{patient.maritalStatus}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarDays className="h-4 w-4 opacity-70" />
                      <span className="text-sm font-medium">
                        Date of Birth:
                      </span>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Previous Information */}
          <Tabs defaultValue="summary" className="space-y-6">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="graphs">Graphs</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Social Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Tobacco use:</strong> No tobacco use recorded
                  </p>
                  <p>
                    <strong>Social history:</strong> Never smoker, 1-2 beers per
                    night, no illicits
                  </p>
                  <p>
                    <strong>Gender identity:</strong> No gender identity
                    recorded
                  </p>
                  <p>
                    <strong>Sexual orientation:</strong> No sexual orientation
                    recorded
                  </p>
                  <p>
                    <strong>Nutrition history:</strong> No nutrition history
                    recorded
                  </p>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Allergies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Peanut</li>
                    <li>Penicillin G</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Family Health History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Father (deceased from colon cancer), Mother (hypertension)
                  </p>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Past Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Ongoing medical problems:</strong> Hypothyroidism,
                    CAD, Melena, Colonic polyps, Diverticulosis
                  </p>
                  <p>
                    <strong>Preventive care:</strong> Annual flu shot, up to
                    date on DTaP
                  </p>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Previous Encounters</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Nov 17, 2022 - Consultation</li>
                    <li>Feb 21, 2022 - Re-visit</li>
                    <li>Aug 3, 2022 - Scheduled visit</li>
                    <li>Nov 17, 2021 - Scheduled visit</li>
                    <li>Feb 21, 2021 - Consultation</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="graphs">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <Line options={chartOptions} data={weightData} />
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Blood Pressure Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <Line options={chartOptions} data={bpData} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Right Column - New Encounter Details and AI Diagnostic */}
          <Tabs defaultValue="new-encounter" className="space-y-6">
            <TabsList>
              <TabsTrigger value="new-encounter">New Encounter</TabsTrigger>
              <TabsTrigger value="ai-diagnostic">AI Diagnostic</TabsTrigger>
            </TabsList>

            <TabsContent value="new-encounter">
              <Card>
                <CardHeader>
                  <CardTitle>Latest Encounter Details</CardTitle>
                  <CardDescription>{encounter.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold">Encounter Type</p>
                        <p>{encounter.encounterType}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Note Type</p>
                        <p>{encounter.noteType}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Seen By</p>
                        <p>{encounter.seenBy}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">Chief Complaint</p>
                      <p>{encounter.chiefComplaint}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Vitals</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="font-semibold">Height</p>
                          <p>{encounter.height} in</p>
                        </div>
                        <div>
                          <p className="font-semibold">Weight</p>
                          <p>{encounter.weight} lb</p>
                        </div>
                        <div>
                          <p className="font-semibold">BMI</p>
                          <p>{encounter.bmi}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Blood Pressure</p>
                          <p>{encounter.bloodPressure}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Temperature</p>
                          <p>{encounter.temperature} °F</p>
                        </div>
                        <div>
                          <p className="font-semibold">Pulse</p>
                          <p>{encounter.pulse} bpm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-diagnostic">
              <Card>
                <CardHeader>
                  <CardTitle>AI Diagnostic</CardTitle>
                  <CardDescription>
                    AI-generated insights based on patient data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Potential Diagnoses
                      </h3>
                      <ul className="list-disc list-inside">
                        <li>Gastroesophageal reflux disease (GERD)</li>
                        <li>Peptic ulcer disease</li>
                        <li>Gastritis</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Recommended Tests
                      </h3>
                      <ul className="list-disc list-inside">
                        <li>Upper endoscopy</li>
                        <li>H. pylori test</li>
                        <li>Complete blood count (CBC)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Treatment Suggestions
                      </h3>
                      <p>
                        Consider prescribing proton pump inhibitors (PPIs) and
                        lifestyle modifications. Avoid NSAIDs and recommend a
                        bland diet.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Follow-up Recommendations
                      </h3>
                      <p>
                        Schedule a follow-up appointment in 2 weeks to assess
                        symptom improvement. If symptoms persist, consider
                        referral to a gastroenterologist.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
