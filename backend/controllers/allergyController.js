const Allegy = require("../models/allergyModel");
const catchAsync = require("../utils/catchAsync");
const { isPatientExisting } = require("./medicalRecordController");

exports.createAllegy = catchAsync(async (req, res, next) => {
  //   const patient = await isPatientExisting(req, next);

  req.body.patient = req.params.patientId;
  const allergy = await Allegy.create(req.body);

  res.status(201).json({
    status: "success",
    allergy,
  });
});

exports.getAllegy = catchAsync(async (req, res, next) => {
  const allergies = await Allegy.find({ patient: req.user._id });
  res.status(201).json({
    status: "success",
    allergies,
  });
});
