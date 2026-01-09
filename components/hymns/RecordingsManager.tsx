"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { hymnService, personService } from "@/lib/hymn-services";
import {
  HymnRecording,
  RecordingType,
  CreateRecordingData,
  CHURCH_TRADITIONS,
} from "@/lib/types/hymn";
import {
  Plus,
  Trash2,
  Music,
  Video,
  ExternalLink,
  Upload,
  X,
  Edit,
  Check,
  XCircle,
  Scissors,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { Checkbox } from "@/components/ui/checkbox";
import AudioTrimmer from "./AudioTrimmer";

const recordingSchema = z
  .object({
    type: z.enum(["audio", "video", "youtube", "link"]),
    url: z.string().optional(),
    title: z.string().optional(),
    performers: z.array(z.string()).optional(),
    year: z
      .union([z.number(), z.nan()])
      .optional()
      .transform((val) =>
        val === undefined || isNaN(val as number) ? undefined : val
      ),
    duration: z.string().optional(),
    description: z.string().optional(),
    church: z.string().optional(),
  })
  .refine(
    (data) => {
      // URL is required for youtube and link types
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
      // If URL is provided, it must be a valid URL
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

interface RecordingsManagerProps {
  hymnId: string;
  recordings: HymnRecording[];
  contributorId: string;
  contributorName: string;
  userRole?: string;
  onUpdate: () => void;
  hymnName?: string;
}

export default function RecordingsManager({
  hymnId,
  recordings,
  contributorId,
  contributorName,
  userRole,
  onUpdate,
  hymnName,
}: RecordingsManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingRecordingId, setEditingRecordingId] = useState<string | null>(
    null
  );
  const [allPersons, setAllPersons] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [selectedPerformers, setSelectedPerformers] = useState<
    MultiSelectOption[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [adminAudioFile, setAdminAudioFile] = useState<File | null>(null);
  const [downloadYoutubeAudio, setDownloadYoutubeAudio] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadedFileSize, setDownloadedFileSize] = useState<string>("");
  const [showTrimmer, setShowTrimmer] = useState(false);
  const [fileToTrim, setFileToTrim] = useState<File | null>(null);
  const [compressAudio, setCompressAudio] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [originalFileSize, setOriginalFileSize] = useState<number>(0);
  const [compressedFileSize, setCompressedFileSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const adminAudioInputRef = useRef<HTMLInputElement>(null);
  const [titleManuallyEdited, setTitleManuallyEdited] = useState(false);

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const isAdmin = userRole === "admin";
  const isEditing = editingRecordingId !== null;

  // Filter recordings based on user permissions
  const visibleRecordings = recordings.filter((recording) => {
    if (isAdmin) return true; // Admins see all recordings
    if ((recording.status || "approved") === "approved") return true; // Everyone sees approved recordings (default to approved for legacy recordings)
    if (recording.contributorId === contributorId) return true; // Users see their own pending recordings
    return false; // Hide other users' pending/rejected recordings
  });

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
    },
  });

  const recordingType = watch("type");
  const urlValue = watch("url");
  const titleValue = watch("title");

  // Load all persons for performer selection
  useEffect(() => {
    const loadPersons = async () => {
      try {
        const snapshot = await personService.getAllPersons();
        const personsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setAllPersons(personsData);
      } catch (error) {
        console.error("Error loading persons:", error);
      }
    };
    loadPersons();
  }, []);

  // Auto-generate title when performers are selected
  useEffect(() => {
    // Only auto-generate for new recordings (not when editing)
    if (isEditing) return;

    // If all performers are removed, clear the title and reset manual edit flag
    if (selectedPerformers.length === 0) {
      setValue("title", "");
      setTitleManuallyEdited(false);
      return;
    }

    // Only proceed if hymn name is available
    if (!hymnName) return;

    // Don't override manually edited title
    if (titleManuallyEdited) return;

    // Generate title: "{hymn name} - {performer(s)}"
    const performerNames = selectedPerformers.map((p) => p.name).join(", ");
    const autoGeneratedTitle = `${hymnName} - ${performerNames}`;
    
    setValue("title", autoGeneratedTitle);
  }, [selectedPerformers, hymnName, isEditing, titleManuallyEdited, setValue]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadFile(file);
      // Reset compression state when new file is selected
      setCompressAudio(false);
      setIsCompressing(false);
      setOriginalFileSize(0);
      setCompressedFileSize(0);
      // Allow trimming for directly uploaded audio files too
      if (recordingType === "audio") {
        setFileToTrim(file);
      } else {
        setShowTrimmer(false);
        setFileToTrim(null);
      }
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const acceptedTypes = recordingType === "audio" ? ["audio/"] : ["video/"];

      if (acceptedTypes.some((type) => file.type.startsWith(type))) {
        setUploadFile(file);
        // Reset compression state when new file is dropped
        setCompressAudio(false);
        setIsCompressing(false);
        setOriginalFileSize(0);
        setCompressedFileSize(0);
        // Allow trimming for directly dropped audio files too
        if (recordingType === "audio") {
          setFileToTrim(file);
        } else {
          setShowTrimmer(false);
          setFileToTrim(null);
        }
      } else {
        toast.error(`Please select a valid ${recordingType} file`);
      }
    }
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
    const items = e.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) {
          const acceptedTypes =
            recordingType === "audio" ? ["audio/"] : ["video/"];

          if (acceptedTypes.some((type) => file.type.startsWith(type))) {
            setUploadFile(file);
            // Reset compression state when new file is pasted
            setCompressAudio(false);
            setIsCompressing(false);
            setOriginalFileSize(0);
            setCompressedFileSize(0);
            // Allow trimming for directly pasted audio files too
            if (recordingType === "audio") {
              setFileToTrim(file);
            } else {
              setShowTrimmer(false);
              setFileToTrim(null);
            }
            break;
          } else {
            toast.error(`Please paste a valid ${recordingType} file`);
          }
        }
      }
    }
  };

  const handleEdit = (recording: HymnRecording) => {
    if (!isAdmin) return;

    setEditingRecordingId(recording.id);
    setValue("type", recording.type);
    setValue("url", recording.originalUrl || recording.url || "");
    setValue("title", recording.title || "");
    setValue("year", recording.year);
    setValue("duration", recording.duration || "");
    setValue("description", recording.description || "");
    setValue("church", recording.church || "");

    // Set performers
    if (recording.performers) {
      setSelectedPerformers(
        recording.performers.map((p) => ({
          id: p.id,
          name: p.name,
          value: p.id,
          label: p.name,
        }))
      );
    }

    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingRecordingId(null);
    reset();
    setUploadFile(null);
    setAdminAudioFile(null);
    setDownloadYoutubeAudio(false);
    setDownloadedFileSize("");
    downloadedUrlRef.current = "";
    setSelectedPerformers([]);
    setShowForm(false);
    setShowTrimmer(false);
    setFileToTrim(null);
    setCompressAudio(false);
    setIsCompressing(false);
    setOriginalFileSize(0);
    setCompressedFileSize(0);
    setTitleManuallyEdited(false);
  };

  // Handle YouTube audio download when checkbox is checked
  const downloadedUrlRef = useRef<string>("");

  useEffect(() => {
    const handleDownload = async () => {
      const url = urlValue;
      
      // Only proceed if checkbox is checked, URL exists, and we haven't already downloaded this URL
      if (!url || !downloadYoutubeAudio || isDownloading) return;
      
      // Prevent downloading the same URL multiple times
      if (downloadedUrlRef.current === url) return;

      downloadedUrlRef.current = url;
      setIsDownloading(true);
      
      try {
        const response = await fetch("/api/download-youtube", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.details || "Failed to download YouTube audio");
        }

        // Get the downloaded file
        const blob = await response.blob();
        const fileName = response.headers.get("X-File-Name") || "youtube_audio.webm";
        const file = new File([blob], fileName, { type: blob.type });
        
        // Set file size
        setDownloadedFileSize(formatFileSize(file.size));
        
        // Reset compression state for new downloaded file
        setCompressAudio(false);
        setIsCompressing(false);
        setOriginalFileSize(0);
        setCompressedFileSize(0);
        
        // Set as the upload file and keep reference for trimming
        setFileToTrim(file);
        setUploadFile(file);
        toast.success(`Audio downloaded successfully! (${formatFileSize(file.size)}) - Click "Trim Audio" if you want to trim it.`);
      } catch (error) {
        console.error("Error downloading YouTube audio:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to download YouTube audio"
        );
        // Uncheck the checkbox on error and reset the ref
        setDownloadYoutubeAudio(false);
        downloadedUrlRef.current = "";
      } finally {
        setIsDownloading(false);
      }
    };

    if (downloadYoutubeAudio) {
      handleDownload();
    }
  }, [downloadYoutubeAudio, urlValue, isDownloading]);

  // Handle audio compression when checkbox is checked
  useEffect(() => {
    const handleCompress = async () => {
      if (!uploadFile || !compressAudio || isCompressing) return;

      // Don't compress if file is already compressed (has "_compressed" in name)
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
        formData.append("quality", "medium"); // Can be made configurable

        const response = await fetch("/api/compress-audio", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.details || "Failed to compress audio");
        }

        // Get compressed file with original extension
        const blob = await response.blob();
        const fileExtension = uploadFile.name.split('.').pop() || 'mp3';
        const originalName = uploadFile.name.replace(/\.[^/.]+$/, "");
        
        // Get content type from response (API returns correct MIME type)
        const contentType = response.headers.get("Content-Type") || "audio/mpeg";
        
        const compressedFile = new File([blob], `${originalName}_compressed.${fileExtension}`, { 
          type: contentType
        });

        // Get size information from headers
        const compressedSize = parseInt(response.headers.get("X-Compressed-Size") || "0");

        setCompressedFileSize(compressedSize);
        setUploadFile(compressedFile);

        const reduction = ((originalSizeToStore - compressedSize) / originalSizeToStore * 100).toFixed(1);
        toast.success(
          `Audio compressed! Original: ${formatFileSize(originalSizeToStore)}, ` +
          `Compressed: ${formatFileSize(compressedSize)} (${reduction}% reduction)`
        );
      } catch (error) {
        console.error("Error compressing audio:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to compress audio"
        );
        // Reset compression state on error
        setCompressAudio(false);
        setOriginalFileSize(0);
        setCompressedFileSize(0);
      } finally {
        setIsCompressing(false);
      }
    };

    if (compressAudio && uploadFile && recordingType === "audio") {
      handleCompress();
    }
  }, [compressAudio, uploadFile, isCompressing, recordingType]);

  const onSubmit = async (data: RecordingFormData) => {
    setIsUploading(true);
    try {
      let finalUrl = "";
      let adminAudioUrl: string | undefined;

      // Handle file upload for audio/video (this becomes the main recording URL)
      if ((data.type === "audio" || data.type === "video") && uploadFile) {
        const folder = data.type === "audio" ? "audio" : "video";

        // If editing, delete the old file before uploading the new one
        if (isEditing) {
          const currentRecording = recordings.find(
            (r) => r.id === editingRecordingId
          );
          if (currentRecording && currentRecording.url) {
            try {
              await hymnService.deleteFile(currentRecording.url);
            } catch (error) {
              console.warn("Failed to delete old file:", error);
              // Continue with upload even if deletion fails
            }
          }
        }

        finalUrl = await hymnService.uploadFile(hymnId, uploadFile, folder);
      } else if (data.type === "audio" || data.type === "video") {
        // For audio/video types, file upload is required only for new recordings
        if (!isEditing) {
          toast.error("Please upload a file for audio/video recordings");
          setIsUploading(false);
          return;
        }
        // For editing, we can keep the existing URL if no new file is uploaded
      } else if (data.type === "youtube" || data.type === "link") {
        // For YouTube and external links, URL is required
        finalUrl = data.url || "";
        if (!finalUrl) {
          toast.error(
            "Please provide a URL for YouTube videos and external links"
          );
          setIsUploading(false);
          return;
        }
      }

      // Handle admin audio upload for YouTube videos
      if (data.type === "youtube" && adminAudioFile && isAdmin) {
        adminAudioUrl = await hymnService.uploadFile(
          hymnId,
          adminAudioFile,
          "audio"
        );
      }

      // Convert selected performers to performer objects
      const performerObjects = selectedPerformers.map((performer) => ({
        ...(performer.id && { id: performer.id }), // Only include id if it exists
        name: performer.name,
      }));

      if (isEditing) {
        // Update existing recording
        const recordingData: Partial<HymnRecording> = {
          type: data.type,
        };

        // Only add fields if they have values (not undefined)
        if (data.title !== undefined && data.title !== "") {
          recordingData.title = data.title;
        }
        if (data.year !== undefined) {
          recordingData.year = data.year;
        }
        if (data.duration !== undefined && data.duration !== "") {
          recordingData.duration = data.duration;
        }
        if (data.description !== undefined && data.description !== "") {
          recordingData.description = data.description;
        }
        if (data.church !== undefined && data.church !== "") {
          recordingData.church = data.church;
        }

        // Only add performers if there are any
        if (performerObjects.length > 0) {
          recordingData.performers = performerObjects;
        }

        // Store original URL if provided (for audio/video)
        if ((data.type === "audio" || data.type === "video") && data.url) {
          recordingData.originalUrl = data.url;
        }

        // Update main URL based on type
        if (data.type === "youtube" || data.type === "link") {
          // For YouTube and links, URL is the main recording URL
          recordingData.url = finalUrl;
        } else if (data.type === "audio" || data.type === "video") {
          // For audio/video, only update URL if new file was uploaded
          if (uploadFile) {
            recordingData.url = finalUrl;
          }
        }

        // Only update admin audio if new file was uploaded
        if (adminAudioFile) {
          recordingData.adminAudioUrl = adminAudioUrl;
        }

        await hymnService.updateRecording(
          hymnId,
          editingRecordingId!,
          recordingData
        );
        toast.success("Recording updated successfully!");
      } else {
        // Add new recording
        const newRecordingData: CreateRecordingData = {
          type: data.type,
          url: finalUrl,
          contributorId,
          contributorName,
        };

        // Add optional fields only if they have values
        if (data.title) newRecordingData.title = data.title;
        if (data.year) newRecordingData.year = data.year;
        if (data.duration) newRecordingData.duration = data.duration;
        if (data.description) newRecordingData.description = data.description;
        if (data.church) newRecordingData.church = data.church;

        // Store original URL if provided (for audio/video)
        if ((data.type === "audio" || data.type === "video") && data.url) {
          newRecordingData.originalUrl = data.url;
        }

        // Only add performers if there are any
        if (performerObjects.length > 0) {
          newRecordingData.performers = performerObjects;
        }

        // Only add adminAudioUrl if it exists
        if (adminAudioUrl) {
          newRecordingData.adminAudioUrl = adminAudioUrl;
        }

        await hymnService.addRecording(hymnId, newRecordingData, userRole);
        if (userRole === "admin") {
          toast.success("Recording added successfully!");
        } else {
          toast.success("Recording submitted for review!");
        }
      }

      handleCancelEdit();
      onUpdate();
    } catch (error) {
      console.error("Error saving recording:", error);
      toast.error(`Failed to ${isEditing ? "update" : "add"} recording`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (recordingId: string) => {
    if (!confirm("Are you sure you want to delete this recording?")) {
      return;
    }

    try {
      await hymnService.deleteRecording(hymnId, recordingId);
      toast.success("Recording deleted successfully!");
      onUpdate();
    } catch (error) {
      console.error("Error deleting recording:", error);
      toast.error("Failed to delete recording");
    }
  };

  const handleApprove = async (recordingId: string) => {
    try {
      await hymnService.updateRecordingStatus(hymnId, recordingId, "approved");
      toast.success("Recording approved!");
      onUpdate();
    } catch (error) {
      console.error("Error approving recording:", error);
      toast.error("Failed to approve recording");
    }
  };

  const handleReject = async (recordingId: string) => {
    if (!confirm("Are you sure you want to reject this recording?")) {
      return;
    }

    try {
      await hymnService.updateRecordingStatus(hymnId, recordingId, "rejected");
      toast.success("Recording rejected!");
      onUpdate();
    } catch (error) {
      console.error("Error rejecting recording:", error);
      toast.error("Failed to reject recording");
    }
  };

  const getRecordingIcon = (type: RecordingType) => {
    switch (type) {
      case "audio":
        return <Music className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "youtube":
      case "link":
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recordings</CardTitle>
      </CardHeader>
      <CardContent>
        {visibleRecordings.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No recordings yet. Add the first recording!
          </p>
        ) : (
          <div className="space-y-4">
            {visibleRecordings.map((recording) => (
              <div
                key={recording.id}
                className="flex items-start justify-between p-4 border rounded"
              >
                <div className="flex items-start gap-3 flex-1">
                  {getRecordingIcon(recording.type)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">
                      {recording.title || `${recording.type} recording`}
                    </h4>
                    {recording.performers &&
                      recording.performers.length > 0 && (
                        <p className="text-base text-muted-foreground">
                          Performers:{" "}
                          {recording.performers.map((p) => p.name).join(", ")}
                        </p>
                      )}
                    {recording.year && (
                      <p className="text-base text-muted-foreground">
                        Year: {recording.year}
                      </p>
                    )}
                    {recording.church && (
                      <p className="text-base text-muted-foreground">
                        Tradition: {recording.church}
                      </p>
                    )}
                    {recording.description && (
                      <p className="text-base text-muted-foreground italic">
                        {recording.description}
                      </p>
                    )}
                    {recording.contributorName && (
                      <p className="text-sm text-muted-foreground">
                        Added by {recording.contributorName}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          (recording.status || "approved") === "approved"
                            ? "bg-green-100 text-green-800"
                            : (recording.status || "approved") === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {(recording.status || "approved")
                          .charAt(0)
                          .toUpperCase() +
                          (recording.status || "approved").slice(1)}
                      </span>
                      {isAdmin &&
                        (recording.status || "approved") === "pending" && (
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleApprove(recording.id)}
                              className="h-6 px-2 text-green-600 hover:text-green-700"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReject(recording.id)}
                              className="h-6 px-2 text-red-600 hover:text-red-700"
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                    </div>
                    {/* Audio/Video Player */}
                    {(recording.type === "audio" ||
                      recording.type === "video") && (
                      <div className="mt-3">
                        {recording.type === "audio" ? (
                          <audio
                            controls
                            preload="none"
                            controlsList="nodownload"
                            className="w-full h-8"
                          >
                            <source src={recording.url} type="audio/mpeg" />
                            <source src={recording.url} type="audio/wav" />
                            <source src={recording.url} type="audio/ogg" />
                            Your browser does not support the audio element.
                          </audio>
                        ) : (
                          <video
                            controls
                            preload="none"
                            controlsList="nodownload"
                            className="w-full max-w-md rounded border"
                          >
                            <source src={recording.url} type="video/mp4" />
                            <source src={recording.url} type="video/webm" />
                            <source src={recording.url} type="video/ogg" />
                            Your browser does not support the video element.
                          </video>
                        )}
                      </div>
                    )}

                    {isAdmin && recording.adminAudioUrl && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                        <p className="text-xs text-red-800 font-semibold mb-1">
                          Admin Audio (Private)
                        </p>
                        <audio controls preload="none" className="w-full h-8">
                          <source
                            src={recording.adminAudioUrl}
                            type="audio/mpeg"
                          />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {(recording.type === "youtube" ||
                    recording.type === "link") && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(recording.url, "_blank")}
                    >
                      {recording.type === "youtube" ? "Watch" : "Visit"}
                    </Button>
                  )}
                  {(recording.type === "audio" || recording.type === "video") &&
                    recording.originalUrl &&
                    !recording.originalUrl.includes(
                      "firebasestorage.googleapis.com"
                    ) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(recording.originalUrl, "_blank")
                        }
                      >
                        Open
                      </Button>
                    )}
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(recording)}
                    >
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                  )}
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(recording.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Recording Form */}
        <Collapsible open={showForm} onOpenChange={setShowForm}>
          <CollapsibleContent>
            <div className="border rounded-lg p-4 mt-6 bg-muted/50">
              <h3 className="text-lg font-semibold mb-4">
                {isEditing ? "Edit Recording" : "Add New Recording"}
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
                      onDrop={handleFileDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onPaste={handleFilePaste}
                    >
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drag and drop your file here, paste from clipboard, or
                        click to browse
                      </p>
                      <Input
                        id="file-upload"
                        type="file"
                        accept={
                          recordingType === "audio" ? "audio/*" : "video/*"
                        }
                        onChange={handleFileSelect}
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
                          Selected: {uploadFile.name}
                        </p>
                        {recordingType === "audio" && (
                          <div className="flex items-center gap-2 p-3 border rounded bg-green-50">
                            <Checkbox
                              id="compress-audio"
                              checked={compressAudio}
                              onCheckedChange={(checked) => {
                                if (!checked) {
                                  // Reset when unchecked
                                  setCompressedFileSize(0);
                                  setOriginalFileSize(0);
                                }
                                setCompressAudio(checked === true);
                              }}
                              disabled={isCompressing}
                              className="h-4 w-4"
                            />
                            <Label
                              htmlFor="compress-audio"
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
                                {!isCompressing && compressedFileSize > 0 && originalFileSize > 0 && (
                                  <span className="text-green-700">
                                    ✓ Before: {formatFileSize(originalFileSize)} → After: {formatFileSize(compressedFileSize)}
                                    {" "}({((originalFileSize - compressedFileSize) / originalFileSize * 100).toFixed(1)}% smaller)
                                  </span>
                                )}
                                {!isCompressing && compressedFileSize === 0 && uploadFile && (
                                  <span className="text-gray-600">
                                    Current size: {formatFileSize(uploadFile.size)}
                                  </span>
                                )}
                              </div>
                            </Label>
                          </div>
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
                      placeholder="https://..."
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
                      Source URL (optional - link to where audio/video was taken
                      from)
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
                 (urlValue.includes("youtube.com") || urlValue.includes("youtu.be") || 
                  urlValue.includes("facebook.com") || urlValue.includes("fb.com") || urlValue.includes("fb.watch")) && (
                  <div className="flex items-center gap-2 p-2 border rounded bg-blue-50">
                    <Checkbox
                      id="download-youtube-audio"
                      checked={downloadYoutubeAudio}
                      onCheckedChange={(checked) => {
                        if (!checked) {
                          // Reset when unchecked
                          downloadedUrlRef.current = "";
                          setDownloadedFileSize("");
                          setUploadFile(null);
                          setShowTrimmer(false);
                          setFileToTrim(null);
                          setCompressAudio(false);
                          setIsCompressing(false);
                          setOriginalFileSize(0);
                          setCompressedFileSize(0);
                        }
                        setDownloadYoutubeAudio(checked === true);
                      }}
                      className="h-4 w-4"
                    />
                    <Label
                      htmlFor="download-youtube-audio"
                      className="text-xs font-normal cursor-pointer flex-1"
                    >
                      Download audio from YouTube/Facebook using yt-dlp
                      {isDownloading && (
                        <span className="ml-2 text-blue-600 font-medium">
                          (downloading...)
                        </span>
                      )}
                      {!isDownloading && downloadedFileSize && (
                        <span className="ml-2 text-green-600 font-medium">
                          ✓ Downloaded ({downloadedFileSize})
                        </span>
                      )}
                    </Label>
                  </div>
                )}

                {recordingType === "youtube" && isAdmin && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="admin-audio"
                      className="flex items-center gap-2"
                    >
                      <span>Admin Audio File (optional)</span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                        Admin Only
                      </span>
                    </Label>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        id="admin-audio"
                        accept="audio/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setAdminAudioFile(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                        ref={adminAudioInputRef}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => adminAudioInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Audio File
                      </Button>
                      {adminAudioFile && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setAdminAudioFile(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {adminAudioFile && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {adminAudioFile.name}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Upload an audio file for this YouTube video. This file
                      will only be visible to admins.
                    </p>
                  </div>
                )}

                {/* Audio Trimmer */}
                {showTrimmer && fileToTrim && (
                  <AudioTrimmer
                    key={fileToTrim.name + fileToTrim.size}
                    audioFile={fileToTrim}
                    onTrimComplete={(trimmedFile) => {
                      setUploadFile(trimmedFile);
                      setFileToTrim(trimmedFile); // Update fileToTrim so re-trimming uses the trimmed version
                      setShowTrimmer(false);
                      // Reset compression state when trimmed since it's a new file
                      setCompressAudio(false);
                      setIsCompressing(false);
                      setOriginalFileSize(0);
                      setCompressedFileSize(0);
                      toast.success("Audio trimmed and ready to upload!");
                    }}
                    onCancel={() => {
                      setShowTrimmer(false);
                      // Keep the current upload file (either trimmed or original)
                      if (!uploadFile && fileToTrim) {
                        setUploadFile(fileToTrim);
                      }
                    }}
                  />
                )}

                {/* Show trim button for ANY selected audio file (downloaded via yt-dlp or uploaded directly) */}
                {!showTrimmer && recordingType === "audio" && uploadFile && (
                  <div className="flex items-center gap-2 p-3 border rounded bg-green-50">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800">
                        Audio ready: {uploadFile.name}
                      </p>
                      <p className="text-xs text-green-600">
                        Size: {formatFileSize(uploadFile.size)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Use the current uploadFile for trimming (which could already be trimmed)
                        setFileToTrim(uploadFile);
                        setShowTrimmer(true);
                      }}
                    >
                      <Scissors className="h-4 w-4 mr-2" />
                      Trim Audio
                    </Button>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="recording-title">Title (optional)</Label>
                  <Input
                    id="recording-title"
                    {...register("title")}
                    placeholder="Recording title"
                    onChange={(e) => {
                      setValue("title", e.target.value);
                      // Mark as manually edited if the user types something
                      setTitleManuallyEdited(true);
                    }}
                  />
                  {!isEditing && hymnName && selectedPerformers.length > 0 && !titleManuallyEdited && titleValue && (
                    <p className="text-xs text-muted-foreground">
                      Auto-generated from hymn name and performer
                    </p>
                  )}
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
                    onClick={handleCancelEdit}
                    disabled={isUploading || isDownloading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isUploading || isDownloading}>
                    {isDownloading
                      ? "Downloading from YouTube..."
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

        {/* Prominent Submit Recording Button */}
        <div className="flex justify-center pt-6 border-t mt-6">
          <Button
            size="lg"
            className="px-8 py-3 text-base font-semibold"
            onClick={() => {
              if (showForm) {
                handleCancelEdit();
              } else {
                setShowForm(true);
              }
            }}
          >
            <Plus className="h-5 w-5 mr-3" />
            {showForm ? "Cancel" : "Submit an Audio/Video Recording"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
