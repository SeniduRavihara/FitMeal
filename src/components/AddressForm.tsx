import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { AddressService, CreateAddressData } from "../services/AddressService";
import { AppText } from "./AppText";
import { Button } from "./Button";

interface AddressFormProps {
  initialData?: Partial<CreateAddressData>;
  onSubmit: (addressData: CreateAddressData) => void;
  onCancel: () => void;
  title?: string;
  submitButtonText?: string;
}

export function AddressForm({
  initialData,
  onSubmit,
  onCancel,
  title = "Add Delivery Address",
  submitButtonText = "Save Address",
}: AddressFormProps) {
  const [formData, setFormData] = useState<CreateAddressData>({
    full_name: initialData?.full_name || "",
    phone_number: initialData?.phone_number || "",
    address_line1: initialData?.address_line1 || "",
    address_line2: initialData?.address_line2 || "",
    is_default: initialData?.is_default || false,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof CreateAddressData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Validate the form data
      const validation = AddressService.validateAddress(formData);

      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      // Submit the form
      onSubmit(formData);
    } catch (error) {
      console.error("Error submitting address:", error);
      setErrors(["Failed to save address. Please try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "white",
    marginBottom: 16,
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: "#EF4444",
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <View style={{ padding: 20 }}>
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <AppText
            variant="h2"
            weight="bold"
            color="primary"
            style={{ marginBottom: 8 }}
          >
            {title}
          </AppText>
          <AppText variant="body" color="secondary">
            Please provide your delivery address for cash on delivery
          </AppText>
        </View>

        {/* Error Messages */}
        {errors.length > 0 && (
          <View
            style={{
              backgroundColor: "#FEF2F2",
              borderColor: "#FECACA",
              borderWidth: 1,
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
            }}
          >
            {errors.map((error, index) => (
              <AppText
                key={index}
                variant="body"
                color="#DC2626"
                style={{ marginBottom: 4 }}
              >
                • {error}
              </AppText>
            ))}
          </View>
        )}

        {/* Form Fields */}
        <View style={{ marginBottom: 24 }}>
          {/* Full Name */}
          <View style={{ marginBottom: 16 }}>
            <AppText
              variant="body"
              weight="medium"
              color="primary"
              style={{ marginBottom: 8 }}
            >
              Full Name *
            </AppText>
            <TextInput
              style={
                errors.some((e) => e.includes("Full name"))
                  ? errorInputStyle
                  : inputStyle
              }
              placeholder="Enter your full name"
              value={formData.full_name}
              onChangeText={(value) => handleInputChange("full_name", value)}
              autoCapitalize="words"
            />
          </View>

          {/* Phone Number */}
          <View style={{ marginBottom: 16 }}>
            <AppText
              variant="body"
              weight="medium"
              color="primary"
              style={{ marginBottom: 8 }}
            >
              Phone Number *
            </AppText>
            <TextInput
              style={
                errors.some((e) => e.includes("Phone number"))
                  ? errorInputStyle
                  : inputStyle
              }
              placeholder="+94 77 123 4567"
              value={formData.phone_number}
              onChangeText={(value) => handleInputChange("phone_number", value)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Address Line 1 */}
          <View style={{ marginBottom: 16 }}>
            <AppText
              variant="body"
              weight="medium"
              color="primary"
              style={{ marginBottom: 8 }}
            >
              Address Line 1 *
            </AppText>
            <TextInput
              style={
                errors.some((e) => e.includes("Address line 1"))
                  ? errorInputStyle
                  : inputStyle
              }
              placeholder="Street address, building name"
              value={formData.address_line1}
              onChangeText={(value) =>
                handleInputChange("address_line1", value)
              }
              autoCapitalize="words"
            />
          </View>

          {/* Address Line 2 */}
          <View style={{ marginBottom: 16 }}>
            <AppText
              variant="body"
              weight="medium"
              color="primary"
              style={{ marginBottom: 8 }}
            >
              Address Line 2
            </AppText>
            <TextInput
              style={inputStyle}
              placeholder="Apartment, suite, unit (optional)"
              value={formData.address_line2}
              onChangeText={(value) =>
                handleInputChange("address_line2", value)
              }
              autoCapitalize="words"
            />
          </View>

          {/* Set as Default Address */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: "white",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: formData.is_default ? "#007AFF" : "#E5E5E5",
              marginBottom: 24,
            }}
            onPress={() =>
              handleInputChange("is_default", !formData.is_default)
            }
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: formData.is_default ? "#007AFF" : "#D1D5DB",
                backgroundColor: formData.is_default
                  ? "#007AFF"
                  : "transparent",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              {formData.is_default && (
                <Ionicons name="checkmark" size={12} color="white" />
              )}
            </View>
            <AppText variant="body" color="primary">
              Set as default address
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={{ gap: 12 }}>
          <Button
            title={submitButtonText}
            onPress={handleSubmit}
            variant="primary"
            size="large"
            fullWidth
            loading={isSubmitting}
          />

          <Button
            title="Cancel"
            onPress={onCancel}
            variant="outline"
            size="large"
            fullWidth
          />
        </View>
      </View>
    </ScrollView>
  );
}
