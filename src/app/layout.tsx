import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TRIPS",
};

import Navbar from "../components/byMe/Navbar";
import Footer from "../components/byMe/Footer";
import AuthModal from "../components/byMe/AuthModal";
import ThemeWrapper from "../components/ThemeWrapper";
import { Toaster } from "sonner";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
      </head>
      <body className="bg-[#f5f0e8] text-[#1a1a1a] min-h-screen flex flex-col antialiased">
        <ThemeWrapper>
          <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto relative pt-4">
            <Navbar />
            <main className="grow w-full">
              {children}
            </main>
            <Footer />
            <AuthModal />
            <Toaster richColors position="top-right" />
          </div>
        </ThemeWrapper>
      </body>
    </html>
  );
}
