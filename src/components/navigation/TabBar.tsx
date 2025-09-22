import { View, Pressable } from "react-native";
import React from "react";
import { AppText } from "../AppText";
import { cn } from "../../utils/cn";
import { TabName } from "../../types";

type TabBarProps = {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
};

const tabs = [
  { id: 'home' as TabName, label: 'Home', icon: '🏠' },
  { id: 'subscriptions' as TabName, label: 'Plans', icon: '📅' },
  { id: 'orders' as TabName, label: 'Orders', icon: '📦' },
  { id: 'profile' as TabName, label: 'Profile', icon: '👤' },
];

export function TabBar({ activeTab, onTabPress }: TabBarProps) {
  return (
    <View className="flex-row bg-white border-t border-border px-2 py-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <Pressable
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            className={cn(
              "flex-1 items-center py-2 px-1",
              isActive && "bg-primary-50 rounded-xl"
            )}
          >
            <View className="items-center space-y-1">
              <AppText 
                variant="body" 
                className={cn(
                  isActive ? "text-primary" : "text-text-secondary"
                )}
              >
                {tab.icon}
              </AppText>
              <AppText 
                variant="caption" 
                weight="medium"
                color={isActive ? "primary" : "secondary"}
              >
                {tab.label}
              </AppText>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
