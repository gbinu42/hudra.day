"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Church, BookOpen, ArrowLeft, Search, Filter } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// This would typically come from a database or API
const churchData = {
  "syro-malabar": {
    name: "Syro-Malabar Church",
    description:
      "One of the oldest Christian communities in the world, tracing its origins to St. Thomas the Apostle in India. Rich tradition of liturgical manuscripts and theological works.",
    language: "Malayalam & Syriac",
    region: "India (Kerala)",
    categories: [
      {
        slug: "liturgy",
        name: "Liturgical Texts",
        description:
          "Complete liturgical services including Qurbana Taksa and sacramental rites",
        textCount: 0,
        texts: [],
      },
      {
        slug: "prayers",
        name: "Prayers",
        description: "Daily prayers, devotional texts, and seasonal prayers",
        textCount: 0,
        texts: [],
      },
      {
        slug: "hymns",
        name: "Hymns & Chants",
        description: "Traditional liturgical hymns and musical texts",
        textCount: 0,
        texts: [],
      },
      {
        slug: "breviary",
        name: "Breviary",
        description: "Divine Office prayers for different times of day",
        textCount: 0,
        texts: [],
      },
    ],
  },
  assyrian: {
    name: "Assyrian Church of the East",
    description:
      "Ancient apostolic church with headquarters in Erbil, Iraq. Preserves the original East Syriac liturgical tradition and extensive manuscript collections.",
    language: "Syriac & Aramaic",
    region: "Iraq, Iran, Syria",
    categories: [
      {
        slug: "liturgy",
        name: "Liturgical Texts",
        description:
          "Ancient East Syriac liturgical traditions and Qurbana services",
        textCount: 0,
        texts: [],
      },
      {
        slug: "prayers",
        name: "Prayers",
        description: "Traditional prayers and devotional texts",
        textCount: 0,
        texts: [],
      },
      {
        slug: "hymns",
        name: "Hymns & Chants",
        description: "Classical Syriac hymns and liturgical chants",
        textCount: 0,
        texts: [],
      },
      {
        slug: "breviary",
        name: "Breviary",
        description: "Canonical hours and seasonal prayers",
        textCount: 0,
        texts: [],
      },
    ],
  },
  chaldean: {
    name: "Chaldean Catholic Church",
    description:
      "Eastern Catholic church in full communion with Rome, maintaining East Syriac traditions. Significant manuscript heritage from Mesopotamia and beyond.",
    language: "Syriac & Arabic",
    region: "Iraq, Iran, Syria, Lebanon",
    categories: [
      {
        slug: "liturgy",
        name: "Liturgical Texts",
        description: "East Syriac liturgical texts in communion with Rome",
        textCount: 0,
        texts: [],
      },
      {
        slug: "prayers",
        name: "Prayers",
        description: "Prayer texts and devotional materials",
        textCount: 0,
        texts: [],
      },
      {
        slug: "hymns",
        name: "Hymns & Chants",
        description: "Liturgical hymns and traditional chants",
        textCount: 0,
        texts: [],
      },
      {
        slug: "breviary",
        name: "Breviary",
        description: "Divine Office and canonical prayers",
        textCount: 0,
        texts: [],
      },
    ],
  },
};

export default function ChurchPage() {
  const params = useParams();
  const churchSlug = params.church as string;
  const church = churchData[churchSlug as keyof typeof churchData];

  if (!church) {
    notFound();
  }

  const totalTexts = church.categories.reduce(
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
                  <h1 className="text-3xl font-bold">{church.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{church.language}</span>
                    <span>•</span>
                    <span>{church.region}</span>
                    <span>•</span>
                    <span>{totalTexts} texts available</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground max-w-3xl">
                {church.description}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search in {church.name}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {church.categories.map((category) => (
              <Card
                key={category.slug}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <Badge variant="secondary">
                      {category.textCount} texts
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={`/texts/${churchSlug}/${category.slug}`}>
                      Browse {category.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
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
                {church.name} liturgical texts. New content will be available
                soon.
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
