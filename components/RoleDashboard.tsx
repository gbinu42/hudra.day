"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { usePermissions } from "@/lib/rbac";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Edit,
  Eye,
  Plus,
  FileEdit,
  Trash2,
  Users,
  Settings,
  BookOpen,
  Lock,
} from "lucide-react";
import Link from "next/link";

export function RoleDashboard() {
  const { userProfile } = useAuth();
  const permissions = usePermissions(userProfile?.role || null);

  if (!userProfile) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Please sign in to view your dashboard.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getRoleIcon = () => {
    switch (userProfile.role) {
      case "admin":
        return <Crown className="h-6 w-6 text-red-600" />;
      case "editor":
        return <Edit className="h-6 w-6 text-blue-600" />;
      case "viewer":
        return <Eye className="h-6 w-6 text-green-600" />;
    }
  };

  const getWelcomeMessage = () => {
    switch (userProfile.role) {
      case "admin":
        return "Welcome to your admin dashboard! You have full system access.";
      case "editor":
        return "Welcome to your editor dashboard! You can create and edit content.";
      case "viewer":
        return "Welcome to your viewer dashboard! You can browse and read content.";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            {getRoleIcon()}
            <span>Welcome, {userProfile.displayName || userProfile.email}</span>
          </CardTitle>
          <CardDescription>{getWelcomeMessage()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-sm">
              Role:{" "}
              {userProfile.role.charAt(0).toUpperCase() +
                userProfile.role.slice(1)}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Status: {userProfile.isActive ? "Active" : "Inactive"}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Member since: {userProfile.createdAt.toLocaleDateString()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Your Permissions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className={`p-3 border rounded-lg ${
                permissions.canRead
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                <BookOpen
                  className={`h-4 w-4 ${
                    permissions.canRead ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm ${
                    permissions.canRead ? "text-green-800" : "text-gray-500"
                  }`}
                >
                  Read
                </span>
              </div>
            </div>
            <div
              className={`p-3 border rounded-lg ${
                permissions.canCreate
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Plus
                  className={`h-4 w-4 ${
                    permissions.canCreate ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm ${
                    permissions.canCreate ? "text-green-800" : "text-gray-500"
                  }`}
                >
                  Create
                </span>
              </div>
            </div>
            <div
              className={`p-3 border rounded-lg ${
                permissions.canEdit
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileEdit
                  className={`h-4 w-4 ${
                    permissions.canEdit ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm ${
                    permissions.canEdit ? "text-green-800" : "text-gray-500"
                  }`}
                >
                  Edit
                </span>
              </div>
            </div>
            <div
              className={`p-3 border rounded-lg ${
                permissions.canDelete
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Trash2
                  className={`h-4 w-4 ${
                    permissions.canDelete ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm ${
                    permissions.canDelete ? "text-green-800" : "text-gray-500"
                  }`}
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Actions available based on your role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Read Action - Available to all */}
            <Button variant="outline" className="h-auto p-4" asChild>
              <Link href="/texts">
                <div className="flex flex-col items-center space-y-2">
                  <BookOpen className="h-6 w-6" />
                  <span>Browse Texts</span>
                  <span className="text-xs text-muted-foreground">
                    All users
                  </span>
                </div>
              </Link>
            </Button>

            {/* Create/Edit Actions - Available to editors and admins */}
            {permissions.canCreate && (
              <Button variant="outline" className="h-auto p-4" asChild>
                <Link href="/editor">
                  <div className="flex flex-col items-center space-y-2">
                    <Plus className="h-6 w-6" />
                    <span>Create Content</span>
                    <span className="text-xs text-muted-foreground">
                      Editors & Admins
                    </span>
                  </div>
                </Link>
              </Button>
            )}

            {/* Admin Actions - Available to admins only */}
            {permissions.canManageUsers && (
              <Button variant="outline" className="h-auto p-4" asChild>
                <Link href="/admin">
                  <div className="flex flex-col items-center space-y-2">
                    <Users className="h-6 w-6" />
                    <span>Manage Users</span>
                    <span className="text-xs text-muted-foreground">
                      Admins only
                    </span>
                  </div>
                </Link>
              </Button>
            )}

            {permissions.canManageRoles && (
              <Button variant="outline" className="h-auto p-4">
                <div className="flex flex-col items-center space-y-2">
                  <Settings className="h-6 w-6" />
                  <span>System Settings</span>
                  <span className="text-xs text-muted-foreground">
                    Admins only
                  </span>
                </div>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Role-specific Information */}
      <Card>
        <CardHeader>
          <CardTitle>Role Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userProfile.role === "admin" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">
                  Administrator
                </h4>
                <p className="text-sm text-red-700">
                  You have full system access including user management, role
                  assignments, and all content operations. Use these privileges
                  responsibly.
                </p>
              </div>
            )}

            {userProfile.role === "editor" && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Editor</h4>
                <p className="text-sm text-blue-700">
                  You can create, edit, and manage content. You have access to
                  the text editor and can contribute to the content library.
                </p>
              </div>
            )}

            {userProfile.role === "viewer" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Viewer</h4>
                <p className="text-sm text-green-700">
                  You can browse and read all available content. To request
                  additional permissions, please contact an administrator.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
