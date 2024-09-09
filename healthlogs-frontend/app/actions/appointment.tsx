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

const FormSchema = z
  .object({
    patientId: z.string().min(1, { message: "This field is required" }),
    duration: z.number().min(1, { message: "Invalid duration" }),
    appointmentType: z.enum(
      [
        "Follow-Up Visit",
        "New Patient Visit",
        "Nursing Only",
        "Urgent Visit",
        "Video Visit",
        "Wellness Exam",
      ],
      {
        required_error: "Please select an appointment type",
      }
    ),
    date: z.string({
      required_error: "A date is required.",
    }),
    startTime: z.date({
      required_error: "Start time is required.",
    }),
    endTime: z.date({
      required_error: "End time is required.",
    }),
  })
  .refine(
    (data) => {
      const start = data.startTime;
      const end = data.endTime;
      return end > start;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

export type State = {
  errors?: {
    patientId?: string[];
    date?: string[];
    startTime?: Date[];
    endTime?: Date[];
    duration?: number[];
    message?: string[];
  };
  message?: string | null;
};
export async function createAppointment(prevState: State, formData: FormData) {
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
    patientId: formData.get("patientId"),
    date: formData.get("date"),
    appointmentType: formData.get("appointmentType"),
    startTime: convertToDateTime(
      formData.get("startTime") as string,
      formData.get("date") as string
    ),
    endTime: convertToDateTime(
      formData.get("endTime") as string,
      formData.get("date") as string
    ),
    duration: timeDifference(
      formData.get("startTime"),
      formData.get("endTime")
    ),
    status: "Active",
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
    const response = await fetch(`${url}api/v1/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Failed to submit Appointment data: ${response.status} ${errorBody}`
      );
    }

    const data = await response.json();
    console.log(data);
    revalidatePath("/dashboard/appointment"); // Update cached posts
    return {
      message: "Appointment added successfully!",
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      message: "An error occurred while submitting Appointment data.",
    };
  } finally {
    redirect(`/dashboard/appointment`); // Navigate to the new post page
  }
}
