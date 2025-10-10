import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TabName } from "../../types";

const { width } = Dimensions.get("window");

interface SimpleBottomNavProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

const tabs = [
  {
    id: "home" as TabName,
    label: "Home",
    icon: "home",
  },
  {
    id: "subscriptions" as TabName,
    label: "Plans",
    icon: "calendar",
  },
  {
    id: "orders" as TabName,
    label: "Orders",
    icon: "receipt",
  },
  {
    id: "profile" as TabName,
    label: "Profile",
    icon: "person",
  },
];

export const SimpleBottomNav: React.FC<SimpleBottomNavProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <Ionicons
                name={tab.icon as any}
                size={28}
                color={isActive ? "#007AFF" : "#666666"}
              />
              <Text style={[styles.label, isActive && styles.activeLabel]}>
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingBottom: 20,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
    marginTop: 4,
    textAlign: "center",
  },
  activeLabel: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
