# Floating Navigation Bar Components

This directory contains multiple implementations of a floating pill-shaped navigation bar that matches modern iOS design aesthetics.

## 🎯 Components Overview

### 1. `FloatingTabBar.tsx`
Basic floating navigation bar with emoji icons and smooth animations.

### 2. `FloatingTabBarAdvanced.tsx`
Enhanced version with better animations, haptic feedback, and improved styling.

### 3. `FloatingTabBarIcons.tsx`
Version with proper icon components and better icon handling.

### 4. `FloatingTabBarWithBadge.tsx`
Full-featured version with notification badges (currently used in the app).

## 🎨 Design Specifications

### Container Design
- **Position**: Absolute, floating above content
- **Background**: White (#FFFFFF)
- **Shape**: Rounded pill (border-radius: 32px)
- **Width**: 90% of screen width (85% on larger screens)
- **Height**: 64px
- **Shadow**: 0 8px 32px rgba(0, 0, 0, 0.12)
- **Margin bottom**: Safe area + 8px spacing

### Tab States

#### Active Tab
- **Background**: Black circle (#000000)
- **Icon**: White emoji/icon
- **Label**: White text, 12px medium weight
- **Animation**: Scale in with spring effect
- **Shadow**: 0 2px 8px rgba(0, 0, 0, 0.15)

#### Inactive Tabs
- **Background**: Transparent
- **Icon**: Gray emoji/icon (#8E8E93)
- **Label**: Gray text (#8E8E93), 12px medium weight
- **Animation**: Smooth transition to active state

## 🚀 Features

### Animations
- **Floating Effect**: Subtle up/down movement
- **Tab Switch**: Spring animation with scale effect
- **Active State**: Smooth background color transition
- **Badge**: Notification count with red badge

### Responsive Design
- **Screen Size**: Adapts width based on device
- **Safe Area**: Proper bottom margin for different devices
- **Orientation**: Works in both portrait and landscape

### Accessibility
- **Touch Targets**: 48px minimum touch area
- **Visual Feedback**: Active opacity and scale changes
- **Haptic Feedback**: Light impact on tab press (iOS)

## 🔧 Usage

```tsx
import { FloatingTabBarWithBadge } from '../components/navigation/FloatingTabBarWithBadge';

// In your component
<FloatingTabBarWithBadge 
  activeTab={activeTab} 
  onTabPress={setActiveTab} 
/>
```

## 📱 Tab Configuration

```tsx
const tabs = [
  { 
    id: 'home', 
    name: 'Home', 
    icon: '🏠',
    badge: null
  },
  { 
    id: 'orders', 
    name: 'Orders', 
    icon: '🛒',
    badge: 2 // Notification count
  },
  // ... more tabs
];
```

## 🎭 Customization

### Colors
- **Active Background**: `#000000`
- **Inactive Text**: `#8E8E93`
- **Badge Background**: `#FF3B30`
- **Pill Background**: `#FFFFFF`

### Animations
- **Spring Tension**: 300
- **Spring Friction**: 20
- **Duration**: 250ms for state changes
- **Float Duration**: 2000ms loop

### Sizing
- **Pill Height**: 64px
- **Tab Button**: 48px height
- **Icon Size**: 20px
- **Label Size**: 12px
- **Badge Size**: 20px diameter

## 🔄 Integration

The floating navigation is integrated with the existing tab system in `src/app/(tabs)/_layout.tsx` and replaces the standard Expo Router tab bar for a more custom, floating experience.

## 📊 Performance

- **Native Driver**: All animations use native driver
- **Memoization**: Components are optimized to prevent unnecessary re-renders
- **Efficient Updates**: Only active tab animations are running
- **Memory**: Minimal memory footprint with ref-based animations
