import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Footer from "@/components/Footer";

// Enable SSG for this page
export const revalidate = false;

export const metadata: Metadata = {
  title: "East Syriac Editor - Hudra.day",
  description: "Online East Syriac text editor for liturgical texts",
  // Add a meta refresh to redirect to the editor
  other: {
    refresh: "0; url=/editor",
  },
};

export default function TypePage() {
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
        <div className="max-w-md mx-auto text-center">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">East Syriac Editor</h1>
            <p className="text-muted-foreground">
              You are being redirected to the East Syriac text editor...
            </p>
            <div className="space-y-4">
              <Button size="lg" asChild>
                <Link href="/type.html">Go to Editor</Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                If you are not redirected automatically, click the button above.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
