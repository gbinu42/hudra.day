"use client";

import { createContext, useContext, useState } from "react";
import { Comment } from "@/lib/types/comment";
import { UnidentifiedRecording } from "@/lib/types/hymn";
import UnidentifiedRecordingCard from "@/components/hymns/UnidentifiedRecordingCard";
import UnidentifiedRecordingSubmitCard from "@/components/hymns/UnidentifiedRecordingSubmitCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UnidentifiedRecordingsEditContextValue {
  startEdit: (recording: UnidentifiedRecording) => void;
}

const UnidentifiedRecordingsEditContext =
  createContext<UnidentifiedRecordingsEditContextValue | null>(null);

export function useUnidentifiedRecordingsEdit() {
  const context = useContext(UnidentifiedRecordingsEditContext);
  if (!context) {
    throw new Error(
      "useUnidentifiedRecordingsEdit must be used within UnidentifiedRecordingsClient"
    );
  }
  return context;
}

interface UnidentifiedRecordingsClientProps {
  recordings: UnidentifiedRecording[];
  commentsByRecordingId: Record<string, Comment[]>;
}

export default function UnidentifiedRecordingsClient({
  recordings,
  commentsByRecordingId,
}: UnidentifiedRecordingsClientProps) {
  const [editingRecording, setEditingRecording] =
    useState<UnidentifiedRecording | null>(null);

  return (
    <UnidentifiedRecordingsEditContext.Provider
      value={{
        startEdit: (recording) => {
          setEditingRecording(recording);
          document
            .getElementById("unidentified-recording-submit")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        },
      }}
    >
      <div className="space-y-4">
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-lg">Recordings</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            {recordings.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No unidentified recordings yet. Be the first to submit one!
              </p>
            ) : (
              <div className="space-y-4">
                {recordings.map((recording, index) => (
                  <UnidentifiedRecordingCard
                    key={recording.id}
                    number={recordings.length - index}
                    recording={recording}
                    initialComments={
                      commentsByRecordingId[recording.id] || []
                    }
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div id="unidentified-recording-submit">
          <UnidentifiedRecordingSubmitCard
            editingRecording={editingRecording}
            onEditingRecordingChange={setEditingRecording}
          />
        </div>
      </div>
    </UnidentifiedRecordingsEditContext.Provider>
  );
}
