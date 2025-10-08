import { client } from "../supabase";

// Define types based on the actual database schema
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
  delivery_address: {
    full_name: string;
    phone_number: string;
    address_line1: string;
    address_line2?: string;
  };
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
  customization: any;
  quantity: number;
  base_price: number;
  customization_fee: number;
  price_per_item: number;
  total_price: number;
  created_at: string;
  updated_at: string;
}

export interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

export interface OrderFilters {
  status?: string;
  payment_status?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
}

export interface OrderStats {
  total_orders: number;
  pending_orders: number;
  confirmed_orders: number;
  preparing_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  total_revenue: number;
  today_orders: number;
}

export class OrderService {
  /**
   * Get all orders with optional filtering
   */
  static async getOrders(
    filters: OrderFilters = {}
  ): Promise<OrderWithItems[]> {
    try {
      let query = client
        .from("orders")
        .select(
          `
           *,
           order_items (*)
         `
        )
        .order("created_at", { ascending: false });

      // Apply filters
      if (filters.status) {
        query = query.eq("order_status", filters.status);
      }

      if (filters.payment_status) {
        query = query.eq("payment_status", filters.payment_status);
      }

      if (filters.date_from) {
        query = query.gte("created_at", filters.date_from);
      }

      if (filters.date_to) {
        query = query.lte("created_at", filters.date_to);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to fetch orders");
      }

      // Apply search filter on client side for better performance
      let filteredData = data || [];
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredData = filteredData.filter(
          (order) =>
            order.order_number?.toLowerCase().includes(searchTerm) ||
            order.delivery_address?.full_name
              ?.toLowerCase()
              .includes(searchTerm)
        );
      }

      return filteredData;
    } catch (error) {
      console.error("Error in getOrders:", error);
      throw error;
    }
  }

  /**
   * Get a single order by ID with all details
   */
  static async getOrderById(orderId: string): Promise<OrderWithItems | null> {
    try {
      const { data, error } = await client
        .from("orders")
        .select(
          `
           *,
           order_items (*)
         `
        )
        .eq("id", orderId)
        .single();

      if (error) {
        console.error("Error fetching order:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in getOrderById:", error);
      return null;
    }
  }

  /**
   * Update order status
   */
  static async updateOrderStatus(
    orderId: string,
    status: string
  ): Promise<Order | null> {
    try {
      const { data, error } = await client
        .from("orders")
        .update({
          order_status: status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)
        .select()
        .single();

      if (error) {
        console.error("Error updating order status:", error);
        throw new Error("Failed to update order status");
      }

      return data;
    } catch (error) {
      console.error("Error in updateOrderStatus:", error);
      throw error;
    }
  }

  /**
   * Update payment status
   */
  static async updatePaymentStatus(
    orderId: string,
    paymentStatus: string
  ): Promise<Order | null> {
    try {
      const { data, error } = await client
        .from("orders")
        .update({
          payment_status: paymentStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)
        .select()
        .single();

      if (error) {
        console.error("Error updating payment status:", error);
        throw new Error("Failed to update payment status");
      }

      return data;
    } catch (error) {
      console.error("Error in updatePaymentStatus:", error);
      throw error;
    }
  }

  /**
   * Get order statistics
   */
  static async getOrderStats(): Promise<OrderStats> {
    try {
      const { data: orders, error } = await client
        .from("orders")
        .select("order_status, payment_status, total_amount, created_at");

      if (error) {
        console.error("Error fetching order stats:", error);
        throw new Error("Failed to fetch order statistics");
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const stats: OrderStats = {
        total_orders: orders?.length || 0,
        pending_orders: 0,
        confirmed_orders: 0,
        preparing_orders: 0,
        delivered_orders: 0,
        cancelled_orders: 0,
        total_revenue: 0,
        today_orders: 0,
      };

      orders?.forEach((order) => {
        // Count by status
        switch (order.order_status) {
          case "pending":
            stats.pending_orders++;
            break;
          case "confirmed":
            stats.confirmed_orders++;
            break;
          case "preparing":
            stats.preparing_orders++;
            break;
          case "delivered":
            stats.delivered_orders++;
            break;
          case "cancelled":
            stats.cancelled_orders++;
            break;
        }

        // Calculate revenue (only from delivered orders)
        if (
          order.order_status === "delivered" &&
          order.payment_status === "paid"
        ) {
          stats.total_revenue += order.total_amount || 0;
        }

        // Count today's orders
        const orderDate = new Date(order.created_at);
        if (orderDate >= today) {
          stats.today_orders++;
        }
      });

      return stats;
    } catch (error) {
      console.error("Error in getOrderStats:", error);
      throw error;
    }
  }

  /**
   * Delete an order (admin only)
   */
  static async deleteOrder(orderId: string): Promise<void> {
    try {
      // First delete order items
      const { error: itemsError } = await client
        .from("order_items")
        .delete()
        .eq("order_id", orderId);

      if (itemsError) {
        console.error("Error deleting order items:", itemsError);
        throw new Error("Failed to delete order items");
      }

      // Then delete the order
      const { error: orderError } = await client
        .from("orders")
        .delete()
        .eq("id", orderId);

      if (orderError) {
        console.error("Error deleting order:", orderError);
        throw new Error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error in deleteOrder:", error);
      throw error;
    }
  }
}
