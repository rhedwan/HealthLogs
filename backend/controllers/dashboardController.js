const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { MedicalRecord } = require("../models/medicalRecordModel");
exports.dashboardOverview = catchAsync(async (req, res, next) => {
  users = await User.find({ role: "patient" });

  const currentDate = new Date();
  const past30Days = new Date(currentDate.setDate(currentDate.getDate() - 30));
  const past30DaysPatient = await User.find({
    createdAt: { $gte: past30Days },
  });

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const appointmentForToday = await Appointment.find({
    date: { $gte: startOfToday, $lte: endOfToday },
  })
    .populate({
      path: "patient",
      select:
        "-__v -fileId -passwordChangedAt -email -createdAt -updatedAt -age -gender -medicalBackground -passwordExpires -passwordResetToken",
    })
    .lean();

  const diagnosisData = await MedicalRecord.aggregate([
    {
      $group: {
        _id: "$diagnosis.description",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  const lastSixMonths = new Date();
  lastSixMonths.setMonth(lastSixMonths.getMonth() - 5);

  const visitsByGender = await MedicalRecord.aggregate([
    {
      $match: {
        createdAt: { $gte: lastSixMonths },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "patient",
        foreignField: "_id",
        as: "patientInfo",
      },
    },
    {
      $unwind: "$patientInfo",
    },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
          gender: "$patientInfo.gender",
        },
        visitCount: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: { month: "$_id.month", year: "$_id.year" },
        visitsByGender: {
          $push: {
            gender: "$_id.gender",
            count: "$visitCount",
          },
        },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = {
    labels: [],
    datasets: [
      { label: "Men", data: [], backgroundColor: "#8b5cf6" },
      { label: "Women", data: [], backgroundColor: "#10b981" },
    ],
  };
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    chartData.labels.push(`${monthName} ${year}`);
    chartData.datasets[0].data.push(0);
    chartData.datasets[1].data.push(0);
  }

  visitsByGender.forEach((monthData) => {
    const monthIndex = chartData.labels.findIndex((label) => {
      const [month, year] = label.split(" ");
      return (
        month === monthNames[monthData._id.month - 1] &&
        year === monthData._id.year.toString()
      );
    });

    if (monthIndex !== -1) {
      const menData = monthData.visitsByGender.find((v) => v.gender === "Male");
      const womenData = monthData.visitsByGender.find(
        (v) => v.gender === "Female"
      );

      chartData.datasets[0].data[monthIndex] = menData ? menData.count : 0;
      chartData.datasets[1].data[monthIndex] = womenData ? womenData.count : 0;
    }
  });

  res.status(200).json({
    status: "success",
    newPatient: past30DaysPatient.length,
    totalPatient: users.length,
    appointmentForToday,
    diagnosisData,
    chartData,
  });
});

exports.getAllPatientsAppointment = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find().populate({
    path: "patient",
    select: "firstName lastName fileId",
  });
  res.status(201).json({
    status: "success",
    appointments,
  });
});
