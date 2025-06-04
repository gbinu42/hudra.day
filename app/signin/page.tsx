"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function SignInPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

      {/* Sign In Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Hudra Logo"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
              </div>
              <CardTitle className="text-2xl">
                Welcome back to{" "}
                <span className="font-syriac text-primary">ܚܘܼܕܪܵܐ</span>
              </CardTitle>
              <CardDescription className="text-base">
                Sign in to contribute to hudra.day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mounted ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Authentication will be available once the application is
                      fully loaded.
                    </p>
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={() => window.location.reload()}
                    >
                      Load Authentication
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <span className="text-sm">Initializing...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Link to Register */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Create one here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p className="mb-2">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
            <p>
              Need help?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
