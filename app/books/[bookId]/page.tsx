import { bookService } from "@/lib/firebase-services";
import BookViewer from "@/components/BookViewer";

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

// Server component that renders the client component
export default function BookDetailPage() {
  return <BookViewer />;
}
