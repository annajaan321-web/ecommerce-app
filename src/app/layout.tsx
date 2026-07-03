import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roiser E-Commerce",
  description: "Roiser storefront with an admin dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
