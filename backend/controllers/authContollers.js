const crypto = require("crypto");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendMail = require("../utils/email");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token)
    return next(
      new AppError(`You are not logged in. Please log in  to get access`, 401)
    );

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(new AppError("User with the token doesn't exist", 400));

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You don't have the permission to perform this action",
          401
        )
      );
    }
    next();
  };
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("There's no user with this email", 404));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password ? Send a request with your new password to ${resetUrl}.
  \n If you didn't forget your password, please ignore this email`;

  try {
    await sendMail({
      email: user.email,
      subject: "Your password reset token (valid for 10 minutes)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to the email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was a problem sending the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordExpires: { $gte: Date.now() },
  });

  if (!user) return next(new AppError("Token is invalid or expired", 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordExpires = undefined;
  await user.save();

  let token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id }).select("+password");
  console.log(req.body.currentPassword, user.password);

    if (!(await user.correctPassword(req.body.currentPassword, user.password)))
      return next(new AppError("Current Password entered is wrong", 401));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  let token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
