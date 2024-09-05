const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
// const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");

dotenv.config({ path: "./config.env" });

const userRouter = require("./routes/userRouter");
const medicalRecordRouter = require("./routes/medicalRecordRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const appointmentRouter = require("./routes/appointmentRouter");

app.use(helmet());

const DATABASE = process.env.DATABASE_URL.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DATABASE).then((connect) => {
  console.log("Database connection established");
});

// const limiter = rateLimit({
//   windowMs: 60 * 60 * 1000,
//   limit: 1000,
//   message: "Too many requests from this IP, please try again in an hour",
// });

// app.use("/api", limiter);
app.use(express.json());
app.use(mongoSanitize());

app.use(xss());
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/medicalRecord", medicalRecordRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/appointment", appointmentRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    Name: "HealthLogs",
  });
});

app.use("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on the server`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on the server`);
  // err.status = "fail";
  // err.statusCode = 404;
  // next(err);
  return next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
