"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideBar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Overview" },
    { href: "/dashboard/appointment", icon: Calendar, label: "Appointments" },
    { href: "/dashboard/patients", icon: Users, label: "Patients" },
    // { href: "/dashboard/rooms", icon: Home, label: "Rooms" },
    // { href: "/dashboard/messages", icon: MessageSquare, label: "Messages" },
    // { href: "/dashboard/files", icon: FileText, label: "Files" },
    // {
    //   href: "/dashboard/authentications",
    //   icon: Users,
    //   label: "Authentications",
    // },
    // { href: "/dashboard/utility", icon: Settings, label: "Utility" },
  ];

  return (
    <aside className="w-64 bg-white p-6 shadow-md hidden md:block h-screen flex flex-col">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-[#7457d3]">HealthLogs</h1>
      </div>
      <nav className="space-y-6 flex-grow">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} className="block">
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className={`w-full justify-start text-lg font-medium transition-all duration-200 ease-in-out py-6 ${
                pathname === item.href
                  ? "bg-[#7457d3] text-white hover:bg-[#6346c2]"
                  : "text-gray-600 hover:text-[#7457d3] hover:bg-[#f0ebff]"
              }`}
            >
              <item.icon className="mr-3 h-6 w-6" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="pt-8 border-t border-gray-200 mt-8">
        <Link href="/dashboard/settings" className="block">
          <Button
            variant={pathname === "/dashboard/settings" ? "default" : "ghost"}
            className={`w-full justify-start text-lg font-medium transition-all duration-200 ease-in-out py-6 ${
              pathname === "/dashboard/settings"
                ? "bg-[#7457d3] text-white hover:bg-[#6346c2]"
                : "text-gray-600 hover:text-[#7457d3] hover:bg-[#f0ebff]"
            }`}
          >
            <Settings className="mr-3 h-6 w-6" />
            Settings
          </Button>
        </Link>
      </div>
    </aside>
  );
}
