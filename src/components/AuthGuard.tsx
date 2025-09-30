import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useAuth } from '../contexts/AuthContext'
import { Redirect } from 'expo-router'

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    )
  }

  if (!session) {
    return <Redirect href="/(auth)/sign-in" />
  }

  return <>{children}</>
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
})
