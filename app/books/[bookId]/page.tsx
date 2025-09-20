import { bookService } from "@/lib/firebase-services";
import BookViewer from "@/components/BookViewer";
import { Metadata } from "next";
import { Book } from "@/lib/types/book";
import { Suspense } from "react";
import { notFound } from "next/navigation";

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

    // Create SEO-friendly title and description
    const title = book.syriacTitle
      ? `${book.title} (${book.syriacTitle}) by ${book.author}`
      : `${book.title} by ${book.author}`;
    const description =
      book.description ||
      `Read ${book.title}${
        book.syriacTitle ? ` (${book.syriacTitle})` : ""
      } by ${book.author}. ${book.category} book in ${book.language}.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        ...(book.coverImage && { images: [book.coverImage] }),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(book.coverImage && { images: [book.coverImage] }),
      },
      keywords: [
        book.title,
        book.author,
        book.category,
        book.language,
        ...(book.tags || []),
        ...(book.publisher ? [book.publisher] : []),
      ].join(", "),
      authors: [{ name: book.author }],
      alternates: {
        canonical: `https://hudra.day/books/${bookId}`,
      },
      ...(book.publicationYear && {
        other: {
          "book:publication_date": book.publicationYear.toString(),
          ...(book.isbn && { "book:isbn": book.isbn }),
          ...(book.publisher && { "book:publisher": book.publisher }),
        },
      }),
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
    };

    // Note: Server-side access control is handled by the BookViewer component
    // since we need access to the user's authentication state
    return (
      <Suspense>
        <BookViewer initialBook={book} />
      </Suspense>
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
