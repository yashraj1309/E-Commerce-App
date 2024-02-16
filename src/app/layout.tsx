import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import NavbarMain from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Amazona",
  description: "Amazona for A-Z shopping app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavbarMain />
        {children}
      </body>
    </html>
  );
}
