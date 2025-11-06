import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HymnsListStatic from "@/components/hymns/HymnsListStatic";
import { Hymn, HymnRecording } from "@/lib/types/hymn";
import { hymnService } from "@/lib/hymn-services";
import { Metadata } from "next";
import { Timestamp } from "firebase/firestore";

export const metadata: Metadata = {
  title: "Syriac Hymns & Prayers",
  description:
    "Browse the complete collection of East Syriac hymns and prayers from the Church of the East tradition.",
  keywords: [
    "Syriac hymns",
    "East Syriac",
    "Church of the East",
    "liturgical music",
    "prayers",
    "hudra",
    "liturgy",
  ],
  openGraph: {
    title: "Syriac Hymns & Prayers",
    description:
      "Browse the complete collection of East Syriac hymns and prayers from the Church of the East tradition.",
    type: "website",
    images: [
      {
        url: "https://hudra.day/images/hymn-default.png",
        width: 1200,
        height: 630,
        alt: "Syriac Hymns & Prayers",
      },
    ],
  },
  twitter: {
    title: "Syriac Hymns & Prayers",
    description:
      "Browse the complete collection of East Syriac hymns and prayers from the Church of the East tradition.",
    images: {
      url: "https://hudra.day/images/hymn-default.png",
      alt: "Syriac Hymns & Prayers",
    },
  },
};

// Force static generation
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default async function HymnsPage() {
  // Fetch all hymns at build time
  let hymns: Hymn[] = [];

  try {
    const hymnsSnapshot = await hymnService.getAllHymns();
    hymns = hymnsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
        updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        recordings: (data.recordings || []).map((rec: HymnRecording) => ({
          ...rec,
          createdAt:
            rec.createdAt &&
            typeof rec.createdAt === "object" &&
            "toDate" in rec.createdAt
              ? (rec.createdAt as unknown as Timestamp).toDate()
              : new Date(rec.createdAt),
        })),
      } as Hymn;
    });
  } catch (error) {
    console.error("Error fetching hymns:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <HymnsListStatic hymns={hymns} />
      </div>
      <Footer />
    </div>
  );
}
