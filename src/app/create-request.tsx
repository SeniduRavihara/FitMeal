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

const mealTypes = [
  { id: "breakfast", name: "Breakfast", icon: "sunny-outline" },
  { id: "lunch", name: "Lunch", icon: "restaurant-outline" },
  { id: "dinner", name: "Dinner", icon: "moon-outline" },
  { id: "snack", name: "Snack", icon: "cafe-outline" },
];

const dietaryPreferences = [
  { id: "vegetarian", name: "Vegetarian" },
  { id: "vegan", name: "Vegan" },
  { id: "keto", name: "Keto" },
  { id: "paleo", name: "Paleo" },
  { id: "gluten-free", name: "Gluten-Free" },
  { id: "dairy-free", name: "Dairy-Free" },
  { id: "low-carb", name: "Low Carb" },
  { id: "high-protein", name: "High Protein" },
];

const fitnessGoals = [
  { id: "muscle_gain", name: "Muscle Gain" },
  { id: "fat_loss", name: "Fat Loss" },
  { id: "maintenance", name: "Maintenance" },
  { id: "endurance", name: "Endurance" },
];

export default function CreateRequestPage() {
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    allergies: "",
    budget: "",
    deliveryDate: "",
    specialInstructions: "",
  });

  const handleDietaryToggle = (dietaryId: string) => {
    setSelectedDietary((prev) =>
      prev.includes(dietaryId)
        ? prev.filter((id) => id !== dietaryId)
        : [...prev, dietaryId]
    );
  };

  const handleSubmit = () => {
    if (!selectedMealType || !formData.title || !formData.description) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    Alert.alert(
      "Request Submitted",
      "Your custom meal request has been submitted successfully! Our chefs will review it and get back to you within 24 hours.",
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
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#FB923C" />
          </TouchableOpacity>
          <AppText className="text-xl font-bold text-gray-900">
            Create Request
          </AppText>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="py-4">
          {/* Meal Type Selection */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <AppText className="text-lg font-semibold text-gray-900 mb-4">
              Meal Type *
            </AppText>
            <View className="flex-row flex-wrap">
              {mealTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  onPress={() => setSelectedMealType(type.id)}
                  className={`flex-row items-center mr-3 mb-3 px-4 py-2 rounded-full border ${
                    selectedMealType === type.id
                      ? "bg-orange-500 border-orange-500"
                      : "bg-gray-100 border-gray-200"
                  }`}
                >
                  <Ionicons
                    name={type.icon as any}
                    size={16}
                    color={selectedMealType === type.id ? "#FFFFFF" : "#6B7280"}
                  />
                  <AppText
                    className={`ml-2 font-medium ${
                      selectedMealType === type.id
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {type.name}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Basic Information */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <AppText className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information *
            </AppText>

            <View>
              <View className="mb-4">
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Request Title *
                </AppText>
                <TextInput
                  value={formData.title}
                  onChangeText={(text) =>
                    setFormData({ ...formData, title: text })
                  }
                  placeholder="e.g., Custom Protein Bowl"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Description *
                </AppText>
                <TextInput
                  value={formData.description}
                  onChangeText={(text) =>
                    setFormData({ ...formData, description: text })
                  }
                  placeholder="Describe what you're looking for..."
                  multiline
                  numberOfLines={4}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
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
                    selectedDietary.includes(dietary.id)
                      ? "bg-orange-500 border-orange-500"
                      : "bg-gray-100 border-gray-200"
                  }`}
                >
                  <AppText
                    className={`text-sm font-medium ${
                      selectedDietary.includes(dietary.id)
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

          {/* Fitness Goal */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <AppText className="text-lg font-semibold text-gray-900 mb-4">
              Fitness Goal
            </AppText>
            <View className="flex-row flex-wrap">
              {fitnessGoals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  onPress={() => setSelectedGoal(goal.id)}
                  className={`mr-2 mb-2 px-3 py-2 rounded-full border ${
                    selectedGoal === goal.id
                      ? "bg-orange-500 border-orange-500"
                      : "bg-gray-100 border-gray-200"
                  }`}
                >
                  <AppText
                    className={`text-sm font-medium ${
                      selectedGoal === goal.id ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {goal.name}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Additional Details */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <AppText className="text-lg font-semibold text-gray-900 mb-4">
              Additional Details
            </AppText>

            <View>
              <View className="mb-4">
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Preferred Ingredients
                </AppText>
                <TextInput
                  value={formData.ingredients}
                  onChangeText={(text) =>
                    setFormData({ ...formData, ingredients: text })
                  }
                  placeholder="e.g., Chicken, Quinoa, Spinach..."
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View className="mb-4">
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Allergies or Restrictions
                </AppText>
                <TextInput
                  value={formData.allergies}
                  onChangeText={(text) =>
                    setFormData({ ...formData, allergies: text })
                  }
                  placeholder="e.g., Nuts, Shellfish..."
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View className="mb-4">
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </AppText>
                <TextInput
                  value={formData.budget}
                  onChangeText={(text) =>
                    setFormData({ ...formData, budget: text })
                  }
                  placeholder="e.g., $15-25 per meal"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View className="mb-4">
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Preferred Delivery Date
                </AppText>
                <TextInput
                  value={formData.deliveryDate}
                  onChangeText={(text) =>
                    setFormData({ ...formData, deliveryDate: text })
                  }
                  placeholder="e.g., Next Monday"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </AppText>
                <TextInput
                  value={formData.specialInstructions}
                  onChangeText={(text) =>
                    setFormData({ ...formData, specialInstructions: text })
                  }
                  placeholder="Any additional notes..."
                  multiline
                  numberOfLines={3}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-orange-500 py-4 rounded-xl mb-6"
          >
            <AppText className="text-white text-center font-semibold text-lg">
              Submit Request
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
