import React from "react";
import { getUser } from "@/app/actions/user";
import GetSettingsForm from "@/app/dashboard/settings/GetSettingsForm";

export default async function SettingsPage() {
  const user = await getUser();
  return <GetSettingsForm user={user.user} />;
}
