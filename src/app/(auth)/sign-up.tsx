import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../components/AppText";
import { CustomAlert } from "../../components/CustomAlert";
import { useAuth } from "../../contexts/AuthContext";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "default" as "success" | "error" | "warning" | "default",
  });
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
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setNameError("");

    // Name validation
    if (!name.trim()) {
      setNameError("Full name is required");
      isValid = false;
    } else if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      isValid = false;
    }

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.length) {
        setPasswordError("Password must be at least 8 characters");
        isValid = false;
      } else if (
        !passwordValidation.uppercase ||
        !passwordValidation.lowercase ||
        !passwordValidation.number
      ) {
        setPasswordError(
          "Password must contain uppercase, lowercase, and number"
        );
        isValid = false;
      }
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    // Terms agreement
    if (!agreeToTerms) {
      showAlert(
        "Terms Required",
        "Please agree to the Terms of Service and Privacy Policy to continue.",
        "warning"
      );
      isValid = false;
    }

    return isValid;
  };

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "warning" | "default" = "default"
  ) => {
    setAlertConfig({ title, message, type });
    setAlertVisible(true);
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    console.log("Attempting to sign up with:", {
      email,
      name,
      password: "***",
    });

    try {
      const { data, error } = await signUp(email.trim(), password, name.trim());

      console.log("Sign up response:", { data, error });

      if (error) {
        console.error("Sign up error:", error);

        // Handle specific error messages
        if (error.message.includes("User already registered")) {
          showAlert(
            "Account Exists",
            "An account with this email already exists. Please sign in instead.",
            "warning"
          );
        } else if (error.message.includes("Password should be at least")) {
          showAlert(
            "Weak Password",
            "Please choose a stronger password with at least 8 characters.",
            "error"
          );
        } else {
          showAlert("Sign Up Error", error.message, "error");
        }
      } else if (data.user) {
        console.log("User created successfully:", data.user.id);
        showAlert(
          "Account Created!",
          "Welcome to FitMeal! You can now sign in with your credentials.",
          "success"
        );
        // Navigate after a short delay to let user see the success message
        setTimeout(() => {
          router.replace("/(auth)/sign-in");
        }, 2000);
      }
    } catch (error) {
      console.error("Sign up error:", error);
      showAlert(
        "Error",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    }

    setLoading(false);
  };

  const passwordValidation = validatePassword(password);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="items-center px-6 pt-8 pb-6">
            <View className="w-20 h-20 bg-orange-100 rounded-full items-center justify-center mb-6">
              <Ionicons name="person-add" size={32} color="#FB923C" />
            </View>
            <AppText className="text-2xl font-bold text-gray-900 mb-2">
              Create Account
            </AppText>
            <AppText className="text-base text-gray-500 text-center">
              Join FitMeal and start your healthy journey
            </AppText>
          </View>

          {/* Form */}
          <View className="px-6">
            {/* Name Input */}
            <View className="mb-4">
              <AppText className="text-sm font-medium text-gray-700 mb-3">
                Full Name
              </AppText>
              <View
                className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-4 ${nameError ? "border border-red-300" : ""}`}
              >
                <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="person-outline" size={20} color="#FB923C" />
                </View>
                <TextInput
                  className="flex-1 text-base text-gray-900"
                  placeholder="Enter your full name"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    if (nameError) setNameError("");
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!loading}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              {nameError ? (
                <AppText className="text-sm text-red-500 mt-1 ml-1">
                  {nameError}
                </AppText>
              ) : null}
            </View>

            {/* Email Input */}
            <View className="mb-4">
              <AppText className="text-sm font-medium text-gray-700 mb-3">
                Email Address
              </AppText>
              <View
                className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-4 ${emailError ? "border border-red-300" : ""}`}
              >
                <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="mail-outline" size={20} color="#FB923C" />
                </View>
                <TextInput
                  className="flex-1 text-base text-gray-900"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) setEmailError("");
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              {emailError ? (
                <AppText className="text-sm text-red-500 mt-1 ml-1">
                  {emailError}
                </AppText>
              ) : null}
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <AppText className="text-sm font-medium text-gray-700 mb-3">
                Password
              </AppText>
              <View
                className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-4 ${passwordError ? "border border-red-300" : ""}`}
              >
                <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#FB923C"
                  />
                </View>
                <TextInput
                  className="flex-1 text-base text-gray-900"
                  placeholder="Create a strong password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) setPasswordError("");
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="ml-2"
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#FB923C"
                  />
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <AppText className="text-sm text-red-500 mt-1 ml-1">
                  {passwordError}
                </AppText>
              ) : null}

              {/* Password Requirements */}
              {password.length > 0 && (
                <View className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <AppText className="text-xs font-medium text-gray-700 mb-3">
                    Password must contain:
                  </AppText>
                  <View className="space-y-2">
                    <View className="flex-row items-center">
                      <Ionicons
                        name={
                          passwordValidation.length
                            ? "checkmark-circle"
                            : "ellipse-outline"
                        }
                        size={16}
                        color={
                          passwordValidation.length ? "#10B981" : "#6B7280"
                        }
                      />
                      <AppText
                        className={`text-xs ml-2 ${passwordValidation.length ? "text-green-600" : "text-gray-500"}`}
                      >
                        At least 8 characters
                      </AppText>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons
                        name={
                          passwordValidation.uppercase
                            ? "checkmark-circle"
                            : "ellipse-outline"
                        }
                        size={16}
                        color={
                          passwordValidation.uppercase ? "#10B981" : "#6B7280"
                        }
                      />
                      <AppText
                        className={`text-xs ml-2 ${passwordValidation.uppercase ? "text-green-600" : "text-gray-500"}`}
                      >
                        One uppercase letter
                      </AppText>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons
                        name={
                          passwordValidation.lowercase
                            ? "checkmark-circle"
                            : "ellipse-outline"
                        }
                        size={16}
                        color={
                          passwordValidation.lowercase ? "#10B981" : "#6B7280"
                        }
                      />
                      <AppText
                        className={`text-xs ml-2 ${passwordValidation.lowercase ? "text-green-600" : "text-gray-500"}`}
                      >
                        One lowercase letter
                      </AppText>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons
                        name={
                          passwordValidation.number
                            ? "checkmark-circle"
                            : "ellipse-outline"
                        }
                        size={16}
                        color={
                          passwordValidation.number ? "#10B981" : "#6B7280"
                        }
                      />
                      <AppText
                        className={`text-xs ml-2 ${passwordValidation.number ? "text-green-600" : "text-gray-500"}`}
                      >
                        One number
                      </AppText>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {/* Confirm Password Input */}
            <View className="mb-4">
              <AppText className="text-sm font-medium text-gray-700 mb-3">
                Confirm Password
              </AppText>
              <View
                className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-4 ${confirmPasswordError ? "border border-red-300" : ""}`}
              >
                <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#FB923C"
                  />
                </View>
                <TextInput
                  className="flex-1 text-base text-gray-900"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (confirmPasswordError) setConfirmPasswordError("");
                  }}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                  className="ml-2"
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={20}
                    color="#FB923C"
                  />
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? (
                <AppText className="text-sm text-red-500 mt-1 ml-1">
                  {confirmPasswordError}
                </AppText>
              ) : null}
            </View>

            {/* Terms Agreement */}
            <View className="mb-6">
              <TouchableOpacity
                className="flex-row items-start"
                onPress={() => setAgreeToTerms(!agreeToTerms)}
                disabled={loading}
              >
                <View
                  className={`w-5 h-5 rounded border-2 mr-3 mt-0.5 items-center justify-center ${agreeToTerms ? "bg-orange-500 border-orange-500" : "border-gray-300"}`}
                >
                  {agreeToTerms && (
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  )}
                </View>
                <AppText className="flex-1 text-sm text-gray-600 leading-5">
                  I agree to the{" "}
                  <AppText className="text-orange-500 font-medium">
                    Terms of Service
                  </AppText>{" "}
                  and{" "}
                  <AppText className="text-orange-500 font-medium">
                    Privacy Policy
                  </AppText>
                </AppText>
              </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <View className="mb-8">
              <TouchableOpacity
                className={`bg-orange-500 py-4 rounded-xl items-center ${loading ? "opacity-50" : ""}`}
                onPress={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <AppText className="text-white text-base font-semibold">
                    Create Account
                  </AppText>
                )}
              </TouchableOpacity>
            </View>

            {/* Sign In Link */}
            <View className="flex-row items-center justify-center">
              <AppText className="text-gray-500">
                Already have an account?
              </AppText>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/sign-in")}
                disabled={loading}
                className="ml-1"
              >
                <AppText className="text-orange-500 font-semibold">
                  Sign In
                </AppText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View className="h-12" />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Custom Alert */}
      <CustomAlert
        visible={alertVisible}
        onConfirm={() => setAlertVisible(false)}
        onCancel={() => setAlertVisible(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        showCancel={false}
      />
    </SafeAreaView>
  );
}
