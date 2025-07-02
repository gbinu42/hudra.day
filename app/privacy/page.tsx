import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy - Hudra.day Data Protection",
  description:
    "Learn how Hudra.day protects your privacy and handles your personal information. Our commitment to data security and transparency in preserving East Syriac liturgical texts.",
  keywords: [
    "Hudra privacy policy",
    "data protection",
    "privacy rights",
    "personal information",
    "data security",
    "Hendo Academy privacy",
    "liturgical texts privacy",
  ],
  openGraph: {
    title: "Privacy Policy - Hudra.day Data Protection",
    description:
      "Learn how Hudra.day protects your privacy and handles your personal information with transparency and security.",
    url: "https://hudra.day/privacy",
    images: [
      {
        url: "https://hudra.day/images/sliwa.png",
        width: 1200,
        height: 630,
        alt: "Hudra.day Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy - Hudra.day Data Protection",
    description:
      "Learn how Hudra.day protects your privacy and handles your personal information.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://hudra.day/privacy",
  },
};

// Enable SSG for this page
export const revalidate = false;

export default function PrivacyPage() {
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
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-lg text-muted-foreground text-center mb-8">
                Last updated: January 2025
              </p>

              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when
                you create an account, sign in, or contact us for support.
              </p>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and
                improve our services, process transactions, and communicate with
                you.
              </p>

              <h2>3. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal
                information to outside parties except as described in this
                privacy policy.
              </p>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>

              <h2>5. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal
                information. You may also opt out of certain communications from
                us.
              </p>

              <h2>6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us through our contact page.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
