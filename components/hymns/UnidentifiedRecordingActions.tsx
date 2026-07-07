"use client";

import { UnidentifiedRecording } from "@/lib/types/hymn";
import UnidentifiedRecordingAdminActions from "@/components/hymns/UnidentifiedRecordingAdminActions";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function UnidentifiedRecordingActions({
  recording,
}: {
  recording: UnidentifiedRecording;
}) {
  const showOpen =
    (recording.type === "audio" || recording.type === "video") &&
    recording.originalUrl &&
    !recording.originalUrl.includes("firebasestorage.googleapis.com");

  return (
    <div className="flex gap-2 shrink-0">
      {recording.type === "youtube" && recording.url !== "pending" && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.open(recording.url, "_blank")}
        >
          Watch
        </Button>
      )}
      {recording.type === "link" && recording.url !== "pending" && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.open(recording.url, "_blank")}
        >
          Visit
        </Button>
      )}
      {showOpen && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.open(recording.originalUrl, "_blank")}
          className="flex items-center gap-1"
        >
          <ExternalLink className="h-4 w-4" />
          Open
        </Button>
      )}
      <UnidentifiedRecordingAdminActions recording={recording} />
    </div>
  );
}
