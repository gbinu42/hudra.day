import { ProtectedRoute } from "@/components/ProtectedRoute";
import CommentsModeration from "@/components/admin/CommentsModeration";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AdminCommentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <ProtectedRoute requiredRole="admin">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin Panel
              </Button>
            </Link>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Comments Moderation
              </h1>
              <p className="text-muted-foreground">
                Review and moderate user comments across all resources
              </p>
            </div>
          </div>

          {/* Moderation Component */}
          <CommentsModeration />
        </ProtectedRoute>
      </div>
      <Footer />
    </div>
  );
}

