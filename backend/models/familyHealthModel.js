const mongoose = require("mongoose");

const familyHealthSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "A description is needed"],
  },
  relatives: [String],
});

const FamilyHealthHistory = mongoose.model(
  "FamilyHealthHistory",
  familyHealthSchema
);
module.exports = FamilyHealthHistory;
