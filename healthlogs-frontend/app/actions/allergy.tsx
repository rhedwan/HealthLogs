"use server";

import {
  convertToDateTime,
  generateRandomString,
  timeDifference,
} from "@/lib/utils";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const FormSchema = z.object({
  allergen: z.enum(["Drug", "Food", "Environment"], {
    required_error: "Please select a severity level",
  }),
  allergenInfo: z.string().min(1, { message: "This field is required" }),
  comment: z.string().min(1, { message: "This field is required" }),
  reaction: z.enum(
    [
      "Unknown",
      "Anaphylaxis",
      "Bloating/gas",
      "Bradycardia",
      "Chest Pain",
      "Conjunctivitis",
      "Cough",
      "Diarrhea",
      "Difficulty speaking or swallowing",
      "Dizziness/Lightheadedness",
      "Facial swelling",
      "Hives",
      "Irregular Heartbeat",
      "Itchiness",
      "Loss of consciousness",
      "Nausea",
      "Pain/cramping",
      "Patchy swelling-skin",
      "Rash - generalized",
      "Rash - localized",
      "Respiratory Distress",
      "Runny nose",
      "Shortness of breath",
      "Tachycardia",
      "Tongue swelling",
      "Vomiting",
      "Wheezing",
      "Other",
    ],
    { required_error: "Please select a reaction" }
  ),
  severity: z.enum(["Very Mild", "Mild", "Moderate", "Severe"], {
    required_error: "Please select a severity level",
  }),
  onset: z.enum(["Childhood", "Adulthood"], {
    required_error: "Please select an onset time",
  }),
  date: z.string({
    required_error: "A date is required.",
  }),
  status: z.string(),
  patientId: z.string(),
});

export type AllergyState = {
  errors?: {
    allergen?: string[];
    reaction?: string[];
    date?: string[];
    severity?: string[];
    onset?: string[];
    comment?: string[];
    allergenInfo?: string[];
    status?: string[];
    patientId?: string[];
  };
  message?: string | null;
};
export async function AddAllergy(prevState: AllergyState, formData: FormData) {
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
    allergen: formData.get("allergen"),
    date: new Date().toISOString().split("T")[0] + "T00:00:00Z",
    severity: formData.get("severity"),
    allergenInfo: formData.get("allergenInfo"),
    onset: formData.get("onset"),
    comment: formData.get("comment"),
    status: "Active",
    reaction: formData.get("reaction"),
    patientId: formData.get("patientId"),
  });

  if (!validatedFields.success) {
    console.error("Form validation failed:", validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to submit form. Please check the errors above.",
    };
  }

  console.log("Form data validated successfully");
  console.log(validatedFields);
  try {
    console.log("Sending request to API...");
    const response = await fetch(
      `${url}api/v1/allergy/${formData.get("patientId")}`,
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
      throw new Error(
        `Failed to submit new allergy: ${response.status} ${errorBody}`
      );
    }

    const data = await response.json();
    console.log(data);
    revalidatePath(`/dashboard/patients/${data.allergy.patient}`); // Update cached posts
    return {
      message: "Allergy added successfully!",
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      message: "An error occurred while submitting new Allergy.",
    };
  } finally {
    // redirect(`/dashboard/${patientId}`); // Navigate to the new post page
  }
}
