"use client";

import { useState, useEffect, useCallback } from "react";
import { User } from "firebase/auth";
import { authService, userService } from "../firebase-services";
import { UserRole, UserProfile } from "../types/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      setUser(user);

      if (user) {
        try {
          // Fetch user profile with role information
          const profile = await userService.getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (
    email: string,
    password: string,
    role: UserRole = "viewer",
    displayName?: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.signUp(email, password, role, displayName);
      setUser(user);

      // Fetch the created profile
      const profile = await userService.getUserProfile(user.uid);
      setUserProfile(profile);

      return user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during sign up";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.signIn(email, password);
      setUser(user);

      // Fetch user profile
      const profile = await userService.getUserProfile(user.uid);
      setUserProfile(profile);

      return user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during sign in";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (defaultRole: UserRole = "viewer") => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.signInWithGoogle(defaultRole);
      setUser(user);

      // Fetch user profile
      const profile = await userService.getUserProfile(user.uid);
      setUserProfile(profile);

      return user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during Google sign in";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await authService.signOut();
      setUser(null);
      setUserProfile(null);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during sign out";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await authService.sendPasswordResetEmail(email);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while sending password reset email";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Role management functions
  const updateUserRole = useCallback(
    async (uid: string, newRole: UserRole) => {
      if (!user) throw new Error("No authenticated user");

      try {
        setError(null);
        await userService.updateUserRole(uid, newRole, user.uid);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An error occurred while updating user role";
        setError(errorMessage);
        throw error;
      }
    },
    [user]
  );

  const getAllUsers = useCallback(async (): Promise<UserProfile[]> => {
    if (!user) throw new Error("No authenticated user");

    try {
      setError(null);
      return await userService.getAllUsers(user.uid);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while fetching users";
      setError(errorMessage);
      throw error;
    }
  }, [user]);

  const onUsersSnapshot = useCallback(
    async (
      callback: (users: UserProfile[]) => void,
      onError?: (error: Error) => void
    ) => {
      if (!user) throw new Error("No authenticated user");

      try {
        setError(null);
        return await userService.onUsersSnapshot(user.uid, callback, onError);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An error occurred while setting up users listener";
        setError(errorMessage);
        throw error;
      }
    },
    [user]
  );

  const deactivateUser = useCallback(
    async (uid: string) => {
      if (!user) throw new Error("No authenticated user");

      try {
        setError(null);
        await userService.deactivateUser(uid, user.uid);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An error occurred while deactivating user";
        setError(errorMessage);
        throw error;
      }
    },
    [user]
  );

  const activateUser = useCallback(
    async (uid: string) => {
      if (!user) throw new Error("No authenticated user");

      try {
        setError(null);
        await userService.activateUser(uid, user.uid);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An error occurred while activating user";
        setError(errorMessage);
        throw error;
      }
    },
    [user]
  );

  // Helper methods
  const hasRole = (role: UserRole): boolean => {
    return userProfile?.role === role;
  };

  const hasMinimumRole = (minimumRole: UserRole): boolean => {
    if (!userProfile) return false;

    const roleLevels = { viewer: 1, editor: 2, admin: 3 };
    const userLevel = roleLevels[userProfile.role];
    const requiredLevel = roleLevels[minimumRole];

    return userLevel >= requiredLevel;
  };

  return {
    user,
    userProfile,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    sendPasswordResetEmail,
    updateUserRole,
    getAllUsers,
    onUsersSnapshot,
    deactivateUser,
    activateUser,
    hasRole,
    hasMinimumRole,
    // Convenience getters
    isAdmin: userProfile?.role === "admin",
    isEditor: userProfile?.role === "editor",
    isViewer: userProfile?.role === "viewer",
    userRole: userProfile?.role || null,
  };
}
