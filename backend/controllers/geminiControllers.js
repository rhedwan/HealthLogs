const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const MAX_RETRIES = 3;

const extractJsonString = (responseString) => {
  const jsonMatch = responseString.match(/```json\n([\s\S]*?)\n```/);
  return jsonMatch ? jsonMatch[1] : null;
};

const isValidResponse = (parsedJson) => {
  const { PotentialDiagnoses, RecommendedTests, TreatmentSuggestions, FollowUpRecommendations } = parsedJson;
  return (
    Array.isArray(PotentialDiagnoses) && PotentialDiagnoses.length > 0 &&
    Array.isArray(RecommendedTests) && RecommendedTests.length > 0 &&
    TreatmentSuggestions?.Medications?.trim() !== "" &&
    Array.isArray(TreatmentSuggestions?.LifestyleModifications) && TreatmentSuggestions.LifestyleModifications.length > 0 &&
    FollowUpRecommendations?.Appointment?.trim() !== "" &&
    FollowUpRecommendations?.FurtherAction?.trim() !== ""
  );
};

const generateAIContent = async (promptText) => {
  const result = await model.generateContent(promptText);
  const jsonString = extractJsonString(result.response.text());
  return jsonString ? JSON.parse(jsonString) : null;
};

exports.generateDiagnostic = catchAsync(async (req, res, next) => {
  const patient = await User.findById(req.params.id)
    .select("-__v -fileId -passwordChangedAt -passwordExpires -passwordResetToken -email -updatedAt -age -gender")
    .populate("patientRecord", "-__v")
    .populate("patientAppointment", "-__v")
    .populate("patientAllergy")
    .populate("patientFamilyHistory")
    .lean();

  if (!patient) {
    return res.status(404).json({ status: "error", message: "Patient not found" });
  }

  const promptText = `Patient data: ${JSON.stringify(patient)}, Current symptoms: ${JSON.stringify(req.body)}. Provide a diagnostic in the following JSON format:
  {
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
  }
  Return only the JSON, no additional text.`;

  let diagnostic;
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      diagnostic = await generateAIContent(promptText);
      if (diagnostic && isValidResponse(diagnostic)) {
        return res.status(200).json({ status: "success", result: diagnostic });
      }
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
    }
    console.log(`Retrying... Attempt ${i + 2} of ${MAX_RETRIES}`);
  }

  res.status(400).json({
    status: "error",
    message: "Failed to generate a valid diagnostic after multiple attempts",
  });
});
