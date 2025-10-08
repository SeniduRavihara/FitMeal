import { router, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { session, loading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return; // Still loading, don't navigate yet

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    // Add safety check for session
    if (!session && !inAuthGroup) {
      // User is not authenticated and not in auth screens, redirect to sign-in
      console.log("AuthGuard: No session, redirecting to sign-in");
      router.replace("/(auth)/sign-in");
    } else if (session && session.user && inAuthGroup) {
      // User is authenticated but in auth screens, redirect to tabs
      console.log("AuthGuard: User authenticated, redirecting to tabs");
      router.replace("/(tabs)");
    }
  }, [session, loading, segments]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
