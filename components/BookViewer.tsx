"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/hooks/useAuth";
import { usePermissions } from "@/lib/rbac";
import { bookService, pageService } from "@/lib/firebase-services";
import { Book, BookStatus } from "@/lib/types/book";
import { DocumentData } from "firebase/firestore";
import {
  ArrowLeft,
  Calendar,
  User,
  BookOpen,
  Edit,
  Plus,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import SyriacEditor from "@/components/SyriacEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontSize from "@tiptap/extension-font-size";
import { Extension } from "@tiptap/core";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Custom extension to add line height and direction to paragraphs
const ParagraphExtension = Extension.create({
  name: "paragraphExtension",

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph"],
        attributes: {
          lineHeight: {
            default: "1.4",
            parseHTML: (element) => element.style.lineHeight || "1.4",
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
          dir: {
            default: "rtl",
            parseHTML: (element) => element.getAttribute("dir") || "rtl",
            renderHTML: (attributes) => {
              if (!attributes.dir) {
                return {};
              }
              return {
                dir: attributes.dir,
              };
            },
          },
        },
      },
    ];
  },
});

// Helper function to deep compare JSONContent objects
function isContentEqual(
  content1: JSONContent | null,
  content2: JSONContent | null
): boolean {
  // Handle null cases
  if (content1 === null && content2 === null) return true;
  if (content1 === null || content2 === null) return false;

  // Recursive function to deeply normalize JSON objects
  const deepNormalize = (obj: any): any => {
    if (obj === null || obj === undefined) return obj;

    if (Array.isArray(obj)) {
      return obj.map(deepNormalize);
    }

    if (typeof obj === "object") {
      const normalized: any = {};
      // Sort keys and recursively normalize values
      Object.keys(obj)
        .sort()
        .forEach((key) => {
          normalized[key] = deepNormalize(obj[key]);
        });
      return normalized;
    }

    return obj;
  };

  // Deep normalize both objects and compare their JSON strings
  try {
    const normalized1 = deepNormalize(content1);
    const normalized2 = deepNormalize(content2);
    return JSON.stringify(normalized1) === JSON.stringify(normalized2);
  } catch (error) {
    console.error("Error comparing content:", error);
    // Fall back to reference equality if normalization fails
    return content1 === content2;
  }
}

interface Edit {
  editId: string;
  version: number;
  textJson: JSONContent;
  userId: string;
  createdAt: Date;
  status: "pending" | "approved" | "rejected";
  verifiedBy?: string;
  verifiedAt?: Date;
  notes?: string;
}

interface Page {
  id: string;
  bookId: string;
  pageNumber: number;
  pageNumberInBook: number;
  imageUrl: string;
  currentTextJson?: JSONContent;
  currentVersion?: number;
  edits?: Edit[];
}

// Component to render TipTap JSON as HTML
function TipTapRenderer({ content }: { content: JSONContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
        strike: false,
        code: false,
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        heading: false,
        horizontalRule: false,
      }),
      TextStyle,
      Color,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      FontSize.configure({
        types: ["textStyle"],
      }),
      TextAlign.configure({
        types: ["paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "right",
      }),
      ParagraphExtension,
    ],
    content: content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="mt-8 sm:mt-16 lg:mt-24"
      style={{
        fontFamily: 'Karshon, "East Syriac Malankara", serif',
        fontSize: "24pt",
        marginTop: "70px",
      }}
    >
      <EditorContent editor={editor} />
      <style jsx global>{`
        .ProseMirror {
          line-height: 1.4 !important;
        }

        .ProseMirror p {
          line-height: 1.4 !important;
          margin: 0.25em 0 !important;
        }

        .ProseMirror ::selection {
          background-color: #e5e7eb !important; /* Light gray */
        }

        .ProseMirror ::-moz-selection {
          background-color: #e5e7eb !important; /* Light gray for Firefox */
        }
      `}</style>
    </div>
  );
}

export default function BookViewer() {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { userProfile } = useAuth();
  const permissions = usePermissions(userProfile?.role || null);
  const params = useParams();
  const router = useRouter();
  const bookId = params.bookId as string;

  // Pages state
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [textContentJson, setTextContentJson] = useState<JSONContent | null>(
    null
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [transcriptionLoading, setTranscriptionLoading] =
    useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [originalTextContentJson, setOriginalTextContentJson] =
    useState<JSONContent | null>(null);

  // Add page form state
  const [addPageDialogOpen, setAddPageDialogOpen] = useState<boolean>(false);
  const [addPageForm, setAddPageForm] = useState({
    pageNumber: 0,
    pageNumberInBook: 0,
    file: null as File | null,
  });
  const [addPageLoading, setAddPageLoading] = useState<boolean>(false);
  const [addPageError, setAddPageError] = useState<string>("");

  // Edit book form state
  const [editBookDialogOpen, setEditBookDialogOpen] = useState<boolean>(false);
  const [editBookForm, setEditBookForm] = useState({
    title: "",
    author: "",
    description: "",
    language: "",
    category: "",
    status: "draft" as BookStatus,
    publicationYear: undefined as number | undefined,
    isbn: "",
    publisher: "",
    placeOfPublication: "",
    coverImage: "",
    tags: [] as string[],
  });
  const [editBookTagsInput, setEditBookTagsInput] = useState("");
  const [editBookLoading, setEditBookLoading] = useState<boolean>(false);
  const [editBookError, setEditBookError] = useState<string>("");

  useEffect(() => {
    if (!bookId) return;

    setLoading(true);

    // Set up real-time listener for book data
    const unsubscribeBook = bookService.onBookSnapshot(
      bookId,
      (bookDoc) => {
        if (bookDoc.exists()) {
          const bookData = bookDoc.data();
          setBook({
            id: bookDoc.id,
            ...bookData,
            createdAt: bookData.createdAt?.toDate?.() || new Date(),
            updatedAt: bookData.updatedAt?.toDate?.() || new Date(),
          } as Book);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching book:", error);
        setNotFound(true);
        setLoading(false);
      }
    );

    // Cleanup function
    return () => {
      unsubscribeBook();
    };
  }, [bookId]);

  useEffect(() => {
    if (!bookId) return;

    // Set up real-time listener for pages data
    const unsubscribePages = pageService.onPagesSnapshot(
      bookId,
      (pagesSnap) => {
        const pagesData = pagesSnap.docs
          .map((doc) => {
            const data = doc.data();
            // Convert Firestore timestamps to Date objects for edits
            const edits =
              data.edits?.map((edit: DocumentData) => ({
                ...edit,
                createdAt: edit.createdAt?.toDate?.() || edit.createdAt,
                verifiedAt: edit.verifiedAt?.toDate?.() || edit.verifiedAt,
              })) || [];

            return {
              id: doc.id,
              ...data,
              edits,
            };
          })
          .sort(
            (a, b) => (a as Page).pageNumber - (b as Page).pageNumber
          ) as Page[];

        const prevPagesLength = pages.length;
        const prevSelectedIndex = selectedPageIndex;

        setPages(pagesData);

        if (pagesData.length > 0) {
          // If this is the first load (no previous pages)
          if (prevPagesLength === 0) {
            setSelectedPageIndex(0);
            setTextContentJson(pagesData[0].currentTextJson || null);
          }
          // If pages were updated but we had existing pages, preserve current selection
          else if (prevSelectedIndex < pagesData.length) {
            // Update text content to reflect any changes from real-time updates (like saves)
            const currentPageData = pagesData[prevSelectedIndex];
            setTextContentJson(currentPageData.currentTextJson || null);
          }
          // If the current page index is now out of bounds, go to last page
          else if (prevSelectedIndex >= pagesData.length) {
            const lastIndex = pagesData.length - 1;
            setSelectedPageIndex(lastIndex);
            setTextContentJson(pagesData[lastIndex].currentTextJson || null);
          }
        }
      },
      (error) => {
        console.error("Error fetching pages:", error);
      }
    );

    // Cleanup function
    return () => {
      unsubscribePages();
    };
  }, [bookId]);

  // When selected page changes, update textContent
  useEffect(() => {
    if (pages[selectedPageIndex]) {
      const page = pages[selectedPageIndex];
      console.log("Loading page data:", {
        pageId: page.id,
        currentTextJson: page.currentTextJson,
        currentVersion: page.currentVersion,
      });
      setTextContentJson(page.currentTextJson || null);
      setImageLoading(true); // Reset image loading when changing pages
    }
  }, [selectedPageIndex]); // Only depend on selectedPageIndex, not pages

  // Handle file upload trigger
  // This function is no longer needed as dialog initialization is handled in onOpenChange
  // const handleAddPageClick = () => { ... };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !userProfile) return;
    const file = e.target.files[0];
    const nextPageNumber = pages.length + 1;
    try {
      // Upload image
      const imageUrl = await pageService.uploadPageImage(
        bookId,
        nextPageNumber,
        file
      );
      // Create page doc
      await pageService.createPage(
        bookId,
        nextPageNumber,
        imageUrl,
        userProfile.uid
      );
      // Real-time listener will automatically update pages
      // Set to last page (which will be the new page when listener updates)
      setTimeout(() => {
        setSelectedPageIndex(pages.length);
      }, 100);
    } catch (err) {
      console.error("Error uploading page", err);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddPageFormSubmit = async () => {
    if (!userProfile || !addPageForm.file) {
      setAddPageError("Please select an image file");
      return;
    }

    // Validate page numbers
    if (addPageForm.pageNumber <= 0 || addPageForm.pageNumberInBook <= 0) {
      setAddPageError("Page numbers must be greater than 0");
      return;
    }

    // Check if page number already exists
    const existingPage = pages.find(
      (p) => p.pageNumber === addPageForm.pageNumber
    );
    if (existingPage) {
      setAddPageError(`Page ${addPageForm.pageNumber} already exists`);
      return;
    }

    setAddPageLoading(true);
    setAddPageError("");

    try {
      // Upload image
      const imageUrl = await pageService.uploadPageImage(
        bookId,
        addPageForm.pageNumber,
        addPageForm.file
      );

      // Create page doc
      await pageService.createPage(
        bookId,
        addPageForm.pageNumber,
        imageUrl,
        userProfile.uid,
        addPageForm.pageNumberInBook
      );

      // Real-time listener will automatically update pages
      // Wait a moment for the listener to update, then select the new page
      setTimeout(() => {
        const newPageIndex = pages.findIndex(
          (p) => p.pageNumber === addPageForm.pageNumber
        );
        if (newPageIndex >= 0) {
          setSelectedPageIndex(newPageIndex);
        } else {
          // If not found, select the last page (newly added)
          setSelectedPageIndex(pages.length);
        }
      }, 100);

      // Close dialog
      setAddPageDialogOpen(false);
    } catch (err) {
      console.error("Error uploading page", err);
      setAddPageError("Failed to add page. Please try again.");
    } finally {
      setAddPageLoading(false);
    }
  };

  const handleAddPageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAddPageForm((prev) => ({
        ...prev,
        file: e.target.files![0],
      }));
      setAddPageError("");
    }
  };

  // Handle save transcription
  const handleSaveTranscription = async () => {
    if (!userProfile || !pages[selectedPageIndex] || saving || !textContentJson)
      return;

    // Check if content has actually changed
    if (isContentEqual(textContentJson, originalTextContentJson)) {
      // Content hasn't changed, just exit edit mode
      setEditMode(false);
      return;
    }

    const page = pages[selectedPageIndex];
    const newVersion = (page.currentVersion || 0) + 1;

    console.log("Saving transcription:", {
      textContentJson,
      pageId: page.id,
      newVersion,
    });

    setSaving(true);
    try {
      // Add new edit to the page's edits array
      await pageService.addEditToPage(page.id, {
        version: newVersion,
        textJson: textContentJson,
        userId: userProfile.uid,
        status: "pending",
      });

      console.log("Save successful");

      // Update the original content to the saved content
      setOriginalTextContentJson(textContentJson);

      // Exit edit mode
      setEditMode(false);
    } catch (err) {
      console.error("Error saving transcription", err);
      // Show error to user (you might want to add a toast notification here)
      alert("Failed to save transcription. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleBackClick = () => {
    router.push("/books");
  };

  const handleEditClick = () => {
    if (!book) return;

    // Initialize edit form with current book data
    setEditBookForm({
      title: book.title,
      author: book.author,
      description: book.description,
      language: book.language,
      category: book.category,
      status: book.status,
      publicationYear: book.publicationYear,
      isbn: book.isbn || "",
      publisher: book.publisher || "",
      placeOfPublication: book.placeOfPublication || "",
      coverImage: book.coverImage || "",
      tags: book.tags || [],
    });
    setEditBookTagsInput((book.tags || []).join(", "));
    setEditBookError("");
    setEditBookDialogOpen(true);
  };

  const handleEditBookFormSubmit = async () => {
    if (!userProfile || !book) return;

    setEditBookLoading(true);
    setEditBookError("");

    try {
      // Parse tags from comma-separated string
      const tags = editBookTagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const updateData = {
        ...editBookForm,
        tags,
        publicationYear: editBookForm.publicationYear
          ? Number(editBookForm.publicationYear)
          : undefined,
      };

      await bookService.updateBook(book.id, updateData);

      // Close dialog
      setEditBookDialogOpen(false);
    } catch (err) {
      console.error("Error updating book:", err);
      setEditBookError("Failed to update book. Please try again.");
    } finally {
      setEditBookLoading(false);
    }
  };

  const handleEditBookInputChange = (
    field: keyof typeof editBookForm,
    value: string | number | BookStatus
  ) => {
    setEditBookForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isEditFormValid = () => {
    return (
      editBookForm.title.trim() &&
      editBookForm.author.trim() &&
      editBookForm.description.trim() &&
      editBookForm.language.trim() &&
      editBookForm.category.trim() &&
      editBookForm.status
    );
  };

  const goToPreviousPage = () => {
    if (selectedPageIndex > 0) {
      setTranscriptionLoading(true);
      setSelectedPageIndex(selectedPageIndex - 1);
      setEditMode(false);
      setTimeout(() => setTranscriptionLoading(false), 300);
    }
  };

  const goToNextPage = () => {
    if (selectedPageIndex < pages.length - 1) {
      setTranscriptionLoading(true);
      setSelectedPageIndex(selectedPageIndex + 1);
      setEditMode(false);
      setTimeout(() => setTranscriptionLoading(false), 300);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground">Loading book...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <ProtectedRoute requireAuth={true}>
            <div className="text-center py-24">
              <div className="mx-auto w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-12 h-12 text-slate-500" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                Book Not Found
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                The book you&apos;re looking for doesn&apos;t exist or has been
                removed.
              </p>
              <Button onClick={handleBackClick} size="lg" className="px-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Books
              </Button>
            </div>
          </ProtectedRoute>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <ProtectedRoute requireAuth={true}>
          {/* Header */}
          <div className="px-4">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold text-slate-900">
                {book.title}
              </h1>
              {permissions.canEdit && (
                <Dialog
                  open={editBookDialogOpen}
                  onOpenChange={setEditBookDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={handleEditClick}
                      variant="outline"
                      size="sm"
                      className="relative z-50"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Book Details</DialogTitle>
                      <DialogDescription>
                        Update the book metadata and information.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="editTitle">Title *</Label>
                          <Input
                            id="editTitle"
                            value={editBookForm.title}
                            onChange={(e) =>
                              handleEditBookInputChange("title", e.target.value)
                            }
                            placeholder="Enter book title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editAuthor">Author *</Label>
                          <Input
                            id="editAuthor"
                            value={editBookForm.author}
                            onChange={(e) =>
                              handleEditBookInputChange(
                                "author",
                                e.target.value
                              )
                            }
                            placeholder="Enter author name"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editDescription">Description *</Label>
                        <Input
                          id="editDescription"
                          value={editBookForm.description}
                          onChange={(e) =>
                            handleEditBookInputChange(
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Enter book description"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="editLanguage">Language *</Label>
                          <Input
                            id="editLanguage"
                            value={editBookForm.language}
                            onChange={(e) =>
                              handleEditBookInputChange(
                                "language",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Syriac, Aramaic"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editCategory">Category *</Label>
                          <Input
                            id="editCategory"
                            value={editBookForm.category}
                            onChange={(e) =>
                              handleEditBookInputChange(
                                "category",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Liturgy, Theology"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="editStatus">Status *</Label>
                          <select
                            id="editStatus"
                            value={editBookForm.status}
                            onChange={(e) =>
                              handleEditBookInputChange(
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
                          <Label htmlFor="editPublicationYear">
                            Publication Year
                          </Label>
                          <Input
                            id="editPublicationYear"
                            type="number"
                            value={editBookForm.publicationYear || ""}
                            onChange={(e) =>
                              handleEditBookInputChange(
                                "publicationYear",
                                e.target.value ? Number(e.target.value) : ""
                              )
                            }
                            placeholder="YYYY"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editIsbn">ISBN</Label>
                        <Input
                          id="editIsbn"
                          value={editBookForm.isbn}
                          onChange={(e) =>
                            handleEditBookInputChange("isbn", e.target.value)
                          }
                          placeholder="ISBN number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editPublisher">Publisher</Label>
                        <Input
                          id="editPublisher"
                          value={editBookForm.publisher}
                          onChange={(e) =>
                            handleEditBookInputChange(
                              "publisher",
                              e.target.value
                            )
                          }
                          placeholder="Publisher name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editPlaceOfPublication">
                          Place of Publication
                        </Label>
                        <Input
                          id="editPlaceOfPublication"
                          value={editBookForm.placeOfPublication}
                          onChange={(e) =>
                            handleEditBookInputChange(
                              "placeOfPublication",
                              e.target.value
                            )
                          }
                          placeholder="e.g., New York, London, Damascus"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editCoverImage">Cover Image URL</Label>
                        <Input
                          id="editCoverImage"
                          value={editBookForm.coverImage}
                          onChange={(e) =>
                            handleEditBookInputChange(
                              "coverImage",
                              e.target.value
                            )
                          }
                          placeholder="https://example.com/cover.jpg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editTags">Tags</Label>
                        <Input
                          id="editTags"
                          value={editBookTagsInput}
                          onChange={(e) => setEditBookTagsInput(e.target.value)}
                          placeholder="Enter tags separated by commas"
                        />
                      </div>
                    </div>
                    {editBookError && (
                      <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                        {editBookError}
                      </div>
                    )}
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditBookDialogOpen(false);
                          setEditBookError("");
                        }}
                        disabled={editBookLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleEditBookFormSubmit}
                        disabled={!isEditFormValid() || editBookLoading}
                      >
                        {editBookLoading ? "Updating..." : "Update Book"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="flex items-center gap-6 text-slate-600 mb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{book.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {book.publicationYear || "Publication year unknown"}
                </span>
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                {book.language}
              </Badge>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {book.tags && book.tags.length > 0 && (
                <>
                  {book.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-2 py-1 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center justify-between mb-4 px-4">
            {/* Empty left spacer to center the navigation */}
            <div className="w-20"></div>

            {/* Centered Navigation */}
            {pages.length > 0 && (
              <div className="flex items-center gap-3">
                {/* For RTL documents (like Syriac), reverse the navigation */}
                {book?.language === "Syriac" ||
                book?.language === "Arabic" ||
                book?.language === "Hebrew" ? (
                  <>
                    {/* Next Page (rightmost for RTL) */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={selectedPageIndex === pages.length - 1}
                      className="h-8 px-3 flex items-center gap-1 relative z-10"
                      title="Next Page"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      <span className="text-xs hidden sm:inline">Next</span>
                    </Button>

                    {/* Page Selector */}
                    <div className="flex items-center gap-2">
                      <Select
                        value={String(selectedPageIndex + 1)}
                        onValueChange={(value) => {
                          const pageNum = parseInt(value);
                          if (pageNum >= 1 && pageNum <= pages.length) {
                            setTranscriptionLoading(true);
                            setSelectedPageIndex(pageNum - 1);
                            setEditMode(false);
                            setTimeout(
                              () => setTranscriptionLoading(false),
                              300
                            );
                          }
                        }}
                      >
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {pages.map((page, index) => (
                            <SelectItem key={page.id} value={String(index + 1)}>
                              Page {index + 1} [{page.pageNumber}]
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-slate-600 font-medium">
                        of {pages.length}
                      </span>
                    </div>

                    {/* Previous Page (leftmost for RTL) */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousPage}
                      disabled={selectedPageIndex === 0}
                      className="h-8 px-3 flex items-center gap-1"
                      title="Previous Page"
                    >
                      <span className="text-xs hidden sm:inline">Previous</span>
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Previous Page (leftmost for LTR) */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousPage}
                      disabled={selectedPageIndex === 0}
                      className="h-8 px-3 flex items-center gap-1"
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      <span className="text-xs hidden sm:inline">Previous</span>
                    </Button>

                    {/* Page Selector */}
                    <div className="flex items-center gap-2">
                      <Select
                        value={String(selectedPageIndex + 1)}
                        onValueChange={(value) => {
                          const pageNum = parseInt(value);
                          if (pageNum >= 1 && pageNum <= pages.length) {
                            setTranscriptionLoading(true);
                            setSelectedPageIndex(pageNum - 1);
                            setEditMode(false);
                            setTimeout(
                              () => setTranscriptionLoading(false),
                              300
                            );
                          }
                        }}
                      >
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {pages.map((page, index) => (
                            <SelectItem key={page.id} value={String(index + 1)}>
                              Page {index + 1} [{page.pageNumber}]
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-slate-600 font-medium">
                        of {pages.length}
                      </span>
                    </div>

                    {/* Next Page (rightmost for LTR) */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={selectedPageIndex === pages.length - 1}
                      className="h-8 px-3 flex items-center gap-1 relative z-10"
                      title="Next Page"
                    >
                      <span className="text-xs hidden sm:inline">Next</span>
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Add Button on the right */}
            <div className="flex items-center">
              {permissions.canCreate && (
                <Dialog
                  open={addPageDialogOpen}
                  onOpenChange={(open) => {
                    setAddPageDialogOpen(open);
                    if (open) {
                      // Calculate suggested page numbers when dialog opens
                      const nextSequentialPageNumber = pages.length + 1;
                      const maxPageNumber = Math.max(
                        0,
                        ...pages.map((p) => p.pageNumber)
                      );
                      const suggestedPageNumber = Math.max(
                        nextSequentialPageNumber,
                        maxPageNumber + 1
                      );

                      setAddPageForm({
                        pageNumber: suggestedPageNumber,
                        pageNumberInBook: suggestedPageNumber,
                        file: null,
                      });
                      setAddPageError("");
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 text-sm flex items-center gap-1 ml-2 sm:ml-4 relative z-10"
                    >
                      <Plus className="w-3 h-3" />
                      <span className="hidden sm:inline">Add</span>
                      <span className="sm:hidden">+</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Page</DialogTitle>
                      <DialogDescription>
                        Upload a new page image and specify page numbers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="pageNumber">Page Number</Label>
                          <Input
                            id="pageNumber"
                            type="number"
                            min="1"
                            value={addPageForm.pageNumber}
                            onChange={(e) =>
                              setAddPageForm((prev) => ({
                                ...prev,
                                pageNumber: parseInt(e.target.value) || 0,
                              }))
                            }
                            placeholder="Page number"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="pageNumberInBook">Page in Book</Label>
                          <Input
                            id="pageNumberInBook"
                            type="number"
                            min="1"
                            value={addPageForm.pageNumberInBook}
                            onChange={(e) =>
                              setAddPageForm((prev) => ({
                                ...prev,
                                pageNumberInBook: parseInt(e.target.value) || 0,
                              }))
                            }
                            placeholder="Page number in book"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="pageImage">Page Image</Label>
                        <Input
                          id="pageImage"
                          type="file"
                          accept="image/*"
                          onChange={handleAddPageFileSelect}
                          className="cursor-pointer"
                        />
                        {addPageForm.file && (
                          <p className="text-sm text-muted-foreground">
                            Selected: {addPageForm.file.name}
                          </p>
                        )}
                      </div>
                      {addPageError && (
                        <p className="text-sm text-red-600">{addPageError}</p>
                      )}
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setAddPageDialogOpen(false)}
                        disabled={addPageLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleAddPageFormSubmit}
                        disabled={addPageLoading || !addPageForm.file}
                      >
                        {addPageLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Adding...
                          </div>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Page
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          {/* Content Area */}
          <div className="flex-1 mb-4">
            {pages.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-8 lg:p-16 text-center mx-2 sm:mx-4 lg:mx-0">
                <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-slate-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4">
                  No pages yet
                </h3>
                <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-md mx-auto">
                  Start by uploading the first page of your book to begin
                  transcription.
                </p>
                {permissions.canCreate && (
                  <Dialog
                    open={addPageDialogOpen}
                    onOpenChange={(open) => {
                      setAddPageDialogOpen(open);
                      if (open) {
                        // For first page, default to page 1
                        setAddPageForm({
                          pageNumber: 1,
                          pageNumberInBook: 1,
                          file: null,
                        });
                        setAddPageError("");
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button size="lg" className="px-8 relative z-10">
                        <Plus className="w-5 h-5 mr-2" />
                        Add First Page
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add First Page</DialogTitle>
                        <DialogDescription>
                          Upload the first page image to begin transcription.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="firstPageNumber">Page Number</Label>
                            <Input
                              id="firstPageNumber"
                              type="number"
                              min="1"
                              value={addPageForm.pageNumber}
                              onChange={(e) =>
                                setAddPageForm((prev) => ({
                                  ...prev,
                                  pageNumber: parseInt(e.target.value) || 0,
                                }))
                              }
                              placeholder="Page number"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="firstPageNumberInBook">
                              Page in Book
                            </Label>
                            <Input
                              id="firstPageNumberInBook"
                              type="number"
                              min="1"
                              value={addPageForm.pageNumberInBook}
                              onChange={(e) =>
                                setAddPageForm((prev) => ({
                                  ...prev,
                                  pageNumberInBook:
                                    parseInt(e.target.value) || 0,
                                }))
                              }
                              placeholder="Page number in book"
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="firstPageImage">Page Image</Label>
                          <Input
                            id="firstPageImage"
                            type="file"
                            accept="image/*"
                            onChange={handleAddPageFileSelect}
                            className="cursor-pointer"
                          />
                          {addPageForm.file && (
                            <p className="text-sm text-muted-foreground">
                              Selected: {addPageForm.file.name}
                            </p>
                          )}
                        </div>
                        {addPageError && (
                          <p className="text-sm text-red-600">{addPageError}</p>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setAddPageDialogOpen(false)}
                          disabled={addPageLoading}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleAddPageFormSubmit}
                          disabled={addPageLoading || !addPageForm.file}
                        >
                          {addPageLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                              Adding...
                            </div>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Page
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            ) : (
              <div className="grid gap-2 lg:gap-8 lg:grid-cols-2 h-full px-2 lg:px-0">
                {/* Left: Text / Editor */}
                <Card className="shadow-lg border-0 flex flex-col h-full py-0 gap-0">
                  <CardHeader className="bg-red-900 text-white h-12 flex items-center rounded-t-lg">
                    <div className="flex items-center justify-between w-full">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Edit className="w-4 h-4" />
                        Transcription
                      </CardTitle>
                      <div className="flex items-center py-100">
                        {permissions.canEdit && (
                          <div className="flex gap-1 sm:gap-2">
                            {editMode ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setEditMode(false);
                                    // Reset content to original values
                                    const page = pages[selectedPageIndex];
                                    setTextContentJson(
                                      page.currentTextJson || null
                                    );
                                  }}
                                  variant="secondary"
                                  className="bg-white text-red-900 hover:bg-slate-100 h-7 sm:h-8 px-2 sm:px-3 text-xs"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={handleSaveTranscription}
                                  variant="default"
                                  className="bg-white text-red-900 hover:bg-slate-100 h-7 sm:h-8 px-2 sm:px-3 text-xs"
                                  disabled={saving}
                                >
                                  {saving ? (
                                    <div className="flex items-center gap-1">
                                      <div className="animate-spin rounded-full h-3 w-3 border-2 border-red-900 border-t-transparent"></div>
                                      <span>Saving...</span>
                                    </div>
                                  ) : (
                                    "Save"
                                  )}
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setEditMode(true);
                                  // Store original content when entering edit mode
                                  setOriginalTextContentJson(textContentJson);
                                }}
                                variant="secondary"
                                className="bg-white text-red-900 hover:bg-slate-100 h-7 sm:h-8 px-2 sm:px-3 text-xs"
                              >
                                Edit
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 flex flex-col min-h-[300px] relative">
                    {transcriptionLoading ? (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-red-900"></div>
                      </div>
                    ) : editMode ? (
                      <div className="flex-1 flex flex-col">
                        <SyriacEditor
                          content={textContentJson || undefined}
                          onUpdate={(_html: string, json?: JSONContent) => {
                            if (json) setTextContentJson(json);
                          }}
                          className="flex-1 w-full"
                        />
                      </div>
                    ) : (
                      <div className="px-2 lg:px-8  flex-1 flex flex-col">
                        {textContentJson ? (
                          <div className="flex-1 p-2 sm:p-4 overflow-y-auto">
                            <div className="prose prose-sm sm:prose-lg max-w-none leading-relaxed">
                              <TipTapRenderer content={textContentJson} />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-center">
                            <div>
                              <p className="text-slate-500 text-base sm:text-lg mb-4">
                                No transcription yet
                              </p>
                              {permissions.canEdit && (
                                <Button
                                  onClick={() => {
                                    setEditMode(true);
                                    // Store original content when entering edit mode
                                    setOriginalTextContentJson(textContentJson);
                                  }}
                                  variant="outline"
                                  size="sm"
                                >
                                  Start Transcribing
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Right: Page Image */}
                <Card className="shadow-lg border-0 overflow-hidden flex flex-col h-full py-0 gap-0">
                  <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white h-12 flex items-center">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <BookOpen className="w-4 h-4" />
                        Page {pages[selectedPageIndex].pageNumber}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 flex items-center justify-center bg-slate-50 min-h-[300px] relative">
                    {pages[selectedPageIndex]?.imageUrl ? (
                      <div className="w-full h-full flex items-center justify-center">
                        {imageLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                            <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-slate-600"></div>
                          </div>
                        )}
                        <Image
                          key={`page-${pages[selectedPageIndex].id}-${pages[selectedPageIndex].imageUrl}`}
                          src={pages[selectedPageIndex].imageUrl}
                          alt={`Page ${pages[selectedPageIndex].pageNumber}`}
                          className="max-w-full max-h-full object-contain"
                          width={800}
                          height={1200}
                          priority
                          onLoad={() => setImageLoading(false)}
                          onError={() => setImageLoading(false)}
                        />
                      </div>
                    ) : (
                      <p className="text-slate-500">No image available</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ProtectedRoute>
      </div>
      <Footer />
    </div>
  );
}
