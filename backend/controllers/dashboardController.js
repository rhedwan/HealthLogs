const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.dashboardOverview = catchAsync(async (req, res, next) => {
  // User.find();
  res.status(200).json({
    status: "success",
    newPatient: 0,
    totalPatient: 0,
  });
});
