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
import { Book } from "@/lib/types/book";
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
      style={{
        fontFamily: 'Karshon, "East Syriac Malankara", serif',
        fontSize: "24pt",
        marginTop: "110px",
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

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const bookDoc = await bookService.getBookById(bookId);

        if (bookDoc.exists()) {
          const bookData = bookDoc.data();
          setBook({
            id: bookDoc.id,
            ...bookData,
            createdAt: bookData.createdAt?.toDate?.() || new Date(),
            updatedAt: bookData.updatedAt?.toDate?.() || new Date(),
          } as Book);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  // Fetch pages
  const fetchPages = async (preserveCurrentPage = false) => {
    if (!bookId) return;
    try {
      const pagesSnap = await pageService.getPages(bookId);
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
      setPages(pagesData);

      if (pagesData.length > 0) {
        if (preserveCurrentPage && selectedPageIndex < pagesData.length) {
          // Keep current page and update its content
          setTextContentJson(
            pagesData[selectedPageIndex].currentTextJson || null
          );
        } else {
          // Default to first page (initial load)
          setSelectedPageIndex(0);
          setTextContentJson(pagesData[0].currentTextJson || null);
        }
      }
    } catch (err) {
      console.error("Error fetching pages", err);
    }
  };

  useEffect(() => {
    fetchPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [selectedPageIndex, pages]);

  // Handle file upload trigger
  const handleAddPageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

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
      // Refresh pages
      await fetchPages();
      setSelectedPageIndex(pages.length); // new page index
    } catch (err) {
      console.error("Error uploading page", err);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle save transcription
  const handleSaveTranscription = async () => {
    if (!userProfile || !pages[selectedPageIndex] || saving || !textContentJson)
      return;
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

      // Refresh page data to get updated edits array, preserving current page
      await fetchPages(true);
      setEditMode(false);
    } catch (err) {
      console.error("Error saving transcription", err);
    } finally {
      setSaving(false);
    }
  };

  const handleBackClick = () => {
    router.push("/books");
  };

  const handleEditClick = () => {
    // To be implemented: edit book metadata
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
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-slate-900 mb-4">
                    {book.title}
                  </h1>
                  <div className="flex items-center gap-6 text-slate-600">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      <span className="font-medium">{book.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{book.createdAt.toLocaleDateString()}</span>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1">
                      {book.language}
                    </Badge>
                  </div>
                </div>

                {permissions.canEdit && (
                  <Button onClick={handleEditClick} variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Book
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center justify-center gap-2 mb-4 flex-wrap px-4">
            {pages.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={selectedPageIndex === 0}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="w-3 h-3" />
                </Button>

                <div className="flex items-center gap-1 flex-wrap justify-center">
                  {pages.map((p, idx) => (
                    <Button
                      key={p.id}
                      variant={
                        idx === selectedPageIndex ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => {
                        setTranscriptionLoading(true);
                        setSelectedPageIndex(idx);
                        setEditMode(false);
                        setTimeout(() => setTranscriptionLoading(false), 300);
                      }}
                      className="h-8 min-w-[2rem] px-2 text-sm"
                    >
                      {p.pageNumber}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={selectedPageIndex === pages.length - 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="w-3 h-3" />
                </Button>
              </>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={handleAddPageClick}
              className="h-8 px-3 text-sm flex items-center gap-1 ml-2 sm:ml-4"
            >
              <Plus className="w-3 h-3" />
              <span className="hidden sm:inline">Add</span>
              <span className="sm:hidden">+</span>
            </Button>

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
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-16 text-center mx-4 sm:mx-0">
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
                <Button onClick={handleAddPageClick} size="lg" className="px-8">
                  <Plus className="w-5 h-5 mr-2" />
                  Add First Page
                </Button>
              </div>
            ) : (
              <div className="grid gap-2 lg:gap-8 lg:grid-cols-2 h-full px-4 lg:px-0">
                {/* Left: Page Image */}
                <Card className="shadow-lg border-0 overflow-hidden flex flex-col h-full py-0 gap-0">
                  <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white h-16 flex items-center">
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

                {/* Right: Text / Editor */}
                <Card className="shadow-lg border-0 flex flex-col h-full py-0 gap-0">
                  <CardHeader className="bg-red-900 text-white h-16 flex items-center rounded-t-lg">
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
                                  onClick={handleSaveTranscription}
                                  variant="secondary"
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
                                  variant="outline"
                                  className="border-white text-white hover:bg-white hover:text-red-900 h-7 sm:h-8 px-2 sm:px-3 text-xs"
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => setEditMode(true)}
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
                      <div className="px-8 flex-1 flex flex-col">
                        {textContentJson ? (
                          <div className="flex-1 p-4 overflow-y-auto">
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
                                  onClick={() => setEditMode(true)}
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
              </div>
            )}
          </div>
        </ProtectedRoute>
      </div>
      <Footer />
    </div>
  );
}
