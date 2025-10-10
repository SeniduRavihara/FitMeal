import { Subscription } from "../types";

export const APP_CONFIG = {
  name: "FitMeal",
  version: "1.0.0",
  description: "Nutrition meets convenience",
};

export const COLORS = {
  primary: "#007AFF",
  secondary: "#34C759",
  accent: "#FF3B30",
  background: "#FFFFFF",
  backgroundSecondary: "#F8F9FA",
  textPrimary: "#1D1D1F",
  textSecondary: "#86868B",
  textTertiary: "#C7C7CC",
  card: "#FFFFFF",
  border: "#E5E5EA",
  shadow: "rgba(0,0,0,0.08)",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  fontFamily: "system",
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },
  weights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const MEAL_CATEGORIES = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "protein_rich", name: "Protein Rich", icon: "🥩" },
  { id: "low_carb", name: "Low Carb", icon: "🥗" },
  { id: "vegan", name: "Vegan", icon: "🌱" },
  { id: "keto", name: "Keto", icon: "🥑" },
  { id: "breakfast", name: "Breakfast", icon: "🍳" },
  { id: "lunch", name: "Lunch", icon: "🍱" },
  { id: "dinner", name: "Dinner", icon: "🍽️" },
  { id: "snacks", name: "Snacks", icon: "🥜" },
];

export const FITNESS_GOALS = [
  {
    id: "muscle_gain",
    name: "Muscle Gain",
    icon: "💪",
    description: "Build lean muscle mass",
  },
  {
    id: "fat_loss",
    name: "Fat Loss",
    icon: "🔥",
    description: "Burn fat and get lean",
  },
  {
    id: "maintenance",
    name: "Maintenance",
    icon: "⚖️",
    description: "Maintain current weight",
  },
];

export const SUBSCRIPTION_PLANS: Subscription[] = [
  {
    id: "3_days",
    name: "3-Day Trial",
    duration: "3_days",
    mealsPerDay: 2,
    price: 29.99,
    originalPrice: 39.99,
    features: [
      "6 meals total",
      "Free delivery",
      "Nutrition tracking",
      "Cancel anytime",
    ],
    isPopular: false,
    description: "Perfect for trying out our service",
  },
  {
    id: "7_days",
    name: "Weekly Plan",
    duration: "7_days",
    mealsPerDay: 3,
    price: 69.99,
    originalPrice: 89.99,
    features: [
      "21 meals total",
      "Free delivery",
      "Nutrition tracking",
      "Meal customization",
      "Priority support",
    ],
    isPopular: true,
    description: "Most popular choice for busy professionals",
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    duration: "monthly",
    mealsPerDay: 3,
    price: 249.99,
    originalPrice: 329.99,
    features: [
      "90 meals total",
      "Free delivery",
      "Nutrition tracking",
      "Meal customization",
      "Priority support",
      "Exclusive recipes",
      "Personal nutritionist chat",
    ],
    isPopular: false,
    description: "Best value for committed health enthusiasts",
  },
];

export const ORDER_STATUS = {
  pending: { label: "Pending", color: "#FF9500" },
  confirmed: { label: "Confirmed", color: "#007AFF" },
  preparing: { label: "Preparing", color: "#5856D6" },
  out_for_delivery: { label: "Out for Delivery", color: "#34C759" },
  delivered: { label: "Delivered", color: "#34C759" },
  cancelled: { label: "Cancelled", color: "#FF3B30" },
};

export const VITAMINS = [
  "A",
  "B1",
  "B2",
  "B3",
  "B5",
  "B6",
  "B7",
  "B9",
  "B12",
  "C",
  "D",
  "E",
  "K",
];

export const MINERALS = [
  "Calcium",
  "Iron",
  "Magnesium",
  "Phosphorus",
  "Potassium",
  "Sodium",
  "Zinc",
  "Copper",
  "Manganese",
  "Selenium",
];
