"use client";

import { useAuth } from "@/hooks/useAuth";
import { AlertCircle, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            You don't have the required permissions to access the admin
            dashboard. Only users with admin or super admin roles can access
            this area.
          </p>

          {/* User Info */}
          {user && profile && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 mb-1">
                <strong>Signed in as:</strong> {profile.full_name || user.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Role:</strong>{" "}
                <span className="capitalize">{profile.role}</span>
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go to Home
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need admin access? Contact your system administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
