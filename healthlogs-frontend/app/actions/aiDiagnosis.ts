"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const FormSchema = z.object({
  visitType: z.enum(["Out Patient", "In Patient", "Emergency", "Follow-Up"], {
    required_error: "This field is required",
  }),
  department: z.enum(
    [
      "Cardiology",
      "Obstetrics and Gynecology",
      "Oncology",
      "Orthopedics",
      "Radiology",
    ],
    {
      required_error: "This field is required",
    }
  ),
  diagnosis: z.object({
    description: z.string().min(1, { message: "This field is required" }),
    startDate: z.string().refine((dateString) => {
      const date = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }),
  }),

  chiefComplaint: z.string().min(1, { message: "This field is required" }),
  healthConcerns: z.string().min(1, { message: "This field is required" }),
  subjectiveNote: z.string().min(1, { message: "This field is required" }),
  objectiveNote: z.string().min(1, { message: "This field is required" }),
  assessmentNote: z.string().min(1, { message: "This field is required" }),
  physicalExamination: z.object({
    temperature: z.string().min(1, { message: "This field is required" }),
    bloodPressure: z.string(),
    weight: z.number().int().min(1, { message: "This field is required" }),
    height: z.number().int().min(1, { message: "This field is required" }),
    pulse: z.number().int().min(1, { message: "This field is required" }),
  }),
});
export type State = {
  errors?: {
    visitType?: string[];
    department?: string[];
    diagnosis?: {
      description?: string[];
      startDate?: string[];
    };
    physicalExamination?: {
      temperature?: string[];
      bloodPressure?: string[];
      weight?: number[];
      height?: number[];
      pulse?: number[];
    };
    chiefComplaint?: string[];
    healthConcerns?: string[];
    subjectiveNote?: string[];
    objectiveNote?: string[];
    assessmentNote?: string[];
  };
  message?: string;
  status?: string;
  results?: {};
};

export async function consultAi(prevState: State, formData: FormData) {
  const url = process.env.API_URL;
  const token = cookies().get("session")?.value;
  if (!url || !token) {
    console.error("API_URL or API_TOKEN is not set in environment variables");
    return {
      message: "Server configuration error. Please contact support.",
    };
  }

  console.log("Validating form data...");
  const validatedFields = FormSchema.safeParse({
    visitType: formData.get("visitType"),
    department: formData.get("department"),
    diagnosis: {
      description: formData.get("description"),
      startDate: new Date().toISOString(),
    },
    physicalExamination: {
      temperature: formData.get("temperature"),
      bloodPressure:
        formData.get("systolicPressure") +
        "/" +
        formData.get("diastolicPressure") +
        " mmHg",
      weight: Number(formData.get("weight")),
      height: Number(formData.get("height")),
      pulse: Number(formData.get("pulse")),
    },
    chiefComplaint: formData.get("chiefComplaint"),
    healthConcerns: formData.get("healthConcerns"),
    subjectiveNote: formData.get("subjectiveNote"),
    objectiveNote: formData.get("objectiveNote"),
    assessmentNote: formData.get("assessmentNote"),
  });

  if (!validatedFields.success) {
    console.error("Form validation failed:", validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Failed to submit form. Please check the errors above and complete the form.",
      status: "Error",
    };
  }

  console.log(validatedFields.data);
  console.log("Form data validated successfully");
  let data;
  try {
    console.log("Sending request to API...");
    const response = await fetch(
      `${url}api/v1/medicalRecord/${formData.get("patientId")}/diagnostic`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validatedFields.data),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API failed:", response.status, errorBody);
      throw new Error(
        `Failed to submit Patient data: ${response.status} ${errorBody}`
      );
    }

    data = await response.json();
    console.log("API response:", data);
    revalidatePath(`/dashboard/${formData.get("patient")}`); // Update cached posts

    return {
      status: "Success",
      message: "AI consultation successfully!",
      results: data.result,
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      status: "Error",
      message: "An error occurred while submitting patient data.",
    };
  } finally {
    //   redirect(
    //     `/dashboard/${formData.get("patient")}/view-record/${
    //       data.medicalRecord.id
    //     }`
    //   ); // Navigate to the new post page
  }
}
