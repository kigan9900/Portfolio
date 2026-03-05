import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kigan Patel | Young Developer & Creative Coder",
  description: "Personal portfolio of Kigan Patel, a 14-year-old developer passionate about web development, game dev, and creative coding.",
  keywords: ["Kigan Patel", "Young Developer", "Web Development", "React", "Next.js", "Portfolio", "Creative Coder"],
  authors: [{ name: "Kigan Patel" }],
  openGraph: {
    title: "Kigan Patel | Young Developer",
    description: "14-year-old developer passionate about building interactive web experiences",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kigan Patel | Young Developer",
    description: "14-year-old developer passionate about building interactive web experiences",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
