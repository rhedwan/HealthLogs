"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, FileText, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { State, createAppointment } from "@/app/actions/appointment";
import { useFormState } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { closeModalAndToast, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const appointmentTypes = [
  "Follow-Up Visit",
  "New Patient Visit",
  "Nursing Only",
  "Urgent Visit",
  "Video Visit",
  "Wellness Exam",
];

const statusColors = {
  Active: "bg-green-500",
  Inactive: "bg-yellow-500",
  Completed: "bg-blue-500",
};

export interface Appointment {
  duration: string;
  appointmentType: string;
  startTime: string;
  endTime: string;
  date: string;
  status: string;
  _id: string;
  patient: Patient;
}

interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  fileId: string;
  id: string;
}

const GetAppointment = ({ data, metaData }: any) => {
  console.log("meta");
  console.log(data);
  const { toast } = useToast();

  const initialState: State = { message: "", errors: {} };
  // @ts-ignore
  const [state, formAction] = useFormState(createAppointment, initialState);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const { pending } = useFormStatus();
  const filteredAppointments = data.filter((appointment: Appointment) => {
    const matchesType =
      selectedType === "all" || appointment.appointmentType === selectedType;
    const matchesSearch = searchTerm
      ? appointment.patient.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.patient.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.patient.fileId
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : true;
    return matchesType && matchesSearch;
  });
  useEffect(() => {
    closeModalAndToast(
      state,
      formAction,
      toast,
      open,
      setOpen,
      "Success",
      "Appointment added successfully!",
      "Appointment added successfully!"
    );
  }, [state.message, open]);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Appointments</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Appointments Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Appointments
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data && data.length}</div>
            </CardContent>
          </Card>

          {/* Active Appointments Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Appointments
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metaData.activeAppointments}
              </div>
            </CardContent>
          </Card>

          {/* Completed Appointments Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Appointments
              </CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metaData.completedAppointments}
              </div>
            </CardContent>
          </Card>

          {/* Next Appointment Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Next Appointment
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date(metaData.completedAppointments).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Appointment List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div className="flex space-x-2">
                {/* Search Input */}
                <Input
                  placeholder="Search appointments"
                  className="w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Select Filter */}
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Dialog
                open={open}
                onOpenChange={(newOpen) => {
                  setOpen(newOpen);
                  if (!newOpen) {
                    // Reset the state when closing the dialog
                    // formAction(new FormData());
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button>Add Appointment</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Appointment</DialogTitle>
                  </DialogHeader>
                  <form action={formAction}>
                    <div className="space-y-2">
                      <Label htmlFor="patientId">Patient ID</Label>
                      <Input
                        id="patientId"
                        name="patientId"
                        placeholder="Enter Patient ID"
                        className={
                          state?.errors?.patientId ? "border-red-500" : ""
                        }
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
                            state?.errors?.appointmentType
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
                        <p className="text-red-500 text-sm">
                          {state.errors.date[0]}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="startTime">Start Time</Label>
                      <Select name="startTime">
                        <SelectTrigger
                          className={
                            state?.errors?.startTime ? "border-red-500" : ""
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
                          className={
                            state?.errors?.endTime ? "border-red-500" : ""
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
                      {state?.errors?.endTime && (
                        <p className="text-red-500 text-sm">
                          {state.errors.endTime[0]}
                        </p>
                      )}
                    </div>
                    <DialogFooter className="mt-5">
                      <Button type="submit">
                        {pending ? "Scheduling" : "Schedule Appointment"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Appointment Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.reverse().map((appointment: any) => (
                  <TableRow key={appointment._id}>
                    <TableCell>
                      {appointment.patient.firstName +
                        " " +
                        appointment.patient.lastName}
                    </TableCell>
                    <TableCell>{appointment.patient.fileId}</TableCell>
                    <TableCell>
                      {formatDate(appointment.date, "DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      {new Date(appointment.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      -
                      {new Date(appointment.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>{appointment.duration} min</TableCell>
                    <TableCell>{appointment.appointmentType}</TableCell>
                    <TableCell>
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
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default GetAppointment;
