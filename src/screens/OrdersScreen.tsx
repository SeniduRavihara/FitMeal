import { View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";
import { Card } from "../components/common/Card";
import { Button } from "../components/Button";
import { DUMMY_ORDERS } from "../data/dummyData";
import { ORDER_STATUS } from "../constants";
import { Ionicons } from "@expo/vector-icons";

export function OrdersScreen() {
  const handleReorder = (orderId: string) => {
    // TODO: Implement reorder functionality
    console.log('Reorder:', orderId);
  };

  const handleTrackOrder = (orderId: string) => {
    // TODO: Implement order tracking
    console.log('Track order:', orderId);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <View className="px-6 pt-4 pb-6">
        <AppText className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Your Orders
        </AppText>
        <AppText className="text-base text-gray-500 text-center">
          Track your orders and reorder your favorites
        </AppText>
      </View>

      {/* Quick Stats */}
      <View className="px-6 mb-6">
        <View className="flex-row justify-between">
          <View className="bg-white rounded-2xl p-4 flex-1 mr-2 shadow-sm">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-orange-100 rounded-full items-center justify-center mr-2">
                <Ionicons name="time-outline" size={16} color="#FB923C" />
              </View>
              <AppText className="text-sm font-medium text-gray-600">Active</AppText>
            </View>
            <AppText className="text-2xl font-bold text-gray-900">2</AppText>
          </View>
          
          <View className="bg-white rounded-2xl p-4 flex-1 mx-1 shadow-sm">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-2">
                <Ionicons name="checkmark-circle-outline" size={16} color="#10B981" />
              </View>
              <AppText className="text-sm font-medium text-gray-600">This Month</AppText>
            </View>
            <AppText className="text-2xl font-bold text-gray-900">12</AppText>
          </View>
          
          <View className="bg-white rounded-2xl p-4 flex-1 ml-2 shadow-sm">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-2">
                <Ionicons name="flame-outline" size={16} color="#3B82F6" />
              </View>
              <AppText className="text-sm font-medium text-gray-600">Streak</AppText>
            </View>
            <AppText className="text-2xl font-bold text-gray-900">5 days</AppText>
          </View>
        </View>
      </View>

      {/* Active Orders */}
      <View className="px-6">
        <AppText className="text-xl font-bold text-gray-900 mb-4">
          Active Orders
        </AppText>
        
        {DUMMY_ORDERS.filter(order => order.status !== 'delivered' && order.status !== 'cancelled').length === 0 ? (
          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <View className="items-center py-6">
              <Ionicons name="receipt-outline" size={48} color="#D1D5DB" />
              <AppText className="text-lg font-medium text-gray-500 mt-4 text-center">
                No active orders
              </AppText>
              <AppText className="text-base text-gray-400 text-center mt-2">
                Your active orders will appear here
              </AppText>
            </View>
          </View>
        ) : (
          DUMMY_ORDERS
            .filter(order => order.status !== 'delivered' && order.status !== 'cancelled')
            .map((order) => (
              <View key={order.id} className="bg-white rounded-2xl p-6 shadow-sm mb-4">
                <View className="flex-row justify-between items-start mb-4">
                  <View className="flex-1">
                    <AppText className="text-lg font-semibold text-gray-900">
                      Order #{order.id}
                    </AppText>
                    <AppText className="text-sm text-gray-500 mt-1">
                      {order.items.length} items • ${order.grandTotal.toFixed(2)}
                    </AppText>
                  </View>
                  <View className="bg-orange-100 px-3 py-1 rounded-full">
                    <AppText className="text-xs font-semibold text-orange-600">
                      {ORDER_STATUS[order.status].label}
                    </AppText>
                  </View>
                </View>

                <View className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <View key={item.id} className="flex-row items-center">
                      <AppText className="text-sm text-gray-500 mr-2">
                        {item.quantity}x
                      </AppText>
                      <AppText className="text-sm font-medium text-gray-900">
                        {item.meal.name}
                      </AppText>
                    </View>
                  ))}
                </View>

                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    className="flex-1 border border-orange-500 py-3 rounded-xl"
                    onPress={() => handleTrackOrder(order.id)}
                  >
                    <AppText className="text-orange-500 font-semibold text-center">Track Order</AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 bg-orange-500 py-3 rounded-xl"
                    onPress={() => handleReorder(order.id)}
                  >
                    <AppText className="text-white font-semibold text-center">Reorder</AppText>
                  </TouchableOpacity>
                </View>
              </View>
            ))
        )}
      </View>

      {/* Order History */}
      <View className="px-6 pb-6 mt-8">
        <AppText className="text-xl font-bold text-gray-900 mb-4">
          Order History
        </AppText>
        
        {DUMMY_ORDERS
          .filter(order => order.status === 'delivered' || order.status === 'cancelled')
          .map((order) => (
            <View key={order.id} className="bg-white rounded-2xl p-6 shadow-sm mb-4">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1">
                  <AppText className="text-lg font-semibold text-gray-900">
                    Order #{order.id}
                  </AppText>
                  <AppText className="text-sm text-gray-500 mt-1">
                    {order.items.length} items • ${order.grandTotal.toFixed(2)}
                  </AppText>
                  <AppText className="text-xs text-gray-400 mt-1">
                    {order.deliveredAt ? 
                      `Delivered on ${order.deliveredAt.toLocaleDateString()}` :
                      `Ordered on ${order.createdAt.toLocaleDateString()}`
                    }
                  </AppText>
                </View>
                <View className={`px-3 py-1 rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <AppText className={`text-xs font-semibold ${
                    order.status === 'delivered' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {ORDER_STATUS[order.status].label}
                  </AppText>
                </View>
              </View>

              <View className="space-y-2 mb-4">
                {order.items.map((item) => (
                  <View key={item.id} className="flex-row items-center">
                    <AppText className="text-sm text-gray-500 mr-2">
                      {item.quantity}x
                    </AppText>
                    <AppText className="text-sm font-medium text-gray-900">
                      {item.meal.name}
                    </AppText>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                className="border border-orange-500 py-3 rounded-xl"
                onPress={() => handleReorder(order.id)}
              >
                <AppText className="text-orange-500 font-semibold text-center">Reorder</AppText>
              </TouchableOpacity>
            </View>
          ))
        }

        {DUMMY_ORDERS.filter(order => order.status === 'delivered' || order.status === 'cancelled').length === 0 && (
          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <View className="items-center py-6">
              <Ionicons name="time-outline" size={48} color="#D1D5DB" />
              <AppText className="text-lg font-medium text-gray-500 mt-4 text-center">
                No order history
              </AppText>
              <AppText className="text-base text-gray-400 text-center mt-2">
                Your completed orders will appear here
              </AppText>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
