"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "@/lib/hooks/useAuth";
import { hymnService } from "@/lib/hymn-services";
import { Hymn, CreateHymnData, HymnRecording } from "@/lib/types/hymn";
import HymnForm from "@/components/hymns/HymnForm";
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
import { Home, Music, Edit } from "lucide-react";

interface HymnEditClientProps {
  hymnId: string;
}

export default function HymnEditClient({ hymnId }: HymnEditClientProps) {
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  const [hymn, setHymn] = useState<Hymn | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return; // Wait for auth to load

    if (!user) {
      router.push("/signin");
      return;
    }

    if (
      userProfile &&
      userProfile.role !== "editor" &&
      userProfile.role !== "admin"
    ) {
      router.push("/hymns");
    }
  }, [user, userProfile, router, authLoading]);

  useEffect(() => {
    if (!hymnId) return;

    const fetchHymn = async () => {
      try {
        const snapshot = await hymnService.getHymnById(hymnId);
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
      } catch (error) {
        console.error("Error fetching hymn:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHymn();
  }, [hymnId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Loading...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (userProfile.role !== "editor" && userProfile.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-4">
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
                You don&apos;t have permission to edit hymns.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!hymn) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-4">
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
                The hymn you&apos;re trying to edit doesn&apos;t exist.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const initialData: CreateHymnData = {
    titles: hymn.titles,
    authors: hymn.authors,
    originYear: hymn.originYear,
    category: hymn.category,
    occasion: hymn.occasion,
    meter: hymn.meter,
    description: hymn.description,
    context: hymn.context,
    text: hymn.text,
    translations: hymn.translations,
    churchVersions: hymn.churchVersions,
    hymnImageGroups: hymn.hymnImageGroups,
    recordings: hymn.recordings,
    tags: hymn.tags,
  };

  const handleSuccess = () => {
    router.push(`/hymns/${hymnId}`);
  };

  const handleCancel = () => {
    router.push(`/hymns/${hymnId}`);
  };

  const mainTitle = hymn.titles?.[0]?.title || "Hymn";

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
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
                <BreadcrumbLink href={`/hymns/${hymnId}`}>
                  <span className="max-w-[150px] truncate inline-block align-bottom">
                    {mainTitle}
                  </span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1.5">
                  <Edit className="h-4 w-4" />
                  Edit
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <h1 className="text-3xl font-bold mb-8">Edit Hymn</h1>
        <HymnForm
          hymnId={hymnId}
          initialData={initialData}
          userId={user.uid}
          userName={userProfile.displayName || user.email || "Anonymous"}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
