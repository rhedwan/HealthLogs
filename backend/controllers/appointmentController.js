const Appointment = require("../models/appointmentModel");
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

exports.getAllAppointment = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find({ patient: req.user._id });
  res.status(201).json({
    status: "success",
    appointments,
  });
});
