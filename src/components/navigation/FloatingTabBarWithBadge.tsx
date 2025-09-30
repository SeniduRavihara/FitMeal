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
  { 
    id: 'home' as TabName, 
    name: 'Home', 
    icon: '🏠',
    badge: null
  },
  { 
    id: 'subscriptions' as TabName, 
    name: 'Plans', 
    icon: '📊',
    badge: null
  },
  { 
    id: 'orders' as TabName, 
    name: 'Orders', 
    icon: '🛒',
    badge: 2 // Example badge count
  },
  { 
    id: 'profile' as TabName, 
    name: 'Profile', 
    icon: '👤',
    badge: null
  },
];

type FloatingTabBarProps = {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
};

export function FloatingTabBarWithBadge({ activeTab, onTabPress }: FloatingTabBarProps) {
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
    
    animatedValues.forEach((anim, index) => {
      Animated.spring(anim, {
        toValue: index === activeIndex ? 1 : 0,
        tension: 300,
        friction: 20,
        useNativeDriver: true,
      }).start();
    });
  }, [activeTab]);

  const getBottomMargin = () => {
    return insets.bottom > 0 ? insets.bottom + 8 : 34;
  };

  const navBarWidth = screenWidth > 400 ? '85%' : '90%';

  const handleTabPress = (tabId: TabName) => {
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
                  { transform: [{ scale }] }
                ]}
              >
                <View style={styles.iconContainer}>
                  <Text 
                    style={[
                      styles.tabIcon,
                      isActive && styles.activeTabIcon
                    ]}
                  >
                    {tab.icon}
                  </Text>
                  {tab.badge && !isActive && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {tab.badge > 99 ? '99+' : tab.badge}
                      </Text>
                    </View>
                  )}
                </View>
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
    elevation: 12,
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
  
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  
  activeTabIcon: {
    // Icon color handled by the emoji itself
  },
  
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
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
