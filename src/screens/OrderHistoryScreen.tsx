import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";
import { CustomAlert } from "../components/CustomAlert";
import { useCustomAlert } from "../hooks/useCustomAlert";
import { Order, OrderService } from "../services/OrderService";
import { getScrollViewContentStyle } from "../utils/navigationSpacing";

export function OrderHistoryScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { showError, visible, alertConfig, handleConfirm, handleCancel } =
    useCustomAlert();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const userOrders = await OrderService.getUserOrders();
      setOrders(userOrders);
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
        return "bicycle-outline";
      case "cancelled":
        return "close-circle-outline";
      default:
        return "help-circle-outline";
    }
  };

  const formatOrderDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      onPress={() => {
        // TODO: Navigate to order details
        console.log("Order details:", item.id);
      }}
    >
      {/* Order Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <View>
          <AppText variant="h4" weight="semibold" color="primary">
            Order #{item.order_number}
          </AppText>
          <AppText variant="caption" color="secondary">
            {formatOrderDate(item.created_at)}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: `${getStatusColor(item.order_status)}20`,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
          }}
        >
          <Ionicons
            name={getStatusIcon(item.order_status) as any}
            size={16}
            color={getStatusColor(item.order_status)}
            style={{ marginRight: 6 }}
          />
          <AppText
            variant="caption"
            weight="medium"
            style={{ color: getStatusColor(item.order_status) }}
          >
            {item.order_status.charAt(0).toUpperCase() +
              item.order_status.slice(1)}
          </AppText>
        </View>
      </View>

      {/* Order Summary */}
      <View style={{ marginBottom: 12 }}>
        <AppText variant="body" color="secondary" style={{ marginBottom: 4 }}>
          {item.delivery_address?.full_name || "Unknown"}
        </AppText>
        <AppText variant="caption" color="secondary">
          {item.delivery_address?.address_line1 || "No address"}
          {item.delivery_address?.address_line2 &&
            `, ${item.delivery_address.address_line2}`}
        </AppText>
      </View>

      {/* Order Total */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: "#E5E5E5",
          paddingTop: 12,
        }}
      >
        <AppText variant="body" weight="medium" color="primary">
          Total: LKR {item.total_amount}
        </AppText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AppText
            variant="caption"
            color="secondary"
            style={{ marginRight: 8 }}
          >
            {item.payment_method?.replace("_", " ").toUpperCase()}
          </AppText>
          <Ionicons name="chevron-forward" size={16} color="#8E8E93" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
      }}
    >
      <Ionicons name="receipt-outline" size={64} color="#D1D5DB" />
      <AppText
        variant="h4"
        weight="semibold"
        color="primary"
        style={{ marginTop: 16, marginBottom: 8, textAlign: "center" }}
      >
        No Orders Yet
      </AppText>
      <AppText
        variant="body"
        color="secondary"
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        Your order history will appear here once you place your first order.
      </AppText>
      <TouchableOpacity
        style={{
          backgroundColor: "#007AFF",
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 12,
        }}
        onPress={() => router.push("/(tabs)/")}
      >
        <AppText variant="body" weight="semibold" color="white">
          Start Ordering
        </AppText>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
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
        <AppText variant="h3" weight="semibold" color="primary">
          Order History
        </AppText>
        <TouchableOpacity onPress={handleRefresh}>
          <Ionicons name="refresh" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          getScrollViewContentStyle(),
          { padding: 20 },
          orders.length === 0 && { flex: 1 },
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      {/* Custom Alert */}
      {alertConfig && (
        <CustomAlert
          visible={visible}
          title={alertConfig.title}
          message={alertConfig.message}
          confirmText={alertConfig.confirmText}
          cancelText={alertConfig.cancelText}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          type={alertConfig.type}
          showCancel={alertConfig.showCancel}
        />
      )}
    </SafeAreaView>
  );
}
