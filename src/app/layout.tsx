import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
  title: "Advocate S Rajasekar | Advocate & Notary Public",
  description:
    "Professional legal consultation, notary public services, and land registration at WARAM DOCUMENTATION OFFICE in Rameswaram, Tamil Nadu. Guided by Advocate S Rajasekar.",
  keywords: [
    "Advocate S Rajasekar",
    "Advocate & Notary Public",
    "Waram Documentation Office Rameswaram",
    "Notary Public Rameswaram",
    "Land Registration Rameswaram",
    "Property Documentation Tamil Nadu"
  ],
  authors: [{ name: "Advocate S Rajasekar" }],
  openGraph: {
    title: "Advocate S Rajasekar | Advocate & Notary Public",
    description: "Professional legal consultation, notary public services, and land registration at Waram Documentation Office.",
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
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppFAB />
        </LanguageProvider>
      </body>
    </html>
  );
}
