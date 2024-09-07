import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, format: string): string {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  // Replace format tokens with actual date parts
  const formattedDate = format
    .replace("DD", day)
    .replace("MM", month)
    .replace("YYYY", String(year))
    .replace("YY", String(year).slice(-2));

  return formattedDate;
}



export const baseUrl = 'https://api.healthlogs.online/api/v1'
