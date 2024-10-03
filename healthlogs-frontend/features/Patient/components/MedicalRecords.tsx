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

const MedicalRecords = ({ patient }: { patient: any }) => {
  return (
    <Card className="mb-7">
      <CardHeader className="pb-3 pt-6 px-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            Patient Records
          </CardTitle>
          <Link href={`/dashboard/patients/${patient._id}/view-record/create`}>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add New Encounter
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {patient.patientRecord.slice(0, 4).map((record: PatientRecord) => (
            <Link
              href={`/dashboard/patients/${patient._id}/view-record/${record._id}`}
              key={record._id}
            >
              <Card className="hover:bg-blue-50">
                <CardHeader className="py-3 px-6">
                  <CardTitle className="text-sm flex justify-between items-center">
                    {record.vistType} - {record.department}
                    <div className="font-normal">
                      {new Date(record.createdAt).toLocaleString()}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-3 px-6">
                  <p className="text-sm">
                    CC:{" "}
                    {record.chiefComplaint
                      ? record.chiefComplaint
                      : "No chief complaint recorded"}
                  </p>
                  {/* <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Temperature:</span>{" "}
                            {record.physicalExamination?.temperature}
                          </div>
                          <div>
                            <span className="font-medium">Blood Pressure:</span>{" "}
                            {
                              record.physicalExamination?.bloodPressure
                                .systolicPressure
                            }
                            /
                            {
                              record.physicalExamination?.bloodPressure
                                .diastolicPressure
                            }
                          </div>
                          <div>
                            <span className="font-medium">Weight:</span>{" "}
                            {record.physicalExamination?.weight} kg
                          </div>
                        </div> */}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalRecords;
