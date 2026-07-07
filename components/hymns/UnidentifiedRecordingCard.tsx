import { RecordingType, UnidentifiedRecording } from "@/lib/types/hymn";
import { Comment } from "@/lib/types/comment";
import CommentsSectionWithStatic from "@/components/CommentsSectionWithStatic";
import UnidentifiedRecordingPlayer from "@/components/hymns/UnidentifiedRecordingPlayer";
import UnidentifiedRecordingActions from "@/components/hymns/UnidentifiedRecordingActions";
import {
  Link as LinkIcon,
  Music,
  Video,
  Youtube,
} from "lucide-react";

function getRecordingIcon(type: RecordingType) {
  switch (type) {
    case "audio":
      return <Music className="h-4 w-4 shrink-0" />;
    case "video":
      return <Video className="h-4 w-4 shrink-0" />;
    case "youtube":
      return <Youtube className="h-4 w-4 shrink-0" />;
    default:
      return <LinkIcon className="h-4 w-4 shrink-0" />;
  }
}

interface UnidentifiedRecordingCardProps {
  number: number;
  recording: UnidentifiedRecording;
  initialComments: Comment[];
}

export default function UnidentifiedRecordingCard({
  number,
  recording,
  initialComments,
}: UnidentifiedRecordingCardProps) {
  const metadataParts: string[] = [];

  if (recording.suspectedHymnTitle) {
    metadataParts.push(`Suspected: ${recording.suspectedHymnTitle}`);
  }
  if (recording.performers && recording.performers.length > 0) {
    metadataParts.push(
      `Performers: ${recording.performers.map((p) => p.name).join(", ")}`
    );
  }
  if (recording.year) {
    metadataParts.push(`Year: ${recording.year}`);
  }
  if (recording.church) {
    metadataParts.push(recording.church);
  }

  return (
    <div
      id={`recording-${recording.id}`}
      className="scroll-mt-20 border-b pb-4 last:border-b-0 last:pb-0"
    >
      <div className="flex items-start justify-between gap-2 p-3 border rounded-md">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <span
            className="mt-0.5 w-6 shrink-0 text-sm font-semibold text-muted-foreground tabular-nums"
            aria-hidden="true"
          >
            {number}.
          </span>
          <span className="mt-0.5 text-muted-foreground">
            {getRecordingIcon(recording.type)}
          </span>
          <div className="flex-1 min-w-0 space-y-1">
            <h4 className="font-semibold text-base leading-snug">
              <span className="sr-only">Recording {number}: </span>
              {recording.title || `${recording.type} recording`}
            </h4>
            {metadataParts.length > 0 && (
              <p className="text-sm text-muted-foreground leading-snug">
                {metadataParts.join(" · ")}
              </p>
            )}
            {recording.description && (
              <p className="text-sm text-muted-foreground italic leading-snug">
                {recording.description}
              </p>
            )}
            {recording.contributorName && (
              <p className="text-xs text-muted-foreground">
                Added by {recording.contributorName}
              </p>
            )}
            <UnidentifiedRecordingPlayer recording={recording} />
          </div>
        </div>
        <UnidentifiedRecordingActions recording={recording} />
      </div>

      <CommentsSectionWithStatic
        resourceType="unidentified-recording"
        resourceId={recording.id}
        initialComments={initialComments}
        className="mt-2 px-1"
        compact
        accordion
      />
    </div>
  );
}
