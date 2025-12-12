import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopSphere • Product Listing",
  description:
    "Responsive product listing experience with SSR, filtering, and auth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-surface-muted`}>
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 pb-14 pt-8">{children}</main>
      </body>
    </html>
  );
}
