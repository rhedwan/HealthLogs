const express = require("express");
const {
  createUser,
  login,
  getAllPatients,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/create_user", createUser);
router.post("/login", login);
router.get("/patients", getAllPatients);

module.exports = router;
