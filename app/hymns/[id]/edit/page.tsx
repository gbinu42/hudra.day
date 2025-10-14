import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HymnEditClient from "@/components/hymns/HymnEditClient";
import { hymnService } from "@/lib/hymn-services";

// Pre-generate static pages for all hymn edit pages at build time
export async function generateStaticParams() {
  try {
    const hymnsSnapshot = await hymnService.getAllHymns();
    return hymnsSnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (error) {
    console.error("Error generating static params for hymn edits:", error);
    return [];
  }
}

export default async function EditHymnPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HymnEditClient hymnId={id} />
      <Footer />
    </div>
  );
}
