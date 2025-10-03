import { Tables, TablesInsert, TablesUpdate } from "../../../database.types";
import { client } from "../supabase";

// Type aliases for better readability
export type CarouselItem = Tables<"carousel_items">;
export type CarouselItemInsert = TablesInsert<"carousel_items">;
export type CarouselItemUpdate = TablesUpdate<"carousel_items">;

export class CarouselService {
  /**
   * Get all carousel items with optional filtering
   */
  static async getAllCarouselItems(options?: {
    activeOnly?: boolean;
    orderBy?: "display_order" | "created_at" | "title";
    ascending?: boolean;
  }) {
    let query = client.from("carousel_items").select("*");

    // Filter by active status if specified
    if (options?.activeOnly) {
      query = query.eq("is_active", true);
    }

    // Add ordering
    const orderBy = options?.orderBy || "display_order";
    const ascending = options?.ascending !== false; // Default to ascending
    query = query.order(orderBy, { ascending });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching carousel items:", error);
      throw new Error(`Failed to fetch carousel items: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get active carousel items for public display
   */
  static async getActiveCarouselItems() {
    const now = new Date().toISOString();

    const { data, error } = await client
      .from("carousel_items")
      .select("*")
      .eq("is_active", true)
      .or(`start_date.is.null,start_date.lte.${now}`)
      .or(`end_date.is.null,end_date.gte.${now}`)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching active carousel items:", error);
      throw new Error(
        `Failed to fetch active carousel items: ${error.message}`
      );
    }

    return data || [];
  }

  /**
   * Get a single carousel item by ID
   */
  static async getCarouselItemById(id: string) {
    const { data, error } = await client
      .from("carousel_items")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Item not found
      }
      console.error("Error fetching carousel item:", error);
      throw new Error(`Failed to fetch carousel item: ${error.message}`);
    }

    return data;
  }

  /**
   * Create a new carousel item
   */
  static async createCarouselItem(item: CarouselItemInsert) {
    // Validate required fields
    if (!item.title?.trim()) {
      throw new Error("Title is required");
    }
    if (!item.subtitle?.trim()) {
      throw new Error("Subtitle is required");
    }
    if (!item.image_url?.trim()) {
      throw new Error("Image URL is required");
    }

    // Validate hex colors
    if (
      item.background_color &&
      !/^#[0-9A-Fa-f]{6}$/.test(item.background_color)
    ) {
      throw new Error("Background color must be a valid hex color");
    }
    if (item.text_color && !/^#[0-9A-Fa-f]{6}$/.test(item.text_color)) {
      throw new Error("Text color must be a valid hex color");
    }

    const { data, error } = await client
      .from("carousel_items")
      .insert(item)
      .select()
      .single();

    if (error) {
      console.error("Error creating carousel item:", error);
      throw new Error(`Failed to create carousel item: ${error.message}`);
    }

    return data;
  }

  /**
   * Update an existing carousel item
   */
  static async updateCarouselItem(id: string, updates: CarouselItemUpdate) {
    // Validate hex colors if provided
    if (
      updates.background_color &&
      !/^#[0-9A-Fa-f]{6}$/.test(updates.background_color)
    ) {
      throw new Error("Background color must be a valid hex color");
    }
    if (updates.text_color && !/^#[0-9A-Fa-f]{6}$/.test(updates.text_color)) {
      throw new Error("Text color must be a valid hex color");
    }

    const { data, error } = await client
      .from("carousel_items")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating carousel item:", error);
      throw new Error(`Failed to update carousel item: ${error.message}`);
    }

    return data;
  }

  /**
   * Delete a carousel item
   */
  static async deleteCarouselItem(id: string) {
    const { error } = await client.from("carousel_items").delete().eq("id", id);

    if (error) {
      console.error("Error deleting carousel item:", error);
      throw new Error(`Failed to delete carousel item: ${error.message}`);
    }

    return true;
  }

  /**
   * Toggle active status of a carousel item
   */
  static async toggleCarouselItemStatus(id: string, isActive: boolean) {
    return this.updateCarouselItem(id, { is_active: isActive });
  }

  /**
   * Update display order of multiple items
   */
  static async updateDisplayOrders(
    items: Array<{ id: string; display_order: number }>
  ) {
    const updates = items.map((item) =>
      client
        .from("carousel_items")
        .update({ display_order: item.display_order })
        .eq("id", item.id)
    );

    try {
      await Promise.all(updates);
      return true;
    } catch (error) {
      console.error("Error updating display orders:", error);
      throw new Error("Failed to update display orders");
    }
  }

  /**
   * Get carousel items statistics
   */
  static async getCarouselStats() {
    const { data, error } = await client
      .from("carousel_items")
      .select("is_active");

    if (error) {
      console.error("Error fetching carousel stats:", error);
      return { total: 0, active: 0, inactive: 0 };
    }

    const total = data.length;
    const active = data.filter((item) => item.is_active).length;
    const inactive = total - active;

    return { total, active, inactive };
  }
}

