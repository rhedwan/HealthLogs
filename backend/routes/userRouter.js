const express = require("express");

const {
  createUser,
  login,
  getAllPatients,
  updateUser,
} = require("../controllers/userControllers");
const {
  protect,
  restrictTo,
  forgetPassword,
  resetPassword,
  updatePassword,
} = require("../controllers/authContollers");

const router = express.Router();

router.post("/create_user", createUser);
router.post("/login", login);
router.post("/forgetPassword", forgetPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updatePassword", protect, updatePassword);
router.patch("/updateUser", protect, updateUser);
router.get("/", protect, restrictTo("admin", "patient"), getAllPatients);

module.exports = router;
