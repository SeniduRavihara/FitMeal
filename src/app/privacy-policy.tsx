import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";

export default function PrivacyPolicyPage() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-4 pb-2 bg-white border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#FB923C" />
          </TouchableOpacity>
          <AppText className="text-xl font-bold text-gray-900">
            Privacy Policy
          </AppText>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="py-6">
          <View className="bg-white rounded-xl p-6 shadow-sm">
            <AppText className="text-lg font-bold text-gray-900 mb-4">
              Last Updated: January 20, 2024
            </AppText>

            <View className="space-y-6">
              <View>
                <AppText className="text-lg font-semibold text-gray-900 mb-3">
                  1. Information We Collect
                </AppText>
                <AppText className="text-base text-gray-700 leading-6">
                  We collect information you provide directly to us, such as
                  when you create an account, place an order, or contact us for
                  support. This may include:
                </AppText>
                <View className="ml-4 mt-2">
                  <AppText className="text-base text-gray-700 leading-6">
                    • Name, email address, and phone number{"\n"}• Delivery
                    address and payment information{"\n"}• Dietary preferences
                    and health information{"\n"}• Order history and preferences
                    {"\n"}• Communication preferences
                  </AppText>
                </View>
              </View>

              <View>
                <AppText className="text-lg font-semibold text-gray-900 mb-3">
                  2. How We Use Your Information
                </AppText>
                <AppText className="text-base text-gray-700 leading-6">
                  We use the information we collect to:
                </AppText>
                <View className="ml-4 mt-2">
                  <AppText className="text-base text-gray-700 leading-6">
                    • Process and fulfill your orders{"\n"}• Provide customer
                    support and respond to inquiries{"\n"}• Send you important
                    updates about your orders{"\n"}• Improve our services and
                    develop new features{"\n"}• Send promotional materials (with
                    your consent){"\n"}• Comply with legal obligations
                  </AppText>
                </View>
              </View>

              <View>
                <AppText className="text-lg font-semibold text-gray-900 mb-3">
                  3. Information Sharing
                </AppText>
                <AppText className="text-base text-gray-700 leading-6">
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties except in the following
                  circumstances:
                </AppText>
                <View className="ml-4 mt-2">
                  <AppText className="text-base text-gray-700 leading-6">
                    • With service providers who assist us in operating our
                    business{"\n"}• When required by law or to protect our
                    rights{"\n"}• In connection with a business transfer or
                    merger{"\n"}• With your explicit consent
                  </AppText>
                </View>
              </View>

              <View>
                <AppText className="text-lg font-semibold text-gray-900 mb-3">
                  4. Data Security
                </AppText>
                <AppText className="text-base text-gray-700 leading-6">
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction. This includes:
                </AppText>
                <View className="ml-4 mt-2">
                  <AppText className="text-base text-gray-700 leading-6">
                    • Encryption of sensitive data{"\n"}• Secure servers and
                    databases{"\n"}• Regular security audits{"\n"}• Limited
                    access to personal information
                  </AppText>
                </View>
              </View>

              <View>
                <AppText className="text-lg font-semibold text-gray-900 mb-3">
                  5. Your Rights
                </AppText>
                <AppText className="text-base text-gray-700 leading-6">
                  You have the right to:
                </AppText>
                <View className="ml-4 mt-2">
                  <AppText className="text-base text-gray-700 leading-6">
                    • Access your personal information{"\n"}• Correct inaccurate
                    information{"\n"}• Delete your account and data{"\n"}•
                    Opt-out of marketing communications{"\n"}• Data portability
                  </AppText>
                </View>
              </View>

              <View>
                <AppText className="text-lg font-semibold text-gray-900 mb-3">
                  6. Cookies and Tracking
                </AppText>
                <AppText className="text-base text-gray-700 leading-6">
                  We use cookies and similar technologies to enhance your
                  experience, analyze usage patterns, and provide personalized
                  content. You can control cookie settings through your browser
                  preferences.
                </AppText>
              </View>

              <View>
                <AppText className="text-lg font-semibold text-gray-900 mb-3">
                  7. Children's Privacy
                </AppText>
                <AppText className="text-base text-gray-700 leading-6">
                  Our services are not intended for children under 13. We do not
                  knowingly collect personal information from children under 13.
                  If we become aware that we have collected such information, we
                  will take steps to delete it.
                </AppText>
              </View>

              <View>
                <AppText className="text-lg font-semibold text-gray-900 mb-3">
                  8. Changes to This Policy
                </AppText>
                <AppText className="text-base text-gray-700 leading-6">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last Updated" date.
                </AppText>
              </View>

              <View>
                <AppText className="text-lg font-semibold text-gray-900 mb-3">
                  9. Contact Us
                </AppText>
                <AppText className="text-base text-gray-700 leading-6">
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </AppText>
                <View className="ml-4 mt-2">
                  <AppText className="text-base text-gray-700 leading-6">
                    Email: privacy@fitmeal.com{"\n"}
                    Phone: 1-800-FITMEAL{"\n"}
                    Address: 123 Health Street, Wellness City, WC 12345
                  </AppText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
