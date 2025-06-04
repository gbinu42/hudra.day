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
import { Separator } from "@/components/ui/separator";
import {
  Church,
  BookOpen,
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  Languages,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// This would typically come from a database or API
const categoryData = {
  "syro-malabar": {
    name: "Syro-Malabar Church",
    categories: {
      liturgy: {
        name: "Liturgical Texts",
        description:
          "Complete liturgical services including Qurbana Taksa and sacramental rites",
        texts: [
          {
            slug: "qurbana-taksa",
            title: "Qurbana Taksa",
            description:
              "The complete order of the Holy Qurbana (Eucharistic liturgy)",
            language: "Syriac",
            translation: "Malayalam",
            date: "Traditional",
            status: "coming-soon",
          },
          {
            slug: "ordination-rites",
            title: "Ordination Rites",
            description:
              "Liturgical texts for ordination of deacons, priests, and bishops",
            language: "Syriac",
            translation: "Malayalam",
            date: "Traditional",
            status: "coming-soon",
          },
        ],
      },
      prayers: {
        name: "Prayers",
        description: "Daily prayers, devotional texts, and seasonal prayers",
        texts: [
          {
            slug: "daily-prayers",
            title: "Daily Prayers",
            description:
              "Morning, evening, and night prayers for daily devotion",
            language: "Malayalam",
            translation: "English",
            date: "Traditional",
            status: "coming-soon",
          },
        ],
      },
      hymns: {
        name: "Hymns & Chants",
        description: "Traditional liturgical hymns and musical texts",
        texts: [],
      },
      breviary: {
        name: "Breviary",
        description: "Divine Office prayers for different times of day",
        texts: [],
      },
    },
  },
  assyrian: {
    name: "Assyrian Church of the East",
    categories: {
      liturgy: {
        name: "Liturgical Texts",
        description:
          "Ancient East Syriac liturgical traditions and Qurbana services",
        texts: [],
      },
      prayers: {
        name: "Prayers",
        description: "Traditional prayers and devotional texts",
        texts: [],
      },
      hymns: {
        name: "Hymns & Chants",
        description: "Classical Syriac hymns and liturgical chants",
        texts: [],
      },
      breviary: {
        name: "Breviary",
        description: "Canonical hours and seasonal prayers",
        texts: [],
      },
    },
  },
  chaldean: {
    name: "Chaldean Catholic Church",
    categories: {
      liturgy: {
        name: "Liturgical Texts",
        description: "East Syriac liturgical texts in communion with Rome",
        texts: [],
      },
      prayers: {
        name: "Prayers",
        description: "Prayer texts and devotional materials",
        texts: [],
      },
      hymns: {
        name: "Hymns & Chants",
        description: "Liturgical hymns and traditional chants",
        texts: [],
      },
      breviary: {
        name: "Breviary",
        description: "Divine Office and canonical prayers",
        texts: [],
      },
    },
  },
};

export default function CategoryPage() {
  const params = useParams();
  const churchSlug = params.church as string;
  const categorySlug = params.category as string;

  const churchData = categoryData[churchSlug as keyof typeof categoryData];
  if (!churchData) {
    notFound();
  }

  const category =
    churchData.categories[categorySlug as keyof typeof churchData.categories];
  if (!category) {
    notFound();
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            Available
          </Badge>
        );
      case "coming-soon":
        return <Badge variant="secondary">Coming Soon</Badge>;
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
            In Progress
          </Badge>
        );
      default:
        return <Badge variant="outline">Status Unknown</Badge>;
    }
  };

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
                  <Link href={`/texts/${churchSlug}`}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to {churchData.name}
                  </Link>
                </Button>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold">{category.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{churchData.name}</span>
                    <span>•</span>
                    <span>{category.texts.length} texts</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground max-w-3xl">
                {category.description}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search Texts
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
        {category.texts.length > 0 ? (
          <section>
            <div className="grid gap-6">
              {category.texts.map((text) => (
                <Card
                  key={text.slug}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-xl">
                            {text.title}
                          </CardTitle>
                          {getStatusBadge(text.status)}
                        </div>
                        <CardDescription className="text-base">
                          {text.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Languages className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Original Language</p>
                            <p className="text-muted-foreground">
                              {text.language}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Languages className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Translation</p>
                            <p className="text-muted-foreground">
                              {text.translation}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Period</p>
                            <p className="text-muted-foreground">{text.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Church className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Tradition</p>
                            <p className="text-muted-foreground">
                              {churchData.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {text.status === "available" ? (
                            <>
                              <Button asChild>
                                <Link
                                  href={`/texts/${churchSlug}/${categorySlug}/${text.slug}`}
                                >
                                  <BookOpen className="h-4 w-4 mr-2" />
                                  Read Text
                                </Link>
                              </Button>
                              <Button variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </>
                          ) : (
                            <Button disabled>
                              <BookOpen className="h-4 w-4 mr-2" />
                              Coming Soon
                            </Button>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ) : (
          <section>
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No Texts Available Yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  We&apos;re actively working on digitizing{" "}
                  {category.name.toLowerCase()} from the {churchData.name}. New
                  content will be available soon.
                </p>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" asChild>
                    <Link href="/contact">Get Updates on Progress</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/texts/${churchSlug}`}>
                      Browse Other Categories
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
