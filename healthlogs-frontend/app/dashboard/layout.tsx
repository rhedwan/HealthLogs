import React from "react";
import SideBar from "./SideBar";
import { verifySession } from "@/lib/session";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await verifySession();

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          <SideBar />
          {children}
        </div>
      </body>
    </html>
  );
}
