"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileHeart, Calendar } from "lucide-react";
import Link from "next/link";

export default function CreatePatientPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    occupation: "",
    homeAddress: "",
    religion: "",
    ethnic: "",
    maritalStatus: "",
    bloodGroup: "",
    genotype: "",
    email: "",
    phoneNumber: "",
    photo: "",
    password: "",
    passwordConfirm: "",
    dateOfBirth: "",
    role: "patient",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <FileHeart className="h-12 w-12 text-[#7457D3]" />
            <span className="text-4xl font-bold text-gray-800">HealthLogs</span>
          </Link>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">Create Patient Profile</CardTitle>
            <CardDescription className="text-xl">
              Enter the patient details to create a new profile.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-lg">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="text-lg py-3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-lg">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="text-lg py-3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-lg">
                      Gender
                    </Label>
                    <Select
                      name="gender"
                      onValueChange={handleSelectChange("gender")}
                    >
                      <SelectTrigger className="text-lg py-3">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-lg">
                      Date of Birth
                    </Label>
                    <div className="relative">
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="text-lg py-3"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="text-lg py-3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-lg">
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="text-lg py-3"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="homeAddress" className="text-lg">
                      Home Address
                    </Label>
                    <Textarea
                      id="homeAddress"
                      name="homeAddress"
                      value={formData.homeAddress}
                      onChange={handleInputChange}
                      className="text-lg py-3"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="occupation" className="text-lg">
                      Occupation
                    </Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="text-lg py-3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="religion" className="text-lg">
                      Religion
                    </Label>
                    <Select
                      name="religion"
                      onValueChange={handleSelectChange("religion")}
                    >
                      <SelectTrigger className="text-lg py-3">
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Islam">Islam</SelectItem>
                        <SelectItem value="Christian">Christian</SelectItem>
                        <SelectItem value="Traditional beliefs">
                          Traditional beliefs
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ethnic" className="text-lg">
                      Ethnic Group
                    </Label>
                    <Select
                      name="ethnic"
                      onValueChange={handleSelectChange("ethnic")}
                    >
                      <SelectTrigger className="text-lg py-3">
                        <SelectValue placeholder="Select ethnic group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yoruba">Yoruba</SelectItem>
                        <SelectItem value="Igbo">Igbo</SelectItem>
                        <SelectItem value="Hausa">Hausa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus" className="text-lg">
                      Marital Status
                    </Label>
                    <Select
                      name="maritalStatus"
                      onValueChange={handleSelectChange("maritalStatus")}
                    >
                      <SelectTrigger className="text-lg py-3">
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Medical Background */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Medical Background</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup" className="text-lg">
                      Blood Group
                    </Label>
                    <Select
                      name="bloodGroup"
                      onValueChange={handleSelectChange("bloodGroup")}
                    >
                      <SelectTrigger className="text-lg py-3">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                          (group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genotype" className="text-lg">
                      Genotype
                    </Label>
                    <Select
                      name="genotype"
                      onValueChange={handleSelectChange("genotype")}
                    >
                      <SelectTrigger className="text-lg py-3">
                        <SelectValue placeholder="Select genotype" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "AA",
                          "AS",
                          "AC",
                          "AD",
                          "AE",
                          "AO",
                          "SS",
                          "SC",
                          "SD",
                        ].map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-lg">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={8}
                      className="text-lg py-3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordConfirm" className="text-lg">
                      Confirm Password
                    </Label>
                    <Input
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      value={formData.passwordConfirm}
                      onChange={handleInputChange}
                      required
                      className="text-lg py-3"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-[#7457D3] hover:bg-[#5E45A8] text-white text-xl py-6"
              >
                Create Patient Profile
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
