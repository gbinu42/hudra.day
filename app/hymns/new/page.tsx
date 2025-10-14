"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/hooks/useAuth";
import HymnForm from "@/components/hymns/HymnForm";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Music, Plus } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function NewHymnPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for auth to load

    if (!user) {
      router.push("/signin");
      return;
    }

    if (
      userProfile &&
      userProfile.role !== "editor" &&
      userProfile.role !== "admin"
    ) {
      router.push("/hymns");
    }
  }, [user, userProfile, router, loading]);

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Loading...</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (userProfile.role !== "editor" && userProfile.role !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                      <Home className="h-4 w-4" />
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/hymns">
                      <Music className="h-4 w-4" />
                      Hymns
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Access Denied</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <Card>
              <CardContent className="py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                <p className="text-muted-foreground mb-6">
                  You don&apos;t have permission to add hymns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSuccess = (hymnId: string) => {
    router.push(`/hymns/${hymnId}`);
  };

  const handleCancel = () => {
    router.push("/hymns");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/hymns">
                    <Music className="h-4 w-4" />
                    Hymns
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="flex items-center gap-1.5">
                    <Plus className="h-4 w-4" />
                    Add Hymn
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <h1 className="text-3xl font-bold mb-8">Add New Hymn</h1>
          <HymnForm
            userId={user.uid}
            userName={userProfile.displayName || user.email || "Anonymous"}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
