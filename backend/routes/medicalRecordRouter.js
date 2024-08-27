const express = require("express");
const {
  createMedicalRecord,
  getMedicalRecord,
  getPatientMedicalHistory,
  updateMedicalRecord,
} = require("../controllers/medicalRecordController");
const { protect } = require("../controllers/authContollers");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect, getPatientMedicalHistory)
  .post(protect, createMedicalRecord);

router
  .route("/:id")
  .get(protect, getMedicalRecord)
  .patch(protect, updateMedicalRecord);

module.exports = router;
