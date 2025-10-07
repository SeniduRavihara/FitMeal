import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useCustomAlert } from "../hooks/useCustomAlert";
import { AppText } from "./AppText";
import { CustomAlert } from "./CustomAlert";

export function CustomAlertDemo() {
  const {
    showSuccess,
    showError,
    showWarning,
    showConfirmation,
    visible,
    alertConfig,
    handleConfirm,
    handleCancel,
  } = useCustomAlert();

  return (
    <View style={{ padding: 20, gap: 16 }}>
      <AppText
        variant="h3"
        weight="bold"
        color="primary"
        style={{ marginBottom: 16 }}
      >
        Custom Alert Demo
      </AppText>

      <TouchableOpacity
        style={{
          backgroundColor: "#34C759",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
        }}
        onPress={() =>
          showSuccess(
            "Success! 🎉",
            "Your custom meal has been added to cart successfully!"
          )
        }
      >
        <AppText variant="body" weight="semibold" color="white">
          Show Success Alert
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#FF3B30",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
        }}
        onPress={() =>
          showError("Error! ❌", "Something went wrong. Please try again.")
        }
      >
        <AppText variant="body" weight="semibold" color="white">
          Show Error Alert
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#FF9500",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
        }}
        onPress={() =>
          showWarning(
            "Warning! ⚠️",
            "This action will remove all items from your cart."
          )
        }
      >
        <AppText variant="body" weight="semibold" color="white">
          Show Warning Alert
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#007AFF",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
        }}
        onPress={() =>
          showConfirmation(
            "Confirm Action",
            "Are you sure you want to proceed with this action?"
          )
        }
      >
        <AppText variant="body" weight="semibold" color="white">
          Show Confirmation Alert
        </AppText>
      </TouchableOpacity>

      {/* Custom Alert */}
      {alertConfig && (
        <CustomAlert
          visible={visible}
          title={alertConfig.title}
          message={alertConfig.message}
          confirmText={alertConfig.confirmText}
          cancelText={alertConfig.cancelText}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          type={alertConfig.type}
          showCancel={alertConfig.showCancel}
        />
      )}
    </View>
  );
}
