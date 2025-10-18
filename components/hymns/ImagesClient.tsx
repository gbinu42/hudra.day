"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import HymnImagesManager from "@/components/hymns/HymnImagesManager";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

  const canEdit =
    userProfile?.role === "editor" || userProfile?.role === "admin";

  if (!user) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-semibold mb-2">Images</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please sign in to manage images.
            </p>
            <Button asChild>
              <a href="/signin">Sign In</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!canEdit) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-semibold mb-2">Images</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You need editor or admin permissions to manage images.
            </p>
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
    <HymnImagesManager
      hymnId={hymnId}
      imageGroups={imageGroups}
      onUpdate={handleRefresh}
    />
  );
}
