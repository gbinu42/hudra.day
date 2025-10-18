"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import RecordingsManager from "@/components/hymns/RecordingsManager";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { HymnRecording } from "@/lib/types/hymn";

interface RecordingsClientProps {
  hymnId: string;
  recordings: HymnRecording[] | undefined;
}

export default function RecordingsClient({
  hymnId,
  recordings,
}: RecordingsClientProps) {
  const { user, userProfile } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">
            <Music className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-semibold mb-2">Recordings</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Loading recording management...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">
            <Music className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-semibold mb-2">Recordings</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please sign in to manage recordings.
            </p>
            <Button asChild>
              <a href="/signin">Sign In</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleRefresh = () => {
    // Trigger a refresh by re-rendering
    window.location.reload();
  };

  return (
    <RecordingsManager
      hymnId={hymnId}
      recordings={recordings || []}
      contributorId={user.uid}
      contributorName={userProfile?.displayName || user.email || "Anonymous"}
      userRole={userProfile?.role}
      onUpdate={handleRefresh}
    />
  );
}
