"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/hooks/useAuth";
import { usePermissions } from "@/lib/rbac";
import { bookService } from "@/lib/firebase-services";
import { Book, CreateBookData, BookStatus } from "@/lib/types/book";
import { Plus, Calendar, User, Tag, BookOpen, RefreshCw } from "lucide-react";
import Image from "next/image";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const { user, userProfile } = useAuth();
  const permissions = usePermissions(userProfile?.role || null);
  const router = useRouter();

  // Form state for new book
  const [newBookData, setNewBookData] = useState<CreateBookData>({
    title: "",
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
    tags: [],
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

  // Get status styling
  const getStatusStyling = (status: BookStatus) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "digitizing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "transcribing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "reviewing":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "published":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get status display name
  const getStatusDisplayName = (status: BookStatus) => {
    switch (status) {
      case "draft":
        return "Draft";
      case "digitizing":
        return "Digitizing";
      case "transcribing":
        return "Transcribing";
      case "reviewing":
        return "Reviewing";
      case "completed":
        return "Completed";
      case "published":
        return "Published";
      default:
        return status;
    }
  };

  useEffect(() => {
    setLoading(true);

    // Set up real-time listener for books data
    const unsubscribeBooks = bookService.onBooksSnapshot(
      (booksSnapshot) => {
        const booksData = booksSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            tags: data.tags || [], // Ensure tags is always an array
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.() || new Date(),
          };
        }) as Book[];

        // Sort by creation date, newest first
        booksData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setBooks(booksData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    );

    // Cleanup function
    return () => {
      unsubscribeBooks();
    };
  }, []);

  // Auto-generate book ID from title if user hasn't manually edited it
  useEffect(() => {
    if (!isBookIdManuallyEdited && newBookData.title) {
      const suggestedId = generateBookIdFromTitle(newBookData.title);
      setBookIdInput(suggestedId);
    }
  }, [newBookData.title, isBookIdManuallyEdited]);

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
        tags: [],
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
    value: string | number
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <ProtectedRoute requireAuth={false}>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Books Library
                </h1>
                <p className="text-muted-foreground">
                  Explore our collection of Syriac texts and manuscripts
                </p>
              </div>
              {permissions.canCreate && (
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
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
                            onChange={(e) =>
                              handleInputChange("title", e.target.value)
                            }
                            placeholder="Enter book title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="author">Author *</Label>
                          <Input
                            id="author"
                            value={newBookData.author}
                            onChange={(e) =>
                              handleInputChange("author", e.target.value)
                            }
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
                          Auto-generated from the book title. You can edit it or
                          click the regenerate button.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Input
                          id="description"
                          value={newBookData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          placeholder="Enter book description"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language *</Label>
                          <Input
                            id="language"
                            value={newBookData.language}
                            onChange={(e) =>
                              handleInputChange("language", e.target.value)
                            }
                            placeholder="e.g., Syriac, Aramaic"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Input
                            id="category"
                            value={newBookData.category}
                            onChange={(e) =>
                              handleInputChange("category", e.target.value)
                            }
                            placeholder="e.g., Liturgy, Theology"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="status">Status *</Label>
                          <select
                            id="status"
                            value={newBookData.status}
                            onChange={(e) =>
                              handleInputChange(
                                "status",
                                e.target.value as BookStatus
                              )
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
                          <Label htmlFor="publicationYear">
                            Publication Year
                          </Label>
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
                            onChange={(e) =>
                              handleInputChange("isbn", e.target.value)
                            }
                            placeholder="ISBN number"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="publisher">Publisher</Label>
                        <Input
                          id="publisher"
                          value={newBookData.publisher}
                          onChange={(e) =>
                            handleInputChange("publisher", e.target.value)
                          }
                          placeholder="Publisher name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="placeOfPublication">
                          Place of Publication
                        </Label>
                        <Input
                          id="placeOfPublication"
                          value={newBookData.placeOfPublication}
                          onChange={(e) =>
                            handleInputChange(
                              "placeOfPublication",
                              e.target.value
                            )
                          }
                          placeholder="e.g., New York, London, Damascus"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coverImage">Cover Image URL</Label>
                        <Input
                          id="coverImage"
                          value={newBookData.coverImage}
                          onChange={(e) =>
                            handleInputChange("coverImage", e.target.value)
                          }
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
              )}
            </div>
            <Separator />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading books...</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {!books || books.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No books yet</h3>
                  <p className="text-muted-foreground mb-4">
                    The library is empty.{" "}
                    {permissions.canCreate
                      ? "Add the first book to get started."
                      : "Check back later for new additions."}
                  </p>
                </div>
              ) : (
                books?.map((book) => (
                  <a key={book.id} href={`/books/${book.id}`}>
                    <Card className="hover:shadow-lg transition-shadow h-full w-full max-w-lg mx-auto">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 mb-2">
                              <CardTitle className="line-clamp-2 text-base font-semibold leading-tight flex-1">
                                {book.title}
                              </CardTitle>
                            </div>
                            <CardDescription className="flex items-center gap-2 text-sm mb-2">
                              <User className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{book.author}</span>
                            </CardDescription>
                            {(book.publisher || book.placeOfPublication) && (
                              <div className="text-xs text-muted-foreground mb-1 truncate">
                                {book.publisher && (
                                  <span>{book.publisher}</span>
                                )}
                                {book.publisher && book.placeOfPublication && (
                                  <span>, </span>
                                )}
                                {book.placeOfPublication && (
                                  <span>{book.placeOfPublication}</span>
                                )}
                              </div>
                            )}
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center gap-2">
                                {book.placeOfPublication && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <span>{book.placeOfPublication}</span>
                                  </div>
                                )}
                                {book.publicationYear && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3" />
                                    <span>{book.publicationYear}</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {book.language}
                                </Badge>
                                {book.category && (
                                  <Badge variant="outline" className="text-xs">
                                    {book.category}
                                  </Badge>
                                )}
                                <span
                                  className={`text-xs font-medium rounded-full border ${getStatusStyling(
                                    book.status
                                  )}`}
                                >
                                  {getStatusDisplayName(book.status)}
                                </span>
                              </div>
                            </div>
                          </div>
                          {book.coverImage ? (
                            <div className="flex-shrink-0">
                              <Image
                                src={book.coverImage}
                                alt={`Cover of ${book.title}`}
                                className="w-24 h-36 object-cover rounded-lg border shadow-md"
                                width={96}
                                height={144}
                                unoptimized
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                }}
                              />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 w-24 h-36 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg border shadow-md flex items-center justify-center">
                              <BookOpen className="w-10 h-10 text-slate-400" />
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                          {book.description}
                        </p>
                        <div className="space-y-1">
                          {book.pages && (
                            <div className="flex items-center justify-end text-xs">
                              <span className="text-muted-foreground whitespace-nowrap">
                                {book.pages} pages
                              </span>
                            </div>
                          )}

                          {book.tags && book.tags.length > 0 && (
                            <div className="flex items-center gap-1 flex-wrap pt-1">
                              <Tag className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                              {book.tags.slice(0, 2).map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {book.tags.length > 2 && (
                                <span className="text-xs text-muted-foreground">
                                  +{book.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))
              )}
            </div>
          )}
        </ProtectedRoute>
      </div>
      <Footer />
    </div>
  );
}
