const express = require("express");
const {
  createMedicalRecord,
  getMedicalRecord,
  getPatientMedicalHistory,
} = require("../controllers/medicalRecordController");
const { protect } = require("../controllers/authContollers");
const router = express.Router();

router.post("/create", protect, createMedicalRecord);
// router.get("/:token", protect, getMedicalRecord);
router.get("/:id", protect, getPatientMedicalHistory);

module.exports = router;
