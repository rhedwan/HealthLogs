const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A record must belong to Patient"],
    },
    vistType: {
      type: String,
      enum: ["Out Patient", "In Patient", "Emergency", "Follow-Up"],
      default: "Out Patient",
    },
    department: {
      type: String,
      enum: [
        "Cardiology",
        "Obstetrics and Gynecology",
        "Oncology",
        "Orthopedics",
        "Radiology",
      ],
    },
    description: {
      type: String,
      required: [true, "You need to provide a complaints of the patient"],
    },
    physicalExamination: {
      temperature: String,
      bloodPressure: String,
      weight: Number,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    // diagnosticTests: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "DiagnosticTest",
    //   },
    // ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);

module.exports = MedicalRecord;
