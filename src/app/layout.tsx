import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Climetrics",
  description: "Climate Daily Life – B2C Demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
