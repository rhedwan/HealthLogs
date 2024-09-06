import React from "react";
import SideBar from "./SideBar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
