// "use client";

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2YxNDkzYTc3MGZkZGVkOTE5N2U4YiIsImlhdCI6MTcyNTY2NzM2MCwiZXhwIjoxNzMzNDQzMzYwfQ.LGXZbMDVlDjXB9umbmA9VERNj-x6BJIfbQsa1g5VaRE'


// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   BarChart,
//   Bell,
//   Calendar,
//   FileText,
//   Home,
//   MessageSquare,
//   Search,
//   Settings,
//   Users,
// } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Pie, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
// } from "chart.js";
// import { baseUrl } from "@/lib/utils";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title
// );

// interface Datar {
//   pieChartData: any;
//   chartData: any;
//   appointmentForToday: Array<any>;
//   totalPatient: number;
//   newPatient: number;
//   status: string;
// }



// export default function DashboardOverview() {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [theData, setData] = useState<any>(null);

//   const pieChartData = {
//     labels: ["Flu", "Allergies", "Headache", "Others"],
//     datasets: [
//       {
//         data: [30, 25, 20, 25],
//         backgroundColor: ["#8b5cf6", "#10b981", "#3b82f6", "#f59e0b"],
//       },
//     ],
//   };

//   const barChartData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Men",
//         data: [65, 59, 80, 81, 56, 55],
//         backgroundColor: "#8b5cf6",
//       },
//       {
//         label: "Women",
//         data: [28, 48, 40, 19, 86, 27],
//         backgroundColor: "#10b981",
//       },
//     ],
//   };

//   const barChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top" as const,
//       },
//       title: {
//         display: true,
//         text: "Patients by Gender",
//       },
//     },
//   };

//   const fetchDashboardData = async () => {
//     try {
//       const response = await fetch(`${baseUrl}/dashboard`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         method: "GET",
//       });
//       console.log(response.json())
//       const data = await response.json();
//       setData(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     console.log('about to fetch!')
//     fetchDashboardData();
//   }, [])

//   return (
//     <main className="flex-1 p-8 overflow-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-bold">Overview</h2>
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <Input className="pl-8" placeholder="Search..." />
//           </div>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button variant="ghost" className="relative">
//                 <Bell />
//                 <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-2">
//                   3
//                 </Badge>
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-80">
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="font-semibold text-red-500">
//                     Patients status
//                   </h4>
//                   <p className="text-sm text-gray-500">
//                     Rosa Charles status has changed to outpatient
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-red-500">
//                     A new case of allergy
//                   </h4>
//                   <p className="text-sm text-gray-500">
//                     Alexander Wells has a new allergy
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-red-500">Meeting today</h4>
//                   <p className="text-sm text-gray-500">In a big hall</p>
//                 </div>
//               </div>
//             </PopoverContent>
//           </Popover>
//           <Avatar>
//             <AvatarImage src="/placeholder.svg" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//       </div>

//       {/* Overview Cards */}
//       <div className="grid grid-cols-3 gap-6 mb-8">
//         <Card className="bg-purple-500 text-white">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">New patients</CardTitle>
//             <Users className="h-4 w-4 opacity-70" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-4xl font-bold">15</div>
//           </CardContent>
//         </Card>
//         <Card className="bg-emerald-400 text-white">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total patients
//             </CardTitle>
//             <Users className="h-4 w-4 opacity-70" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-4xl font-bold">47</div>
//           </CardContent>
//         </Card>
//         <Card className="bg-emerald-400 text-white">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Rooms</CardTitle>
//             <Home className="h-4 w-4 opacity-70" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-4xl font-bold">76</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Today's Appointments and Pie Chart */}
//       <div className="grid grid-cols-2 gap-8 mb-8">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-xl font-semibold flex items-center">
//               <Calendar className="mr-2 h-5 w-5" />
//               {"Today's Appointments"} (15)
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Reason for visit</TableHead>
//                   <TableHead>Diagnosis</TableHead>
//                   <TableHead>Time</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 <TableRow>
//                   <TableCell className="font-medium">
//                     <div className="flex items-center">
//                       <Avatar className="h-8 w-8 mr-2">
//                         <AvatarImage src="/placeholder.svg" />
//                         <AvatarFallback>RC</AvatarFallback>
//                       </Avatar>
//                       Rosa Charles
//                     </div>
//                   </TableCell>
//                   <TableCell>Consultation</TableCell>
//                   <TableCell>Headache</TableCell>
//                   <TableCell>9:00 AM</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell className="font-medium">
//                     <div className="flex items-center">
//                       <Avatar className="h-8 w-8 mr-2">
//                         <AvatarImage src="/placeholder.svg" />
//                         <AvatarFallback>KW</AvatarFallback>
//                       </Avatar>
//                       Keenan Waller
//                     </div>
//                   </TableCell>
//                   <TableCell>Re visit</TableCell>
//                   <TableCell>Food Allergy</TableCell>
//                   <TableCell>10:30 AM</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell className="font-medium">
//                     <div className="flex items-center">
//                       <Avatar className="h-8 w-8 mr-2">
//                         <AvatarImage src="/placeholder.svg" />
//                         <AvatarFallback>AW</AvatarFallback>
//                       </Avatar>
//                       Alexander Wells
//                     </div>
//                   </TableCell>
//                   <TableCell>Scheduled visit</TableCell>
//                   <TableCell>Hypertension</TableCell>
//                   <TableCell>11:50 AM</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-xl font-semibold">
//               Recent Illnesses
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px] flex items-center justify-center">
//               <Pie data={theData?.pieChartData} />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Patients List and Bar Chart */}
//       <div className="grid grid-cols-2 gap-8">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-xl font-semibold flex items-center">
//               <Users className="mr-2 h-5 w-5" />
//               Patients list (120)
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Diagnosis</TableHead>
//                   <TableHead>Blood type</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 <TableRow>
//                   <TableCell className="font-medium">
//                     <div className="flex items-center">
//                       <Avatar className="h-8 w-8 mr-2">
//                         <AvatarImage src="/placeholder.svg" />
//                         <AvatarFallback>RC</AvatarFallback>
//                       </Avatar>
//                       Rosa Charles
//                     </div>
//                   </TableCell>
//                   <TableCell>Headache</TableCell>
//                   <TableCell>AB-</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell className="font-medium">
//                     <div className="flex items-center">
//                       <Avatar className="h-8 w-8 mr-2">
//                         <AvatarImage src="/placeholder.svg" />
//                         <AvatarFallback>AW</AvatarFallback>
//                       </Avatar>
//                       Alexander Wells
//                     </div>
//                   </TableCell>
//                   <TableCell>Food Allergy</TableCell>
//                   <TableCell>AB+</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell className="font-medium">
//                     <div className="flex items-center">
//                       <Avatar className="h-8 w-8 mr-2">
//                         <AvatarImage src="/placeholder.svg" />
//                         <AvatarFallback>KW</AvatarFallback>
//                       </Avatar>
//                       Keenan Waller
//                     </div>
//                   </TableCell>
//                   <TableCell>Hypertension</TableCell>
//                   <TableCell>B-</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-xl font-semibold">
//               Patients by Gender
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px]">
//               <Bar options={barChartOptions} data={theData?.chartData} />
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";
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
  MessageSquare,
  Search,
  Settings,
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
import { baseUrl } from "@/lib/utils";
import withAuth from "../protected";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const DashboardOverview = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [theData, setData] = useState<any>(null);

  const pieChartData = {
    labels: ["Flu", "Allergies", "Headache", "Others"],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: ["#8b5cf6", "#10b981", "#3b82f6", "#f59e0b"],
      },
    ],
  };

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Men",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "#8b5cf6",
      },
      {
        label: "Women",
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: "#10b981",
      },
    ],
  };

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


  // UseEffect should run only once on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        let token = null;
        if (typeof window !== "undefined") {
          // We are on the client, so localStorage is available
          token = localStorage.getItem("token");
        }
        const response = await fetch(`${baseUrl}/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });
        const data = await response.json();
        // setData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData()
  }, []); // Add empty dependency array to avoid repeated calls

  return (
    <main className="flex-1 p-8 overflow-auto">
      {/* {theData.status} */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Overview</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input className="pl-8" placeholder="Search..." />
          </div>
          <Popover>
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
          </Popover>
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card className="bg-purple-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New patients</CardTitle>
            <Users className="h-4 w-4 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">15</div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-400 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total patients
            </CardTitle>
            <Users className="h-4 w-4 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">47</div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-400 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rooms</CardTitle>
            <Home className="h-4 w-4 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">76</div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Appointments and Pie Chart */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              {"Today's Appointments"} (15)
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
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>RC</AvatarFallback>
                      </Avatar>
                      Rosa Charles
                    </div>
                  </TableCell>
                  <TableCell>Consultation</TableCell>
                  <TableCell>Headache</TableCell>
                  <TableCell>9:00 AM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>AW</AvatarFallback>
                      </Avatar>
                      Alexander Wells
                    </div>
                  </TableCell>
                  <TableCell>Checkup</TableCell>
                  <TableCell>Allergies</TableCell>
                  <TableCell>9:30 AM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>MP</AvatarFallback>
                      </Avatar>
                      Mary Poppins
                    </div>
                  </TableCell>
                  <TableCell>Follow-up</TableCell>
                  <TableCell>Flu</TableCell>
                  <TableCell>10:00 AM</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pie chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Appointments by Diagnosis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Pie data={pieChartData} />
          </CardContent>
        </Card>
      </div>

      {/* Patients by Gender */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <BarChart className="mr-2 h-5 w-5" />
            Patients by Gender
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Bar options={barChartOptions} data={barChartData} />
        </CardContent>
      </Card>
    </main>
  );
}


export default withAuth(DashboardOverview)