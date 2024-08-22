const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DATABASE = process.env.DATABASE_URL.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DATABASE).then((connect) => {
  console.log("Database connection established");
});

app.get("/", (req, res) => {
  res.status(200).json({
    Name: "HealthLogs",
  });
});

module.exports = app;
