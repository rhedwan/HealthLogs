import { jsPDF } from "jspdf";

export const generateMedicationPDF = (
  drug: string,
  doctor: string,
  quantity: number,
  refills: number,
  patientName: string,
  sig: string // New parameter for SIG
) => {
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

  // Prescription Details
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("PRESCRIPTION", 105, 55, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 65);
  doc.text(`Patient Name: ${patientName}`, 20, 75);
  doc.text(`Prescribing Doctor: ${doctor}`, 20, 85);

  // Medication Details
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Medication Details", 20, 100);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Drug Name: ${drug}`, 30, 110);
  doc.text(`Quantity: ${quantity}`, 30, 120);
  doc.text(`Refills: ${refills}`, 30, 130);

  // SIG (Signatura) Information
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("SIG (Instructions)", 20, 150);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  const sigLines = doc.splitTextToSize(sig, 150); // Split long SIG text into multiple lines
  doc.text(sigLines, 30, 160);

  // General Instructions
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("General Instructions", 20, 190);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("1. Take medication as directed by your doctor.", 30, 200);
  doc.text("2. Do not exceed the prescribed dosage.", 30, 210);
  doc.text("3. Keep this medication out of reach of children.", 30, 220);
  doc.text(
    "4. Store at room temperature away from moisture and heat.",
    30,
    230
  );

  // Signature
  doc.line(20, 250, 80, 250);
  doc.text("Doctor's Signature", 20, 260);

  // Footer
  doc.setFontSize(10);
  doc.text(
    "This prescription is valid for 30 days from the date of issue.",
    20,
    280
  );
  doc.text(
    "For any queries, please contact Tessa Queen Hospital at 1234455566",
    20,
    285
  );

  // Save the PDF
  doc.save(`${patientName}_prescription.pdf`);
};
