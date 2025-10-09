import { client } from "../supabase";

// Define types based on the meals table schema (custom meal builder)
export interface Meal {
  id: string;
  name: string;
  description?: string;
  base_price: number;
  image_url?: string;
  category?: string;
  is_available: boolean;
  // Nutrition information
  protein_per_100g: number;
  carbs_per_100g: number;
  fats_per_100g: number;
  calories_per_100g: number;
  // Customization ranges
  protein_min: number;
  protein_max: number;
  protein_default: number;
  carbs_min: number;
  carbs_max: number;
  carbs_default: number;
  fats_min: number;
  fats_max: number;
  fats_default: number;
  // Ingredients
  ingredients: string[];
  // Status
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface MealFilters {
  category?: string;
  is_available?: boolean;
  search?: string;
  min_price?: number;
  max_price?: number;
}

export interface CreateMealData {
  name: string;
  description?: string;
  base_price: number;
  image_url?: string;
  category?: string;
  is_available?: boolean;
  // Nutrition information
  protein_per_100g?: number;
  carbs_per_100g?: number;
  fats_per_100g?: number;
  calories_per_100g?: number;
  // Customization ranges
  protein_min?: number;
  protein_max?: number;
  protein_default?: number;
  carbs_min?: number;
  carbs_max?: number;
  carbs_default?: number;
  fats_min?: number;
  fats_max?: number;
  fats_default?: number;
  // Ingredients
  ingredients?: string[];
  // Status
  status?: "active" | "inactive";
}

export interface UpdateMealData {
  name?: string;
  description?: string;
  base_price?: number;
  image_url?: string;
  category?: string;
  is_available?: boolean;
  // Nutrition information
  protein_per_100g?: number;
  carbs_per_100g?: number;
  fats_per_100g?: number;
  calories_per_100g?: number;
  // Customization ranges
  protein_min?: number;
  protein_max?: number;
  protein_default?: number;
  carbs_min?: number;
  carbs_max?: number;
  carbs_default?: number;
  fats_min?: number;
  fats_max?: number;
  fats_default?: number;
  // Ingredients
  ingredients?: string[];
  // Status
  status?: "active" | "inactive";
}

export class MealService {
  // Get all meals with optional filtering
  static async getMeals(filters: MealFilters = {}): Promise<Meal[]> {
    try {
      let query = client
        .from("meals")
        .select("*")
        .order("created_at", { ascending: false });

      // Apply filters
      if (filters.category) {
        query = query.eq("category", filters.category);
      }

      if (filters.is_available !== undefined) {
        query = query.eq("is_available", filters.is_available);
      }

      if (filters.min_price !== undefined) {
        query = query.gte("base_price", filters.min_price);
      }

      if (filters.max_price !== undefined) {
        query = query.lte("base_price", filters.max_price);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching meals:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        throw new Error(
          `Failed to fetch meals: ${error.message || "Unknown error"}`
        );
      }

      let filteredData = data || [];

      // Apply search filter (client-side for text search)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredData = filteredData.filter(
          (meal) =>
            meal.name.toLowerCase().includes(searchTerm) ||
            meal.description?.toLowerCase().includes(searchTerm) ||
            meal.category?.toLowerCase().includes(searchTerm)
        );
      }

      return filteredData;
    } catch (error) {
      console.error("Error in getMeals:", error);
      throw error;
    }
  }

  // Get a single meal by ID
  static async getMealById(mealId: string): Promise<Meal | null> {
    try {
      const { data, error } = await client
        .from("meals")
        .select("*")
        .eq("id", mealId)
        .single();

      if (error) {
        console.error("Error fetching meal:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in getMealById:", error);
      return null;
    }
  }

  // Create a new meal
  static async createMeal(mealData: CreateMealData): Promise<Meal | null> {
    try {
      const { data, error } = await client
        .from("meals")
        .insert([mealData])
        .select()
        .single();

      if (error) {
        console.error("Error creating meal:", error);
        throw new Error("Failed to create meal");
      }

      return data;
    } catch (error) {
      console.error("Error in createMeal:", error);
      throw error;
    }
  }

  // Update an existing meal
  static async updateMeal(
    mealId: string,
    mealData: UpdateMealData
  ): Promise<Meal | null> {
    try {
      const { data, error } = await client
        .from("meals")
        .update(mealData)
        .eq("id", mealId)
        .select()
        .single();

      if (error) {
        console.error("Error updating meal:", error);
        throw new Error("Failed to update meal");
      }

      return data;
    } catch (error) {
      console.error("Error in updateMeal:", error);
      throw error;
    }
  }

  // Delete a meal
  static async deleteMeal(mealId: string): Promise<void> {
    try {
      const { error } = await client.from("meals").delete().eq("id", mealId);

      if (error) {
        console.error("Error deleting meal:", error);
        throw new Error("Failed to delete meal");
      }
    } catch (error) {
      console.error("Error in deleteMeal:", error);
      throw error;
    }
  }

  // Get meal categories
  static async getMealCategories(): Promise<string[]> {
    try {
      const { data, error } = await client
        .from("meals")
        .select("category")
        .not("category", "is", null);

      if (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories");
      }

      // Extract unique categories
      const categories = [
        ...new Set(data?.map((item) => item.category).filter(Boolean)),
      ];
      return categories;
    } catch (error) {
      console.error("Error in getMealCategories:", error);
      throw error;
    }
  }

  // Get meal statistics
  static async getMealStats(): Promise<{
    total_meals: number;
    available_meals: number;
    unavailable_meals: number;
    average_price: number;
    categories_count: number;
  }> {
    try {
      const { data, error } = await client.from("meals").select("*");

      if (error) {
        console.error("Error fetching meal stats:", error);
        throw new Error("Failed to fetch meal statistics");
      }

      const meals = data || [];
      const total_meals = meals.length;
      const available_meals = meals.filter((meal) => meal.is_available).length;
      const unavailable_meals = total_meals - available_meals;
      const average_price =
        meals.length > 0
          ? meals.reduce((sum, meal) => sum + meal.base_price, 0) / meals.length
          : 0;
      const categories_count = new Set(
        meals.map((meal) => meal.category).filter(Boolean)
      ).size;

      return {
        total_meals,
        available_meals,
        unavailable_meals,
        average_price: Math.round(average_price * 100) / 100,
        categories_count,
      };
    } catch (error) {
      console.error("Error in getMealStats:", error);
      throw error;
    }
  }
}
