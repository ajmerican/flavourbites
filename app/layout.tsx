import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://flavourbites.us"),
  title: {
    default: "Flavour Bites USA — Premium Café Collection",
    template: "%s | Flavour Bites USA"
  },
  description:
    "Premium café-inspired beverage blends, pistachio kunafa chocolate and gift collections, made in Canada and available in the United States.",
  openGraph: {
    title: "Flavour Bites USA",
    description: "A premium café moment, made for home.",
    url: "https://flavourbites.us",
    siteName: "Flavour Bites USA",
    images: [{ url: "/images/gift-box-design.png" }],
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
