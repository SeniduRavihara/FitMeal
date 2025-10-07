import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { MealBase } from "../../types/mealBuilder";
import { AppText } from "../AppText";

interface MealBaseCardProps {
  mealBase: MealBase;
  onPress: () => void;
}

export function MealBaseCard({ mealBase, onPress }: MealBaseCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
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
      <Image
        source={{ uri: mealBase.image }}
        style={{
          width: "100%",
          height: 120,
          borderRadius: 12,
          marginBottom: 12,
        }}
        resizeMode="cover"
      />

      <View style={{ marginBottom: 8 }}>
        <AppText variant="h4" weight="semibold" color="primary">
          {mealBase.name}
        </AppText>
        <AppText variant="body" color="secondary" style={{ marginTop: 4 }}>
          {mealBase.description}
        </AppText>
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
            From
          </AppText>
          <AppText variant="h4" weight="bold" color="primary">
            LKR {mealBase.basePrice}
          </AppText>
        </View>

        <View
          style={{
            backgroundColor: "#F0F9FF",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
          }}
        >
          <AppText variant="caption" weight="medium" color="#2563EB">
            Customize
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
