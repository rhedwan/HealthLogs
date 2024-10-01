const express = require("express");
const {
  createMedicalRecord,
  getMedicalRecord,
  getPatientMedicalHistory,
  updateMedicalRecord,
  createFamilyHistory,
  uploadPatientImage,
  uploadPatientImageToCloudinary,
} = require("../controllers/medicalRecordController");
const { protect } = require("../controllers/authContollers");
const { generateDiagnostic } = require("../controllers/geminiControllers");
const router = express.Router({ mergeParams: true });

router.route("/:patientId/familyRecord").post(protect, createFamilyHistory);
router
  .route("/:patientId/document")
  .post(protect, uploadPatientImage, uploadPatientImageToCloudinary);

router
  .route("/")
  .get(protect, getPatientMedicalHistory)
  .post(protect, createMedicalRecord);

router.post("/:id/diagnostic", generateDiagnostic);
router
  .route("/:id")
  .get(protect, getMedicalRecord)
  .patch(protect, updateMedicalRecord);

module.exports = router;
