const catchAsync = require("../utils/catchAsync");

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    req.body.patient = req.params.patientId;
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
