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
import { Book, CreateBookData } from "@/lib/types/book";
import { Plus, Calendar, User, Tag, BookOpen } from "lucide-react";
import Image from "next/image";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
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
    publicationYear: undefined,
    isbn: "",
    publisher: "",
    pages: undefined,
    coverImage: "",
    tags: [],
  });

  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const booksSnapshot = await bookService.getAllBooks();
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
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBook = async () => {
    if (!user) return;

    try {
      setIsCreating(true);

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
        pages: newBookData.pages ? Number(newBookData.pages) : undefined,
      };

      const bookId = await bookService.createBook(bookData, user.uid);

      // Reset form
      setNewBookData({
        title: "",
        author: "",
        description: "",
        language: "",
        category: "",
        publicationYear: undefined,
        isbn: "",
        publisher: "",
        pages: undefined,
        coverImage: "",
        tags: [],
      });
      setTagsInput("");
      setIsAddDialogOpen(false);

      // Redirect to the book detail page
      router.push(`/books/${bookId}`);
    } catch (error) {
      console.error("Error creating book:", error);
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

  const handleBookClick = (bookId: string) => {
    router.push(`/books/${bookId}`);
  };

  const isFormValid = () => {
    return (
      newBookData.title.trim() &&
      newBookData.author.trim() &&
      newBookData.description.trim() &&
      newBookData.language.trim() &&
      newBookData.category.trim()
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <ProtectedRoute requireAuth={true}>
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
                      <div className="grid grid-cols-3 gap-4">
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
                        <div className="space-y-2">
                          <Label htmlFor="pages">Pages</Label>
                          <Input
                            id="pages"
                            type="number"
                            value={newBookData.pages || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "pages",
                                e.target.value ? Number(e.target.value) : ""
                              )
                            }
                            placeholder="Number of pages"
                          />
                        </div>
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
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
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
                  <Card
                    key={book.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleBookClick(book.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="line-clamp-2 mb-2">
                            {book.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 text-sm">
                            <User className="w-3 h-3" />
                            {book.author}
                          </CardDescription>
                        </div>
                        {book.coverImage && (
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            className="w-16 h-20 object-cover rounded border ml-4"
                          />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {book.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {book.createdAt.toLocaleDateString()}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {book.language}
                          </Badge>
                        </div>
                        {book.tags && book.tags.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap">
                            <Tag className="w-3 h-3 text-muted-foreground" />
                            {book.tags.slice(0, 3).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {book.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{book.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
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
