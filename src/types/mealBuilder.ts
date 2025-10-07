// Custom Meal Builder Types

export type NutritionFocus = 'protein' | 'carbs' | 'fats' | 'balanced';

export interface MacroTargets {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export interface MealCustomization {
  focus: NutritionFocus;
  targetAmount: number; // grams
  calculatedMacros: MacroTargets;
}

export interface MealBase {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  ingredients: string[];
  availableCustomizations: {
    protein: { min: number; max: number; default: number };
    carbs: { min: number; max: number; default: number };
    fats: { min: number; max: number; default: number };
  };
}

export interface CustomMealOrder {
  id: string;
  mealBase: MealBase;
  customization: MealCustomization;
  quantity: number;
  pricePerItem: number;
  totalPrice: number;
  createdAt: string;
}

export interface NutritionFocusOption {
  id: NutritionFocus;
  title: string;
  description: string;
  icon: string;
  color: string;
  lightColor: string;
}

// Quick select preset values for each nutrient
export const QUICK_SELECT_PRESETS = {
  protein: [30, 45, 60, 75, 90],
  carbs: [50, 80, 100, 120, 150],
  fats: [15, 25, 35, 45, 60],
  balanced: [45, 45, 30] // protein, carbs, fats
} as const;

// Nutrition focus options with colors
export const NUTRITION_FOCUS_OPTIONS: NutritionFocusOption[] = [
  {
    id: 'protein',
    title: 'Protein',
    description: 'Target your protein intake',
    icon: '💪',
    color: '#FF6B6B',
    lightColor: '#FFE5E5'
  },
  {
    id: 'carbs',
    title: 'Carbohydrates',
    description: 'Energy for workouts',
    icon: '🍚',
    color: '#4ECDC4',
    lightColor: '#E5F9F7'
  },
  {
    id: 'fats',
    title: 'Fats',
    description: 'Healthy fats & nutrients',
    icon: '🥑',
    color: '#95E1D3',
    lightColor: '#E8F8F5'
  },
  {
    id: 'balanced',
    title: 'Balanced',
    description: 'All macros optimized',
    icon: '⚖️',
    color: '#A8E6CF',
    lightColor: '#E8F8F5'
  }
];
