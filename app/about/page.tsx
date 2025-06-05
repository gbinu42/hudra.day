import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Globe, Users, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

// Enable SSG for this page
export const revalidate = false;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Hudra Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-3xl font-syriac">ܚܘܼܕܪܵܐ</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                About Hudra.day
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-lg text-muted-foreground text-center mb-8">
                Preserving and sharing the liturgical heritage of the Church of
                the East
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <BookOpen className="h-6 w-6 mr-2 text-primary" />
                    Our Mission
                  </h2>
                  <p className="text-muted-foreground">
                    Hudra.day is dedicated to digitizing, preserving, and making
                    freely available the rich liturgical tradition of the Church
                    of the East. Our mission is to ensure that these sacred
                    texts remain accessible to scholars, clergy, and communities
                    worldwide for generations to come.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <Globe className="h-6 w-6 mr-2 text-primary" />
                    What is Hudra?
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    The Hudra (ܚܘܼܕܪܵܐ) is the East Syriac Breviary, containing
                    the liturgical prayers, hymns, and readings used in the
                    daily worship of the Church of the East tradition. This
                    includes the liturgical heritage of:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Assyrian Church of the East</li>
                    <li>Chaldean Catholic Church</li>
                    <li>Syro-Malabar Church</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <Users className="h-6 w-6 mr-2 text-primary" />
                    Hendo Academy
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Hudra.day is an initiative by Hendo Academy, an educational
                    organization committed to preserving and promoting Eastern
                    Christian heritage through innovative digital solutions.
                  </p>
                  <Button variant="outline" asChild>
                    <a
                      href="https://www.hendoacademy.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more about Hendo Academy
                    </a>
                  </Button>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <Heart className="h-6 w-6 mr-2 text-primary" />
                    Our Commitment
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-primary/5 p-6 rounded-lg">
                      <h3 className="font-semibold mb-2">Free Access</h3>
                      <p className="text-sm text-muted-foreground">
                        All liturgical texts and tools on Hudra.day are provided
                        free of charge to ensure universal access to these
                        sacred resources.
                      </p>
                    </div>
                    <div className="bg-primary/5 p-6 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        Scholarly Standards
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        We maintain the highest standards of accuracy and
                        authenticity in our digitization and transcription
                        processes.
                      </p>
                    </div>
                    <div className="bg-primary/5 p-6 rounded-lg">
                      <h3 className="font-semibold mb-2">Community Driven</h3>
                      <p className="text-sm text-muted-foreground">
                        Our work is supported by scholars, clergy, and community
                        members who share our vision of preserving this
                        heritage.
                      </p>
                    </div>
                    <div className="bg-primary/5 p-6 rounded-lg">
                      <h3 className="font-semibold mb-2">Open Source</h3>
                      <p className="text-sm text-muted-foreground">
                        We believe in transparency and collaboration, making our
                        tools and methodologies available to the broader
                        community.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="text-center bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4">Get Involved</h3>
                  <p className="text-muted-foreground mb-6">
                    Whether you&apos;re a scholar, clergy member, developer, or
                    simply someone passionate about preserving Eastern Christian
                    heritage, there are many ways to contribute to our mission.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/type">Try Our Editor</Link>
                    </Button>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
