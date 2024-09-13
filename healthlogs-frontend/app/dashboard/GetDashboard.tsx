"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bell,
  Calendar,
  FileText,
  Home,
  LogOutIcon,
  Search,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { extractTimeFromDate } from "@/lib/utils";
import { exportToCSV } from "@/lib/exportCsv";
import { logout } from "../actions/auth";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const GetDashboard = ({ data, userData }: any) => {
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Patients by Gender",
      },
    },
  };
  return (
    <main className="flex-1 p-8 overflow-auto">
      {/* {theData.status} */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Overview</h2>
        <div className="flex items-center space-x-4">
          {/* <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input className="pl-8" placeholder="Search..." />
          </div> */}
          {/* <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="relative">
                <Bell />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-2">
                  3
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-500">
                    Patients status
                  </h4>
                  <p className="text-sm text-gray-500">
                    Rosa Charles status has changed to outpatient
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-500">
                    A new case of allergy
                  </h4>
                  <p className="text-sm text-gray-500">
                    Alexander Wells has a new allergy
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-500">Meeting today</h4>
                  <p className="text-sm text-gray-500">In a big hall</p>
                </div>
              </div>
            </PopoverContent>
          </Popover> */}

          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={userData.photo} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-40 flex justify-center mr-8">
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <LogOutIcon className="size-5" />
                      <p>Log Out</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <p className="text-center font-bold text-xl">Log Out?</p>
                    <div className="flex space-x-20 mt-7 justify-center items-center w-full">
                      <DialogClose>
                        <Button
                          className="flex items-center space-x-2 bg-red-500 text-white hover:bg-red-500 active:scale-50"
                          // onClick={() => logout()}
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        className="flex items-center space-x-2 active:scale-50"
                        onClick={() => logout()}
                      >
                        confirm
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-500">
          <Card className="bg-purple-500 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                New patients
              </CardTitle>
              <Users className="h-4 w-4 opacity-70" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{data.newPatient}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-emerald-400 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total patients
            </CardTitle>
            <Users className="h-4 w-4 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{data.totalPatient}</div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-400 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Doctor To Patient Ratio
            </CardTitle>
            <Home className="h-4 w-4 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {data.doctorToPatientRatio}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Appointments and Pie Chart */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              {"Today's Appointments"} {data?.appointmentForToday.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Reason for visit</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.appointmentForToday.map((appointment: any) => (
                  <TableRow key={appointment._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>RC</AvatarFallback>
                        </Avatar>
                        {appointment.patient.firstName +
                          " " +
                          appointment.patient.lastName}
                      </div>
                    </TableCell>
                    <TableCell>{appointment.appointmentType}</TableCell>
                    <TableCell>{"Diagnosis"}</TableCell>
                    <TableCell>
                      {extractTimeFromDate(appointment.startTime)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pie chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center justify-between">
              <div className="text-xl font-semibold flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Appointments by Diagnosis
              </div>
              <Button
                className="bg-purple-500 hover:bg-purple-700"
                onClick={() =>
                  exportToCSV(data.pieChartData, "Appointments by Diagnosis")
                }
              >
                Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Pie data={data.pieChartData} />
          </CardContent>
        </Card>
      </div>

      {/* Patients by Gender */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center justify-between">
            <div className="text-xl font-semibold flex items-center">
              <BarChart className="mr-2 h-5 w-5" />
              Patients by Gender
            </div>
            <Button
              className="bg-purple-500 hover:bg-purple-700"
              onClick={() => exportToCSV(data.chartData, "Patients by Gender")}
            >
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Bar options={barChartOptions} data={data.chartData} />
        </CardContent>
      </Card>
    </main>
  );
};

export default GetDashboard;
