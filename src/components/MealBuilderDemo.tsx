import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";

interface MealBuilderDemoProps {
  onPress: () => void;
}

export function MealBuilderDemo({ onPress }: MealBuilderDemoProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 2,
        borderColor: "#FF6B6B",
        borderStyle: "dashed",
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            backgroundColor: "#FF6B6B",
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
          }}
        >
          <Ionicons name="build-outline" size={24} color="#FFFFFF" />
        </View>

        <View style={{ flex: 1 }}>
          <AppText variant="h3" weight="bold" color="primary">
            🎯 Custom Meal Builder
          </AppText>
          <AppText variant="body" color="secondary" style={{ marginTop: 4 }}>
            NEW: Build meals with exact nutrition targets
          </AppText>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#F0F9FF",
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <AppText
          variant="body"
          weight="semibold"
          color="primary"
          style={{ marginBottom: 8 }}
        >
          ✨ 3-Click Ordering System
        </AppText>
        <View style={{ gap: 4 }}>
          <AppText variant="caption" color="secondary">
            1️⃣ Select meal base (Chicken, Salmon, etc.)
          </AppText>
          <AppText variant="caption" color="secondary">
            2️⃣ Choose nutrition focus & amount
          </AppText>
          <AppText variant="caption" color="secondary">
            3️⃣ Add to cart or order now
          </AppText>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <AppText variant="caption" color="secondary">
            Perfect for
          </AppText>
          <AppText variant="body" weight="semibold" color="primary">
            Fitness Enthusiasts
          </AppText>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FF6B6B",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
          }}
        >
          <AppText variant="caption" weight="bold" color="white">
            Try Now
          </AppText>
          <Ionicons
            name="arrow-forward"
            size={14}
            color="white"
            style={{ marginLeft: 4 }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
