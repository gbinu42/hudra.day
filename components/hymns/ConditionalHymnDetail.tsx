"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import HymnDetail from "@/components/hymns/HymnDetail";
import RecordingsClient from "@/components/hymns/RecordingsClient";
import ImagesClient from "@/components/hymns/ImagesClient";
import CommentsSection from "@/components/CommentsSection";
import { Hymn } from "@/lib/types/hymn";

interface ConditionalHymnDetailProps {
  hymn: Hymn;
  hymnId: string;
}

export default function ConditionalHymnDetail({
  hymn,
  hymnId,
}: ConditionalHymnDetailProps) {
  const { user } = useAuth();
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
          <RecordingsClient hymnId={hymnId} recordings={hymn.recordings} />
        </div>
      )}

      {/* Comments section always visible */}
      <div className="mt-8">
        <CommentsSection resourceType="hymn" resourceId={hymnId} />
      </div>
    </>
  );
}
