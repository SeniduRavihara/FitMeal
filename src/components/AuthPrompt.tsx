import React from 'react'
import { View, TouchableOpacity, Modal } from 'react-native'
import { router } from 'expo-router'
import { AppText } from './AppText'
import { Ionicons } from '@expo/vector-icons'

interface AuthPromptProps {
  visible: boolean
  onClose: () => void
  title: string
  description: string
  actionText: string
  onAction: () => void
}

export default function AuthPrompt({
  visible,
  onClose,
  title,
  description,
  actionText,
  onAction,
}: AuthPromptProps) {
  const handleSignIn = () => {
    onClose()
    router.push('/(auth)/sign-in')
  }

  const handleSignUp = () => {
    onClose()
    router.push('/(auth)/sign-up')
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
          {/* Icon */}
          <View className="items-center mb-4">
            <View className="w-16 h-16 bg-orange-100 rounded-full items-center justify-center">
              <Ionicons name="lock-closed-outline" size={32} color="#FB923C" />
            </View>
          </View>

          {/* Content */}
          <View className="items-center mb-6">
            <AppText className="text-xl font-bold text-gray-900 mb-2 text-center">
              {title}
            </AppText>
            <AppText className="text-base text-gray-600 text-center leading-6">
              {description}
            </AppText>
          </View>
          
          {/* Buttons */}
          <View className="space-y-3 mb-4">
            <TouchableOpacity 
              className="bg-orange-500 py-4 rounded-xl"
              onPress={handleSignIn}
            >
              <AppText className="text-white font-semibold text-center">Sign In</AppText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-gray-100 py-4 rounded-xl"
              onPress={handleSignUp}
            >
              <AppText className="text-gray-700 font-semibold text-center">Create Account</AppText>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            className="items-center py-2"
            onPress={onClose}
          >
            <AppText className="text-gray-400 text-sm">Maybe Later</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

