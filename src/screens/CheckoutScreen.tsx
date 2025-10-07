import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddressForm } from "../components/AddressForm";
import { AppText } from "../components/AppText";
import { Button } from "../components/Button";
import { CustomAlert } from "../components/CustomAlert";
import { useCustomMealCart } from "../contexts/CustomMealCartContext";
import { useCustomAlert } from "../hooks/useCustomAlert";
import { Address, AddressService } from "../services/AddressService";
import { OrderService } from "../services/OrderService";
import { formatMacroValue } from "../utils/macroCalculator";
import { getScrollViewContentStyle } from "../utils/navigationSpacing";

export function CheckoutScreen() {
  const { items, clearCart, getTotalPrice } = useCustomMealCart();
  const {
    showSuccess,
    showError,
    visible,
    alertConfig,
    handleConfirm,
    handleCancel,
  } = useCustomAlert();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [loading, setLoading] = useState(true);

  const deliveryFee = 200;
  const subtotal = getTotalPrice();
  const totalAmount = subtotal + deliveryFee;

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const userAddresses = await AddressService.getUserAddresses();
      setAddresses(userAddresses);

      // Auto-select default address if available
      const defaultAddress = userAddresses.find((addr) => addr.is_default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
      showError("Error", "Failed to load addresses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleAddNewAddress = () => {
    setShowAddressForm(true);
  };

  const handleAddressFormSubmit = async (addressData: any) => {
    try {
      const newAddress = await AddressService.createAddress(addressData);
      setAddresses((prev) => [newAddress, ...prev]);
      setSelectedAddress(newAddress);
      setShowAddressForm(false);
      showSuccess("Success!", "Address saved successfully.");
    } catch (error) {
      console.error("Error creating address:", error);
      showError("Error", "Failed to save address. Please try again.");
    }
  };

  const handleProceedToPayment = async () => {
    if (!selectedAddress) {
      showError("Missing Address", "Please select or add a delivery address.");
      return;
    }

    setIsCreatingOrder(true);

    try {
      // Convert cart items to order data
      const orderData = OrderService.convertCartToOrderData(
        items,
        selectedAddress,
        deliveryFee,
        "Cash on delivery order"
      );

      // Create the order
      const order = await OrderService.createOrder(orderData);

      // Clear the cart
      clearCart();

      // Show success message
      showSuccess(
        "Order Placed! 🎉",
        `Your order #${order.order_number} has been placed successfully. We'll contact you soon for delivery confirmation.`,
        () => {
          // Navigate back to home
          router.push("/(tabs)/");
        }
      );
    } catch (error) {
      console.error("Error creating order:", error);
      showError("Order Failed", "Failed to place order. Please try again.");
    } finally {
      setIsCreatingOrder(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <AppText variant="body" color="secondary">
            Loading addresses...
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
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <AppText variant="h3" weight="semibold" color="primary">
          Checkout
        </AppText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={getScrollViewContentStyle()}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Summary */}
        <View style={{ padding: 20 }}>
          <AppText
            variant="h4"
            weight="semibold"
            color="primary"
            style={{ marginBottom: 16 }}
          >
            Order Summary
          </AppText>

          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
            }}
          >
            {items.map((item) => (
              <View key={item.id} style={{ marginBottom: 16 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <AppText variant="body" weight="medium" color="primary">
                    {item.mealBase.name}
                  </AppText>
                  <AppText variant="body" weight="medium" color="primary">
                    LKR {item.totalPrice}
                  </AppText>
                </View>
                <AppText variant="caption" color="secondary">
                  {item.customization.focus} focus •{" "}
                  {formatMacroValue(item.customization.targetAmount)} • Qty:{" "}
                  {item.quantity}
                </AppText>
              </View>
            ))}

            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#E5E5E5",
                paddingTop: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <AppText variant="body" color="secondary">
                  Subtotal:
                </AppText>
                <AppText variant="body" color="primary">
                  LKR {subtotal}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <AppText variant="body" color="secondary">
                  Delivery Fee:
                </AppText>
                <AppText variant="body" color="primary">
                  LKR {deliveryFee}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderTopWidth: 1,
                  borderTopColor: "#E5E5E5",
                  paddingTop: 8,
                }}
              >
                <AppText variant="h4" weight="bold" color="primary">
                  Total:
                </AppText>
                <AppText variant="h4" weight="bold" color="primary">
                  LKR {totalAmount}
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <AppText variant="h4" weight="semibold" color="primary">
              Delivery Address
            </AppText>
            <TouchableOpacity onPress={handleAddNewAddress}>
              <AppText variant="body" color="accent">
                Add New
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Address List */}
          {addresses.length > 0 ? (
            <View style={{ gap: 12 }}>
              {addresses.map((address) => (
                <TouchableOpacity
                  key={address.id}
                  onPress={() => handleAddressSelect(address)}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 16,
                    padding: 16,
                    borderWidth: 2,
                    borderColor:
                      selectedAddress?.id === address.id
                        ? "#007AFF"
                        : "#E5E5E5",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <AppText
                        variant="body"
                        weight="semibold"
                        color="primary"
                        style={{ marginBottom: 4 }}
                      >
                        {address.full_name}
                      </AppText>
                      <AppText
                        variant="body"
                        color="secondary"
                        style={{ marginBottom: 2 }}
                      >
                        {address.phone_number}
                      </AppText>
                      <AppText
                        variant="body"
                        color="secondary"
                        style={{ marginBottom: 2 }}
                      >
                        {address.address_line1}
                      </AppText>
                      {address.address_line2 && (
                        <AppText variant="body" color="secondary">
                          {address.address_line2}
                        </AppText>
                      )}
                    </View>

                    {selectedAddress?.id === address.id && (
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: "#007AFF",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons name="checkmark" size={16} color="white" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 32,
                alignItems: "center",
                borderWidth: 2,
                borderColor: "#E5E5E5",
                borderStyle: "dashed",
              }}
            >
              <Ionicons name="location-outline" size={48} color="#D1D5DB" />
              <AppText
                variant="body"
                color="secondary"
                style={{ marginTop: 12, textAlign: "center" }}
              >
                No addresses found. Add your first delivery address to continue.
              </AppText>
            </View>
          )}
        </View>

        {/* Payment Method */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <AppText
            variant="h4"
            weight="semibold"
            color="primary"
            style={{ marginBottom: 16 }}
          >
            Payment Method
          </AppText>

          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: "#F0F9FF",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <Ionicons name="cash-outline" size={24} color="#007AFF" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText variant="body" weight="semibold" color="primary">
                Cash on Delivery
              </AppText>
              <AppText variant="caption" color="secondary">
                Pay when your order arrives
              </AppText>
            </View>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: "#007AFF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Proceed Button */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E5E5",
        }}
      >
        <Button
          title={`Place Order - LKR ${totalAmount}`}
          onPress={handleProceedToPayment}
          variant="primary"
          size="large"
          fullWidth
          loading={isCreatingOrder}
          disabled={!selectedAddress}
        />
      </View>

      {/* Address Form Modal */}
      <Modal
        visible={showAddressForm}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
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
            <TouchableOpacity onPress={() => setShowAddressForm(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <AppText variant="h3" weight="semibold" color="primary">
              Add Address
            </AppText>
            <View style={{ width: 24 }} />
          </View>

          <AddressForm
            onSubmit={handleAddressFormSubmit}
            onCancel={() => setShowAddressForm(false)}
          />
        </SafeAreaView>
      </Modal>

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
