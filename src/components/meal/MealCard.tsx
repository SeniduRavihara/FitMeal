import { View, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { AppText } from "../AppText";
import { Card } from "../common/Card";
import { Button } from "../Button";
import { Meal } from "../../types";
import { cn } from "../../utils/cn";
import { Ionicons } from "@expo/vector-icons";

type MealCardProps = {
  meal: Meal;
  onPress?: () => void;
  onAddToCart?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  showAddButton?: boolean;
  className?: string;
};

export function MealCard({
  meal,
  onPress,
  onAddToCart,
  onFavorite,
  isFavorite = false,
  showAddButton = true,
  className,
}: MealCardProps) {
  const { name, image, price, rating, reviewCount, nutrition, tags, isPopular, isNew } = meal;

  return (
    <View className={cn("bg-white rounded-2xl shadow-sm overflow-hidden", className)}>
      <TouchableOpacity onPress={onPress}>
        {/* Image container */}
        <View className="relative">
          <Image
            source={{ uri: image }}
            className="w-full h-40"
            resizeMode="cover"
          />
          
          {/* Badges */}
          <View className="absolute top-3 left-3 flex-row space-x-2">
            {isNew && (
              <View className="bg-green-500 px-2 py-1 rounded-lg">
                <AppText className="text-xs font-semibold text-white">
                  NEW
                </AppText>
              </View>
            )}
            {isPopular && (
              <View className="bg-orange-500 px-2 py-1 rounded-lg">
                <AppText className="text-xs font-semibold text-white">
                  POPULAR
                </AppText>
              </View>
            )}
          </View>

          {/* Favorite button */}
          <TouchableOpacity
            onPress={onFavorite}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full items-center justify-center"
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={16} 
              color={isFavorite ? "#EF4444" : "#6B7280"} 
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="p-4">
          {/* Title and rating */}
          <View className="flex-row justify-between items-start mb-3">
            <View className="flex-1 mr-2">
              <AppText className="text-base font-semibold text-gray-900" numberOfLines={2}>
                {name}
              </AppText>
            </View>
            <View className="items-end">
              <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="#F59E0B" />
                <AppText className="text-sm font-semibold text-gray-900 ml-1">
                  {rating}
                </AppText>
              </View>
              <AppText className="text-xs text-gray-500">
                ({reviewCount})
              </AppText>
            </View>
          </View>

          {/* Nutrition badges */}
          <View className="flex-row flex-wrap mb-3">
            <View className="bg-orange-100 px-2 py-1 rounded-lg mr-2 mb-1">
              <AppText className="text-xs font-medium text-orange-600">
                {nutrition.calories} cal
              </AppText>
            </View>
            <View className="bg-blue-100 px-2 py-1 rounded-lg mr-2 mb-1">
              <AppText className="text-xs font-medium text-blue-600">
                {nutrition.protein}g protein
              </AppText>
            </View>
            {tags.slice(0, 1).map((tag, index) => (
              <View key={index} className="bg-gray-100 px-2 py-1 rounded-lg mr-2 mb-1">
                <AppText className="text-xs font-medium text-gray-600">
                  {tag}
                </AppText>
              </View>
            ))}
          </View>

          {/* Price and add button */}
          <View className="flex-row justify-between items-center">
            <AppText className="text-lg font-bold text-orange-500">
              ${price.toFixed(2)}
            </AppText>
            
            {showAddButton && (
              <TouchableOpacity
                className="bg-orange-500 px-4 py-2 rounded-lg"
                onPress={onAddToCart}
              >
                <AppText className="text-white font-semibold text-sm">Add</AppText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
