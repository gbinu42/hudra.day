import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UnidentifiedRecordingsClient from "@/components/hymns/UnidentifiedRecordingsClient";
import { unidentifiedRecordingService } from "@/lib/unidentified-recording-services";
import { commentService } from "@/lib/comment-services";
import { Comment } from "@/lib/types/comment";
import { UnidentifiedRecording } from "@/lib/types/hymn";
import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, Music, HelpCircle } from "lucide-react";

const pageTitle = "Unidentified Hymn Recordings";
const pageDescription =
  "Browse and discuss unidentified hymn recordings submitted by the community, including hymns whose text has not yet been found or obtained. Help identify East Syriac hymns or share recordings you cannot name.";
const pageUrl = "https://hudra.day/hymns/unidentified-recordings";
const pageImage = "https://hudra.day/images/hymn-default.png";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "unidentified hymns",
    "unidentified recordings",
    "identify Syriac hymns",
    "Syriac hymn recordings",
    "hymns without text",
    "hymns missing text",
    "East Syriac",
    "Church of the East",
    "liturgical music",
    "hudra",
  ],
  openGraph: {
    title: `${pageTitle} - Hudra`,
    description: pageDescription,
    type: "website",
    url: pageUrl,
    siteName: "Hudra - East Syriac Liturgical Archive",
    images: [
      {
        url: pageImage,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} - Hudra`,
    description: pageDescription,
    images: {
      url: pageImage,
      alt: pageTitle,
    },
  },
  alternates: {
    canonical: pageUrl,
  },
};

// Static generation at build time (required for output: "export")
export const dynamic = "force-static";
export const revalidate = 3600;

export default async function UnidentifiedRecordingsPage() {
  let recordings: UnidentifiedRecording[] = [];
  let commentsByRecordingId: Record<string, Comment[]> = {};

  try {
    recordings = await unidentifiedRecordingService.getAll();
  } catch (error) {
    console.error("Error fetching unidentified recordings:", error);
  }

  try {
    const commentsSnapshot = await commentService.getCommentsByResourceType(
      "unidentified-recording",
      false
    );

    commentsByRecordingId = commentsSnapshot.docs.reduce<
      Record<string, Comment[]>
    >((acc, docSnap) => {
      const data = docSnap.data();
      const comment = {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      } as Comment;

      if (!acc[comment.resourceId]) {
        acc[comment.resourceId] = [];
      }
      acc[comment.resourceId].push(comment);
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching unidentified recording comments:", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: pageTitle,
        description: pageDescription,
        url: pageUrl,
        isPartOf: {
          "@type": "WebSite",
          name: "Hudra - East Syriac Liturgical Archive",
          url: "https://hudra.day",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://hudra.day",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Hymns",
            item: "https://hudra.day/hymns",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Unidentified Recordings",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-3">
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
                <BreadcrumbPage>Unidentified Recordings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mb-4 flex items-start gap-2">
          <HelpCircle className="h-6 w-6 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <h1 className="text-2xl font-bold leading-tight">
              Unidentified Hymn Recordings
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-snug">
              Recordings of hymns that have not yet been matched to a hymn in
              the archive, including hymns whose text has not yet been found or
              obtained. Browse submissions, leave comments to help identify
              them, or add your own if you have a recording you cannot name.
            </p>
          </div>
        </div>

        <UnidentifiedRecordingsClient
          recordings={recordings}
          commentsByRecordingId={commentsByRecordingId}
        />
      </div>
      <Footer />
    </div>
  );
}
