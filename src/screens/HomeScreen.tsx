import { View, ScrollView, TextInput, Pressable, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";
import { MealCard } from "../components/meal/MealCard";
import { Button } from "../components/Button";
import { DUMMY_MEALS, DUMMY_USER } from "../data/dummyData";
import { MEAL_CATEGORIES } from "../constants";
import { Meal } from "../types";
import { useAuth } from "../contexts/AuthContext";
import GuestHeader from "../components/GuestHeader";
import AuthPrompt from "../components/AuthPrompt";
import MealDetailBottomSheet from "../components/meal/MealDetailBottomSheet";
import FeaturedCarousel from "../components/FeaturedCarousel";
import { Ionicons } from "@expo/vector-icons";
import { useCarousel } from "../hooks/useCarousel";

export function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [authPromptVisible, setAuthPromptVisible] = useState(false);
  const [authPromptConfig, setAuthPromptConfig] = useState({
    title: '',
    description: '',
    actionText: '',
  });
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  
  const { session } = useAuth();
  const { carouselItems, loading: carouselLoading, error: carouselError } = useCarousel();

  const filteredMeals = DUMMY_MEALS.filter(meal => {
    const matchesCategory = selectedCategory === 'all' || meal.category === selectedCategory;
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meal.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (meal: Meal) => {
    if (!session) {
      setAuthPromptConfig({
        title: 'Sign in to place order',
        description: 'Create an account to start ordering meals',
        actionText: 'Sign In',
      });
      setAuthPromptVisible(true);
      return;
    }
    // TODO: Implement add to cart functionality
    console.log('Added to cart:', meal.name);
  };

  const handleMealPress = (meal: Meal) => {
    setSelectedMeal(meal);
    setBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
    setSelectedMeal(null);
  };

  const handleFavorite = (mealId: string) => {
    if (!session) {
      setAuthPromptConfig({
        title: 'Save your favorites',
        description: 'Sign in to save meals and access them anytime',
        actionText: 'Sign In',
      });
      setAuthPromptVisible(true);
      return;
    }
    
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

  const getUserName = () => {
    if (session?.user) {
      return session.user.email?.split('@')[0] || 'User';
    }
    return 'Guest';
  };

  const handleCarouselAction = (item: any) => {
    switch (item.actionType) {
      case 'meal':
        // Find the meal by ID and show detail
        const meal = DUMMY_MEALS.find(m => m.id === item.actionValue);
        if (meal) {
          handleMealPress(meal);
        }
        break;
      case 'category':
        // Filter by category
        setSelectedCategory(item.actionValue);
        break;
      case 'external':
        // Open external URL (would use Linking.openURL in real app)
        console.log('Open external URL:', item.actionValue);
        break;
      default:
        console.log('Unknown action type:', item.actionType);
    }
  };

  // Transform API carousel items to match FeaturedCarousel component format
  const featuredItems = carouselItems.map(item => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    image: item.image,
    price: item.price,
    originalPrice: item.originalPrice,
    discount: item.discount,
    backgroundColor: item.backgroundColor,
    textColor: item.textColor,
    onPress: () => handleCarouselAction(item)
  }));

  // Fallback carousel items when API is loading or fails
  const fallbackCarouselItems = [
    {
      id: 'fallback-1',
      title: 'Flash Sale',
      subtitle: 'Premium Meals',
      description: 'Limited time',
      image: DUMMY_MEALS[0].image,
      price: 49.99,
      originalPrice: 69.99,
      discount: '30% OFF',
      backgroundColor: '#EF4444',
      textColor: '#FFFFFF',
      onPress: () => handleAddToCart(DUMMY_MEALS[0])
    },
    {
      id: 'fallback-2',
      title: 'New Launch',
      subtitle: 'Protein Bowls',
      description: 'High protein',
      image: DUMMY_MEALS[1]?.image || DUMMY_MEALS[0].image,
      price: 24.99,
      backgroundColor: '#10B981',
      textColor: '#FFFFFF',
      onPress: () => handleAddToCart(DUMMY_MEALS[1] || DUMMY_MEALS[0])
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      {!session && <GuestHeader />}
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-1">
              <AppText className="text-2xl font-bold text-gray-900 mb-1">
                {getGreeting()}, {getUserName()}!
              </AppText>
              <AppText className="text-base text-gray-500">
                {session ? 'What would you like to eat today?' : 'Explore our healthy meals'}
              </AppText>
            </View>
            <TouchableOpacity className="w-12 h-12 bg-orange-500 rounded-full items-center justify-center shadow-sm">
              <Ionicons name="bag-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-2 mb-6 shadow-sm">
          <Ionicons name="search-outline" size={20} color="#9CA3AF" className="mr-3" />
          <TextInput
            placeholder="Search meals, ingredients..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-base text-gray-900 ml-3"
          />
        </View>
      </View>

      {/* Categories */}
      <View className="px-6 mb-6">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {MEAL_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              className={`
                mr-3 px-5 py-3 rounded-full
                ${selectedCategory === category.id 
                  ? 'bg-orange-500' 
                  : 'bg-white border border-gray-200'
                }
              `}
            >
              <AppText 
                className={`text-sm font-medium ${
                  selectedCategory === category.id ? 'text-white' : 'text-gray-700'
                }`}
              >
                {category.name}
              </AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Carousel */}
      {carouselError && __DEV__ && (
        <View className="px-6 mb-2">
          <AppText className="text-xs text-gray-400 text-center">
            Using fallback carousel items (API: {carouselError})
          </AppText>
        </View>
      )}
      <FeaturedCarousel 
        items={carouselLoading || carouselError || featuredItems.length === 0 
          ? fallbackCarouselItems 
          : featuredItems
        } 
      />

      {/* Meals Grid */}
      <View className="px-6 pb-6">
        <View className="flex-row justify-between items-center mb-6">
          <AppText className="text-xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'All Meals' : MEAL_CATEGORIES.find(c => c.id === selectedCategory)?.name}
          </AppText>
          <AppText className="text-sm text-gray-500">
            {filteredMeals.length} meals
          </AppText>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {filteredMeals.map((meal, index) => (
            <View key={meal.id} className="w-[48%] mb-4">
              <MealCard
                meal={meal}
                onPress={() => handleMealPress(meal)}
                onAddToCart={() => handleAddToCart(meal)}
                onFavorite={() => handleFavorite(meal.id)}
                isFavorite={favorites.includes(meal.id)}
              />
            </View>
          ))}
        </View>

        {filteredMeals.length === 0 && (
          <View className="items-center py-12">
            <Ionicons name="restaurant-outline" size={48} color="#D1D5DB" />
            <AppText className="text-lg font-medium text-gray-500 mt-4 text-center">
              No meals found
            </AppText>
            <AppText className="text-base text-gray-400 text-center mt-2">
              Try adjusting your search or category filter
            </AppText>
          </View>
        )}
        </View>
      </ScrollView>

      <AuthPrompt
        visible={authPromptVisible}
        onClose={() => setAuthPromptVisible(false)}
        title={authPromptConfig.title}
        description={authPromptConfig.description}
        actionText={authPromptConfig.actionText}
        onAction={() => setAuthPromptVisible(false)}
      />

        <MealDetailBottomSheet
          visible={bottomSheetVisible}
          meal={selectedMeal}
          onClose={handleCloseBottomSheet}
          onAddToCart={handleAddToCart}
        />
      </SafeAreaView>
    );
  }