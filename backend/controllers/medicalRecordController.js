const MedicalRecord = require("../models/medicalRecordModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.createMedicalRecord = catchAsync(async (req, res, next) => {
  const medicalRecord = await MedicalRecord.create(req.body);

  res.status(201).json({
    status: "success",
    medicalRecord,
  });
});

exports.getMedicalRecord = catchAsync(async (req, res, next) => {
  const medicalRecord = await MedicalRecord.findById(req.params.token).populate(
    { path: "createdBy", select: "-__v -fileId -passwordChangedAt" }
  );

  res.status(201).json({
    status: "success",
    medicalRecord,
  });
});

exports.getPatientMedicalHistory = catchAsync(async (req, res, next) => {
  const allMedicalRecords = await User.findById(req.params.id).populate({
    path: "patientRecord",
    select: "-__v",
  });

  res.status(201).json({
    status: "success",
    data: allMedicalRecords,
  });
});
