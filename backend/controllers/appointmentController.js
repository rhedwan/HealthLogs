const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { isPatientExisting } = require("./medicalRecordController");

exports.createAppointment = catchAsync(async (req, res, next) => {
  //   const patient = await isPatientExisting(req, next);

  req.body.patient = req.user._id;
  const appointment = await Appointment.create(req.body);

  res.status(201).json({
    status: "success",
    appointment,
  });
});

exports.createAppointmentByAdmin = catchAsync(async (req, res, next) => {
  const queryPatient = await User.findOne({ fileId: req.params.fileId });
  if (!queryPatient)
    return next(new AppError("No patient exist with this patient ID.", 400));
  req.body.patient = queryPatient._id;
  const appointment = await Appointment.create(req.body);

  res.status(201).json({
    status: "success",
    appointment,
  });
});

exports.getAllAppointment = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find({ patient: req.user._id });
  res.status(201).json({
    status: "success",
    appointments,
  });
});
