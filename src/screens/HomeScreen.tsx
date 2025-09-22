import { View, ScrollView, TextInput, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { AppText } from "../components/AppText";
import { MealCard } from "../components/meal/MealCard";
import { Button } from "../components/Button";
import { DUMMY_MEALS, DUMMY_USER } from "../data/dummyData";
import { MEAL_CATEGORIES } from "../constants";
import { Meal } from "../types";

export function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredMeals = DUMMY_MEALS.filter(meal => {
    const matchesCategory = selectedCategory === 'all' || meal.category === selectedCategory;
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meal.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (meal: Meal) => {
    // TODO: Implement add to cart functionality
    console.log('Added to cart:', meal.name);
  };

  const handleFavorite = (mealId: string) => {
    setFavorites(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-1">
            <AppText variant="h2" weight="bold">
              {getGreeting()}, {DUMMY_USER.name.split(' ')[0]}! 👋
            </AppText>
            <AppText variant="body" color="secondary" className="mt-1">
              What would you like to eat today?
            </AppText>
          </View>
          <Pressable className="w-10 h-10 bg-primary rounded-full items-center justify-center">
            <AppText variant="body" color="white">🛒</AppText>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-background-secondary rounded-2xl px-4 py-3 mb-4">
          <AppText variant="body" color="secondary" className="mr-3">🔍</AppText>
          <TextInput
            placeholder="Search meals, ingredients..."
            placeholderTextColor="#86868B"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-base font-system"
          />
        </View>
      </View>

      {/* Categories */}
      <View className="px-4 mb-4">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {MEAL_CATEGORIES.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              className={`
                mr-3 px-4 py-2 rounded-full border
                ${selectedCategory === category.id 
                  ? 'bg-primary border-primary' 
                  : 'bg-white border-border'
                }
              `}
            >
              <View className="flex-row items-center">
                <AppText variant="body" className="mr-2">
                  {category.icon}
                </AppText>
                <AppText 
                  variant="bodySmall" 
                  weight="medium"
                  color={selectedCategory === category.id ? "white" : "primary"}
                >
                  {category.name}
                </AppText>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Featured Meal */}
      <View className="px-4 mb-6">
        <AppText variant="h3" weight="semibold" className="mb-3">
          Featured Today
        </AppText>
        <View className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-4">
          <View className="flex-row items-center">
            <Image
              source={{ uri: DUMMY_MEALS[0].image }}
              className="w-16 h-16 rounded-xl mr-4"
              resizeMode="cover"
            />
            <View className="flex-1">
              <AppText variant="h4" weight="semibold" color="white">
                {DUMMY_MEALS[0].name}
              </AppText>
              <AppText variant="bodySmall" color="white" className="opacity-90">
                {DUMMY_MEALS[0].nutrition.calories} cal • {DUMMY_MEALS[0].nutrition.protein}g protein
              </AppText>
              <AppText variant="h3" weight="bold" color="white" className="mt-1">
                ${DUMMY_MEALS[0].price.toFixed(2)}
              </AppText>
            </View>
            <Button
              title="Order"
              variant="secondary"
              size="small"
              onPress={() => handleAddToCart(DUMMY_MEALS[0])}
            />
          </View>
        </View>
      </View>

      {/* Meals Grid */}
      <View className="px-4 pb-6">
        <View className="flex-row justify-between items-center mb-4">
          <AppText variant="h3" weight="semibold">
            {selectedCategory === 'all' ? 'All Meals' : MEAL_CATEGORIES.find(c => c.id === selectedCategory)?.name}
          </AppText>
          <AppText variant="bodySmall" color="secondary">
            {filteredMeals.length} meals
          </AppText>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {filteredMeals.map((meal, index) => (
            <View key={meal.id} className="w-[48%] mb-4">
              <MealCard
                meal={meal}
                onPress={() => {
                  // TODO: Navigate to meal detail
                  console.log('Navigate to meal detail:', meal.name);
                }}
                onAddToCart={() => handleAddToCart(meal)}
                onFavorite={() => handleFavorite(meal.id)}
                isFavorite={favorites.includes(meal.id)}
              />
            </View>
          ))}
        </View>

        {filteredMeals.length === 0 && (
          <View className="items-center py-8">
            <AppText variant="h4" weight="medium" color="secondary" center>
              No meals found
            </AppText>
            <AppText variant="body" color="tertiary" center className="mt-2">
              Try adjusting your search or category filter
            </AppText>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
