import GetPatientById from "@/features/Patient/GetPatientById";

export default async function PatientDetailsPage({
  params,
}: {
  params: { patient_id: string };
}) {
  const { patient_id } = params;
  const url = process.env.API_URL;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2YxNDkzYTc3MGZkZGVkOTE5N2U4YiIsImlhdCI6MTcyNTYzMTk4MCwiZXhwIjoxNzMzNDA3OTgwfQ.GBXSHIjXGl4nNQ5ra7EZPaaju--OAp7FMSlL0XnarFo";
  let data = await fetch(`${url}api/v1/users/patient/${patient_id}`, {
    method: "GET", // You can change this to POST, PUT, etc. depending on your needs
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  let currentPatient = await data.json();
  console.log(currentPatient);
  return (
    <main className="flex-1 p-8 overflow-auto">
      <GetPatientById patient={currentPatient.currentPatient} />
    </main>
  );
}
