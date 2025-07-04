import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";

const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Zumeo",
    absolute: "Zumeo",
  },
  description:
    "Zumeo is the easiest way to create a professional resume that will help you land your dream job.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryClientProvider>
        <body
          className={cn(
            font.className,
            "h-full w-full overflow-x-hidden antialiased",
          )}
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <Toaster position="top-center" richColors />
            <main className="min-h-[calc(100vh-160px)] w-full bg-zinc-50">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </ReactQueryClientProvider>
    </html>
  );
}
