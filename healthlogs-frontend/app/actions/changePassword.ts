"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { logout } from "./auth";

const FormSchema = z
  .object({
    currentPassword: z.string(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/\d/, { message: "Password must contain at least one number." }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["confirmPassword"], // Error path for confirmPassword field
    message: "Passwords do not match.",
  });

export type PasswordState = {
  errors?: {
    currentPassword?: string[];
    password?: string[];
    passwordConfirm?: string[];
  };
  message?: string;
};
export async function updatePassword(
  prevState: PasswordState,
  formData: FormData
) {
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
    currentPassword: formData.get("currentPassword"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  });

  if (!validatedFields.success) {
    console.error("Form validation failed:", validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to Update password, Please check the errors above.",
    };
  }

  console.log("Form data validated successfully");
  console.log(validatedFields);
  try {
    console.log("Sending request to API...");
    const response = await fetch(`${url}api/v1/users/updatePassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Failed to update Password ${response.status} ${errorBody}`
      );
    }

    const data = await response.json();
    console.log(data);
    revalidatePath("/dashboard/settings"); // Update cached posts
    logout();
    return {
      message: "Password updated successfully!",
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      message: "An error occurred while updating password",
    };
  } finally {
    redirect(`/auth/login`); // Navigate to the new post page
  }
}
