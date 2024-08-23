const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.createUser = catchAsync(async (req, res, next) => {
  console.log(req.body);
  // const newUser = await User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   passwordConfirm: req.body.passwordConfirm,
  // });

  res.status(200).json({
    data: "success",
    // user: newUser,
  });
});
