import { Tabs, useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { SimpleBottomNav } from "../../components/navigation/SimpleBottomNav";
import { TabName } from "../../types";

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState<TabName>("home");
  const router = useRouter();

  const handleTabPress = (tab: TabName) => {
    setActiveTab(tab);

    // Navigate to the correct tab
    switch (tab) {
      case "home":
        router.push("/(tabs)/");
        break;
      case "subscriptions":
        router.push("/(tabs)/subscriptions");
        break;
      case "orders":
        router.push("/(tabs)/orders");
        break;
      case "profile":
        router.push("/(tabs)/profile");
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarStyle: {
              display: "none", // Hide the default tab bar
            },
            headerShown: false,
          }}
          screenListeners={{
            state: (e) => {
              // Update active tab when navigation changes
              const state = e.data.state;
              if (state) {
                const routeName = state.routes[state.index]?.name;
                if (routeName) {
                  // Map route names to TabName
                  const tabMapping: Record<string, TabName> = {
                    index: "home",
                    subscriptions: "subscriptions",
                    orders: "orders",
                    profile: "profile",
                  };
                  const mappedTab = tabMapping[routeName];
                  if (mappedTab && mappedTab !== activeTab) {
                    setActiveTab(mappedTab);
                  }
                }
              }
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
            }}
          />
          <Tabs.Screen
            name="subscriptions"
            options={{
              title: "Plans",
            }}
          />
          <Tabs.Screen
            name="orders"
            options={{
              title: "Orders",
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
            }}
          />
        </Tabs>

        <SimpleBottomNav activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    </SafeAreaView>
  );
}
