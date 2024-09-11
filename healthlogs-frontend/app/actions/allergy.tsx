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
  comment: z.string().min(1, { message: "This field is required" }),
  reaction: z.string().min(1, { message: "This field is required" }),
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
    date: "2022-11-10T00:00:00Z",
    severity: formData.get("severity"),
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
    revalidatePath(`/dashboard/${data.allergy.patient}`); // Update cached posts
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
