import { View, Image, Pressable } from "react-native";
import React from "react";
import { AppText } from "../AppText";
import { Card } from "../common/Card";
import { Button } from "../Button";
import { Meal } from "../../types";
import { cn } from "../../utils/cn";

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
    <Card className={cn("overflow-hidden", className)}>
      <Pressable onPress={onPress} className="space-y-3">
        {/* Image container */}
        <View className="relative">
          <Image
            source={{ uri: image }}
            className="w-full h-40 rounded-xl"
            resizeMode="cover"
          />
          
          {/* Badges */}
          <View className="absolute top-2 left-2 flex-row space-x-1">
            {isNew && (
              <View className="bg-secondary px-2 py-1 rounded-md">
                <AppText variant="caption" weight="semibold" color="white">
                  NEW
                </AppText>
              </View>
            )}
            {isPopular && (
              <View className="bg-accent px-2 py-1 rounded-md">
                <AppText variant="caption" weight="semibold" color="white">
                  POPULAR
                </AppText>
              </View>
            )}
          </View>

          {/* Favorite button */}
          <Pressable
            onPress={onFavorite}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full items-center justify-center"
          >
            <AppText variant="body" color={isFavorite ? "accent" : "secondary"}>
              {isFavorite ? "❤️" : "🤍"}
            </AppText>
          </Pressable>
        </View>

        {/* Content */}
        <View className="space-y-2">
          {/* Title and rating */}
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-2">
              <AppText variant="h4" weight="semibold" numberOfLines={2}>
                {name}
              </AppText>
            </View>
            <View className="items-end">
              <View className="flex-row items-center">
                <AppText variant="bodySmall" weight="semibold">⭐</AppText>
                <AppText variant="bodySmall" weight="semibold" className="ml-1">
                  {rating}
                </AppText>
              </View>
              <AppText variant="caption" color="secondary">
                ({reviewCount})
              </AppText>
            </View>
          </View>

          {/* Nutrition badges */}
          <View className="flex-row flex-wrap">
            <View className="bg-primary-50 px-2 py-1 rounded-md mr-2 mb-1">
              <AppText variant="caption" weight="medium" color="primary">
                {nutrition.calories} cal
              </AppText>
            </View>
            <View className="bg-secondary-50 px-2 py-1 rounded-md mr-2 mb-1">
              <AppText variant="caption" weight="medium" color="secondary">
                {nutrition.protein}g protein
              </AppText>
            </View>
            {tags.slice(0, 2).map((tag, index) => (
              <View key={index} className="bg-background-secondary px-2 py-1 rounded-md mr-2 mb-1">
                <AppText variant="caption" weight="medium" color="secondary">
                  {tag}
                </AppText>
              </View>
            ))}
          </View>

          {/* Price and add button */}
          <View className="flex-row justify-between items-center">
            <AppText variant="h3" weight="bold" color="accent">
              ${price.toFixed(2)}
            </AppText>
            
            {showAddButton && (
              <Button
                title="Add"
                variant="primary"
                size="small"
                onPress={onAddToCart}
                className="px-4"
              />
            )}
          </View>
        </View>
      </Pressable>
    </Card>
  );
}
