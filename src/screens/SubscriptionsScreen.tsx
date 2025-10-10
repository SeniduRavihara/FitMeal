import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";
import { SUBSCRIPTION_PLANS } from "../constants";

export function SubscriptionsScreen() {
  const handleSelectPlan = (planId: string) => {
    // TODO: Implement subscription selection
    console.log("Selected plan:", planId);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <AppText className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Choose Your Plan
          </AppText>
          <AppText className="text-base text-gray-500 text-center">
            Get the most out of your fitness journey with our meal plans
          </AppText>
        </View>

        {/* Subscription Plans */}
        <View className="px-6 space-y-4">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <View
              key={plan.id}
              className={`bg-white rounded-2xl p-6 shadow-sm ${plan.isPopular ? "border-2 border-orange-500" : "border border-gray-200"}`}
            >
              {/* Plan Header */}
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <AppText className="text-xl font-bold text-gray-900">
                      {plan.name}
                    </AppText>
                    {plan.isPopular && (
                      <View className="bg-orange-500 px-3 py-1 rounded-full ml-3">
                        <AppText className="text-xs font-semibold text-white">
                          MOST POPULAR
                        </AppText>
                      </View>
                    )}
                  </View>
                  <AppText className="text-base text-gray-600">
                    {plan.description}
                  </AppText>
                </View>
              </View>

              {/* Price */}
              <View className="flex-row items-baseline mb-4">
                <AppText className="text-3xl font-bold text-orange-500">
                  ${plan.price}
                </AppText>
                {plan.originalPrice && (
                  <AppText className="text-lg text-gray-400 line-through ml-2">
                    ${plan.originalPrice}
                  </AppText>
                )}
                <AppText className="text-base text-gray-600 ml-2">
                  / {plan.duration}
                </AppText>
                {plan.originalPrice && (
                  <View className="bg-green-100 px-2 py-1 rounded-lg ml-3">
                    <AppText className="text-xs font-semibold text-green-600">
                      Save ${plan.originalPrice - plan.price}
                    </AppText>
                  </View>
                )}
              </View>

              {/* Features */}
              <View className="space-y-3 mb-6">
                <AppText className="text-sm font-semibold text-gray-700">
                  What's included:
                </AppText>
                {plan.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center">
                    <View className="w-5 h-5 bg-green-100 rounded-full items-center justify-center mr-3">
                      <Ionicons name="checkmark" size={12} color="#10B981" />
                    </View>
                    <AppText className="text-sm text-gray-600 flex-1">
                      {feature}
                    </AppText>
                  </View>
                ))}
              </View>

              {/* CTA Button */}
              <TouchableOpacity
                className={`py-4 px-6 rounded-xl ${plan.isPopular ? "bg-orange-500" : "border border-orange-500"}`}
                onPress={() => handleSelectPlan(plan.id)}
              >
                <AppText
                  className={`text-center font-semibold ${plan.isPopular ? "text-white" : "text-orange-500"}`}
                >
                  {plan.isPopular ? "Choose Popular Plan" : "Choose Plan"}
                </AppText>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* FAQ Section */}
        <View className="px-6 pb-6 mt-8">
          <AppText className="text-xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </AppText>

          <View className="bg-white rounded-2xl p-6 shadow-sm mb-4">
            <AppText className="text-base font-semibold text-gray-900 mb-2">
              Can I cancel anytime?
            </AppText>
            <AppText className="text-sm text-gray-600">
              Yes, you can cancel your subscription at any time. No questions
              asked.
            </AppText>
          </View>

          <View className="bg-white rounded-2xl p-6 shadow-sm mb-4">
            <AppText className="text-base font-semibold text-gray-900 mb-2">
              How does delivery work?
            </AppText>
            <AppText className="text-sm text-gray-600">
              We deliver fresh meals daily to your doorstep. You can choose your
              preferred delivery time.
            </AppText>
          </View>

          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <AppText className="text-base font-semibold text-gray-900 mb-2">
              Can I customize my meals?
            </AppText>
            <AppText className="text-sm text-gray-600">
              Absolutely! You can customize your meals based on your dietary
              preferences and fitness goals.
            </AppText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
