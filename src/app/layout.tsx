import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "./provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full ">
      <body className="w-full  h-screen ">
        <Providers>
          <main className="w-full h-full ">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
