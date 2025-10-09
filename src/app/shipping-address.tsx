import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddressForm } from "../components/AddressForm";
import { AppText } from "../components/AppText";
import { CustomAlert } from "../components/CustomAlert";
import { useCustomAlert } from "../hooks/useCustomAlert";
import { Address, AddressService } from "../services/AddressService";

export default function ShippingAddressPage() {
  const {
    showSuccess,
    showError,
    visible,
    alertConfig,
    handleConfirm,
    handleCancel,
  } = useCustomAlert();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const userAddresses = await AddressService.getUserAddresses();
      setAddresses(userAddresses);
    } catch (error) {
      console.error("Error loading addresses:", error);
      showError("Error", "Failed to load addresses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setShowAddressForm(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleAddressFormSubmit = async (addressData: any) => {
    try {
      if (editingAddress) {
        // Update existing address
        const updatedAddress = await AddressService.updateAddress(
          editingAddress.id,
          addressData
        );
        setAddresses((prev) =>
          prev.map((addr) =>
            addr.id === editingAddress.id ? updatedAddress : addr
          )
        );
        showSuccess("Success!", "Address updated successfully.");
      } else {
        // Create new address
        const newAddress = await AddressService.createAddress(addressData);
        setAddresses((prev) => [newAddress, ...prev]);
        showSuccess("Success!", "Address saved successfully.");
      }
      setShowAddressForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error("Error saving address:", error);
      showError("Error", "Failed to save address. Please try again.");
    }
  };

  const handleDeleteAddress = (address: Address) => {
    showError(
      "Delete Address",
      `Are you sure you want to delete "${address.full_name}"'s address?`,
      () => {
        // Confirm delete
        deleteAddress(address.id);
      },
      () => {
        // Cancel - do nothing
      }
    );
  };

  const deleteAddress = async (addressId: string) => {
    try {
      await AddressService.deleteAddress(addressId);
      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
      showSuccess("Success!", "Address deleted successfully.");
    } catch (error) {
      console.error("Error deleting address:", error);
      showError("Error", "Failed to delete address. Please try again.");
    }
  };

  const handleSetDefault = async (address: Address) => {
    try {
      await AddressService.setDefaultAddress(address.id);
      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          is_default: addr.id === address.id,
        }))
      );
      showSuccess("Success!", "Default address updated successfully.");
    } catch (error) {
      console.error("Error setting default address:", error);
      showError("Error", "Failed to set default address. Please try again.");
    }
  };

  const formatAddress = (address: Address) => {
    const parts = [address.address_line1];
    if (address.address_line2) {
      parts.push(address.address_line2);
    }
    return parts.join(", ");
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color="#FB923C" />
          </TouchableOpacity>
          <AppText variant="h3" weight="semibold" color="primary">
            Shipping Address
          </AppText>
        </View>
        <TouchableOpacity
          onPress={handleAddNewAddress}
          style={{
            backgroundColor: "#FB923C",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        >
          <AppText variant="body" weight="medium" color="white">
            Add New
          </AppText>
        </TouchableOpacity>
      </View>

      {showAddressForm ? (
        /* Address Form Modal */
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowAddressForm(false);
                    setEditingAddress(null);
                  }}
                  style={{ marginRight: 16 }}
                >
                  <Ionicons name="close" size={24} color="#374151" />
                </TouchableOpacity>
                <AppText variant="h3" weight="semibold" color="primary">
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </AppText>
              </View>
            </View>

            <AddressForm
              initialData={
                editingAddress
                  ? {
                      full_name: editingAddress.full_name,
                      phone_number: editingAddress.phone_number,
                      address_line1: editingAddress.address_line1,
                      address_line2: editingAddress.address_line2,
                      latitude: editingAddress.latitude,
                      longitude: editingAddress.longitude,
                      is_default: editingAddress.is_default,
                    }
                  : undefined
              }
              onSubmit={handleAddressFormSubmit}
              onCancel={() => {
                setShowAddressForm(false);
                setEditingAddress(null);
              }}
              title={editingAddress ? "Edit Address" : "Add New Address"}
              submitButtonText={
                editingAddress ? "Update Address" : "Save Address"
              }
            />
          </SafeAreaView>
        </Modal>
      ) : (
        /* Address List */
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {addresses.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 80,
              }}
            >
              <Ionicons name="location-outline" size={64} color="#D1D5DB" />
              <AppText
                variant="h4"
                weight="medium"
                color="secondary"
                style={{ marginTop: 16, textAlign: "center" }}
              >
                No addresses saved
              </AppText>
              <AppText
                variant="body"
                color="secondary"
                style={{ marginTop: 8, textAlign: "center" }}
              >
                Add your first shipping address
              </AppText>
            </View>
          ) : (
            <View style={{ gap: 16 }}>
              {addresses.map((address) => (
                <View
                  key={address.id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 16,
                    padding: 16,
                    borderWidth: 2,
                    borderColor: address.is_default ? "#FB923C" : "#E5E5E5",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        <AppText variant="h4" weight="semibold" color="primary">
                          {address.full_name}
                        </AppText>
                        {address.is_default && (
                          <View
                            style={{
                              marginLeft: 8,
                              backgroundColor: "#FEF3C7",
                              paddingHorizontal: 8,
                              paddingVertical: 4,
                              borderRadius: 12,
                            }}
                          >
                            <AppText
                              variant="caption"
                              weight="medium"
                              color="#D97706"
                            >
                              Default
                            </AppText>
                          </View>
                        )}
                      </View>
                      <AppText
                        variant="body"
                        color="secondary"
                        style={{ marginBottom: 4 }}
                      >
                        {formatAddress(address)}
                      </AppText>
                      <AppText variant="body" color="secondary">
                        {address.phone_number}
                      </AppText>
                      {address.latitude && address.longitude && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 4,
                          }}
                        >
                          <Ionicons name="location" size={14} color="#10B981" />
                          <AppText
                            variant="caption"
                            color="secondary"
                            style={{ marginLeft: 4 }}
                          >
                            GPS: {address.latitude.toFixed(4)},{" "}
                            {address.longitude.toFixed(4)}
                          </AppText>
                        </View>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteAddress(address)}
                      style={{ marginLeft: 8 }}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#EF4444"
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: "row", gap: 12 }}>
                    {!address.is_default && (
                      <TouchableOpacity
                        onPress={() => handleSetDefault(address)}
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: "#FB923C",
                          paddingVertical: 12,
                          borderRadius: 8,
                          alignItems: "center",
                        }}
                      >
                        <AppText variant="body" weight="medium" color="#FB923C">
                          Set as Default
                        </AppText>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => handleEditAddress(address)}
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "#D1D5DB",
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: "center",
                      }}
                    >
                      <AppText variant="body" weight="medium" color="secondary">
                        Edit
                      </AppText>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}

      {/* Custom Alert */}
      <CustomAlert
        visible={visible}
        title={alertConfig?.title || ""}
        message={alertConfig?.message || ""}
        type={alertConfig?.type || "info"}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
}
