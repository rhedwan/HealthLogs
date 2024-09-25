import { jsPDF } from "jspdf";

export const generateMedicationPDF = (
  drug: string,
  doctor: string,
  quantity: number,
  refills: number,
  patientName: string
) => {
  const doc = new jsPDF();

  // Letterhead
  // doc.addImage("/public/next.svg", "SVG", 20, 15, 20, 20);
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

  // Instructions
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Instructions", 20, 150);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("1. Take medication as directed by your doctor.", 30, 160);
  doc.text("2. Do not exceed the prescribed dosage.", 30, 170);
  doc.text("3. Keep this medication out of reach of children.", 30, 180);
  doc.text(
    "4. Store at room temperature away from moisture and heat.",
    30,
    190
  );

  // Signature
  doc.line(20, 220, 80, 220);
  doc.text("Doctor's Signature", 20, 230);

  // Footer
  doc.setFontSize(10);
  doc.text(
    "This prescription is valid for 30 days from the date of issue.",
    20,
    250
  );
  doc.text(
    "For any queries, please contact Tessa Queen Hospital at 1234455566",
    20,
    260
  );

  // Save the PDF
  doc.save(`${patientName}_prescription.pdf`);
};
