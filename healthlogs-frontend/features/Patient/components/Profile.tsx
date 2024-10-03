import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PatientSchema } from "@/app/dashboard/patients/page";
import { PatientRecord } from "@/schema/PatientRecord";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
const Profile = ({ patient }: { patient: any }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="mb-7">
          <CardHeader className="pb-3 pt-6 px-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">Patient</CardTitle>
            </div>
            <Separator orientation="horizontal" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="grid grid-cols-[auto_1fr]">
                <div className="grid grid-cols-2 text-sm pb-2">
                  <span>NAME:</span>
                  <span>
                    {patient.firstName} {patient.lastName}{" "}
                  </span>
                </div>
                <div className="grid grid-cols-2 text-sm pb-2">
                  <span>SEX:</span>
                  <span>{patient.gender} </span>
                </div>{" "}
                <div className="grid grid-cols-2 text-sm pb-2">
                  <span>DATE OF BIRTH:</span>
                  <span> {formatDate(patient.dateOfBirth, "MM/DD/YYYY")}</span>
                </div>
                <div className="grid grid-cols-2 text-sm">
                  <span>RELIGION:</span>
                  <span>{patient.religion}</span>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr]">
                <div className="grid grid-cols-2 text-sm">
                  <span>RECORD NUMBER:</span>
                  <span>{patient.fileId}</span>
                </div>
                <div className="grid grid-cols-2 text-sm">
                  <span>PATIENT STATUS:</span>
                  <span>{patient.staus || "Active"} </span>
                </div>{" "}
                <div className="grid grid-cols-2 text-sm">
                  <span>ETHNIC:</span>
                  <span> {patient.ethnic}</span>
                </div>
                <div className="grid grid-cols-2 text-sm">
                  <span>OCCUPATION:</span>
                  <span> {patient.occupation}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mb-7">
          <CardHeader className="pb-3 pt-6 px-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">Contact</CardTitle>
            </div>
            <Separator orientation="horizontal" />
          </CardHeader>
          <CardContent>
            <div>
              <p className="font-semibold text-base">Phone</p>
              <div className="grid grid-cols-[auto_1fr]">
                <div className="grid grid-cols-2 text-sm pb-2">
                  <span>HOME:</span>
                  <span>{patient.phoneNumber}</span>
                </div>
                <div className="grid grid-cols-2 text-sm">
                  <span>WORK:</span>
                  <span>
                    {patient.phoneNumberWork ? patient.phoneNumberWork : "None"}{" "}
                  </span>
                </div>{" "}
              </div>
            </div>
            <Separator orientation="horizontal" />

            <div>
              <p className="font-semibold text-base">Email</p>
              <div className="">
                <span>{patient.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="">
        <Card className="mb-7">
          <CardHeader className="pb-3 pt-6 px-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">Address</CardTitle>
            </div>
            <Separator orientation="horizontal" />
          </CardHeader>
          <CardContent>
            <Card className="">
              <CardHeader className="py-3 px-6">
                <CardTitle className="text-sm flex justify-between items-center">
                  <p className="text-sm">Current Address</p>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3 px-6">
                <p className="text-sm">{patient.homeAddress}</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
