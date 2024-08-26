const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");

const userRouter = require("./routes/userRouter");

dotenv.config({ path: "./config.env" });

const DATABASE = process.env.DATABASE_URL.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DATABASE).then((connect) => {
  console.log("Database connection established");
});

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

// ROUTES
app.use("/api/v1/users", userRouter);

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

app.get("/", (req, res) => {
  res.status(200).json({
    Name: "HealthLogs",
  });
});

module.exports = app;
