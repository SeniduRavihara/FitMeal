import { OrderManagement } from "@/features/orders";

export default function OrdersPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "0.25rem",
          }}
        >
          Order Management
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
          }}
        >
          Track and manage customer orders and deliveries
        </p>
      </div>
      <OrderManagement />
    </div>
  );
}
