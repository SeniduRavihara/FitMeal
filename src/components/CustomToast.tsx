import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { AppText } from "./AppText";

const { width: screenWidth } = Dimensions.get("window");

interface CustomToastProps {
  visible: boolean;
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  onHide: () => void;
}

export function CustomToast({
  visible,
  message,
  type = "info",
  duration = 3000,
  onHide,
}: CustomToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: -100,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  const getTypeConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: "checkmark-circle",
          backgroundColor: "#34C759",
          textColor: "#FFFFFF",
        };
      case "error":
        return {
          icon: "close-circle",
          backgroundColor: "#FF3B30",
          textColor: "#FFFFFF",
        };
      case "warning":
        return {
          icon: "warning",
          backgroundColor: "#FF9500",
          textColor: "#FFFFFF",
        };
      default:
        return {
          icon: "information-circle",
          backgroundColor: "#007AFF",
          textColor: "#FFFFFF",
        };
    }
  };

  const typeConfig = getTypeConfig();

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <BlurView intensity={20} style={StyleSheet.absoluteFill} />
      <View
        style={[
          styles.toast,
          {
            backgroundColor: typeConfig.backgroundColor,
          },
        ]}
      >
        <Ionicons
          name={typeConfig.icon as any}
          size={20}
          color={typeConfig.textColor}
          style={styles.icon}
        />
        <AppText
          variant="body"
          weight="medium"
          color="white"
          style={styles.message}
        >
          {message}
        </AppText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    marginRight: 12,
  },
  message: {
    flex: 1,
  },
});
