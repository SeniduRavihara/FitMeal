import { MacroTargets, NutritionFocus } from "../types/mealBuilder";

/**
 * Calculate macros based on user's focus and target amount
 */
export const calculateMacros = (
  focus: NutritionFocus,
  targetAmount: number
): MacroTargets => {
  let protein: number;
  let carbs: number;
  let fats: number;
  let calories: number;

  switch (focus) {
    case "protein":
      // Protein-focused: High protein, moderate carbs, lower fats
      protein = targetAmount;
      carbs = Math.round(targetAmount * 0.6); // 60% of protein
      fats = Math.round(targetAmount * 0.4); // 40% of protein
      break;

    case "carbs":
      // Carb-focused: High carbs, moderate protein, lower fats
      carbs = targetAmount;
      protein = Math.round(targetAmount * 0.5); // 50% of carbs
      fats = Math.round(targetAmount * 0.3); // 30% of carbs
      break;

    case "fats":
      // Fat-focused: High fats, moderate protein, lower carbs
      fats = targetAmount;
      protein = Math.round(targetAmount * 1.5); // 150% of fats
      carbs = Math.round(targetAmount * 2); // 200% of fats
      break;

    case "balanced":
      // Balanced: Fixed ratio (35% protein, 35% carbs, 30% fats)
      protein = 45;
      carbs = 45;
      fats = 30;
      break;

    default:
      // Default to protein focus
      protein = targetAmount;
      carbs = Math.round(targetAmount * 0.6);
      fats = Math.round(targetAmount * 0.4);
  }

  // Calculate total calories (4 cal/g protein, 4 cal/g carbs, 9 cal/g fats)
  calories = protein * 4 + carbs * 4 + fats * 9;

  return {
    protein,
    carbs,
    fats,
    calories,
  };
};

/**
 * Calculate dynamic pricing based on customization
 */
export const calculateCustomizationPrice = (
  basePrice: number,
  focus: NutritionFocus,
  amount: number
): number => {
  let customizationFee = 0;

  // Define ranges for each nutrient type
  const ranges = {
    protein: { standard: 60, high: 80, max: 100 },
    carbs: { standard: 100, high: 130, max: 150 },
    fats: { standard: 35, high: 50, max: 60 },
    balanced: { standard: 45, high: 45, max: 45 },
  };

  const range = ranges[focus];

  if (focus === "balanced") {
    // Balanced option has no extra fee
    customizationFee = 0;
  } else if (amount <= range.standard) {
    // Standard range: no extra fee
    customizationFee = 0;
  } else if (amount <= range.high) {
    // High range: +LKR 150
    customizationFee = 150;
  } else {
    // Extra high range: +LKR 250
    customizationFee = 250;
  }

  return basePrice + customizationFee;
};

/**
 * Get the appropriate slider range for a given focus
 */
export const getSliderRange = (focus: NutritionFocus) => {
  switch (focus) {
    case "protein":
      return { min: 20, max: 100, step: 5 };
    case "carbs":
      return { min: 30, max: 150, step: 5 };
    case "fats":
      return { min: 10, max: 60, step: 5 };
    case "balanced":
      return { min: 45, max: 45, step: 1 }; // Fixed value
    default:
      return { min: 20, max: 100, step: 5 };
  }
};

/**
 * Format macro values for display
 */
export const formatMacroValue = (value: number, unit: string = "g"): string => {
  return `${Math.round(value)}${unit}`;
};

/**
 * Get macro percentage breakdown
 */
export const getMacroPercentages = (macros: MacroTargets) => {
  const totalCalories = macros.calories;

  const proteinCalories = macros.protein * 4;
  const carbCalories = macros.carbs * 4;
  const fatCalories = macros.fats * 9;

  return {
    protein: Math.round((proteinCalories / totalCalories) * 100),
    carbs: Math.round((carbCalories / totalCalories) * 100),
    fats: Math.round((fatCalories / totalCalories) * 100),
  };
};

/**
 * Validate if target amount is within meal base limits
 */
export const validateTargetAmount = (
  focus: NutritionFocus,
  amount: number,
  mealBaseLimits: { min: number; max: number }
): boolean => {
  return amount >= mealBaseLimits.min && amount <= mealBaseLimits.max;
};
