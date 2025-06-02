import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "East Syriac Breviary (Hudra)",
  description:
    "Digital collection of East Syriac liturgical texts (Hudra) from the Assyrian Church of the East, Chaldean Catholic Church, and Syro-Malabar Church.",
  keywords:
    "East Syriac, Hudra, Breviary, Assyrian Church, Chaldean Church, Syro-Malabar Church, liturgical texts",
  authors: [{ name: "East Syriac Breviary Project" }],
  openGraph: {
    title: "East Syriac Breviary (Hudra)",
    description:
      "Digital collection of East Syriac liturgical texts from three major churches.",
    type: "website",
    url: "https://www.hudra.day",
    images: [
      {
        url: "https://www.hudra.day/images/sliwa.png",
        alt: "East Syriac Breviary (Hudra)",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#8A1538",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SC1ZGX8R64"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SC1ZGX8R64');
          `}
        </Script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
