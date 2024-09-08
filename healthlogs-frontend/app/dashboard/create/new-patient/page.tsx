"use client";

import React, { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { State, createPatient } from "@/actions/createPatient";
import { useFormState } from "react-dom";
const CreateNewPatient = () => {
  const initialState: State = { message: "", errors: {} };
  // @ts-ignore
  const [state, formAction] = useFormState(createPatient, initialState);
  return (
    <main className="flex-1 p-8 overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" action={formAction}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  required
                  className={state.errors?.firstName ? "border-red-500" : ""}
                />
                {state.errors?.firstName && (
                  <p className="text-red-500 text-sm">
                    {state.errors.firstName[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  required
                  className={state.errors?.lastName ? "border-red-500" : ""}
                />
                {state.errors?.lastName && (
                  <p className="text-red-500 text-sm">
                    {state.errors.lastName[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  required
                  className={state.errors?.email ? "border-red-500" : ""}
                />
                {state.errors?.email && (
                  <p className="text-red-500 text-sm">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="number"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  className={state.errors?.phoneNumber ? "border-red-500" : ""}
                />
                {state.errors?.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {state.errors.phoneNumber[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  className={state.errors?.dateOfBirth ? "border-red-500" : ""}
                />
                {state.errors?.dateOfBirth && (
                  <p className="text-red-500 text-sm">
                    {state.errors.dateOfBirth[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup defaultValue="others" name="gender">
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="Male" />
                      <Label htmlFor="Male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="Female" />
                      <Label htmlFor="Female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Others" id="Others" />
                      <Label htmlFor="Others">Others</Label>
                    </div>
                  </div>
                </RadioGroup>
                {state.errors?.gender && (
                  <p className="text-red-500 text-sm">
                    {state.errors.gender[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  placeholder="Enter occupation"
                  className={state.errors?.occupation ? "border-red-500" : ""}
                />
                {state.errors?.occupation && (
                  <p className="text-red-500 text-sm">
                    {state.errors.occupation[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="homeAddress">Home Address</Label>
                <Textarea
                  id="homeAddress"
                  name="homeAddress"
                  placeholder="Enter home address"
                  className={state.errors?.homeAddress ? "border-red-500" : ""}
                />
                {state.errors?.homeAddress && (
                  <p className="text-red-500 text-sm">
                    {state.errors.homeAddress[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="religion">Religion</Label>
                <Select name="religion">
                  <SelectTrigger
                    className={state.errors?.religion ? "border-red-500" : ""}
                  >
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
                {state.errors?.religion && (
                  <p className="text-red-500 text-sm">
                    {state.errors.religion[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ethnic">Ethnic Group</Label>
                <Select name="ethnic">
                  <SelectTrigger
                    className={state.errors?.ethnic ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select ethnic group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yoruba">Yoruba</SelectItem>
                    <SelectItem value="Igbo">Igbo</SelectItem>
                    <SelectItem value="Hausa">Hausa</SelectItem>
                  </SelectContent>
                </Select>
                {state.errors?.ethnic && (
                  <p className="text-red-500 text-sm">
                    {state.errors.ethnic[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select name="maritalStatus">
                  <SelectTrigger
                    className={
                      state.errors?.maritalStatus ? "border-red-500" : ""
                    }
                  >
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                  </SelectContent>
                </Select>
                {state.errors?.maritalStatus && (
                  <p className="text-red-500 text-sm">
                    {state.errors.maritalStatus[0]}
                  </p>
                )}
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="preferredLanguage">Preferred Language</Label>
                <Input
                  id="preferredLanguage"
                  placeholder="Enter preferred language"
                />
                {state.errors?.maritalStatus && (
                  <p className="text-red-500 text-sm">
                    {state.errors.maritalStatus[0]}
                  </p>
                )}
              </div> */}
            </div>

            <div className="space-y-2">
              <Label>Medical Background</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select name="bloodGroup">
                    <SelectTrigger
                      className={
                        state.errors?.medicalBackground?.bloodGroup
                          ? "border-red-500"
                          : ""
                      }
                    >
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
                  {state.errors?.medicalBackground?.bloodGroup && (
                    <p className="text-red-500 text-sm">
                      {state.errors?.medicalBackground?.bloodGroup[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genotype">Genotype</Label>
                  <Select name="genotype">
                    <SelectTrigger
                      className={
                        state.errors?.medicalBackground?.genotype
                          ? "border-red-500"
                          : ""
                      }
                    >
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
                  {state.errors?.medicalBackground?.genotype && (
                    <p className="text-red-500 text-sm">
                      {state.errors?.medicalBackground?.genotype[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Confirm Password</Label>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Profile Photo</Label>
              <Input id="photo" type="file" accept="image/*" />
            </div> */}

            <Button type="submit" className="w-full">
              Register Patient
            </Button>
            {state.message && (
              <p
                className={`text-center ${
                  state.errors ? "text-red-500" : "text-green-500"
                }`}
              >
                {state.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default CreateNewPatient;
