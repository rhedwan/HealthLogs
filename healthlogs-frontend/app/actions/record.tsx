"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const MedicationSchema = z.object({
  name: z.string().min(1, { message: "Medication name is required" }),
  sig: z.string().min(1, { message: "Sig is required" }),
  startDate: z.string({ message: "Invalid date format" }),
  prescriptionDetails: z.object({
    recorded: z.string({ message: "Invalid date format" }),
    prescriber: z.string().min(1, { message: "Prescriber is required" }),
    refills: z.number().int().min(0),
    quantity: z.number().int().min(1),
  }),
});

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
  medications: z.array(MedicationSchema),
  createdBy: z.string().min(1, { message: "This field is required" }),
});
export type State = {
  errors?: {
    patient?: string[];
    visitType?: string[];
    department?: string[];
    diagnosis?: {
      description?: string[];
      startDate?: string[];
    };
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
    subjectiveNote?: string[];
    objectiveNote?: string[];
    assessmentNote?: string[];
    medications?: {
      name?: string[];
      sig?: string[];
      startDate?: string[];
      prescriptionDetails?: {
        recorded?: string[];
        prescriber?: string[];
        refills?: string[];
        quantity?: string[];
      };
    }[];
    createdBy?: string[];
  };
  message?: string;
  status?: string;
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
  const medicationsData = JSON.parse(formData.get("medications") as string);
  const validatedFields = FormSchema.safeParse({
    patient: formData.get("patient"),
    visitType: formData.get("visitType"),
    department: formData.get("department"),
    diagnosis: {
      description: formData.get("description"),
      startDate: new Date().toISOString(),
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
    medications: medicationsData,
    chiefComplaint: formData.get("chiefComplaint"),
    healthConcerns: formData.get("healthConcerns"),
    subjectiveNote: formData.get("subjectiveNote"),
    objectiveNote: formData.get("objectiveNote"),
    assessmentNote: formData.get("assessmentNote"),
    createdBy: formData.get("createdBy"),
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
    revalidatePath(`/dashboard/patients/${formData.get("patient")}`); // Update cached posts

    return {
      status: "Success",
      message: "Patient Record created successfully!",
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      status: "Error",
      message: "An error occurred while submitting user data.",
    };
  } finally {
    redirect(
      `/dashboard/patients/${formData.get("patient")}/view-record/${
        data.medicalRecord.id
      }`
    ); // Navigate to the new post page
  }
}
