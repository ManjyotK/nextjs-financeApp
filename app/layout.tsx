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

/**
 * RootLayout component is the main layout component for the application.
 * It wraps the entire application with NextUIProvider and SiteNav components.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The children to be rendered.
 * @return {JSX.Element} The root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Render the root layout component
  return (
    // HTML element with lang attribute set to "en"
    <html lang="en">
      <body>
        {/* NextUIProvider component from @nextui-org/react */}
        <NextUIProvider>
          {/* SiteNav component */}
          <SiteNav />
          {/* Div element with class names for padding and overflow styling */}
          <div className="p-6 md:overflow-y-auto md:px-12">
            {/* Render the children */}
            {children}
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
