import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HydrationWrapper from "../components/HydrationWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rohman Profile",
  description:
    "A minimalist, Apple-style glassmorphism portfolio website for a Full Stack Web Developer.",
};

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning />
      <body className={inter.className} suppressHydrationWarning>
        <HydrationWrapper>{children}</HydrationWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
