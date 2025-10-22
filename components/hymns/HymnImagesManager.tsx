"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
import { hymnService } from "@/lib/hymn-services";
import {
  HymnImageGroup,
  CHURCH_TRADITIONS,
  sortByChurchPriority,
} from "@/lib/types/hymn";
import Image from "next/image";
import { Plus, Trash2, Image as ImageIcon, Edit } from "lucide-react";

const hymnImageSchema = z.object({
  churchName: z.string().optional(),
  description: z.string().optional(),
  source: z.string().optional(),
});

type HymnImageFormData = z.infer<typeof hymnImageSchema>;

interface HymnImagesManagerProps {
  hymnId: string;
  imageGroups?: HymnImageGroup[];
  onUpdate: () => void;
}

export default function HymnImagesManager({
  hymnId,
  imageGroups = [],
  onUpdate,
}: HymnImagesManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [editingGroupIndex, setEditingGroupIndex] = useState<number | null>(
    null
  );
  const [expandedImageGroups, setExpandedImageGroups] = useState<
    Record<number, boolean>
  >({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = editingGroupIndex !== null;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<HymnImageFormData>({
    resolver: zodResolver(hymnImageSchema),
    defaultValues: {
      churchName: "",
      description: "",
      source: "",
    },
  });

  const processFiles = useCallback((files: File[]) => {
    setSelectedFiles(files);

    // Create preview URLs in the correct order
    const previews: string[] = new Array(files.length);
    let loadedCount = 0;

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews[index] = reader.result as string;
        loadedCount++;
        if (loadedCount === files.length) {
          setPreviewUrls(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const handlePaste = useCallback(
    async (e: ClipboardEvent) => {
      e.preventDefault();
      const items = e.clipboardData?.items;
      if (!items) return;

      const imageFiles: File[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            // Create a new file with a proper name including index to maintain order
            const timestamp = Date.now();
            const extension = file.type.split("/")[1] || "png";
            const newFile = new File(
              [file],
              `pasted-image-${timestamp}-${i}.${extension}`,
              {
                type: file.type,
              }
            );
            imageFiles.push(newFile);
          }
        }
      }

      if (imageFiles.length > 0) {
        // Combine with existing files, maintaining order
        const allFiles = [...selectedFiles, ...imageFiles];
        processFiles(allFiles);
        toast.success(`${imageFiles.length} image(s) pasted from clipboard`);
      }
    },
    [selectedFiles, processFiles]
  );

  // Add paste event listener when dialog is open
  useEffect(() => {
    if (isOpen) {
      const handlePasteEvent = (e: ClipboardEvent) => handlePaste(e);
      document.addEventListener("paste", handlePasteEvent);
      return () => {
        document.removeEventListener("paste", handlePasteEvent);
      };
    }
  }, [isOpen, handlePaste]);

  const clearSelectedFiles = () => {
    setSelectedFiles([]);
    setPreviewUrls([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (groupIndex: number) => {
    const group = imageGroups[groupIndex];
    setEditingGroupIndex(groupIndex);
    setValue("churchName", group.churchName || "");
    setValue("description", group.description || "");
    setValue("source", group.source || "");
    setIsOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingGroupIndex(null);
    reset();
    clearSelectedFiles();
    setIsOpen(false);
  };

  const onSubmit = async (data: HymnImageFormData) => {
    if (!isEditing && selectedFiles.length === 0) {
      toast.error("Please select at least one image file");
      return;
    }

    setIsUploading(true);
    try {
      // Get current hymn data
      const hymnDoc = await hymnService.getHymnById(hymnId);
      if (!hymnDoc.exists()) {
        throw new Error("Hymn not found");
      }

      const hymnData = hymnDoc.data();
      const currentGroups = hymnData?.hymnImageGroups || [];

      if (isEditing) {
        // Edit existing image group metadata
        const updatedGroups = [...currentGroups];
        const existingGroup = updatedGroups[editingGroupIndex!];

        // Upload new images if any were selected
        let imageUrls = existingGroup.images;
        if (selectedFiles.length > 0) {
          const newUrls: string[] = [];
          for (const file of selectedFiles) {
            const url = await hymnService.uploadFile(hymnId, file, "images");
            newUrls.push(url);
          }
          imageUrls = [...existingGroup.images, ...newUrls];
        }

        updatedGroups[editingGroupIndex!] = {
          churchName: data.churchName,
          images: imageUrls,
          description: data.description,
          source: data.source,
        };

        await hymnService.updateHymn(hymnId, {
          hymnImageGroups: updatedGroups,
        });

        toast.success("Hymn image group updated successfully!");
      } else {
        // Add new image group
        const imageUrls: string[] = [];
        for (const file of selectedFiles) {
          const url = await hymnService.uploadFile(hymnId, file, "images");
          imageUrls.push(url);
        }

        const newGroup: HymnImageGroup = {
          churchName: data.churchName,
          images: imageUrls,
          description: data.description,
          source: data.source,
        };

        const updatedGroups = [...currentGroups, newGroup];

        await hymnService.updateHymn(hymnId, {
          hymnImageGroups: updatedGroups,
        });

        toast.success("Hymn images added successfully!");
      }

      handleCancelEdit();
      onUpdate();
    } catch (error) {
      console.error("Error saving hymn images:", error);
      toast.error(`Failed to ${isEditing ? "update" : "add"} hymn images`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (index: number) => {
    if (!confirm("Are you sure you want to delete this image group?")) {
      return;
    }

    try {
      const updatedGroups = imageGroups.filter((_, i) => i !== index);
      await hymnService.updateHymn(hymnId, {
        hymnImageGroups: updatedGroups,
      });
      toast.success("Hymn image group deleted successfully!");
      onUpdate();
    } catch (error) {
      console.error("Error deleting hymn image group:", error);
      toast.error("Failed to delete hymn image group");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Hymn Images</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Edit Hymn Image Group" : "Add Hymn Image"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label>Church Tradition (Optional)</Label>
                  <Select
                    value={watch("churchName") || "none"}
                    onValueChange={(value) =>
                      setValue(
                        "churchName",
                        value === "none" ? undefined : value
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select church tradition (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        No specific tradition
                      </SelectItem>
                      {CHURCH_TRADITIONS.map((church) => (
                        <SelectItem key={church} value={church}>
                          {church}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.churchName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.churchName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>
                    Image Files {isEditing && "(optional - add more images)"}
                  </Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                        className="flex-1"
                      />
                      {selectedFiles.length > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={clearSelectedFiles}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isEditing
                        ? "Select files to add more images to this group"
                        : "Select multiple files or paste images from clipboard (Ctrl+V)"}
                    </p>
                    {selectedFiles.length > 0 && (
                      <p className="text-sm text-green-600">
                        {selectedFiles.length} file(s) selected
                      </p>
                    )}
                  </div>
                  {previewUrls.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {previewUrls.map((url, idx) => (
                        <div key={idx} className="relative">
                          <Image
                            src={url}
                            alt={`Preview ${idx + 1}`}
                            width={300}
                            height={200}
                            className="w-full h-auto border rounded"
                            style={{ objectFit: "contain" }}
                          />
                          <div className="absolute top-1 left-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                            {idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Description (optional)</Label>
                  <Textarea
                    {...register("description")}
                    placeholder="Brief description of the text or image"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Source (optional)</Label>
                  <Input
                    {...register("source")}
                    placeholder="Book title or source"
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
                  <Button
                    type="submit"
                    disabled={
                      isUploading || (!isEditing && selectedFiles.length === 0)
                    }
                  >
                    {isUploading
                      ? isEditing
                        ? "Updating..."
                        : "Uploading..."
                      : isEditing
                      ? "Update Group"
                      : "Add Images"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {imageGroups.length === 0 ? (
          <div className="text-center py-8">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No hymn images yet. Add images of pages from books showing how
              different churches write this hymn!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortByChurchPriority(imageGroups).map((group, groupIndex) => {
              const isExpanded = expandedImageGroups[groupIndex];
              const hasMultipleImages = group.images.length > 1;

              return (
                <div
                  key={groupIndex}
                  className="relative group border rounded p-4"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-lg">
                        {group.churchName}
                      </h4>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(groupIndex)}
                        >
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(groupIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Preview of first image with fade effect */}
                      <div className="relative w-full">
                        <Image
                          src={group.images[0]}
                          alt={`${
                            !group.churchName ? "General" : group.churchName
                          } page 1`}
                          width={800}
                          height={600}
                          className="w-full h-auto rounded border"
                          style={{ objectFit: "contain" }}
                          priority={true}
                        />

                        {/* Fade overlay and View More button */}
                        {hasMultipleImages && !isExpanded && (
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 rounded border">
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setExpandedImageGroups((prev) => ({
                                    ...prev,
                                    [groupIndex]: !isExpanded,
                                  }))
                                }
                                className="bg-white/95 backdrop-blur-sm shadow-lg"
                              >
                                View More ({group.images.length - 1} more)
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Show additional images only when expanded */}
                      {isExpanded &&
                        group.images.slice(1).map((imageUrl, imgIndex) => (
                          <div key={imgIndex + 1} className="relative w-full">
                            <Image
                              src={imageUrl}
                              alt={`${
                                !group.churchName ? "General" : group.churchName
                              } page ${imgIndex + 2}`}
                              width={800}
                              height={600}
                              className="w-full h-auto rounded border"
                              style={{ objectFit: "contain" }}
                              loading="lazy"
                            />
                          </div>
                        ))}
                    </div>

                    {group.source && (
                      <p className="text-sm text-muted-foreground">
                        Source: {group.source}
                      </p>
                    )}
                    {group.description && (
                      <p className="text-sm text-muted-foreground">
                        {group.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
