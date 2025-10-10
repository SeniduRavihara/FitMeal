import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText } from "./AppText";

const { width: screenWidth } = Dimensions.get("window");

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "default" | "success" | "warning" | "error";
  showCancel?: boolean;
}

export function CustomAlert({
  visible,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  type = "default",
  showCancel = true,
}: CustomAlertProps) {
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const opacityValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const getTypeConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: "checkmark-circle",
          iconColor: "#34C759",
          backgroundColor: "#F0F9F0",
          borderColor: "#34C759",
        };
      case "warning":
        return {
          icon: "warning",
          iconColor: "#FF9500",
          backgroundColor: "#FFF8F0",
          borderColor: "#FF9500",
        };
      case "error":
        return {
          icon: "close-circle",
          iconColor: "#FF3B30",
          backgroundColor: "#FFF0F0",
          borderColor: "#FF3B30",
        };
      default:
        return {
          icon: "information-circle",
          iconColor: "#007AFF",
          backgroundColor: "#F0F9FF",
          borderColor: "#007AFF",
        };
    }
  };

  const typeConfig = getTypeConfig();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onCancel}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: opacityValue,
          },
        ]}
      >
        <BlurView intensity={20} style={StyleSheet.absoluteFill} />

        <Animated.View
          style={[
            styles.alertContainer,
            {
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          <View
            style={[
              styles.alertBox,
              {
                backgroundColor: typeConfig.backgroundColor,
                borderColor: typeConfig.borderColor,
              },
            ]}
          >
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Ionicons
                name={typeConfig.icon as any}
                size={48}
                color={typeConfig.iconColor}
              />
            </View>

            {/* Title */}
            <AppText
              variant="h3"
              weight="bold"
              color="primary"
              style={styles.title}
            >
              {title}
            </AppText>

            {/* Message */}
            <AppText variant="body" color="secondary" style={styles.message}>
              {message}
            </AppText>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              {showCancel && (
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={onCancel}
                  activeOpacity={0.8}
                >
                  <AppText variant="body" weight="semibold" color="secondary">
                    {cancelText}
                  </AppText>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.confirmButton,
                  {
                    backgroundColor: typeConfig.iconColor,
                    flex: showCancel ? 1 : 2,
                  },
                ]}
                onPress={onConfirm}
                activeOpacity={0.8}
              >
                <AppText variant="body" weight="semibold" color="white">
                  {confirmText}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  alertContainer: {
    width: screenWidth * 0.85,
    maxWidth: 400,
  },
  alertBox: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
  },
  message: {
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  confirmButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
