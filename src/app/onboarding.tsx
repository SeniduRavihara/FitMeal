import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const { width } = Dimensions.get('window')

const onboardingData = [
  {
    id: 1,
    emoji: '🥗',
    title: 'Healthy Meals',
    subtitle: 'Delivered Fresh',
    description: 'Get nutritionally balanced meals crafted for your fitness goals',
  },
  {
    id: 2,
    emoji: '📊',
    title: 'Track Your Nutrition',
    subtitle: '',
    description: 'See exact macros for every meal - protein, carbs, fats & vitamins',
  },
  {
    id: 3,
    emoji: '📅',
    title: 'Flexible Plans',
    subtitle: '',
    description: 'Order once or subscribe - daily, weekly, monthly options available',
  },
]

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      handleGetStarted()
    }
  }

  const handleSkip = () => {
    router.replace('/(tabs)')
  }

  const handleGetStarted = () => {
    router.replace('/(tabs)')
  }

  const currentSlide = onboardingData[currentIndex]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{currentSlide.emoji}</Text>
        </View>

        <Text style={styles.title}>{currentSlide.title}</Text>
        {currentSlide.subtitle ? (
          <Text style={styles.subtitle}>{currentSlide.subtitle}</Text>
        ) : null}
        
        <Text style={styles.description}>{currentSlide.description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex === onboardingData.length - 1 ? 'Start' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    color: '#6b7280',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emojiContainer: {
    marginBottom: 40,
  },
  emoji: {
    fontSize: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#3b82f6',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  inactiveDot: {
    backgroundColor: '#d1d5db',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})
