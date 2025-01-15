import type { Metadata } from "next";
import { Open_Sans, Courgette } from "next/font/google";
import "@/app/globals.css";

const openSans = Open_Sans<"--font-open-sans">({
  variable: "--font-open-sans",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: "variable",
});

const courgette = Courgette<"--font-courgette-400">({
  variable: "--font-courgette-400",
  subsets: ["latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Boda de Jane y Jorge",
  description: "Boda de Jane y Jorge",
  robots: "noindex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${courgette.variable} ${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
