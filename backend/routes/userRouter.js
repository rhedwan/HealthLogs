const express = require("express");

const {
  createUser,
  login,
  getAllPatients,
} = require("../controllers/userControllers");
const { protect } = require("../controllers/authContollers");

const router = express.Router();

router.post("/create_user", createUser);
router.post("/login", login);
router.get("/patients", protect, getAllPatients);

module.exports = router;
