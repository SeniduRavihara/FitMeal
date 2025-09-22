import { View } from "react-native";
import React from "react";
import { AppText } from "../AppText";
import { Card } from "../common/Card";
import { Nutrition } from "../../types";

type NutritionCardProps = {
  nutrition: Nutrition;
  showDetails?: boolean;
  className?: string;
};

export function NutritionCard({ nutrition, showDetails = false, className }: NutritionCardProps) {
  const { calories, protein, carbs, fats, fiber, sugar, sodium, vitamins, minerals } = nutrition;

  return (
    <Card className={className}>
      <View className="space-y-3">
        <AppText variant="h4" weight="semibold">
          Nutrition Facts
        </AppText>
        
        {/* Main macros */}
        <View className="space-y-2">
          <View className="flex-row justify-between items-center">
            <AppText variant="body" weight="medium">Calories</AppText>
            <AppText variant="body" weight="semibold" color="accent">{calories}</AppText>
          </View>
          
          <View className="flex-row justify-between items-center">
            <AppText variant="body" weight="medium">Protein</AppText>
            <AppText variant="body" weight="semibold">{protein}g</AppText>
          </View>
          
          <View className="flex-row justify-between items-center">
            <AppText variant="body" weight="medium">Carbs</AppText>
            <AppText variant="body" weight="semibold">{carbs}g</AppText>
          </View>
          
          <View className="flex-row justify-between items-center">
            <AppText variant="body" weight="medium">Fats</AppText>
            <AppText variant="body" weight="semibold">{fats}g</AppText>
          </View>
        </View>

        {showDetails && (
          <>
            {/* Additional details */}
            <View className="border-t border-border pt-3 space-y-2">
              <View className="flex-row justify-between items-center">
                <AppText variant="bodySmall" color="secondary">Fiber</AppText>
                <AppText variant="bodySmall" weight="medium">{fiber}g</AppText>
              </View>
              
              <View className="flex-row justify-between items-center">
                <AppText variant="bodySmall" color="secondary">Sugar</AppText>
                <AppText variant="bodySmall" weight="medium">{sugar}g</AppText>
              </View>
              
              <View className="flex-row justify-between items-center">
                <AppText variant="bodySmall" color="secondary">Sodium</AppText>
                <AppText variant="bodySmall" weight="medium">{sodium}mg</AppText>
              </View>
            </View>

            {/* Vitamins and minerals */}
            {(vitamins.length > 0 || minerals.length > 0) && (
              <View className="border-t border-border pt-3 space-y-2">
                {vitamins.length > 0 && (
                  <View>
                    <AppText variant="bodySmall" weight="medium" color="secondary" className="mb-1">
                      Vitamins
                    </AppText>
                    <View className="flex-row flex-wrap">
                      {vitamins.map((vitamin, index) => (
                        <View key={index} className="bg-primary-50 px-2 py-1 rounded-md mr-2 mb-1">
                          <AppText variant="caption" weight="medium" color="primary">
                            {vitamin}
                          </AppText>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
                
                {minerals.length > 0 && (
                  <View>
                    <AppText variant="bodySmall" weight="medium" color="secondary" className="mb-1">
                      Minerals
                    </AppText>
                    <View className="flex-row flex-wrap">
                      {minerals.map((mineral, index) => (
                        <View key={index} className="bg-secondary-50 px-2 py-1 rounded-md mr-2 mb-1">
                          <AppText variant="caption" weight="medium" color="secondary">
                            {mineral}
                          </AppText>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </View>
    </Card>
  );
}
