import { Text, TextProps } from "react-native";
import { cn } from "../utils/cn";

type AppTextProps = {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "bodySmall" | "caption" | "label";
  weight?: "regular" | "medium" | "semibold" | "bold";
  color?: "primary" | "secondary" | "tertiary" | "accent" | "white";
  center?: boolean;
  numberOfLines?: number;
  className?: string;
} & TextProps;

export function AppText({
  children,
  variant = "body",
  weight = "regular",
  color = "primary",
  center = false,
  numberOfLines,
  className,
  ...rest
}: AppTextProps) {
  return (
    <Text
      className={cn(
        "font-system",
        // Variants
        variant === "h1" && "text-4xl leading-10",
        variant === "h2" && "text-3xl leading-9",
        variant === "h3" && "text-2xl leading-8",
        variant === "h4" && "text-xl leading-7",
        variant === "body" && "text-base leading-6",
        variant === "bodySmall" && "text-sm leading-5",
        variant === "caption" && "text-xs leading-4",
        variant === "label" && "text-sm leading-5",
        // Weights
        weight === "regular" && "font-normal",
        weight === "medium" && "font-medium",
        weight === "semibold" && "font-semibold",
        weight === "bold" && "font-bold",
        // Colors
        color === "primary" && "text-text-primary",
        color === "secondary" && "text-text-secondary",
        color === "tertiary" && "text-text-tertiary",
        color === "accent" && "text-accent",
        color === "white" && "text-white",
        // Alignment
        center && "text-center",
        className,
      )}
      numberOfLines={numberOfLines}
      {...rest}
    >
      {children}
    </Text>
  );
}
