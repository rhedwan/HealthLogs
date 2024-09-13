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
import { PatientRecord } from "@/schema/PatientRecord";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { State, consultAi } from "@/app/actions/aiDiagnosis";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import CircleLoader from "@/components/ui/CircleLoader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// export default function EncounterDetailsPage({
//   actualPatient,
//   actualEncounter,
// }: EncounterDetailsPageProps) {
export default function GetMRecordById({
  encounter,
}: {
  encounter: PatientRecord;
}) {
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
    <main className="flex-1 p-8 overflow-auto">
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
                        {/* <p>{encounter.seenBy}</p> */}
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
        </div>
      </div>
    </main>
  );
}
