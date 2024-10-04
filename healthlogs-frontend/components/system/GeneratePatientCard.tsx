"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface PatientData {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  occupation: string;
  religion: string;
  ethnic: string;
  maritalStatus: string;
  medicalBackground: {
    bloodGroup: string;
    genotype: string;
  };
  email: string;
  dateOfBirth: string;
  role: string;
  fileId: string;
  createdAt: string;
  homeAddress: string;
  phoneNumber: string;
  patientAppointment: Array<{
    _id: string;
    appointmentType: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
  }>;
  patientAllergy: Array<{
    _id: string;
    allergen: string;
    severity: string;
    reaction: string;
  }>;
  patientFamilyHistory: Array<{
    _id: string;
    description: string;
    relatives: string[];
  }>;
  patientRecord: Array<{
    _id: string;
    vistType: string;
    department: string;
    diagnosis?: {
      description: string;
      startDate: string;
    };
    chiefComplaint: string;
    healthConcerns: string;
    physicalExamination: {
      temperature: string;
      bloodPressure: {
        systolicPressure: number;
        diastolicPressure: number;
      };
      weight: number;
      height: number;
      pulse: number;
    };
    medications: Array<{
      name: string;
      sig: string;
      startDate: string;
      prescriptionDetails: {
        recorded: string;
        prescriber: string;
        refills: number;
        quantity: number;
      };
    }>;
    createdAt: string;
  }>;
  visits: Array<any>;
  lastBloodPressure: {
    systolic: number;
    diastolic: number;
    date: string;
  };
}

const PatientCardPdf: React.FC<{ patientData: PatientData }> = ({
  patientData,
}) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Letterhead
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 128, 0); // Green color
    doc.text("TESSA QUEEN HOSPITAL LIMITED", 50, 25);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black color
    doc.text("12 Jezza Street, Egbeda, Lagos, Nigeria", 50, 32);
    doc.text("Tel: 1234455566, 32137577575 | Email: hospital@mail.com", 50, 37);

    doc.setLineWidth(0.5);
    doc.line(20, 40, 190, 40);

    // Patient Information
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Patient Information", 14, 50);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${patientData.firstName} ${patientData.lastName}`, 14, 57);
    doc.text(
      `DOB: ${new Date(patientData.dateOfBirth).toLocaleDateString()}`,
      14,
      63
    );
    doc.text(`Gender: ${patientData.gender}`, 14, 69);
    doc.text(`File ID: ${patientData.fileId}`, 14, 75);

    doc.text(`Phone: ${patientData.phoneNumber}`, 105, 57);
    doc.text(`Email: ${patientData.email}`, 105, 63);
    doc.text(`Address: ${patientData.homeAddress}`, 105, 69);

    // Medical Background
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Medical Background", 14, 85);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Blood Group: ${patientData.medicalBackground.bloodGroup}`,
      14,
      92
    );
    doc.text(`Genotype: ${patientData.medicalBackground.genotype}`, 14, 98);

    // Save the PDF
    doc.save(`${patientData.firstName}_${patientData.lastName}_card.pdf`);
  };

  return (
    <div>
      <div className="mt-6">
        <Button onClick={generatePDF}>Card Info</Button>
      </div>
    </div>
  );
};

export default PatientCardPdf;
