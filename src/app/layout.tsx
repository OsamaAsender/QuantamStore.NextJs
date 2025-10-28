import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../../lib/fontawesome";
import LayoutWrapper from "./components/LayoutWrapper";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@fortawesome/fontawesome-svg-core/styles.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuantamStore",
  description: "Smarter shopping, seamless experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
