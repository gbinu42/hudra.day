"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import HymnDetail from "@/components/hymns/HymnDetail";
import RecordingsClient from "@/components/hymns/RecordingsClient";
import ImagesClient from "@/components/hymns/ImagesClient";
import CommentsSection from "@/components/CommentsSection";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Hymn } from "@/lib/types/hymn";

interface ConditionalHymnDetailProps {
  hymn: Hymn;
  hymnId: string;
}

export default function ConditionalHymnDetail({
  hymn,
  hymnId,
}: ConditionalHymnDetailProps) {
  const { user, userProfile } = useAuth();
  const isAdmin = userProfile?.role === "admin";
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Server-side rendering: show recordings for everyone
    return (
      <>
        <HymnDetail
          hymn={hymn}
          showEditButton={false}
          hideImages={false}
          hideRecordings={false}
          currentUserId={undefined}
          userRole={undefined}
        />
        {/* Comments section visible on SSR */}
        <div className="mt-8">
          <CommentsSection resourceType="hymn" resourceId={hymnId} />
        </div>
      </>
    );
  }

  // Client-side: show recordings for non-logged-in users, manager for logged-in users
  return (
    <>
      {isAdmin && (
        <div className="mb-4 flex justify-end">
          <Button asChild variant="outline">
            <Link href={`/hymns/${hymnId}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Hymn
            </Link>
          </Button>
        </div>
      )}
      <HymnDetail
        hymn={hymn}
        showEditButton={false}
        hideImages={false}
        hideRecordings={!!user} // Hide recordings if user is logged in
        currentUserId={undefined}
        userRole={undefined}
      />

      {/* Show management interfaces only for logged-in users */}
      {user && (
        <div className="mt-8 space-y-8">
          <ImagesClient hymnId={hymnId} imageGroups={hymn.hymnImageGroups} />
          <RecordingsClient 
            hymnId={hymnId} 
            recordings={hymn.recordings}
            hymnName={hymn.titles.find((t) => t.language?.toLowerCase() === "english")?.title || "Untitled"}
          />
        </div>
      )}

      {/* Comments section always visible */}
      <div className="mt-8">
        <CommentsSection resourceType="hymn" resourceId={hymnId} />
      </div>
    </>
  );
}
