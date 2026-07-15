import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-display-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Harshwardhan & Bhumika — We're Getting Married!",
  description:
    "Harshwardhan & Bhumika invite you to celebrate their wedding on the 11th & 12th of November. Find the schedule, venue, dress code, and RSVP.",
  openGraph: {
    title: "Harshwardhan & Bhumika",
    description: "request the honour of your presence at their wedding celebrations.",
    type: "website",
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
      className={`${inter.variable} ${cormorant.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full text-text-primary selection:bg-accent selection:text-white font-sans">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
