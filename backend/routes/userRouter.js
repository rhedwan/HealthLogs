const express = require("express");
const { createUser } = require("../controllers/userControllers");

const router = express.Router();

router.post("/create_user", createUser);

module.exports = router;
