"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  PauseIcon,
  PencilIcon,
  PlayIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import {
  CarouselItem,
  CarouselService,
} from "../../supabase/services/CarouselService";
import CarouselItemForm from "./CarouselItemForm";
import CarouselPreview from "./CarouselPreview";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  actionsBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  leftActions: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  rightActions: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.5rem 1rem",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.5rem 1rem",
    backgroundColor: "white",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
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
  activeBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  inactiveBadge: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  iconButton: {
    padding: "0.25rem",
    color: "#6b7280",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
  },
  orderControls: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  orderNumber: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#111827",
    marginRight: "0.25rem",
  },
  mealImage: {
    width: "3rem",
    height: "5rem",
    borderRadius: "0.5rem",
    objectFit: "cover" as const,
  },
  mealInfo: {
    marginLeft: "1rem",
  },
  mealTitle: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#111827",
  },
  mealSubtitle: {
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  colorSwatch: {
    width: "1rem",
    height: "1rem",
    borderRadius: "0.25rem",
    marginRight: "0.5rem",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column" as const,
  },
  price: {
    fontSize: "0.875rem",
    color: "#111827",
  },
  originalPrice: {
    fontSize: "0.75rem",
    color: "#6b7280",
    textDecoration: "line-through",
    marginLeft: "0.5rem",
  },
  discount: {
    fontSize: "0.75rem",
    color: "#059669",
    fontWeight: "500",
  },
  actionButtons: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    color: "#6b7280",
  },
  error: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    color: "#dc2626",
    backgroundColor: "#fee2e2",
    borderRadius: "0.375rem",
    margin: "1rem 0",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "3rem 0",
    color: "#6b7280",
  },
};

export default function CarouselManagement() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<CarouselItem | null>(null);
  const [previewItem, setPreviewItem] = useState<CarouselItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  // Load carousel items on component mount
  useEffect(() => {
    loadCarouselItems();
  }, []);

  const loadCarouselItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await CarouselService.getAllCarouselItems({
        orderBy: "display_order",
        ascending: true,
      });
      setCarouselItems(items);
    } catch (err) {
      console.error("Error loading carousel items:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load carousel items"
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter items based on search and status
  const filteredItems = carouselItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && item.is_active) ||
      (statusFilter === "inactive" && !item.is_active);

    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((item) => item.id));
    }
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: CarouselItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handlePreview = (item: CarouselItem) => {
    setPreviewItem(item);
    setShowPreview(true);
  };

  const handleToggleActive = async (itemId: string) => {
    try {
      const item = carouselItems.find((i) => i.id === itemId);
      if (!item) return;

      await CarouselService.toggleCarouselItemStatus(itemId, !item.is_active);
      await loadCarouselItems(); // Refresh the list
    } catch (err) {
      console.error("Error toggling item status:", err);
      alert("Failed to update item status");
    }
  };

  const handleMoveUp = async (itemId: string) => {
    const currentIndex = carouselItems.findIndex((item) => item.id === itemId);
    if (currentIndex <= 0) return;

    const items = [...carouselItems];
    const temp = items[currentIndex].display_order;
    items[currentIndex].display_order = items[currentIndex - 1].display_order;
    items[currentIndex - 1].display_order = temp;

    try {
      await CarouselService.updateDisplayOrders([
        {
          id: items[currentIndex].id,
          display_order: items[currentIndex].display_order,
        },
        {
          id: items[currentIndex - 1].id,
          display_order: items[currentIndex - 1].display_order,
        },
      ]);
      await loadCarouselItems();
    } catch (err) {
      console.error("Error updating display order:", err);
      alert("Failed to update display order");
    }
  };

  const handleMoveDown = async (itemId: string) => {
    const currentIndex = carouselItems.findIndex((item) => item.id === itemId);
    if (currentIndex >= carouselItems.length - 1) return;

    const items = [...carouselItems];
    const temp = items[currentIndex].display_order;
    items[currentIndex].display_order = items[currentIndex + 1].display_order;
    items[currentIndex + 1].display_order = temp;

    try {
      await CarouselService.updateDisplayOrders([
        {
          id: items[currentIndex].id,
          display_order: items[currentIndex].display_order,
        },
        {
          id: items[currentIndex + 1].id,
          display_order: items[currentIndex + 1].display_order,
        },
      ]);
      await loadCarouselItems();
    } catch (err) {
      console.error("Error updating display order:", err);
      alert("Failed to update display order");
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this carousel item?")) return;

    try {
      await CarouselService.deleteCarouselItem(itemId);
      await loadCarouselItems(); // Refresh the list
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    if (
      !confirm(
        `Are you sure you want to delete ${selectedItems.length} selected items?`
      )
    )
      return;

    try {
      await Promise.all(
        selectedItems.map((id) => CarouselService.deleteCarouselItem(id))
      );
      setSelectedItems([]);
      await loadCarouselItems();
    } catch (err) {
      console.error("Error deleting items:", err);
      alert("Failed to delete selected items");
    }
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      if (editingItem) {
        // Update existing item
        await CarouselService.updateCarouselItem(editingItem.id, formData);
      } else {
        // Create new item
        await CarouselService.createCarouselItem(formData);
      }

      setShowForm(false);
      setEditingItem(null);
      await loadCarouselItems(); // Refresh the list
    } catch (err) {
      console.error("Error saving item:", err);
      alert(err instanceof Error ? err.message : "Failed to save item");
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div>Loading carousel items...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <div>
            <strong>Error:</strong> {error}
            <button
              onClick={loadCarouselItems}
              style={{
                marginLeft: "1rem",
                padding: "0.25rem 0.5rem",
                backgroundColor: "white",
                border: "1px solid #d1d5db",
                borderRadius: "0.25rem",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Actions Bar */}
      <div style={styles.actionsBar}>
        <div style={styles.leftActions}>
          <button
            onClick={handleAddNew}
            style={styles.primaryButton}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#1d4ed8")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563eb")
            }
          >
            <PlusIcon
              style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
            />
            Add Carousel Item
          </button>
          {selectedItems.length > 0 && (
            <button onClick={handleBulkDelete} style={styles.secondaryButton}>
              <TrashIcon
                style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
              />
              Delete Selected ({selectedItems.length})
            </button>
          )}
        </div>
        <div style={styles.rightActions}>
          <input
            type="text"
            placeholder="Search carousel items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | "active" | "inactive")
            }
            style={styles.select}
          >
            <option value="all">All Items</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Carousel Items Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>
                <input
                  type="checkbox"
                  checked={
                    selectedItems.length === filteredItems.length &&
                    filteredItems.length > 0
                  }
                  onChange={handleSelectAll}
                  style={{ width: "1rem", height: "1rem" }}
                />
              </th>
              <th style={styles.tableHeaderCell}>Order</th>
              <th style={styles.tableHeaderCell}>Item</th>
              <th style={styles.tableHeaderCell}>Content</th>
              <th style={styles.tableHeaderCell}>Price</th>
              <th style={styles.tableHeaderCell}>Action</th>
              <th style={styles.tableHeaderCell}>Status</th>
              <th style={styles.tableHeaderCell}>Schedule</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} style={styles.tableRow}>
                <td style={styles.tableCell}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    style={{ width: "1rem", height: "1rem" }}
                  />
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.orderControls}>
                    <span style={styles.orderNumber}>{item.display_order}</span>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <button
                        onClick={() => handleMoveUp(item.id)}
                        style={styles.iconButton}
                        disabled={
                          carouselItems.findIndex((i) => i.id === item.id) === 0
                        }
                      >
                        <ArrowUpIcon
                          style={{ width: "0.75rem", height: "0.75rem" }}
                        />
                      </button>
                      <button
                        onClick={() => handleMoveDown(item.id)}
                        style={styles.iconButton}
                        disabled={
                          carouselItems.findIndex((i) => i.id === item.id) ===
                          carouselItems.length - 1
                        }
                      >
                        <ArrowDownIcon
                          style={{ width: "0.75rem", height: "0.75rem" }}
                        />
                      </button>
                    </div>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      style={styles.mealImage}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTI4IDI4TDM2IDM2TDQwIDMyIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";
                      }}
                    />
                    <div style={styles.mealInfo}>
                      <div style={styles.mealTitle}>{item.title}</div>
                      <div style={styles.mealSubtitle}>{item.subtitle}</div>
                    </div>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div>{item.description || "No description"}</div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0.25rem",
                    }}
                  >
                    <div
                      style={{
                        ...styles.colorSwatch,
                        backgroundColor: item.background_color,
                      }}
                    />
                    <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      {item.background_color}
                    </span>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.priceContainer}>
                    <div style={styles.price}>
                      {item.price ? `$${item.price}` : "No price"}
                      {item.original_price && (
                        <span style={styles.originalPrice}>
                          ${item.original_price}
                        </span>
                      )}
                    </div>
                    {item.discount && (
                      <div style={styles.discount}>{item.discount}</div>
                    )}
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.price}>{item.action_type}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    {item.action_value || "No action"}
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <button
                    onClick={() => handleToggleActive(item.id)}
                    style={{
                      ...styles.badge,
                      ...(item.is_active
                        ? styles.activeBadge
                        : styles.inactiveBadge),
                    }}
                  >
                    {item.is_active ? (
                      <PlayIcon
                        style={{
                          width: "0.75rem",
                          height: "0.75rem",
                          marginRight: "0.25rem",
                        }}
                      />
                    ) : (
                      <PauseIcon
                        style={{
                          width: "0.75rem",
                          height: "0.75rem",
                          marginRight: "0.25rem",
                        }}
                      />
                    )}
                    {item.is_active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td style={styles.tableCell}>
                  {item.start_date ? (
                    <div>
                      <div>
                        Start: {new Date(item.start_date).toLocaleDateString()}
                      </div>
                      {item.end_date && (
                        <div>
                          End: {new Date(item.end_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ) : (
                    "Always active"
                  )}
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.actionButtons}>
                    <button
                      onClick={() => handlePreview(item)}
                      style={{ ...styles.iconButton, color: "#2563eb" }}
                    >
                      <EyeIcon style={{ width: "1rem", height: "1rem" }} />
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      style={{ ...styles.iconButton, color: "#7c3aed" }}
                    >
                      <PencilIcon style={{ width: "1rem", height: "1rem" }} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{ ...styles.iconButton, color: "#dc2626" }}
                    >
                      <TrashIcon style={{ width: "1rem", height: "1rem" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredItems.length === 0 && !loading && (
        <div style={styles.emptyState}>
          <PlusIcon
            style={{ width: "3rem", height: "3rem", marginBottom: "1rem" }}
          />
          <div
            style={{
              fontSize: "1.125rem",
              fontWeight: "500",
              marginBottom: "0.5rem",
            }}
          >
            {searchTerm || statusFilter !== "all"
              ? "No items match your filters"
              : "No carousel items found"}
          </div>
          <div style={{ fontSize: "0.875rem" }}>
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Create your first carousel item to get started"}
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <CarouselItemForm
          item={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      )}

      {/* Preview Modal */}
      {showPreview && (
        <CarouselPreview
          item={previewItem}
          onClose={() => {
            setShowPreview(false);
            setPreviewItem(null);
          }}
        />
      )}
    </div>
  );
}
