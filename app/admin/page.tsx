"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { UserManagement } from "@/components/admin/UserManagement";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Music } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <ProtectedRoute requiredRole="admin">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Administration Panel
            </h1>
            <p className="text-muted-foreground">
              Manage users and system settings
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Comments
                </CardTitle>
                <CardDescription>
                  Moderate user comments and feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/comments">
                  <Button className="w-full">
                    Manage Comments
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  Hymns
                </CardTitle>
                <CardDescription>
                  Manage hymns and recordings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/hymns">
                  <Button className="w-full">
                    Manage Hymns
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Users
                </CardTitle>
                <CardDescription>
                  Manage users and roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => {
                  document.getElementById('user-management')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  View Users Below
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* User Management */}
          <div id="user-management">
            <UserManagement />
          </div>
        </ProtectedRoute>
      </div>
      <Footer />
    </div>
  );
}
