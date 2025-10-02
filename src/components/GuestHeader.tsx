import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '../contexts/AuthContext'
import { AppText } from './AppText'
import { Ionicons } from '@expo/vector-icons'

export default function GuestHeader() {
  const { session } = useAuth()

  if (session) {
    return null // Don't show guest header if user is logged in
  }

  return (
    <View className="flex-row justify-between items-center px-6 py-3 bg-white border-b border-gray-200">
      <View className="flex-row items-center flex-1">
        <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center mr-3">
          <Ionicons name="person-outline" size={16} color="#6B7280" />
        </View>
        <AppText className="text-sm font-medium text-gray-600">Guest</AppText>
      </View>
      
      <TouchableOpacity 
        className="bg-orange-500 px-4 py-2 rounded-lg"
        onPress={() => router.push('/(auth)/sign-in')}
      >
        <AppText className="text-white text-sm font-semibold">Sign In</AppText>
      </TouchableOpacity>
    </View>
  )
}

