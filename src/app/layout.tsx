import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "../component/SmoothScrollProvider";
import SplashScreen from "../component/layout/SplashScreen";
import { ThemeProvider } from "../component/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nahid Hossain - Crafting Web Experiences",
  description: "Crafting responsive, modern, and user-friendly web experiences using React, Next.js, and cutting-edge frontend technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <SmoothScrollProvider>
          <ThemeProvider>
            <SplashScreen>
              {children}
            </SplashScreen>
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
