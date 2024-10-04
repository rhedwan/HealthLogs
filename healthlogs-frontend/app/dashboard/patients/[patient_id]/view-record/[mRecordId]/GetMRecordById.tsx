"use client";

import { useState } from "react";
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
import { Medication, PatientRecord } from "@/schema/PatientRecord";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { State, consultAi } from "@/app/actions/aiDiagnosis";
import { Label } from "@/components/ui/label";
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
import GoBackButton from "@/components/system/BackButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
function AIConsultButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="disabled:cursor-not-allowed" disabled={pending}>
      {pending ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="ml-2">Consulting...</span>
        </>
      ) : (
        "Consult AI"
      )}
    </Button>
  );
}
export default function GetMRecordById({
  encounter,
  patient,
}: {
  encounter: PatientRecord;
  patient: any;
}) {
  const initialState: State = {
    errors: {},
    message: "",
    status: "",
    results: {},
  };
  // @ts-ignore
  const [state, formAction] = useFormState(consultAi, initialState);
  const { pending, data } = useFormStatus();
  // const [showAiResults, setShowAiResults] = useState("stall");
  const [isPending, setIsPending] = useState(false);
  return (
    <main className="flex-1 overflow-auto">
      <div className="my-3 flex justify-start">
        <Button className="bg-white hover:bg-white text-black">
          <GoBackButton />
        </Button>
      </div>
      <div className="mx-auto">
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
                      <p className="font-semibold">Diagnosis</p>
                      <p className="">
                        {encounter.diagnosis?.description || "None"}{" "}
                        <span className="text-sm text-gray-400 text-left">
                          {formatDate(
                            encounter.diagnosis.startDate,
                            "DD/MM/YYYY"
                          )}
                        </span>{" "}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Subjective Note</p>
                      <p>{encounter?.subjectiveNote || "None"}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Objective Note</p>
                      <p>{encounter?.objectiveNote || "None"}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Assessmen tNote</p>
                      <p>{encounter.assessmentNote}</p>
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
                      .slice(0, 3)
                      .map((record: PatientRecord) => (
                        <Link
                          href={`/dashboard/patients/${patient._id}/view-record/${record._id}`}
                          key={record._id}
                          className="mb-3"
                        >
                          <Card className="mb-3 hover:bg-blue-50">
                            <CardHeader className="py-3 px-6">
                              <CardTitle className="text-sm flex justify-between items-center">
                                {record.vistType} - {record.department}
                                <div className="font-normal">
                                  {new Date(record.createdAt).toLocaleString()}
                                </div>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pb-3 px-6">
                              <p className="text-sm">
                                CC:{" "}
                                {record.chiefComplaint
                                  ? record.chiefComplaint
                                  : "No chief complaint recorded"}
                              </p>
                              {/* <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Temperature:</span>{" "}
                            {record.physicalExamination?.temperature}
                          </div>
                          <div>
                            <span className="font-medium">Blood Pressure:</span>{" "}
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
                        </div> */}
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
                      {!state?.results?.PotentialDiagnoses && (
                        <AIConsultButton />
                      )}
                    </div>
                  </form>
                  {state?.results?.PotentialDiagnoses && (
                    <div className="space-y-3">
                      <div>
                        <Label className="font-bold">Potential Diagnoses</Label>
                        <ul className="grid grid-cols-2 items-center list-disc ml-5 text-sm">
                          {state.results.PotentialDiagnoses.map(
                            (item: string) => (
                              <li key={item}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                      <div>
                        <Label className="font-bold">Recommended Tests</Label>
                        <ul className="grid grid-cols-2 items-center list-disc ml-5 text-sm">
                          {state.results.RecommendedTests.map(
                            (item: string) => (
                              <li key={item}>{item}</li>
                            )
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
                            (item: string) => (
                              <li key={item}>{item}</li>
                            )
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
                            <span className="font-bold">Further Action: </span>
                            {
                              state.results.FollowUpRecommendations
                                .FurtherAction
                            }
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  <Alert
                    // variant="warning"
                    className="bg-yellow-50 border-yellow-200 mt-5"
                  >
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertTitle className="text-yellow-800">
                      AI Diagnosis Disclaimer
                    </AlertTitle>
                    <AlertDescription className="text-yellow-700">
                      Warning: This AI-generated diagnosis may be inaccurate.
                      Always consult a healthcare professional for proper advice
                      and treatment. This tool is for informational purposes
                      only and not a substitute for medical consultation.
                    </AlertDescription>
                  </Alert>
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
        <Card className="mt-4 mb-6">
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
                            patient.firstName,
                            medication.sig
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
