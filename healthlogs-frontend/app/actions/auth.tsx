"use server";

import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
});

export type State =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
export async function login(prevState: any, formData: FormData) {
  const url = process.env.API_URL;

  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    console.log("Sending request to API...");
    const response = await fetch(`${url}api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API failed:", response.status, errorBody);
      throw new Error(`Failed to login: ${response.status} ${errorBody}`);
    }

    const data = await response.json();
    console.log("API response:", data);
    createSession(data.token);
    return {
      message: "Loged in successfully!",
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      message: "An error occurred while logging in.",
    };
  } finally {
    redirect(`/dashboard`); // Navigate to the new post page
  }
}
export async function logout() {
  deleteSession();
  console.log("Log out successful");
  redirect("/auth/login");
}
