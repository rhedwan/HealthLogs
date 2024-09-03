"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  Heart,
  Home,
  MessageSquare,
  Phone,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PatientDetailsPage() {
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

  const options = {
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">the Sprkl</h1>
        </div>
        <nav className="space-y-4">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Overview
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Appointments
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Patients
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Rooms
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Files
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Authentications
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Utility
          </Button>
        </nav>
        <div className="mt-auto pt-6">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src="/placeholder.svg?height=80&width=80"
                alt="Melissa Gray"
              />
              <AvatarFallback>MG</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold">Melissa Gray</h2>
              <p className="text-gray-500">
                Reason for visit: Scheduled inspection
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Age: 37yo</p>
              <p className="text-sm text-gray-500">
                Primary plan: Non deserunt
              </p>
              <p className="text-sm text-gray-500">
                Secondary plan: Minim deserunt
              </p>
            </div>
            <div className="text-right">
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" /> +1 888 888 88 88
              </p>
              <p className="text-sm text-gray-500">
                7453 Rosanna Trace Suite 526
              </p>
              <p className="text-sm text-gray-500">
                Sheldonbury, CT 61263-7571
              </p>
            </div>
          </div>
        </div>

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
              <div className="text-2xl font-bold">AB-</div>
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
                Visits in 2022
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

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              History for 2022
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Line data={visitHistory} options={options} />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Appointments (3)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Consultation</TableCell>
                    <TableCell className="text-right">Now 17, 2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Scheduled visit</TableCell>
                    <TableCell className="text-right">Feb 21, 2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Scheduled visit</TableCell>
                    <TableCell className="text-right">Aug 3, 2023</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Last visits (6)
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

        <div className="grid grid-cols-2 gap-4">
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
      </main>
    </div>
  );
}
