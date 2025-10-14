"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HymnsList from "@/components/hymns/HymnsList";
import { Hymn, HymnRecording } from "@/lib/types/hymn";
import { hymnService } from "@/lib/hymn-services";
import { useAuth } from "@/lib/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

export default function HymnsPage() {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = hymnService.onHymnsSnapshotFiltered(
      userProfile?.role || null,
      (snapshot) => {
        const hymnsData = snapshot.docs.map((doc) => {
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
        setHymns(hymnsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching hymns:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userProfile?.role]);

  const handleAddClick = () => {
    if (!user) {
      router.push("/signin");
      return;
    }
    router.push("/hymns/new");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="space-y-6">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-32 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <HymnsList
          hymns={hymns}
          showAddButton={
            userProfile?.role === "editor" || userProfile?.role === "admin"
          }
          onAddClick={handleAddClick}
        />
      </div>
      <Footer />
    </div>
  );
}
