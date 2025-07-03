import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { bookService } from "@/lib/firebase-services";
import { Book, BookStatus } from "@/lib/types/book";
import { Calendar, User, Tag, BookOpen } from "lucide-react";
import Image from "next/image";
import { AddBookDialogWrapper } from "@/components/AddBookDialogWrapper";

// Revalidate the page every day to get new books
export const revalidate = 86400;

// Server component that fetches books data at build time
export default async function BooksPage() {
  // Fetch books data on the server
  const booksSnapshot = await bookService.getAllBooksWithoutPages();
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

  // Sort by creation date, oldest first
  booksData.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
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
            <AddBookDialogWrapper />
          </div>
          <Separator />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!booksData || booksData.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No books yet</h3>
              <p className="text-muted-foreground mb-4">
                The library is empty. Check back later for new additions.
              </p>
            </div>
          ) : (
            booksData?.map((book) => (
              <div key={book.id} className="relative">
                <a href={`/books/${book.id}`}>
                  <Card className="hover:shadow-lg transition-shadow h-full w-full max-w-lg mx-auto">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <CardTitle className="line-clamp-2 text-base font-semibold leading-tight break-words">
                                {book.title}
                              </CardTitle>
                              {book.syriacTitle && (
                                <p
                                  className="text-xl text-slate-600 mt-1 line-clamp-1 break-words"
                                  dir="rtl"
                                  style={{
                                    fontFamily: '"East Syriac Adiabene", serif',
                                  }}
                                >
                                  {book.syriacTitle}
                                </p>
                              )}
                            </div>
                          </div>
                          <CardDescription className="flex items-start gap-2 text-sm mb-2 min-w-0">
                            <User className="w-3 h-3 flex-shrink-0 mt-0.5" />
                            <span
                              className="break-words leading-tight"
                              title={book.author}
                            >
                              {book.author}
                            </span>
                          </CardDescription>
                          {(book.publisher ||
                            book.placeOfPublication ||
                            book.isbn) && (
                            <div className="text-xs text-muted-foreground mb-1 truncate max-w-36 sm:max-w-52 md:max-w-full">
                              {book.publisher && <span>{book.publisher}</span>}
                              {book.publisher && book.placeOfPublication && (
                                <span>, </span>
                              )}
                              {book.placeOfPublication && (
                                <span>{book.placeOfPublication}</span>
                              )}
                              {(book.publisher || book.placeOfPublication) &&
                                book.isbn && <span> • </span>}
                              {book.isbn && (
                                <span className="font-mono">
                                  ISBN: {book.isbn}
                                </span>
                              )}
                            </div>
                          )}
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-2">
                              {book.publicationYear && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3" />
                                  <span>{book.publicationYear}</span>
                                </div>
                              )}
                              <span
                                className={`text-xs font-medium rounded border px-2 py-0 ${getStatusStyling(
                                  book.status
                                )}`}
                              >
                                {getStatusDisplayName(book.status)}
                              </span>
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
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-20">
                          {book.coverImage ? (
                            <div className="w-full">
                              <Image
                                src={book.coverImage}
                                alt={`Cover of ${book.title}`}
                                className="w-full h-28 object-cover rounded-lg border shadow-md"
                                width={80}
                                height={112}
                                unoptimized
                              />
                              {typeof book.pageCount === "number" && (
                                <div className="mt-1 text-center">
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                                    {book.pageCount} pages
                                  </span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="w-full">
                              <div className="w-full h-28 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg border shadow-md flex items-center justify-center">
                                <BookOpen className="w-10 h-10 text-slate-400" />
                              </div>
                              {typeof book.pageCount === "number" && (
                                <div className="mt-1 text-center">
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                                    {book.pageCount} pages
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-2">
                        {book.description}
                      </p>
                      {book.tags && book.tags.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap pt-1">
                          <Tag className="w-3 h-3 text-muted-foreground flex-shrink-0" />
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
                              +{book.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </a>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
