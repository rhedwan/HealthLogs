"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, FileText, Heart } from "lucide-react";
import { closeModalAndToast, formatDate, formatDateChart } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { State, createAppointment } from "@/app/actions/appointment";
import { exportToCSVRecharts } from "@/lib/exportCsv";
import { AddAllergy } from "@/app/actions/allergy";
import { useToast } from "@/hooks/use-toast";
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
import DocumentList from "@/features/documents/components/DocumentList";
import MedicalRecords from "@/features/Patient/components/MedicalRecords";
import PatientAllergies from "@/features/Patient/components/PatientAllergies";
import FamilyHistory from "@/features/Patient/components/FamilyHistory";
import Link from "next/link";
import Profile from "@/features/Patient/components/Profile";
import SaveButton from "@/components/system/SaveButton";
import { statusColors } from "../../appointment/GetAppointment";

const GetPatientById = ({ patient }: any) => {
  const { toast } = useToast();
  const appointmentTypes = [
    "Follow-Up Visit",
    "New Patient Visit",
    "Nursing Only",
    "Urgent Visit",
    "Video Visit",
    "Wellness Exam",
  ];
  const initialState: State = { message: "", errors: {} };
  const [appointmentState, formActionAppointment] = useFormState(
    // @ts-ignore
    createAppointment,
    initialState
  );

  // @ts-ignore
  const [allergyState, formActionAllergy] = useFormState(
    AddAllergy,
    initialState
  );
  const { pending } = useFormStatus();
  const [openAllergy, setOpenAllergy] = useState(false);
  const [openAppointment, setOpenAppointment] = useState(false);

  useEffect(() => {
    closeModalAndToast(
      allergyState,
      formActionAllergy,
      toast,
      openAllergy,
      setOpenAllergy,
      "Success",
      "The allergy has been added to the patient's record.",
      "Allergy added successfully!"
    );
  }, [allergyState.message, openAllergy]);
  useEffect(() => {
    closeModalAndToast(
      appointmentState,
      formActionAppointment,
      toast,
      openAppointment,
      setOpenAppointment,
      "Success",
      "Appointment added successfully!",
      "Appointment added successfully!"
    );
  }, [appointmentState.message, openAppointment]);
  return (
    <main>
      <Tabs defaultValue="summary" className="w-full py-3">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Card className="bg-purple-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Latest Blood pressure
                </CardTitle>
                <Heart className="h-4 w-4 opacity-70" />
              </CardHeader>
              <CardContent>
                {patient.patientRecord.length > 0 && (
                  <div className="text-2xl font-bold">
                    {
                      patient.patientRecord[patient.patientRecord.length - 1]
                        .physicalExamination?.bloodPressure.systolicPressure
                    }
                    /
                    {
                      patient.patientRecord[patient.patientRecord.length - 1]
                        .physicalExamination.bloodPressure.diastolicPressure
                    }
                  </div>
                )}
                <p className="text-xs opacity-70">mm Hg</p>
              </CardContent>
            </Card>
            <Card className="bg-emerald-400 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Blood type
                </CardTitle>
                <Heart className="h-4 w-4 opacity-70" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {patient.medicalBackground.bloodGroup}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-emerald-400 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Genotype</CardTitle>
                <FileText className="h-4 w-4 opacity-70" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {patient.medicalBackground.genotype}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-emerald-400 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Visits in {new Date().getFullYear()}
                </CardTitle>
                <Calendar className="h-4 w-4 opacity-70" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {patient.visits.length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Diagnoses (4)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Headache</li>
              <li>Hypertension</li>
              <li>Food Allergy</li>
              <li>Tourette Syndrome</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Allergies (2)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Peanut</li>
              <li>Penicillin G</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Body mass index
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span>62 kg</span>
              <span>173 cm</span>
            </div>
            <Progress value={33} className="h-2 mb-2" />
            <p className="text-sm text-gray-500 text-center">Normal</p>
          </CardContent>
        </Card>
      </div> */}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <MedicalRecords patient={patient} />
            <PatientAllergies patient={patient} />
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            <FamilyHistory patient={patient} />
            {/* <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Meds (6)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Aspirin</li>
              <li>Actos</li>
              <li>Bupropion</li>
              <li>Lisinopril</li>
              <li>Omeprazole</li>
              <li>Vitamin D3</li>
            </ul>
            <Button variant="outline" className="w-full mt-4">
              Add
            </Button>
          </CardContent>
        </Card> */}
          </div>

          {/* <div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <p className="text-lg font-semibold">History for 2023</p>
              <Button
                className="bg-purple-500 hover:bg-purple-700"
                // onClick={() => exportToCSV(visitHistory, "Rate")}
                disabled
              >
                Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={visitHistory} options={chartOptions} />
          </CardContent>
        </Card>
      </div> */}
          <div>
            <Tabs defaultValue="bloodPressure" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="weight">Weight</TabsTrigger>
                <TabsTrigger value="bloodPressure">Blood Pressure</TabsTrigger>
              </TabsList>
              <TabsContent value="weight">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <p>Weight Over Time</p>
                      <Button
                        className="bg-purple-500 hover:bg-purple-700"
                        onClick={() => exportToCSVRecharts(patient.visits)}
                      >
                        Export
                      </Button>
                    </CardTitle>
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
              </TabsContent>
              <TabsContent value="bloodPressure">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <p>Blood Pressure Over Time</p>
                      <Button
                        className="bg-purple-500 hover:bg-purple-700"
                        onClick={() => exportToCSVRecharts(patient.visits)}
                      >
                        Export
                      </Button>
                    </CardTitle>
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
        </TabsContent>
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                  Appointments ({patient.patientAppointment.length})
                </p>
                <Dialog
                  open={openAppointment}
                  onOpenChange={(newOpen) => {
                    setOpenAppointment(newOpen);
                    if (!newOpen) {
                      // Reset the state when closing the dialog
                      // formActionAppointment(new FormData());
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button>New +</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create Appointment</DialogTitle>
                    </DialogHeader>
                    <form action={formActionAppointment}>
                      <div className="space-y-2 hidden">
                        <Label htmlFor="patientId">Patient ID</Label>
                        <Input
                          id="patientId"
                          name="patientId"
                          value={patient.fileId}
                          placeholder="Enter Patient ID"
                          className={
                            appointmentState?.errors?.patientId
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {appointmentState?.errors?.patientId && (
                          <p className="text-red-500 text-sm">
                            {appointmentState.errors.patientId[0]}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appointmentType">
                          Appointment Type
                        </Label>
                        <Select name="appointmentType">
                          <SelectTrigger
                            className={
                              appointmentState?.errors?.appointmentType
                                ? "border-red-500"
                                : ""
                            }
                          >
                            <SelectValue placeholder="Select Appointment Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {appointmentTypes.map((item) => {
                              return (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        {appointmentState?.errors?.appointmentType && (
                          <p className="text-red-500 text-sm">
                            {appointmentState.errors.appointmentType[0]}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          name="date"
                          className={
                            appointmentState?.errors?.date
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {appointmentState?.errors?.date && (
                          <p className="text-red-500 text-sm">
                            {appointmentState.errors.date[0]}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="startTime">Start Time</Label>
                        <Select name="startTime">
                          <SelectTrigger
                            className={
                              appointmentState?.errors?.startTime
                                ? "border-red-500"
                                : ""
                            }
                          >
                            <SelectValue placeholder="Select a start time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => i).map(
                              (hour) => (
                                <SelectItem
                                  key={hour}
                                  value={`${hour
                                    .toString()
                                    .padStart(2, "0")}:00`}
                                >
                                  {`${hour.toString().padStart(2, "0")}:00`}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        {appointmentState?.errors?.startTime && (
                          <p className="text-red-500 text-sm">
                            {appointmentState.errors.startTime[0]}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="endTime">End Time</Label>
                        <Select name="endTime">
                          <SelectTrigger
                            className={
                              appointmentState?.errors?.endTime
                                ? "border-red-500"
                                : ""
                            }
                          >
                            <SelectValue placeholder="Select an End time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => i).map(
                              (hour) => (
                                <SelectItem
                                  key={hour}
                                  value={`${hour
                                    .toString()
                                    .padStart(2, "0")}:00`}
                                >
                                  {`${hour.toString().padStart(2, "0")}:00`}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        {appointmentState?.errors?.endTime && (
                          <p className="text-red-500 text-sm">
                            {appointmentState.errors.endTime[0]}
                          </p>
                        )}
                      </div>
                      <DialogFooter className="mt-5">
                        <SaveButton
                          text="Schedule Appointment"
                          loadingText="Scheduling"
                        />
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="flex justify-end pr-8">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                {patient.patientAppointment ? (
                  <TableBody>
                    {patient.patientAppointment
                      .reverse()
                      .map((appointment: any) => (
                        <TableRow key={appointment._id}>
                          <TableCell>{appointment.appointmentType}</TableCell>

                          <TableCell>
                            {formatDate(appointment.date, "DD-MM-YYYY")}
                          </TableCell>
                          <TableCell>
                            {new Date(appointment.startTime).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                            -
                            {new Date(appointment.endTime).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </TableCell>
                          <TableCell>{appointment.duration} min</TableCell>
                          <TableCell className="flex justify-end">
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-white ${
                                statusColors[
                                  appointment.status as keyof typeof statusColors
                                ] || "bg-gray-500"
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                ) : (
                  <p>No appointments</p>
                )}
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              {" "}
              <CardTitle className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                  Patient Documents (
                  {patient.patientDocument[0]?.images.length || 0})
                </p>
                <div className="flex justify-end items-center">
                  <Link href={`${patient._id}/documents/upload`}>
                    <Button variant={"outline"} className="text-sm">
                      Upload
                    </Button>
                  </Link>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentList patient={patient} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Profile patient={patient} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default GetPatientById;
