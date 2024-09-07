const express = require("express");
const {
  createMedicalRecord,
  getMedicalRecord,
  getPatientMedicalHistory,
  updateMedicalRecord,
  createFamilyHistory,
} = require("../controllers/medicalRecordController");
const { protect } = require("../controllers/authContollers");
const router = express.Router({ mergeParams: true });

router.route("/:patientId/familyRecord").post(protect, createFamilyHistory);

router
  .route("/")
  .get(protect, getPatientMedicalHistory)
  .post(protect, createMedicalRecord);

router
  .route("/:id")
  .get(protect, getMedicalRecord)
  .patch(protect, updateMedicalRecord);

module.exports = router;
