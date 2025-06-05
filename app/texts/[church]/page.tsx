import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Church, BookOpen, ArrowLeft, Search, Filter } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { churchData, ChurchSlug } from "@/app/data/texts";

type PageParams = {
  church: ChurchSlug;
};

type Props = {
  params: Promise<PageParams>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  return Object.keys(churchData).map((church) => ({
    church,
  }));
}

export default async function ChurchPage({ params }: Props) {
  const resolvedParams = await params;
  const { church } = resolvedParams;
  const churchInfo = churchData[church];

  if (!churchInfo) {
    notFound();
  }

  const totalTexts = churchInfo.categories.reduce(
    (sum, category) => sum + category.textCount,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-white">
      <Navbar />

      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/texts">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to All Texts
                  </Link>
                </Button>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <Church className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold">{churchInfo.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{churchInfo.language}</span>
                    <span>•</span>
                    <span>{churchInfo.region}</span>
                    <span>•</span>
                    <span>{totalTexts} texts available</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground max-w-3xl">
                {churchInfo.description}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search in {churchInfo.name}
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {churchInfo.categories.map((category) => (
              <Link
                key={category.slug}
                href={`/texts/${church}/${category.slug}`}
                className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="text-sm text-gray-500">
                  {category.textCount} texts available
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Access - Recently Added or Featured Texts */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Texts Being Digitized
              </h3>
              <p className="text-muted-foreground mb-6">
                We&apos;re actively working on digitizing and uploading{" "}
                {churchInfo.name} liturgical texts. New content will be
                available soon.
              </p>
              <Button variant="outline" asChild>
                <Link href="/contact">Get Updates on Progress</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
