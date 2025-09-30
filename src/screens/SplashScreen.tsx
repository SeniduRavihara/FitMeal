import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useAuth } from '../contexts/AuthContext'

export default function SplashScreen() {
  const { session, loading } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      // Always navigate after 2 seconds, regardless of auth state
      if (session) {
        // User is logged in, go to main app
        router.replace('/(tabs)')
      } else {
        // User is not logged in, go to onboarding
        router.replace('/onboarding')
      }
    }, 2000) // 2 second splash screen

    return () => clearTimeout(timer)
  }, [session])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🍽️</Text>
        <Text style={styles.appName}>FitMeal</Text>
        <Text style={styles.tagline}>Nutrition Made Easy</Text>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 40,
  },
  loadingContainer: {
    marginTop: 20,
  },
})
