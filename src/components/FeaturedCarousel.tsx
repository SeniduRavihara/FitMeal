import React, { useRef, useState, useEffect } from 'react'
import { 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ActivityIndicator
} from 'react-native'
import { AppText } from './AppText'
import { Ionicons } from '@expo/vector-icons'
import { AddService } from '@/supabase/services/AddService'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const CARD_WIDTH = SCREEN_WIDTH - 48 // 24px padding on each side
const CARD_SPACING = 16

interface FeaturedItem {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  price?: number
  originalPrice?: number
  discount?: string
  backgroundColor: string
  textColor: string
  onPress: () => void
}

interface FeaturedCarouselProps {
  items: FeaturedItem[]
}

export default function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  const scrollViewRef = useRef<ScrollView>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [carouselItems, setCarouselItems] = useState<FeaturedItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
      const { data, error } = await AddService.getCarouselItem()
      if (error) {
        console.error("Error fetching carousel items:", error)
      } else {
        setCarouselItems(data?.map((item: any) => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          description: item.description,
          image: item.image_url,
          price: item.price,
          originalPrice: item.original_price,
          discount: item.discount,
          backgroundColor: item.background_color,
          textColor: item.text_color,
          onPress: () => console.log("item", item)
        })) || [])
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching carousel items:", error)
    }
    }
    fetchCarouselItems()
  }, [])


  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselItems.length > 1) {
        const nextIndex = (currentIndex + 1) % carouselItems.length
        scrollViewRef.current?.scrollTo({
          x: nextIndex * (CARD_WIDTH + CARD_SPACING),
          animated: true
        })
        setCurrentIndex(nextIndex)
      }
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [currentIndex, carouselItems.length])

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_SPACING))
    setCurrentIndex(index)
  }

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * (CARD_WIDTH + CARD_SPACING),
      animated: true
    })
    setCurrentIndex(index)
  }

  return (
    <View className="mb-8">
      <AppText className="text-xl font-bold text-gray-900 mb-4 px-6">
        Featured Today
      </AppText>
      
      {/* Carousel */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        snapToAlignment="start"
      >
        {carouselItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={item.onPress}
            style={{ width: CARD_WIDTH, marginRight: index < carouselItems.length - 1 ? 16 : 0 }}
          >
            <View 
              className="rounded-2xl p-3 shadow-lg relative overflow-hidden h-44"
              style={{ backgroundColor: item.backgroundColor }}
            >
              {/* Background Pattern/Decoration */}
              <View className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20" 
                style={{ backgroundColor: item.textColor }} />
              <View className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full opacity-10" 
                style={{ backgroundColor: item.textColor }} />

              <View className="flex-row h-full">
                {/* Left Content */}
                <View className="flex-1 mr-3 justify-between py-1">
                  {/* Top Content */}
                  <View className="flex-1">
                    {item.discount && (
                      <View className="bg-white/20 self-start px-2 py-0.5 rounded-full mb-1.5">
                        <AppText 
                          className="text-xs font-bold"
                          style={{ color: item.textColor }}
                        >
                          {item.discount}
                        </AppText>
                      </View>
                    )}
                    
                    <AppText 
                      className="text-sm font-bold mb-0.5"
                      style={{ color: item.textColor }}
                      numberOfLines={1}
                    >
                      {item.title}
                    </AppText>
                    
                    <AppText 
                      className="text-xs opacity-90 mb-0.5"
                      style={{ color: item.textColor }}
                      numberOfLines={1}
                    >
                      {item.subtitle}
                    </AppText>

                    {item.description && (
                      <AppText 
                        className="text-xs opacity-75"
                        style={{ color: item.textColor }}
                        numberOfLines={1}
                      >
                        {item.description}
                      </AppText>
                    )}
                  </View>

                  {/* Bottom - Price and Button */}
                  <View className="mt-1">
                    {/* Price */}
                    {item.price && (
                      <View className="flex-row items-baseline flex-wrap mb-2">
                        <AppText 
                          className="text-base font-bold mr-1.5"
                          style={{ color: item.textColor }}
                        >
                          ${item.price.toFixed(2)}
                        </AppText>
                        {item.originalPrice && (
                          <AppText 
                            className="text-xs line-through opacity-60"
                            style={{ color: item.textColor }}
                          >
                            ${item.originalPrice.toFixed(2)}
                          </AppText>
                        )}
                      </View>
                    )}

                    {/* CTA Button */}
                    <TouchableOpacity 
                      className="bg-white px-3 py-2 rounded-lg shadow-sm self-start"
                      onPress={item.onPress}
                    >
                      <View className="flex-row items-center">
                        <AppText className="text-xs font-semibold mr-1" style={{ color: item.backgroundColor }}>
                          Order Now
                        </AppText>
                        <Ionicons name="arrow-forward" size={12} color={item.backgroundColor} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Image */}
                <View className="w-24 h-24 self-center">
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-full rounded-xl"
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {/* Pagination Dots */}
      {carouselItems.length > 1 && (
        <View className="flex-row justify-center mt-4">
          {carouselItems.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </View>
      )}
    </View>
  )
}