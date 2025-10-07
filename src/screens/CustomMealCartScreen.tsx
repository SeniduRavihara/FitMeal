import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";
import { Button } from "../components/Button";
import { CustomAlert } from "../components/CustomAlert";
import { useCustomMealCart } from "../contexts/CustomMealCartContext";
import { useCustomAlert } from "../hooks/useCustomAlert";
import { formatMacroValue } from "../utils/macroCalculator";
import {
  getBottomSectionStyle,
  getScrollViewContentStyle,
} from "../utils/navigationSpacing";

export function CustomMealCartScreen() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getTotalCalories,
    getTotalMacros,
  } = useCustomMealCart();

  const {
    showConfirmation,
    showError,
    visible,
    alertConfig,
    handleConfirm,
    handleCancel,
  } = useCustomAlert();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    const item = items.find((item) => item.id === itemId);
    showConfirmation(
      "Remove Item",
      `Are you sure you want to remove "${item?.mealBase.name}" from your cart?`,
      () => removeItem(itemId),
      () => {} // Cancel action
    );
  };

  const handleClearCart = () => {
    showConfirmation(
      "Clear Cart",
      "Are you sure you want to remove all items from your cart? This action cannot be undone.",
      clearCart,
      () => {} // Cancel action
    );
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      showError("Empty Cart", "Please add items to your cart before checkout.");
      return;
    }

    // Navigate to checkout screen
    router.push("/checkout");
  };

  const totalMacros = getTotalMacros();
  const totalCalories = getTotalCalories();
  const totalPrice = getTotalPrice();
  const deliveryFee = 200; // Fixed delivery fee
  const finalTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Ionicons name="bag-outline" size={64} color="#D1D5DB" />
          <AppText
            variant="h3"
            weight="semibold"
            color="secondary"
            style={{ marginTop: 16, textAlign: "center" }}
          >
            Your cart is empty
          </AppText>
          <AppText
            variant="body"
            color="secondary"
            style={{ marginTop: 8, textAlign: "center" }}
          >
            Start building your perfect meal to see it here
          </AppText>
        </View>
      </SafeAreaView>
    );
  }

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
        <AppText variant="h3" weight="semibold" color="primary">
          Your Cart ({getTotalItems()})
        </AppText>
        {items.length > 0 && (
          <TouchableOpacity onPress={handleClearCart}>
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={getScrollViewContentStyle()}
        showsVerticalScrollIndicator={false}
      >
        {/* Cart Items */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
          {items.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: item.mealBase.image }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    marginRight: 16,
                  }}
                  resizeMode="cover"
                />

                <View style={{ flex: 1 }}>
                  <AppText variant="h4" weight="semibold" color="primary">
                    {item.mealBase.name}
                  </AppText>

                  <View
                    style={{
                      backgroundColor: "#F0F9FF",
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                      alignSelf: "flex-start",
                      marginTop: 4,
                    }}
                  >
                    <AppText variant="caption" weight="medium" color="#2563EB">
                      Custom:{" "}
                      {item.customization.focus.charAt(0).toUpperCase() +
                        item.customization.focus.slice(1)}
                    </AppText>
                  </View>

                  <AppText
                    variant="body"
                    color="secondary"
                    style={{ marginTop: 4 }}
                  >
                    {item.customization.focus.charAt(0).toUpperCase() +
                      item.customization.focus.slice(1)}
                    : {formatMacroValue(item.customization.targetAmount)}
                  </AppText>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 12,
                    }}
                  >
                    <AppText variant="h4" weight="bold" color="primary">
                      LKR {item.totalPrice}
                    </AppText>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#F3F4F6",
                        borderRadius: 20,
                        paddingHorizontal: 4,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                          backgroundColor: "white",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons name="remove" size={16} color="#6B7280" />
                      </TouchableOpacity>

                      <AppText
                        variant="body"
                        weight="semibold"
                        color="primary"
                        style={{ marginHorizontal: 16 }}
                      >
                        {item.quantity}
                      </AppText>

                      <TouchableOpacity
                        onPress={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                          backgroundColor: "white",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons name="add" size={16} color="#6B7280" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => handleRemoveItem(item.id)}
                  style={{
                    padding: 8,
                    marginLeft: 8,
                  }}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={20}
                    color="#EF4444"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Nutrition Summary */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <AppText
            variant="h4"
            weight="semibold"
            color="primary"
            style={{ marginBottom: 12 }}
          >
            📊 Total Nutrition
          </AppText>

          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
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
                Total Calories:
              </AppText>
              <AppText variant="body" weight="semibold" color="primary">
                {totalCalories} kcal
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
                {formatMacroValue(totalMacros.protein)}
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
                {formatMacroValue(totalMacros.carbs)}
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
                {formatMacroValue(totalMacros.fats)}
              </AppText>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <AppText
            variant="h4"
            weight="semibold"
            color="primary"
            style={{ marginBottom: 12 }}
          >
            💰 Order Summary
          </AppText>

          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
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
                Subtotal:
              </AppText>
              <AppText variant="body" color="primary">
                LKR {totalPrice}
              </AppText>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <AppText variant="body" color="secondary">
                Delivery Fee:
              </AppText>
              <AppText variant="body" color="primary">
                LKR {deliveryFee}
              </AppText>
            </View>

            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#E5E5E5",
                paddingTop: 12,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <AppText variant="h4" weight="bold" color="primary">
                Total:
              </AppText>
              <AppText variant="h4" weight="bold" color="primary">
                LKR {finalTotal}
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View
        style={[
          {
            paddingHorizontal: 20,
            paddingVertical: 16,
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#E5E5E5",
          },
          getBottomSectionStyle(),
        ]}
      >
        <Button
          title={`Proceed to Checkout - LKR ${finalTotal}`}
          onPress={handleCheckout}
          variant="primary"
          size="large"
          fullWidth
        />
      </View>

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
