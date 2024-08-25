import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthlogs Auth",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex w-full h-screen justify-center items-center">
        <div className="w-full md:w-1/2 px-10">{children}</div>
        <div className="h-screen hidden md:block w-1/2 bg-[#57BCD6]"></div>
      </body>
    </html>
  );
}
