const MedicalRecord = require("../models/medicalRecordModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const isPatientExisting = async (req, next) => {
  const patient = req.params.patientId;

  if (!(await User.findById(patient)))
    return next(new AppError("Patient doesn't exist", 404));

  return patient;
};

exports.createMedicalRecord = catchAsync(async (req, res, next) => {
  const createdBy = req.user._id;
  const patient = await isPatientExisting(req, next);

  req.body.patient = patient;
  req.body.createdBy = createdBy;
  const medicalRecord = await MedicalRecord.create(req.body);

  res.status(201).json({
    status: "success",
    medicalRecord,
  });
});

exports.getMedicalRecord = catchAsync(async (req, res, next) => {
  const medicalRecord = await MedicalRecord.findById(req.params.id)
    .populate({
      path: "createdBy",
      select:
        "-__v -fileId -passwordChangedAt -email -createdAt -updatedAt -age -gender",
    })
    .lean();

  if (medicalRecord && medicalRecord.createdBy) {
    delete medicalRecord.createdBy.age;
  }

  res.status(201).json({
    status: "success",
    medicalRecord,
  });
});

exports.updateMedicalRecord = catchAsync(async (req, res, next) => {
  const medicalRecord = await MedicalRecord.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!medicalRecord)
    return next(new AppError("No medical record of such  exist", 404));
  res.status(200).json({
    status: "success",
    medicalRecord,
  });
});

exports.getPatientMedicalHistory = catchAsync(async (req, res, next) => {
  const patient = await isPatientExisting(req, next);

  const allMedicalRecords = await User.findById(patient).populate({
    path: "patientRecord",
    select: "-__v",
  });

  res.status(201).json({
    status: "success",
    data: allMedicalRecords,
  });
});
