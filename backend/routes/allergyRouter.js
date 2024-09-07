const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authContollers");
const { createAllegy } = require("../controllers/allergyController");

router.route("/:patientId").post(protect, createAllegy);

module.exports = router;
