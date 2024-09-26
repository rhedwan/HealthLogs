import React from "react";
import { verifySession } from "@/lib/session";
import { ArrowLeft } from "lucide-react";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import BackButton from "@/components/system/BackButton";
interface RootLayoutProps {
  children: React.ReactNode;
  params: { patient_id: string };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const session = await verifySession();
  const { patient_id } = params;
  //   Previous page navigation
  const headersList = headers();
  const referer = headersList.get("referer");
  const url = process.env.API_URL;
  const token = cookies().get("session")?.value;
  let data = await fetch(`${url}api/v1/users/patient/${patient_id}`, {
    method: "GET", // You can change this to POST, PUT, etc. depending on your needs
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  let currentPatient = await data.json();
  let patient = currentPatient.currentPatient;

  return (
    <main className="flex-1 p-8 overflow-auto">
      <BackButton initialReferer={referer} />
      {children}
    </main>
  );
}
