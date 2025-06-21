"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/hooks/useAuth";
import { usePermissions } from "@/lib/rbac";
import { bookService } from "@/lib/firebase-services";
import { Book } from "@/lib/types/book";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  BookOpen,
  Globe,
  Hash,
  Building,
  FileText,
  Edit,
} from "lucide-react";
import Image from "next/image";

export default function BookViewer() {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { userProfile } = useAuth();
  const permissions = usePermissions(userProfile?.role || null);
  const params = useParams();
  const router = useRouter();
  const bookId = params.bookId as string;

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

  const handleBackClick = () => {
    router.push("/books");
  };

  const handleEditClick = () => {
    // TODO: Implement edit functionality
    console.log("Edit book:", bookId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading book...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <ProtectedRoute requireAuth={true}>
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h1 className="text-2xl font-bold mb-2">Book Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The book you&apos;re looking for doesn&apos;t exist or has been
                removed.
              </p>
              <Button onClick={handleBackClick}>
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <ProtectedRoute requireAuth={true}>
          <div className="mb-6">
            <Button variant="ghost" onClick={handleBackClick} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Books
            </Button>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {book.title}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{book.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{book.createdAt.toLocaleDateString()}</span>
                  </div>
                  <Badge variant="secondary">{book.language}</Badge>
                </div>
              </div>

              {permissions.canEdit && (
                <Button onClick={handleEditClick}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Book
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {book.description}
                  </p>
                </CardContent>
              </Card>

              {book.tags?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {book.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              {book.coverImage && (
                <Card>
                  <CardHeader>
                    <CardTitle>Cover</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full rounded-lg border"
                    />
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Book Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="w-4 h-4" />
                      Language
                    </span>
                    <span className="text-sm font-medium">{book.language}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      Category
                    </span>
                    <span className="text-sm font-medium">{book.category}</span>
                  </div>

                  {book.publicationYear && (
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        Publication Year
                      </span>
                      <span className="text-sm font-medium">
                        {book.publicationYear}
                      </span>
                    </div>
                  )}

                  {book.pages && (
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        Pages
                      </span>
                      <span className="text-sm font-medium">{book.pages}</span>
                    </div>
                  )}

                  {book.publisher && (
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building className="w-4 h-4" />
                        Publisher
                      </span>
                      <span className="text-sm font-medium">
                        {book.publisher}
                      </span>
                    </div>
                  )}

                  {book.isbn && (
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Hash className="w-4 h-4" />
                        ISBN
                      </span>
                      <span className="text-sm font-medium">{book.isbn}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Status
                    </span>
                    <Badge variant={book.isPublished ? "default" : "secondary"}>
                      {book.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Created
                    </span>
                    <span className="text-sm">
                      {book.createdAt.toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Last Updated
                    </span>
                    <span className="text-sm">
                      {book.updatedAt.toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ProtectedRoute>
      </div>
      <Footer />
    </div>
  );
}
