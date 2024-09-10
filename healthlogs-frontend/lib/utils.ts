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
// Return duration
export function timeDifference(startTime: any, endTime: any) {
  // Split the time strings into hours and minutes
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  // Convert the times to minutes
  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  // Calculate the difference
  const differenceInMinutes = endTotalMinutes - startTotalMinutes;

  return differenceInMinutes;
}
export function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function convertToDateTime(
  timeString: string,
  dateString: string | null = null
): Date {
  // If no dateString is provided, use the current date
  const date: Date = dateString ? new Date(dateString) : new Date();

  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(":").map(Number);

  // Set the hours, minutes, and seconds on the date object
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0); // Optional, set seconds to 0

  return date;
}
export function extractTimeFromDate(dateString: string): string {
  // Create a Date object from the input string
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string provided");
  }

  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
