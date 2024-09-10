import GetDashboard from "@/app/dashboard/GetDashboard";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const url = process.env.API_URL;
  const token = cookies().get("session")?.value;

  const response = await fetch(`${url}api/v1/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return (
    // <main className="flex-1 p-8 overflow-auto">
    <GetDashboard data={data} />
    // </main>
  );
};

export default page;
