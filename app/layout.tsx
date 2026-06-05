import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bow Valley Cleaners | Canmore & Banff Cleaning Directory",
  description:
    "Find the perfect specialized cleaning service in the Canadian Rockies. Serving Canmore, Banff, Cochrane & Calgary — Airbnb turnovers, luxury homes, post-construction & more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
