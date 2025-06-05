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
  Download,
  Share2,
  Printer,
  Languages,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  textData,
  ChurchSlug,
  CategorySlug,
  TextSlug,
  Text,
  TextStatus,
} from "@/app/data/texts";

type PageParams = {
  church: ChurchSlug;
  category: CategorySlug;
  text: TextSlug;
};

type Props = {
  params: Promise<PageParams>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function generateStaticParams(): PageParams[] {
  const params: PageParams[] = [];
  for (const churchSlug in textData) {
    const church = textData[churchSlug as ChurchSlug];
    for (const categorySlug in church) {
      const category = church[categorySlug as CategorySlug];
      for (const textSlug in category) {
        params.push({
          church: churchSlug as ChurchSlug,
          category: categorySlug as CategorySlug,
          text: textSlug as TextSlug,
        });
      }
    }
  }
  return params;
}

export default async function TextPage({ params }: Props) {
  const resolvedParams = await params;
  const {
    church: churchSlug,
    category: categorySlug,
    text: textSlug,
  } = resolvedParams;

  const churchData = textData[churchSlug];
  if (!churchData) {
    notFound();
  }

  const categoryData = churchData[categorySlug];
  if (!categoryData) {
    notFound();
  }

  const text = categoryData[textSlug] as Text;
  if (!text) {
    notFound();
  }

  const getStatusBadge = (status: TextStatus) => {
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
                  <Link href={`/texts/${churchSlug}/${categorySlug}`}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Category
                  </Link>
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-bold">{text.title}</h1>
                  {getStatusBadge(text.status)}
                </div>
                <p className="text-xl text-muted-foreground">{text.subtitle}</p>
                <p className="text-muted-foreground max-w-3xl">
                  {text.description}
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={text.status !== "available"}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={text.status !== "available"}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={text.status !== "available"}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar with metadata */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Text Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Languages className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Original Language</p>
                      <p className="text-muted-foreground">
                        {text.originalLanguage}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Languages className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Available Languages</p>
                      <p className="text-muted-foreground">
                        {text.language}, {text.translation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Period</p>
                      <p className="text-muted-foreground">{text.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Author</p>
                      <p className="text-muted-foreground">{text.author}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Source</p>
                      <p className="text-muted-foreground">{text.source}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Church className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Tradition</p>
                      <p className="text-muted-foreground">
                        {churchSlug === "syro-malabar" && "Syro-Malabar Church"}
                        {churchSlug === "assyrian" &&
                          "Assyrian Church of the East"}
                        {churchSlug === "chaldean" &&
                          "Chaldean Catholic Church"}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Actions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sm"
                      disabled={text.status !== "available"}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sm"
                      disabled={text.status !== "available"}
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print Version
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sm"
                      disabled={text.status !== "available"}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Text
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-3">
            {text.status === "available" && text.content ? (
              <Card>
                <CardHeader>
                  <CardTitle>Text Content</CardTitle>
                  <CardDescription>
                    Original text with translation
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  {/* This would contain the actual text content */}
                  <div dangerouslySetInnerHTML={{ __html: text.content }} />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                  <h3 className="text-2xl font-semibold mb-4">
                    Text Coming Soon
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                    We&apos;re currently digitizing and preparing &quot;
                    {text.title}&quot; for publication. This text will be
                    available as part of our ongoing effort to preserve and
                    share the liturgical heritage of the Church of the East.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      What to expect:
                    </h4>
                    <ul className="text-blue-800 text-sm space-y-1 text-left">
                      <li>
                        • Complete {text.originalLanguage} text with scholarly
                        annotations
                      </li>
                      <li>
                        • {text.translation} translation for accessibility
                      </li>
                      <li>• Historical context and liturgical notes</li>
                      <li>• Downloadable PDF format</li>
                      <li>• Mobile-friendly reading experience</li>
                    </ul>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" asChild>
                      <Link href="/contact">Get Notified When Available</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/texts/${churchSlug}/${categorySlug}`}>
                        Browse Other Texts
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
