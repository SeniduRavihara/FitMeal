import React, { useRef, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  Animated, 
  Dimensions,
  Platform 
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

export function FloatingTabBar({ activeTab, onTabPress }: FloatingTabBarProps) {
  const insets = useSafeAreaInsets();
  const animatedValues = useRef(tabs.map(() => new Animated.Value(0))).current;
  const floatAnimation = useRef(new Animated.Value(0)).current;

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

  // Animate active tab
  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    
    // Reset all animations
    animatedValues.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === activeIndex ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [activeTab]);

  const getBottomMargin = () => {
    return insets.bottom > 0 ? insets.bottom + 8 : 34;
  };

  const navBarWidth = screenWidth > 400 ? '85%' : '90%';

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

          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabButton}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.tabContent,
                  isActive && styles.activeTabContent,
                  { transform: [{ scale }] }
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

const styles = {
  floatingNavContainer: {
    position: 'absolute' as const,
    left: 0,
    right: 0,
    alignItems: 'center' as const,
    zIndex: 1000,
  },
  
  navPill: {
    flexDirection: 'row' as const,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    height: 64,
    alignItems: 'center' as const,
    justifyContent: 'space-around' as const,
    paddingHorizontal: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12, // Android shadow
  },
  
  tabButton: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    height: 48,
    borderRadius: 24,
  },
  
  tabContent: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 4,
    paddingHorizontal: 8,
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
    fontWeight: '500' as const,
    color: '#8E8E93',
    textAlign: 'center' as const,
  },
  
  activeTabLabel: {
    color: '#FFFFFF',
  },
};
