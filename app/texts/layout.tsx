import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liturgical Texts Archive - Browse East Syriac Texts by Church",
  description:
    "Browse our comprehensive collection of digitized East Syriac liturgical texts from the Assyrian Church of the East, Chaldean Catholic Church, and Syro-Malabar Church. Free access to prayers, hymns, breviary, and liturgical services.",
  keywords: [
    "East Syriac texts",
    "liturgical texts archive",
    "Assyrian Church texts",
    "Chaldean Catholic texts",
    "Syro-Malabar texts",
    "Church of the East texts",
    "liturgical prayers",
    "breviary texts",
    "hymns and chants",
    "liturgical services",
    "Syriac manuscripts",
    "digital archive",
  ],
  openGraph: {
    title: "Liturgical Texts Archive - Browse East Syriac Texts | Hudra",
    description:
      "Browse our comprehensive collection of digitized East Syriac liturgical texts from three major Church of the East traditions. Free access to prayers, hymns, and liturgical services.",
    url: "https://hudra.day/texts",
    images: [
      {
        url: "https://hudra.day/images/sliwa.png",
        width: 1200,
        height: 630,
        alt: "East Syriac Liturgical Texts Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liturgical Texts Archive - Browse East Syriac Texts",
    description:
      "Browse our comprehensive collection of digitized East Syriac liturgical texts from three major Church of the East traditions.",
    images: ["https://hudra.day/images/sliwa.png"],
  },
  alternates: {
    canonical: "https://hudra.day/texts",
  },
};

export default function TextsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
