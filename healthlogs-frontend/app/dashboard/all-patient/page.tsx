import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  FileText,
  Home,
  MessageSquare,
  Search,
  Settings,
  Users,
} from "lucide-react";

export default function PatientListPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-600">MedicalApp</h1>
        </div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Appointments
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-blue-600"
          >
            <Users className="mr-2 h-4 w-4" />
            Patients
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Documents
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
        <h2 className="text-2xl font-bold mb-6">12 recent patients</h2>
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Input placeholder="All providers" className="w-40" />
              <Button variant="outline">Scheduled</Button>
              <Button variant="outline" className="bg-blue-100 text-blue-700">
                Recent
              </Button>
              <Button variant="outline">Show inactive</Button>
            </div>
            <div className="flex items-center space-x-2">
              <Input placeholder="Search all patients" className="w-64" />
              <Button className="bg-orange-500 text-white hover:bg-orange-600">
                Add patient
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>FIRST</TableHead>
                <TableHead>LAST</TableHead>
                <TableHead>PRN</TableHead>
                <TableHead>DOB</TableHead>
                <TableHead>CONTACT INFO</TableHead>
                <TableHead>ACCESSED</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                      <p className="font-medium text-blue-600">
                        {patient.firstName}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-blue-600">
                    {patient.lastName}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {patient.prn}
                  </TableCell>
                  <TableCell>
                    <p>{patient.dob}</p>
                    <p className="text-sm text-gray-500">{patient.gender}</p>
                  </TableCell>
                  <TableCell>
                    <p>{patient.address}</p>
                    <p className="text-sm text-gray-500">
                      M {patient.mobilePhone} H {patient.homePhone}
                    </p>
                  </TableCell>
                  <TableCell>{patient.accessed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}

const patients = [
  {
    id: 1,
    firstName: "Eric",
    lastName: "DemoGastro",
    prn: "PRN EG629610",
    dob: "May 12, 1951",
    gender: "Male",
    address: "3278 Maple St., San Antonio, TX 78023",
    mobilePhone: "(555) 555-5555",
    homePhone: "(555) 555-5555",
    accessed: "10:02 PM, 09/04/24",
  },
  {
    id: 2,
    firstName: "Michael T",
    lastName: "DemoPrimaryCare",
    prn: "PRN MO686770",
    dob: "Jul 05, 1958",
    gender: "Male",
    address: "5432 Rebrow St, Lakeside, NY 27511",
    mobilePhone: "(555) 555-5555",
    homePhone: "(555) 555-5555",
    accessed: "4:16 PM, 09/03/24",
  },
];
