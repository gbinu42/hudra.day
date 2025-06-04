"use client";

import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { authService } from "../firebase-services";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.signUp(email, password);
      setUser(user);
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

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.signInWithGoogle();
      setUser(user);
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

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };
}
