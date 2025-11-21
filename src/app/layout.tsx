import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../../lib/fontawesome";
import LayoutWrapper from "./components/LayoutWrapper";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@fortawesome/fontawesome-svg-core/styles.css";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "./components/CartSidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuantamStore",
  description: "Smarter shopping, seamless experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <CartSidebar
            items={[
              {
                id: 1,
                name: "ASUS TUF Gaming VG259Q3A Monitor",
                imageUrl: "/images/ASUS TUF VG259Q3A Full HD 24.5.jpg",
                price: 299,
              },
              {
                id: 2,
                name: "Intel Core i5-14400 Processor",
                imageUrl: "/images/Intel Core i5-14400F.jpg",
                price: 220,
              },
              {
                id: 3,
                name: "CyberPowerPC Gamer Master Desktop",
                imageUrl: "/images/CyberPowerPC Gamer Master Gaming PC.jpg",
                price: 1200,
              },
              {
                id: 4,
                name: "GIGABYTE GeForce RTX 5060",
                imageUrl: "/images/GIGABYTE GeForce RTX 5060.jpg",
                price: 450,
              },
            ]}
          />
        </CartProvider>
      </body>
    </html>
  );
}
