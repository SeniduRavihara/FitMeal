"use client";

import { useAuth } from "@/hooks/useAuth";
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminSignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    };
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.length) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (
      !passwordValidation.uppercase ||
      !passwordValidation.lowercase ||
      !passwordValidation.number
    ) {
      setError("Password must contain uppercase, lowercase, and number");
      return false;
    }

    if (!confirmPassword.trim()) {
      setError("Please confirm your password");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const { data, error } = await signUp(
        formData.email.trim(),
        formData.password,
        formData.name.trim()
      );

      if (error) {
        if (error.message.includes("User already registered")) {
          setError(
            "An account with this email already exists. Please sign in instead."
          );
        } else if (error.message.includes("Password should be at least")) {
          setError(
            "Please choose a stronger password with at least 8 characters."
          );
        } else {
          setError(error.message);
        }
      } else if (data.user) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData.password);

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Account Created Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Welcome to FitMeal Admin! You can now sign in with your
              credentials.
            </p>
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to sign in...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Admin Account
          </h1>
          <p className="text-gray-600">Join the FitMeal admin team</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                  placeholder="Enter your full name"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                  placeholder="Enter your email"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                  placeholder="Create a strong password"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              {formData.password.length > 0 && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-700 mb-3">
                    Password must contain:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full ${passwordValidation.length ? "bg-green-500" : "bg-gray-300"}`}
                      >
                        {passwordValidation.length && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span
                        className={`text-xs ${passwordValidation.length ? "text-green-600" : "text-gray-500"}`}
                      >
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full ${passwordValidation.uppercase ? "bg-green-500" : "bg-gray-300"}`}
                      >
                        {passwordValidation.uppercase && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span
                        className={`text-xs ${passwordValidation.uppercase ? "text-green-600" : "text-gray-500"}`}
                      >
                        One uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full ${passwordValidation.lowercase ? "bg-green-500" : "bg-gray-300"}`}
                      >
                        {passwordValidation.lowercase && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span
                        className={`text-xs ${passwordValidation.lowercase ? "text-green-600" : "text-gray-500"}`}
                      >
                        One lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full ${passwordValidation.number ? "bg-green-500" : "bg-gray-300"}`}
                      >
                        {passwordValidation.number && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span
                        className={`text-xs ${passwordValidation.number ? "text-green-600" : "text-gray-500"}`}
                      >
                        One number
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                  placeholder="Confirm your password"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Admin Account"
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an admin account?{" "}
              <Link
                href="/sign-in"
                className="text-orange-500 hover:text-orange-600 font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Secure admin access for FitMeal management
          </p>
        </div>
      </div>
    </div>
  );
}
