const express = require("express");

const {
  createUser,
  login,
  getAllPatients,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const {
  protect,
  restrictTo,
  forgetPassword,
  resetPassword,
  updatePassword,
} = require("../controllers/authContollers");

const medicalRecordRouter = require("../routes/medicalRecordRouter");

const router = express.Router();

router.use("/:patientId/medicalRecords", medicalRecordRouter);

router.post("/create_user", createUser);
router.post("/login", login);
router.post("/forgetPassword", forgetPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updatePassword", protect, updatePassword);
router.patch("/updateUser", protect, updateUser);
router.delete("/deleteUser", protect, deleteUser);
router.get("/", protect, restrictTo("admin", "patient"), getAllPatients);

module.exports = router;
