import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HymnDetailClient from "@/components/hymns/HymnDetailClient";
import { hymnService } from "@/lib/hymn-services";

// Pre-generate static pages for all hymns at build time
export async function generateStaticParams() {
  try {
    const hymnsSnapshot = await hymnService.getAllHymns();
    return hymnsSnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (error) {
    console.error("Error generating static params for hymns:", error);
    return [];
  }
}

export default async function HymnDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HymnDetailClient hymnId={id} />
      <Footer />
    </div>
  );
}
