import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TermsPage() {
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
                Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-lg text-muted-foreground text-center mb-8">
                Last updated: January 2025
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Hudra.day, you accept and agree to be
                bound by the terms and provision of this agreement.
              </p>

              <h2>2. Use License</h2>
              <p>
                Permission is granted to temporarily access the materials on
                Hudra.day for personal, non-commercial transitory viewing only.
                This is the grant of a license, not a transfer of title.
              </p>

              <h2>3. Disclaimer</h2>
              <p>
                The materials on Hudra.day are provided on an 'as is' basis.
                Hendo Academy makes no warranties, expressed or implied, and
                hereby disclaims and negates all other warranties including
                without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of
                rights.
              </p>

              <h2>4. Limitations</h2>
              <p>
                In no event shall Hendo Academy or its suppliers be liable for
                any damages (including, without limitation, damages for loss of
                data or profit, or due to business interruption) arising out of
                the use or inability to use the materials on Hudra.day.
              </p>

              <h2>5. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please
                contact us through our contact page.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
