import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "OSCEready — AI-Powered OSCE Practice for Australian Medical Students",
  description:
    "Practice OSCE stations with realistic simulated patients, structured marking schemes, and expert feedback. Designed for Australian medical students preparing for AMC, clinical years, and intern examinations.",
  keywords: "OSCE, medical education, Australia, AMC, clinical skills, simulated patient, medical students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
