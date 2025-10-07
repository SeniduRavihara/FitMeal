import { supabase } from "../supabase/supabase";
import { CustomMealOrder } from "../types/mealBuilder";

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  order_status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "delivered"
    | "cancelled";
  payment_method: "cash_on_delivery" | "card" | "bank_transfer";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  delivery_address: any; // JSONB
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  notes?: string;
  estimated_delivery_time?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  meal_base_id: string;
  meal_name: string;
  customization: any; // JSONB
  quantity: number;
  base_price: number;
  customization_fee: number;
  price_per_item: number;
  total_price: number;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderData {
  delivery_address: any;
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  notes?: string;
  payment_method?: "cash_on_delivery" | "card" | "bank_transfer";
  items: Array<{
    meal_base_id: string;
    meal_name: string;
    customization: any;
    quantity: number;
    base_price: number;
    customization_fee: number;
    price_per_item: number;
    total_price: number;
  }>;
}

export class OrderService {
  /**
   * Create a new order
   */
  static async createOrder(orderData: CreateOrderData): Promise<Order> {
    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      // Start a transaction
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            order_number: await this.generateOrderNumber(),
            delivery_address: orderData.delivery_address,
            subtotal: orderData.subtotal,
            delivery_fee: orderData.delivery_fee,
            total_amount: orderData.total_amount,
            notes: orderData.notes,
            payment_method: orderData.payment_method || "cash_on_delivery",
            payment_status: "pending",
            order_status: "pending",
          },
        ])
        .select()
        .single();

      if (orderError) {
        console.error("Error creating order:", orderError);
        throw new Error("Failed to create order");
      }

      // Create order items
      const orderItems = orderData.items.map((item) => ({
        order_id: order.id,
        meal_base_id: item.meal_base_id,
        meal_name: item.meal_name,
        customization: item.customization,
        quantity: item.quantity,
        base_price: item.base_price,
        customization_fee: item.customization_fee,
        price_per_item: item.price_per_item,
        total_price: item.total_price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        console.error("Error creating order items:", itemsError);
        // Clean up the order if items creation fails
        await supabase.from("orders").delete().eq("id", order.id);
        throw new Error("Failed to create order items");
      }

      return order;
    } catch (error) {
      console.error("Error in createOrder:", error);
      throw error;
    }
  }

  /**
   * Get orders for the current user
   */
  static async getUserOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch orders");
    }

    return data || [];
  }

  /**
   * Get a specific order with its items
   */
  static async getOrderWithItems(
    orderId: string
  ): Promise<{ order: Order; items: OrderItem[] }> {
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError) {
      console.error("Error fetching order:", orderError);
      throw new Error("Failed to fetch order");
    }

    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (itemsError) {
      console.error("Error fetching order items:", itemsError);
      throw new Error("Failed to fetch order items");
    }

    return { order, items: items || [] };
  }

  /**
   * Update order status
   */
  static async updateOrderStatus(
    orderId: string,
    status: Order["order_status"]
  ): Promise<Order> {
    const { data, error } = await supabase
      .from("orders")
      .update({ order_status: status })
      .eq("id", orderId)
      .select()
      .single();

    if (error) {
      console.error("Error updating order status:", error);
      throw new Error("Failed to update order status");
    }

    return data;
  }

  /**
   * Cancel an order
   */
  static async cancelOrder(orderId: string): Promise<Order> {
    return this.updateOrderStatus(orderId, "cancelled");
  }

  /**
   * Generate a unique order number
   */
  private static async generateOrderNumber(): Promise<string> {
    const { data, error } = await supabase.rpc("generate_order_number");

    if (error) {
      console.error("Error generating order number:", error);
      // Fallback to timestamp-based order number
      return `ORD-${Date.now()}`;
    }

    return data;
  }

  /**
   * Convert cart items to order data format
   */
  static convertCartToOrderData(
    cartItems: CustomMealOrder[],
    deliveryAddress: any,
    deliveryFee: number = 200,
    notes?: string
  ): CreateOrderData {
    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalAmount = subtotal + deliveryFee;

    const items = cartItems.map((item) => ({
      meal_base_id: item.mealBase.id,
      meal_name: item.mealBase.name,
      customization: item.customization,
      quantity: item.quantity,
      base_price: item.mealBase.basePrice,
      customization_fee: item.pricePerItem - item.mealBase.basePrice,
      price_per_item: item.pricePerItem,
      total_price: item.totalPrice,
    }));

    return {
      delivery_address: deliveryAddress,
      subtotal,
      delivery_fee: deliveryFee,
      total_amount: totalAmount,
      notes,
      payment_method: "cash_on_delivery",
      items,
    };
  }

  /**
   * Validate order data
   */
  static validateOrderData(orderData: CreateOrderData): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!orderData.delivery_address) {
      errors.push("Delivery address is required");
    }

    if (!orderData.items || orderData.items.length === 0) {
      errors.push("Order must contain at least one item");
    }

    if (orderData.subtotal <= 0) {
      errors.push("Subtotal must be greater than 0");
    }

    if (orderData.total_amount <= 0) {
      errors.push("Total amount must be greater than 0");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
