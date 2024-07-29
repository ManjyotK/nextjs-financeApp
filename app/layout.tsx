import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import SiteNav from "@/app/ui/siteNav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faia",
  description: "Track all your expenses in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <SiteNav />
            <div className="p-6 md:overflow-y-auto md:px-12">{children}</div>
        </NextUIProvider>
      </body>
    </html>
  );
}
