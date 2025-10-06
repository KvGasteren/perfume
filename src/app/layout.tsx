import "./globals.css";
import type { Metadata } from "next";
import SessionProviderWrapper from "./session-provider";

export const metadata: Metadata = {
  title: "Perfurmula",
  description: "Manage perfume formulas, ingredients, and allergens.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
