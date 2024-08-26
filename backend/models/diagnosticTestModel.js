const mongoose = require("mongoose");

const diagnosticTestSchema = new mongoose.Schema({
  testName: {
    type: String,
    enum: ["Xray", "Blood Test", "MRI"],
    required: [true, "Enter the name of the test!"],
  },
  documents: [
    {
      type: String,
      required: [true, "Enter the name of the test!"],
    },
  ],
});

const DiagnosticTest = mongoose.model("DiagnosticTest", diagnosticTestSchema);

module.exports = DiagnosticTest;
