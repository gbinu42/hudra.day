"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  Home,
  FileImage,
  X,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import Image from "next/image";
import SyriacEditor from "@/components/SyriacEditor";
import TipTapRenderer from "@/components/TipTapRenderer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JSONContent } from "@tiptap/react";
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

// Page status types
type PageStatus =
  | "draft"
  | "transcribing"
  | "reviewing"
  | "completed"
  | "published";

// Helper functions for page status
const getPageStatusColor = (status: PageStatus) => {
  switch (status) {
    case "draft":
      return "bg-gray-100 text-gray-800 border-gray-300";
    case "transcribing":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "reviewing":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "completed":
      return "bg-green-100 text-green-800 border-green-300";
    case "published":
      return "bg-purple-100 text-purple-800 border-purple-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getPageStatusDisplayName = (status: PageStatus) => {
  switch (status) {
    case "draft":
      return "Draft";
    case "transcribing":
      return "Transcribing";
    case "reviewing":
      return "Reviewing";
    case "completed":
      return "Completed";
    case "published":
      return "Published";
    default:
      return "Unknown";
  }
};

// Helper function to deep compare JSONContent objects
function isContentEqual(
  content1: JSONContent | null,
  content2: JSONContent | null
): boolean {
  // Handle null cases
  if (content1 === null && content2 === null) return true;
  if (content1 === null || content2 === null) return false;

  // Recursive function to deeply normalize JSON objects
  const deepNormalize = (obj: unknown): unknown => {
    if (obj === null || obj === undefined) return obj;

    if (Array.isArray(obj)) {
      return obj.map(deepNormalize);
    }

    if (typeof obj === "object") {
      const normalized: Record<string, unknown> = {};
      // Sort keys and recursively normalize values
      Object.keys(obj as Record<string, unknown>)
        .sort()
        .forEach((key) => {
          normalized[key] = deepNormalize(
            (obj as Record<string, unknown>)[key]
          );
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
  pageNumberInBook?: string;
  imageUrl: string;
  currentTextJson?: JSONContent;
  currentVersion?: number;
  edits?: Edit[];
  status: PageStatus;
  createdAt?: Date;
  updatedAt?: Date;
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
  const searchParams = useSearchParams();
  const isWhitelabel = searchParams.get("whitelabel") === "1";

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
  const [originalTextContentJson, setOriginalTextContentJson] =
    useState<JSONContent | null>(null);

  // Add page form state
  const [addPageDialogOpen, setAddPageDialogOpen] = useState<boolean>(false);
  const [addPageForm, setAddPageForm] = useState({
    files: [] as Array<{
      file: File;
      pageNumber: number;
      pageNumberInBook?: string;
    }>,
  });
  const [addPageLoading, setAddPageLoading] = useState<boolean>(false);
  const [addPageError, setAddPageError] = useState<string>("");

  // Edit book form state
  const [editBookDialogOpen, setEditBookDialogOpen] = useState<boolean>(false);
  const [editBookForm, setEditBookForm] = useState({
    title: "",
    syriacTitle: "",
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

  // Page status management state
  const [pageStatusDialogOpen, setPageStatusDialogOpen] =
    useState<boolean>(false);
  const [pageStatusLoading, setPageStatusLoading] = useState<boolean>(false);
  const [selectedPageStatus, setSelectedPageStatus] =
    useState<PageStatus>("draft");

  // Line numbers toggle state
  const [showLineNumbers, setShowLineNumbers] = useState<boolean>(false);

  // Font selection state
  const [selectedFont, setSelectedFont] = useState<string>("default");
  const [selectedFontSize, setSelectedFontSize] = useState<string>("default");

  // Use ref to track if we're initializing pages for the first time
  const isInitialPagesLoad = useRef(true);

  // Memoize current page to avoid unnecessary updates
  const currentPage = useMemo(() => {
    return pages[selectedPageIndex] || null;
  }, [pages, selectedPageIndex]);

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

  // Optimized pages snapshot handler - removed selectedPageIndex dependency
  const handlePagesSnapshot = useCallback(
    (pagesSnap: DocumentData) => {
      const pagesData = pagesSnap.docs
        .map((doc: DocumentData) => {
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
          (a: unknown, b: unknown) =>
            (a as Page).pageNumber - (b as Page).pageNumber
        ) as Page[];

      setPages(() => {
        // Only update selected page index on initial load when we have no previous pages
        if (isInitialPagesLoad.current && pagesData.length > 0) {
          isInitialPagesLoad.current = false;
          setSelectedPageIndex(0);
        }
        return pagesData;
      });
    },
    [] // No dependencies to prevent unnecessary listener reattachments
  );

  useEffect(() => {
    if (!bookId) return;

    // Set up real-time listener for pages data
    const unsubscribePages = pageService.onPagesSnapshot(
      bookId,
      handlePagesSnapshot,
      (error) => {
        console.error("Error fetching pages:", error);
      }
    );

    // Cleanup function
    return () => {
      unsubscribePages();
    };
  }, [bookId, handlePagesSnapshot]);

  // Track previous page ID to only reset image loading when actually changing pages
  const previousPageId = useRef<string | null>(null);

  // Separate effect to handle text content updates when page changes
  useEffect(() => {
    if (currentPage) {
      console.log("Loading page data:", {
        pageId: currentPage.id,
        currentTextJson: currentPage.currentTextJson,
        currentVersion: currentPage.currentVersion,
      });
      setTextContentJson(currentPage.currentTextJson || null);

      // Only reset image loading if we're actually changing to a different page
      if (previousPageId.current !== currentPage.id) {
        setImageLoading(true);
        previousPageId.current = currentPage.id;
      }
    }
  }, [currentPage]);

  // Show browser warning when trying to close page while in edit mode
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (editMode) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
        return "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [editMode]);

  // Memoize form validation to prevent unnecessary computations
  const isEditFormValid = useMemo(() => {
    return (
      editBookForm.title.trim() &&
      editBookForm.author.trim() &&
      editBookForm.description.trim() &&
      editBookForm.language.trim() &&
      editBookForm.category.trim() &&
      editBookForm.status
    );
  }, [editBookForm]);

  // Memoized navigation helpers
  const navigationHelpers = useMemo(() => {
    const canGoToPrevious = selectedPageIndex > 0;
    const canGoToNext = selectedPageIndex < pages.length - 1;

    const goToPreviousPage = () => {
      if (canGoToPrevious) {
        setTranscriptionLoading(true);
        setSelectedPageIndex(selectedPageIndex - 1);
        setEditMode(false);
        setTimeout(() => setTranscriptionLoading(false), 300);
      }
    };

    const goToNextPage = () => {
      if (canGoToNext) {
        setTranscriptionLoading(true);
        setSelectedPageIndex(selectedPageIndex + 1);
        setEditMode(false);
        setTimeout(() => setTranscriptionLoading(false), 300);
      }
    };

    return {
      canGoToPrevious,
      canGoToNext,
      goToPreviousPage,
      goToNextPage,
    };
  }, [selectedPageIndex, pages.length]);

  const handleAddPageFormSubmit = async () => {
    if (!userProfile || addPageForm.files.length === 0) {
      setAddPageError("Please select at least one image file");
      return;
    }

    // Validate all page numbers
    for (const fileData of addPageForm.files) {
      if (fileData.pageNumber <= 0) {
        setAddPageError("All page numbers must be greater than 0");
        return;
      }

      if (
        fileData.pageNumberInBook !== undefined &&
        fileData.pageNumberInBook.trim() === ""
      ) {
        setAddPageError("Page number in book cannot be just whitespace");
        return;
      }

      // Check if page number already exists
      const existingPage = pages.find(
        (p) => p.pageNumber === fileData.pageNumber
      );
      if (existingPage) {
        setAddPageError(`Page ${fileData.pageNumber} already exists`);
        return;
      }
    }

    // Check for duplicate page numbers within the upload
    const pageNumbers = addPageForm.files.map((f) => f.pageNumber);
    const duplicates = pageNumbers.filter(
      (num, index) => pageNumbers.indexOf(num) !== index
    );
    if (duplicates.length > 0) {
      setAddPageError(`Duplicate page numbers found: ${duplicates.join(", ")}`);
      return;
    }

    setAddPageLoading(true);
    setAddPageError("");

    try {
      // Upload all images and create pages
      const uploadPromises = addPageForm.files.map(async (fileData) => {
        // Upload image
        const imageUrl = await pageService.uploadPageImage(
          bookId,
          fileData.pageNumber,
          fileData.file
        );

        // Create page doc
        await pageService.createPage(
          bookId,
          fileData.pageNumber,
          imageUrl,
          userProfile.uid,
          fileData.pageNumberInBook
        );

        return fileData.pageNumber;
      });

      await Promise.all(uploadPromises);

      // Real-time listener will automatically update pages
      // Wait a moment for the listener to update, then select the first new page
      setTimeout(() => {
        const firstNewPageNumber = Math.min(...pageNumbers);
        const newPageIndex = pages.findIndex(
          (p) => p.pageNumber === firstNewPageNumber
        );
        if (newPageIndex >= 0) {
          setSelectedPageIndex(newPageIndex);
        } else {
          // If not found, select the last page
          setSelectedPageIndex(pages.length);
        }
      }, 100);

      // Close dialog
      setAddPageDialogOpen(false);
    } catch (err) {
      console.error("Error uploading pages", err);
      setAddPageError("Failed to add pages. Please try again.");
    } finally {
      setAddPageLoading(false);
    }
  };

  const handleMultipleFileSelect = useCallback(
    (files: File[]) => {
      // Sort files by name (natural sort)
      const sortedFiles = [...files].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { numeric: true })
      );

      // Calculate starting page numbers
      const nextSequentialPageNumber = pages.length + 1;
      const maxPageNumber = Math.max(0, ...pages.map((p) => p.pageNumber));
      const startingPageNumber = Math.max(
        nextSequentialPageNumber,
        maxPageNumber + 1
      );

      // Create file data with auto-assigned page numbers
      const fileData = sortedFiles.map((file, index) => ({
        file,
        pageNumber: startingPageNumber + index,
        pageNumberInBook: undefined as string | undefined,
      }));

      setAddPageForm({ files: fileData });
      setAddPageError("");
    },
    [pages]
  );

  const handleRemoveFile = useCallback((index: number) => {
    setAddPageForm((prev) => ({
      files: prev.files.filter((_, i) => i !== index),
    }));
  }, []);

  const handleUpdateFilePageNumber = useCallback(
    (index: number, pageNumber: number) => {
      setAddPageForm((prev) => ({
        files: prev.files.map((fileData, i) =>
          i === index ? { ...fileData, pageNumber } : fileData
        ),
      }));
    },
    []
  );

  const handleUpdateFilePageNumberInBook = useCallback(
    (index: number, pageNumberInBook: string) => {
      setAddPageForm((prev) => ({
        files: prev.files.map((fileData, i) =>
          i === index
            ? {
                ...fileData,
                pageNumberInBook: pageNumberInBook.trim() || undefined,
              }
            : fileData
        ),
      }));
    },
    []
  );

  // Handle save transcription
  const handleSaveTranscription = async () => {
    if (!userProfile || !currentPage || saving || !textContentJson) return;

    // Check if content has actually changed
    if (isContentEqual(textContentJson, originalTextContentJson)) {
      // Content hasn't changed, just exit edit mode
      setEditMode(false);
      return;
    }

    const newVersion = (currentPage.currentVersion || 0) + 1;
    const isFirstText =
      !currentPage.currentTextJson ||
      currentPage.currentTextJson.content?.length === 0;

    console.log("Saving transcription:", {
      textContentJson,
      pageId: currentPage.id,
      newVersion,
      isFirstText,
    });

    setSaving(true);
    try {
      // Add new edit to the page's edits array
      await pageService.addEditToPage(currentPage.id, {
        version: newVersion,
        textJson: textContentJson,
        userId: userProfile.uid,
        status: "pending",
      });

      // If this is the first text added to the page and status is draft, change to transcribing
      if (isFirstText && currentPage.status === "draft") {
        await pageService.updatePageStatus(
          currentPage.id,
          "transcribing",
          userProfile.uid
        );
      }

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

  const handleBackClick = useCallback(() => {
    router.push("/books");
  }, [router]);

  const handleEditClick = useCallback(() => {
    if (!book) return;

    // Initialize edit form with current book data
    setEditBookForm({
      title: book.title,
      syriacTitle: book.syriacTitle || "",
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
  }, [book]);

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

  const handleEditBookInputChange = useCallback(
    (field: keyof typeof editBookForm, value: string | number | BookStatus) => {
      setEditBookForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const { goToPreviousPage, goToNextPage } = navigationHelpers;

  const handlePageStatusChange = async () => {
    if (!userProfile || !currentPage) return;

    setPageStatusLoading(true);

    try {
      await pageService.updatePageStatus(
        currentPage.id,
        selectedPageStatus,
        userProfile.uid
      );
      setPageStatusDialogOpen(false);
    } catch (err) {
      console.error("Error updating page status:", err);
      alert("Failed to update page status. Please try again.");
    } finally {
      setPageStatusLoading(false);
    }
  };

  const openPageStatusDialog = useCallback(() => {
    console.log("openPageStatusDialog called");
    console.log("selectedPageIndex:", selectedPageIndex);
    console.log("currentPage:", currentPage);
    console.log("current pageStatusDialogOpen:", pageStatusDialogOpen);

    if (currentPage) {
      const currentStatus = currentPage.status || "draft";
      console.log("Setting status to:", currentStatus);
      setSelectedPageStatus(currentStatus);
      setPageStatusDialogOpen(true);
      console.log("Dialog should now be open");
    } else {
      console.log("No page found at selectedPageIndex");
    }
  }, [currentPage, selectedPageIndex, pageStatusDialogOpen]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {!isWhitelabel && <Navbar />}
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground">Loading book...</p>
            </div>
          </div>
        </div>
        {!isWhitelabel && <Footer />}
      </div>
    );
  }

  if (notFound || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {!isWhitelabel && <Navbar />}
        <div className="container mx-auto px-4 py-16">
          <ProtectedRoute requireAuth={false}>
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

        {/* Page Status Change Dialog */}
        {(() => {
          console.log(
            "Rendering dialog with pageStatusDialogOpen:",
            pageStatusDialogOpen
          );
          return null;
        })()}
        <Dialog
          open={pageStatusDialogOpen}
          onOpenChange={(open) => {
            console.log("Dialog onOpenChange called with:", open);
            setPageStatusDialogOpen(open);
          }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Change Page Status</DialogTitle>
              <DialogDescription>
                Update the status for Page{" "}
                {pages[selectedPageIndex]?.pageNumber}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="pageStatus">Status</Label>
                <Select
                  value={selectedPageStatus}
                  onValueChange={(value) =>
                    setSelectedPageStatus(value as PageStatus)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <span>Draft</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="transcribing">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                        <span>Transcribing</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="reviewing">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                        <span>Reviewing</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="completed">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-300"></div>
                        <span>Completed</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="published">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-300"></div>
                        <span>Published</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  console.log("Cancel button clicked");
                  setPageStatusDialogOpen(false);
                }}
                disabled={pageStatusLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Update Status button clicked");
                  handlePageStatusChange();
                }}
                disabled={pageStatusLoading}
              >
                {pageStatusLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Updating...
                  </div>
                ) : (
                  "Update Status"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {!isWhitelabel && <Footer />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {!isWhitelabel && <Navbar />}
      <div className="container mx-auto px-4 py-4 sm:py-8 flex-1 flex flex-col">
        <ProtectedRoute requireAuth={false}>
          {/* Title Section - Breadcrumbs and Header */}
          <div className="relative">
            {/* Breadcrumbs */}
            {!isWhitelabel && (
              <div className="px-4 mb-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">
                        <Home className="h-4 w-4" />
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/books">
                        <BookOpen className="h-4 w-4" />
                        Books
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{book.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            )}

            {/* Edit Button */}
            {permissions.canEdit && !isWhitelabel && (
              <div className="flex justify-end mb-2">
                <Dialog
                  open={editBookDialogOpen}
                  onOpenChange={setEditBookDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={handleEditClick}
                      variant="outline"
                      size="sm"
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
                          <Label htmlFor="editSyriacTitle">Syriac Title</Label>
                          <Input
                            id="editSyriacTitle"
                            value={editBookForm.syriacTitle}
                            onChange={(e) =>
                              handleEditBookInputChange(
                                "syriacTitle",
                                e.target.value
                              )
                            }
                            placeholder="Enter Syriac title"
                            dir="rtl"
                            className="text-right"
                            style={{
                              fontFamily: '"East Syriac Adiabene", serif',
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
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
                        disabled={!isEditFormValid || editBookLoading}
                      >
                        {editBookLoading ? "Updating..." : "Update Book"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {/* Book Details Card */}
            <Card className="mb-4 shadow-sm">
              <CardContent className="p-3 sm:px-4 sm:py-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4">
                      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 break-words flex-1 min-w-0">
                        {book.title}
                      </h1>
                      {book.syriacTitle && (
                        <span
                          className="text-2xl sm:text-3xl text-slate-700 break-words sm:flex-shrink-0 text-right"
                          dir="rtl"
                          style={{
                            fontFamily: '"East Syriac Adiabene", serif',
                          }}
                        >
                          {book.syriacTitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-600 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 shrink-0" />
                    <span className="font-medium break-words">
                      {book.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span className="text-sm sm:text-base">
                      {book.publicationYear || "Publication year unknown"}
                    </span>
                  </div>
                  <Badge variant="secondary" className="w-fit px-3 py-1">
                    {book.language}
                  </Badge>
                </div>

                {book.tags && book.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {book.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-2 py-1 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
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
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {pages.map((page, index) => (
                            <SelectItem key={page.id} value={String(index + 1)}>
                              <div className="flex items-center justify-between w-full">
                                <span>
                                  Page {index + 1}
                                  {page.pageNumberInBook && (
                                    <>
                                      {" | "}
                                      <span
                                        style={{
                                          fontFamily:
                                            '"East Syriac Adiabene", serif',
                                        }}
                                      >
                                        {page.pageNumberInBook}
                                      </span>
                                    </>
                                  )}
                                </span>
                                <div
                                  className={`ml-2 px-1 py-0.5 rounded text-xs ${getPageStatusColor(
                                    page.status || "draft"
                                  )}`}
                                >
                                  {getPageStatusDisplayName(
                                    page.status || "draft"
                                  )}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-slate-600 font-medium">
                        of {pages.length}
                      </span>
                    </div>

                    {/* Next Page (rightmost for RTL) */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={selectedPageIndex === pages.length - 1}
                      className="h-8 px-3 flex items-center gap-1"
                      title="Next Page"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      <span className="text-xs hidden sm:inline">Next</span>
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Next Page (leftmost for LTR) */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={selectedPageIndex === pages.length - 1}
                      className="h-8 px-3 flex items-center gap-1"
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
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {pages.map((page, index) => (
                            <SelectItem key={page.id} value={String(index + 1)}>
                              <div className="flex items-center justify-between w-full">
                                <span>
                                  Page {index + 1}
                                  {page.pageNumberInBook && (
                                    <>
                                      {" | "}
                                      <span
                                        style={{
                                          fontFamily:
                                            '"East Syriac Adiabene", serif',
                                        }}
                                      >
                                        {page.pageNumberInBook}
                                      </span>
                                    </>
                                  )}
                                </span>
                                <div
                                  className={`ml-2 px-1 py-0.5 rounded text-xs ${getPageStatusColor(
                                    page.status || "draft"
                                  )}`}
                                >
                                  {getPageStatusDisplayName(
                                    page.status || "draft"
                                  )}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-slate-600 font-medium">
                        of {pages.length}
                      </span>
                    </div>

                    {/* Previous Page (rightmost for LTR) */}
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
                )}
              </div>
            )}

            {/* Add Button on the right */}
            <div className="flex items-center">
              {permissions.canCreate && !isWhitelabel && (
                <Dialog
                  open={addPageDialogOpen}
                  onOpenChange={(open) => {
                    setAddPageDialogOpen(open);
                    if (open) {
                      setAddPageForm({ files: [] });
                      setAddPageError("");
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 text-sm flex items-center gap-1 ml-2 sm:ml-4"
                    >
                      <Plus className="w-3 h-3" />
                      <span className="hidden sm:inline">Add</span>
                      <span className="sm:hidden">+</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
                    <DialogHeader>
                      <DialogTitle>Add Pages</DialogTitle>
                      <DialogDescription>
                        Upload one or more page images. Files will be sorted by
                        name and assigned sequential page numbers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto">
                      <div className="grid gap-4 py-4">
                        {/* Multi-file Upload Area */}
                        <div className="grid gap-2">
                          <Label>Page Images</Label>
                          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                if (files.length > 0) {
                                  handleMultipleFileSelect(files);
                                }
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              disabled={addPageLoading}
                            />
                            <div className="text-center">
                              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-900">
                                  Drop files here or click to browse
                                </p>
                                <p className="text-xs text-gray-500">
                                  Select multiple images (up to 50MB each)
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* File Preview and Configuration */}
                        {addPageForm.files.length > 0 && (
                          <div className="grid gap-2">
                            <Label>
                              Selected Files ({addPageForm.files.length})
                            </Label>
                            <div className="max-h-60 overflow-y-auto border rounded-lg p-2 space-y-2">
                              {addPageForm.files.map((fileData, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 p-2 bg-gray-50 rounded border"
                                >
                                  {/* File preview */}
                                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                    <FileImage className="w-6 h-6 text-gray-500" />
                                  </div>

                                  {/* File info and controls */}
                                  <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {/* File name */}
                                    <div className="min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {fileData.file.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {(
                                          fileData.file.size /
                                          (1024 * 1024)
                                        ).toFixed(1)}{" "}
                                        MB
                                      </p>
                                    </div>

                                    {/* Page number input */}
                                    <div>
                                      <Input
                                        type="number"
                                        min="1"
                                        value={fileData.pageNumber}
                                        onChange={(e) => {
                                          const pageNum =
                                            parseInt(e.target.value) || 0;
                                          handleUpdateFilePageNumber(
                                            index,
                                            pageNum
                                          );
                                        }}
                                        placeholder="Page #"
                                        className="text-sm h-8"
                                      />
                                    </div>

                                    {/* Page in book input */}
                                    <div>
                                      <Input
                                        type="text"
                                        value={fileData.pageNumberInBook || ""}
                                        onChange={(e) => {
                                          handleUpdateFilePageNumberInBook(
                                            index,
                                            e.target.value
                                          );
                                        }}
                                        placeholder="Page in book (optional)"
                                        className="text-sm h-8"
                                        dir="rtl"
                                        style={{
                                          fontFamily:
                                            '"East Syriac Adiabene", serif',
                                        }}
                                      />
                                    </div>
                                  </div>

                                  {/* Remove button */}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveFile(index)}
                                    className="h-8 w-8 p-0 flex-shrink-0"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {addPageError && (
                          <div className="bg-red-50 border border-red-200 rounded p-3">
                            <p className="text-sm text-red-600">
                              {addPageError}
                            </p>
                          </div>
                        )}
                      </div>
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
                        disabled={
                          addPageLoading || addPageForm.files.length === 0
                        }
                      >
                        {addPageLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Adding...
                          </div>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Add {addPageForm.files.length} Page
                            {addPageForm.files.length !== 1 ? "s" : ""}
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
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
                {permissions.canCreate && !isWhitelabel && (
                  <Dialog
                    open={addPageDialogOpen}
                    onOpenChange={(open) => {
                      setAddPageDialogOpen(open);
                      if (open) {
                        setAddPageForm({ files: [] });
                        setAddPageError("");
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button size="lg" className="px-8">
                        <Plus className="w-5 h-5 mr-2" />
                        Add First Page
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Add First Page</DialogTitle>
                        <DialogDescription>
                          Upload the first page image(s) to begin transcription.
                          You can add multiple pages at once.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex-1 overflow-y-auto">
                        <div className="grid gap-4 py-4">
                          {/* Multi-file Upload Area */}
                          <div className="grid gap-2">
                            <Label>Page Images</Label>
                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                  const files = Array.from(
                                    e.target.files || []
                                  );
                                  if (files.length > 0) {
                                    handleMultipleFileSelect(files);
                                  }
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={addPageLoading}
                              />
                              <div className="text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <div className="space-y-2">
                                  <p className="text-sm font-medium text-gray-900">
                                    Drop files here or click to browse
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Select multiple images (up to 50MB each)
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* File Preview and Configuration */}
                          {addPageForm.files.length > 0 && (
                            <div className="grid gap-2">
                              <Label>
                                Selected Files ({addPageForm.files.length})
                              </Label>
                              <div className="max-h-60 overflow-y-auto border rounded-lg p-2 space-y-2">
                                {addPageForm.files.map((fileData, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-3 p-2 bg-gray-50 rounded border"
                                  >
                                    {/* File preview */}
                                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                      <FileImage className="w-6 h-6 text-gray-500" />
                                    </div>

                                    {/* File info and controls */}
                                    <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                      {/* File name */}
                                      <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                          {fileData.file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {(
                                            fileData.file.size /
                                            (1024 * 1024)
                                          ).toFixed(1)}{" "}
                                          MB
                                        </p>
                                      </div>

                                      {/* Page number input */}
                                      <div>
                                        <Input
                                          type="number"
                                          min="1"
                                          value={fileData.pageNumber}
                                          onChange={(e) => {
                                            const pageNum =
                                              parseInt(e.target.value) || 0;
                                            handleUpdateFilePageNumber(
                                              index,
                                              pageNum
                                            );
                                          }}
                                          placeholder="Page #"
                                          className="text-sm h-8"
                                        />
                                      </div>

                                      {/* Page in book input */}
                                      <div>
                                        <Input
                                          type="text"
                                          value={
                                            fileData.pageNumberInBook || ""
                                          }
                                          onChange={(e) => {
                                            handleUpdateFilePageNumberInBook(
                                              index,
                                              e.target.value
                                            );
                                          }}
                                          placeholder="Page in book (optional)"
                                          className="text-sm h-8"
                                          dir="rtl"
                                          style={{
                                            fontFamily:
                                              '"East Syriac Adiabene", serif',
                                          }}
                                        />
                                      </div>
                                    </div>

                                    {/* Remove button */}
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRemoveFile(index)}
                                      className="h-8 w-8 p-0 flex-shrink-0"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {addPageError && (
                            <div className="bg-red-50 border border-red-200 rounded p-3">
                              <p className="text-sm text-red-600">
                                {addPageError}
                              </p>
                            </div>
                          )}
                        </div>
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
                          disabled={
                            addPageLoading || addPageForm.files.length === 0
                          }
                        >
                          {addPageLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                              Adding...
                            </div>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Add {addPageForm.files.length} Page
                              {addPageForm.files.length !== 1 ? "s" : ""}
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            ) : (
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8 h-full">
                {/* Left: Text / Editor */}
                <Card className="shadow-lg border-0 flex flex-col h-full py-0 gap-0">
                  <CardHeader className="bg-red-900 text-white h-12 flex items-center rounded-t-lg">
                    <div className="flex items-center justify-between w-full h-6">
                      <div className="flex items-center gap-3">
                        <CardTitle className="flex items-center gap-2 text-sm">
                          <Edit className="w-4 h-4" />
                          Transcription
                        </CardTitle>
                        {/* Font Selector and Font Size Selector - only show when not in edit mode and hide on mobile */}
                        {!editMode && (
                          <>
                            <div className="flex items-center gap-2">
                              <label className="hidden md:block text-xs text-white/80">
                                Font:
                              </label>
                              <Select
                                value={selectedFont}
                                onValueChange={setSelectedFont}
                              >
                                <SelectTrigger
                                  className="w-24 md:w-32 bg-white text-red-900 hover:bg-slate-100 text-xs"
                                  style={{
                                    height: "32px",
                                    minHeight: "20px",
                                    padding: "0 8px",
                                  }}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="default">
                                    Default
                                  </SelectItem>
                                  <SelectItem value="East Syriac Adiabene">
                                    East Syriac Adiabene
                                  </SelectItem>
                                  <SelectItem value="East Syriac Malankara">
                                    East Syriac Malankara
                                  </SelectItem>
                                  <SelectItem value="East Syriac Malankara Classical">
                                    East Syriac Malankara Classical
                                  </SelectItem>
                                  <SelectItem value="East Syriac Ctesiphon">
                                    East Syriac Ctesiphon
                                  </SelectItem>
                                  <SelectItem value="Karshon">
                                    Karshon
                                  </SelectItem>
                                  <SelectItem value="Estrangelo Edessa">
                                    Estrangelo Edessa
                                  </SelectItem>
                                  <SelectItem value="Estrangelo Qenneshrin">
                                    Estrangelo Qenneshrin
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                              <label className="text-xs text-white/80">
                                Size:
                              </label>
                              <Select
                                value={selectedFontSize}
                                onValueChange={setSelectedFontSize}
                              >
                                <SelectTrigger
                                  className="w-16 bg-white text-red-900 hover:bg-slate-100 text-xs"
                                  style={{
                                    height: "32px",
                                    minHeight: "20px",
                                    padding: "0 8px",
                                  }}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="default">
                                    Default
                                  </SelectItem>
                                  <SelectItem value="12pt">12pt</SelectItem>
                                  <SelectItem value="14pt">14pt</SelectItem>
                                  <SelectItem value="16pt">16pt</SelectItem>
                                  <SelectItem value="18pt">18pt</SelectItem>
                                  <SelectItem value="20pt">20pt</SelectItem>
                                  <SelectItem value="22pt">22pt</SelectItem>
                                  <SelectItem value="24pt">24pt</SelectItem>
                                  <SelectItem value="28pt">28pt</SelectItem>
                                  <SelectItem value="32pt">32pt</SelectItem>
                                  <SelectItem value="36pt">36pt</SelectItem>
                                  <SelectItem value="48pt">48pt</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 py-100">
                        {/* Line Numbers Toggle */}
                        <Button
                          size="sm"
                          onClick={() => setShowLineNumbers(!showLineNumbers)}
                          variant="secondary"
                          className={`h-7 px-2 text-xs ${
                            showLineNumbers
                              ? "bg-white text-red-900 hover:bg-slate-100"
                              : "bg-white/20 text-white hover:bg-white/30"
                          }`}
                          title={
                            showLineNumbers
                              ? "Hide line numbers"
                              : "Show line numbers"
                          }
                        >
                          123
                        </Button>
                        {permissions.canEdit && !isWhitelabel && (
                          <div className="flex gap-1 sm:gap-2">
                            {editMode ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setEditMode(false);
                                    // Reset content to original values
                                    setTextContentJson(
                                      currentPage?.currentTextJson || null
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
                                variant="outline"
                                className="border-slate-300 text-slate-700 hover:bg-slate-50 h-7 sm:h-8 px-2 sm:px-3 text-xs"
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
                      <div className="px-2 lg:px-4  flex-1 flex flex-col">
                        {textContentJson ? (
                          <div className="flex-1 p-2 sm:p-4 overflow-y-auto">
                            <div className="prose prose-sm sm:prose-lg max-w-none leading-relaxed">
                              <TipTapRenderer
                                content={textContentJson}
                                showLineNumbers={showLineNumbers}
                                selectedFont={selectedFont}
                                selectedFontSize={selectedFontSize}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-center">
                            <div>
                              <p className="text-slate-500 text-base sm:text-lg mb-4">
                                No transcription yet
                              </p>
                              {permissions.canEdit && !isWhitelabel && (
                                <Button
                                  onClick={() => {
                                    setEditMode(true);
                                    // Store original content when entering edit mode
                                    setOriginalTextContentJson(textContentJson);
                                  }}
                                  variant="outline"
                                  size="sm"
                                  className="border-slate-300 text-slate-700 hover:bg-slate-50"
                                >
                                  Edit
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
                    <div className="flex items-center justify-between w-full h-full">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-normal">
                          Page {currentPage?.pageNumber}
                        </span>
                        {currentPage?.pageNumberInBook && (
                          <>
                            <span className="text-gray-300">|</span>
                            <span
                              className="text-lg font-normal"
                              style={{
                                fontFamily: '"East Syriac Adiabene", serif',
                                marginBottom: "-2px",
                              }}
                            >
                              {currentPage.pageNumberInBook}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Page Status Badge */}
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getPageStatusColor(
                            currentPage?.status || "draft"
                          )}`}
                        >
                          {getPageStatusDisplayName(
                            currentPage?.status || "draft"
                          )}
                        </div>
                        {/* Admin Status Change Button */}
                        {(() => {
                          console.log("Permissions check:", {
                            canEdit: permissions.canEdit,
                            userRole: userProfile?.role,
                            isAdmin: userProfile?.role === "admin",
                          });
                          return (
                            permissions.canEdit &&
                            userProfile?.role === "admin" &&
                            !isWhitelabel
                          );
                        })() && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white text-slate-900 hover:bg-slate-100 h-7 px-2 text-xs"
                            onClick={(e) => {
                              console.log("Change Status button clicked!");
                              e.preventDefault();
                              e.stopPropagation();
                              openPageStatusDialog();
                            }}
                          >
                            Change Status
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 flex items-center justify-center bg-slate-50 min-h-[300px] relative">
                    {currentPage?.imageUrl ? (
                      <div className="w-full h-full flex items-center justify-center">
                        {imageLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                            <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-slate-600"></div>
                          </div>
                        )}
                        <Image
                          key={`page-${currentPage.id}-${currentPage.imageUrl}`}
                          src={currentPage.imageUrl}
                          alt={`Page ${currentPage.pageNumber}`}
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

          {/* Bottom Page Navigation */}
          {pages.length > 0 && (
            <div className="flex items-center justify-center mt-6 mb-4 px-4">
              <div className="flex items-center gap-3">
                {/* For RTL documents (like Syriac), reverse the navigation */}
                {book?.language === "Syriac" ||
                book?.language === "Arabic" ||
                book?.language === "Hebrew" ? (
                  <>
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
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {pages.map((page, index) => (
                            <SelectItem key={page.id} value={String(index + 1)}>
                              <div className="flex items-center justify-between w-full">
                                <span>
                                  Page {index + 1}
                                  {page.pageNumberInBook && (
                                    <>
                                      {" | "}
                                      <span
                                        style={{
                                          fontFamily:
                                            '"East Syriac Adiabene", serif',
                                        }}
                                      >
                                        {page.pageNumberInBook}
                                      </span>
                                    </>
                                  )}
                                </span>
                                <div
                                  className={`ml-2 px-1 py-0.5 rounded text-xs ${getPageStatusColor(
                                    page.status || "draft"
                                  )}`}
                                >
                                  {getPageStatusDisplayName(
                                    page.status || "draft"
                                  )}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-slate-600 font-medium">
                        of {pages.length}
                      </span>
                    </div>

                    {/* Next Page (rightmost for RTL) */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={selectedPageIndex === pages.length - 1}
                      className="h-8 px-3 flex items-center gap-1"
                      title="Next Page"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      <span className="text-xs hidden sm:inline">Next</span>
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Next Page (leftmost for LTR) */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={selectedPageIndex === pages.length - 1}
                      className="h-8 px-3 flex items-center gap-1"
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
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {pages.map((page, index) => (
                            <SelectItem key={page.id} value={String(index + 1)}>
                              <div className="flex items-center justify-between w-full">
                                <span>
                                  Page {index + 1}
                                  {page.pageNumberInBook && (
                                    <>
                                      {" | "}
                                      <span
                                        style={{
                                          fontFamily:
                                            '"East Syriac Adiabene", serif',
                                        }}
                                      >
                                        {page.pageNumberInBook}
                                      </span>
                                    </>
                                  )}
                                </span>
                                <div
                                  className={`ml-2 px-1 py-0.5 rounded text-xs ${getPageStatusColor(
                                    page.status || "draft"
                                  )}`}
                                >
                                  {getPageStatusDisplayName(
                                    page.status || "draft"
                                  )}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-slate-600 font-medium">
                        of {pages.length}
                      </span>
                    </div>

                    {/* Previous Page (rightmost for LTR) */}
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
                )}
              </div>
            </div>
          )}
        </ProtectedRoute>
      </div>

      {/* Page Status Change Dialog */}
      {(() => {
        console.log(
          "Rendering dialog with pageStatusDialogOpen:",
          pageStatusDialogOpen
        );
        return null;
      })()}
      <Dialog
        open={pageStatusDialogOpen}
        onOpenChange={(open) => {
          console.log("Dialog onOpenChange called with:", open);
          setPageStatusDialogOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Page Status</DialogTitle>
            <DialogDescription>
              Update the status for Page {currentPage?.pageNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="pageStatus">Status</Label>
              <Select
                value={selectedPageStatus}
                onValueChange={(value) =>
                  setSelectedPageStatus(value as PageStatus)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span>Draft</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="transcribing">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                      <span>Transcribing</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="reviewing">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                      <span>Reviewing</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="completed">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-300"></div>
                      <span>Completed</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="published">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-300"></div>
                      <span>Published</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                console.log("Cancel button clicked");
                setPageStatusDialogOpen(false);
              }}
              disabled={pageStatusLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("Update Status button clicked");
                handlePageStatusChange();
              }}
              disabled={pageStatusLoading}
            >
              {pageStatusLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Updating...
                </div>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!isWhitelabel && <Footer />}
    </div>
  );
}
