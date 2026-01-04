import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smoothr — Clean paved-road navigation",
  description: "Navigation that avoids dirt roads by default.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
