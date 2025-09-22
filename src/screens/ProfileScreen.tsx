import { View, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import { AppText } from "../components/AppText";
import { Card } from "../components/common/Card";
import { Button } from "../components/Button";
import { DUMMY_USER, DUMMY_USER_SUBSCRIPTION } from "../data/dummyData";
import { FITNESS_GOALS } from "../constants";

export function ProfileScreen() {
  const handleEditProfile = () => {
    // TODO: Navigate to edit profile
    console.log('Edit profile');
  };

  const handleSettings = (setting: string) => {
    // TODO: Navigate to specific setting
    console.log('Navigate to:', setting);
  };

  const userGoal = FITNESS_GOALS.find(goal => goal.id === DUMMY_USER.fitnessGoal);

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="px-4 pt-4 pb-2">
        <AppText variant="h2" weight="bold" className="mb-2">
          Profile
        </AppText>
      </View>

      {/* User Info Card */}
      <View className="px-4 py-4">
        <Card>
          <View className="items-center space-y-4">
            <Image
              source={{ uri: DUMMY_USER.avatar }}
              className="w-20 h-20 rounded-full"
              resizeMode="cover"
            />
            
            <View className="items-center">
              <AppText variant="h3" weight="bold">
                {DUMMY_USER.name}
              </AppText>
              <AppText variant="body" color="secondary">
                {DUMMY_USER.email}
              </AppText>
            </View>

            <View className="flex-row items-center bg-primary-50 px-3 py-2 rounded-full">
              <AppText variant="body" className="mr-2">
                {userGoal?.icon}
              </AppText>
              <AppText variant="bodySmall" weight="medium" color="primary">
                {userGoal?.name}
              </AppText>
            </View>

            <Button
              title="Edit Profile"
              variant="outline"
              size="small"
              onPress={handleEditProfile}
            />
          </View>
        </Card>
      </View>

      {/* Stats */}
      <View className="px-4 pb-4">
        <AppText variant="h3" weight="semibold" className="mb-3">
          Your Stats
        </AppText>
        
        <View className="flex-row space-x-3">
          <Card className="flex-1">
            <View className="items-center py-3">
              <AppText variant="h2" weight="bold" color="primary">
                12
              </AppText>
              <AppText variant="caption" color="secondary" center>
                Orders This Month
              </AppText>
            </View>
          </Card>
          
          <Card className="flex-1">
            <View className="items-center py-3">
              <AppText variant="h2" weight="bold" color="secondary">
                2,340
              </AppText>
              <AppText variant="caption" color="secondary" center>
                Calories Saved
              </AppText>
            </View>
          </Card>
          
          <Card className="flex-1">
            <View className="items-center py-3">
              <AppText variant="h2" weight="bold" color="accent">
                15
              </AppText>
              <AppText variant="caption" color="secondary" center>
                Meals Remaining
              </AppText>
            </View>
          </Card>
        </View>
      </View>

      {/* Current Subscription */}
      <View className="px-4 pb-4">
        <AppText variant="h3" weight="semibold" className="mb-3">
          Current Plan
        </AppText>
        
        <Card>
          <View className="space-y-3">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <AppText variant="h4" weight="semibold">
                  {DUMMY_USER_SUBSCRIPTION.subscription.name}
                </AppText>
                <AppText variant="body" color="secondary">
                  {DUMMY_USER_SUBSCRIPTION.mealsRemaining} meals remaining
                </AppText>
              </View>
              <View className="bg-secondary-50 px-2 py-1 rounded-md">
                <AppText variant="caption" weight="semibold" color="secondary">
                  {DUMMY_USER_SUBSCRIPTION.status.toUpperCase()}
                </AppText>
              </View>
            </View>
            
            <View className="flex-row justify-between items-center">
              <AppText variant="bodySmall" color="secondary">
                Next delivery: {DUMMY_USER_SUBSCRIPTION.nextDelivery.toLocaleDateString()}
              </AppText>
              <Button
                title="Manage"
                variant="outline"
                size="small"
                onPress={() => handleSettings('subscription')}
              />
            </View>
          </View>
        </Card>
      </View>

      {/* Settings Menu */}
      <View className="px-4 pb-6">
        <AppText variant="h3" weight="semibold" className="mb-3">
          Settings
        </AppText>
        
        <Card className="mb-3">
          <Pressable onPress={() => handleSettings('personal-info')} className="py-3">
            <View className="flex-row items-center">
              <AppText variant="body" className="mr-3">👤</AppText>
              <AppText variant="body" weight="medium" className="flex-1">
                Personal Information
              </AppText>
              <AppText variant="body" color="secondary">›</AppText>
            </View>
          </Pressable>
        </Card>

        <Card className="mb-3">
          <Pressable onPress={() => handleSettings('dietary-preferences')} className="py-3">
            <View className="flex-row items-center">
              <AppText variant="body" className="mr-3">🥗</AppText>
              <AppText variant="body" weight="medium" className="flex-1">
                Dietary Preferences
              </AppText>
              <AppText variant="body" color="secondary">›</AppText>
            </View>
          </Pressable>
        </Card>

        <Card className="mb-3">
          <Pressable onPress={() => handleSettings('notifications')} className="py-3">
            <View className="flex-row items-center">
              <AppText variant="body" className="mr-3">🔔</AppText>
              <AppText variant="body" weight="medium" className="flex-1">
                Notification Settings
              </AppText>
              <AppText variant="body" color="secondary">›</AppText>
            </View>
          </Pressable>
        </Card>

        <Card className="mb-3">
          <Pressable onPress={() => handleSettings('payment-methods')} className="py-3">
            <View className="flex-row items-center">
              <AppText variant="body" className="mr-3">💳</AppText>
              <AppText variant="body" weight="medium" className="flex-1">
                Payment Methods
              </AppText>
              <AppText variant="body" color="secondary">›</AppText>
            </View>
          </Pressable>
        </Card>

        <Card className="mb-3">
          <Pressable onPress={() => handleSettings('order-history')} className="py-3">
            <View className="flex-row items-center">
              <AppText variant="body" className="mr-3">📋</AppText>
              <AppText variant="body" weight="medium" className="flex-1">
                Order History
              </AppText>
              <AppText variant="body" color="secondary">›</AppText>
            </View>
          </Pressable>
        </Card>

        <Card className="mb-3">
          <Pressable onPress={() => handleSettings('help-support')} className="py-3">
            <View className="flex-row items-center">
              <AppText variant="body" className="mr-3">❓</AppText>
              <AppText variant="body" weight="medium" className="flex-1">
                Help & Support
              </AppText>
              <AppText variant="body" color="secondary">›</AppText>
            </View>
          </Pressable>
        </Card>

        <Card>
          <Pressable onPress={() => handleSettings('about')} className="py-3">
            <View className="flex-row items-center">
              <AppText variant="body" className="mr-3">ℹ️</AppText>
              <AppText variant="body" weight="medium" className="flex-1">
                About
              </AppText>
              <AppText variant="body" color="secondary">›</AppText>
            </View>
          </Pressable>
        </Card>
      </View>
    </ScrollView>
  );
}
