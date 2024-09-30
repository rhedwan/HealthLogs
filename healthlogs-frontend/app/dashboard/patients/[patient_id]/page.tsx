import { cookies } from "next/headers";
import GetPatientById from "./GetPatientById";

export default async function PatientDetailsPage({
  params,
}: {
  params: { patient_id: string };
}) {
  const { patient_id } = params;
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
  return (
    <main className="flex-1 p-8 overflow-auto">
      <GetPatientById patient={currentPatient.currentPatient} />
    </main>
  );
}
