import React, { useRef, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  Animated, 
  Dimensions,
  Platform,
  StyleSheet
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabName } from '../../types';

const { width: screenWidth } = Dimensions.get('window');

const tabs = [
  { id: 'home' as TabName, name: 'Home', icon: '🏠' },
  { id: 'subscriptions' as TabName, name: 'Plans', icon: '📊' },
  { id: 'orders' as TabName, name: 'Orders', icon: '🛒' },
  { id: 'profile' as TabName, name: 'Profile', icon: '👤' },
];

type FloatingTabBarProps = {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
};

export function FloatingTabBarAdvanced({ activeTab, onTabPress }: FloatingTabBarProps) {
  const insets = useSafeAreaInsets();
  const animatedValues = useRef(tabs.map(() => new Animated.Value(0))).current;
  const floatAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  // Subtle floating animation
  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: -1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    floatLoop.start();

    return () => floatLoop.stop();
  }, []);

  // Animate active tab with spring effect
  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    
    // Spring animation for active tab
    Animated.spring(scaleAnimation, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleAnimation, {
        toValue: 1,
        tension: 300,
        friction: 20,
        useNativeDriver: true,
      }).start();
    });

    // Animate all tabs
    animatedValues.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === activeIndex ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  }, [activeTab]);

  const getBottomMargin = () => {
    return insets.bottom > 0 ? insets.bottom + 8 : 34;
  };

  const navBarWidth = screenWidth > 400 ? '85%' : '90%';

  const handleTabPress = (tabId: TabName) => {
    // Haptic feedback
    if (Platform.OS === 'ios') {
      const { HapticFeedback } = require('react-native-haptic-feedback');
      HapticFeedback.trigger('impactLight');
    }
    
    onTabPress(tabId);
  };

  return (
    <Animated.View 
      style={[
        styles.floatingNavContainer,
        { 
          bottom: getBottomMargin(),
          transform: [{ translateY: floatAnimation }]
        }
      ]}
    >
      <View style={[styles.navPill, { width: navBarWidth }]}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const animatedValue = animatedValues[index];
          
          const scale = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.05],
          });

          const opacity = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.6, 1],
          });

          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabButton}
              onPress={() => handleTabPress(tab.id)}
              activeOpacity={0.8}
            >
              <Animated.View
                style={[
                  styles.tabContent,
                  isActive && styles.activeTabContent,
                  { 
                    transform: [{ scale }],
                    opacity: isActive ? 1 : opacity
                  }
                ]}
              >
                <Text 
                  style={[
                    styles.tabIcon,
                    isActive && styles.activeTabIcon
                  ]}
                >
                  {tab.icon}
                </Text>
                <Text 
                  style={[
                    styles.tabLabel,
                    isActive && styles.activeTabLabel
                  ]}
                >
                  {tab.name}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  floatingNavContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  
  navPill: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    height: 64,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12, // Android shadow
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
  },
  
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
    minWidth: 48,
  },
  
  activeTabContent: {
    backgroundColor: '#000000',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  
  activeTabIcon: {
    // Icon color handled by the emoji itself
  },
  
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8E8E93',
    textAlign: 'center',
  },
  
  activeTabLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
