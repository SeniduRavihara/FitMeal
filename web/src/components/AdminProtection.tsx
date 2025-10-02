"use client";

import { useAuth } from "@/hooks/useAuth";
import { AlertCircle, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AdminProtectionProps {
  children: React.ReactNode;
}

export default function AdminProtection({ children }: AdminProtectionProps) {
  const { user, profile, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not authenticated, redirect to sign in
        router.push("/sign-in");
      } else if (profile && !isAdmin) {
        // Authenticated but not admin, redirect to unauthorized
        router.push("/unauthorized");
      }
    }
  }, [user, profile, loading, isAdmin, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-orange-500 animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Verifying Access
          </h2>
          <p className="text-gray-600 mb-4">
            Checking your admin permissions...
          </p>
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Show error state if user is loaded but not admin
  if (user && profile && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-4">
            You don't have permission to access the admin dashboard.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Show error state if no user after loading
  if (!loading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-4">
            Please sign in to access the admin dashboard.
          </p>
          <button
            onClick={() => router.push("/sign-in")}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // User is authenticated and is admin, show the protected content
  if (user && isAdmin) {
    return <>{children}</>;
  }

  // Fallback loading state
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
