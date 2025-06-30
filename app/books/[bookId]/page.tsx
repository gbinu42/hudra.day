import { bookService } from "@/lib/firebase-services";
import BookViewer from "@/components/BookViewer";
import { Metadata } from "next";
import { Book } from "@/lib/types/book";
import { Suspense } from "react";

// Server-side function to generate static params
export async function generateStaticParams() {
  try {
    const booksSnapshot = await bookService.getAllBooks();
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

// Server component that renders the client component
export default function BookDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookViewer />
    </Suspense>
  );
}
