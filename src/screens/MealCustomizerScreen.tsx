import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";
import { Button } from "../components/Button";
import { CustomAlert } from "../components/CustomAlert";
import { useCustomAlert } from "../hooks/useCustomAlert";
import {
  MacroTargets,
  MealBase,
  NUTRITION_FOCUS_OPTIONS,
  NutritionFocus,
  QUICK_SELECT_PRESETS,
} from "../types/mealBuilder";
import {
  calculateCustomizationPrice,
  calculateMacros,
  formatMacroValue,
  getSliderRange,
} from "../utils/macroCalculator";

const { width: screenWidth } = Dimensions.get("window");

interface MealCustomizerScreenProps {
  mealBase: MealBase;
  onAddToCart: (customMeal: any) => void;
  onOrderNow: (customMeal: any) => void;
  onClose: () => void;
}

export function MealCustomizerScreen({
  mealBase,
  onAddToCart,
  onOrderNow,
  onClose,
}: MealCustomizerScreenProps) {
  const [selectedFocus, setSelectedFocus] = useState<NutritionFocus>("protein");
  const [targetAmount, setTargetAmount] = useState(45);
  const [calculatedMacros, setCalculatedMacros] = useState<MacroTargets>({
    protein: 45,
    carbs: 27,
    fats: 18,
    calories: 414,
  });

  const { showSuccess, visible, alertConfig, handleConfirm, handleCancel } =
    useCustomAlert();

  // Update macros when focus or amount changes
  useEffect(() => {
    const newMacros = calculateMacros(selectedFocus, targetAmount);
    setCalculatedMacros(newMacros);
  }, [selectedFocus, targetAmount]);

  const handleFocusChange = (focus: NutritionFocus) => {
    setSelectedFocus(focus);

    // Set default amount based on focus
    // For 'balanced', use protein as default since it's not in availableCustomizations
    const focusKey = focus === "balanced" ? "protein" : focus;
    const defaultAmount =
      mealBase.availableCustomizations[
        focusKey as keyof typeof mealBase.availableCustomizations
      ].default;
    setTargetAmount(defaultAmount);
  };

  const handleAmountChange = (value: number) => {
    setTargetAmount(Math.round(value));
  };

  const handleQuickSelect = (value: number) => {
    setTargetAmount(value);
  };

  const handleAddToCart = () => {
    const customMeal = {
      id: `${mealBase.id}-${Date.now()}`,
      mealBase,
      customization: {
        focus: selectedFocus,
        targetAmount,
        calculatedMacros,
      },
      quantity: 1,
      pricePerItem: calculateCustomizationPrice(
        mealBase.basePrice,
        selectedFocus,
        targetAmount
      ),
      totalPrice: calculateCustomizationPrice(
        mealBase.basePrice,
        selectedFocus,
        targetAmount
      ),
      createdAt: new Date().toISOString(),
    };

    onAddToCart(customMeal);
    showSuccess(
      "Added to Cart! 🎉",
      `Your ${mealBase.name} with ${selectedFocus} focus (${formatMacroValue(targetAmount)}) has been added to your cart.`
    );
  };

  const handleOrderNow = () => {
    const customMeal = {
      id: `${mealBase.id}-${Date.now()}`,
      mealBase,
      customization: {
        focus: selectedFocus,
        targetAmount,
        calculatedMacros,
      },
      quantity: 1,
      pricePerItem: calculateCustomizationPrice(
        mealBase.basePrice,
        selectedFocus,
        targetAmount
      ),
      totalPrice: calculateCustomizationPrice(
        mealBase.basePrice,
        selectedFocus,
        targetAmount
      ),
      createdAt: new Date().toISOString(),
    };

    onOrderNow(customMeal);
  };

  const sliderRange = getSliderRange(selectedFocus);
  const totalPrice = calculateCustomizationPrice(
    mealBase.basePrice,
    selectedFocus,
    targetAmount
  );
  const customizationFee = totalPrice - mealBase.basePrice;
  const selectedFocusOption = NUTRITION_FOCUS_OPTIONS.find(
    (opt) => opt.id === selectedFocus
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#E5E5E5",
        }}
      >
        <TouchableOpacity onPress={onClose} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <AppText variant="h3" weight="semibold" color="primary">
          {mealBase.name}
        </AppText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* Meal Image */}
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Image
            source={{ uri: mealBase.image }}
            style={{
              width: screenWidth - 40,
              height: 200,
              borderRadius: 16,
            }}
            resizeMode="cover"
          />
        </View>

        {/* Nutrition Focus Selector */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <AppText
            variant="h3"
            weight="semibold"
            color="primary"
            style={{ marginBottom: 16 }}
          >
            🎯 Choose Your Focus
          </AppText>

          <View style={{ gap: 12 }}>
            {NUTRITION_FOCUS_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleFocusChange(option.id)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                  backgroundColor:
                    selectedFocus === option.id ? option.lightColor : "white",
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor:
                    selectedFocus === option.id ? option.color : "#E5E5E5",
                }}
              >
                <View style={{ marginRight: 12 }}>
                  <AppText variant="h2" style={{ fontSize: 24 }}>
                    {option.icon}
                  </AppText>
                </View>

                <View style={{ flex: 1 }}>
                  <AppText variant="h4" weight="semibold" color="primary">
                    {option.title}
                  </AppText>
                  <AppText
                    variant="body"
                    color="secondary"
                    style={{ marginTop: 2 }}
                  >
                    {option.description}
                  </AppText>
                </View>

                {selectedFocus === option.id && (
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: option.color,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Amount Selector */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <AppText
            variant="h3"
            weight="semibold"
            color="primary"
            style={{ marginBottom: 16 }}
          >
            How much {selectedFocusOption?.title.toLowerCase()} do you need?
          </AppText>

          {/* Large Value Display */}
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <AppText
              variant="h1"
              weight="bold"
              color="primary"
              style={{ fontSize: 48 }}
            >
              {formatMacroValue(targetAmount)}
            </AppText>
          </View>

          {/* Slider */}
          <View style={{ marginBottom: 20 }}>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={sliderRange.min}
              maximumValue={sliderRange.max}
              step={sliderRange.step}
              value={targetAmount}
              onValueChange={handleAmountChange}
              minimumTrackTintColor={selectedFocusOption?.color || "#FF6B6B"}
              maximumTrackTintColor="#E5E5E5"
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <AppText variant="caption" color="secondary">
                {formatMacroValue(sliderRange.min)}
              </AppText>
              <AppText variant="caption" color="secondary">
                {formatMacroValue(sliderRange.max)}
              </AppText>
            </View>
          </View>

          {/* Quick Select Buttons */}
          {selectedFocus !== "balanced" && (
            <View>
              <AppText
                variant="body"
                weight="medium"
                color="primary"
                style={{ marginBottom: 12 }}
              >
                Quick Select:
              </AppText>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {QUICK_SELECT_PRESETS[selectedFocus].map((value) => (
                  <TouchableOpacity
                    key={value}
                    onPress={() => handleQuickSelect(value)}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor:
                        targetAmount === value
                          ? selectedFocusOption?.color || "#FF6B6B"
                          : "white",
                      borderWidth: 1,
                      borderColor:
                        targetAmount === value
                          ? selectedFocusOption?.color || "#FF6B6B"
                          : "#E5E5E5",
                    }}
                  >
                    <AppText
                      variant="body"
                      weight="medium"
                      color={targetAmount === value ? "white" : "primary"}
                    >
                      {formatMacroValue(value)}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Meal Summary */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <AppText
            variant="h3"
            weight="semibold"
            color="primary"
            style={{ marginBottom: 16 }}
          >
            📊 Your Meal Summary
          </AppText>

          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: "#E5E5E5",
            }}
          >
            {/* Macros */}
            <View style={{ marginBottom: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <AppText variant="body" color="secondary">
                  Total Calories:
                </AppText>
                <AppText variant="body" weight="semibold" color="primary">
                  ~{calculatedMacros.calories} kcal
                </AppText>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <AppText variant="body" color="secondary">
                  Protein:
                </AppText>
                <AppText variant="body" weight="semibold" color="primary">
                  {formatMacroValue(calculatedMacros.protein)}
                  {selectedFocus === "protein" && " (Target)"}
                </AppText>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <AppText variant="body" color="secondary">
                  Carbs:
                </AppText>
                <AppText variant="body" weight="semibold" color="primary">
                  {formatMacroValue(calculatedMacros.carbs)}
                  {selectedFocus === "carbs" && " (Target)"}
                </AppText>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <AppText variant="body" color="secondary">
                  Fats:
                </AppText>
                <AppText variant="body" weight="semibold" color="primary">
                  {formatMacroValue(calculatedMacros.fats)}
                  {selectedFocus === "fats" && " (Target)"}
                </AppText>
              </View>
            </View>

            {/* Pricing */}
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#E5E5E5",
                paddingTop: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <AppText variant="body" color="secondary">
                  Base Price:
                </AppText>
                <AppText variant="body" color="primary">
                  LKR {mealBase.basePrice}
                </AppText>
              </View>

              {customizationFee > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <AppText variant="body" color="secondary">
                    Customization:
                  </AppText>
                  <AppText variant="body" color="primary">
                    +LKR {customizationFee}
                  </AppText>
                </View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderTopWidth: 1,
                  borderTopColor: "#E5E5E5",
                  paddingTop: 8,
                }}
              >
                <AppText variant="h4" weight="bold" color="primary">
                  Total:
                </AppText>
                <AppText variant="h4" weight="bold" color="primary">
                  LKR {totalPrice}
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          <Button
            title={`Add to Cart - LKR ${totalPrice}`}
            onPress={handleAddToCart}
            variant="primary"
            size="large"
            fullWidth
            style={{ marginBottom: 12 }}
          />

          <Button
            title="Order Now"
            onPress={handleOrderNow}
            variant="outline"
            size="large"
            fullWidth
          />
        </View>
      </ScrollView>

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
