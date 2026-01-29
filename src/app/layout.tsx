import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CurrencyProvider } from "@/components/logic/CurrencyContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eduk8u Labuan | Intelligence OS",
  description: "Next-gen AI Dual-Intelligence Platform for Wealth & Career Simulations. Predict your financial future with capital & academic intelligence.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eduk8u.labuan',
    title: 'Eduk8u Labuan | Intelligence OS',
    description: 'Simulate your wealth and career path with AI-driven intelligence.',
    siteName: 'Eduk8u Labuan',
  },
  keywords: ['AI Investment', 'Career Simulation', 'Wealth Management', 'Labuan Finance', 'Education ROI'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-navy-900 text-white selection:bg-accent-blue/30 selection:text-accent-blue`}
      >
        <CurrencyProvider>
          <Header />
          {children}
          <Footer />
        </CurrencyProvider>
      </body>
    </html>
  );
}
