import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BooksList from "@/components/BooksList";
import { AddBookDialogWrapper } from "@/components/AddBookDialogWrapper";

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Syriac Library
              </h1>
              <p className="text-muted-foreground">
                Explore our collection of Syriac texts and manuscripts
              </p>
            </div>
            <AddBookDialogWrapper />
          </div>
          <Separator />
        </div>

        <BooksList />
      </div>
      <Footer />
    </div>
  );
}
