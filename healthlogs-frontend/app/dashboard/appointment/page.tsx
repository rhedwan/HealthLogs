
'use client';

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
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
  // Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Modal, Button, DatePicker, TimePicker, Select } from "antd";
import moment from "moment";
import { baseUrl } from "@/lib/utils";
import withAuth from "@/app/protected";

const { Option } = Select;

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


const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appointmentType, setAppointmentType] = useState("");
  const [duration, setDuration] = useState(60); // default to 60 minutes
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("Active");
  const [patientId, setPatientId] = useState("");

  const apiBaseUrl = baseUrl
  // const token = localStorage.getItem("token");

  const fetchAppointments = async () => {
    try {
      let token = null;
      if (typeof window !== "undefined") {
        // We are on the client, so localStorage is available
        token = localStorage.getItem("token");
      }
      const response = await fetch(`${apiBaseUrl}/dashboard/appointments`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      // console.log(response.json())
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  });

  const handleCreateAppointment = async () => {
    const selectedDate = moment(date, "YYYY-MM-DD"); // Ensure the date is parsed correctly
    const startDateTime = selectedDate.clone().set({
      hour: parseInt(startTime.split(":")[0], 10),
      minute: parseInt(startTime.split(":")[1], 10),
    });
    const endDateTime = selectedDate.clone().set({
      hour: parseInt(endTime.split(":")[0], 10),
      minute: parseInt(endTime.split(":")[1], 10),
    });

    const requestBody = {
      appointmentType,
      duration,
      date: selectedDate.toISOString(),
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      status,
    };

    console.log(requestBody);

    try {
      let token = null;
      if (typeof window !== "undefined") {
        // We are on the client, so localStorage is available
        token = localStorage.getItem("token");
      }
      const response = await fetch(`${apiBaseUrl}/appointment/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setIsModalVisible(false); // Close modal
        fetchAppointments(); // Fetch updated appointments
      } else {
        console.log("Failed to create appointment");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };


  // const handleCreateAppointment = async () => {
  //   const requestBody = {
  //     appointmentType,
  //     duration,
  //     date,
  //     startTime,
  //     endTime,
  //     status,
  //   };

  //   console.log(requestBody)

  //   try {
  //     const response = await fetch(`${apiBaseUrl}/appointment`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(requestBody),
  //       method: "POST",
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Appointment created successfully:", data);
  //       setIsModalVisible(false); // Close modal
  //       fetchAppointments(); // Fetch updated appointments
  //     } else {
  //       console.log("Failed to create appointment");
  //     }
  //   } catch (error) {
  //     console.error("Error creating appointment:", error);
  //   }
  // };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Filtering logic based on search term and selected type
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesType = selectedType
      ? appointment.appointmentType === selectedType
      : true;
    const matchesSearch = searchTerm
      ? appointment.patient.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesType && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Appointments</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Appointments Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredAppointments.length}</div>
            </CardContent>
          </Card>

          {/* Active Appointments Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Appointments</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredAppointments.filter((a) => a.status === "Active").length}
              </div>
            </CardContent>
          </Card>

          {/* Completed Appointments Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Appointments</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredAppointments.filter((a) => a.status === "Completed").length}
              </div>
            </CardContent>
          </Card>

          {/* Next Appointment Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date(filteredAppointments[0]?.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />

                {/* Select Filter */}
                <Select
                  onChange={(value: any) => setSelectedType(value)}
                  value={selectedType}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Add Appointment Button */}
              <Button type="primary" onClick={showModal}>
                Add Appointment
              </Button>

              {/* Modal for adding appointment */}

              <Modal
                title="Add Appointment"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleCreateAppointment}
                okText="Create Appointment"
              >
                <div className="space-y-4">
                  {/* Duration */}
                  <Input
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    placeholder="Enter Patient Id"
                  />
                  {/* Appointment Type */}
                  <Select
                    value={appointmentType}
                    onChange={(value) => setAppointmentType(value)}
                    placeholder="Select Appointment Type"
                    className="w-full"
                  >
                    {appointmentTypes.map((type) => (
                      <Option key={type} value={type}>
                        {type}
                      </Option>
                    ))}
                  </Select>

                  {/* Date */}
                  <DatePicker
                    className="w-full"
                    placeholder="Select Appointment Date"
                    onChange={(date, dateString) => setDate(dateString.toString())}
                  />

                  {/* Start Time */}
                  <TimePicker
                    className="w-full"
                    placeholder="Select Start Time"
                    onChange={(time, timeString) => setStartTime(timeString.toString())}
                    format="HH:mm"
                  />

                  {/* End Time */}
                  <TimePicker
                    className="w-full"
                    placeholder="Select End Time"
                    onChange={(time, timeString) => setEndTime(timeString.toString())}
                    format="HH:mm"
                  />

                  {/* Duration */}
                  <Input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    placeholder="Duration (minutes)"
                  />
                </div>
              </Modal>

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
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment._id}>
                    <TableCell>{appointment.patient.firstName + ' ' + appointment.patient.lastName}</TableCell>
                    <TableCell>{appointment.patient.fileId}</TableCell>
                    <TableCell>{moment(appointment.date).format("DD MMM YYYY")}</TableCell>
                    <TableCell>{
                      new Date(appointment.startTime)
                        .toLocaleTimeString([], {
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
                        className={`inline-block rounded-full px-3 py-1 text-white ${statusColors[appointment.status as keyof typeof statusColors] || "bg-gray-500"
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
}


export default withAuth(AppointmentPage)