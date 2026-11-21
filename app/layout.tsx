import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nigeria — government services, in plain English",
    template: "%s · Nigeria",
  },
  description:
    "Ask any question about Nigerian government services and get a plain answer with links to the official agency. Not an official government website.",
  metadataBase: new URL("https://naija-assist.cencori.app"),
  openGraph: {
    title: "Nigeria",
    description:
      "Any government service, one place, plain answers. Ask about NIN, passports, CAC, tax, JAMB and more.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <body>{children}</body>
    </html>
  );
}
