import { Tabs } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { FloatingTabBarProfessional } from "../../components/navigation/FloatingTabBarProfessional";
import { TabName } from "../../types";

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState<TabName>("home");

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

        <FloatingTabBarProfessional
          activeTab={activeTab}
          onTabPress={(tab) => {
            setActiveTab(tab);
            // The tab navigation will handle the actual navigation
          }}
        />
      </View>
    </SafeAreaView>
  );
}
