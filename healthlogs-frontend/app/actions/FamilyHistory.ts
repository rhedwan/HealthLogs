"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const FormSchema = z.object({
  description: z.string().min(1, { message: "This field is required" }),
  relatives: z
    .array(z.string())
    .min(1, { message: "At least one relative is required" }),
});

export type State = {
  errors?: {
    description?: string[];
    relatives?: string[];
  };
  message?: string | null;
};

export async function AddFamilyHistory(prevState: State, formData: FormData) {
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
    relatives: formData.getAll("relatives"),
    description: formData.get("description"),
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
    console.log(
      `${url}api/v1/medicalRecord/${formData.get("patientId")}/familyRecord`
    );
    const response = await fetch(
      `${url}api/v1/medicalRecord/${formData.get("patientId")}/familyRecord`,
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
        `Failed to submit new family history: ${response.status} ${errorBody}`
      );
    }

    const data = await response.json();
    revalidatePath(`/dashboard/patients/${formData.get("patientId")}`);
    return {
      message: "Family History added successfully!",
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      message: "An error occurred while submitting new Family History.",
    };
  }
}
