"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const getUser = async () => {
  const url = process.env.API_URL;
  const token = cookies().get("session")?.value;
  let data = await fetch(`${url}api/v1/users/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return await data.json();
};

const MAX_FILE_SIZE = 10000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/octet-stream",
];

const EditUserSchema = z.object({
  phoneNumber: z
    .string()
    .max(14, { message: "Please enter a valid NGN phone number" })
    .optional(),
  homeAddress: z
    .string()
    .min(1, { message: "This feild is required" })
    .optional(),
  photo: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type State = {
  errors?: {
    phoneNumber?: string[];
    homeAddress?: string[];
    photo?: string[];
  };
  message?: string;
  status?: string;
};

export async function updateUser(prevState: State, formData: FormData) {
  const url = process.env.API_URL;
  const token = cookies().get("session")?.value;

  const validatedFields = EditUserSchema.safeParse({
    phoneNumber: formData.get("phoneNumber"),
    homeAddress: formData.get("homeAddress"),
    photo: formData.get("photo"),
  });
  if (!validatedFields.success) {
    console.error("Form validation failed:", validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to submit form. Please check the errors above.",
    };
  }
  let photoFile = formData.get("photo");
  let payload: any = {
    phoneNumber: validatedFields.data.phoneNumber,
    homeAddress: validatedFields.data.homeAddress,
  };
  // @ts-ignore
  photoFile?.name !== "undefined" && (payload.photo = photoFile);
  console.log("Form data validated successfully");
  console.log(payload);
  try {
    console.log("Sending request to API...");
    const response = await fetch(`${url}api/v1/users/updateUser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API failed:", response.status, errorBody);
      throw new Error(
        `Failed to submit User data: ${response.status} ${errorBody}`
      );
    }

    const data = await response.json();
    console.log("API response:", data);
    revalidatePath("/dashboard/settings"); // Update cached posts
    return {
      status: "Success",
      message: "User data updated successfully!",
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      status: "Error",
      message: "An error occurred while submitting user data.",
    };
  }
}
