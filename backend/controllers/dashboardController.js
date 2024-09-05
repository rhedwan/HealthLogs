const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.dashboardOverview = catchAsync(async (req, res, next) => {
  users = await User.find({ role: "patient" });

  const currentDate = new Date();
  const past30Days = new Date(currentDate.setDate(currentDate.getDate() - 30));
  const past30DaysPatient = await User.find({
    createdAt: { $gte: past30Days },
  });

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const appointmentForToday = await Appointment.find({
    date: { $gte: startOfToday, $lte: endOfToday },
  })
    .populate({
      path: "patient",
      select:
        "-__v -fileId -passwordChangedAt -email -createdAt -updatedAt -age -gender -medicalBackground -passwordExpires -passwordResetToken",
    })
    .lean();

  res.status(200).json({
    status: "success",
    newPatient: past30DaysPatient.length,
    totalPatient: users.length,
    appointmentForToday,
  });
});

exports.getAllPatientsAppointment = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(201).json({
    status: "success",
    appointments,
  });
});
