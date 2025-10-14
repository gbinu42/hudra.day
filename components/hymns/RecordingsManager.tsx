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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { hymnService, personService } from "@/lib/hymn-services";
import {
  HymnRecording,
  RecordingType,
  CHURCH_TRADITIONS,
} from "@/lib/types/hymn";
import { Plus, Trash2, Music, Video, ExternalLink } from "lucide-react";
import { useEffect } from "react";

const recordingSchema = z.object({
  type: z.enum(["audio", "video", "youtube", "link"]),
  url: z.string().url("Please enter a valid URL"),
  title: z.string().optional(),
  performerId: z.string().optional(),
  performerName: z.string().optional(),
  year: z.number().optional(),
  duration: z.string().optional(),
  description: z.string().optional(),
  church: z.string().optional(),
});

type RecordingFormData = z.infer<typeof recordingSchema>;

interface RecordingsManagerProps {
  hymnId: string;
  recordings: HymnRecording[];
  contributorId: string;
  contributorName: string;
  onUpdate: () => void;
}

export default function RecordingsManager({
  hymnId,
  recordings,
  contributorId,
  contributorName,
  onUpdate,
}: RecordingsManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [performers, setPerformers] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

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
      performerId: "",
      performerName: "",
      year: undefined,
      duration: "",
      description: "",
      church: "",
    },
  });

  const recordingType = watch("type");

  // Load performers
  useEffect(() => {
    const loadPerformers = async () => {
      try {
        const snapshot = await personService.getPersonsByRole("performer");
        const performersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setPerformers(performersData);
      } catch (error) {
        console.error("Error loading performers:", error);
      }
    };
    loadPerformers();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: RecordingFormData) => {
    setIsUploading(true);
    try {
      let finalUrl = data.url;

      // If file upload is needed for audio/video
      if ((data.type === "audio" || data.type === "video") && uploadFile) {
        const folder = data.type === "audio" ? "audio" : "video";
        finalUrl = await hymnService.uploadFile(hymnId, uploadFile, folder);
      }

      await hymnService.addRecording(hymnId, {
        type: data.type,
        url: finalUrl,
        title: data.title,
        performerId: data.performerId,
        performerName: data.performerName,
        contributorId,
        contributorName,
        year: data.year,
        duration: data.duration,
        description: data.description,
        church: data.church,
      });

      toast.success("Recording added successfully!");
      reset();
      setUploadFile(null);
      setIsOpen(false);
      onUpdate();
    } catch (error) {
      console.error("Error adding recording:", error);
      toast.error("Failed to add recording");
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
        <div className="flex justify-between items-center">
          <CardTitle>Recordings</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Recording
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Recording</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label>Recording Type</Label>
                  <Select
                    value={recordingType}
                    onValueChange={(value: RecordingType) =>
                      setValue("type", value)
                    }
                  >
                    <SelectTrigger>
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
                  <div>
                    <Label>Upload File</Label>
                    <Input
                      type="file"
                      accept={recordingType === "audio" ? "audio/*" : "video/*"}
                      onChange={handleFileSelect}
                    />
                    {uploadFile && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Selected: {uploadFile.name}
                      </p>
                    )}
                  </div>
                )}

                {(recordingType === "youtube" || recordingType === "link") && (
                  <div>
                    <Label>URL</Label>
                    <Input {...register("url")} placeholder="https://..." />
                    {errors.url && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.url.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <Label>Title (optional)</Label>
                  <Input {...register("title")} placeholder="Recording title" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Performer</Label>
                    <Select
                      value={watch("performerId")}
                      onValueChange={(value) => {
                        setValue("performerId", value);
                        const performer = performers.find(
                          (p) => p.id === value
                        );
                        if (performer) {
                          setValue("performerName", performer.name);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select performer" />
                      </SelectTrigger>
                      <SelectContent>
                        {performers.map((performer) => (
                          <SelectItem key={performer.id} value={performer.id}>
                            {performer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Year (optional)</Label>
                    <Input
                      type="number"
                      {...register("year", { valueAsNumber: true })}
                      placeholder="2024"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Duration (optional)</Label>
                    <Input {...register("duration")} placeholder="e.g., 3:45" />
                  </div>
                  <div>
                    <Label>Church Tradition (optional)</Label>
                    <Select
                      value={watch("church")}
                      onValueChange={(value) => setValue("church", value)}
                    >
                      <SelectTrigger>
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

                <div>
                  <Label>Description (optional)</Label>
                  <Textarea
                    {...register("description")}
                    placeholder="Additional notes about this recording"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Add Recording"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {recordings.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No recordings yet. Add the first recording!
          </p>
        ) : (
          <div className="space-y-4">
            {recordings.map((recording) => (
              <div
                key={recording.id}
                className="flex items-start justify-between p-4 border rounded"
              >
                <div className="flex items-start gap-3 flex-1">
                  {getRecordingIcon(recording.type)}
                  <div className="flex-1">
                    <h4 className="font-semibold">
                      {recording.title || `${recording.type} recording`}
                    </h4>
                    {recording.performerName && (
                      <p className="text-sm text-muted-foreground">
                        Performer: {recording.performerName}
                      </p>
                    )}
                    {recording.year && (
                      <p className="text-sm text-muted-foreground">
                        Year: {recording.year}
                      </p>
                    )}
                    {recording.church && (
                      <p className="text-sm text-muted-foreground">
                        Tradition: {recording.church}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(recording.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
