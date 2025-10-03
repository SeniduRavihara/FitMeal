import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { AppText } from "../components/AppText";
import { CartItem } from "../types";

type CartScreenProps = {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  onBack: () => void;
};

export function CartScreen({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onBack,
}: CartScreenProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.meal.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 25 ? 0 : 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-4 pb-2 bg-white border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={onBack} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#FB923C" />
          </TouchableOpacity>
          <AppText className="text-xl font-bold text-gray-900">
            Your Cart
          </AppText>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {cartItems.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="bag-outline" size={64} color="#D1D5DB" />
            <AppText className="text-lg font-medium text-gray-500 mt-4 text-center">
              Your cart is empty
            </AppText>
            <AppText className="text-base text-gray-400 text-center mt-2">
              Add some delicious meals to get started
            </AppText>
          </View>
        ) : (
          <View className="py-4">
            {/* Cart Items */}
            {cartItems.map((item) => (
              <View
                key={item.id}
                className="bg-white rounded-xl p-4 mb-4 shadow-sm"
              >
                <View className="flex-row items-start">
                  <Image
                    source={{ uri: item.meal.image }}
                    className="w-16 h-16 rounded-lg"
                    resizeMode="cover"
                  />
                  <View className="flex-1 ml-3">
                    <AppText
                      className="text-base font-semibold text-gray-900"
                      numberOfLines={2}
                    >
                      {item.meal.name}
                    </AppText>
                    <AppText className="text-sm text-gray-500 mt-1">
                      ${item.meal.price.toFixed(2)} each
                    </AppText>
                  </View>
                  <TouchableOpacity
                    onPress={() => onRemoveItem(item.id)}
                    className="w-6 h-6 items-center justify-center"
                  >
                    <Ionicons name="close" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                <View className="flex-row justify-between items-center mt-3">
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() =>
                        onUpdateQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
                    >
                      <Ionicons name="remove" size={16} color="#6B7280" />
                    </TouchableOpacity>
                    <AppText className="text-base font-semibold text-gray-900 mx-4 min-w-[40px] text-center">
                      {item.quantity}
                    </AppText>
                    <TouchableOpacity
                      onPress={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 bg-orange-500 rounded-full items-center justify-center"
                    >
                      <Ionicons name="add" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  <AppText className="text-lg font-bold text-orange-500">
                    ${(item.meal.price * item.quantity).toFixed(2)}
                  </AppText>
                </View>
              </View>
            ))}

            {/* Order Summary */}
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <AppText className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </AppText>

              <View className="space-y-3">
                <View className="flex-row justify-between items-center">
                  <AppText className="text-base text-gray-600">
                    Subtotal (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items)
                  </AppText>
                  <AppText className="text-base font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </AppText>
                </View>

                <View className="flex-row justify-between items-center">
                  <AppText className="text-base text-gray-600">
                    Delivery Fee
                  </AppText>
                  <AppText className="text-base font-medium text-gray-900">
                    {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
                  </AppText>
                </View>

                <View className="flex-row justify-between items-center">
                  <AppText className="text-base text-gray-600">Tax</AppText>
                  <AppText className="text-base font-medium text-gray-900">
                    ${tax.toFixed(2)}
                  </AppText>
                </View>

                <View className="border-t border-gray-200 pt-3">
                  <View className="flex-row justify-between items-center">
                    <AppText className="text-lg font-bold text-gray-900">
                      Total
                    </AppText>
                    <AppText className="text-lg font-bold text-orange-500">
                      ${total.toFixed(2)}
                    </AppText>
                  </View>
                </View>
              </View>

              {deliveryFee > 0 && (
                <View className="bg-orange-50 p-3 rounded-lg mt-4">
                  <AppText className="text-sm text-orange-600 text-center">
                    Add ${(25 - subtotal).toFixed(2)} more for free delivery!
                  </AppText>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <View className="px-6 pb-6 pt-4 bg-white border-t border-gray-200">
          <TouchableOpacity
            className="bg-orange-500 py-4 rounded-xl items-center"
            onPress={onCheckout}
          >
            <AppText className="text-white text-base font-semibold">
              Checkout • ${total.toFixed(2)}
            </AppText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
