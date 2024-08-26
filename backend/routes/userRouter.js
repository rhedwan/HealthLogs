const express = require("express");

const {
  createUser,
  login,
  getAllPatients,
} = require("../controllers/userControllers");
const { protect, restrictTo } = require("../controllers/authContollers");

const router = express.Router();

router.post("/create_user", createUser);
router.post("/login", login);
router.get(
  "/patients",
  protect,
  restrictTo("admin", "patient"),
  getAllPatients
);

module.exports = router;
