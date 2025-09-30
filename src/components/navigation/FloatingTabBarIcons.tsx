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

// Simple icon components using Unicode symbols for better compatibility
const HomeIcon = ({ size = 24, color = '#8E8E93' }) => (
  <Text style={{ fontSize: size, color }}>⌂</Text>
);

const CalendarIcon = ({ size = 24, color = '#8E8E93' }) => (
  <Text style={{ fontSize: size, color }}>📅</Text>
);

const BagIcon = ({ size = 24, color = '#8E8E93' }) => (
  <Text style={{ fontSize: size, color }}>🛍</Text>
);

const UserIcon = ({ size = 24, color = '#8E8E93' }) => (
  <Text style={{ fontSize: size, color }}>👤</Text>
);

const tabs = [
  { 
    id: 'home' as TabName, 
    name: 'Home', 
    icon: HomeIcon,
    activeIcon: '🏠'
  },
  { 
    id: 'subscriptions' as TabName, 
    name: 'Plans', 
    icon: CalendarIcon,
    activeIcon: '📊'
  },
  { 
    id: 'orders' as TabName, 
    name: 'Orders', 
    icon: BagIcon,
    activeIcon: '🛒'
  },
  { 
    id: 'profile' as TabName, 
    name: 'Profile', 
    icon: UserIcon,
    activeIcon: '👤'
  },
];

type FloatingTabBarProps = {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
};

export function FloatingTabBarIcons({ activeTab, onTabPress }: FloatingTabBarProps) {
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

          const IconComponent = tab.icon;

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
                {isActive ? (
                  <Text style={styles.activeTabIcon}>
                    {tab.activeIcon}
                  </Text>
                ) : (
                  <IconComponent size={20} color="#8E8E93" />
                )}
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
  
  activeTabIcon: {
    fontSize: 20,
    marginBottom: 2,
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
