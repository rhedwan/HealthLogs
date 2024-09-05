const express = require("express");
const {
  dashboardOverview,
  getAllPatientsAppointment,
} = require("../controllers/dashboardController");
const { protect, restrictTo } = require("../controllers/authContollers");

const router = express.Router();

router
  .route("/")
  .get(protect, restrictTo("admin", "nurses", "doctor"), dashboardOverview);

router.get("/appointments", protect, getAllPatientsAppointment);

module.exports = router;
