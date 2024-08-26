const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
  {
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
    description: String,
  },
  { timestamps: true }
);

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);

module.exports = MedicalRecord;
