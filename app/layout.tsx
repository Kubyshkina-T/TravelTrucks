import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header/Header";
import ReactQueryProvider from "@/components/ReactQueryProvider/ReactQueryProvider";

import "./globals.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "TravelTrucks",
  description:
    "TravelTrucks is a camper rental service where users can browse campers, filter results, view details, read reviews, and send booking requests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <ReactQueryProvider>
          <Header />
          {children}
          <Toaster position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
