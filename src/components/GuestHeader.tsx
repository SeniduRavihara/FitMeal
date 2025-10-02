import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '../contexts/AuthContext'

export default function GuestHeader() {
  const { session } = useAuth()

  if (session) {
    return null // Don't show guest header if user is logged in
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.guestText}>👤 Guest</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.signInButton}
        onPress={() => router.push('/(auth)/sign-in')}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  leftSection: {
    flex: 1,
  },
  guestText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
})

