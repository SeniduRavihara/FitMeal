import { useCallback, useState } from "react";

interface ToastConfig {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
}

export function useCustomToast() {
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((config: ToastConfig) => {
    setToastConfig(config);
    setVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setVisible(false);
    // Clear config after animation completes
    setTimeout(() => {
      setToastConfig(null);
    }, 200);
  }, []);

  // Convenience methods
  const showSuccess = useCallback(
    (message: string, duration = 3000) => {
      showToast({ message, type: "success", duration });
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string, duration = 4000) => {
      showToast({ message, type: "error", duration });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, duration = 3000) => {
      showToast({ message, type: "info", duration });
    },
    [showToast]
  );

  const showWarning = useCallback(
    (message: string, duration = 3500) => {
      showToast({ message, type: "warning", duration });
    },
    [showToast]
  );

  return {
    visible,
    toastConfig,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
}
