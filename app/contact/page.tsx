import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Globe, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact - Get in Touch with Hudra.day Team",
  description:
    "Contact the Hudra.day team for inquiries about East Syriac liturgical texts, collaboration opportunities, or technical support. Part of Hendo Academy's digital preservation initiatives.",
  keywords: [
    "Hudra contact",
    "East Syriac collaboration",
    "liturgical texts inquiry",
    "Hendo Academy contact",
    "Syriac studies collaboration",
    "manuscript digitization",
    "Church of the East contact",
    "technical support",
    "academic collaboration",
    "liturgical research",
  ],
  openGraph: {
    title: "Contact Hudra.day - Get in Touch with Our Team",
    description:
      "Contact us for inquiries about East Syriac liturgical texts, collaboration opportunities, or technical support. We welcome scholars, clergy, and community members.",
    url: "https://hudra.day/contact",
    images: [
      {
        url: "https://hudra.day/images/sliwa.png",
        width: 1200,
        height: 630,
        alt: "Contact Hudra.day Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Hudra.day - Get in Touch with Our Team",
    description:
      "Contact us for inquiries about East Syriac liturgical texts, collaboration opportunities, or technical support.",
    images: ["https://hudra.day/images/sliwa.png"],
  },
  alternates: {
    canonical: "https://hudra.day/contact",
  },
};

// Enable SSG for this page
export const revalidate = false;

export default function ContactPage() {
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
              <CardTitle className="text-3xl text-center">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-lg text-muted-foreground text-center mb-8">
                Get in touch with the Hudra.day team
              </p>

              <div className="grid md:grid-cols-2 gap-8 not-prose">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-primary" />
                      General Inquiries
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      For general questions about the Hudra.day project,
                      technical support, or collaboration opportunities.
                    </p>
                    <Button asChild>
                      <a href="mailto:info@hudra.day">Contact Us via Email</a>
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-primary" />
                      Hendo Academy
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Hudra.day is an initiative by Hendo Academy. Learn more
                      about our other educational projects and research.
                    </p>
                    <Button variant="outline" asChild>
                      <a
                        href="https://www.hendoacademy.org"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Hendo Academy
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-primary" />
                      Contributing
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Interested in contributing liturgical texts, translations,
                      or technical expertise? We&apos;d love to hear from you.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <strong>Liturgical Content:</strong> Scholars and clergy
                        with expertise in East Syriac traditions
                      </p>
                      <p className="text-sm">
                        <strong>Technical:</strong> Developers interested in
                        digital humanities and text preservation
                      </p>
                      <p className="text-sm">
                        <strong>Translation:</strong> Native speakers and
                        linguists
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">Response Time</h4>
                    <p className="text-sm text-muted-foreground">
                      We typically respond to inquiries within 2-3 business
                      days. For urgent matters, please indicate the priority in
                      your subject line.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Join Our Community
                </h3>
                <p className="text-muted-foreground mb-6">
                  Stay updated with the latest developments in the Hudra.day
                  project and connect with other members of our community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline">
                    Newsletter Signup (Coming Soon)
                  </Button>
                  <Button variant="outline">
                    Community Forum (Coming Soon)
                  </Button>
                </div>
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
