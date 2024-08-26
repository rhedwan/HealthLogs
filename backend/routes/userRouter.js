const express = require("express");

const {
  createUser,
  login,
  getAllPatients,
} = require("../controllers/userControllers");
const {
  protect,
  restrictTo,
  forgetPassword,
} = require("../controllers/authContollers");

const router = express.Router();

router.post("/create_user", createUser);
router.post("/login", login);
router.post("/forgetPassword", forgetPassword);
router.get("/", protect, restrictTo("admin", "patient"), getAllPatients);

module.exports = router;
