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
import { hymnService } from "@/lib/hymn-services";
import {
  BookPageImageGroup,
  CHURCH_TRADITIONS,
  sortByChurchPriority,
} from "@/lib/types/hymn";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";

const hymnImageSchema = z.object({
  churchName: z.string().min(1, "Church name is required"),
  description: z.string().optional(),
  source: z.string().optional(),
});

type HymnImageFormData = z.infer<typeof hymnImageSchema>;

interface HymnImagesManagerProps {
  hymnId: string;
  imageGroups?: BookPageImageGroup[];
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);

      // Create preview URLs
      const previews: string[] = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          if (previews.length === files.length) {
            setPreviewUrls(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const onSubmit = async (data: HymnImageFormData) => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image file");
      return;
    }

    setIsUploading(true);
    try {
      // Upload all images
      const imageUrls: string[] = [];
      for (const file of selectedFiles) {
        const url = await hymnService.uploadFile(hymnId, file, "images");
        imageUrls.push(url);
      }

      // Get current hymn data
      const hymnDoc = await hymnService.getHymnById(hymnId);
      if (!hymnDoc.exists()) {
        throw new Error("Hymn not found");
      }

      const hymnData = hymnDoc.data();
      const currentGroups = hymnData?.bookPageImageGroups || [];

      // Add new image group
      const newGroup: BookPageImageGroup = {
        churchName: data.churchName,
        images: imageUrls,
        description: data.description,
        source: data.source,
      };

      const updatedGroups = [...currentGroups, newGroup];

      // Update hymn
      await hymnService.updateHymn(hymnId, {
        bookPageImageGroups: updatedGroups,
      });

      toast.success("Book page images added successfully!");
      reset();
      setSelectedFiles([]);
      setPreviewUrls([]);
      setIsOpen(false);
      onUpdate();
    } catch (error) {
      console.error("Error adding book page images:", error);
      toast.error("Failed to add book page images");
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
        bookPageImageGroups: updatedGroups,
      });
      toast.success("Book page image group deleted successfully!");
      onUpdate();
    } catch (error) {
      console.error("Error deleting book page image group:", error);
      toast.error("Failed to delete book page image group");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Images</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Book Page Image</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label>Church Tradition</Label>
                  <Select
                    value={watch("churchName")}
                    onValueChange={(value) => setValue("churchName", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select church tradition" />
                    </SelectTrigger>
                    <SelectContent>
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

                <div>
                  <Label>Image Files (multiple allowed)</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                  />
                  {previewUrls.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {previewUrls.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-auto border rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Description (optional)</Label>
                  <Textarea
                    {...register("description")}
                    placeholder="Brief description of the text or image"
                    rows={3}
                  />
                </div>

                <div>
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
                    onClick={() => {
                      setIsOpen(false);
                      reset();
                      setSelectedFiles([]);
                      setPreviewUrls([]);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUploading || selectedFiles.length === 0}
                  >
                    {isUploading ? "Uploading..." : "Add Images"}
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
              No book page images yet. Add images of pages from books showing
              how different churches write this hymn!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortByChurchPriority(imageGroups).map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="relative group border rounded p-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-lg">
                      {group.churchName}
                    </h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(groupIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.images.map((imageUrl, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={imageUrl}
                        alt={`${group.churchName} page ${imgIndex + 1}`}
                        className="w-full rounded border"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
