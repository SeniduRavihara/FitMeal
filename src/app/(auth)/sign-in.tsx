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

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "info" as "success" | "error" | "warning" | "info",
  });
  const { signIn } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    return isValid;
  };

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "warning" | "info" = "info"
  ) => {
    setAlertConfig({ title, message, type });
    setAlertVisible(true);
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setLoading(true);
    console.log("Attempting to sign in with:", { email, password: "***" });

    try {
      const { data, error } = await signIn(email.trim(), password);

      console.log("Sign in response:", { data, error });

      if (error) {
        console.error("Sign in error:", error);

        // Handle specific error messages
        if (error.message.includes("Invalid login credentials")) {
          showAlert(
            "Sign In Failed",
            "Invalid email or password. Please check your credentials and try again.",
            "error"
          );
        } else if (error.message.includes("Email not confirmed")) {
          showAlert(
            "Email Not Verified",
            "Please check your email and click the verification link before signing in.",
            "warning"
          );
        } else {
          showAlert("Sign In Error", error.message, "error");
        }
      } else if (data.user) {
        console.log("User signed in successfully:", data.user.id);
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      showAlert(
        "Error",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    }

    setLoading(false);
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      showAlert(
        "Email Required",
        "Please enter your email address first.",
        "warning"
      );
      return;
    }

    if (!validateEmail(email)) {
      showAlert(
        "Invalid Email",
        "Please enter a valid email address.",
        "error"
      );
      return;
    }

    showAlert(
      "Feature Coming Soon",
      "Password reset functionality will be available soon.",
      "info"
    );
  };

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
          <View className="items-center px-6 pt-12 pb-8">
            <View className="w-20 h-20 bg-orange-100 rounded-full items-center justify-center mb-6">
              <Ionicons name="person" size={32} color="#FB923C" />
            </View>
            <AppText className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back!
            </AppText>
            <AppText className="text-base text-gray-500 text-center">
              Sign in to continue your fitness journey
            </AppText>
          </View>

          {/* Form */}
          <View className="px-6">
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
                  placeholder="Enter your password"
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
            </View>

            {/* Forgot Password */}
            <View className="mb-6">
              <TouchableOpacity
                onPress={handleForgotPassword}
                disabled={loading}
                className="self-end"
              >
                <AppText className="text-sm text-orange-500 font-medium">
                  Forgot Password?
                </AppText>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <View className="mb-8">
              <TouchableOpacity
                className={`bg-orange-500 py-4 rounded-xl items-center ${loading ? "opacity-50" : ""}`}
                onPress={handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <AppText className="text-white text-base font-semibold">
                    Sign In
                  </AppText>
                )}
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row items-center justify-center">
              <AppText className="text-gray-500">
                Don't have an account?
              </AppText>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/sign-up")}
                disabled={loading}
                className="ml-1"
              >
                <AppText className="text-orange-500 font-semibold">
                  Sign Up
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
