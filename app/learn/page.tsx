import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Users, MessageCircle, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Learn East Syriac – 13th Batch | Hudra.day",
  description:
    "Join the 13th batch of the Learn East Syriac program — a foundational literacy course starting July 5, 2026. Register before June 14, 2026.",
  keywords: [
    "Learn East Syriac",
    "Syriac language course",
    "East Syriac literacy",
    "Hendo Academy",
    "Church of the East",
    "Syriac beginner course",
  ],
  openGraph: {
    title: "Learn East Syriac – 13th Batch | Hudra.day",
    description:
      "A foundational East Syriac literacy course. Classes begin July 5, 2026. Register by June 14, 2026.",
    url: "https://hudra.day/learn",
    images: [
      {
        url: "https://hudra.day/images/sliwa.png",
        width: 1200,
        height: 630,
        alt: "Learn East Syriac – Hudra.day",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn East Syriac – 13th Batch | Hudra.day",
    description:
      "A foundational East Syriac literacy course. Classes begin July 5, 2026. Register by June 14, 2026.",
    images: ["https://hudra.day/images/sliwa.png"],
  },
  alternates: {
    canonical: "https://hudra.day/learn",
  },
};

export const revalidate = false;

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-white">
      <Navbar />

      <main className="container mx-auto px-4 py-14 md:py-20">
        <div className="max-w-xl mx-auto space-y-6">

          {/* Blessing */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">
              Praise be to Lord our God
            </h1>
          </div>

          {/* Main card */}
          <Card className="shadow-xl border-0 overflow-hidden rounded-2xl">
            <div className="h-1.5 bg-gradient-to-r from-primary via-primary/70 to-primary/40" />

            <CardContent className="py-8 px-6 space-y-7">

              {/* Title */}
              <div className="text-center space-y-2">
                <span                   className="inline-block bg-primary/10 text-primary font-semibold text-xs px-4 py-1.5 rounded-full tracking-wide uppercase">
                  13th Batch
                </span>
                <h2 className="text-xl font-bold text-gray-900">
                  Learn East Syriac Program
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  By the mercy of the Lord, we are pleased to announce a basic
                  course designed to provide foundational literacy in East Syriac.
                </p>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-3 bg-primary/5 rounded-xl p-4">
                  <Calendar className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Starts</p>
                    <p className="text-xs text-muted-foreground">Sunday after Dukhrana</p>
                    <p className="text-sm font-bold text-primary mt-0.5">5 July 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-primary/5 rounded-xl p-4">
                  <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Duration</p>
                    <p className="text-xs text-muted-foreground">~40 hours total</p>
                    <p className="text-sm font-bold text-primary mt-0.5">1 class / week</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-primary/5 rounded-xl p-4">
                  <BookOpen className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Level</p>
                    <p className="text-xs text-muted-foreground">No prior knowledge needed</p>
                    <p className="text-sm font-bold text-primary mt-0.5">Beginner</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-red-50 rounded-xl p-4 border border-red-100">
                  <Users className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-red-700">Last Date</p>
                    <p className="text-xs text-muted-foreground">Registration deadline</p>
                    <p className="text-sm font-bold text-red-600 mt-0.5">14 June 2026</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200" />

              {/* WhatsApp CTA */}
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Join the aspirants&apos; WhatsApp group to register. All
                  further communication will take place there.
                </p>
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#1fbc5a] text-white font-semibold gap-2 rounded-xl shadow-md text-base"
                  asChild
                >
                  <a
                    href="https://chat.whatsapp.com/HrqUZQNV5C0BfWEgoZyysm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Join the WhatsApp Group
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Last date to join:{" "}
                  <span className="font-semibold text-red-600">14 June 2026</span>
                </p>
              </div>

            </CardContent>
          </Card>

        </div>
      </main>

      <Footer />
    </div>
  );
}
