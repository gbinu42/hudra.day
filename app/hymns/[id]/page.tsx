import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { hymnService } from "@/lib/hymn-services";
import { Metadata } from "next";
import { Hymn, HymnRecording } from "@/lib/types/hymn";
import { Timestamp } from "firebase/firestore";
import ConditionalHymnDetail from "@/components/hymns/ConditionalHymnDetail";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Home, Music } from "lucide-react";

// Generate static params for all hymns at build time
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

// Generate metadata for each hymn page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const hymnDoc = await hymnService.getHymnById(id);
    if (!hymnDoc?.exists()) {
      return {
        title: "Hymn Not Found",
        description: "The requested hymn could not be found.",
      };
    }

    const data = hymnDoc.data();
    const hymn = data as Hymn;
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

export default async function HymnDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch hymn data on the server
  let hymn: Hymn | null = null;
  let canAccess = false;

  try {
    // Check access (for now, allow all access)
    canAccess = true;

    if (canAccess) {
      const hymnDoc = await hymnService.getHymnById(id);
      if (hymnDoc?.exists()) {
        const data = hymnDoc.data();
        hymn = {
          id: hymnDoc.id,
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
      }
    }
  } catch (error) {
    console.error("Error fetching hymn:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {!canAccess ? (
          <div className="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/hymns">
                    <Music className="h-4 w-4" />
                    Hymns
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Access Denied</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Card>
              <CardContent className="py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                <p className="text-muted-foreground mb-6">
                  You don&apos;t have permission to view this hymn.
                </p>
              </CardContent>
            </Card>
          </div>
        ) : !hymn ? (
          <div className="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/hymns">
                    <Music className="h-4 w-4" />
                    Hymns
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Not Found</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Card>
              <CardContent className="py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Hymn Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  The hymn you&apos;re looking for doesn&apos;t exist.
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                      <Home className="h-4 w-4" />
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/hymns">
                      <Music className="h-4 w-4" />
                      Hymns
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="max-w-[200px] truncate">
                      {hymn.titles?.[0]?.title || "Hymn"}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <ConditionalHymnDetail hymn={hymn} hymnId={id} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
