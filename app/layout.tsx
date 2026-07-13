import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Inter, Poppins } from "next/font/google";
import { dbConnect } from "@/service/mongo";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], variable: "--font-poppins", weight: ['400', '500', '600', '700', '800', '900'] })

export const metadata = {
  title: "EduConnect - World's Best Learning Platform",
  description: "Connect with the best educators and institutions around the world.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await dbConnect();


  return (
    <html
      lang="en"
      className={cn(inter.className, poppins.className)}
      suppressHydrationWarning
    >
      <body className="min-h-full container mx-auto flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <nav>

          </nav>
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
