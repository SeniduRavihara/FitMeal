import { View, ScrollView, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../components/AppText";
import { Card } from "../components/common/Card";
import { Button } from "../components/Button";
import { DUMMY_ORDERS } from "../data/dummyData";
import { ORDER_STATUS } from "../constants";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="px-4 pt-4 pb-2">
        <AppText variant="h2" weight="bold" className="mb-2">
          Your Orders
        </AppText>
        <AppText variant="body" color="secondary">
          Track your orders and reorder your favorites
        </AppText>
      </View>

      {/* Active Orders */}
      <View className="px-4 py-4">
        <AppText variant="h3" weight="semibold" className="mb-3">
          Active Orders
        </AppText>
        
        {DUMMY_ORDERS.filter(order => order.status !== 'delivered' && order.status !== 'cancelled').length === 0 ? (
          <Card>
            <View className="items-center py-6">
              <AppText variant="h4" weight="medium" color="secondary" center>
                No active orders
              </AppText>
              <AppText variant="body" color="tertiary" center className="mt-2">
                Your active orders will appear here
              </AppText>
            </View>
          </Card>
        ) : (
          DUMMY_ORDERS
            .filter(order => order.status !== 'delivered' && order.status !== 'cancelled')
            .map((order) => (
              <Card key={order.id} className="mb-3">
                <View className="space-y-3">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <AppText variant="h4" weight="semibold">
                        Order #{order.id}
                      </AppText>
                      <AppText variant="bodySmall" color="secondary" className="mt-1">
                        {order.items.length} items • ${order.grandTotal.toFixed(2)}
                      </AppText>
                    </View>
                    <View className="items-end">
                      <View className="bg-primary-50 px-2 py-1 rounded-md">
                        <AppText variant="caption" weight="semibold" color="primary">
                          {ORDER_STATUS[order.status].label}
                        </AppText>
                      </View>
                    </View>
                  </View>

                  <View className="space-y-2">
                    {order.items.map((item) => (
                      <View key={item.id} className="flex-row items-center">
                        <AppText variant="bodySmall" color="secondary" className="mr-2">
                          {item.quantity}x
                        </AppText>
                        <AppText variant="bodySmall" weight="medium">
                          {item.meal.name}
                        </AppText>
                      </View>
                    ))}
                  </View>

                  <View className="flex-row space-x-2">
                    <Button
                      title="Track Order"
                      variant="outline"
                      size="small"
                      onPress={() => handleTrackOrder(order.id)}
                      className="flex-1"
                    />
                    <Button
                      title="Reorder"
                      variant="primary"
                      size="small"
                      onPress={() => handleReorder(order.id)}
                      className="flex-1"
                    />
                  </View>
                </View>
              </Card>
            ))
        )}
      </View>

      {/* Order History */}
      <View className="px-4 pb-6">
        <AppText variant="h3" weight="semibold" className="mb-3">
          Order History
        </AppText>
        
        {DUMMY_ORDERS
          .filter(order => order.status === 'delivered' || order.status === 'cancelled')
          .map((order) => (
            <Card key={order.id} className="mb-3">
              <View className="space-y-3">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <AppText variant="h4" weight="semibold">
                      Order #{order.id}
                    </AppText>
                    <AppText variant="bodySmall" color="secondary" className="mt-1">
                      {order.items.length} items • ${order.grandTotal.toFixed(2)}
                    </AppText>
                    <AppText variant="caption" color="tertiary" className="mt-1">
                      {order.deliveredAt ? 
                        `Delivered on ${order.deliveredAt.toLocaleDateString()}` :
                        `Ordered on ${order.createdAt.toLocaleDateString()}`
                      }
                    </AppText>
                  </View>
                  <View className="items-end">
                    <View className={`px-2 py-1 rounded-md ${
                      order.status === 'delivered' ? 'bg-secondary-50' : 'bg-accent-50'
                    }`}>
                      <AppText 
                        variant="caption" 
                        weight="semibold" 
                        color={order.status === 'delivered' ? 'secondary' : 'accent'}
                      >
                        {ORDER_STATUS[order.status].label}
                      </AppText>
                    </View>
                  </View>
                </View>

                <View className="space-y-1">
                  {order.items.map((item) => (
                    <View key={item.id} className="flex-row items-center">
                      <AppText variant="bodySmall" color="secondary" className="mr-2">
                        {item.quantity}x
                      </AppText>
                      <AppText variant="bodySmall" weight="medium">
                        {item.meal.name}
                      </AppText>
                    </View>
                  ))}
                </View>

                <Button
                  title="Reorder"
                  variant="outline"
                  size="small"
                  onPress={() => handleReorder(order.id)}
                />
              </View>
            </Card>
          ))
        }

        {DUMMY_ORDERS.filter(order => order.status === 'delivered' || order.status === 'cancelled').length === 0 && (
          <Card>
            <View className="items-center py-6">
              <AppText variant="h4" weight="medium" color="secondary" center>
                No order history
              </AppText>
              <AppText variant="body" color="tertiary" center className="mt-2">
                Your completed orders will appear here
              </AppText>
            </View>
          </Card>
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
