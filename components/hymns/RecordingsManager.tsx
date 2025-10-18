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
} from "lucide-react";
import { useEffect, useRef } from "react";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";

const recordingSchema = z
  .object({
    type: z.enum(["audio", "video", "youtube", "link"]),
    url: z.string().optional(),
    title: z.string().optional(),
    performers: z.array(z.string()).optional(),
    year: z.number().optional(),
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
}

export default function RecordingsManager({
  hymnId,
  recordings,
  contributorId,
  contributorName,
  userRole,
  onUpdate,
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const adminAudioInputRef = useRef<HTMLInputElement>(null);

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
      type: "youtube",
      url: "",
      title: "",
      year: undefined,
      duration: "",
      description: "",
      church: "",
    },
  });

  const recordingType = watch("type");

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
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
    setSelectedPerformers([]);
    setShowForm(false);
  };

  const onSubmit = async (data: RecordingFormData) => {
    setIsUploading(true);
    try {
      let finalUrl = "";
      let adminAudioUrl: string | undefined;

      // Handle file upload for audio/video (this becomes the main recording URL)
      if ((data.type === "audio" || data.type === "video") && uploadFile) {
        const folder = data.type === "audio" ? "audio" : "video";
        finalUrl = await hymnService.uploadFile(hymnId, uploadFile, folder);
      } else if (data.type === "audio" || data.type === "video") {
        // For audio/video types, file upload is required
        toast.error("Please upload a file for audio/video recordings");
        setIsUploading(false);
        return;
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
        id: performer.id,
        name: performer.name,
      }));

      if (isEditing) {
        // Update existing recording
        const recordingData: Partial<HymnRecording> = {
          type: data.type,
          title: data.title,
          year: data.year,
          duration: data.duration,
          description: data.description,
          church: data.church,
        };

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
        <Collapsible open={showForm} onOpenChange={setShowForm}>
          <CollapsibleContent>
            <div className="border rounded-lg p-4 mb-6 bg-muted/50">
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
                      <p className="text-sm text-muted-foreground mt-2">
                        Selected: {uploadFile.name}
                      </p>
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
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isUploading}>
                    {isUploading
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
                      <p className="text-base text-muted-foreground">
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
                    recording.originalUrl && (
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(recording.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

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
