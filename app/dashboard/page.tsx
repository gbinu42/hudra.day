import { Metadata } from "next";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleDashboard } from "@/components/RoleDashboard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dashboard - Manage Your Hudra Account",
  description:
    "Access your personalized Hudra.day dashboard to manage your account, view your contributions to the East Syriac liturgical texts archive, and access role-based features.",
  keywords: [
    "Hudra dashboard",
    "user account",
    "personal dashboard",
    "account management",
    "East Syriac texts",
    "liturgical texts management",
    "user profile",
  ],
  openGraph: {
    title: "Dashboard - Manage Your Hudra Account",
    description:
      "Access your personalized dashboard to manage your account and contributions to the East Syriac liturgical texts archive.",
    url: "https://hudra.day/dashboard",
    images: [
      {
        url: "https://hudra.day/images/sliwa.png",
        width: 1200,
        height: 630,
        alt: "Hudra Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Dashboard - Manage Your Hudra Account",
    description:
      "Access your personalized dashboard to manage your account and contributions.",
  },
  robots: {
    index: false, // Don't index user dashboards
    follow: true,
  },
  alternates: {
    canonical: "https://hudra.day/dashboard",
  },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <ProtectedRoute requireAuth={true}>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Your Dashboard
            </h1>
            <p className="text-muted-foreground">
              Personalized experience based on your role and permissions
            </p>
          </div>
          <RoleDashboard />
        </ProtectedRoute>
      </div>
      <Footer />
    </div>
  );
}
