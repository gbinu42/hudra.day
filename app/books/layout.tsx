import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liturgical Books - Browse East Syriac Texts",
  description:
    "Browse and access our collection of digitized East Syriac liturgical books from the Assyrian Church of the East, Chaldean Catholic Church, and Syro-Malabar Church traditions.",
  keywords: [
    "East Syriac books",
    "liturgical books",
    "Hudra books",
    "Assyrian liturgy",
    "Chaldean books",
    "Syro-Malabar texts",
    "Syriac manuscripts",
    "Church of the East books",
    "East Syriac library",
    "liturgical texts",
    "prayer books",
    "breviary",
  ],
  openGraph: {
    title: "Liturgical Books - Browse East Syriac Texts | Hudra",
    description:
      "Browse our growing collection of digitized East Syriac liturgical books and manuscripts from three major Church of the East traditions.",
    url: "https://www.hudra.day/books",
    images: [
      {
        url: "https://www.hudra.day/images/sliwa.png",
        width: 1200,
        height: 630,
        alt: "East Syriac Liturgical Books Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liturgical Books - Browse East Syriac Texts | Hudra",
    description:
      "Browse our growing collection of digitized East Syriac liturgical books and manuscripts from three major Church of the East traditions.",
    images: ["https://www.hudra.day/images/sliwa.png"],
  },
  alternates: {
    canonical: "https://www.hudra.day/books",
  },
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
