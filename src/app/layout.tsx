import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Zumeo",
    absolute: "Zumeo",
  },
  description:
    "Zumeo is the easiest way to create a proffessional resume that will help you land your dream job.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased")}>
        <Navbar />
        <main className="min-h-[calc(100vh-160px)] w-full bg-zinc-50">
          {children}
        </main>
      </body>
    </html>
  );
}
