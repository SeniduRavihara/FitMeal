import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";
import { useAuth } from "../contexts/AuthContext";

const fitnessGoals = [
  { id: "muscle_gain", name: "Muscle Gain" },
  { id: "fat_loss", name: "Fat Loss" },
  { id: "maintenance", name: "Maintenance" },
  { id: "endurance", name: "Endurance" },
];

const dietaryPreferences = [
  { id: "vegetarian", name: "Vegetarian" },
  { id: "vegan", name: "Vegan" },
  { id: "keto", name: "Keto" },
  { id: "paleo", name: "Paleo" },
  { id: "gluten_free", name: "Gluten-Free" },
  { id: "dairy_free", name: "Dairy-Free" },
  { id: "low_carb", name: "Low Carb" },
  { id: "high_protein", name: "High Protein" },
];

export default function EditProfilePage() {
  const { session } = useAuth();
  const [formData, setFormData] = useState({
    fullName: session?.user?.user_metadata?.name || "",
    email: session?.user?.email || "",
    phone: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    fitnessGoal: "",
    dietaryPreferences: [] as string[],
    bio: "",
  });

  const handleDietaryToggle = (dietaryId: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(dietaryId)
        ? prev.dietaryPreferences.filter((id) => id !== dietaryId)
        : [...prev.dietaryPreferences, dietaryId],
    }));
  };

  const handleSave = () => {
    if (!formData.fullName.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }

    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully!",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-4 pb-2 bg-white border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Ionicons name="arrow-back" size={24} color="#FB923C" />
            </TouchableOpacity>
            <AppText className="text-xl font-bold text-gray-900">
              Edit Profile
            </AppText>
          </View>
          <TouchableOpacity onPress={handleSave}>
            <AppText className="text-orange-500 font-semibold">Save</AppText>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="py-6">
          {/* Profile Picture */}
          <View className="items-center mb-6">
            <View className="relative">
              <View className="w-24 h-24 bg-orange-100 rounded-full items-center justify-center border-2 border-white shadow-sm">
                <Ionicons name="person" size={40} color="#FB923C" />
              </View>
              <TouchableOpacity className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-500 rounded-full items-center justify-center">
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <AppText className="text-sm text-gray-500 mt-2">
              Tap to change photo
            </AppText>
          </View>

          {/* Basic Information */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <AppText className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </AppText>

            <View className="space-y-4">
              <View>
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </AppText>
                <TextInput
                  value={formData.fullName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, fullName: text })
                  }
                  placeholder="Enter your full name"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </AppText>
                <TextInput
                  value={formData.email}
                  editable={false}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-500 bg-gray-100"
                />
                <AppText className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </AppText>
              </View>

              <View>
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </AppText>
                <TextInput
                  value={formData.phone}
                  onChangeText={(text) =>
                    setFormData({ ...formData, phone: text })
                  }
                  placeholder="+1 (555) 123-4567"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </AppText>
                <TextInput
                  value={formData.dateOfBirth}
                  onChangeText={(text) =>
                    setFormData({ ...formData, dateOfBirth: text })
                  }
                  placeholder="MM/DD/YYYY"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          {/* Physical Information */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <AppText className="text-lg font-semibold text-gray-900 mb-4">
              Physical Information
            </AppText>

            <View className="flex-row space-x-3">
              <View className="flex-1">
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Height
                </AppText>
                <TextInput
                  value={formData.height}
                  onChangeText={(text) =>
                    setFormData({ ...formData, height: text })
                  }
                  placeholder="5'8 inches"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View className="flex-1">
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Weight
                </AppText>
                <TextInput
                  value={formData.weight}
                  onChangeText={(text) =>
                    setFormData({ ...formData, weight: text })
                  }
                  placeholder="150 lbs"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          {/* Fitness Goal */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <AppText className="text-lg font-semibold text-gray-900 mb-4">
              Fitness Goal
            </AppText>
            <View className="flex-row flex-wrap">
              {fitnessGoals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  onPress={() =>
                    setFormData({ ...formData, fitnessGoal: goal.id })
                  }
                  className={`mr-2 mb-2 px-3 py-2 rounded-full border ${
                    formData.fitnessGoal === goal.id
                      ? "bg-orange-500 border-orange-500"
                      : "bg-gray-100 border-gray-200"
                  }`}
                >
                  <AppText
                    className={`text-sm font-medium ${
                      formData.fitnessGoal === goal.id
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {goal.name}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Dietary Preferences */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <AppText className="text-lg font-semibold text-gray-900 mb-4">
              Dietary Preferences
            </AppText>
            <View className="flex-row flex-wrap">
              {dietaryPreferences.map((dietary) => (
                <TouchableOpacity
                  key={dietary.id}
                  onPress={() => handleDietaryToggle(dietary.id)}
                  className={`mr-2 mb-2 px-3 py-2 rounded-full border ${
                    formData.dietaryPreferences.includes(dietary.id)
                      ? "bg-orange-500 border-orange-500"
                      : "bg-gray-100 border-gray-200"
                  }`}
                >
                  <AppText
                    className={`text-sm font-medium ${
                      formData.dietaryPreferences.includes(dietary.id)
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {dietary.name}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bio */}
          <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
            <AppText className="text-lg font-semibold text-gray-900 mb-4">
              About Me
            </AppText>
            <TextInput
              value={formData.bio}
              onChangeText={(text) => setFormData({ ...formData, bio: text })}
              placeholder="Tell us about yourself, your fitness journey, or any special dietary needs..."
              multiline
              numberOfLines={4}
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            className="bg-orange-500 py-4 rounded-xl mb-6"
          >
            <AppText className="text-white text-center font-semibold text-lg">
              Save Changes
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
