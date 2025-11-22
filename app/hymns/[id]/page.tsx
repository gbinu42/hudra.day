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

    // Get primary title (prefer English, fallback to first available)
    const primaryEnglishTitle = hymn.titles?.find(
      (t) => t.language?.toLowerCase() === "english"
    );
    const hymnTitle =
      primaryEnglishTitle?.title ||
      (hymn.titles && hymn.titles.length > 0
        ? hymn.titles[0].title
        : "Untitled Hymn");

    // Get non-vocalized Syriac title (vowel-less) for main title
    const nonVocalizedSyriacTitle = hymn.titles?.find(
      (t) => t.language?.toLowerCase() === "syriac" && t.transliteration === "non-vocalized"
    )?.title;

    // Get vocalized Syriac title to mention in description
    const vocalizedSyriacTitle = hymn.titles?.find(
      (t) => t.language?.toLowerCase() === "syriac" && t.transliteration === "vocalized"
    )?.title;

    // Get only alternate English titles as variant names (for "also known as")
    const alternateEnglishTitles =
      hymn.titles
        ?.filter(
          (t) =>
            t.language?.toLowerCase() === "english" &&
            t !== primaryEnglishTitle
        )
        .map((t) => t.title)
        .filter(Boolean) || [];

    // Get all titles for keywords (excluding primary English and both Syriac versions)
    const otherTitlesForKeywords =
      hymn.titles
        ?.filter(
          (t) =>
            t !== primaryEnglishTitle &&
            t.language?.toLowerCase() !== "syriac"
        )
        .map((t) => t.title)
        .filter(Boolean) || [];

    // Build author names
    const authorNames = hymn.authors?.map((a) => a.name).filter(Boolean) || [];
    const authorString =
      authorNames.length > 0
        ? authorNames.join(", ")
        : hymn.authorName || "Unknown";

    // Build rich description
    const parts: string[] = [];
    if (hymn.description) {
      parts.push(hymn.description);
    } else {
      // Build default description with vocalized Syriac if available
      let defaultDesc = `${hymnTitle}`;
      if (vocalizedSyriacTitle) {
        defaultDesc += ` (${vocalizedSyriacTitle})`;
      }
      defaultDesc += ` is an East Syriac liturgical hymn from the Church of the East tradition.`;
      parts.push(defaultDesc);
    }

    if (authorNames.length > 0) {
      parts.push(`Composed by ${authorString}.`);
    }

    if (hymn.originYear) {
      parts.push(`Originated in ${hymn.originYear}.`);
    }

    if (hymn.category) {
      parts.push(`Category: ${hymn.category}.`);
    }

    if (hymn.occasion) {
      parts.push(`For ${hymn.occasion}.`);
    }

    // Add only alternate English titles as variant names
    if (alternateEnglishTitles.length > 0) {
      parts.push(`Also known as: ${alternateEnglishTitles.join(", ")}.`);
    }

    // Get recording info for metadata
    const recordings = hymn.recordings || [];
    const approvedRecordings = recordings.filter(
      (r) => r.status === "approved"
    );
    const hasAudio = approvedRecordings.some((r) => r.type === "audio");
    const hasVideo = approvedRecordings.some((r) => r.type === "video");
    const hasYouTube = approvedRecordings.some((r) => r.type === "youtube");

    if (hasAudio || hasVideo || hasYouTube) {
      const mediaTypes: string[] = [];
      if (hasAudio) mediaTypes.push("audio");
      if (hasVideo) mediaTypes.push("video");
      if (hasYouTube) mediaTypes.push("YouTube");
      parts.push(
        `Includes ${mediaTypes.join(" and ")} recording${
          mediaTypes.length > 1 ? "s" : ""
        }.`
      );
    }

    const fullDescription = parts.join(" ");

    // Build comprehensive title with English name (vowel-less Syriac name)
    const titleParts = [hymnTitle];
    if (nonVocalizedSyriacTitle) {
      titleParts.push(`(${nonVocalizedSyriacTitle})`);
    }
    if (authorNames.length > 0 && authorNames.length <= 2) {
      titleParts.push(`by ${authorString}`);
    }
    const fullTitle = titleParts.join(" ");

    // Build keywords - include all titles/names
    const keywords = [
      hymnTitle,
      ...(nonVocalizedSyriacTitle ? [nonVocalizedSyriacTitle] : []),
      ...(vocalizedSyriacTitle ? [vocalizedSyriacTitle] : []),
      ...alternateEnglishTitles,
      ...otherTitlesForKeywords, // Include titles in other languages
      ...authorNames,
      "East Syriac",
      "Syriac hymn",
      "Church of the East",
      "liturgical music",
      "liturgical hymn",
      "hudra",
      hymn.category || "liturgy",
      hymn.occasion || "worship",
      ...(hymn.tags || []),
      ...(hymn.meter ? [`${hymn.meter} meter`] : []),
    ].filter(Boolean);

    // Get best image
    const hymnImage =
      hymn.hymnImageGroups?.[0]?.images?.[0] ||
      "https://hudra.day/images/hymn-default.png";

    return {
      title: fullTitle,
      description: fullDescription,
      keywords: keywords.join(", "),
      authors:
        authorNames.length > 0
          ? authorNames.map((name) => ({ name }))
          : undefined,
      openGraph: {
        title: fullTitle,
        description: fullDescription,
        type: "article",
        siteName: "Hudra Day - East Syriac Liturgical Archive",
        images: [
          {
            url: hymnImage,
            width: 1200,
            height: 630,
            alt: `${hymnTitle}${nonVocalizedSyriacTitle ? ` (${nonVocalizedSyriacTitle})` : ""}`,
          },
        ],
        ...(hymn.originYear && {
          publishedTime: new Date(hymn.originYear, 0, 1).toISOString(),
        }),
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description:
          fullDescription.length > 200
            ? fullDescription.substring(0, 197) + "..."
            : fullDescription,
        images: {
          url: hymnImage,
          alt: `${hymnTitle}${nonVocalizedSyriacTitle ? ` (${nonVocalizedSyriacTitle})` : ""}`,
        },
      },
      alternates: {
        canonical: `https://hudra.day/hymns/${id}`,
      },
      other: {
        ...(hymn.originYear && {
          "article:published_time": new Date(
            hymn.originYear,
            0,
            1
          ).toISOString(),
        }),
        ...(hymn.category && {
          "article:section": hymn.category,
        }),
        ...(hymn.occasion && {
          "article:tag": hymn.occasion,
        }),
        ...(alternateEnglishTitles.length > 0 && {
          "article:tag": alternateEnglishTitles.join(", "), // Add alternate names as tags
        }),
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
