import { Timestamp } from "firebase/firestore";
import { hymnService } from "@/lib/hymn-services";
import { Hymn, HymnRecording } from "@/lib/types/hymn";
import HymnDetail from "@/components/hymns/HymnDetail";
import RecordingsClient from "@/components/hymns/RecordingsClient";
import ImagesClient from "@/components/hymns/ImagesClient";
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

interface HymnDetailStaticProps {
  hymnId: string;
}

export default async function HymnDetailStatic({
  hymnId,
}: HymnDetailStaticProps) {
  let hymn: Hymn | null = null;
  let canAccess = false;

  try {
    // Check access (for now, allow all access in static version)
    canAccess = true;

    if (canAccess) {
      const hymnDoc = await hymnService.getHymnById(hymnId);
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

  if (!canAccess) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
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
      </div>
    );
  }

  if (!hymn) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
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
      </div>
    );
  }

  const mainTitle = hymn.titles?.[0]?.title || "Hymn";

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
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
                {mainTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <HymnDetail
        hymn={hymn}
        showEditButton={false}
        hideImages={false}
        hideRecordings={false}
        currentUserId={undefined}
        userRole={undefined}
      />

      {/* Client-side components for interactive features */}
      <div className="mt-8 space-y-8">
        <ImagesClient hymnId={hymnId} imageGroups={hymn.hymnImageGroups} />
        <RecordingsClient hymnId={hymnId} recordings={hymn.recordings} />
      </div>
    </div>
  );
}
