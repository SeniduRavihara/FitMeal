import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomMealCart } from "../contexts/CustomMealCartContext";
import { AppText } from "./AppText";

interface FloatingCartIconProps {
  style?: any;
}

export function FloatingCartIcon({ style }: FloatingCartIconProps) {
  const { getTotalItems, getTotalPrice } = useCustomMealCart();
  const insets = useSafeAreaInsets();

  const itemCount = getTotalItems();
  const totalPrice = getTotalPrice();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Always animate in when component mounts
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Add a subtle bounce animation when items are added
    if (itemCount > 0) {
      const bounceAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1.05,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      bounceAnimation.start();

      return () => bounceAnimation.stop();
    } else {
      // Reset bounce when cart is empty
      bounceAnim.setValue(1);
    }
  }, [itemCount]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/checkout");
  };

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: insets.bottom + 100, // Above the floating navigation bar
          right: 20,
          zIndex: 9999,
          transform: [{ scale: scaleAnim }, { scale: bounceAnim }],
        },
        style,
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 32,
          width: 64,
          height: 64,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 12,
          borderWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Cart Icon with Badge */}
        <View style={{ position: "relative" }}>
          <Ionicons name="bag-outline" size={24} color="#1F2937" />

          {/* Item Count Badge */}
          {itemCount > 0 && (
            <View
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                backgroundColor: "#EF4444",
                borderRadius: 10,
                minWidth: 20,
                height: 20,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#FFFFFF",
              }}
            >
              <AppText
                variant="caption"
                weight="bold"
                color="white"
                style={{ fontSize: 10 }}
              >
                {itemCount > 99 ? "99+" : itemCount}
              </AppText>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
