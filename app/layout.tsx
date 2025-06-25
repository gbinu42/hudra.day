import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Hudra - Digital Archive of Church of the East Liturgical Texts",
    template: "%s | Hudra",
  },
  description:
    "Hudra.day - Digital archive of East Syriac liturgical texts from Assyrian Church of the East, Chaldean Catholic Church, and Syro-Malabar Church. Free access to ancient manuscripts and online Syriac text editor by Hendo Academy.",
  keywords: [
    "Hudra",
    "East Syriac liturgical texts",
    "Church of the East",
    "Assyrian Church",
    "Chaldean Catholic Church",
    "Syro-Malabar Church",
    "Syriac manuscripts",
    "liturgical archive",
    "Hendo Academy",
    "East Syriac editor",
    "Karshon",
    "Garshuni Malayalam",
    "East Syriac",
    "Breviary",
    "Assyrian Church of the East",
    "Chaldean Catholic Church",
    "Syro-Malabar Church",
    "liturgical texts",
    "Syriac manuscripts",
    "Eastern Christianity",
    "liturgy",
    "prayer books",
  ],
  authors: [{ name: "Hendo Academy", url: "https://www.hendoacademy.org" }],
  creator: "Hendo Academy",
  publisher: "Hendo Academy",
  category: "Religion",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.hudra.day",
    siteName: "Hudra - Church of the East Liturgical Texts",
    title: "Hudra - Digital Archive of Church of the East Liturgical Texts",
    description:
      "Free digital archive of East Syriac liturgical texts from three major churches: Assyrian Church of the East, Chaldean Catholic Church, and Syro-Malabar Church. Access ancient manuscripts and use our online Syriac text editor.",
    images: [
      {
        url: "https://www.hudra.day/images/sliwa.png",
        width: 1200,
        height: 630,
        alt: "Hudra - East Syriac Liturgical Texts Archive",
        type: "image/png",
      },
      {
        url: "https://www.hudra.day/images/header.png",
        width: 1200,
        height: 630,
        alt: "Church of the East Liturgical Heritage",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hudra - Digital Archive of Church of the East Liturgical Texts",
    description:
      "Free digital archive of East Syriac liturgical texts from Assyrian, Chaldean, and Syro-Malabar churches. Includes online Syriac text editor.",
    site: "@HudraDay",
    creator: "@HendoAcademy",
    images: {
      url: "https://www.hudra.day/images/sliwa.png",
      alt: "Hudra - East Syriac Liturgical Texts",
    },
  },
  // Additional metadata for rich sharing
  other: {
    // Slack unfurling
    "slack-app-id": "A1234567890", // Replace with actual Slack app ID if available
    // LinkedIn
    "linkedin:owner": "hendo-academy",
    // WhatsApp
    "whatsapp:title": "Hudra - Church of the East Liturgical Texts",
    "whatsapp:description":
      "Free digital archive of East Syriac liturgical texts and manuscripts",
    "whatsapp:image": "https://www.hudra.day/images/sliwa.png",
    // Telegram
    "telegram:channel": "@hudraday", // Replace with actual channel if available
    // Discord
    "theme-color": "#8A1538",
  },
  alternates: {
    canonical: "https://www.hudra.day",
    languages: {
      "en-US": "https://www.hudra.day",
      "ar-SY": "https://www.hudra.day/ar", // If Arabic version exists
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://www.hudra.day"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#8A1538",
  colorScheme: "light",
  viewportFit: "cover",
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
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
