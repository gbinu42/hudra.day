import { bookService } from "@/lib/firebase-services";
import BookViewer from "@/components/BookViewer";
import { Metadata } from "next";
import { Book } from "@/lib/types/book";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { commentService } from "@/lib/comment-services";
import { Comment } from "@/lib/types/comment";
import CommentsSectionWithStatic from "@/components/CommentsSectionWithStatic";
import Footer from "@/components/Footer";

// Server-side function to generate static params
export async function generateStaticParams() {
  try {
    const booksSnapshot = await bookService.getAllBooksWithoutPages();
    const bookIds = booksSnapshot.docs.map((doc) => ({
      bookId: doc.id,
    }));

    return bookIds;
  } catch (error) {
    console.error("Error generating static params for books:", error);
    // Return empty array as fallback
    return [];
  }
}

// Generate dynamic metadata for book pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookId: string }>;
}): Promise<Metadata> {
  try {
    const { bookId } = await params;
    const bookDoc = await bookService.getBookById(bookId);

    if (!bookDoc.exists()) {
      return {
        title: "Book Not Found",
        description: "The requested book could not be found.",
      };
    }

    const bookData = bookDoc.data() as Book;
    const book = {
      ...bookData,
      id: bookDoc.id,
    };

    // Build rich title
    const titleParts = [book.title];
    if (book.syriacTitle) {
      titleParts.push(`(${book.syriacTitle})`);
    }
    titleParts.push(`by ${book.author}`);
    const fullTitle = titleParts.join(" ");

    // Build rich description
    const descParts: string[] = [];
    if (book.description) {
      descParts.push(book.description);
    } else {
      descParts.push(`${book.title}${book.syriacTitle ? ` (${book.syriacTitle})` : ""} by ${book.author}.`);
    }
    
    if (book.category) {
      descParts.push(`A ${book.category.toLowerCase()} book`);
    }
    
    if (book.language) {
      descParts.push(`in ${book.language}`);
    }
    
    if (book.publicationYear) {
      descParts.push(`published in ${book.publicationYear}`);
    }
    
    if (book.pageCount) {
      descParts.push(`(${book.pageCount} pages)`);
    }
    
    if (book.publisher) {
      descParts.push(`by ${book.publisher}`);
      if (book.placeOfPublication) {
        descParts.push(`in ${book.placeOfPublication}`);
      }
    }

    // Add other names (Syriac title if it exists and is different from main title)
    if (book.syriacTitle && book.syriacTitle !== book.title) {
      descParts.push(`Also known as: ${book.syriacTitle}.`);
    }
    
    const fullDescription = descParts.join(". ") + ".";

    // Build comprehensive keywords
    const keywords = [
      book.title,
      ...(book.syriacTitle ? [book.syriacTitle] : []),
      book.author,
      book.category,
      book.language,
      "East Syriac",
      "Syriac literature",
      "Church of the East",
      "liturgical text",
      ...(book.tags || []),
      ...(book.publisher ? [book.publisher] : []),
      ...(book.placeOfPublication ? [book.placeOfPublication] : []),
    ].filter(Boolean);

    // Get cover image or default
    const coverImage = book.coverImage || "https://hudra.day/images/book-default.png";

    return {
      title: fullTitle,
      description: fullDescription,
      keywords: keywords.join(", "),
      authors: [{ name: book.author }],
      openGraph: {
        title: fullTitle,
        description: fullDescription,
        type: "book",
        siteName: "Hudra Day - East Syriac Liturgical Archive",
        images: [
          {
            url: coverImage,
            width: 1200,
            height: 630,
            alt: `${book.title}${book.syriacTitle ? ` (${book.syriacTitle})` : ""} cover`,
          },
        ],
        ...(book.publicationYear && {
          publishedTime: new Date(book.publicationYear, 0, 1).toISOString(),
        }),
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description: fullDescription.length > 200 
          ? fullDescription.substring(0, 197) + "..." 
          : fullDescription,
        images: {
          url: coverImage,
          alt: `${book.title}${book.syriacTitle ? ` (${book.syriacTitle})` : ""} cover`,
        },
      },
      alternates: {
        canonical: `https://hudra.day/books/${bookId}`,
      },
      other: {
        ...(book.publicationYear && {
          "book:release_date": book.publicationYear.toString(),
          "article:published_time": new Date(book.publicationYear, 0, 1).toISOString(),
        }),
        ...(book.isbn && { "book:isbn": book.isbn }),
        ...(book.publisher && { "book:publisher": book.publisher }),
        ...(book.category && { "article:section": book.category }),
      },
    };
  } catch (error) {
    console.error("Error generating metadata for book:", error);
    return {
      title: "Book Details",
      description: "View book details and content.",
    };
  }
}

// Server component that fetches book data at build time
export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  try {
    const { bookId } = await params;
    const bookDoc = await bookService.getBookById(bookId);

    if (!bookDoc.exists()) {
      notFound();
    }

    const bookData = bookDoc.data() as Book & {
      createdAt: { toDate: () => Date };
      updatedAt: { toDate: () => Date };
    };
    const book: Book = {
      ...bookData,
      id: bookDoc.id,
      createdAt: bookData.createdAt?.toDate?.() || new Date(),
      updatedAt: bookData.updatedAt?.toDate?.() || new Date(),
      private: bookData.private ?? false, // Default to public if not set
      protected: bookData.protected ?? false, // Default to not protected if not set
    };

    // Fetch comments for server-side rendering
    let comments: Comment[] = [];
    try {
      const commentsSnapshot = await commentService.getCommentsByResource(
        "book",
        bookId,
        false // Only get approved comments for static rendering
      );
      comments = commentsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
        } as Comment;
      });
    } catch (error) {
      console.error("Error fetching comments for book:", error);
      // Continue without comments if fetch fails
    }

    // Note: Server-side access control is handled by the BookViewer component
    // since we need access to the user's authentication state
    return (
      <>
        <Suspense>
          <BookViewer initialBook={book} hideComments={true} />
        </Suspense>
        {/* Static comments section with interactive form */}
        <div className="container mx-auto px-4 max-w-7xl mb-8">
          <CommentsSectionWithStatic 
            resourceType="book" 
            resourceId={bookId} 
            initialComments={comments}
          />
        </div>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error fetching book data:", error);

    // Check if this is likely an offline/authentication error
    const errorMessage = error instanceof Error ? error.message : String(error);
    const isOfflineError =
      errorMessage.includes("permission") ||
      errorMessage.includes("unauthenticated") ||
      errorMessage.includes("auth") ||
      errorMessage.includes("network");

    if (isOfflineError) {
      // Return a component that will handle offline viewing
      return (
        <Suspense>
          <BookViewer initialBook={undefined} />
        </Suspense>
      );
    }

    notFound();
  }
}
