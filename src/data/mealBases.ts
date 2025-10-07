import { MealBase } from "../types/mealBuilder";

export const MEAL_BASES: MealBase[] = [
  {
    id: "chicken-bowl",
    name: "Chicken Bowl",
    description: "Grilled chicken with your custom macros",
    basePrice: 1200,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    ingredients: ["Chicken breast", "Rice", "Vegetables", "Sauce"],
    availableCustomizations: {
      protein: { min: 20, max: 100, default: 45 },
      carbs: { min: 30, max: 150, default: 60 },
      fats: { min: 10, max: 60, default: 25 },
    },
  },
  {
    id: "salmon-bowl",
    name: "Salmon Bowl",
    description: "Fresh salmon with customizable nutrients",
    basePrice: 1450,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    ingredients: ["Salmon fillet", "Quinoa", "Greens", "Avocado"],
    availableCustomizations: {
      protein: { min: 20, max: 100, default: 42 },
      carbs: { min: 30, max: 150, default: 50 },
      fats: { min: 10, max: 60, default: 28 },
    },
  },
  {
    id: "beef-bowl",
    name: "Beef Bowl",
    description: "Premium beef with your macro targets",
    basePrice: 1350,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    ingredients: ["Beef sirloin", "Sweet potato", "Broccoli", "Olive oil"],
    availableCustomizations: {
      protein: { min: 25, max: 120, default: 50 },
      carbs: { min: 25, max: 140, default: 55 },
      fats: { min: 15, max: 70, default: 30 },
    },
  },
  {
    id: "tofu-bowl",
    name: "Tofu Bowl",
    description: "Plant-based protein with custom nutrition",
    basePrice: 1100,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    ingredients: ["Tofu", "Brown rice", "Vegetables", "Tahini"],
    availableCustomizations: {
      protein: { min: 15, max: 80, default: 35 },
      carbs: { min: 35, max: 160, default: 65 },
      fats: { min: 12, max: 65, default: 22 },
    },
  },
  {
    id: "turkey-bowl",
    name: "Turkey Bowl",
    description: "Lean turkey with macro customization",
    basePrice: 1250,
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    ingredients: ["Turkey breast", "Wild rice", "Asparagus", "Herbs"],
    availableCustomizations: {
      protein: { min: 20, max: 95, default: 48 },
      carbs: { min: 30, max: 145, default: 58 },
      fats: { min: 8, max: 55, default: 20 },
    },
  },
  {
    id: "veggie-bowl",
    name: "Veggie Bowl",
    description: "Nutrient-dense vegetables with custom macros",
    basePrice: 1000,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    ingredients: ["Mixed vegetables", "Lentils", "Quinoa", "Nuts"],
    availableCustomizations: {
      protein: { min: 12, max: 70, default: 30 },
      carbs: { min: 40, max: 180, default: 70 },
      fats: { min: 10, max: 60, default: 25 },
    },
  },
];

// Helper function to get meal base by ID
export const getMealBaseById = (id: string): MealBase | undefined => {
  return MEAL_BASES.find((meal) => meal.id === id);
};

// Helper function to get random meal bases for featured section
export const getFeaturedMealBases = (count: number = 4): MealBase[] => {
  const shuffled = [...MEAL_BASES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
