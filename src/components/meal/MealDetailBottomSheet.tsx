import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { Meal } from "../../types";
import { AppText } from "../AppText";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface MealDetailBottomSheetProps {
  visible: boolean;
  meal: Meal | null;
  onClose: () => void;
  onAddToCart: (meal: Meal) => void;
}

export default function MealDetailBottomSheet({
  visible,
  meal,
  onClose,
  onAddToCart,
}: MealDetailBottomSheetProps) {
  const [quantity, setQuantity] = useState(1);
  const { session } = useAuth();
  const { addToCart } = useCart();

  if (!meal) return null;

  const handleAddToCart = () => {
    if (!session) {
      // Show auth prompt
      return;
    }

    // Add meal with quantity to cart
    addToCart(meal, quantity);
    onAddToCart(meal); // Keep the original callback for compatibility
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/30">
        <TouchableOpacity
          className="absolute inset-0"
          activeOpacity={1}
          onPress={onClose}
        />

        <View className="bg-white rounded-t-3xl max-h-[90%] min-h-[50%]">
          {/* Handle */}
          <View className="w-10 h-1 bg-gray-300 rounded-full self-center mt-2 mb-2" />

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* Meal Image */}
            <View className="relative h-48">
              <Image
                source={{ uri: meal.image }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <TouchableOpacity
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full items-center justify-center"
                onPress={onClose}
              >
                <Ionicons name="close" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Meal Info */}
            <View className="p-6">
              <View className="flex-row justify-between items-start mb-3">
                <AppText className="text-2xl font-bold text-gray-900 flex-1 mr-4">
                  {meal.name}
                </AppText>
                <AppText className="text-2xl font-bold text-orange-500">
                  ${meal.price.toFixed(2)}
                </AppText>
              </View>

              <AppText className="text-base text-gray-600 leading-6 mb-6">
                {meal.description}
              </AppText>

              {/* Nutrition Info */}
              <View className="mb-6">
                <AppText className="text-lg font-semibold text-gray-900 mb-3">
                  Nutrition per serving
                </AppText>
                <View className="flex-row justify-between">
                  <View className="items-center flex-1">
                    <AppText className="text-xl font-bold text-gray-900">
                      {meal.nutrition.calories}
                    </AppText>
                    <AppText className="text-xs text-gray-500 mt-1">
                      Calories
                    </AppText>
                  </View>
                  <View className="items-center flex-1">
                    <AppText className="text-xl font-bold text-gray-900">
                      {meal.nutrition.protein}g
                    </AppText>
                    <AppText className="text-xs text-gray-500 mt-1">
                      Protein
                    </AppText>
                  </View>
                  <View className="items-center flex-1">
                    <AppText className="text-xl font-bold text-gray-900">
                      {meal.nutrition.carbs}g
                    </AppText>
                    <AppText className="text-xs text-gray-500 mt-1">
                      Carbs
                    </AppText>
                  </View>
                  <View className="items-center flex-1">
                    <AppText className="text-xl font-bold text-gray-900">
                      {meal.nutrition.fat}g
                    </AppText>
                    <AppText className="text-xs text-gray-500 mt-1">
                      Fat
                    </AppText>
                  </View>
                </View>
              </View>

              {/* Tags */}
              <View className="mb-6">
                <AppText className="text-lg font-semibold text-gray-900 mb-3">
                  Tags
                </AppText>
                <View className="flex-row flex-wrap">
                  {meal.tags.map((tag, index) => (
                    <View
                      key={index}
                      className="bg-gray-100 px-3 py-2 rounded-full mr-2 mb-2"
                    >
                      <AppText className="text-sm text-gray-700 font-medium">
                        {tag}
                      </AppText>
                    </View>
                  ))}
                </View>
              </View>

              {/* Quantity Selector */}
              <View className="mb-6">
                <AppText className="text-lg font-semibold text-gray-900 mb-3">
                  Quantity
                </AppText>
                <View className="flex-row items-center justify-center space-x-5">
                  <TouchableOpacity
                    className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Ionicons name="remove" size={20} color="#374151" />
                  </TouchableOpacity>
                  <AppText className="text-xl font-bold text-gray-900 min-w-[30px] text-center">
                    {quantity}
                  </AppText>
                  <TouchableOpacity
                    className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
                    onPress={() => setQuantity(quantity + 1)}
                  >
                    <Ionicons name="add" size={20} color="#374151" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Bottom Action Bar */}
          <View className="flex-row items-center p-6 border-t border-gray-200 bg-white">
            <View className="flex-1">
              <AppText className="text-sm text-gray-500">Total</AppText>
              <AppText className="text-xl font-bold text-gray-900">
                ${(meal.price * quantity).toFixed(2)}
              </AppText>
            </View>
            <TouchableOpacity
              className="bg-orange-500 px-6 py-3 rounded-xl"
              onPress={handleAddToCart}
            >
              <AppText className="text-white text-base font-semibold">
                Add to Cart
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
