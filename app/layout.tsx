import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
