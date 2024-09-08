"use server";

import { generateRandomString } from "@/lib/utils";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
const FormSchema = z.object({
  firstName: z.string().min(1, { message: "This field is required" }),
  lastName: z.string().min(1, { message: "This field is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(10, { message: "Invalid phone number" }),
  gender: z.enum(["Male", "Female", "Others"], {
    required_error: "Please select a gender",
  }),
  occupation: z.string().min(1, { message: "This field is required" }),
  ethnic: z.enum(["Igbo", "Yoruba", "Hausa", "Others"], {
    required_error: "Please select an ethnic group",
  }),
  religion: z.enum(["Islam", "Christian", "Traditional beliefs"], {
    required_error: "Please select a Religion",
  }),
  maritalStatus: z.enum(["Married", "Single", "Divorced"], {
    required_error: "Please select a Marital Status",
  }),
  password: z.string().min(6, { message: "Please enter your password" }),
  passwordConfirm: z.string().min(6, { message: "Please enter your password" }),
  active: z.boolean(),
  dateOfBirth: z.string(),
  role: z.string(),
  homeAddress: z.string().min(1, { message: "This field is required" }),
  medicalBackground: z.object({
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
      required_error: "Please selecta blood group",
    }),
    genotype: z.enum(["AA", "AS", "AC", "AD", "AE", "AO", "SS", "SC", "SD"], {
      required_error: "Please selecta blood group",
    }),
  }),
});

export type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phoneNumber?: string[];
    gender?: string[];
    occupation?: string[];
    ethnic?: string[];
    religion?: string[];
    maritalStatus?: string[];
    active?: boolean[];
    dataOfBirth?: string[];
    role?: string[];
    homeAddress?: string[];
    medicalBackground?: {
      bloodGroup?: string[];
      genotype?: string[];
    };
    message?: string[];
  };
  message?: string | null;
};

export async function createPatient(prevState: State, formData: FormData) {
  const url = process.env.API_URL;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2YxNDkzYTc3MGZkZGVkOTE5N2U4YiIsImlhdCI6MTcyNTgyODg4MSwiZXhwIjoxNzMzNjA0ODgxfQ.5dH3tymXAMrkW7VvuX1ORVK36-02GCCu_FCWCcM0m74";
  const generatedPass = generateRandomString();
  if (!url || !token) {
    console.error("API_URL or API_TOKEN is not set in environment variables");
    return {
      message: "Server configuration error. Please contact support.",
    };
  }

  console.log("Validating form data...");
  const validatedFields = FormSchema.safeParse({
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phoneNumber: formData.get("phoneNumber"),
    gender: formData.get("gender"),
    occupation: formData.get("occupation"),
    ethnic: formData.get("ethnic"),
    religion: formData.get("religion"),
    maritalStatus: formData.get("maritalStatus"),
    active: true,
    dateOfBirth: formData.get("dateOfBirth"),
    role: "patient",
    password: generatedPass,
    passwordConfirm: generatedPass,
    homeAddress: formData.get("homeAddress"),
    medicalBackground: {
      bloodGroup: formData.get("bloodGroup"),
      genotype: formData.get("genotype"),
    },
  });

  if (!validatedFields.success) {
    console.error("Form validation failed:", validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to submit form. Please check the errors above.",
    };
  }

  console.log("Form data validated successfully");

  try {
    console.log("Sending request to API...");
    const response = await fetch(`${url}api/v1/users/create_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API failed:", response.status, errorBody);
      throw new Error(
        `Failed to submit Patient data: ${response.status} ${errorBody}`
      );
    }

    const data = await response.json();
    console.log("API response:", data);
    revalidatePath("/dashboard/all-patient"); // Update cached posts
    return {
      message: "Patient data submitted successfully!",
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      message: "An error occurred while submitting user data.",
    };
  } finally {
    redirect(`/dashboard/all-patient`); // Navigate to the new post page
  }
}
