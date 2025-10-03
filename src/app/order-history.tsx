import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-20",
    status: "delivered",
    total: 89.97,
    items: [
      {
        id: "1",
        name: "Grilled Chicken Bowl",
        image:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&h=100&fit=crop",
        quantity: 2,
        price: 24.99,
      },
      {
        id: "2",
        name: "Protein Smoothie",
        image:
          "https://images.unsplash.com/photo-1553530666-ba11a7d1f7e0?w=100&h=100&fit=crop",
        quantity: 1,
        price: 12.99,
      },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-18",
    status: "out_for_delivery",
    total: 67.45,
    items: [
      {
        id: "3",
        name: "Veggie Power Bowl",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop",
        quantity: 1,
        price: 19.99,
      },
    ],
  },
  {
    id: "ORD-003",
    date: "2024-01-15",
    status: "cancelled",
    total: 45.98,
    items: [
      {
        id: "4",
        name: "Keto Salad",
        image:
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&h=100&fit=crop",
        quantity: 1,
        price: 22.99,
      },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "text-green-600 bg-green-100";
    case "out_for_delivery":
      return "text-blue-600 bg-blue-100";
    case "preparing":
      return "text-yellow-600 bg-yellow-100";
    case "cancelled":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "delivered":
      return "Delivered";
    case "out_for_delivery":
      return "Out for Delivery";
    case "preparing":
      return "Preparing";
    case "cancelled":
      return "Cancelled";
    default:
      return "Pending";
  }
};

export default function OrderHistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredOrders =
    selectedFilter === "all"
      ? mockOrders
      : mockOrders.filter((order) => order.status === selectedFilter);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-4 pb-2 bg-white border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#FB923C" />
          </TouchableOpacity>
          <AppText className="text-xl font-bold text-gray-900">
            Order History
          </AppText>
        </View>
      </View>

      {/* Filter Tabs */}
      <View className="px-6 py-4 bg-white">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-3">
            {[
              "all",
              "delivered",
              "out_for_delivery",
              "preparing",
              "cancelled",
            ].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full ${
                  selectedFilter === filter ? "bg-orange-500" : "bg-gray-100"
                }`}
              >
                <AppText
                  className={`text-sm font-medium ${
                    selectedFilter === filter ? "text-white" : "text-gray-700"
                  }`}
                >
                  {filter === "all" ? "All" : getStatusText(filter)}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {filteredOrders.length === 0 ? (
          <View className="items-center py-20">
            <Ionicons name="receipt-outline" size={64} color="#D1D5DB" />
            <AppText className="text-lg font-medium text-gray-500 mt-4 text-center">
              No orders found
            </AppText>
            <AppText className="text-base text-gray-400 text-center mt-2">
              Your order history will appear here
            </AppText>
          </View>
        ) : (
          <View className="py-4">
            {filteredOrders.map((order) => (
              <View
                key={order.id}
                className="bg-white rounded-xl p-4 mb-4 shadow-sm"
              >
                {/* Order Header */}
                <View className="flex-row justify-between items-center mb-4">
                  <View>
                    <AppText className="text-base font-semibold text-gray-900">
                      Order #{order.id}
                    </AppText>
                    <AppText className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </AppText>
                  </View>
                  <View className="items-end">
                    <View
                      className={`px-3 py-1 rounded-full ${getStatusColor(order.status)}`}
                    >
                      <AppText className="text-xs font-medium">
                        {getStatusText(order.status)}
                      </AppText>
                    </View>
                    <AppText className="text-lg font-bold text-gray-900 mt-1">
                      ${order.total.toFixed(2)}
                    </AppText>
                  </View>
                </View>

                {/* Order Items */}
                <View className="space-y-3">
                  {order.items.map((item) => (
                    <View key={item.id} className="flex-row items-center">
                      <Image
                        source={{ uri: item.image }}
                        className="w-12 h-12 rounded-lg"
                        resizeMode="cover"
                      />
                      <View className="flex-1 ml-3">
                        <AppText className="text-sm font-medium text-gray-900">
                          {item.name}
                        </AppText>
                        <AppText className="text-xs text-gray-500">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </AppText>
                      </View>
                      <AppText className="text-sm font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </AppText>
                    </View>
                  ))}
                </View>

                {/* Order Actions */}
                <View className="flex-row justify-end mt-4 pt-4 border-t border-gray-100">
                  <TouchableOpacity className="mr-3">
                    <AppText className="text-orange-500 font-medium">
                      Reorder
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AppText className="text-gray-600 font-medium">
                      View Details
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
