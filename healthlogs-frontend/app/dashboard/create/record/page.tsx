"use client";
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  CalendarDays,
  FileText,
  Home,
  Mail,
  MessageSquare,
  Search,
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

export default function PatientEncounterPage() {
  const [newEncounter, setNewEncounter] = useState({
    encounterType: "",
    noteType: "",
    date: "",
    seenBy: "",
    chiefComplaint: "",
    height: "",
    weight: "",
    bmi: "",
    bloodPressure: "",
    temperature: "",
    pulse: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEncounter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setNewEncounter((prev) => ({ ...prev, [name]: value }));
  };

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

  // Mock patient data
  const patient = {
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

          {/* Right Column - New Encounter */}
          <Card>
            <CardHeader>
              <CardTitle>New Encounter</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="encounterType">Encounter Type</Label>
                    <Select
                      name="encounterType"
                      value={newEncounter.encounterType}
                      onValueChange={handleSelectChange("encounterType")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select encounter type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office-visit">
                          Office Visit
                        </SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="noteType">Note Type</Label>
                    <Select
                      name="noteType"
                      value={newEncounter.noteType}
                      onValueChange={handleSelectChange("noteType")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select note type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="case-review">Case Review</SelectItem>
                        <SelectItem value="progress-note">
                          Progress Note
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      type="date"
                      id="date"
                      name="date"
                      value={newEncounter.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seenBy">Seen By</Label>
                    <Input
                      id="seenBy"
                      name="seenBy"
                      value={newEncounter.seenBy}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="chiefComplaint">Chief Complaint</Label>
                  <Textarea
                    id="chiefComplaint"
                    name="chiefComplaint"
                    placeholder="Add any problems or symptoms here"
                    value={newEncounter.chiefComplaint}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Vitals</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="height">Height (in)</Label>
                      <Input
                        id="height"
                        name="height"
                        value={newEncounter.height}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (lb)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        value={newEncounter.weight}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bmi">BMI</Label>
                      <Input
                        id="bmi"
                        name="bmi"
                        value={newEncounter.bmi}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bloodPressure">Blood Pressure</Label>
                      <Input
                        id="bloodPressure"
                        name="bloodPressure"
                        value={newEncounter.bloodPressure}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="temperature">Temperature (°F)</Label>
                      <Input
                        id="temperature"
                        name="temperature"
                        value={newEncounter.temperature}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pulse">Pulse (bpm)</Label>
                      <Input
                        id="pulse"
                        name="pulse"
                        value={newEncounter.pulse}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Save Encounter
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
