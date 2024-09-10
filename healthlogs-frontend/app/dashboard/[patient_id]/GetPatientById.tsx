"use client";

import React from "react";
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
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Line } from "react-chartjs-2";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { formatDate } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { State, createAppointment } from "@/app/actions/appointment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GetPatientById = ({ patient }: any) => {
  const visitHistory = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 1],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const appointmentTypes = [
    "Follow-Up Visit",
    "New Patient Visit",
    "Nursing Only",
    "Urgent Visit",
    "Video Visit",
    "Wellness Exam",
  ];
  const initialState: State = { message: "", errors: {} };
  // @ts-ignore
  const [state, formAction] = useFormState(createAppointment, initialState);
  const { pending } = useFormStatus();
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

      <div className="grid grid-cols-3 gap-4 mb-8">
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
      </div>
      <Card className="mb-7">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">
              Patient Records
            </CardTitle>
            <Link href={`/dashboard/create/record/${patient._id}`}>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add New Record
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {/* <div className="space-y-4">
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
          </div> */}
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            History for 2023
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line data={visitHistory} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Appointments ({patient.patientAppointment.length})
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
                    <TableRow>
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
            <CardTitle className="text-lg font-semibold">
              Last visits (5)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Consultation</TableCell>
                  <TableCell className="text-right">Nov 17, 2022</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Re visit</TableCell>
                  <TableCell className="text-right">Feb 21, 2022</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Scheduled visit</TableCell>
                  <TableCell className="text-right">Aug 3, 2022</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Scheduled visit</TableCell>
                  <TableCell className="text-right">Nov 17, 2021</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Consultation</TableCell>
                  <TableCell className="text-right">Feb 21, 2021</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Consultation</TableCell>
                  <TableCell className="text-right">Aug 3, 2021</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Examinations (9)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Temperature measurement</TableCell>
                  <TableCell className="text-right">Nov 17, 2022</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Electrocardiography</TableCell>
                  <TableCell className="text-right">Nov 17, 2022</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Genetic testing</TableCell>
                  <TableCell className="text-right">Nov 17, 2022</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Urinalysis</TableCell>
                  <TableCell className="text-right">Nov 17, 2022</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Laparoscopy</TableCell>
                  <TableCell className="text-right">Nov 17, 2022</TableCell>
                </TableRow>
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

      <div className="flex justify-end space-x-2 mt-6">
        {/* <Link href={`/dashboard/create/appointment/${patient._id}`}>
          <Button>Create Appointment</Button>
        </Link> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Appointment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Appointment</DialogTitle>
            </DialogHeader>
            <form action={formAction}>
              <div className="space-y-2 hidden">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  name="patientId"
                  value={patient.id}
                  placeholder="Enter Patient ID"
                  className={state?.errors?.patientId ? "border-red-500" : ""}
                />
                {state?.errors?.patientId && (
                  <p className="text-red-500 text-sm">
                    {state.errors.patientId[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointmentType">Appointment Type</Label>
                <Select name="appointmentType">
                  <SelectTrigger
                    className={
                      state?.errors?.appointmentType ? "border-red-500" : ""
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
                {state?.errors?.appointmentType && (
                  <p className="text-red-500 text-sm">
                    {state.errors.appointmentType[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  name="date"
                  className={state?.errors?.date ? "border-red-500" : ""}
                />
                {state?.errors?.date && (
                  <p className="text-red-500 text-sm">{state.errors.date[0]}</p>
                )}
              </div>
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Select name="startTime">
                  <SelectTrigger
                    className={state?.errors?.startTime ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select a start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem
                        key={hour}
                        value={`${hour.toString().padStart(2, "0")}:00`}
                      >
                        {`${hour.toString().padStart(2, "0")}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state?.errors?.startTime && (
                  <p className="text-red-500 text-sm">
                    {state.errors.startTime[0]}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Select name="endTime">
                  <SelectTrigger
                    className={state?.errors?.endTime ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select an End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem
                        key={hour}
                        value={`${hour.toString().padStart(2, "0")}:00`}
                      >
                        {`${hour.toString().padStart(2, "0")}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state?.errors?.endTime && (
                  <p className="text-red-500 text-sm">
                    {state.errors.endTime[0]}
                  </p>
                )}
              </div>
              <DialogFooter className="mt-5">
                <Button type="submit">Schedule Appointment</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

export default GetPatientById;
