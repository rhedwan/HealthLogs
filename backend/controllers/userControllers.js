const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const Email = require("../utils/email");
const cloudinary = require("cloudinary").v2;
const { unlink } = require("node:fs/promises");
const { MedicalRecord } = require("../models/medicalRecordModel");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  const uploadResult = await cloudinary.uploader
    .upload(`public/img/users/${req.file.filename}`, {
      public_id: "users",
    })
    .catch((error) => {
      console.log(error);
    });

  await unlink(`public/img/users/${req.file.filename}`);

  req.file.filename = uploadResult.url;

  next();
});

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 3600 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV == "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    ...req.body,
    /*   firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt, */
  });

  // createSendToken(newUser, 200, res);

  await new Email(newUser, "ms").sendWelcome();

  const token = signToken(newUser._id);
  res.status(200).json({
    data: "success",
    token,
    user: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide an email and passsword", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect email and passsword", 401));

  if (user.role === "patient")
    return next(new AppError("This login is for Admins Only", 401));

  let token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.loginPatient = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide an email and passsword", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect email and passsword", 401));

  if (user.role !== "patient")
    return next(new AppError("This login is for Patient Only", 401));

  let token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.getAllPatients = catchAsync(async (req, res, next) => {
  const patients = await User.find();
  res.status(200).json({
    status: "success",
    results: patients.length,
    patients,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    status: "success",
    user,
  });
});
exports.getPatientById = catchAsync(async (req, res, next) => {
  const currentPatient = await User.findById({
    _id: req.params.id,
  })
    .select(
      "-__v -passwordChangedAt -passwordExpires -passwordResetToken -updatedAt"
    )
    .populate({
      path: "patientRecord",
      select: "-__v",
    })
    .populate({
      path: "patientAppointment",
      select: "-__v",
    })
    .populate({
      path: "patientAllergy",
    })
    .populate("patientFamilyHistory")
    .lean();

  const visits = currentPatient.patientRecord.map((record) => {
    const physicalExam = record.physicalExamination || {};
    const bp = physicalExam.bloodPressure || {};
    return {
      date: record.createdAt.toISOString().split("T")[0],
      weight: physicalExam.weight || 0,
      systolic: bp.systolicPressure || 0,
      diastolic: bp.diastolicPressure || 0,
    };
  });
  currentPatient.visits = visits;
  res.status(200).json({
    status: "success",
    currentPatient,
  });
});

const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError("This route is not for password updates", 400));

  if (req.file) {
    req.body.photo = req.file.filename;
  }

  // const filteredBody = filteredObj(req.body, "name", "email", "photo");

  // const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, user) => {
  await User.findByIdAndUpdate(req.user._id, {
    active: false,
  });

  res.status(204).json({
    status: "success",
  });
});
