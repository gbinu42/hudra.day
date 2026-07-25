"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import ReshQalaManager from "@/components/admin/ReshQalaManager";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AdminReshQalePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ProtectedRoute requiredRole="admin">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h1 className="text-xl font-semibold text-foreground">Resh Qale</h1>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Admin
              </Link>
            </Button>
          </div>

          <ReshQalaManager />
        </ProtectedRoute>
      </div>
      <Footer />
    </div>
  );
}
