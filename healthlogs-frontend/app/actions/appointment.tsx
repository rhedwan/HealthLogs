"use server";

import { generateRandomString } from "@/lib/utils";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const FormSchema = z.object({
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
});
