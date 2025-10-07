import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import AuthGuard from "../components/AuthGuard";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import { CustomMealCartProvider } from "../contexts/CustomMealCartContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <CustomMealCartProvider>
            <AuthGuard>
              <StatusBar style="dark" backgroundColor="#FFFFFF" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "#FFFFFF" },
                }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="onboarding"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="cart" options={{ headerShown: false }} />
                <Stack.Screen
                  name="order-history"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="shipping-address"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="create-request"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="privacy-policy"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="settings"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="edit-profile"
                  options={{ headerShown: false }}
                />
              </Stack>
            </AuthGuard>
          </CustomMealCartProvider>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
