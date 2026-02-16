import type { Metadata } from "next";
import { Archivo, Open_Sans } from "next/font/google";
import "./globals.sass";

const bodyFont = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const headingFont = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Stinson Orthodontics",
  description: "Homepage migrated to Tina CMS JSON.",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>{children}</body>
    </html>
  );
}
