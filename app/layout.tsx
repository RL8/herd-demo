import type { Metadata } from "next";
import { VariantProvider } from "@/lib/variants";
import "./globals.css";

export const metadata: Metadata = {
  title: "HERDMind® Session Planner",
  description: "Equine-facilitated session planning tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <VariantProvider>
          {children}
        </VariantProvider>
      </body>
    </html>
  );
}

