import React from "react";
import { verifyLoggedIn } from "@/lib/session";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const loggedIn = await verifyLoggedIn();
  return <main>{children}</main>;
}
