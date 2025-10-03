import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";

// Mock address data
const mockAddresses = [
  {
    id: "1",
    name: "Home",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    isDefault: true,
    phone: "+1 (555) 123-4567",
  },
  {
    id: "2",
    name: "Office",
    street: "456 Business Ave",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    country: "United States",
    isDefault: false,
    phone: "+1 (555) 987-6543",
  },
];

export default function ShippingAddressPage() {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  });

  const handleAddAddress = () => {
    if (
      !formData.name ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const newAddress = {
      id: Date.now().toString(),
      ...formData,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddress]);
    setShowAddForm(false);
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
    });
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone,
    });
    setShowAddForm(true);
  };

  const handleUpdateAddress = () => {
    if (
      !formData.name ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setAddresses(
      addresses.map((addr) =>
        addr.id === editingAddress.id ? { ...addr, ...formData } : addr
      )
    );

    setShowAddForm(false);
    setEditingAddress(null);
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
    });
  };

  const handleDeleteAddress = (addressId) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setAddresses(addresses.filter((addr) => addr.id !== addressId));
          },
        },
      ]
    );
  };

  const handleSetDefault = (addressId) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingAddress(null);
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-4 pb-2 bg-white border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Ionicons name="arrow-back" size={24} color="#FB923C" />
            </TouchableOpacity>
            <AppText className="text-xl font-bold text-gray-900">
              Shipping Address
            </AppText>
          </View>
          <TouchableOpacity
            onPress={() => setShowAddForm(true)}
            className="bg-orange-500 px-4 py-2 rounded-lg"
          >
            <AppText className="text-white font-medium">Add New</AppText>
          </TouchableOpacity>
        </View>
      </View>

      {showAddForm ? (
        /* Add/Edit Address Form */
        <ScrollView className="flex-1 px-6 py-4">
          <View className="bg-white rounded-xl p-6 shadow-sm">
            <AppText className="text-lg font-semibold text-gray-900 mb-6">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </AppText>

            <View className="space-y-4">
              <View>
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Address Name *
                </AppText>
                <TextInput
                  value={formData.name}
                  onChangeText={(text) =>
                    setFormData({ ...formData, name: text })
                  }
                  placeholder="e.g., Home, Office"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </AppText>
                <TextInput
                  value={formData.street}
                  onChangeText={(text) =>
                    setFormData({ ...formData, street: text })
                  }
                  placeholder="123 Main Street"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <AppText className="text-sm font-medium text-gray-700 mb-2">
                    City *
                  </AppText>
                  <TextInput
                    value={formData.city}
                    onChangeText={(text) =>
                      setFormData({ ...formData, city: text })
                    }
                    placeholder="New York"
                    className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <View className="w-24">
                  <AppText className="text-sm font-medium text-gray-700 mb-2">
                    State *
                  </AppText>
                  <TextInput
                    value={formData.state}
                    onChangeText={(text) =>
                      setFormData({ ...formData, state: text })
                    }
                    placeholder="NY"
                    className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <View className="w-24">
                  <AppText className="text-sm font-medium text-gray-700 mb-2">
                    ZIP *
                  </AppText>
                  <TextInput
                    value={formData.zipCode}
                    onChangeText={(text) =>
                      setFormData({ ...formData, zipCode: text })
                    }
                    placeholder="10001"
                    className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              <View>
                <AppText className="text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </AppText>
                <TextInput
                  value={formData.phone}
                  onChangeText={(text) =>
                    setFormData({ ...formData, phone: text })
                  }
                  placeholder="+1 (555) 123-4567"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View className="flex-row space-x-3 mt-6">
              <TouchableOpacity
                onPress={cancelForm}
                className="flex-1 border border-gray-300 py-3 rounded-lg"
              >
                <AppText className="text-gray-700 text-center font-medium">
                  Cancel
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  editingAddress ? handleUpdateAddress : handleAddAddress
                }
                className="flex-1 bg-orange-500 py-3 rounded-lg"
              >
                <AppText className="text-white text-center font-medium">
                  {editingAddress ? "Update" : "Add Address"}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        /* Address List */
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          {addresses.length === 0 ? (
            <View className="items-center py-20">
              <Ionicons name="location-outline" size={64} color="#D1D5DB" />
              <AppText className="text-lg font-medium text-gray-500 mt-4 text-center">
                No addresses saved
              </AppText>
              <AppText className="text-base text-gray-400 text-center mt-2">
                Add your first shipping address
              </AppText>
            </View>
          ) : (
            <View className="py-4">
              {addresses.map((address) => (
                <View
                  key={address.id}
                  className="bg-white rounded-xl p-4 mb-4 shadow-sm"
                >
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                      <View className="flex-row items-center">
                        <AppText className="text-base font-semibold text-gray-900">
                          {address.name}
                        </AppText>
                        {address.isDefault && (
                          <View className="ml-2 bg-orange-100 px-2 py-1 rounded-full">
                            <AppText className="text-xs font-medium text-orange-600">
                              Default
                            </AppText>
                          </View>
                        )}
                      </View>
                      <AppText className="text-sm text-gray-600 mt-1">
                        {address.street}
                      </AppText>
                      <AppText className="text-sm text-gray-600">
                        {address.city}, {address.state} {address.zipCode}
                      </AppText>
                      <AppText className="text-sm text-gray-600">
                        {address.country}
                      </AppText>
                      {address.phone && (
                        <AppText className="text-sm text-gray-600 mt-1">
                          {address.phone}
                        </AppText>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteAddress(address.id)}
                      className="ml-2"
                    >
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#EF4444"
                      />
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row space-x-3">
                    {!address.isDefault && (
                      <TouchableOpacity
                        onPress={() => handleSetDefault(address.id)}
                        className="flex-1 border border-orange-200 py-2 rounded-lg"
                      >
                        <AppText className="text-orange-500 text-center font-medium">
                          Set as Default
                        </AppText>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => handleEditAddress(address)}
                      className="flex-1 border border-gray-300 py-2 rounded-lg"
                    >
                      <AppText className="text-gray-700 text-center font-medium">
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
    </SafeAreaView>
  );
}
