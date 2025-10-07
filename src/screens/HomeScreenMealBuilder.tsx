import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";
import AuthPrompt from "../components/AuthPrompt";
import { CustomAlert } from "../components/CustomAlert";
import FeaturedCarousel from "../components/FeaturedCarousel";
import GuestHeader from "../components/GuestHeader";
import { MealBaseCard } from "../components/meal/MealBaseCard";
import { useAuth } from "../contexts/AuthContext";
import { useCustomMealCart } from "../contexts/CustomMealCartContext";
import { MEAL_BASES, getFeaturedMealBases } from "../data/mealBases";
import { useCarousel } from "../hooks/useCarousel";
import { useCustomAlert } from "../hooks/useCustomAlert";
import { MealBase } from "../types/mealBuilder";
import { MealCustomizerScreen } from "./MealCustomizerScreen";

export function HomeScreenMealBuilder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMealBase, setSelectedMealBase] = useState<MealBase | null>(
    null
  );
  const [customizerVisible, setCustomizerVisible] = useState(false);
  const [authPromptVisible, setAuthPromptVisible] = useState(false);
  const [authPromptConfig, setAuthPromptConfig] = useState({
    title: "",
    description: "",
    actionText: "",
  });

  const { session } = useAuth();
  const { addItem, getTotalItems } = useCustomMealCart();
  const {
    carouselItems,
    loading: carouselLoading,
    error: carouselError,
  } = useCarousel();
  const { showSuccess, visible, alertConfig, handleConfirm, handleCancel } =
    useCustomAlert();

  // Filter meal bases based on search
  const filteredMealBases = MEAL_BASES.filter(
    (mealBase) =>
      mealBase.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mealBase.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mealBase.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const featuredMealBases = getFeaturedMealBases(4);

  const handleMealBasePress = (mealBase: MealBase) => {
    if (!session) {
      setAuthPromptConfig({
        title: "Sign in to customize meals",
        description: "Create an account to start building your perfect meal",
        actionText: "Sign In",
      });
      setAuthPromptVisible(true);
      return;
    }

    setSelectedMealBase(mealBase);
    setCustomizerVisible(true);
  };

  const handleAddToCart = (customMeal: any) => {
    addItem(customMeal);
    setCustomizerVisible(false);
    setSelectedMealBase(null);
    showSuccess(
      "Added to Cart! 🎉",
      `Your ${customMeal.mealBase.name} with ${customMeal.customization.focus} focus has been added to your cart.`
    );
  };

  const handleOrderNow = (customMeal: any) => {
    // TODO: Implement direct ordering for custom meals
    console.log("Ordering custom meal now:", customMeal);
    setCustomizerVisible(false);
    setSelectedMealBase(null);
  };

  const handleCloseCustomizer = () => {
    setCustomizerVisible(false);
    setSelectedMealBase(null);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getUserName = () => {
    return session?.user?.user_metadata?.full_name || "there";
  };

  // Transform API carousel items to match FeaturedCarousel component format
  const featuredItems = carouselItems.map((item) => ({
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
    onPress: () => {
      // Handle carousel item actions
      console.log("Carousel item pressed:", item);
    },
  }));

  // Fallback carousel items when API is loading or fails
  const fallbackCarouselItems = [
    {
      id: "fallback-1",
      title: "Build Custom Meals",
      subtitle: "Perfect Macros",
      description: "Create meals with exact nutrition",
      image: MEAL_BASES[0].image,
      price: 1200,
      originalPrice: null,
      discount: "NEW",
      backgroundColor: "#FF6B6B",
      textColor: "#FFFFFF",
      onPress: () => handleMealBasePress(MEAL_BASES[0]),
    },
    {
      id: "fallback-2",
      title: "High Protein",
      subtitle: "Muscle Building",
      description: "Target your protein goals",
      image: MEAL_BASES[1].image,
      price: 1450,
      originalPrice: null,
      discount: "POPULAR",
      backgroundColor: "#4ECDC4",
      textColor: "#FFFFFF",
      onPress: () => handleMealBasePress(MEAL_BASES[1]),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      {!session && <GuestHeader />}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View
          style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <View style={{ flex: 1 }}>
              <AppText
                variant="h2"
                weight="bold"
                color="primary"
                style={{ marginBottom: 4 }}
              >
                {getGreeting()}, {getUserName()}!
              </AppText>
              <AppText variant="body" color="secondary">
                {session
                  ? "Build your perfect meal"
                  : "Explore our custom meal builder"}
              </AppText>
            </View>
            <TouchableOpacity
              style={{
                width: 48,
                height: 48,
                backgroundColor: "#FF6B6B",
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Ionicons name="bag-outline" size={20} color="#FFFFFF" />
              {getTotalItems() > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    backgroundColor: "#EF4444",
                    borderRadius: 10,
                    minWidth: 20,
                    height: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AppText
                    variant="caption"
                    weight="bold"
                    color="white"
                    style={{ fontSize: 10 }}
                  >
                    {getTotalItems()}
                  </AppText>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <Ionicons name="search-outline" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Search meal bases, ingredients..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                fontSize: 16,
                color: "#111827",
                marginLeft: 12,
              }}
            />
          </View>
        </View>

        {/* Quick Order Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <AppText
            variant="h3"
            weight="semibold"
            color="primary"
            style={{ marginBottom: 16 }}
          >
            🎯 Quick Order (Most Used)
          </AppText>

          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 20,
              borderWidth: 2,
              borderColor: "#FF6B6B",
              borderStyle: "dashed",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: "#FF6B6B",
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Ionicons name="build-outline" size={24} color="#FFFFFF" />
            </View>
            <AppText
              variant="h4"
              weight="semibold"
              color="primary"
              style={{ marginBottom: 4 }}
            >
              Build Custom Meal
            </AppText>
            <AppText
              variant="body"
              color="secondary"
              style={{ textAlign: "center" }}
            >
              Choose nutrition & amount
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Featured Carousel */}
        {carouselError && __DEV__ && (
          <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
            <AppText
              variant="caption"
              color="secondary"
              style={{ textAlign: "center" }}
            >
              Using fallback carousel items (API: {carouselError})
            </AppText>
          </View>
        )}
        <FeaturedCarousel
          items={
            carouselLoading || carouselError || featuredItems.length === 0
              ? fallbackCarouselItems
              : featuredItems
          }
        />

        {/* Meal Bases Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <AppText variant="h3" weight="semibold" color="primary">
              Select Your Meal Base
            </AppText>
            <AppText variant="body" color="secondary">
              {filteredMealBases.length} options
            </AppText>
          </View>

          {filteredMealBases.map((mealBase) => (
            <MealBaseCard
              key={mealBase.id}
              mealBase={mealBase}
              onPress={() => handleMealBasePress(mealBase)}
            />
          ))}

          {filteredMealBases.length === 0 && (
            <View style={{ alignItems: "center", paddingVertical: 40 }}>
              <Ionicons name="restaurant-outline" size={48} color="#D1D5DB" />
              <AppText
                variant="h4"
                weight="medium"
                color="secondary"
                style={{ marginTop: 16, textAlign: "center" }}
              >
                No meal bases found
              </AppText>
              <AppText
                variant="body"
                color="secondary"
                style={{ marginTop: 8, textAlign: "center" }}
              >
                Try adjusting your search terms
              </AppText>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Auth Prompt Modal */}
      <AuthPrompt
        visible={authPromptVisible}
        onClose={() => setAuthPromptVisible(false)}
        title={authPromptConfig.title}
        description={authPromptConfig.description}
        actionText={authPromptConfig.actionText}
        onAction={() => setAuthPromptVisible(false)}
      />

      {/* Meal Customizer Modal */}
      <Modal
        visible={customizerVisible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        {selectedMealBase && (
          <MealCustomizerScreen
            mealBase={selectedMealBase}
            onAddToCart={handleAddToCart}
            onOrderNow={handleOrderNow}
            onClose={handleCloseCustomizer}
          />
        )}
      </Modal>

      {/* Custom Alert */}
      {alertConfig && (
        <CustomAlert
          visible={visible}
          title={alertConfig.title}
          message={alertConfig.message}
          confirmText={alertConfig.confirmText}
          cancelText={alertConfig.cancelText}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          type={alertConfig.type}
          showCancel={alertConfig.showCancel}
        />
      )}
    </SafeAreaView>
  );
}
