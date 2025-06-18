import SyriacEditor from "@/components/SyriacEditor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            East Syriac + Karshon Rich Text Editor
          </h1>
        </div>
        <SyriacEditor />
      </div>
      <Footer />
    </div>
  );
}
