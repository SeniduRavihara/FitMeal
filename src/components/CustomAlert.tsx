import React from 'react'
import { View, TouchableOpacity, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AppText } from './AppText'

interface CustomAlertProps {
  visible: boolean
  onClose: () => void
  title: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  buttonText?: string
}

export default function CustomAlert({
  visible,
  onClose,
  title,
  message,
  type = 'info',
  buttonText = 'OK'
}: CustomAlertProps) {
  const getIconAndColor = () => {
    switch (type) {
      case 'success':
        return { icon: 'checkmark-circle', color: '#10B981', bgColor: '#ECFDF5' }
      case 'error':
        return { icon: 'close-circle', color: '#EF4444', bgColor: '#FEF2F2' }
      case 'warning':
        return { icon: 'warning', color: '#F59E0B', bgColor: '#FFFBEB' }
      default:
        return { icon: 'information-circle', color: '#FB923C', bgColor: '#FFF7ED' }
    }
  }

  const { icon, color, bgColor } = getIconAndColor()

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 items-center justify-center px-6">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
          {/* Icon */}
          <View className="items-center mb-4">
            <View 
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: bgColor }}
            >
              <Ionicons name={icon as any} size={32} color={color} />
            </View>
          </View>

          {/* Content */}
          <View className="items-center mb-6">
            <AppText className="text-lg font-bold text-gray-900 mb-2 text-center">
              {title}
            </AppText>
            <AppText className="text-base text-gray-600 text-center leading-6">
              {message}
            </AppText>
          </View>

          {/* Button */}
          <TouchableOpacity
            className="bg-orange-500 py-3 rounded-xl items-center"
            onPress={onClose}
          >
            <AppText className="text-white font-semibold">
              {buttonText}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
