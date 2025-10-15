"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "@/lib/hooks/useAuth";
import { hymnService } from "@/lib/hymn-services";
import { Hymn, HymnRecording } from "@/lib/types/hymn";
import HymnDetail from "@/components/hymns/HymnDetail";
import RecordingsManager from "@/components/hymns/RecordingsManager";
import HymnImagesManager from "@/components/hymns/HymnImagesManager";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Home, Music } from "lucide-react";

interface HymnDetailClientProps {
  hymnId: string;
}

export default function HymnDetailClient({ hymnId }: HymnDetailClientProps) {
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const [hymn, setHymn] = useState<Hymn | null>(null);
  const [loading, setLoading] = useState(true);
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    if (!hymnId) return;

    const checkAccess = async () => {
      const hasAccess = await hymnService.canUserAccessHymn(
        hymnId,
        userProfile?.role || null
      );
      setCanAccess(hasAccess);
      if (!hasAccess) {
        setLoading(false);
      }
    };

    checkAccess();
  }, [hymnId, userProfile?.role]);

  useEffect(() => {
    if (!hymnId || !canAccess) return;

    const unsubscribe = hymnService.onHymnSnapshot(
      hymnId,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          const hymnData: Hymn = {
            id: snapshot.id,
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
          setHymn(hymnData);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching hymn:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [hymnId, canAccess]);

  const handleEdit = () => {
    router.push(`/hymns/${hymnId}/edit`);
  };

  const handleRefresh = () => {
    // Trigger a refresh by re-fetching
    setLoading(true);
    setTimeout(() => setLoading(false), 100);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
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

  const canEdit =
    userProfile?.role === "editor" || userProfile?.role === "admin";

  const canAddRecordings = user !== null; // All logged-in users can add recordings

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
        showEditButton={canEdit}
        onEdit={handleEdit}
        hideImages={canEdit}
        hideRecordings={canAddRecordings}
        currentUserId={user?.uid}
        userRole={userProfile?.role}
      />

      {user && (
        <div className="mt-8 space-y-8">
          {canEdit && (
            <HymnImagesManager
              hymnId={hymnId}
              imageGroups={hymn.hymnImageGroups}
              onUpdate={handleRefresh}
            />
          )}
          {canAddRecordings && (
            <RecordingsManager
              hymnId={hymnId}
              recordings={hymn.recordings}
              contributorId={user.uid}
              contributorName={
                userProfile?.displayName || user.email || "Anonymous"
              }
              userRole={userProfile?.role}
              onUpdate={handleRefresh}
            />
          )}
        </div>
      )}
    </div>
  );
}
