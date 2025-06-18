"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/hooks/useAuth";
import { User, LogIn, LogOut, Crown, Edit, Eye } from "lucide-react";
import { RBACService } from "@/lib/rbac";

export function AuthButton() {
  const { user, userProfile, loading, signInWithGoogle, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-3 w-3" />;
      case "editor":
        return <Edit className="h-3 w-3" />;
      case "viewer":
        return <Eye className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  if (loading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  if (user && userProfile) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-sm">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">
            {user.displayName || user.email}
          </span>
        </div>

        {/* Role Badge */}
        <Badge
          variant="outline"
          className={`text-xs ${RBACService.getRoleColor(userProfile.role)}`}
        >
          <span className="flex items-center space-x-1">
            {getRoleIcon(userProfile.role)}
            <span>{RBACService.getRoleDisplayName(userProfile.role)}</span>
          </span>
        </Badge>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          <LogOut className="h-4 w-4 mr-1" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" onClick={handleSignIn} disabled={isLoading}>
      <LogIn className="h-4 w-4 mr-2" />
      Sign In with Google
    </Button>
  );
}
