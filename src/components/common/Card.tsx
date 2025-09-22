import { View, ViewProps } from "react-native";
import React from "react";
import { cn } from "../../utils/cn";

type CardProps = {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
} & ViewProps;

export function Card({
  children,
  variant = "default",
  padding = "md",
  className,
  ...rest
}: CardProps) {
  return (
    <View
      className={cn(
        "bg-card rounded-2xl",
        // Variants
        variant === "default" && "shadow-card",
        variant === "elevated" && "shadow-lg",
        variant === "outlined" && "border border-border",
        // Padding
        padding === "none" && "p-0",
        padding === "sm" && "p-3",
        padding === "md" && "p-4",
        padding === "lg" && "p-6",
        className,
      )}
      {...rest}
    >
      {children}
    </View>
  );
}
