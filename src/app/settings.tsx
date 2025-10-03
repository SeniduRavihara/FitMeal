import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";
import { useAuth } from "../contexts/AuthContext";

export default function SettingsPage() {
  const { signOut } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    pushNotifications: true,
    locationServices: true,
    darkMode: false,
    autoSync: true,
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          const { error } = await signOut();
          if (error) {
            console.error("Sign out error:", error);
          }
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. All your data will be permanently deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // TODO: Implement account deletion
            Alert.alert(
              "Feature Coming Soon",
              "Account deletion will be available in a future update."
            );
          },
        },
      ]
    );
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    value,
    onValueChange,
    type = "switch",
    onPress,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    type?: "switch" | "button";
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      className="flex-row items-center py-4"
      onPress={type === "button" ? onPress : undefined}
      disabled={type === "switch"}
    >
      <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-4">
        <Ionicons name={icon as any} size={20} color="#FB923C" />
      </View>
      <View className="flex-1">
        <AppText className="text-base font-medium text-gray-900">
          {title}
        </AppText>
        {subtitle && (
          <AppText className="text-sm text-gray-500 mt-1">{subtitle}</AppText>
        )}
      </View>
      {type === "switch" ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#E5E7EB", true: "#FB923C" }}
          thumbColor={value ? "#FFFFFF" : "#F3F4F6"}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-4 pb-2 bg-white border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#FB923C" />
          </TouchableOpacity>
          <AppText className="text-xl font-bold text-gray-900">
            Settings
          </AppText>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Notifications Section */}
        <View className="bg-white mt-4 mx-6 rounded-xl shadow-sm">
          <View className="px-4 py-3 border-b border-gray-100">
            <AppText className="text-lg font-semibold text-gray-900">
              Notifications
            </AppText>
          </View>
          <View className="px-4">
            <SettingItem
              icon="notifications-outline"
              title="Push Notifications"
              subtitle="Receive notifications about your orders"
              value={settings.pushNotifications}
              onValueChange={(value) =>
                handleSettingChange("pushNotifications", value)
              }
            />
            <SettingItem
              icon="mail-outline"
              title="Email Updates"
              subtitle="Get updates via email"
              value={settings.emailUpdates}
              onValueChange={(value) =>
                handleSettingChange("emailUpdates", value)
              }
            />
            <SettingItem
              icon="megaphone-outline"
              title="Promotional Notifications"
              subtitle="Receive offers and promotions"
              value={settings.notifications}
              onValueChange={(value) =>
                handleSettingChange("notifications", value)
              }
            />
          </View>
        </View>

        {/* Privacy & Security Section */}
        <View className="bg-white mt-4 mx-6 rounded-xl shadow-sm">
          <View className="px-4 py-3 border-b border-gray-100">
            <AppText className="text-lg font-semibold text-gray-900">
              Privacy & Security
            </AppText>
          </View>
          <View className="px-4">
            <SettingItem
              icon="location-outline"
              title="Location Services"
              subtitle="Allow location access for delivery"
              value={settings.locationServices}
              onValueChange={(value) =>
                handleSettingChange("locationServices", value)
              }
            />
            <SettingItem
              icon="shield-checkmark-outline"
              title="Privacy Policy"
              type="button"
              onPress={() => router.push("/privacy-policy")}
            />
            <SettingItem
              icon="document-text-outline"
              title="Terms of Service"
              type="button"
              onPress={() =>
                Alert.alert(
                  "Coming Soon",
                  "Terms of Service will be available soon."
                )
              }
            />
          </View>
        </View>

        {/* App Preferences Section */}
        <View className="bg-white mt-4 mx-6 rounded-xl shadow-sm">
          <View className="px-4 py-3 border-b border-gray-100">
            <AppText className="text-lg font-semibold text-gray-900">
              App Preferences
            </AppText>
          </View>
          <View className="px-4">
            <SettingItem
              icon="moon-outline"
              title="Dark Mode"
              subtitle="Switch to dark theme"
              value={settings.darkMode}
              onValueChange={(value) => handleSettingChange("darkMode", value)}
            />
            <SettingItem
              icon="sync-outline"
              title="Auto Sync"
              subtitle="Automatically sync your data"
              value={settings.autoSync}
              onValueChange={(value) => handleSettingChange("autoSync", value)}
            />
            <SettingItem
              icon="language-outline"
              title="Language"
              subtitle="English"
              type="button"
              onPress={() =>
                Alert.alert(
                  "Coming Soon",
                  "Language selection will be available soon."
                )
              }
            />
          </View>
        </View>

        {/* Account Section */}
        <View className="bg-white mt-4 mx-6 rounded-xl shadow-sm">
          <View className="px-4 py-3 border-b border-gray-100">
            <AppText className="text-lg font-semibold text-gray-900">
              Account
            </AppText>
          </View>
          <View className="px-4">
            <SettingItem
              icon="person-outline"
              title="Edit Profile"
              type="button"
              onPress={() => router.push("/edit-profile")}
            />
            <SettingItem
              icon="key-outline"
              title="Change Password"
              type="button"
              onPress={() =>
                Alert.alert(
                  "Coming Soon",
                  "Password change will be available soon."
                )
              }
            />
            <SettingItem
              icon="card-outline"
              title="Payment Methods"
              type="button"
              onPress={() =>
                Alert.alert(
                  "Coming Soon",
                  "Payment methods will be available soon."
                )
              }
            />
          </View>
        </View>

        {/* Support Section */}
        <View className="bg-white mt-4 mx-6 rounded-xl shadow-sm">
          <View className="px-4 py-3 border-b border-gray-100">
            <AppText className="text-lg font-semibold text-gray-900">
              Support
            </AppText>
          </View>
          <View className="px-4">
            <SettingItem
              icon="help-circle-outline"
              title="Help Center"
              type="button"
              onPress={() =>
                Alert.alert(
                  "Coming Soon",
                  "Help center will be available soon."
                )
              }
            />
            <SettingItem
              icon="chatbubble-outline"
              title="Contact Support"
              type="button"
              onPress={() =>
                Alert.alert(
                  "Contact Support",
                  "Email: support@fitmeal.com\nPhone: 1-800-FITMEAL"
                )
              }
            />
            <SettingItem
              icon="star-outline"
              title="Rate App"
              type="button"
              onPress={() =>
                Alert.alert("Thank You!", "We appreciate your feedback!")
              }
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View className="bg-white mt-4 mx-6 rounded-xl shadow-sm">
          <View className="px-4 py-3 border-b border-gray-100">
            <AppText className="text-lg font-semibold text-red-600">
              Danger Zone
            </AppText>
          </View>
          <View className="px-4">
            <SettingItem
              icon="log-out-outline"
              title="Sign Out"
              type="button"
              onPress={handleSignOut}
            />
            <SettingItem
              icon="trash-outline"
              title="Delete Account"
              subtitle="Permanently delete your account"
              type="button"
              onPress={handleDeleteAccount}
            />
          </View>
        </View>

        {/* App Version */}
        <View className="items-center py-6">
          <AppText className="text-sm text-gray-500">FitMeal v1.0.0</AppText>
          <AppText className="text-xs text-gray-400 mt-1">
            Made with ❤️ for healthy living
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
