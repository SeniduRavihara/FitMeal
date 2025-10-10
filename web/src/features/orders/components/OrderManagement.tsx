"use client";

import { MapView } from "@/shared";
import {
  OrderFilters,
  OrderService,
  OrderWithItems,
} from "@/supabase/services/OrderService";
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

// Order status configuration
const ORDER_STATUS_CONFIG = {
  pending: {
    style: { backgroundColor: "#fef3c7", color: "#92400e" },
    icon: ClockIcon,
    text: "Pending",
  },
  confirmed: {
    style: { backgroundColor: "#dbeafe", color: "#1e40af" },
    icon: CheckCircleIcon,
    text: "Confirmed",
  },
  preparing: {
    style: { backgroundColor: "#e0e7ff", color: "#3730a3" },
    icon: ClockIcon,
    text: "Preparing",
  },
  delivered: {
    style: { backgroundColor: "#dcfce7", color: "#166534" },
    icon: TruckIcon,
    text: "Delivered",
  },
  cancelled: {
    style: { backgroundColor: "#fee2e2", color: "#991b1b" },
    icon: XCircleIcon,
    text: "Cancelled",
  },
};

const PAYMENT_STATUS_CONFIG = {
  pending: {
    style: { backgroundColor: "#fef3c7", color: "#92400e" },
    text: "Pending",
  },
  paid: {
    style: { backgroundColor: "#dcfce7", color: "#166534" },
    text: "Paid",
  },
  failed: {
    style: { backgroundColor: "#fee2e2", color: "#991b1b" },
    text: "Failed",
  },
  refunded: {
    style: { backgroundColor: "#f3f4f6", color: "#374151" },
    text: "Refunded",
  },
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  filters: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  input: {
    display: "block",
    width: "16rem",
    padding: "0.5rem 0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    color: "#111827",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  select: {
    display: "block",
    padding: "0.5rem 0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    color: "#111827",
    backgroundColor: "#ffffff",
    cursor: "pointer",
  },
  tableContainer: {
    backgroundColor: "white",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    borderRadius: "0.375rem",
    overflow: "hidden",
  },
  table: {
    minWidth: "100%",
    borderCollapse: "collapse" as const,
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
  },
  tableHeaderCell: {
    padding: "0.75rem 1.5rem",
    textAlign: "left" as const,
    fontSize: "0.75rem",
    fontWeight: "500",
    color: "#6b7280",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    borderBottom: "1px solid #e5e7eb",
  },
  tableRow: {
    borderBottom: "1px solid #e5e7eb",
  },
  tableCell: {
    padding: "1rem 1.5rem",
    fontSize: "0.875rem",
    color: "#111827",
    verticalAlign: "top" as const,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.25rem 0.5rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "500",
  },
  pendingBadge: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },
  confirmedBadge: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
  },
  preparingBadge: {
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
  },
  deliveredBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  cancelledBadge: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  iconButton: {
    padding: "0.25rem",
    color: "#6b7280",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    marginRight: "0.5rem",
  },
  customerInfo: {
    display: "flex",
    flexDirection: "column" as const,
  },
  customerName: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#111827",
  },
  customerEmail: {
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  itemsList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.25rem",
  },
  item: {
    fontSize: "0.875rem",
    color: "#111827",
  },
  itemQuantity: {
    color: "#6b7280",
  },
  priceInfo: {
    display: "flex",
    flexDirection: "column" as const,
  },
  totalPrice: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#111827",
  },
  grandTotal: {
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  dateInfo: {
    display: "flex",
    flexDirection: "column" as const,
  },
  orderDate: {
    fontSize: "0.875rem",
    color: "#111827",
  },
  deliveryDate: {
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
};

export default function OrderManagement() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(
    null
  );
  const [updating, setUpdating] = useState<string | null>(null);
  const [showFullScreenMap, setShowFullScreenMap] = useState(false);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters: OrderFilters = {
        status: statusFilter === "all" ? undefined : statusFilter,
        payment_status:
          paymentStatusFilter === "all" ? undefined : paymentStatusFilter,
        search: searchTerm || undefined,
      };

      const ordersData = await OrderService.getOrders(filters);
      setOrders(ordersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Refetch orders when filters change
  useEffect(() => {
    if (!loading) {
      fetchOrders();
    }
  }, [statusFilter, paymentStatusFilter]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!loading) {
        fetchOrders();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      setUpdating(orderId);
      await OrderService.updateOrderStatus(orderId, newStatus);
      await fetchOrders(); // Refresh the list
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update order status"
      );
    } finally {
      setUpdating(null);
    }
  };

  const handlePaymentStatusUpdate = async (
    orderId: string,
    newPaymentStatus: string
  ) => {
    try {
      setUpdating(orderId);
      await OrderService.updatePaymentStatus(orderId, newPaymentStatus);
      await fetchOrders(); // Refresh the list
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update payment status"
      );
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadge = (
    status: string,
    type: "order" | "payment" = "order"
  ) => {
    const config =
      type === "order"
        ? ORDER_STATUS_CONFIG[status as keyof typeof ORDER_STATUS_CONFIG] ||
          ORDER_STATUS_CONFIG.pending
        : PAYMENT_STATUS_CONFIG[status as keyof typeof PAYMENT_STATUS_CONFIG] ||
          PAYMENT_STATUS_CONFIG.pending;

    const Icon =
      "icon" in config
        ? (config.icon as React.ComponentType<{ style: any }>)
        : null;

    return (
      <span
        style={{
          ...styles.badge,
          ...config.style,
        }}
      >
        {Icon && (
          <Icon
            style={{
              width: "0.75rem",
              height: "0.75rem",
              marginRight: "0.25rem",
            }}
          />
        )}
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return "LKR 0.00";
    return `LKR ${price.toFixed(2)}`;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          color: "#6b7280",
        }}
      >
        <div>Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          color: "#dc2626",
        }}
      >
        <ExclamationTriangleIcon
          style={{ width: "3rem", height: "3rem", marginBottom: "1rem" }}
        />
        <div
          style={{
            fontSize: "1.125rem",
            fontWeight: "500",
            marginBottom: "0.5rem",
          }}
        >
          Error loading orders
        </div>
        <div style={{ fontSize: "0.875rem", marginBottom: "1rem" }}>
          {error}
        </div>
        <button
          onClick={fetchOrders}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Filters */}
      <div style={styles.header}>
        <div style={styles.filters}>
          <input
            type="text"
            placeholder="Search orders, customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Order Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Payment Status</option>
            <option value="pending">Payment Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Payment Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Order ID</th>
              <th style={styles.tableHeaderCell}>Customer</th>
              <th style={styles.tableHeaderCell}>Items</th>
              <th style={styles.tableHeaderCell}>Total</th>
              <th style={styles.tableHeaderCell}>Order Status</th>
              <th style={styles.tableHeaderCell}>Payment</th>
              <th style={styles.tableHeaderCell}>Order Date</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={styles.tableRow}>
                <td style={styles.tableCell}>
                  <div style={{ fontWeight: "500", color: "#2563eb" }}>
                    {order.order_number || order.id.slice(0, 8)}
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.customerInfo}>
                    <div style={styles.customerName}>
                      {order.delivery_address?.full_name || "Unknown Customer"}
                    </div>
                    <div style={styles.customerEmail}>
                      {order.delivery_address?.phone_number || "No phone"}
                    </div>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.itemsList}>
                    {order.order_items?.map((item, index) => (
                      <div key={index} style={styles.item}>
                        {item.meal_name || "Custom Meal"}
                        <span style={styles.itemQuantity}>
                          x{item.quantity}
                        </span>
                      </div>
                    )) || <div style={styles.item}>No items</div>}
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.priceInfo}>
                    <div style={styles.totalPrice}>
                      {formatPrice(order.total_amount)}
                    </div>
                    <div style={styles.grandTotal}>
                      Delivery: {formatPrice(order.delivery_fee)}
                    </div>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  {getStatusBadge(order.order_status, "order")}
                </td>
                <td style={styles.tableCell}>
                  {getStatusBadge(order.payment_status, "payment")}
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.dateInfo}>
                    <div style={styles.orderDate}>
                      {formatDateTime(order.created_at)}
                    </div>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.actions}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      style={{ ...styles.iconButton, color: "#2563eb" }}
                      title="View Details"
                    >
                      <EyeIcon style={{ width: "1rem", height: "1rem" }} />
                    </button>
                    <button
                      onClick={() => console.log("Edit order:", order.id)}
                      style={{ ...styles.iconButton, color: "#7c3aed" }}
                      title="Edit Order"
                      disabled={updating === order.id}
                    >
                      <PencilIcon style={{ width: "1rem", height: "1rem" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "3rem 0",
            color: "#6b7280",
          }}
        >
          <ClockIcon
            style={{ width: "3rem", height: "3rem", marginBottom: "1rem" }}
          />
          <div
            style={{
              fontSize: "1.125rem",
              fontWeight: "500",
              marginBottom: "0.5rem",
            }}
          >
            No orders found
          </div>
          <div style={{ fontSize: "0.875rem" }}>
            Try adjusting your search or filter criteria
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            inset: "0",
            backgroundColor: "rgba(75, 85, 99, 0.5)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              maxWidth: "32rem",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#111827",
                }}
              >
                Order Details - {selectedOrder.id}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  padding: "0.25rem",
                  color: "#6b7280",
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "transparent",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <h4
                  style={{
                    fontWeight: "600",
                    marginBottom: "0.75rem",
                    color: "#1f2937",
                    fontSize: "1.125rem",
                  }}
                >
                  Customer Information
                </h4>
                <p
                  style={{
                    color: "#1f2937",
                    fontWeight: "500",
                    marginBottom: "0.5rem",
                    fontSize: "1rem",
                  }}
                >
                  {selectedOrder.delivery_address?.full_name ||
                    "Unknown Customer"}
                </p>
                <p
                  style={{
                    color: "#374151",
                    marginBottom: "0.5rem",
                    fontSize: "0.95rem",
                  }}
                >
                  📞{" "}
                  {selectedOrder.delivery_address?.phone_number || "No phone"}
                </p>
                <p
                  style={{
                    color: "#374151",
                    fontSize: "0.95rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  📍{" "}
                  {selectedOrder.delivery_address?.address_line1 ||
                    "No address"}
                  {selectedOrder.delivery_address?.address_line2 &&
                    `, ${selectedOrder.delivery_address.address_line2}`}
                </p>
                {selectedOrder.delivery_address?.latitude &&
                  selectedOrder.delivery_address?.longitude && (
                    <p
                      style={{
                        color: "#1f2937",
                        fontSize: "0.875rem",
                        marginTop: "0.5rem",
                        fontWeight: "500",
                        backgroundColor: "#f3f4f6",
                        padding: "0.5rem",
                        borderRadius: "0.375rem",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      🗺️ GPS:{" "}
                      {selectedOrder.delivery_address.latitude.toFixed(6)},{" "}
                      {selectedOrder.delivery_address.longitude.toFixed(6)}
                    </p>
                  )}
              </div>

              {/* Delivery Location Map Button */}
              {selectedOrder.delivery_address?.latitude &&
                selectedOrder.delivery_address?.longitude && (
                  <div>
                    <h4
                      style={{
                        fontWeight: "600",
                        marginBottom: "0.75rem",
                        color: "#1f2937",
                        fontSize: "1.125rem",
                      }}
                    >
                      Delivery Location
                    </h4>
                    <button
                      onClick={() => setShowFullScreenMap(true)}
                      style={{
                        width: "100%",
                        padding: "1rem",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "0.5rem",
                        fontSize: "1rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#2563eb";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "#3b82f6";
                      }}
                    >
                      🗺️ Open Full-Screen Map for Delivery
                    </button>
                  </div>
                )}

              <div>
                <h4 style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                  Order Items
                </h4>
                {selectedOrder.order_items?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0.5rem 0",
                      borderBottom:
                        index < (selectedOrder.order_items?.length || 0) - 1
                          ? "1px solid #e5e7eb"
                          : "none",
                    }}
                  >
                    <span>
                      {item.meal_name || "Custom Meal"} x{item.quantity}
                    </span>
                    <span>
                      {formatPrice(item.price_per_item * item.quantity)}
                    </span>
                  </div>
                )) || <div>No items found</div>}
              </div>

              <div>
                <h4 style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                  Payment Summary
                </h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span>Subtotal:</span>
                  <span>{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span>Delivery Fee:</span>
                  <span>{formatPrice(selectedOrder.delivery_fee)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "600",
                    borderTop: "1px solid #e5e7eb",
                    paddingTop: "0.5rem",
                  }}
                >
                  <span>Total:</span>
                  <span>{formatPrice(selectedOrder.total_amount)}</span>
                </div>
              </div>

              <div>
                <h4 style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                  Order Status
                </h4>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {getStatusBadge(selectedOrder.order_status, "order")}
                  {getStatusBadge(selectedOrder.payment_status, "payment")}
                </div>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                  }}
                >
                  Payment Method:{" "}
                  {selectedOrder.payment_method || "Cash on Delivery"}
                </p>
                <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                  Order Date: {formatDateTime(selectedOrder.created_at)}
                </p>
                {selectedOrder.notes && (
                  <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                    Notes: {selectedOrder.notes}
                  </p>
                )}
              </div>

              <div>
                <h4 style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                  Quick Actions
                </h4>
                <div
                  style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                >
                  {selectedOrder.order_status !== "confirmed" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(selectedOrder.id, "confirmed")
                      }
                      disabled={updating === selectedOrder.id}
                      style={{
                        padding: "0.25rem 0.5rem",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "0.25rem",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                      }}
                    >
                      Confirm Order
                    </button>
                  )}
                  {selectedOrder.order_status !== "preparing" &&
                    selectedOrder.order_status !== "delivered" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(selectedOrder.id, "preparing")
                        }
                        disabled={updating === selectedOrder.id}
                        style={{
                          padding: "0.25rem 0.5rem",
                          backgroundColor: "#8b5cf6",
                          color: "white",
                          border: "none",
                          borderRadius: "0.25rem",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                        }}
                      >
                        Start Preparing
                      </button>
                    )}
                  {selectedOrder.order_status !== "delivered" &&
                    selectedOrder.order_status !== "cancelled" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(selectedOrder.id, "delivered")
                        }
                        disabled={updating === selectedOrder.id}
                        style={{
                          padding: "0.25rem 0.5rem",
                          backgroundColor: "#10b981",
                          color: "white",
                          border: "none",
                          borderRadius: "0.25rem",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                        }}
                      >
                        Mark Delivered
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Map Modal */}
      {showFullScreenMap &&
        selectedOrder?.delivery_address?.latitude &&
        selectedOrder?.delivery_address?.longitude && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "white",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#1f2937",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #374151",
              }}
            >
              <div>
                <h2
                  style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}
                >
                  🚚 Delivery Location
                </h2>
                <p
                  style={{
                    margin: "0.25rem 0 0 0",
                    fontSize: "0.875rem",
                    color: "#d1d5db",
                  }}
                >
                  Order #
                  {selectedOrder.order_number || selectedOrder.id.slice(0, 8)}
                </p>
                <p
                  style={{
                    margin: "0.5rem 0 0 0",
                    fontSize: "0.875rem",
                    color: "#f3f4f6",
                    fontWeight: "500",
                  }}
                >
                  📍{" "}
                  {selectedOrder.delivery_address?.address_line1 ||
                    "No address"}
                  {selectedOrder.delivery_address?.address_line2 &&
                    `, ${selectedOrder.delivery_address.address_line2}`}
                </p>
              </div>
              <button
                onClick={() => setShowFullScreenMap(false)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                }}
              >
                ✕
              </button>
            </div>

            {/* Full-Screen Map */}
            <div style={{ flex: 1, position: "relative" }}>
              <MapView
                latitude={selectedOrder.delivery_address.latitude}
                longitude={selectedOrder.delivery_address.longitude}
                address={`${selectedOrder.delivery_address.address_line1}${
                  selectedOrder.delivery_address.address_line2
                    ? `, ${selectedOrder.delivery_address.address_line2}`
                    : ""
                }`}
                height="100%"
                zoom={18}
              />
            </div>
          </div>
        )}
    </div>
  );
}
