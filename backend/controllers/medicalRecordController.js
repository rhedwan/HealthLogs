const MedicalRecord = require("../models/medicalRecordModel");
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
