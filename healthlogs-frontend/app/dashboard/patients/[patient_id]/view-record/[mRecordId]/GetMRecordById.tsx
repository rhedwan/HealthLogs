"use client";
import React, { useEffect, useState } from "react";
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
  Phone,
  Settings,
  User,
  Users,
} from "lucide-react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
import { Medication, PatientRecord } from "@/schema/PatientRecord";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { State, consultAi } from "@/app/actions/aiDiagnosis";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import CircleLoader from "@/components/ui/CircleLoader";
import { PatientAllergy } from "@/schema/PatientAllergy";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatDate, formatDateChart } from "@/lib/utils";
import { PatientFamilyHistory } from "@/schema/PatientFamilyHistory";
import Link from "next/link";
import { generateMedicationPDF } from "@/lib/GeneratePDF";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function EncounterDetailsPage({
//   actualPatient,
//   actualEncounter,
// }: EncounterDetailsPageProps) {
export default function GetMRecordById({
  encounter,
  patient,
}: {
  encounter: PatientRecord;
  patient: any;
}) {
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
  const initialState: State = {
    errors: {},
    message: "",
    status: "",
    results: {},
  };
  // @ts-ignore
  const [state, formAction] = useFormState(consultAi, initialState);
  const { pending } = useFormStatus();
  const [showAiResults, setShowAiResults] = useState("stall");
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    if (state?.results?.RecommendedTests?.length > 0) {
      setIsPending(true);
      console.log(state.results);

      const timer = setTimeout(() => {
        setIsPending(false);
        setShowAiResults("success");
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer); // Clean up the timer
    } else {
      setShowAiResults("stall");
      setIsPending(false);
    }
  }, [state?.results]);
  return (
    <main className="flex-1 py-8 overflow-auto">
      <div className="container mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Previous Information */}

          <Tabs defaultValue="new-encounter" className="space-y-6">
            <TabsList>
              <TabsTrigger value="new-encounter">Current Encounter</TabsTrigger>
              <TabsTrigger value="ai-diagnostic">AI Diagnostic</TabsTrigger>
            </TabsList>

            <TabsContent value="new-encounter">
              <Card>
                <CardHeader>
                  <CardTitle>Current Encounter Details</CardTitle>
                  <CardDescription>
                    {new Date(encounter.createdAt)
                      .toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                      .replace(
                        /(\d+)(?=\D)/,
                        (d) =>
                          `${d}${
                            ["th", "st", "nd", "rd"][
                              (d as any) % 10 > 3 ||
                              ((d as any) % 100) - 10 == 0
                                ? 0
                                : (d as any) % 10
                            ]
                          }`
                      )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold">Encounter Type</p>
                        <p>{encounter.vistType}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Department</p>
                        <p>{encounter.department}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Seen By</p>
                        <p>
                          {encounter.createdBy.firstName}{" "}
                          {encounter.createdBy.lastName}
                        </p>
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
                          <p>{encounter.physicalExamination?.height} in</p>
                        </div>
                        <div>
                          <p className="font-semibold">Weight</p>
                          <p>{encounter.physicalExamination?.weight} lb</p>
                        </div>
                        <div>
                          <p className="font-semibold">BMI</p>
                          {/* <p>{encounter.physicalExamination.}</p> */}
                        </div>
                        <div>
                          <p className="font-semibold">Blood Pressure</p>
                          <p>
                            {
                              encounter.physicalExamination?.bloodPressure
                                ?.diastolicPressure
                            }{" "}
                            /{" "}
                            {
                              encounter.physicalExamination?.bloodPressure
                                ?.systolicPressure
                            }
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">Temperature</p>
                          <p>{encounter.physicalExamination?.temperature} °F</p>
                        </div>
                        <div>
                          <p className="font-semibold">Pulse</p>
                          <p>{encounter.physicalExamination?.pulse} bpm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Diagnoses
                  </CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Description</p>
                        <p>{encounter.diagnosis.description}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Start Date</p>
                        <p>
                          {formatDate(
                            encounter.diagnosis.startDate,
                            "DD MMM, YYYY"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card> */}
              <Card className="mt-4">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">
                      Patient Past Records
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patient.patientRecord
                      .slice(0, 1)
                      .map((record: PatientRecord) => (
                        <Link
                          href={`/dashboard/patients/${patient._id}/view-record/${record._id}`}
                          key={record._id}
                        >
                          <Card className="mb-2">
                            <CardHeader>
                              <CardTitle className="text-lg">
                                {record.vistType} - {record.department}
                              </CardTitle>
                              <CardDescription>
                                {new Date(record.createdAt).toLocaleString()}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm mb-2">
                                {record.diagnosis
                                  ? record.diagnosis?.description
                                  : "No diagnosis yet"}
                              </p>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>
                                  <span className="font-medium">
                                    Temperature:
                                  </span>{" "}
                                  {record.physicalExamination?.temperature}
                                </div>
                                <div>
                                  <span className="font-medium">
                                    Blood Pressure:
                                  </span>{" "}
                                  {
                                    record.physicalExamination?.bloodPressure
                                      .systolicPressure
                                  }
                                  /
                                  {
                                    record.physicalExamination?.bloodPressure
                                      .diastolicPressure
                                  }
                                </div>
                                <div>
                                  <span className="font-medium">Weight:</span>{" "}
                                  {record.physicalExamination?.weight} kg
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
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
                  {/* <div className="space-y-4">
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
                  </div> */}
                  <form action={formAction}>
                    <div className="hidden">
                      <Input
                        name="visitType"
                        value={encounter.vistType}
                        type="text"
                      />
                      <Input
                        name="patientId"
                        value={encounter.patient}
                        type="text"
                      />
                      <Input
                        name="department"
                        value={encounter.department}
                        type="text"
                      />
                      <Input
                        name="chiefComplaint"
                        value={encounter.chiefComplaint}
                        type="text"
                      />
                      <Input
                        name="healthConcerns"
                        value={encounter.healthConcerns}
                        type="text"
                      />
                      <Input
                        name="subjectiveNote"
                        value={encounter.subjectiveNote}
                        type="text"
                      />
                      <Input
                        name="objectiveNote"
                        value={encounter.objectiveNote}
                        type="text"
                      />
                      <Input
                        name="assessmentNote"
                        value={encounter.assessmentNote}
                        type="text"
                      />
                      <Input
                        name="description"
                        value={encounter.diagnosis.description}
                        type="text"
                      />
                      <Input
                        name="startDate"
                        value={encounter.diagnosis.startDate}
                        type="text"
                      />
                      <Input
                        name="systolicPressure"
                        value={
                          encounter.physicalExamination.bloodPressure
                            .systolicPressure
                        }
                        type="text"
                      />
                      <Input
                        name="diastolicPressure"
                        value={
                          encounter.physicalExamination.bloodPressure
                            .diastolicPressure
                        }
                        type="text"
                      />
                      <Input
                        name="weight"
                        value={encounter.physicalExamination.weight}
                        type="text"
                      />
                      <Input
                        name="height"
                        value={encounter.physicalExamination.height}
                        type="text"
                      />
                      <Input
                        name="pulse"
                        value={encounter.physicalExamination.pulse}
                        type="text"
                      />
                      <Input
                        name="temperature"
                        value={encounter.physicalExamination.temperature}
                        type="text"
                      />
                    </div>
                    <div className="w-full flex justify-center">
                      {showAiResults === "stall" && (
                        <Button
                          className="disabled:cursor-not-allowed"
                          disabled={isPending}
                        >
                          {isPending ? (
                            <>
                              <CircleLoader
                                size="small"
                                color="text-green-500"
                                thickness={3}
                              />
                              <span className="ml-2">consulting</span>
                            </>
                          ) : (
                            "Consult AI"
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                  {showAiResults === "success" && (
                    <div className="space-y-3">
                      <div>
                        <Label className="font-bold">Potential Diagnoses</Label>
                        <ul className="grid grid-cols-2 items-center list-disc ml-5 text-sm">
                          {state.results.PotentialDiagnoses.map(
                            (item: string) => {
                              return <li key={item}>{item}</li>;
                            }
                          )}
                        </ul>
                      </div>
                      <div>
                        <Label className="font-bold">Recommended Tests</Label>
                        <ul className="grid grid-cols-2 items-center list-disc ml-5 text-sm">
                          {state.results.RecommendedTests.map(
                            (item: string) => {
                              return <li key={item}>{item}</li>;
                            }
                          )}
                        </ul>
                      </div>
                      <div>
                        <Label className="font-bold">Medications</Label>
                        <ul className="flex items-center space-x-5 list-disc ml-5 text-sm">
                          <li>
                            {state.results.TreatmentSuggestions.Medications}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <Label className="font-bold">
                          Lifestyle Modifications
                        </Label>
                        <ul className="grid grid-cols-2 items-center list-disc ml-5 text-sm">
                          {state.results.TreatmentSuggestions.LifestyleModifications.map(
                            (item: string) => {
                              return <li key={item}>{item}</li>;
                            }
                          )}
                        </ul>
                      </div>
                      <div>
                        <Label className="font-bold">
                          Follow Up Recommendations
                        </Label>
                        <ul className="flex items-center space-x-5 list-disc ml-5 text-sm">
                          <li>
                            <span className="font-bold">Appointment: </span>
                            {state.results.FollowUpRecommendations.Appointment}
                          </li>
                          <li>
                            <span className="font-bold">FurtherAction: </span>
                            {
                              state.results.FollowUpRecommendations
                                .FurtherAction
                            }
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          {/* Right Column - New Encounter Details and AI Diagnostic */}

          <Tabs defaultValue="summary" className="space-y-6">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="graphs">Graphs</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              {/* <Card>
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
              </Card> */}

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Allergies</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      {patient.patientAllergy.map((allergy: PatientAllergy) => (
                        <TableRow key={allergy._id}>
                          <TableCell>{allergy.allergen}</TableCell>
                          <TableCell>{allergy.severity}</TableCell>
                          <TableCell>{allergy.comment}</TableCell>
                          <TableCell className="text-right">
                            {allergy.onset}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Family History ({patient.patientFamilyHistory.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      {patient.patientFamilyHistory.map(
                        (history: PatientFamilyHistory) => (
                          <TableRow key={history._id} className="items-center">
                            <TableCell>{history.description}</TableCell>
                            <div className="flex items-center space-x-3 mt-2">
                              {history.relatives.map((relative, index) => (
                                <Badge key={index}>{relative}</Badge>
                              ))}
                            </div>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* <Card className="mt-6">
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
              </Card> */}
            </TabsContent>

            <TabsContent value="graphs">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={patient.visits}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDateChart} />
                      <YAxis />
                      <Tooltip
                        labelFormatter={formatDateChart}
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--border))",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="hsl(var(--primary))"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Blood Pressure Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={patient.visits}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDateChart} />
                      <YAxis />
                      <Tooltip
                        labelFormatter={formatDateChart}
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--border))",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="systolic"
                        stroke="hsl(var(--destructive))"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="diastolic"
                        stroke="hsl(var(--primary))"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Medications ({encounter.medications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="items-center">
                  <TableHead>Medication</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Refils</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>SIG</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {encounter.medications.map((medication: Medication) => (
                  <TableRow key={medication._id} className="items-center">
                    <TableCell>{medication.name}</TableCell>
                    <TableCell>
                      {medication.prescriptionDetails.prescriber}
                    </TableCell>
                    <TableCell>
                      {formatDate(medication.startDate, "DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      {medication.prescriptionDetails.refills}
                    </TableCell>
                    <TableCell>
                      {medication.prescriptionDetails.quantity}
                    </TableCell>
                    <TableCell className="">{medication.sig} </TableCell>
                    <TableCell className="">
                      <Button
                        variant="outline"
                        className=""
                        onClick={(e) => {
                          e.preventDefault();
                          generateMedicationPDF(
                            medication.name,
                            medication.prescriptionDetails.prescriber,
                            medication.prescriptionDetails.quantity,
                            medication.prescriptionDetails.refills,
                            patient.firstName
                          );
                        }}
                      >
                        Prescription
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
