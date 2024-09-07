const mongoose = require("mongoose");

const familyHealthSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "A description is needed"],
  },
  relatives: [
    {
      type: String,
      enum: ["Brother", "Father", "Sister", "Mother"],
    },
  ],
});

const FamilyHealthHistory = mongoose.model(
  "FamilyHealthHistory",
  familyHealthSchema
);
module.exports = FamilyHealthHistory;
