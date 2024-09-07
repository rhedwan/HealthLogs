const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authContollers");
const {
  createAppointment,
  getAllAppointment,
  createAppointmentByAdmin,
} = require("../controllers/appointmentController");

router
  .route("/")
  .post(protect, createAppointment)
  .get(protect, restrictTo("patient"), getAllAppointment);

router.post("/:fileId", protect, createAppointmentByAdmin);

module.exports = router;
