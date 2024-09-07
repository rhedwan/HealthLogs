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
    diagnosis: {
      description: { type: String },
      startDate: { type: Date },
    },
    chiefComplaint: {
      type: String,
      required: [true, "You need to provide a complaints of the patient"],
    },
    healthConcerns: {
      type: String,
    },
    physicalExamination: {
      temperature: String,
      bloodPressure: String,
      weight: Number,
      height: Number,
      pulse: Number,
    },
    medications: [
      {
        name: { type: String },
        sig: { type: String },
        startDate: { type: Date },
        prescriptionDetails: {
          recorded: Date,
          prescriber: String,
          refills: Number,
          quantity: Number,
        },
      },
    ],
    subjectiveNote: {
      type: String,
    },
    objectiveNote: {
      type: String,
    },
    assessmentNote: String,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    documents: [{ type: String }],
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
