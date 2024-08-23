const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/userRouter");

dotenv.config({ path: "./config.env" });

const DATABASE = process.env.DATABASE_URL.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DATABASE).then((connect) => {
  console.log("Database connection established");
});

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

// ROUTES
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    Name: "HealthLogs",
  });
});

module.exports = app;
