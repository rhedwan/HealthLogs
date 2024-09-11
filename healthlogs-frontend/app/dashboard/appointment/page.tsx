import React from "react";
import GetAppointment from "./GetAppointment";
import { cookies } from "next/headers";

const AppointmentPage = async () => {
  const url = process.env.API_URL;
  const token = cookies().get("session")?.value;
  let data = await fetch(`${url}api/v1/dashboard/appointments`, {
    method: "GET", // You can change this to POST, PUT, etc. depending on your needs
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  let appointments_data = await data.json();
  console.log(appointments_data.metaData);
  return (
    <GetAppointment
      data={appointments_data.appointments}
      metaData={appointments_data.metaData}
    />
  );
};

export default AppointmentPage;
