import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  CalendarDays,
  FileText,
  Heart,
  Home,
  Mail,
  Phone,
  Plus,
  User,
} from "lucide-react";
import Link from "next/link";
import { closeModalAndToast, formatDate, formatDateChart } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { State, createAppointment } from "@/app/actions/appointment";
import { PatientRecord } from "@/schema/PatientRecord";
import { PatientAllergy } from "@/schema/PatientAllergy";
import { PatientFamilyHistory } from "@/schema/PatientFamilyHistory";
import { exportToCSVRecharts } from "@/lib/exportCsv";
import { Textarea } from "@/components/ui/textarea";
import { AddAllergy } from "@/app/actions/allergy";
import { useToast } from "@/hooks/use-toast";
const FamilyHistory = ({ patient }: { patient: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Family History ({patient.patientFamilyHistory.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {patient.patientFamilyHistory.map(
              (history: PatientFamilyHistory) => (
                <TableRow key={history._id} className="items-center">
                  <TableCell>{history.description}</TableCell>
                  <div className="flex items-center space-x-3 mt-2">
                    {history.relatives.map((relative, index) => (
                      <Badge key={index}>{relative}</Badge>
                    ))}
                  </div>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FamilyHistory;
