import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-[#0e1113]">
          <Navbar />
          <div className="flex justify-center items-center pt-14">
            <SideBar />
            <div className="w-full h-screen">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
