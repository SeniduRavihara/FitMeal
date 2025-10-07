import { useCallback, useState } from "react";

interface AlertConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  type?: "default" | "success" | "warning" | "error";
  showCancel?: boolean;
}

export function useCustomAlert() {
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);
  const [visible, setVisible] = useState(false);

  const showAlert = useCallback((config: AlertConfig) => {
    setAlertConfig(config);
    setVisible(true);
  }, []);

  const hideAlert = useCallback(() => {
    setVisible(false);
    // Clear config after animation completes
    setTimeout(() => {
      setAlertConfig(null);
    }, 200);
  }, []);

  const handleConfirm = useCallback(() => {
    if (alertConfig?.onConfirm) {
      alertConfig.onConfirm();
    }
    hideAlert();
  }, [alertConfig, hideAlert]);

  const handleCancel = useCallback(() => {
    if (alertConfig?.onCancel) {
      alertConfig.onCancel();
    }
    hideAlert();
  }, [alertConfig, hideAlert]);

  // Convenience methods for common alert types
  const showSuccess = useCallback(
    (title: string, message: string, onConfirm?: () => void) => {
      showAlert({
        title,
        message,
        type: "success",
        confirmText: "Great!",
        showCancel: false,
        onConfirm,
      });
    },
    [showAlert]
  );

  const showError = useCallback(
    (title: string, message: string, onConfirm?: () => void) => {
      showAlert({
        title,
        message,
        type: "error",
        confirmText: "Try Again",
        showCancel: false,
        onConfirm,
      });
    },
    [showAlert]
  );

  const showWarning = useCallback(
    (
      title: string,
      message: string,
      onConfirm?: () => void,
      onCancel?: () => void
    ) => {
      showAlert({
        title,
        message,
        type: "warning",
        confirmText: "Continue",
        cancelText: "Cancel",
        onConfirm,
        onCancel,
      });
    },
    [showAlert]
  );

  const showConfirmation = useCallback(
    (
      title: string,
      message: string,
      onConfirm?: () => void,
      onCancel?: () => void
    ) => {
      showAlert({
        title,
        message,
        type: "default",
        confirmText: "Yes",
        cancelText: "No",
        onConfirm,
        onCancel,
      });
    },
    [showAlert]
  );

  return {
    visible,
    alertConfig,
    showAlert,
    hideAlert,
    handleConfirm,
    handleCancel,
    showSuccess,
    showError,
    showWarning,
    showConfirmation,
  };
}
