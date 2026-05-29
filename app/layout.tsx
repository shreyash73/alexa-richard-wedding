import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Alexa & Richard — We're Getting Married!",
  description: "Alexa & Richard are inviting you to their wedding! Check the date, venue details, dress code, and confirm your attendance.",
  openGraph: {
    title: "Alexa & Richard",
    description: "are inviting you to their wedding!",
    type: "website",
    url: "https://webgency.tilda.ws/template6",
    images: [
      {
        url: "https://static.tildacdn.net/tild3733-3133-4232-b033-623736623262/romantic-moments-bea.png",
        width: 1200,
        height: 630,
        alt: "Alexa & Richard Wedding",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg-primary text-text-primary selection:bg-accent selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
