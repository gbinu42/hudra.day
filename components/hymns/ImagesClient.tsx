"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import HymnImagesManager from "@/components/hymns/HymnImagesManager";
import { Card, CardContent } from "@/components/ui/card";
import { Image } from "lucide-react";
import { HymnImageGroup } from "@/lib/types/hymn";

interface ImagesClientProps {
  hymnId: string;
  imageGroups: HymnImageGroup[] | undefined;
}

export default function ImagesClient({
  hymnId,
  imageGroups,
}: ImagesClientProps) {
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
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-semibold mb-2">Images</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Loading image management...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isAdmin = userProfile?.role === "admin";

  if (!user) {
    return null; // Don't show anything for non-logged-in users
  }

  if (!isAdmin) {
    return null; // Don't show anything for non-admins
  }

  const handleRefresh = () => {
    // Trigger a refresh by re-rendering
    window.location.reload();
  };

  return (
    <HymnImagesManager
      hymnId={hymnId}
      imageGroups={imageGroups}
      onUpdate={handleRefresh}
    />
  );
}
