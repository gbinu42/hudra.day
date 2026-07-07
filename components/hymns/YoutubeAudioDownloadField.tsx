"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface YoutubeAudioDownloadFieldProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  isDownloading: boolean;
  downloadProgress: number;
  downloadSpeed: string;
  downloadEta: string;
  downloadedFileSize: string;
  downloadedBitrate: string;
  downloadedDuration: string;
}

export default function YoutubeAudioDownloadField({
  checked,
  onCheckedChange,
  isDownloading,
  downloadProgress,
  downloadSpeed,
  downloadEta,
  downloadedFileSize,
  downloadedBitrate,
  downloadedDuration,
}: YoutubeAudioDownloadFieldProps) {
  return (
    <div className="flex flex-col gap-2 p-3 border rounded bg-blue-50">
      <div className="flex items-center gap-2">
        <Checkbox
          id="download-youtube-audio"
          checked={checked}
          onCheckedChange={(value) => onCheckedChange(value === true)}
          className="h-4 w-4"
        />
        <Label
          htmlFor="download-youtube-audio"
          className="text-xs font-normal cursor-pointer flex-1"
        >
          <div className="flex flex-col gap-1">
            <span>
              Download audio from YouTube/Facebook/Instagram using yt-dlp
            </span>
            {!isDownloading && downloadedFileSize && (
              <span className="text-green-600 font-medium">
                ✓ Downloaded ({downloadedFileSize}
                {downloadedBitrate && ` @ ${downloadedBitrate}bps`}
                {downloadedDuration && ` • ${downloadedDuration}`})
              </span>
            )}
          </div>
        </Label>
      </div>
      {isDownloading && (
        <div className="space-y-2 mt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-blue-700 font-medium">
              Downloading...{" "}
              {downloadProgress > 0 ? `${downloadProgress.toFixed(1)}%` : ""}
            </span>
            <div className="flex gap-3 text-blue-600">
              {downloadSpeed && <span>{downloadSpeed}</span>}
              {downloadEta && <span>ETA: {downloadEta}</span>}
            </div>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
