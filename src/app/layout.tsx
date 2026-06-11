import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Advocate S Rajasekar | Legal Consultation & Notary Services Rameswaram",
  description:
    "Professional legal consultation, notary public services, and land registration assistance in Rameswaram, Tamil Nadu. Guided by Advocate S Rajasekar at Waram Documentation Office.",
  keywords: [
    "Advocate S Rajasekar",
    "Lawyer in Rameswaram",
    "Waram Documentation Office",
    "Notary Public Rameswaram",
    "Land Registration Rameswaram",
    "Property Documentation Tamil Nadu"
  ],
  authors: [{ name: "Advocate S Rajasekar" }],
  openGraph: {
    title: "Advocate S Rajasekar | Legal Consultation, Notary & Land Registration Services",
    description: "Professional legal consultation, notary public attestation, and land registration in Rameswaram.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 select-none selection:bg-gold-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
