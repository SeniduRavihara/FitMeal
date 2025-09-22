import { View, ScrollView, Pressable } from "react-native";
import React from "react";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/Button";
import { CartItem } from "@/types";

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
  onBack 
}: CartScreenProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.meal.price * item.quantity), 0);
  const deliveryFee = subtotal > 25 ? 0 : 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row items-center">
          <Pressable onPress={onBack} className="mr-4">
            <AppText variant="h3" color="primary">‹</AppText>
          </Pressable>
          <AppText variant="h2" weight="bold">
            Your Cart
          </AppText>
        </View>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {cartItems.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <AppText variant="h3" weight="medium" color="secondary" center>
              Your cart is empty
            </AppText>
            <AppText variant="body" color="tertiary" center className="mt-2">
              Add some delicious meals to get started
            </AppText>
          </View>
        ) : (
          <View className="space-y-4 py-4">
            {/* Cart Items */}
            {cartItems.map((item) => (
              <Card key={item.id}>
                <View className="space-y-3">
                  <View className="flex-row items-start space-x-3">
                    <View className="w-16 h-16 bg-background-secondary rounded-lg" />
                    <View className="flex-1">
                      <AppText variant="h4" weight="semibold" numberOfLines={2}>
                        {item.meal.name}
                      </AppText>
                      <AppText variant="bodySmall" color="secondary" className="mt-1">
                        ${item.meal.price.toFixed(2)} each
                      </AppText>
                    </View>
                    <Pressable
                      onPress={() => onRemoveItem(item.id)}
                      className="w-6 h-6 items-center justify-center"
                    >
                      <AppText variant="body" color="accent">×</AppText>
                    </Pressable>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center space-x-3">
                      <Pressable
                        onPress={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 bg-background-secondary rounded-full items-center justify-center"
                      >
                        <AppText variant="body" weight="semibold">-</AppText>
                      </Pressable>
                      <AppText variant="h4" weight="semibold" className="min-w-[40px] text-center">
                        {item.quantity}
                      </AppText>
                      <Pressable
                        onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-primary rounded-full items-center justify-center"
                      >
                        <AppText variant="body" weight="semibold" color="white">+</AppText>
                      </Pressable>
                    </View>
                    <AppText variant="h4" weight="bold" color="accent">
                      ${(item.meal.price * item.quantity).toFixed(2)}
                    </AppText>
                  </View>
                </View>
              </Card>
            ))}

            {/* Order Summary */}
            <Card>
              <View className="space-y-3">
                <AppText variant="h4" weight="semibold">
                  Order Summary
                </AppText>
                
                <View className="space-y-2">
                  <View className="flex-row justify-between items-center">
                    <AppText variant="body" color="secondary">
                      Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                    </AppText>
                    <AppText variant="body" weight="medium">
                      ${subtotal.toFixed(2)}
                    </AppText>
                  </View>
                  
                  <View className="flex-row justify-between items-center">
                    <AppText variant="body" color="secondary">
                      Delivery Fee
                    </AppText>
                    <AppText variant="body" weight="medium">
                      {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                    </AppText>
                  </View>
                  
                  <View className="flex-row justify-between items-center">
                    <AppText variant="body" color="secondary">
                      Tax
                    </AppText>
                    <AppText variant="body" weight="medium">
                      ${tax.toFixed(2)}
                    </AppText>
                  </View>
                  
                  <View className="border-t border-border pt-2">
                    <View className="flex-row justify-between items-center">
                      <AppText variant="h4" weight="bold">
                        Total
                      </AppText>
                      <AppText variant="h4" weight="bold" color="accent">
                        ${total.toFixed(2)}
                      </AppText>
                    </View>
                  </View>
                </View>

                {deliveryFee > 0 && (
                  <View className="bg-primary-50 p-3 rounded-lg">
                    <AppText variant="bodySmall" color="primary" center>
                      Add ${(25 - subtotal).toFixed(2)} more for free delivery!
                    </AppText>
                  </View>
                )}
              </View>
            </Card>
          </View>
        )}
      </ScrollView>

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <View className="px-4 pb-4 pt-2">
          <Button
            title={`Checkout • $${total.toFixed(2)}`}
            variant="primary"
            size="large"
            fullWidth
            onPress={onCheckout}
          />
        </View>
      )}
    </View>
  );
}
