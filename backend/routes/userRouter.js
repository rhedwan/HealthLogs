const express = require("express");

const {
  createUser,
  login,
  getAllPatients,
  getPatientById,
  updateUser,
  deleteUser,
  uploadUserPhoto,
  resizeUserPhoto,
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
router.patch(
  "/updateUser",
  protect,
  uploadUserPhoto,
  resizeUserPhoto,
  updateUser
);
router.delete("/deleteUser", protect, deleteUser);
router.get("/", protect, restrictTo("admin", "patient"), getAllPatients);
router.get("/patient", protect, restrictTo("admin", "patient"), getPatientById);

module.exports = router;
