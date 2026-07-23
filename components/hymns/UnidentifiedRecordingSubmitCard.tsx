"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  CHURCH_TRADITIONS,
  Person,
  RecordingType,
  UnidentifiedRecording,
} from "@/lib/types/hymn";
import { personService } from "@/lib/hymn-services";
import { unidentifiedRecordingService } from "@/lib/unidentified-recording-services";
import { useAuth } from "@/lib/hooks/useAuth";
import { useYoutubeAudioDownload } from "@/lib/hooks/useYoutubeAudioDownload";
import { ENABLE_EXPERIMENTAL_FEATURES } from "@/lib/config";
import {
  AUDIO_UPLOAD_ACCEPT,
  extractAudioFromVideoFile,
  formatFileSize,
  isAcceptedRecordingFile,
  isDownloadableSocialUrl,
  shouldExtractAudioFromVideo,
} from "@/lib/format-file-size";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import YoutubeAudioDownloadField from "@/components/hymns/YoutubeAudioDownloadField";
import AudioTrimmer from "@/components/hymns/AudioTrimmer";
import { Plus, Scissors, Upload } from "lucide-react";

const recordingSchema = z
  .object({
    type: z.enum(["audio", "video", "youtube", "link"]),
    url: z.string().optional(),
    title: z.string().optional(),
    year: z
      .union([z.number(), z.nan()])
      .optional()
      .transform((val) =>
        val === undefined || isNaN(val as number) ? undefined : val
      ),
    duration: z.string().optional(),
    description: z.string().optional(),
    church: z.string().optional(),
    suspectedHymnTitle: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "youtube" || data.type === "link") {
        return data.url && data.url.length > 0;
      }
      return true;
    },
    {
      message: "URL is required for YouTube videos and external links",
      path: ["url"],
    }
  )
  .refine(
    (data) => {
      if (data.url && data.url.length > 0) {
        try {
          new URL(data.url);
          return true;
        } catch {
          return false;
        }
      }
      return true;
    },
    {
      message: "Please enter a valid URL",
      path: ["url"],
    }
  );

type RecordingFormData = z.infer<typeof recordingSchema>;

interface UnidentifiedRecordingSubmitCardProps {
  editingRecording?: UnidentifiedRecording | null;
  onEditingRecordingChange?: (recording: UnidentifiedRecording | null) => void;
}

export default function UnidentifiedRecordingSubmitCard({
  editingRecording = null,
  onEditingRecordingChange,
}: UnidentifiedRecordingSubmitCardProps) {
  const isEditing = editingRecording !== null;
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [compressAudio, setCompressAudio] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isExtractingAudio, setIsExtractingAudio] = useState(false);
  const [originalFileSize, setOriginalFileSize] = useState(0);
  const [compressedFileSize, setCompressedFileSize] = useState(0);
  const [showTrimmer, setShowTrimmer] = useState(false);
  const [fileToTrim, setFileToTrim] = useState<File | null>(null);
  const [audioBitrate, setAudioBitrate] = useState("");
  const [audioDuration, setAudioDuration] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPerformers, setSelectedPerformers] = useState<
    MultiSelectOption[]
  >([]);
  const [allPersons, setAllPersons] = useState<Person[]>([]);

  const contributorId = user?.uid || "";
  const contributorName =
    userProfile?.displayName || user?.email || "Anonymous";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RecordingFormData>({
    resolver: zodResolver(recordingSchema),
    defaultValues: {
      type: "audio",
      url: "",
      title: "",
      year: undefined,
      duration: "",
      description: "",
      church: "",
      suspectedHymnTitle: "",
    },
  });

  const recordingType = watch("type");
  const urlValue = watch("url");

  const handleDownloadComplete = useCallback(
    (file: File, metadata?: { bitrate?: string; duration?: string }) => {
      setUploadFile(file);
      setCompressAudio(false);
      setIsCompressing(false);
      setOriginalFileSize(0);
      setCompressedFileSize(0);
      setAudioBitrate(metadata?.bitrate || "");
      setAudioDuration(metadata?.duration || "");
      if (ENABLE_EXPERIMENTAL_FEATURES) {
        setFileToTrim(file);
        setShowTrimmer(false);
      } else {
        setFileToTrim(null);
        setShowTrimmer(false);
      }
    },
    []
  );

  const {
    downloadYoutubeAudio,
    setDownloadYoutubeAudio,
    isDownloading,
    downloadProgress,
    downloadSpeed,
    downloadEta,
    downloadedFileSize,
    downloadedBitrate,
    downloadedDuration,
    resetDownload,
  } = useYoutubeAudioDownload({
    sourceUrl: urlValue,
    onDownloadComplete: handleDownloadComplete,
  });

  useEffect(() => {
    if (!editingRecording) {
      return;
    }

    setShowForm(true);
    reset({
      type: editingRecording.type,
      url:
        editingRecording.originalUrl ||
        (editingRecording.type === "youtube" ||
        editingRecording.type === "link"
          ? editingRecording.url
          : ""),
      title: editingRecording.title || "",
      year: editingRecording.year,
      duration: editingRecording.duration || "",
      description: editingRecording.description || "",
      church: editingRecording.church || "",
      suspectedHymnTitle: editingRecording.suspectedHymnTitle || "",
    });
    setSelectedPerformers(
      (editingRecording.performers || []).map((performer) => ({
        id: performer.id,
        name: performer.name,
        value: performer.id || performer.name,
        label: performer.name,
      }))
    );
    setUploadFile(null);
    setCompressAudio(false);
    setIsCompressing(false);
    setOriginalFileSize(0);
    setCompressedFileSize(0);
    setShowTrimmer(false);
    setFileToTrim(null);
    setAudioBitrate("");
    setAudioDuration("");
    resetDownload();
  }, [editingRecording, reset]);

  useEffect(() => {
    async function loadPersons() {
      try {
        const snapshot = await personService.getAllPersons();
        const persons = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
          createdAt:
            docSnap.data().createdAt?.toDate?.() ||
            new Date(docSnap.data().createdAt),
          updatedAt:
            docSnap.data().updatedAt?.toDate?.() ||
            new Date(docSnap.data().updatedAt),
        })) as Person[];
        setAllPersons(persons);
      } catch (error) {
        console.error("Error loading persons:", error);
      }
    }

    if (showForm) {
      loadPersons();
    }
  }, [showForm]);

  const clearEditingState = () => {
    onEditingRecordingChange?.(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setUploadFile(null);
    setCompressAudio(false);
    setIsCompressing(false);
    setIsExtractingAudio(false);
    setOriginalFileSize(0);
    setCompressedFileSize(0);
    setShowTrimmer(false);
    setFileToTrim(null);
    setAudioBitrate("");
    setAudioDuration("");
    setSelectedPerformers([]);
    resetDownload();
    reset();
    clearEditingState();
  };

  const applySelectedFile = (file: File) => {
    setUploadFile(file);
    setCompressAudio(false);
    setIsCompressing(false);
    setOriginalFileSize(0);
    setCompressedFileSize(0);
    setAudioBitrate("");
    setAudioDuration("");
    resetDownload();

    if (recordingType === "audio" && ENABLE_EXPERIMENTAL_FEATURES) {
      setFileToTrim(file);
      setShowTrimmer(false);
    } else {
      setFileToTrim(null);
      setShowTrimmer(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    if (
      (recordingType === "audio" || recordingType === "video") &&
      !isAcceptedRecordingFile(file, recordingType)
    ) {
      toast.error(`Please select a valid ${recordingType} file`);
      return;
    }

    if (recordingType === "audio" && shouldExtractAudioFromVideo(file)) {
      setIsExtractingAudio(true);
      const toastId = toast.loading("Extracting audio from video...");
      try {
        const audioFile = await extractAudioFromVideoFile(file);
        applySelectedFile(audioFile);
        toast.success(`Extracted audio: ${audioFile.name}`, { id: toastId });
      } catch (error) {
        console.error("Error extracting audio:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to extract audio from video",
          { id: toastId }
        );
      } finally {
        setIsExtractingAudio(false);
      }
      return;
    }

    applySelectedFile(file);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (recordingType !== "audio" && recordingType !== "video") {
      return;
    }

    void handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFilePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (recordingType !== "audio" && recordingType !== "video") {
      return;
    }

    for (const item of Array.from(e.clipboardData.items)) {
      if (item.kind !== "file") continue;

      const file = item.getAsFile();
      if (!file) continue;

      void handleFileSelect(file);
      return;
    }
  };

  const displayBitrate = audioBitrate || downloadedBitrate;
  const displayDuration = audioDuration || downloadedDuration;

  useEffect(() => {
    const handleCompress = async () => {
      if (!uploadFile || !compressAudio || isCompressing) return;

      if (uploadFile.name.includes("_compressed")) {
        toast.info("This file is already compressed!");
        setCompressAudio(false);
        return;
      }

      setIsCompressing(true);
      const originalSizeToStore = uploadFile.size;
      setOriginalFileSize(originalSizeToStore);

      try {
        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("quality", "medium");

        const response = await fetch("/api/compress-audio", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.details || "Failed to compress audio");
        }

        const blob = await response.blob();
        const fileExtension = uploadFile.name.split(".").pop() || "mp3";
        const originalName = uploadFile.name.replace(/\.[^/.]+$/, "");
        const contentType =
          response.headers.get("Content-Type") || "audio/mpeg";

        const compressedFile = new File(
          [blob],
          `${originalName}_compressed.${fileExtension}`,
          { type: contentType }
        );

        const compressedSize = parseInt(
          response.headers.get("X-Compressed-Size") || "0"
        );

        setCompressedFileSize(compressedSize);
        setUploadFile(compressedFile);

        const reduction = (
          ((originalSizeToStore - compressedSize) / originalSizeToStore) *
          100
        ).toFixed(1);
        toast.success(
          `Audio compressed! Original: ${formatFileSize(
            originalSizeToStore
          )}, Compressed: ${formatFileSize(
            compressedSize
          )} (${reduction}% reduction)`
        );
      } catch (error) {
        console.error("Error compressing audio:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to compress audio"
        );
        setCompressAudio(false);
        setOriginalFileSize(0);
        setCompressedFileSize(0);
      } finally {
        setIsCompressing(false);
      }
    };

    if (compressAudio && uploadFile && recordingType === "audio") {
      void handleCompress();
    }
  }, [compressAudio, uploadFile, isCompressing, recordingType]);

  const onSubmit = async (data: RecordingFormData) => {
    if (!user) {
      toast.error("You must be signed in to submit a recording");
      return;
    }

    if (
      !isEditing &&
      (data.type === "audio" || data.type === "video") &&
      !uploadFile
    ) {
      toast.error("Please upload a file for audio/video recordings");
      return;
    }

    if ((data.type === "youtube" || data.type === "link") && !data.url) {
      toast.error("Please provide a URL for YouTube videos and external links");
      return;
    }

    setIsUploading(true);

    try {
      const performerObjects = selectedPerformers.map((performer) => ({
        ...(performer.id ? { id: performer.id } : {}),
        name: performer.name,
      }));

      const metadataFields = {
        type: data.type,
        ...(data.title ? { title: data.title } : {}),
        ...(data.year ? { year: data.year } : {}),
        ...(data.duration ? { duration: data.duration } : {}),
        ...(data.description ? { description: data.description } : {}),
        ...(data.church ? { church: data.church } : {}),
        ...(data.suspectedHymnTitle
          ? { suspectedHymnTitle: data.suspectedHymnTitle }
          : {}),
        performers: performerObjects,
      };

      if (isEditing && editingRecording) {
        const updateFields: Record<string, unknown> = { ...metadataFields };

        if (data.type === "youtube" || data.type === "link") {
          updateFields.url = data.url || "";
        }

        if ((data.type === "audio" || data.type === "video") && data.url) {
          updateFields.originalUrl = data.url;
        }

        if ((data.type === "audio" || data.type === "video") && uploadFile) {
          await unidentifiedRecordingService.deleteStorageFile(
            editingRecording.url
          );
          const finalUrl = await unidentifiedRecordingService.uploadFile(
            editingRecording.id,
            uploadFile,
            data.type
          );
          updateFields.url = finalUrl;
        }

        await unidentifiedRecordingService.updateFields(
          editingRecording.id,
          updateFields
        );

        toast.success("Recording updated successfully!");
      } else if ((data.type === "audio" || data.type === "video") && uploadFile) {
        const recordingData = {
          url: "pending",
          contributorId,
          contributorName,
          ...metadataFields,
        };

        const recordingId =
          await unidentifiedRecordingService.create(recordingData);

        const finalUrl = await unidentifiedRecordingService.uploadFile(
          recordingId,
          uploadFile,
          data.type
        );
        await unidentifiedRecordingService.updateUrl(recordingId, finalUrl);

        if (data.url) {
          await unidentifiedRecordingService.updateFields(recordingId, {
            originalUrl: data.url,
          });
        }
        toast.success("Unidentified recording submitted successfully!");
      } else {
        const recordingData = {
          url: data.url || "",
          contributorId,
          contributorName,
          ...metadataFields,
        };

        await unidentifiedRecordingService.create(recordingData);
        toast.success("Unidentified recording submitted successfully!");
      }

      handleCancel();
      router.refresh();
    } catch (error) {
      console.error("Error saving recording:", error);
      toast.error(`Failed to ${isEditing ? "update" : "submit"} recording`);
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="py-4 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Sign in to submit unidentified recordings. You can still leave
            comments on existing recordings without signing in.
          </p>
          <Button asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-lg">
          {isEditing ? "Edit Recording" : "Submit a Recording"}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <p className="text-sm text-muted-foreground mb-3 leading-snug">
          {isEditing
            ? "Update the recording details below. Upload a new file only if you want to replace the current audio or video."
            : "Have a recording of a hymn you cannot identify? Submit it here with as much detail as you can — performer, church tradition, year, and any guess about the hymn title."}
        </p>

        <Collapsible
          open={showForm}
          onOpenChange={(open) => {
            if (!open) {
              if (isEditing) {
                handleCancel();
              } else {
                setShowForm(false);
              }
            } else {
              setShowForm(true);
            }
          }}
        >
          <CollapsibleContent>
            <div className="border rounded-lg p-3 bg-muted/50">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="recording-type">Recording Type</Label>
                  <Select
                    value={recordingType}
                    onValueChange={(value: RecordingType) =>
                      setValue("type", value)
                    }
                  >
                    <SelectTrigger id="recording-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">YouTube Video</SelectItem>
                      <SelectItem value="audio">Audio File</SelectItem>
                      <SelectItem value="video">Video File</SelectItem>
                      <SelectItem value="link">External Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(recordingType === "audio" || recordingType === "video") && (
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">
                      {isEditing ? "Replace File (optional)" : "Upload File"}
                    </Label>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
                      onDrop={handleFileDrop}
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onPaste={handleFilePaste}
                    >
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drag and drop your file here, paste from clipboard, or
                        click to browse
                      </p>
                      {recordingType === "audio" && (
                        <p className="text-xs text-muted-foreground mb-2">
                          Video files are accepted - audio will be extracted
                          automatically
                        </p>
                      )}
                      {isExtractingAudio && (
                        <p className="text-sm text-blue-600 font-medium mb-2">
                          Extracting audio from video...
                        </p>
                      )}
                      <Input
                        id="file-upload"
                        type="file"
                        accept={
                          recordingType === "audio"
                            ? AUDIO_UPLOAD_ACCEPT
                            : "video/*"
                        }
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            void handleFileSelect(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                        ref={fileInputRef}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose File
                      </Button>
                    </div>
                    {isEditing && !uploadFile && editingRecording?.url !== "pending" && (
                      <p className="text-xs text-muted-foreground">
                        Current file:{" "}
                        {editingRecording.title ||
                          `${editingRecording.type} recording`}
                      </p>
                    )}
                    {uploadFile && (
                      <div className="space-y-2 mt-2">
                        <p className="text-sm text-muted-foreground">
                          Selected: {uploadFile.name} (
                          {formatFileSize(uploadFile.size)})
                        </p>
                        {recordingType === "audio" &&
                          ENABLE_EXPERIMENTAL_FEATURES && (
                            <div className="flex items-center gap-2 p-3 border rounded bg-green-50">
                              <Checkbox
                                id="compress-audio-unidentified"
                                checked={compressAudio}
                                onCheckedChange={(checked) => {
                                  if (!checked) {
                                    setCompressedFileSize(0);
                                    setOriginalFileSize(0);
                                  }
                                  setCompressAudio(checked === true);
                                }}
                                disabled={isCompressing}
                                className="h-4 w-4"
                              />
                              <Label
                                htmlFor="compress-audio-unidentified"
                                className="text-xs font-normal cursor-pointer flex-1"
                              >
                                <div className="flex flex-col gap-1">
                                  <span className="font-medium">
                                    Compress audio before upload
                                  </span>
                                  {isCompressing && (
                                    <span className="text-green-600 font-medium">
                                      Compressing... Please wait.
                                    </span>
                                  )}
                                  {!isCompressing &&
                                    compressedFileSize > 0 &&
                                    originalFileSize > 0 && (
                                      <span className="text-green-700">
                                        Before: {formatFileSize(originalFileSize)}{" "}
                                        → After:{" "}
                                        {formatFileSize(compressedFileSize)} (
                                        {(
                                          ((originalFileSize -
                                            compressedFileSize) /
                                            originalFileSize) *
                                          100
                                        ).toFixed(1)}
                                        % smaller)
                                      </span>
                                    )}
                                  {!isCompressing &&
                                    compressedFileSize === 0 &&
                                    uploadFile && (
                                      <span className="text-gray-600">
                                        Current size:{" "}
                                        {formatFileSize(uploadFile.size)}
                                      </span>
                                    )}
                                </div>
                              </Label>
                            </div>
                          )}
                        {recordingType === "audio" &&
                          displayBitrate &&
                          displayDuration && (
                            <p className="text-xs text-green-600">
                              Bitrate: {displayBitrate}bps • Duration:{" "}
                              {displayDuration}
                            </p>
                          )}
                      </div>
                    )}
                  </div>
                )}

                {(recordingType === "youtube" || recordingType === "link") && (
                  <div className="space-y-2">
                    <Label htmlFor="recording-url">URL *</Label>
                    <Input
                      id="recording-url"
                      {...register("url")}
                      placeholder={
                        recordingType === "youtube"
                          ? "https://www.youtube.com/watch?v=..."
                          : "https://..."
                      }
                    />
                    {errors.url && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.url.message}
                      </p>
                    )}
                  </div>
                )}

                {(recordingType === "audio" || recordingType === "video") && (
                  <div className="space-y-2">
                    <Label htmlFor="recording-url-alt">
                      Source URL (optional - link to where audio/video was
                      taken from)
                    </Label>
                    <Input
                      id="recording-url-alt"
                      {...register("url")}
                      placeholder="https://..."
                    />
                    {errors.url && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.url.message}
                      </p>
                    )}
                  </div>
                )}

                {recordingType === "audio" &&
                  urlValue &&
                  isDownloadableSocialUrl(urlValue) &&
                  ENABLE_EXPERIMENTAL_FEATURES && (
                    <YoutubeAudioDownloadField
                      checked={downloadYoutubeAudio}
                      onCheckedChange={(checked) => {
                        if (!checked) {
                          resetDownload();
                          setUploadFile(null);
                          setShowTrimmer(false);
                          setFileToTrim(null);
                          setAudioBitrate("");
                          setAudioDuration("");
                        } else {
                          setDownloadYoutubeAudio(true);
                        }
                      }}
                      isDownloading={isDownloading}
                      downloadProgress={downloadProgress}
                      downloadSpeed={downloadSpeed}
                      downloadEta={downloadEta}
                      downloadedFileSize={downloadedFileSize}
                      downloadedBitrate={downloadedBitrate}
                      downloadedDuration={downloadedDuration}
                    />
                  )}

                {showTrimmer && fileToTrim && ENABLE_EXPERIMENTAL_FEATURES && (
                  <AudioTrimmer
                    key={fileToTrim.name + fileToTrim.size}
                    audioFile={fileToTrim}
                    onTrimComplete={(trimmedFile, metadata) => {
                      setUploadFile(trimmedFile);
                      setFileToTrim(trimmedFile);
                      setShowTrimmer(false);
                      if (metadata?.bitrate) {
                        setAudioBitrate(metadata.bitrate);
                      }
                      if (metadata?.duration) {
                        setAudioDuration(metadata.duration);
                      }
                      setCompressAudio(false);
                      setIsCompressing(false);
                      setOriginalFileSize(0);
                      setCompressedFileSize(0);
                      toast.success("Audio trimmed and ready to upload!");
                    }}
                    onCancel={() => {
                      setShowTrimmer(false);
                      if (!uploadFile && fileToTrim) {
                        setUploadFile(fileToTrim);
                      }
                    }}
                  />
                )}

                {!showTrimmer &&
                  recordingType === "audio" &&
                  uploadFile &&
                  ENABLE_EXPERIMENTAL_FEATURES && (
                    <div className="flex items-center gap-2 p-3 border rounded bg-green-50">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">
                          Audio ready: {uploadFile.name}
                        </p>
                        <p className="text-xs text-green-600">
                          Size: {formatFileSize(uploadFile.size)}
                          {displayBitrate && ` • Bitrate: ${displayBitrate}bps`}
                          {displayDuration && ` • Duration: ${displayDuration}`}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFileToTrim(uploadFile);
                          setShowTrimmer(true);
                        }}
                      >
                        <Scissors className="h-4 w-4 mr-2" />
                        Trim Audio
                      </Button>
                    </div>
                  )}

                {recordingType === "audio" &&
                  uploadFile &&
                  !ENABLE_EXPERIMENTAL_FEATURES && (
                    <div className="flex items-center gap-2 p-3 border rounded bg-green-50">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">
                          Audio ready: {uploadFile.name}
                        </p>
                        <p className="text-xs text-green-600">
                          Size: {formatFileSize(uploadFile.size)}
                          {displayBitrate && ` • Bitrate: ${displayBitrate}bps`}
                          {displayDuration && ` • Duration: ${displayDuration}`}
                        </p>
                      </div>
                    </div>
                  )}

                <div className="space-y-2">
                  <Label htmlFor="suspected-hymn">
                    Suspected Hymn Title (optional)
                  </Label>
                  <Input
                    id="suspected-hymn"
                    {...register("suspectedHymnTitle")}
                    placeholder="If you have a guess about which hymn this is"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recording-title">Title (optional)</Label>
                  <Input
                    id="recording-title"
                    {...register("title")}
                    placeholder="Recording title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="performers">Performers</Label>
                    <MultiSelect
                      options={allPersons.map((p) => ({
                        value: p.id,
                        label: p.name,
                      }))}
                      selected={selectedPerformers}
                      onSelectionChange={setSelectedPerformers}
                      placeholder="Select performer"
                      searchPlaceholder="Search persons..."
                      emptyMessage="No persons found."
                      allowCustom={true}
                      customPlaceholder="Add custom performer name..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recording-year">Year (optional)</Label>
                    <Input
                      id="recording-year"
                      type="number"
                      {...register("year", { valueAsNumber: true })}
                      placeholder="2024"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                    {errors.year && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.year.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recording-duration">
                      Duration (optional)
                    </Label>
                    <Input
                      id="recording-duration"
                      {...register("duration")}
                      placeholder="e.g., 3:45"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="church-tradition">
                      Church Tradition (optional)
                    </Label>
                    <Select
                      value={watch("church")}
                      onValueChange={(value) => setValue("church", value)}
                    >
                      <SelectTrigger id="church-tradition">
                        <SelectValue placeholder="Select tradition" />
                      </SelectTrigger>
                      <SelectContent>
                        {CHURCH_TRADITIONS.map((church) => (
                          <SelectItem key={church} value={church}>
                            {church}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recording-description">
                    Description (optional)
                  </Label>
                  <Textarea
                    id="recording-description"
                    {...register("description")}
                    placeholder="Additional notes about this recording"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isUploading || isDownloading}
                  >
                    Cancel
                  </Button>
                    <Button
                      type="submit"
                      disabled={isUploading || isDownloading || isCompressing}
                    >
                      {isCompressing
                        ? "Compressing audio..."
                        : isDownloading
                          ? "Downloading audio..."
                          : isUploading
                            ? isEditing
                              ? "Updating..."
                              : "Uploading..."
                            : isEditing
                              ? "Update Recording"
                              : "Submit Recording"}
                  </Button>
                </div>
              </form>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex justify-center pt-4 border-t mt-4">
          <Button
            size="default"
            className="px-6"
            onClick={() => {
              if (showForm) {
                handleCancel();
              } else {
                setShowForm(true);
              }
            }}
          >
            <Plus className="h-5 w-5 mr-3" />
            {showForm
              ? isEditing
                ? "Cancel Edit"
                : "Cancel"
              : isEditing
                ? "Continue Editing"
                : "Submit an Unidentified Recording"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
