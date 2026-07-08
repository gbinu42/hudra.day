"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UnidentifiedRecording } from "@/lib/types/hymn";
import { unidentifiedRecordingService } from "@/lib/unidentified-recording-services";
import { useAuth } from "@/lib/hooks/useAuth";
import { useUnidentifiedRecordingsEdit } from "@/components/hymns/UnidentifiedRecordingsClient";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export default function UnidentifiedRecordingAdminActions({
  recording,
}: {
  recording: UnidentifiedRecording;
}) {
  const router = useRouter();
  const { userProfile } = useAuth();
  const { startEdit } = useUnidentifiedRecordingsEdit();
  const isAdmin = userProfile?.role === "admin";

  if (!isAdmin) {
    return null;
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this recording?")) {
      return;
    }

    try {
      await unidentifiedRecordingService.delete(recording.id, recording.url);
      toast.success("Recording deleted");
      router.refresh();
    } catch (error) {
      console.error("Error deleting recording:", error);
      toast.error("Failed to delete recording");
    }
  };

  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => startEdit(recording)}
        aria-label="Edit recording"
      >
        <Edit className="h-4 w-4 text-blue-500" />
      </Button>
      <Button variant="ghost" size="sm" onClick={handleDelete} aria-label="Delete recording">
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}
