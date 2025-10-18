import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hymns Archive",
  description:
    "Browse and explore the complete collection of East Syriac hymns from the Church of the East tradition. Access audio recordings, translations, and liturgical texts.",
  keywords: [
    "East Syriac hymns",
    "Church of the East hymns",
    "Assyrian hymns",
    "Chaldean hymns",
    "Syro-Malabar hymns",
    "liturgical hymns",
    "Syriac music",
    "hymn recordings",
    "liturgical music",
    "Eastern Christian hymns",
    "Syriac hymns",
    "Syro Malabar Syriac hymns",
  ],
  openGraph: {
    title: "Hymns Archive - Hudra",
    description:
      "Browse and explore the complete collection of East Syriac hymns from the Church of the East tradition. Access audio recordings, translations, and liturgical texts.",
    images: [
      {
        url: "https://hudra.day/images/hymns-archive.png",
        width: 1200,
        height: 630,
        alt: "Hymns Archive - East Syriac Liturgical Music",
        type: "image/png",
      },
    ],
  },
  twitter: {
    title: "Hymns Archive - Hudra",
    description:
      "Browse and explore the complete collection of East Syriac hymns from the Church of the East tradition.",
    images: {
      url: "https://hudra.day/images/hymns-archive.png",
      alt: "Hymns Archive - East Syriac Liturgical Music",
    },
  },
};

export default function HymnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
