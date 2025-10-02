"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import {
  CarouselItem,
  CarouselItemInsert,
  CarouselItemUpdate,
} from "../../supabase/services/CarouselService";
import CarouselPreview from "./CarouselPreview";

type CarouselItemFormProps = {
  item?: CarouselItem | null;
  onSubmit: (data: CarouselItemInsert | CarouselItemUpdate) => void;
  onCancel: () => void;
};

const styles = {
  overlay: {
    position: "fixed" as const,
    inset: "0",
    backgroundColor: "rgba(75, 85, 99, 0.5)",
    overflowY: "auto" as const,
    height: "100%",
    width: "100%",
    zIndex: 50,
  },
  modal: {
    position: "relative" as const,
    top: "5rem",
    margin: "0 auto",
    padding: "1.25rem",
    border: "1px solid #e5e7eb",
    width: "91.666667%",
    maxWidth: "56rem",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    borderRadius: "0.375rem",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.125rem",
    fontWeight: "500",
    color: "#111827",
  },
  closeButton: {
    color: "#9ca3af",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    padding: "0.25rem",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
  },
  section: {
    backgroundColor: "#f9fafb",
    padding: "1rem",
    borderRadius: "0.5rem",
  },
  sectionTitle: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#111827",
    marginBottom: "0.75rem",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  field: {
    display: "flex",
    flexDirection: "column" as const,
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "0.25rem",
  },
  input: {
    display: "block",
    width: "100%",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    fontSize: "0.875rem",
    padding: "0.5rem 0.75rem",
    color: "#111827",
    backgroundColor: "#ffffff",
  },
  inputError: {
    borderColor: "#fca5a5",
  },
  textarea: {
    display: "block",
    width: "100%",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    fontSize: "0.875rem",
    padding: "0.5rem 0.75rem",
    color: "#111827",
    backgroundColor: "#ffffff",
    resize: "vertical" as const,
  },
  select: {
    display: "block",
    width: "100%",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    fontSize: "0.875rem",
    padding: "0.5rem 0.75rem",
    color: "#111827",
    backgroundColor: "#ffffff",
  },
  colorInputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  colorPicker: {
    height: "2.5rem",
    width: "5rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
  },
  gridTwo: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  gridThree: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "1rem",
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    marginTop: "1rem",
  },
  checkboxInput: {
    height: "1rem",
    width: "1rem",
    color: "#2563eb",
    borderRadius: "0.25rem",
    border: "1px solid #d1d5db",
    marginRight: "0.5rem",
  },
  checkboxLabel: {
    fontSize: "0.875rem",
    color: "#374151",
  },
  error: {
    marginTop: "0.25rem",
    fontSize: "0.875rem",
    color: "#dc2626",
  },
  previewSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  previewHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.75rem",
  },
  previewButton: {
    fontSize: "0.875rem",
    color: "#2563eb",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    textDecoration: "underline",
  },
  miniPreview: {
    position: "relative" as const,
    borderRadius: "0.5rem",
    padding: "1rem",
    minHeight: "12.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  previewContent: {
    flex: "1",
  },
  previewTitle: {
    fontSize: "1.125rem",
    fontWeight: "bold",
    marginBottom: "0.25rem",
  },
  previewSubtitle: {
    fontSize: "0.875rem",
    opacity: 0.9,
    marginBottom: "0.25rem",
  },
  previewDescription: {
    fontSize: "0.75rem",
    opacity: 0.75,
    marginBottom: "0.75rem",
  },
  previewPrice: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  previewPriceMain: {
    fontSize: "1.125rem",
    fontWeight: "bold",
  },
  previewPriceOriginal: {
    fontSize: "0.875rem",
    textDecoration: "line-through",
    opacity: 0.75,
  },
  previewDiscount: {
    display: "inline-block",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    fontSize: "0.75rem",
    fontWeight: "500",
    marginTop: "0.5rem",
  },
  previewImage: {
    width: "4rem",
    height: "4rem",
    marginLeft: "1rem",
    borderRadius: "0.5rem",
    objectFit: "cover" as const,
  },
  previewInfo: {
    marginTop: "0.75rem",
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  formActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #e5e7eb",
  },
  cancelButton: {
    padding: "0.5rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    backgroundColor: "white",
    cursor: "pointer",
  },
  submitButton: {
    padding: "0.5rem 1rem",
    border: "1px solid transparent",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "white",
    backgroundColor: "#2563eb",
    cursor: "pointer",
  },
};

export default function CarouselItemForm({
  item,
  onSubmit,
  onCancel,
}: CarouselItemFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image_url: "",
    price: "",
    original_price: "",
    discount: "",
    background_color: "#EF4444",
    text_color: "#FFFFFF",
    action_type: "meal",
    action_value: "",
    is_active: true,
    display_order: 0,
    start_date: "",
    end_date: "",
  });

  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        subtitle: item.subtitle || "",
        description: item.description || "",
        image_url: item.image_url || "",
        price: item.price?.toString() || "",
        original_price: item.original_price?.toString() || "",
        discount: item.discount || "",
        background_color: item.background_color || "#EF4444",
        text_color: item.text_color || "#FFFFFF",
        action_type: item.action_type || "meal",
        action_value: item.action_value || "",
        is_active: item.is_active ?? true,
        display_order: item.display_order || 0,
        start_date: item.start_date ? item.start_date.split("T")[0] : "",
        end_date: item.end_date ? item.end_date.split("T")[0] : "",
      });
    }
  }, [item]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.subtitle.trim()) newErrors.subtitle = "Subtitle is required";
    if (!formData.image_url.trim())
      newErrors.image_url = "Image URL is required";

    // Validate URL format
    if (formData.image_url && !isValidUrl(formData.image_url)) {
      newErrors.image_url = "Please enter a valid URL";
    }

    // Validate price format
    if (formData.price && isNaN(parseFloat(formData.price))) {
      newErrors.price = "Please enter a valid price";
    }

    if (formData.original_price && isNaN(parseFloat(formData.original_price))) {
      newErrors.original_price = "Please enter a valid original price";
    }

    // Validate color format
    if (!isValidHexColor(formData.background_color)) {
      newErrors.background_color = "Please enter a valid hex color";
    }

    if (!isValidHexColor(formData.text_color)) {
      newErrors.text_color = "Please enter a valid hex color";
    }

    // Validate action value is provided
    if (!formData.action_value.trim()) {
      newErrors.action_value = "Action value is required";
    }

    // Validate date logic
    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      if (startDate > endDate) {
        newErrors.end_date = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidHexColor = (color: string) => {
    return /^#[0-9A-F]{6}$/i.test(color);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData: CarouselItemInsert | CarouselItemUpdate = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description || null,
      image_url: formData.image_url,
      price: formData.price ? parseFloat(formData.price) : null,
      original_price: formData.original_price
        ? parseFloat(formData.original_price)
        : null,
      discount: formData.discount || null,
      background_color: formData.background_color,
      text_color: formData.text_color,
      action_type: formData.action_type,
      action_value: formData.action_value || null,
      is_active: formData.is_active,
      display_order: formData.display_order,
      start_date: formData.start_date
        ? new Date(formData.start_date).toISOString()
        : null,
      end_date: formData.end_date
        ? new Date(formData.end_date).toISOString()
        : null,
    };

    onSubmit(submitData);
  };

  const previewData = {
    ...formData,
    price: formData.price ? parseFloat(formData.price) : null,
    original_price: formData.original_price
      ? parseFloat(formData.original_price)
      : null,
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            {item ? "Edit Carousel Item" : "Add New Carousel Item"}
          </h3>
          <button onClick={onCancel} style={styles.closeButton}>
            <XMarkIcon style={{ height: "1.5rem", width: "1.5rem" }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid}>
            {/* Left Column - Form Fields */}
            <div style={styles.previewSection}>
              {/* Basic Information */}
              <div style={styles.section}>
                <h4 style={styles.sectionTitle}>Basic Information</h4>
                <div style={styles.fieldGroup}>
                  <div style={styles.field}>
                    <label style={styles.label}>Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      style={{
                        ...styles.input,
                        ...(errors.title ? styles.inputError : {}),
                      }}
                      placeholder="Flash Sale"
                    />
                    {errors.title && <p style={styles.error}>{errors.title}</p>}
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Subtitle *</label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      style={{
                        ...styles.input,
                        ...(errors.subtitle ? styles.inputError : {}),
                      }}
                      placeholder="Premium Meals"
                    />
                    {errors.subtitle && (
                      <p style={styles.error}>{errors.subtitle}</p>
                    )}
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={2}
                      style={styles.textarea}
                      placeholder="Limited time offer"
                    />
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Image URL *</label>
                    <input
                      type="url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      style={{
                        ...styles.input,
                        ...(errors.image_url ? styles.inputError : {}),
                      }}
                      placeholder="https://example.com/image.jpg"
                    />
                    {errors.image_url && (
                      <p style={styles.error}>{errors.image_url}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div style={styles.section}>
                <h4 style={styles.sectionTitle}>Pricing</h4>
                <div style={styles.fieldGroup}>
                  <div style={styles.gridTwo}>
                    <div style={styles.field}>
                      <label style={styles.label}>Price</label>
                      <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        style={{
                          ...styles.input,
                          ...(errors.price ? styles.inputError : {}),
                        }}
                        placeholder="49.99"
                      />
                      {errors.price && (
                        <p style={styles.error}>{errors.price}</p>
                      )}
                    </div>

                    <div style={styles.field}>
                      <label style={styles.label}>Original Price</label>
                      <input
                        type="number"
                        step="0.01"
                        name="original_price"
                        value={formData.original_price}
                        onChange={handleChange}
                        style={{
                          ...styles.input,
                          ...(errors.original_price ? styles.inputError : {}),
                        }}
                        placeholder="69.99"
                      />
                      {errors.original_price && (
                        <p style={styles.error}>{errors.original_price}</p>
                      )}
                    </div>
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Discount Text</label>
                    <input
                      type="text"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      style={styles.input}
                      placeholder="30% OFF"
                    />
                  </div>
                </div>
              </div>

              {/* Styling */}
              <div style={styles.section}>
                <h4 style={styles.sectionTitle}>Styling</h4>
                <div style={styles.fieldGroup}>
                  <div style={styles.gridTwo}>
                    <div style={styles.field}>
                      <label style={styles.label}>Background Color *</label>
                      <div style={styles.colorInputGroup}>
                        <input
                          type="color"
                          name="background_color"
                          value={formData.background_color}
                          onChange={handleChange}
                          style={styles.colorPicker}
                        />
                        <input
                          type="text"
                          name="background_color"
                          value={formData.background_color}
                          onChange={handleChange}
                          style={{
                            ...styles.input,
                            flex: "1",
                            ...(errors.background_color
                              ? styles.inputError
                              : {}),
                          }}
                          placeholder="#EF4444"
                        />
                      </div>
                      {errors.background_color && (
                        <p style={styles.error}>{errors.background_color}</p>
                      )}
                    </div>

                    <div style={styles.field}>
                      <label style={styles.label}>Text Color *</label>
                      <div style={styles.colorInputGroup}>
                        <input
                          type="color"
                          name="text_color"
                          value={formData.text_color}
                          onChange={handleChange}
                          style={styles.colorPicker}
                        />
                        <input
                          type="text"
                          name="text_color"
                          value={formData.text_color}
                          onChange={handleChange}
                          style={{
                            ...styles.input,
                            flex: "1",
                            ...(errors.text_color ? styles.inputError : {}),
                          }}
                          placeholder="#FFFFFF"
                        />
                      </div>
                      {errors.text_color && (
                        <p style={styles.error}>{errors.text_color}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div style={styles.section}>
                <h4 style={styles.sectionTitle}>Action</h4>
                <div style={styles.fieldGroup}>
                  <div style={styles.gridTwo}>
                    <div style={styles.field}>
                      <label style={styles.label}>Action Type</label>
                      <select
                        name="action_type"
                        value={formData.action_type}
                        onChange={handleChange}
                        style={styles.select}
                      >
                        <option value="meal">Specific Meal</option>
                        <option value="category">Meal Category</option>
                        <option value="external">External URL</option>
                      </select>
                    </div>

                    <div style={styles.field}>
                      <label style={styles.label}>Action Value *</label>
                      <input
                        type="text"
                        name="action_value"
                        value={formData.action_value}
                        onChange={handleChange}
                        style={{
                          ...styles.input,
                          ...(errors.action_value ? styles.inputError : {}),
                        }}
                        placeholder={
                          formData.action_type === "meal"
                            ? "Meal ID (e.g., 1)"
                            : formData.action_type === "category"
                              ? "Category (e.g., protein_rich)"
                              : "URL (e.g., https://example.com)"
                        }
                      />
                      {errors.action_value && (
                        <p style={styles.error}>{errors.action_value}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div style={styles.section}>
                <h4 style={styles.sectionTitle}>Settings</h4>
                <div style={styles.fieldGroup}>
                  <div style={styles.gridThree}>
                    <div style={styles.field}>
                      <label style={styles.label}>Display Order</label>
                      <input
                        type="number"
                        name="display_order"
                        value={formData.display_order}
                        onChange={handleChange}
                        style={styles.input}
                        min="0"
                      />
                    </div>

                    <div style={styles.field}>
                      <label style={styles.label}>Start Date</label>
                      <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.field}>
                      <label style={styles.label}>End Date</label>
                      <input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        style={{
                          ...styles.input,
                          ...(errors.end_date ? styles.inputError : {}),
                        }}
                      />
                      {errors.end_date && (
                        <p style={styles.error}>{errors.end_date}</p>
                      )}
                    </div>
                  </div>

                  <div style={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                      style={styles.checkboxInput}
                    />
                    <span style={styles.checkboxLabel}>Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div style={styles.previewSection}>
              <div style={styles.section}>
                <div style={styles.previewHeader}>
                  <h4 style={styles.sectionTitle}>Live Preview</h4>
                  <button
                    type="button"
                    onClick={() => setShowPreview(true)}
                    style={styles.previewButton}
                  >
                    Full Screen Preview
                  </button>
                </div>

                {/* Mini Preview */}
                <div
                  style={{
                    ...styles.miniPreview,
                    backgroundColor: formData.background_color,
                    color: formData.text_color,
                  }}
                >
                  <div style={styles.previewContent}>
                    <h3 style={styles.previewTitle}>
                      {formData.title || "Title"}
                    </h3>
                    <p style={styles.previewSubtitle}>
                      {formData.subtitle || "Subtitle"}
                    </p>
                    <p style={styles.previewDescription}>
                      {formData.description || "Description"}
                    </p>
                    <div style={styles.previewPrice}>
                      <span style={styles.previewPriceMain}>
                        ${formData.price || "0.00"}
                      </span>
                      {formData.original_price && (
                        <span style={styles.previewPriceOriginal}>
                          ${formData.original_price}
                        </span>
                      )}
                    </div>
                    {formData.discount && (
                      <div style={styles.previewDiscount}>
                        {formData.discount}
                      </div>
                    )}
                  </div>
                  {formData.image_url && (
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      style={styles.previewImage}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTI4IDI4TDM2IDM2TDQwIDMyIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";
                      }}
                    />
                  )}
                </div>

                <div style={styles.previewInfo}>
                  <p>
                    <strong>Action:</strong> {formData.action_type} →{" "}
                    {formData.action_value || "Not set"}
                  </p>
                  <p>
                    <strong>Order:</strong> {formData.display_order}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {formData.is_active ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div style={styles.formActions}>
            <button
              type="button"
              onClick={onCancel}
              style={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" style={styles.submitButton}>
              {item ? "Update Item" : "Create Item"}
            </button>
          </div>
        </form>

        {/* Full Screen Preview Modal */}
        {showPreview && (
          <CarouselPreview
            item={previewData as any}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </div>
  );
}
