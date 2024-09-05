const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Patient details needs to be provided"],
    },
    appointmentType: {
      type: String,
      enum: [
        "Follow-Up Visit",
        "New Patient Visit",
        "Nursing Only",
        "Urgent Visit",
        "Video Visit",
        "Wellness Exam",
      ],
      required: [true, "You need to provide a type"],
    },
    duration: {
      type: Number,
      required: [true, "You need to provide a duration"],
    },
    date: {
      type: Date,
      required: [true, "You need to provide a date"],
    },
    startTime: {
      type: Date,
      required: [true, "You need to provide a start time"],
    },
    endTime: {
      type: Date,
      required: [true, "You need to provide a end time"],
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive", "Completed"],
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
