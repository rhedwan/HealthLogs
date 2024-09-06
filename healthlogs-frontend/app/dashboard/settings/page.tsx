import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Calendar,
  FileText,
  Home,
  MessageSquare,
  Search,
  Settings,
  Users,
} from "lucide-react";
import SideBar from "../SideBar";

export default function SettingsPage() {
  return (

      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Settings</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input className="pl-8" placeholder="Search..." />
            </div>
            <Button variant="ghost" className="relative">
              <Bell />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Edit profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button variant="outline">Upload picture</Button>
              </div>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" />
                </div>
                <div>
                  <Label htmlFor="phoneNo">Phone No</Label>
                  <Input id="phoneNo" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" />
                </div>
                <Button className="w-full">Save Changes</Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Change password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">New password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="w-full">Change password</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="newPatient">New patient</Label>
                    <Switch id="newPatient" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="events">Events</Label>
                    <Switch id="events" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="scheduleChanges">Schedule changes</Label>
                    <Switch id="scheduleChanges" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="researchResults">Research results</Label>
                    <Switch id="researchResults" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
  );
}
