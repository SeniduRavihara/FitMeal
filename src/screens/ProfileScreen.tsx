import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";
import { useAuth } from "../contexts/AuthContext";

export function ProfileScreen() {
  const { session, signOut } = useAuth();

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const handleSettings = (setting: string) => {
    switch (setting) {
      case "order-history":
        router.push("/order-history");
        break;
      case "shipping-address":
        router.push("/shipping-address");
        break;
      case "create-request":
        router.push("/create-request");
        break;
      case "privacy-policy":
        router.push("/privacy-policy");
        break;
      case "settings":
        router.push("/settings");
        break;
      default:
        console.log("Navigate to:", setting);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      console.error("Sign out error:", error);
    }
  };

  // Show sign-in screen for guests
  if (!session) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center px-6">
          <View className="items-center space-y-6">
            <View className="w-20 h-20 bg-orange-100 rounded-full items-center justify-center">
              <Ionicons name="person-outline" size={32} color="#FB923C" />
            </View>

            <View className="items-center space-y-2">
              <AppText
                variant="h2"
                weight="bold"
                className="text-gray-900 text-center"
              >
                Welcome Back!
              </AppText>
              <AppText variant="body" className="text-gray-500 text-center">
                Sign in to view your profile and orders
              </AppText>
            </View>

            <View className="w-full space-y-3">
              <TouchableOpacity
                className="bg-orange-500 py-4 px-6 rounded-xl"
                onPress={() => router.push("/(auth)/sign-in")}
              >
                <AppText className="text-white text-center font-semibold">
                  Sign In
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                className="border border-orange-200 py-4 px-6 rounded-xl"
                onPress={() => router.push("/(auth)/sign-up")}
              >
                <AppText className="text-orange-500 text-center font-semibold">
                  Create Account
                </AppText>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => router.back()}>
              <AppText className="text-gray-400">Continue Browsing</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <AppText className="text-2xl font-bold text-gray-900 text-center">
            Profile
          </AppText>
        </View>

        {/* User Profile Section */}
        <View className="items-center px-6 mb-8">
          {/* Avatar */}
          <View className="relative mb-4">
            <View className="w-24 h-24 bg-orange-100 rounded-full items-center justify-center border-2 border-white shadow-sm">
              <Ionicons name="person" size={40} color="#FB923C" />
            </View>
            {/* Edit Icon */}
            <TouchableOpacity
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-200 rounded-full items-center justify-center"
              onPress={handleEditProfile}
            >
              <Ionicons name="pencil" size={14} color="#FB923C" />
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <View className="items-center mb-6">
            <AppText className="text-xl font-bold text-gray-900 mb-1">
              {session?.user?.user_metadata?.name || "User"}
            </AppText>
            {/* <AppText className="text-base text-gray-500 mb-1">
              {session?.user?.phone || "No phone number"}
            </AppText> */}
            <AppText className="text-base text-gray-500">
              {session?.user?.email || "No email"}
            </AppText>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6 space-y-1">
          {/* Order History */}
          <TouchableOpacity
            className="flex-row items-center py-4"
            onPress={() => handleSettings("order-history")}
          >
            <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="time-outline" size={20} color="#FB923C" />
            </View>
            <AppText className="flex-1 text-base text-gray-900 font-medium">
              Order History
            </AppText>
            <Ionicons name="chevron-forward" size={20} color="#FB923C" />
          </TouchableOpacity>

          {/* Shipping Address */}
          <TouchableOpacity
            className="flex-row items-center py-4"
            onPress={() => handleSettings("shipping-address")}
          >
            <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="location-outline" size={20} color="#FB923C" />
            </View>
            <AppText className="flex-1 text-base text-gray-900 font-medium">
              Shipping Address
            </AppText>
            <Ionicons name="chevron-forward" size={20} color="#FB923C" />
          </TouchableOpacity>

          {/* Create Request */}
          {/* <TouchableOpacity
            className="flex-row items-center py-4"
            onPress={() => handleSettings("create-request")}
          >
            <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-4">
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#FB923C"
              />
            </View>
            <AppText className="flex-1 text-base text-gray-900 font-medium">
              Create Request
            </AppText>
            <Ionicons name="chevron-forward" size={20} color="#FB923C" />
          </TouchableOpacity> */}

          {/* Privacy Policy */}
          <TouchableOpacity
            className="flex-row items-center py-4"
            onPress={() => handleSettings("privacy-policy")}
          >
            <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="lock-closed-outline" size={20} color="#FB923C" />
            </View>
            <AppText className="flex-1 text-base text-gray-900 font-medium">
              Privacy Policy
            </AppText>
            <Ionicons name="chevron-forward" size={20} color="#FB923C" />
          </TouchableOpacity>

          {/* Settings */}
          {/* <TouchableOpacity
            className="flex-row items-center py-4"
            onPress={() => handleSettings("settings")}
          >
            <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="settings-outline" size={20} color="#FB923C" />
            </View>
            <AppText className="flex-1 text-base text-gray-900 font-medium">
              Settings
            </AppText>
            <Ionicons name="chevron-forward" size={20} color="#FB923C" />
          </TouchableOpacity> */}

          {/* Log out */}
          <TouchableOpacity
            className="flex-row items-center py-4"
            onPress={handleSignOut}
          >
            <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="log-out-outline" size={20} color="#FB923C" />
            </View>
            <AppText className="flex-1 text-base text-gray-900 font-medium">
              Log out
            </AppText>
            <Ionicons name="chevron-forward" size={20} color="#FB923C" />
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
