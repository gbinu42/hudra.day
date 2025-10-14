import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PersonEditClient from "@/components/persons/PersonEditClient";
import { personService } from "@/lib/hymn-services";

// Pre-generate static pages for all person edit pages at build time
export async function generateStaticParams() {
  try {
    const personsSnapshot = await personService.getAllPersons();
    return personsSnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (error) {
    console.error("Error generating static params for person edits:", error);
    return [];
  }
}

export default async function EditPersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PersonEditClient personId={id} />
      <Footer />
    </div>
  );
}
