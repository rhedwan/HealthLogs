"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const FormSchema = z.object({
  patient: z.string().min(1, { message: "This field is required" }),
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
  // diagnosis: z.object({
  //   description: z.string().min(1, { message: "This field is required" }),
  //   startDate: z.date().refine(
  //     (date) => {
  //       const today = new Date();
  //       today.setHours(0, 0, 0, 0);
  //       return date >= today;
  //     },
  //     {
  //       message: "Date must not be earlier than today",
  //     }
  //   ),
  // }),
  chiefComplaint: z.string().min(1, { message: "This field is required" }),
  healthConcerns: z.string().min(1, { message: "This field is required" }),
  physicalExamination: z.object({
    temperature: z.string().min(1, { message: "This field is required" }),
    bloodPressure: z.object({
      systolicPressure: z
        .number()
        .int()
        .min(1, { message: "This field is required" }),
      diastolicPressure: z
        .number()
        .int()
        .min(1, { message: "This field is required" }),
    }),
    weight: z.number().int().min(1, { message: "This field is required" }),
    height: z.number().int().min(1, { message: "This field is required" }),
    pulse: z.number().int().min(1, { message: "This field is required" }),
  }),
  createdBy: z.string().min(1, { message: "This field is required" }),
});
export type State = {
  errors?: {
    patient?: string[];
    visitType?: string[];
    department?: string[];
    // diagnosis?: {
    //   description?: string[];
    //   startDate?: Date[];
    // };
    physicalExamination?: {
      temperature?: string[];
      bloodPressure?: {
        systolicPressure?: number[];
        diastolicPressure?: number[];
      };
      weight?: number[];
      height?: number[];
      pulse?: number[];
    };
    chiefComplaint?: string[];
    healthConcerns?: string[];
    createdBy?: string[];
    message?: string[];
  };
  message?: string | number | null;
};

export async function createRecord(prevState: State, formData: FormData) {
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
    patient: formData.get("patient"),
    visitType: formData.get("visitType"),
    department: formData.get("department"),
    diagnosis: {
      description: formData.get("description"),
      startDate: formData.get("startDate"),
    },
    physicalExamination: {
      temperature: formData.get("temperature"),
      bloodPressure: {
        systolicPressure: Number(formData.get("systolicPressure")),
        diastolicPressure: Number(formData.get("diastolicPressure")),
      },
      weight: Number(formData.get("weight")),
      height: Number(formData.get("height")),
      pulse: Number(formData.get("pulse")),
    },
    chiefComplaint: formData.get("chiefComplaint"),
    healthConcerns: formData.get("healthConcerns"),
    createdBy: "66cf1493a770fdded9197e8b",
  });

  if (!validatedFields.success) {
    console.error("Form validation failed:", validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to submit form. Please check the errors above.",
    };
  }

  console.log("Form data validated successfully");
  let data;
  try {
    console.log("Sending request to API...");
    const response = await fetch(
      `${url}api/v1/users/${formData.get("patient")}/medicalRecords`,
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
      message: "Patient Record created successfully!",
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      message: "An error occurred while submitting user data.",
    };
  } finally {
    redirect(
      `/dashboard/${formData.get("patient")}/view-record/${
        data.medicalRecord.id
      }`
    ); // Navigate to the new post page
  }
}
