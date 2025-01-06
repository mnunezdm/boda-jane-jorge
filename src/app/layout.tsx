import type { Metadata } from "next";
import { Dancing_Script, Lora } from "next/font/google";
import "./globals.css";

const geistSans = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const geistMono = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boda de Jane y John",
  description: "Boda de Jane y John",
  robots: "noindex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
