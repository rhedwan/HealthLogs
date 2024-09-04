const mongoose = require("mongoose");

const alergyScehema = new mongoose.Schema({
  allergen: {
    type: String,
    enum: ["Drug", "Food", "Environment"],
    required: [true, "You need to provide the allergy type"],
  },
  severity: {
    type: String,
    enum: ["Very Mild", "Mild", "Moderate", "Severe"],
    required: [true, "You need to provide the allergy severity"],
  },
  reaction: {
    type: String,
    required: [true, "You need to provide the reaction"],
    enum: [
      "Unknown",
      "Anaphylaxis",
      "Bloating/gas",
      "Bradycardia",
      "Chest Pain",
      "Conjunctivitis",
      "Cough",
      "Diarrhea",
      "Difficulty speaking or swallowing",
      "Dizziness/Lightheadedness",
      "Facial swelling",
      "Hives",
      "Irregular Heartbeat",
      "Itchiness",
      "Loss of consciousness",
      "Nausea",
      "Pain/cramping",
      "Patchy swelling-skin",
      "Rash - generalized",
      "Rash - localized",
      "Respiratory Distress",
      "Runny nose",
      "Shortness of breath",
      "Tachycardia",
      "Tongue swelling",
      "Vomiting",
      "Wheezing",
      "Other",
    ],
  },
  onset: {
    type: String,
    required: [true, "You need to provide when the reaction started"],
    enum: ["Childhood", "Adulthood", "Unknown"],
  },
  date: Date,
  comment: String,
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive"],
  },
});


