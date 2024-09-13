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
  const userResponse = await fetch(`${url}api/v1/users/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const userData = await userResponse.json();
  return (
    // <main className="flex-1 p-8 overflow-auto">
    <GetDashboard data={data} userData={userData.user} />
    // </main>
  );
};

export default page;
