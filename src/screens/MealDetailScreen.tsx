import { View, ScrollView, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/Button";
import { NutritionCard } from "@/components/meal/NutritionCard";
import { Meal } from "@/types";

type MealDetailScreenProps = {
  meal: Meal;
  onBack: () => void;
  onAddToCart: (meal: Meal, quantity: number) => void;
};

export function MealDetailScreen({ meal, onBack, onAddToCart }: MealDetailScreenProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(meal, quantity);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header with back button */}
      <View className="absolute top-12 left-4 z-10">
        <Pressable
          onPress={onBack}
          className="w-10 h-10 bg-white/90 rounded-full items-center justify-center"
        >
          <AppText variant="body" color="primary">‹</AppText>
        </Pressable>
      </View>

      {/* Favorite button */}
      <View className="absolute top-12 right-4 z-10">
        <Pressable
          onPress={handleFavorite}
          className="w-10 h-10 bg-white/90 rounded-full items-center justify-center"
        >
          <AppText variant="body" color={isFavorite ? "accent" : "secondary"}>
            {isFavorite ? "❤️" : "🤍"}
          </AppText>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Image
          source={{ uri: meal.image }}
          className="w-full h-80"
          resizeMode="cover"
        />

        {/* Content */}
        <View className="px-4 py-4 space-y-4">
          {/* Meal Info */}
          <View className="space-y-2">
            <View className="flex-row justify-between items-start">
              <View className="flex-1 mr-4">
                <AppText variant="h2" weight="bold">
                  {meal.name}
                </AppText>
                <AppText variant="body" color="secondary" className="mt-1">
                  {meal.description}
                </AppText>
              </View>
              <View className="items-end">
                <AppText variant="h2" weight="bold" color="accent">
                  ${meal.price.toFixed(2)}
                </AppText>
              </View>
            </View>

            {/* Rating and prep time */}
            <View className="flex-row items-center space-x-4">
              <View className="flex-row items-center">
                <AppText variant="body" weight="semibold">⭐</AppText>
                <AppText variant="body" weight="semibold" className="ml-1">
                  {meal.rating}
                </AppText>
                <AppText variant="bodySmall" color="secondary" className="ml-1">
                  ({meal.reviewCount} reviews)
                </AppText>
              </View>
              <View className="flex-row items-center">
                <AppText variant="body" className="mr-1">⏱️</AppText>
                <AppText variant="bodySmall" color="secondary">
                  {meal.prepTime} min prep
                </AppText>
              </View>
            </View>
          </View>

          {/* Tags */}
          <View className="flex-row flex-wrap">
            {meal.tags.map((tag, index) => (
              <View key={index} className="bg-background-secondary px-3 py-1 rounded-full mr-2 mb-2">
                <AppText variant="bodySmall" weight="medium" color="secondary">
                  {tag}
                </AppText>
              </View>
            ))}
          </View>

          {/* Nutrition Card */}
          <NutritionCard nutrition={meal.nutrition} showDetails={true} />

          {/* Ingredients */}
          <Card>
            <View className="space-y-3">
              <AppText variant="h4" weight="semibold">
                Ingredients
              </AppText>
              <View className="flex-row flex-wrap">
                {meal.ingredients.map((ingredient, index) => (
                  <View key={index} className="bg-primary-50 px-3 py-2 rounded-lg mr-2 mb-2">
                    <AppText variant="bodySmall" weight="medium" color="primary">
                      {ingredient}
                    </AppText>
                  </View>
                ))}
              </View>
            </View>
          </Card>

          {/* Dietary Info */}
          <Card>
            <View className="space-y-3">
              <AppText variant="h4" weight="semibold">
                Dietary Information
              </AppText>
              <View className="flex-row flex-wrap">
                {meal.isVegetarian && (
                  <View className="bg-secondary-50 px-3 py-2 rounded-lg mr-2 mb-2">
                    <AppText variant="bodySmall" weight="medium" color="secondary">
                      🌱 Vegetarian
                    </AppText>
                  </View>
                )}
                {meal.isVegan && (
                  <View className="bg-secondary-50 px-3 py-2 rounded-lg mr-2 mb-2">
                    <AppText variant="bodySmall" weight="medium" color="secondary">
                      🌿 Vegan
                    </AppText>
                  </View>
                )}
                {meal.isGlutenFree && (
                  <View className="bg-secondary-50 px-3 py-2 rounded-lg mr-2 mb-2">
                    <AppText variant="bodySmall" weight="medium" color="secondary">
                      🌾 Gluten Free
                    </AppText>
                  </View>
                )}
                {meal.isKeto && (
                  <View className="bg-secondary-50 px-3 py-2 rounded-lg mr-2 mb-2">
                    <AppText variant="bodySmall" weight="medium" color="secondary">
                      🥑 Keto
                    </AppText>
                  </View>
                )}
              </View>
            </View>
          </Card>

          {/* Quantity Selector and Add to Cart */}
          <Card>
            <View className="space-y-4">
              <View className="flex-row justify-between items-center">
                <AppText variant="h4" weight="semibold">
                  Quantity
                </AppText>
                <View className="flex-row items-center space-x-3">
                  <Pressable
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 bg-background-secondary rounded-full items-center justify-center"
                  >
                    <AppText variant="body" weight="semibold">-</AppText>
                  </Pressable>
                  <AppText variant="h4" weight="semibold" className="min-w-[40px] text-center">
                    {quantity}
                  </AppText>
                  <Pressable
                    onPress={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 bg-primary rounded-full items-center justify-center"
                  >
                    <AppText variant="body" weight="semibold" color="white">+</AppText>
                  </Pressable>
                </View>
              </View>

              <View className="space-y-2">
                <View className="flex-row justify-between items-center">
                  <AppText variant="body" weight="medium">
                    Subtotal
                  </AppText>
                  <AppText variant="h4" weight="bold" color="accent">
                    ${(meal.price * quantity).toFixed(2)}
                  </AppText>
                </View>
                <AppText variant="bodySmall" color="secondary">
                  Delivery fee will be calculated at checkout
                </AppText>
              </View>

              <Button
                title="Add to Cart"
                variant="primary"
                size="large"
                fullWidth
                onPress={handleAddToCart}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
