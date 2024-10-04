const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const {
  MedicalRecord,
  FamilyHealthHistory,
  PatientDocument,
} = require("../models/medicalRecordModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { createOne } = require("./handlerFactory");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

exports.createFamilyHistory = createOne(FamilyHealthHistory);

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

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPatientImage = upload.array("images");

exports.uploadPatientImageToCloudinary = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(new AppError("No files uploaded", 400));
  }

  const patient = await isPatientExisting(req, next);

  // Find existing document or create a new one
  let patientDocument = await PatientDocument.findOne({ patient });
  if (!patientDocument) {
    patientDocument = await PatientDocument.create({ patient });
  }

  const uploadPromises = req.files.map((file) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "patients",
          public_id: `patient_${patient}_${Date.now()}`,
        },
        (error, result) => {
          if (error) {
            reject(new AppError("Cloudinary upload failed", 500));
          } else {
            resolve(result.secure_url);
          }
        }
      );
      uploadStream.end(file.buffer);
    });
  });

  try {
    const newImageUrls = await Promise.all(uploadPromises);

    patientDocument.images = [...patientDocument.images, ...newImageUrls];

    await patientDocument.save();
    res.status(200).json({
      status: "success",
      document: patientDocument,
    });
  } catch (error) {
    return next(new AppError("Something went wrong.", 400));
  }
});

module.exports.isPatientExisting = isPatientExisting;
