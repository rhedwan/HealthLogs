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

const PatientPDFGenerator: React.FC<{ patientData: PatientData }> = ({
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

    // Last Blood Pressure
    doc.text(
      `Last BP: ${patientData.lastBloodPressure.systolic}/${
        patientData.lastBloodPressure.diastolic
      } on ${new Date(
        patientData.lastBloodPressure.date
      ).toLocaleDateString()}`,
      105,
      92
    );

    // Allergies
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Allergies", 14, 108);

    const allergiesData = patientData.patientAllergy.map((allergy) => [
      allergy.allergen,
      allergy.severity,
      allergy.reaction,
    ]);

    autoTable(doc, {
      startY: 113,
      head: [["Allergen", "Severity", "Reaction"]],
      body: allergiesData,
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 1 },
    });

    // Family History
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    // @ts-ignore
    doc.text("Family History", 14, doc.lastAutoTable.finalY + 10);

    const familyHistoryData = patientData.patientFamilyHistory.map(
      (history) => [history.description, history.relatives.join(", ")]
    );

    autoTable(doc, {
      // @ts-ignore
      startY: doc.lastAutoTable.finalY + 15,
      head: [["Condition", "Relatives"]],
      body: familyHistoryData,
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 1 },
    });

    // Medications Table
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Medications", 14, 20);

    const medicationsData = patientData.patientRecord
      .filter((record) => record.medications && record.medications.length > 0)
      .flatMap((record) =>
        record.medications.map((med) => [
          med.name,
          med.sig,
          med.startDate ? new Date(med.startDate).toLocaleDateString() : "-",
          record.diagnosis ? record.diagnosis.description : "-",
          `Script (recorded): ${med.prescriptionDetails.recorded}, Prescriber: ${med.prescriptionDetails.prescriber}, Refills: ${med.prescriptionDetails.refills}, Quantity: ${med.prescriptionDetails.quantity}`,
        ])
      );

    autoTable(doc, {
      startY: 25,
      head: [["Active", "SIG", "START/STOP", "ASSOCIATED DX"]],
      body: medicationsData,
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 1 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 60 },
        2: { cellWidth: 30 },
        3: { cellWidth: 40 },
      },
      didDrawCell: (data) => {
        if (
          data.section === "body" &&
          data.column.index === 0 &&
          data.row.index % 2 === 1
        ) {
          doc.setFontSize(6);
          doc.setTextColor(100);
          // @ts-ignore
          const text = data.row.raw[4] as string;
          const textHeight = doc.getTextDimensions(text, { maxWidth: 170 }).h;
          doc.text(text, data.cell.x + 1, data.cell.y + data.cell.height + 1, {
            maxWidth: 170,
          });
          data.row.height += textHeight + 2;
        }
      },
    });

    // Appointments
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Appointments", 14, 20);

    const appointmentsData = patientData.patientAppointment.map((app) => [
      app.appointmentType,
      new Date(app.date).toLocaleDateString(),
      new Date(app.startTime).toLocaleTimeString(),
      new Date(app.endTime).toLocaleTimeString(),
      app.status,
    ]);

    autoTable(doc, {
      startY: 25,
      head: [["Type", "Date", "Start Time", "End Time", "Status"]],
      body: appointmentsData,
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 1 },
    });

    // Medical Records
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Medical Records", 14, 20);

    patientData.patientRecord.forEach((record, index) => {
      // @ts-ignore
      const startY = index === 0 ? 25 : doc.lastAutoTable.finalY + 10;

      autoTable(doc, {
        startY: startY,
        head: [[`Visit: ${new Date(record.createdAt).toLocaleDateString()}`]],
        body: [
          [`Visit Type: ${record.vistType}`],
          [`Department: ${record.department}`],
          [`Chief Complaint: ${record.chiefComplaint}`],
          [`Health Concerns: ${record.healthConcerns}`],
          [
            `Physical Examination: Temp: ${record.physicalExamination.temperature}, BP: ${record.physicalExamination.bloodPressure.systolicPressure}/${record.physicalExamination.bloodPressure.diastolicPressure}, Weight: ${record.physicalExamination.weight}, Height: ${record.physicalExamination.height}, Pulse: ${record.physicalExamination.pulse}`,
          ],
          [
            `Diagnosis: ${
              record.diagnosis
                ? `${record.diagnosis.description} (${new Date(
                    record.diagnosis.startDate
                  ).toLocaleDateString()})`
                : "N/A"
            }`,
          ],
        ],
        theme: "plain",
        styles: { fontSize: 8, cellPadding: 1 },
      });
    });

    // Save the PDF
    doc.save(
      `${patientData.firstName}_${patientData.lastName}_medical_record.pdf`
    );
  };

  return (
    <div>
      <Card className="w-full max-w-4xl mx-auto hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700">
            TESSA QUEEN HOSPITAL LIMITED
          </CardTitle>
          <p className="text-sm">12 Jezza Street, Egbeda, Lagos, Nigeria</p>
          <p className="text-sm">
            Tel: 1234455566, 32137577575 | Email: hospital@mail.com
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Patient Information
              </h3>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {patientData.firstName} {patientData.lastName}
              </p>
              <p>
                <span className="font-medium">DOB:</span>{" "}
                {new Date(patientData.dateOfBirth).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Gender:</span>{" "}
                {patientData.gender}
              </p>
              <p>
                <span className="font-medium">File ID:</span>{" "}
                {patientData.fileId}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Contact Information
              </h3>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {patientData.phoneNumber}
              </p>
              <p>
                <span className="font-medium">Email:</span> {patientData.email}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {patientData.homeAddress}
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Medical Background</h3>
            <p>
              <span className="font-medium">Blood Group:</span>{" "}
              {patientData.medicalBackground.bloodGroup}
            </p>
            <p>
              <span className="font-medium">Genotype:</span>{" "}
              {patientData.medicalBackground.genotype}
            </p>
            <p>
              <span className="font-medium">Last BP:</span>{" "}
              {patientData.lastBloodPressure.systolic}/
              {patientData.lastBloodPressure.diastolic} on{" "}
              {new Date(
                patientData.lastBloodPressure.date
              ).toLocaleDateString()}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Allergies</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Allergen</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Reaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientData.patientAllergy.map((allergy) => (
                  <TableRow key={allergy._id}>
                    <TableCell>{allergy.allergen}</TableCell>
                    <TableCell>{allergy.severity}</TableCell>
                    <TableCell>{allergy.reaction}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Family History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Condition</TableHead>
                  <TableHead>Relatives</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientData.patientFamilyHistory.map((history) => (
                  <TableRow key={history._id}>
                    <TableCell>{history.description}</TableCell>
                    <TableCell>{history.relatives.join(", ")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Medications</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Active</TableHead>
                  <TableHead className="w-[250px]">SIG</TableHead>
                  <TableHead>START/STOP</TableHead>
                  <TableHead>ASSOCIATED DX</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientData.patientRecord
                  .filter(
                    (record) =>
                      record.medications && record.medications.length > 0
                  )
                  .flatMap((record) =>
                    record.medications.map((med, index) => (
                      <React.Fragment key={`${record._id}-${index}`}>
                        <TableRow>
                          <TableCell>{med.name}</TableCell>
                          <TableCell>{med.sig}</TableCell>
                          <TableCell>
                            {med.startDate
                              ? new Date(med.startDate).toLocaleDateString()
                              : "-"}
                          </TableCell>
                          <TableCell>
                            {record.diagnosis
                              ? record.diagnosis.description
                              : "-"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-sm text-muted-foreground"
                          >
                            Script (recorded):{" "}
                            {med.prescriptionDetails.recorded}, Prescriber:{" "}
                            {med.prescriptionDetails.prescriber}, Refills:{" "}
                            {med.prescriptionDetails.refills}, Quantity:{" "}
                            {med.prescriptionDetails.quantity}
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))
                  )}
              </TableBody>
            </Table>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Appointments</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientData.patientAppointment.map((app) => (
                  <TableRow key={app._id}>
                    <TableCell>{app.appointmentType}</TableCell>
                    <TableCell>
                      {new Date(app.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(app.startTime).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      {new Date(app.endTime).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>{app.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Medical Records</h3>
            {patientData.patientRecord.map((record) => (
              <Card key={record._id} className="mb-4">
                <CardHeader>
                  <CardTitle>
                    Visit: {new Date(record.createdAt).toLocaleDateString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <span className="font-medium">Visit Type:</span>{" "}
                    {record.vistType}
                  </p>
                  <p>
                    <span className="font-medium">Department:</span>{" "}
                    {record.department}
                  </p>
                  <p>
                    <span className="font-medium">Chief Complaint:</span>{" "}
                    {record.chiefComplaint}
                  </p>
                  <p>
                    <span className="font-medium">Health Concerns:</span>{" "}
                    {record.healthConcerns}
                  </p>
                  <p>
                    <span className="font-medium">Physical Examination:</span>{" "}
                    Temp: {record.physicalExamination.temperature}, BP:{" "}
                    {record.physicalExamination.bloodPressure.systolicPressure}/
                    {record.physicalExamination.bloodPressure.diastolicPressure}
                    , Weight: {record.physicalExamination.weight}, Height:{" "}
                    {record.physicalExamination.height}, Pulse:{" "}
                    {record.physicalExamination.pulse}
                  </p>
                  {record.diagnosis && (
                    <p>
                      <span className="font-medium">Diagnosis:</span>{" "}
                      {record.diagnosis.description} (
                      {new Date(
                        record.diagnosis.startDate
                      ).toLocaleDateString()}
                      )
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="mt-6">
        <Button onClick={generatePDF}>Generate Patient Chart</Button>
      </div>
    </div>
  );
};

export default PatientPDFGenerator;
