"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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
import {
  Calendar,
  CalendarDays,
  FileText,
  Heart,
  Home,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { PatientSchema } from "@/app/dashboard/all-patient/page";
import { closeModalAndToast, formatDate, formatDateChart } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { State, createAppointment } from "@/app/actions/appointment";
import { PatientRecord } from "@/schema/PatientRecord";
import { PatientAllergy } from "@/schema/PatientAllergy";
import { PatientFamilyHistory } from "@/schema/PatientFamilyHistory";
import { exportToCSV, exportToCSVRecharts } from "@/lib/exportCsv";
import { Textarea } from "@/components/ui/textarea";
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
    <main className="flex-1 p-8 overflow-auto">
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
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card className="bg-purple-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blood pressure
            </CardTitle>
            <Heart className="h-4 w-4 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120/80</div>
            <p className="text-xs opacity-70">mm Hg</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-400 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blood type</CardTitle>
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
            <CardTitle className="text-sm font-medium">Diagnoses</CardTitle>
            <FileText className="h-4 w-4 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-400 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Visits in 2023
            </CardTitle>
            <Calendar className="h-4 w-4 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
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
      <Card className="mb-7">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">
              Patient Records
            </CardTitle>
            <Link href={`/dashboard/create/record/${patient._id}`}>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add New Encounter
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patient.patientRecord.map((record: PatientRecord) => (
              <Link
                href={`/dashboard/${patient.id}/view-record`}
                key={record._id}
              >
                <Card>
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
                      {record.diagnosis.description}
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Temperature:</span>{" "}
                        {record.physicalExamination.temperature}
                      </div>
                      <div>
                        <span className="font-medium">Blood Pressure:</span>{" "}
                        {
                          record.physicalExamination.bloodPressure
                            .systolicPressure
                        }
                        /
                        {
                          record.physicalExamination.bloodPressure
                            .diastolicPressure
                        }
                      </div>
                      <div>
                        <span className="font-medium">Weight:</span>{" "}
                        {record.physicalExamination.weight} kg
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-8">
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
                      <Label htmlFor="appointmentType">Appointment Type</Label>
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
                          appointmentState?.errors?.date ? "border-red-500" : ""
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
                                value={`${hour.toString().padStart(2, "0")}:00`}
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
                                value={`${hour.toString().padStart(2, "0")}:00`}
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
                      <Button type="submit">
                        {pending ? "Scheduling..." : " Schedule Appointment"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {patient.patientAppointment.map(
                  (appointment: {
                    _id: string;
                    patient: string;
                    appointmentType: string;
                    duration: number;
                    date: string;
                    startTime: string;
                    endTime: string;
                    status: string;
                    createdAt: string;
                    updatedAt: string;
                  }) => (
                    <TableRow key={appointment._id}>
                      <TableCell>{appointment.appointmentType}</TableCell>
                      <TableCell className="text-right">
                        {formatDate(appointment.startTime, "MMM DD, YYYY")}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <p className="text-lg font-semibold">
                Allegies ({patient.patientAllergy.length})
              </p>
              <Dialog
                open={openAllergy}
                onOpenChange={(newOpen) => {
                  setOpenAllergy(newOpen);
                  if (!newOpen) {
                    // Reset the state when closing the dialog
                    // formActionAllergy(new FormData());
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button>New Allergy</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Allergy</DialogTitle>
                  </DialogHeader>
                  <form action={formActionAllergy}>
                    <div className="space-y-2">
                      <Label htmlFor="allergen">Allergen</Label>
                      <Select name="allergen">
                        <SelectTrigger
                          className={
                            allergyState?.errors?.allergen
                              ? "border-red-500"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Select Allergen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"Food"}>Food</SelectItem>
                          <SelectItem value={"Drug"}>Drug</SelectItem>
                          <SelectItem value={"Environment"}>
                            Environment
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {allergyState?.errors?.allergen && (
                        <p className="text-red-500 text-sm">
                          {allergyState.errors.allergen[0]}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="severity">Severity</Label>
                      <Select name="severity">
                        <SelectTrigger
                          className={
                            allergyState?.errors?.severity
                              ? "border-red-500"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Select Severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"Very Mild"}>Very Mild</SelectItem>
                          <SelectItem value={"Mild"}>Mild</SelectItem>
                          <SelectItem value={"Moderate"}>Moderate</SelectItem>
                          <SelectItem value={"Severe"}>Severe</SelectItem>
                        </SelectContent>
                      </Select>
                      {allergyState?.errors?.severity && (
                        <p className="text-red-500 text-sm">
                          {allergyState.errors.severity[0]}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reaction">Reaction</Label>
                      <Input
                        id="reaction"
                        type="text"
                        name="reaction"
                        className={
                          allergyState?.errors?.reaction ? "border-red-500" : ""
                        }
                      />
                      {allergyState?.errors?.reaction && (
                        <p className="text-red-500 text-sm">
                          {allergyState.errors.reaction[0]}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2 hidden">
                      <Label htmlFor="patientId">Patient Id</Label>
                      <Input
                        id="patientId"
                        value={patient.id}
                        type="text"
                        name="patientId"
                        className={
                          allergyState?.errors?.patientId
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {allergyState?.errors?.patientId && (
                        <p className="text-red-500 text-sm">
                          {allergyState.errors.patientId[0]}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comment">Comment</Label>
                      <Textarea
                        id="comment"
                        name="comment"
                        className={
                          allergyState?.errors?.comment ? "border-red-500" : ""
                        }
                      />
                      {allergyState?.errors?.comment && (
                        <p className="text-red-500 text-sm">
                          {allergyState.errors.comment[0]}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="onset">Onset</Label>
                      <Select name="onset">
                        <SelectTrigger
                          className={
                            allergyState?.errors?.onset ? "border-red-500" : ""
                          }
                        >
                          <SelectValue placeholder="Select an onset" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Childhood">Childhood</SelectItem>
                          <SelectItem value="Adulthood">Adulthood</SelectItem>
                        </SelectContent>
                      </Select>
                      {allergyState?.errors?.onset && (
                        <p className="text-red-500 text-sm">
                          {allergyState.errors.onset[0]}
                        </p>
                      )}
                    </div>

                    <DialogFooter className="mt-5">
                      <Button type="submit">
                        {pending ? "Adding..." : "Add Allergy"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardTitle>
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
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card>
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
                      <div className="flex items-center mt-2">
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
        <Card>
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
        </Card>
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
    </main>
  );
};

export default GetPatientById;
