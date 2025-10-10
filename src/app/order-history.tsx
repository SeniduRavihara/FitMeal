import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";
import { CustomAlert } from "../components/CustomAlert";
import { useCustomAlert } from "../hooks/useCustomAlert";
import { Order, OrderItem, OrderService } from "../services/OrderService";

// Extended interface for orders with items
interface OrderWithItems extends Order {
  order_items?: OrderItem[];
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { showError, visible, alertConfig, handleConfirm, handleCancel } =
    useCustomAlert();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const userOrders = await OrderService.getUserOrders();
      // Fetch order items for each order
      const ordersWithItems = await Promise.all(
        userOrders.map(async (order) => {
          try {
            const { items } = await OrderService.getOrderWithItems(order.id);
            return { ...order, order_items: items };
          } catch (error) {
            console.error(`Error fetching items for order ${order.id}:`, error);
            return { ...order, order_items: [] };
          }
        })
      );
      setOrders(ordersWithItems);
    } catch (error) {
      console.error("Error loading orders:", error);
      showError("Error", "Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#FF9500";
      case "confirmed":
        return "#007AFF";
      case "preparing":
        return "#5856D6";
      case "ready":
        return "#34C759";
      case "delivered":
        return "#30D158";
      case "cancelled":
        return "#FF3B30";
      default:
        return "#8E8E93";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "confirmed":
        return "Confirmed";
      case "preparing":
        return "Preparing";
      case "ready":
        return "Ready";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "time-outline";
      case "confirmed":
        return "checkmark-circle-outline";
      case "preparing":
        return "restaurant-outline";
      case "ready":
        return "checkmark-done-outline";
      case "delivered":
        return "checkmark-circle";
      case "cancelled":
        return "close-circle-outline";
      default:
        return "help-circle-outline";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAddress = (address: any) => {
    if (!address) return "No address";
    const parts = [address.address_line1];
    if (address.address_line2) {
      parts.push(address.address_line2);
    }
    return parts.join(", ");
  };

  const filteredOrders =
    selectedFilter === "all"
      ? orders
      : orders.filter((order) => order.order_status === selectedFilter);

  const renderOrderItem = ({ item: order }: { item: OrderWithItems }) => (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E5E5E5",
      }}
    >
      {/* Order Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <AppText variant="h4" weight="semibold" color="primary">
            Order #{order.order_number}
          </AppText>
          <AppText variant="caption" color="secondary" style={{ marginTop: 2 }}>
            {formatDate(order.created_at)}
          </AppText>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: getStatusColor(order.order_status) + "20",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              marginBottom: 4,
            }}
          >
            <Ionicons
              name={getStatusIcon(order.order_status) as any}
              size={12}
              color={getStatusColor(order.order_status)}
              style={{ marginRight: 4 }}
            />
            <AppText
              variant="caption"
              weight="medium"
              style={{ color: getStatusColor(order.order_status) }}
            >
              {getStatusText(order.order_status)}
            </AppText>
          </View>
          <AppText variant="h4" weight="bold" color="primary">
            LKR {order.total_amount.toFixed(2)}
          </AppText>
        </View>
      </View>

      {/* Order Items */}
      <View style={{ marginBottom: 16 }}>
        {order.order_items?.map((item: OrderItem, index: number) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#F3F4F6",
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Ionicons name="restaurant" size={20} color="#6B7280" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText variant="body" weight="medium" color="primary">
                {item.meal_name || "Custom Meal"}
              </AppText>
              <AppText variant="caption" color="secondary">
                Qty: {item.quantity} × LKR {item.price_per_item.toFixed(2)}
              </AppText>
            </View>
            <AppText variant="body" weight="semibold" color="primary">
              LKR {(item.price_per_item * item.quantity).toFixed(2)}
            </AppText>
          </View>
        ))}
      </View>

      {/* Delivery Address */}
      {order.delivery_address && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 16,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: "#F3F4F6",
          }}
        >
          <Ionicons
            name="location-outline"
            size={16}
            color="#6B7280"
            style={{ marginRight: 8, marginTop: 2 }}
          />
          <View style={{ flex: 1 }}>
            <AppText variant="caption" weight="medium" color="secondary">
              Delivery Address
            </AppText>
            <AppText variant="caption" color="secondary">
              {formatAddress(order.delivery_address)}
            </AppText>
            {order.delivery_address.latitude &&
              order.delivery_address.longitude && (
                <AppText variant="caption" color="secondary">
                  GPS: {order.delivery_address.latitude.toFixed(4)},{" "}
                  {order.delivery_address.longitude.toFixed(4)}
                </AppText>
              )}
          </View>
        </View>
      )}

      {/* Order Actions */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
        }}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#FB923C",
            marginRight: 12,
          }}
        >
          <AppText variant="body" weight="medium" color="accent">
            Reorder
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#D1D5DB",
          }}
        >
          <AppText variant="body" weight="medium" color="secondary">
            View Details
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 80,
      }}
    >
      <Ionicons name="receipt-outline" size={64} color="#D1D5DB" />
      <AppText
        variant="h4"
        weight="medium"
        color="secondary"
        style={{ marginTop: 16, textAlign: "center" }}
      >
        No orders found
      </AppText>
      <AppText
        variant="body"
        color="secondary"
        style={{ marginTop: 8, textAlign: "center" }}
      >
        Your order history will appear here
      </AppText>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <AppText variant="body" color="secondary">
            Loading orders...
          </AppText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#E5E5E5",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color="#FB923C" />
          </TouchableOpacity>
          <AppText variant="h3" weight="semibold" color="primary">
            Order History
          </AppText>
        </View>
        <TouchableOpacity onPress={handleRefresh}>
          <Ionicons name="refresh" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#E5E5E5",
        }}
      >
        <View style={{ flexDirection: "row", gap: 12 }}>
          {[
            "all",
            "pending",
            "confirmed",
            "preparing",
            "ready",
            "delivered",
            "cancelled",
          ].map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor:
                  selectedFilter === filter ? "#FB923C" : "#F3F4F6",
              }}
            >
              <AppText
                variant="caption"
                weight="medium"
                color={selectedFilter === filter ? "white" : "secondary"}
              >
                {filter === "all" ? "All" : getStatusText(filter)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      {/* Custom Alert */}
      <CustomAlert
        visible={visible}
        title={alertConfig?.title || ""}
        message={alertConfig?.message || ""}
        type={alertConfig?.type || "default"}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
}
