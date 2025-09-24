"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/useAuth";
import { usePermissions } from "@/lib/rbac";
import { bookService } from "@/lib/firebase-services";
import { CreateBookData, BookStatus } from "@/lib/types/book";
import { Plus, RefreshCw } from "lucide-react";

export function AddBookDialog() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const { user, userProfile } = useAuth();
  const permissions = usePermissions(userProfile?.role || null);
  const router = useRouter();

  // Form state for new book
  const [newBookData, setNewBookData] = useState<CreateBookData>({
    title: "",
    syriacTitle: "",
    author: "",
    description: "",
    language: "",
    category: "",
    status: "draft",
    publicationYear: undefined,
    isbn: "",
    publisher: "",
    placeOfPublication: "",
    coverImage: "",
    private: false, // Default to public
    protected: false, // Default to not protected
    tags: [],
    textDirection: "rtl",
  });

  const [tagsInput, setTagsInput] = useState("");
  const [bookIdInput, setBookIdInput] = useState("");
  const [isBookIdManuallyEdited, setIsBookIdManuallyEdited] = useState(false);

  // Generate a suggested book ID from the title
  const generateBookIdFromTitle = (title: string): string => {
    if (!title.trim()) return "";

    return title
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple consecutive hyphens with single hyphen
      .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
  };

  // Auto-generate book ID from title if user hasn't manually edited it
  const handleTitleChange = (value: string) => {
    setNewBookData((prev) => ({
      ...prev,
      title: value,
    }));

    if (!isBookIdManuallyEdited && value) {
      const suggestedId = generateBookIdFromTitle(value);
      setBookIdInput(suggestedId);
    }
  };

  const handleCreateBook = async () => {
    if (!user) return;

    try {
      setIsCreating(true);
      setCreateError(null);

      // Validate book ID if provided
      const customBookId = bookIdInput.trim();
      if (customBookId) {
        // Basic validation for book ID (only alphanumeric, hyphens, underscores)
        const validIdPattern = /^[a-zA-Z0-9_-]+$/;
        if (!validIdPattern.test(customBookId)) {
          setCreateError(
            "Book ID can only contain letters, numbers, hyphens, and underscores"
          );
          return;
        }
      }

      // Parse tags from comma-separated string
      const tags = tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const bookData = {
        ...newBookData,
        tags,
        publicationYear: newBookData.publicationYear
          ? Number(newBookData.publicationYear)
          : undefined,
      };

      const bookId = await bookService.createBook(
        bookData,
        user.uid,
        customBookId || undefined
      );

      // Reset form
      setNewBookData({
        title: "",
        syriacTitle: "",
        author: "",
        description: "",
        language: "",
        category: "",
        status: "draft",
        publicationYear: undefined,
        isbn: "",
        publisher: "",
        placeOfPublication: "",
        coverImage: "",
        private: false, // Default to public
        protected: false, // Default to not protected
        tags: [],
        textDirection: "rtl",
      });
      setTagsInput("");
      setBookIdInput("");
      setCreateError(null);
      setIsBookIdManuallyEdited(false);
      setIsAddDialogOpen(false);

      // Redirect to the book detail page
      router.push(`/books/${bookId}`);
    } catch (error: unknown) {
      console.error("Error creating book:", error);
      // Handle specific error cases
      const errorWithCode = error as { code?: string; message?: string };
      if (errorWithCode.code === "permission-denied") {
        setCreateError("You don't have permission to create books");
      } else if (
        errorWithCode.message?.includes("already exists") ||
        errorWithCode.code === "already-exists"
      ) {
        setCreateError(
          "A book with this ID already exists. Please choose a different ID."
        );
      } else {
        setCreateError("Failed to create book. Please try again.");
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleInputChange = (
    field: keyof CreateBookData,
    value: string | number | boolean | "rtl" | "ltr"
  ) => {
    setNewBookData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBookIdChange = (value: string) => {
    setBookIdInput(value);
    setIsBookIdManuallyEdited(true);
  };

  const handleRegenerateBookId = () => {
    if (newBookData.title) {
      const suggestedId = generateBookIdFromTitle(newBookData.title);
      setBookIdInput(suggestedId);
      setIsBookIdManuallyEdited(false);
    }
  };

  const isFormValid = () => {
    return (
      newBookData.title.trim() &&
      newBookData.author.trim() &&
      newBookData.description.trim() &&
      newBookData.language.trim() &&
      newBookData.category.trim() &&
      newBookData.status
    );
  };

  if (!permissions.canCreate) {
    return null;
  }

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>
            Enter the book metadata to add it to the library
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={newBookData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter book title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="syriacTitle">Syriac Title</Label>
              <Input
                id="syriacTitle"
                value={newBookData.syriacTitle}
                onChange={(e) =>
                  handleInputChange("syriacTitle", e.target.value)
                }
                placeholder="Enter Syriac title"
                dir={newBookData.textDirection}
                className="text-right"
                style={{
                  fontFamily: '"East Syriac Adiabene", serif',
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={newBookData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Enter author name"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bookId">Book ID (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="bookId"
                value={bookIdInput}
                onChange={(e) => handleBookIdChange(e.target.value)}
                placeholder="Auto-generated from title"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRegenerateBookId}
                disabled={!newBookData.title.trim()}
                title="Regenerate from title"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Auto-generated from the book title. You can edit it or click the
              regenerate button.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={newBookData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter book description"
              rows={4}
              className="resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language *</Label>
              <Input
                id="language"
                value={newBookData.language}
                onChange={(e) => handleInputChange("language", e.target.value)}
                placeholder="e.g., Syriac, Aramaic"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={newBookData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                placeholder="e.g., Liturgy, Theology"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="textDirection">Text Direction</Label>
              <select
                id="textDirection"
                value={newBookData.textDirection}
                onChange={(e) =>
                  handleInputChange(
                    "textDirection",
                    e.target.value as "rtl" | "ltr"
                  )
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="rtl">Right-to-Left (RTL)</option>
                <option value="ltr">Left-to-Right (LTR)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <select
                id="status"
                value={newBookData.status}
                onChange={(e) =>
                  handleInputChange("status", e.target.value as BookStatus)
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="draft">Draft</option>
                <option value="digitizing">Digitizing</option>
                <option value="transcribing">Transcribing</option>
                <option value="reviewing">Reviewing</option>
                <option value="completed">Completed</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  id="private"
                  type="checkbox"
                  checked={newBookData.private || false}
                  onChange={(e) =>
                    handleInputChange("private", e.target.checked)
                  }
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <Label htmlFor="private" className="text-sm font-medium">
                  Private (only visible to editors and admins)
                </Label>
              </div>
              {userProfile?.role === "admin" && (
                <div className="flex items-center space-x-2">
                  <input
                    id="protected"
                    type="checkbox"
                    checked={newBookData.protected || false}
                    onChange={(e) =>
                      handleInputChange("protected", e.target.checked)
                    }
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <Label htmlFor="protected" className="text-sm font-medium">
                    Protected (only visible to admins)
                  </Label>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publicationYear">Publication Year</Label>
              <Input
                id="publicationYear"
                type="number"
                value={newBookData.publicationYear || ""}
                onChange={(e) =>
                  handleInputChange(
                    "publicationYear",
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                placeholder="YYYY"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                value={newBookData.isbn}
                onChange={(e) => handleInputChange("isbn", e.target.value)}
                placeholder="ISBN number"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="publisher">Publisher</Label>
            <Input
              id="publisher"
              value={newBookData.publisher}
              onChange={(e) => handleInputChange("publisher", e.target.value)}
              placeholder="Publisher name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="placeOfPublication">Place of Publication</Label>
            <Input
              id="placeOfPublication"
              value={newBookData.placeOfPublication}
              onChange={(e) =>
                handleInputChange("placeOfPublication", e.target.value)
              }
              placeholder="e.g., New York, London, Damascus"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              value={newBookData.coverImage}
              onChange={(e) => handleInputChange("coverImage", e.target.value)}
              placeholder="https://example.com/cover.jpg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Enter tags separated by commas"
            />
          </div>
        </div>
        {createError && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
            {createError}
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsAddDialogOpen(false);
              setCreateError(null);
              setIsBookIdManuallyEdited(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateBook}
            disabled={!isFormValid() || isCreating}
          >
            {isCreating ? "Creating..." : "Create Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
