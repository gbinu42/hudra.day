import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HymnDetailClient from "@/components/hymns/HymnDetailClient";
import { hymnService } from "@/lib/hymn-services";
import { Metadata } from "next";
import { Hymn } from "@/lib/types/hymn";

// Generate metadata for each hymn page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const hymnDoc = await hymnService.getHymnById(id);
    if (!hymnDoc) {
      return {
        title: "Hymn Not Found",
        description: "The requested hymn could not be found.",
      };
    }

    const hymn = hymnDoc.data() as Hymn;
    const hymnTitle =
      hymn.titles && hymn.titles.length > 0
        ? hymn.titles.find((t) => t.language === "english")?.title ||
          hymn.titles[0].title
        : "Untitled Hymn";
    const hymnDescription =
      hymn.description ||
      "East Syriac hymn from the Church of the East tradition.";

    // Get recording info for metadata
    const recordings = hymn.recordings || [];
    const hasAudio = recordings.some((r) => r.type === "audio");
    const hasVideo = recordings.some((r) => r.type === "video");
    const hasYouTube = recordings.some((r) => r.type === "youtube");

    let mediaDescription = "";
    if (hasAudio && hasVideo) {
      mediaDescription = "Includes audio and video recordings.";
    } else if (hasAudio) {
      mediaDescription = "Includes audio recording.";
    } else if (hasVideo) {
      mediaDescription = "Includes video recording.";
    } else if (hasYouTube) {
      mediaDescription = "Includes YouTube video.";
    }

    const fullDescription = `${hymnDescription} ${mediaDescription}`.trim();

    return {
      title: hymnTitle,
      description: fullDescription,
      keywords: [
        hymnTitle,
        "East Syriac hymn",
        "Church of the East",
        "liturgical music",
        hymn.category || "liturgy",
        hymn.occasion || "worship",
        ...(hymn.tags || []),
      ],
      openGraph: {
        title: hymnTitle,
        description: fullDescription,
        type: "article",
        images:
          hymn.hymnImageGroups &&
          hymn.hymnImageGroups.length > 0 &&
          hymn.hymnImageGroups[0].images &&
          hymn.hymnImageGroups[0].images.length > 0
            ? [
                {
                  url: hymn.hymnImageGroups[0].images[0],
                  width: 1200,
                  height: 630,
                  alt: hymnTitle,
                },
              ]
            : [
                {
                  url: "https://hudra.day/images/hymn-default.png",
                  width: 1200,
                  height: 630,
                  alt: hymnTitle,
                },
              ],
      },
      twitter: {
        title: hymnTitle,
        description: fullDescription,
        images:
          hymn.hymnImageGroups &&
          hymn.hymnImageGroups.length > 0 &&
          hymn.hymnImageGroups[0].images &&
          hymn.hymnImageGroups[0].images.length > 0
            ? {
                url: hymn.hymnImageGroups[0].images[0],
                alt: hymnTitle,
              }
            : {
                url: "https://hudra.day/images/hymn-default.png",
                alt: hymnTitle,
              },
      },
    };
  } catch (error) {
    console.error("Error generating metadata for hymn:", error);
    return {
      title: "Hymn",
      description:
        "East Syriac liturgical hymn from the Church of the East tradition.",
    };
  }
}

// Pre-generate static pages for all hymns at build time
export async function generateStaticParams() {
  try {
    const hymnsSnapshot = await hymnService.getAllHymns();
    return hymnsSnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (error) {
    console.error("Error generating static params for hymns:", error);
    return [];
  }
}

export default async function HymnDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HymnDetailClient hymnId={id} />
      <Footer />
    </div>
  );
}
