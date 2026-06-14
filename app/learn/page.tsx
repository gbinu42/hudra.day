import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Users, MessageCircle, BookOpen } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Learn East Syriac – 13th Batch | Hudra.day",
  description:
    "Join the 13th batch of the Learn East Syriac program - a foundational literacy course starting July 5, 2026. Register before June 14, 2026.",
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

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto space-y-8">

          {/* Main announcement card */}
          <Card className="shadow-lg border-primary/20 overflow-hidden">
            {/* Coloured top strip */}
            <div className="h-2 bg-gradient-to-r from-primary to-primary/60" />

            <CardContent className="pt-8 pb-8 space-y-8">

              {/* Batch badge + intro */}
              <div className="text-center space-y-3">
                <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full">
                  13th Batch
                </span>
                <h2 className="text-xl md:text-2xl font-bold">
                  Learn East Syriac Program
                </h2>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <Image
                    src="/images/nas_found_logo.jpg"
                    alt="Nasrani Foundation"
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                  <span className="text-sm text-muted-foreground">by Nasrani Foundation</span>
                </div>
                <p className="text-muted-foreground">
                  By the mercy of the Lord, we are pleased to announce the{" "}
                  <strong>13th batch</strong> of the{" "}
                  <strong>Learn East Syriac</strong> program - a basic course
                  designed to provide foundational literacy in East Syriac.
                </p>
              </div>

              {/* Key details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-primary/5 rounded-xl p-4">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Classes Commence</p>
                    <p className="text-muted-foreground text-sm">
                      Sunday following Dukhrana
                    </p>
                    <p className="font-bold text-primary">5th July 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-primary/5 rounded-xl p-4">
                  <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Duration</p>
                    <p className="text-muted-foreground text-sm">One year · ~40 hours total</p>
                    <p className="font-bold text-primary">1 class per week</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-primary/5 rounded-xl p-4">
                  <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Level</p>
                    <p className="text-muted-foreground text-sm">
                      Beginner-friendly
                    </p>
                    <p className="font-bold text-primary">Foundational literacy</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-red-50 rounded-xl p-4 border border-red-100">
                  <Users className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-red-700">Registration Deadline</p>
                    <p className="text-muted-foreground text-sm">Last date to register</p>
                    <p className="font-bold text-red-600">June 14, 2026</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-primary/20" />

              {/* WhatsApp CTA */}
              <div className="rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] p-5 space-y-4 text-center">
                <p className="text-sm text-gray-600">
                  Those interested in joining are kindly requested to join the
                  aspirants&apos; WhatsApp group. All further communication will
                  take place there.
                </p>
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#1fbc5a] active:bg-[#18a34a] text-white font-bold gap-2.5 rounded-xl shadow-md text-base py-6"
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

          {/* Footer note */}
          <p className="text-center text-sm text-muted-foreground">
            For any queries, please reach out through the WhatsApp group.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
