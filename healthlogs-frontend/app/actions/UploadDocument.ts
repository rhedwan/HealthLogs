"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function uploadFiles(formData: FormData, patientId: string) {
  const url = process.env.API_URL;
  const token = cookies().get("session")?.value;
  if (!url || !token) {
    console.error("API_URL or API_TOKEN is not set in environment variables");
    return {
      success: false,
      message: "Server configuration error. Please contact support.",
    };
  }

  const files = formData.getAll("files") as File[];
  console.log(
    "Files to upload:",
    files.map((f) => f.name)
  );
  if (files.length === 0) {
    return { success: false, message: "No files provided" };
  }

  try {
    console.log("Preparing request to API...");
    const apiFormData = new FormData();
    files.forEach((file, index) => {
      // Change 'files' to 'document'
      apiFormData.append(`images`, file, file.name);
    });

    console.log("Sending request to API...");
    const response = await fetch(
      `${url}api/v1/medicalRecord/${patientId}/document`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: apiFormData,
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API response: ${response.status} ${errorBody}`);
      throw new Error(
        `Failed to upload document: ${response.status} ${errorBody}`
      );
    }

    const data = await response.json();
    console.log("API response:", data);

    revalidatePath("/");
    revalidatePath(`/dashboard/patients/${patientId}`);

    return {
      success: true,
      message: `${files.length} file(s) uploaded successfully`,
    };
  } catch (error) {
    console.error("Error uploading files:", error);
    return { success: false, message: "Failed to upload files" };
  }
}
