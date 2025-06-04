"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/useAuth";
import { User, LogIn, LogOut } from "lucide-react";

export function AuthButton() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
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

  if (loading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 text-sm">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">
            {user.displayName || user.email}
          </span>
        </div>
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
