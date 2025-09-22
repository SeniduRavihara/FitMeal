import { Pressable, PressableProps, Text, ActivityIndicator } from "react-native";
import React from "react";
import { cn } from "../utils/cn";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
} & PressableProps;

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center justify-center rounded-2xl border-0",
        // Size variants
        size === "small" && "px-4 py-2 h-10",
        size === "medium" && "px-6 py-3 h-12",
        size === "large" && "px-8 py-4 h-14",
        // Color variants
        variant === "primary" && "bg-primary",
        variant === "secondary" && "bg-secondary",
        variant === "tertiary" && "bg-background-secondary",
        variant === "outline" && "bg-transparent border border-primary",
        // States
        isDisabled && "opacity-50",
        fullWidth && "w-full",
        // Shadow
        variant !== "outline" && "shadow-button",
      )}
      disabled={isDisabled}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === "primary" ? "white" : variant === "secondary" ? "white" : "#007AFF"} 
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            className={cn(
              "font-semibold text-base",
              // Size text
              size === "small" && "text-sm",
              size === "medium" && "text-base",
              size === "large" && "text-lg",
              // Color text
              variant === "primary" && "text-white",
              variant === "secondary" && "text-white",
              variant === "tertiary" && "text-text-primary",
              variant === "outline" && "text-primary",
              // Icon spacing
              icon && "ml-2",
            )}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}
