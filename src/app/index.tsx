import { View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { AppText } from "../components/AppText";
import { TabBar } from "../components/navigation/TabBar";
import { HomeScreen } from "../screens/HomeScreen";
import { SubscriptionsScreen } from "../screens/SubscriptionsScreen";
import { OrdersScreen } from "../screens/OrdersScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { TabName } from "../types";

export default function IndexScreen() {
  const [activeTab, setActiveTab] = useState<TabName>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'subscriptions':
        return <SubscriptionsScreen />;
      case 'orders':
        return <OrdersScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        {renderScreen()}
        <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}
