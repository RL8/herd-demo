import type { Metadata } from "next";
import { VariantProvider } from "@/lib/variants";
import "./globals.css";

export const metadata: Metadata = {
  title: "HERDMind App Evolution Hub",
  description: "Visualize the future of HERDMind while optimizing the current Adalo infrastructure",
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

