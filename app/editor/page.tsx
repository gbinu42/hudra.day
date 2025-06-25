import { Metadata } from "next";
import SyriacEditor from "@/components/SyriacEditor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "East Syriac Text Editor - Online Syriac & Karshon Editor",
  description:
    "Free online East Syriac and Karshon (Garshuni Malayalam) text editor with full Unicode support, on-screen keyboard, and liturgical text formatting tools. Perfect for scholars, students, and clergy.",
  keywords: [
    "East Syriac editor",
    "Syriac text editor",
    "Karshon editor",
    "Garshuni Malayalam",
    "online Syriac typing",
    "Syriac keyboard",
    "RTL text editor",
    "liturgical text editor",
    "Syriac Unicode",
    "East Syriac typing",
    "manuscript transcription",
    "Syriac fonts",
  ],
  openGraph: {
    title: "East Syriac Text Editor - Online Syriac & Karshon Editor | Hudra",
    description:
      "Free online text editor for East Syriac and Karshon with full Unicode support, on-screen keyboard, and liturgical formatting tools.",
    url: "https://www.hudra.day/editor",
    images: [
      {
        url: "https://www.hudra.day/images/sliwa.png",
        width: 1200,
        height: 630,
        alt: "East Syriac Text Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "East Syriac Text Editor - Online Syriac & Karshon Editor",
    description:
      "Free online text editor for East Syriac and Karshon with full Unicode support and on-screen keyboard.",
    images: ["https://www.hudra.day/images/sliwa.png"],
  },
  alternates: {
    canonical: "https://www.hudra.day/editor",
  },
};

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            East Syriac + Karshon Rich Text Editor
          </h1>
        </div>
        <SyriacEditor />
      </div>
      <Footer />
    </div>
  );
}
