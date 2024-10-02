const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { isPatientExisting } = require("./medicalRecordController");

exports.changeAppointmentStatus = async () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(23, 59, 59, 999);

  try {
    await Appointment.updateMany(
      {
        status: { $ne: "Completed" },
        endTime: { $lte: yesterday }
      },
      { $set: { status: "Inactive" } }
    );
    console.log("Appointment statuses updated successfully");
  } catch (error) {
    console.error("Error updating appointment statuses:", error);
  }
};

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

  const activeAppointments = appointments.filter(
    (appointment) => appointment.status === "Active"
  );
  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  );

  let nextAppointment = null;
  if (activeAppointments.length > 0) {
    nextAppointment = activeAppointments.reduce((earliest, current) =>
      new Date(current.date) < new Date(earliest.date) ? current : earliest
    );
  }

  res.status(200).json({
    status: "success",
    appointments,
    metaData: {
      activeAppointments: activeAppointments.length,
      completedAppointments: completedAppointments.length,
      nextAppointment: nextAppointment ? nextAppointment.date : null,
    },
  });
});
