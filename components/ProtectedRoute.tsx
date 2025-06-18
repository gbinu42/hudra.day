"use client";

import { ReactNode } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { UserRole } from "@/lib/types/auth";
import { RBACService } from "@/lib/rbac";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, AlertTriangle } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requireAuth?: boolean;
  fallback?: ReactNode;
}

export function ProtectedRoute({
  children,
  requiredRole,
  requireAuth = true,
  fallback,
}: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Check authentication
  if (requireAuth && !user) {
    return (
      fallback || (
        <Card className="max-w-md mx-auto mt-8">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Lock className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">
                  Authentication Required
                </h3>
                <p className="text-muted-foreground">
                  Please sign in to access this page.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    );
  }

  // Check user profile exists
  if (user && !userProfile) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Profile Setup Required</h3>
              <p className="text-muted-foreground">
                Your user profile is being set up. Please try refreshing the
                page.
              </p>
            </div>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Check if user is active
  if (userProfile && !userProfile.isActive) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Account Deactivated</h3>
              <p className="text-muted-foreground">
                Your account has been deactivated. Please contact an
                administrator.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Check role-based access
  if (
    requiredRole &&
    userProfile &&
    !RBACService.canAccessRoute(userProfile.role, requiredRole)
  ) {
    return (
      fallback || (
        <Card className="max-w-md mx-auto mt-8">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Lock className="h-12 w-12 text-red-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Access Denied</h3>
                <p className="text-muted-foreground">
                  You don't have the required permissions to access this page.
                </p>
                <p className="text-sm text-muted-foreground">
                  Required role: {RBACService.getRoleDisplayName(requiredRole)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Your role: {RBACService.getRoleDisplayName(userProfile.role)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    );
  }

  // All checks passed, render children
  return <>{children}</>;
}
