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
} from "@/lib/types/hymn";
import { personService } from "@/lib/hymn-services";
import { unidentifiedRecordingService } from "@/lib/unidentified-recording-services";
import { useAuth } from "@/lib/hooks/useAuth";
import { useYoutubeAudioDownload } from "@/lib/hooks/useYoutubeAudioDownload";
import { ENABLE_EXPERIMENTAL_FEATURES } from "@/lib/config";
import {
  formatFileSize,
  isDownloadableSocialUrl,
} from "@/lib/format-file-size";
import { Button } from "@/components/ui/button";
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
import { Plus, Upload } from "lucide-react";

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

export default function UnidentifiedRecordingSubmitCard() {
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
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

  const handleDownloadComplete = useCallback((file: File) => {
    setUploadFile(file);
  }, []);

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

  const handleCancel = () => {
    setShowForm(false);
    setUploadFile(null);
    setSelectedPerformers([]);
    resetDownload();
    reset();
  };

  const handleFileSelect = (file: File) => {
    setUploadFile(file);
    resetDownload();
  };

  const onSubmit = async (data: RecordingFormData) => {
    if (!user) {
      toast.error("You must be signed in to submit a recording");
      return;
    }

    if ((data.type === "audio" || data.type === "video") && !uploadFile) {
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

      if ((data.type === "audio" || data.type === "video") && uploadFile) {
        const recordingData = {
          type: data.type,
          url: "pending",
          contributorId,
          contributorName,
          ...(data.title ? { title: data.title } : {}),
          ...(data.year ? { year: data.year } : {}),
          ...(data.duration ? { duration: data.duration } : {}),
          ...(data.description ? { description: data.description } : {}),
          ...(data.church ? { church: data.church } : {}),
          ...(data.suspectedHymnTitle
            ? { suspectedHymnTitle: data.suspectedHymnTitle }
            : {}),
          ...(performerObjects.length > 0
            ? { performers: performerObjects }
            : {}),
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
      } else {
        const finalUrl = data.url || "";
        const recordingData = {
          type: data.type,
          url: finalUrl,
          contributorId,
          contributorName,
          ...(data.title ? { title: data.title } : {}),
          ...(data.year ? { year: data.year } : {}),
          ...(data.duration ? { duration: data.duration } : {}),
          ...(data.description ? { description: data.description } : {}),
          ...(data.church ? { church: data.church } : {}),
          ...(data.suspectedHymnTitle
            ? { suspectedHymnTitle: data.suspectedHymnTitle }
            : {}),
          ...(performerObjects.length > 0
            ? { performers: performerObjects }
            : {}),
        };

        await unidentifiedRecordingService.create(recordingData);
      }

      toast.success("Unidentified recording submitted successfully!");
      handleCancel();
      router.refresh();
    } catch (error) {
      console.error("Error submitting recording:", error);
      toast.error("Failed to submit recording");
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
        <CardTitle className="text-lg">Submit a Recording</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <p className="text-sm text-muted-foreground mb-3 leading-snug">
          Have a recording of a hymn you cannot identify? Submit it here with as
          much detail as you can — performer, church tradition, year, and any
          guess about the hymn title.
        </p>

        <Collapsible open={showForm} onOpenChange={setShowForm}>
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
                    <Label htmlFor="file-upload">Upload File</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drag and drop your file here, or click to browse
                      </p>
                      <Input
                        id="file-upload"
                        type="file"
                        accept={
                          recordingType === "audio" ? "audio/*" : "video/*"
                        }
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileSelect(e.target.files[0]);
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
                    {uploadFile && (
                      <div className="space-y-2 mt-2">
                        <p className="text-sm text-muted-foreground">
                          Selected: {uploadFile.name} (
                          {formatFileSize(uploadFile.size)})
                        </p>
                        {recordingType === "audio" &&
                          downloadedBitrate &&
                          downloadedDuration && (
                            <p className="text-xs text-green-600">
                              Bitrate: {downloadedBitrate}bps • Duration:{" "}
                              {downloadedDuration}
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
                    disabled={isUploading || isDownloading}
                  >
                    {isDownloading
                      ? "Downloading audio..."
                      : isUploading
                        ? "Uploading..."
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
            {showForm ? "Cancel" : "Submit an Unidentified Recording"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
