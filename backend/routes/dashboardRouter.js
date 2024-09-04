const express = require("express");
const { dashboardOverview } = require("../controllers/dashboardController");
const { protect, restrictTo } = require("../controllers/authContollers");

const router = express.Router();

router
  .route("/")
  .get(protect, restrictTo("admin", "nurses", "doctor"), dashboardOverview);

module.exports = router;
