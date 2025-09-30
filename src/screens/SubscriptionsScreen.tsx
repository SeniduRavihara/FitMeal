import { View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";
import { Card } from "../components/common/Card";
import { Button } from "../components/Button";
import { SUBSCRIPTION_PLANS } from "../constants";

export function SubscriptionsScreen() {
  const handleSelectPlan = (planId: string) => {
    // TODO: Implement subscription selection
    console.log('Selected plan:', planId);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="px-4 pt-4 pb-2">
        <AppText variant="h2" weight="bold" className="mb-2">
          Choose Your Plan
        </AppText>
        <AppText variant="body" color="secondary">
          Get the most out of your fitness journey with our meal plans
        </AppText>
      </View>

      {/* Subscription Plans */}
      <View className="px-4 py-4 space-y-4">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <Card key={plan.id} className={`${plan.isPopular ? 'border-2 border-primary' : ''}`}>
            <View className="space-y-4">
              {/* Plan Header */}
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <AppText variant="h3" weight="bold">
                      {plan.name}
                    </AppText>
                    {plan.isPopular && (
                      <View className="bg-primary px-2 py-1 rounded-md ml-2">
                        <AppText variant="caption" weight="semibold" color="white">
                          POPULAR
                        </AppText>
                      </View>
                    )}
                  </View>
                  <AppText variant="body" color="secondary">
                    {plan.description}
                  </AppText>
                </View>
              </View>

              {/* Price */}
              <View className="flex-row items-baseline">
                <AppText variant="h2" weight="bold" color="accent">
                  ${plan.price}
                </AppText>
                {plan.originalPrice && (
                  <AppText variant="body" color="tertiary" className="ml-2 line-through">
                    ${plan.originalPrice}
                  </AppText>
                )}
                <AppText variant="body" color="secondary" className="ml-2">
                  / {plan.duration}
                </AppText>
              </View>

              {/* Plan Details */}
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <AppText variant="body" weight="medium">
                    {plan.mealsPerDay} meals per day
                  </AppText>
                </View>
                <View className="flex-row items-center">
                  <AppText variant="body" weight="medium">
                    {plan.mealsPerDay * (plan.duration === '3 days' ? 3 : plan.duration === '7 days' ? 7 : 30)} meals total
                  </AppText>
                </View>
              </View>

              {/* Features */}
              <View className="space-y-2">
                <AppText variant="bodySmall" weight="semibold" color="secondary">
                  What's included:
                </AppText>
                {plan.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center">
                    <AppText variant="body" color="secondary" className="mr-2">✓</AppText>
                    <AppText variant="bodySmall" color="secondary">
                      {feature}
                    </AppText>
                  </View>
                ))}
              </View>

              {/* CTA Button */}
              <Button
                title={plan.isPopular ? "Choose Popular Plan" : "Choose Plan"}
                variant={plan.isPopular ? "primary" : "outline"}
                fullWidth
                onPress={() => handleSelectPlan(plan.id)}
              />
            </View>
          </Card>
        ))}
      </View>

      {/* FAQ Section */}
      <View className="px-4 pb-6">
        <AppText variant="h3" weight="semibold" className="mb-4">
          Frequently Asked Questions
        </AppText>
        
        <Card className="mb-3">
          <AppText variant="h4" weight="semibold" className="mb-2">
            Can I cancel anytime?
          </AppText>
          <AppText variant="body" color="secondary">
            Yes, you can cancel your subscription at any time. No questions asked.
          </AppText>
        </Card>

        <Card className="mb-3">
          <AppText variant="h4" weight="semibold" className="mb-2">
            How does delivery work?
          </AppText>
          <AppText variant="body" color="secondary">
            We deliver fresh meals daily to your doorstep. You can choose your preferred delivery time.
          </AppText>
        </Card>

        <Card>
          <AppText variant="h4" weight="semibold" className="mb-2">
            Can I customize my meals?
          </AppText>
          <AppText variant="body" color="secondary">
            Absolutely! You can customize your meals based on your dietary preferences and fitness goals.
          </AppText>
        </Card>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
