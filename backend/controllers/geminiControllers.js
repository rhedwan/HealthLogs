const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
exports.generateDiagnostic = catchAsync(async (req, res, next) => {
  const prompt = await User.findById({
    _id: req.params.id,
  })
    .select(
      "-__v -fileId -passwordChangedAt -passwordExpires -passwordResetToken -email  -updatedAt -age -gender"
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
    .populate("patientFamilyHistory");

  const newEncounter = req.body;
  const promptText = `This the patient data: ${prompt} and this patient is have this at the moment ${newEncounter} return a diagnostic with is {
    "PotentialDiagnoses": [],
    "RecommendedTests": [],
    "TreatmentSuggestions": {
      "Medications": "",
      "LifestyleModifications": []
    },
    "FollowUpRecommendations": {
      "Appointment": "",
      "FurtherAction": ""
    }
      remove other text and return only the json
  }`;

  let result = await model.generateContent(promptText);
  result = result.response.text();

  const extractJsonString = (responseString) => {
    const jsonMatch = responseString.match(/```json\n([\s\S]*?)\n```/);
    return jsonMatch ? jsonMatch[1] : null;
  };

  result = extractJsonString(result);

  if (result) {
    const parsedJson = JSON.parse(result);

    res.status(200).json({
      status: "success",
      result: parsedJson,
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "No valid JSON found",
    });
  }
});
