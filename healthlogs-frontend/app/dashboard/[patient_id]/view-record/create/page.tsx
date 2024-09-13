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
  Trash2,
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
import { State, createRecord } from "@/app/actions/record";
import { useFormState } from "react-dom";
import { toast } from "@/hooks/use-toast";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PatientEncounterPage({
  params,
}: {
  params: { patient_id: string };
}) {
  const { patient_id } = params;

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
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const initialState: State = { errors: {}, message: "", status: "" };
  const [medications, setMedications] = useState<any[]>([]);

  const addMedication = () => {
    setMedications([
      ...medications,
      {
        name: "",
        sig: "",
        startDate: "",
        prescriptionDetails: {
          recorded: "",
          prescriber: "",
          refills: 0,
          quantity: 1,
        },
      },
    ]);
  };
  // @ts-ignore
  const [state, formAction] = useFormState(createRecord, initialState);
  useEffect(() => {
    if (state?.status === "Success") {
      toast({
        title: state?.status,
        description: state?.message,
      });
    } else if (state?.status === "Error") {
      toast({
        title: state?.status,
        description: state?.message,
      });
    }
  }, [state]);
  const updateMedication = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedMedications = [...medications];
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      updatedMedications[index][parent][child] = value;
    } else {
      updatedMedications[index][field] = value;
    }
    setMedications(updatedMedications);
  };
  const removeMedication = (index: number) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
  };

  const handleFormAction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("medications", JSON.stringify(medications));
    // @ts-ignore
    formAction(formData);
  };
  return (
    <>
      {/* Main Content */}
      <div className="">
        {/* Left Column - Previous Information */}
        {/* <Tabs defaultValue="summary" className="space-y-6">
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
          </Tabs> */}

        {/* Right Column - New Encounter */}
        <Card>
          <CardHeader>
            <CardTitle>New Encounter</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleFormAction}>
              <div className="hidden">
                <Label htmlFor="patient">Patient ID</Label>
                <Input id="patient" name="patient" value={patient_id} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="visitType">Visit Type</Label>
                  <Select name="visitType">
                    <SelectTrigger
                      className={
                        state?.errors?.visitType ? "border-red-500" : ""
                      }
                    >
                      <SelectValue placeholder="Select encounter type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Follow-Up">Follow-Up</SelectItem>
                      <SelectItem value="In Patient">In Patient</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Out Patient">Out Patient</SelectItem>
                    </SelectContent>
                  </Select>
                  {state?.errors?.visitType && (
                    <p className="text-red-500 text-sm">
                      {state?.errors.visitType[0]}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select name="department">
                    <SelectTrigger
                      className={
                        state?.errors?.department ? "border-red-500" : ""
                      }
                    >
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Obstetrics and Gynecology">
                        Obstetrics and Gynecology
                      </SelectItem>
                      <SelectItem value="Oncology">Oncology</SelectItem>
                      <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="Radiology">Radiology</SelectItem>
                    </SelectContent>
                  </Select>
                  {state?.errors?.department && (
                    <p className="text-red-500 text-sm">
                      {state?.errors.department[0]}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="healthConcerns">Health Concerns</Label>
                  <Input
                    id="healthConcerns"
                    name="healthConcerns"
                    placeholder="Health Concerns"
                    className={
                      state?.errors?.healthConcerns ? "border-red-500" : ""
                    }
                  />
                  {state?.errors?.healthConcerns && (
                    <p className="text-red-500 text-sm">
                      {state?.errors.healthConcerns[0]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="chiefComplaint">Chief Complaint</Label>
                <Textarea
                  id="chiefComplaint"
                  name="chiefComplaint"
                  placeholder="Add any problems or symptoms here"
                  className={
                    state?.errors?.chiefComplaint ? "border-red-500" : ""
                  }
                />
                {state?.errors?.chiefComplaint && (
                  <p className="text-red-500 text-sm">
                    {state.errors.chiefComplaint[0]}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="subjectiveNote">Subjective Note</Label>
                <Textarea
                  id="subjectiveNote"
                  name="subjectiveNote"
                  placeholder="Subjective Note"
                  className={
                    state?.errors?.subjectiveNote ? "border-red-500" : ""
                  }
                />
                {state?.errors?.subjectiveNote && (
                  <p className="text-red-500 text-sm">
                    {state.errors.subjectiveNote[0]}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="objectiveNote">Objective Note</Label>
                <Textarea
                  id="objectiveNote"
                  name="objectiveNote"
                  placeholder="Objective Note or None"
                  className={
                    state?.errors?.objectiveNote ? "border-red-500" : ""
                  }
                />
                {state?.errors?.objectiveNote && (
                  <p className="text-red-500 text-sm">
                    {state?.errors.objectiveNote[0]}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="assessmentNote">Assessment Note</Label>
                <Textarea
                  id="assessmentNote"
                  name="assessmentNote"
                  placeholder="Assessment Note"
                  className={
                    state?.errors?.assessmentNote ? "border-red-500" : ""
                  }
                />
                {state?.errors?.assessmentNote && (
                  <p className="text-red-500 text-sm">
                    {state.errors.assessmentNote[0]}
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Diagnosis</h3>
                <div className="grid grid-cols-3 gap-x-4">
                  <div className="col-span-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Diagnosis Description"
                      className={
                        // @ts-ignore
                        state?.errors?.diagnosis?.description
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {/* @ts-ignore */}
                    {state?.errors?.diagnosis?.description && (
                      <p className="text-red-500 text-sm">
                        {/* @ts-ignore */}
                        {state.errors?.diagnosis?.description[0]}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Medications
                  </h3>
                  {medications.map((medication, index) => (
                    <div
                      key={index}
                      className="mt-4 p-4 border rounded-md relative"
                    >
                      <Button
                        type="button"
                        onClick={() => removeMedication(index)}
                        className="absolute top-1 right-2 p-1"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove medication</span>
                      </Button>
                      <div>
                        <Label
                          htmlFor={`medication-name-${index}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Medication Name
                        </Label>
                        <Input
                          type="text"
                          id={`medication-name-${index}`}
                          value={medication.name}
                          onChange={(e) =>
                            updateMedication(index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-x-4">
                        <div className="mt-2">
                          <Label
                            htmlFor={`medication-sig-${index}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Sig
                          </Label>
                          <Input
                            type="text"
                            id={`medication-sig-${index}`}
                            value={medication.sig}
                            onChange={(e) =>
                              updateMedication(index, "sig", e.target.value)
                            }
                          />
                        </div>

                        <div className="mt-2">
                          <Label
                            htmlFor={`medication-start-date-${index}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Start Date
                          </Label>
                          <Input
                            type="date"
                            id={`medication-start-date-${index}`}
                            value={medication.startDate}
                            onChange={(e) =>
                              updateMedication(
                                index,
                                "startDate",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          Prescription Details
                        </h4>
                        <div className="mt-1 grid grid-cols-2 gap-4">
                          <div>
                            <Label
                              htmlFor={`medication-recorded-${index}`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Recorded
                            </Label>
                            <Input
                              type="datetime-local"
                              id={`medication-recorded-${index}`}
                              value={medication.prescriptionDetails.recorded}
                              onChange={(e) =>
                                updateMedication(
                                  index,
                                  "prescriptionDetails.recorded",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor={`medication-prescriber-${index}`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Prescriber
                            </Label>
                            <Input
                              type="text"
                              id={`medication-prescriber-${index}`}
                              value={medication.prescriptionDetails.prescriber}
                              onChange={(e) =>
                                updateMedication(
                                  index,
                                  "prescriptionDetails.prescriber",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor={`medication-refills-${index}`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Refills
                            </Label>
                            <Input
                              type="number"
                              id={`medication-refills-${index}`}
                              value={medication.prescriptionDetails.refills}
                              onChange={(e) =>
                                updateMedication(
                                  index,
                                  "prescriptionDetails.refills",
                                  parseInt(e.target.value)
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor={`medication-quantity-${index}`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Quantity
                            </Label>
                            <Input
                              type="number"
                              id={`medication-quantity-${index}`}
                              value={medication.prescriptionDetails.quantity}
                              onChange={(e) =>
                                updateMedication(
                                  index,
                                  "prescriptionDetails.quantity",
                                  parseInt(e.target.value)
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={addMedication}
                    className="mt-4"
                  >
                    Add Medication
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Vitals</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="height">Height (inch)</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={height}
                      // @ts-ignore
                      onChange={(e) => setHeight(e.target.value)}
                      className={
                        // @ts-ignore
                        state.errors?.physicalExamination?.height
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {/* @ts-ignore */}
                    {state.errors?.physicalExamination?.height && (
                      <p className="text-red-500 text-sm">
                        {/* @ts-ignore */}
                        {state.errors.physicalExamination?.height[0]}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (lb)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={weight}
                      // @ts-ignore
                      onChange={(e) => setWeight(e.target.value)}
                      className={
                        // @ts-ignore
                        state.errors?.physicalExamination?.weight
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {/* @ts-ignore */}
                    {state.errors?.physicalExamination?.weight && (
                      <p className="text-red-500 text-sm">
                        {/* @ts-ignore */}
                        {state.errors.physicalExamination?.weight[0]}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="bmi">BMI</Label>
                    <Input
                      id="bmi"
                      disabled
                      name="bmi"
                      value={((weight / (height * height)) * 703) | 0}
                    />
                  </div>
                  <div>
                    <Label>Blood Pressure</Label>
                    <div className="flex items-center space-x-1">
                      <div className="flex flex-col">
                        <Input
                          id="systolicPressure"
                          name="systolicPressure"
                          placeholder="Systo"
                          type="number"
                          className={
                            // @ts-ignore
                            state.errors?.physicalExamination?.height
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {/* @ts-ignore */}
                        {state.errors?.physicalExamination?.bloodPressure
                          ?.systolicPressure && (
                          <p className="text-red-500 text-sm">
                            {
                              // @ts-ignore
                              state.errors?.physicalExamination?.bloodPressure
                                ?.systolicPressure[0]
                            }
                          </p>
                        )}
                      </div>
                      <p>/</p>
                      <div className="flex flex-col">
                        <Input
                          id="diastolicPressure"
                          name="diastolicPressure"
                          placeholder="Diasto"
                          type="number"
                          className={
                            // @ts-ignore
                            state.errors?.physicalExamination?.bloodPressure
                              ?.diastolicPressure
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {/* @ts-ignore */}
                        {state.errors?.physicalExamination?.bloodPressure
                          ?.diastolicPressure && (
                          <p className="text-red-500 text-sm">
                            {
                              // @ts-ignore
                              state.errors?.physicalExamination?.bloodPressure
                                ?.diastolicPressure[0]
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="temperature">Temperature (°F)</Label>
                    <Input
                      id="temperature"
                      name="temperature"
                      type="number"
                      className={
                        // @ts-ignore
                        state.errors?.physicalExamination?.temperature
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {/* @ts-ignore */}
                    {state.errors?.physicalExamination?.temperature && (
                      <p className="text-red-500 text-sm">
                        {
                          // @ts-ignore
                          state.errors?.physicalExamination?.temperature[0]
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="pulse">Pulse (bpm)</Label>
                    <Input
                      id="pulse"
                      name="pulse"
                      type="number"
                      className={
                        // @ts-ignore
                        state.errors?.physicalExamination?.pulse
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {/* @ts-ignore */}
                    {state.errors?.physicalExamination?.pulse && (
                      <p className="text-red-500 text-sm">
                        {
                          // @ts-ignore
                          state.errors?.physicalExamination?.pulse[0]
                        }
                      </p>
                    )}
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
    </>
  );
}
