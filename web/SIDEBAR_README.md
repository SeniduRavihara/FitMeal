# Enhanced Admin Sidebar System

## Overview

A fully responsive, animated sidebar system with collapse/expand functionality for desktop and mobile overlay behavior.

## ✨ Features

### 🖥️ **Desktop Sidebar**

- **Collapsible sidebar** - Click chevron to collapse/expand
- **Smooth animations** - 300ms transitions for all state changes
- **Icon-only mode** - When collapsed, shows only icons with tooltips
- **Persistent state** - Maintains collapsed state during navigation
- **Responsive width** - Animates between 64px (collapsed) and 256px (expanded)

### 📱 **Mobile Sidebar**

- **Overlay mode** - Slides in from left without pushing content
- **Dark backdrop** - 50% black overlay on the right side
- **Smooth animations** - Slide-in/out with opacity transitions
- **Touch-friendly** - Tap outside to close
- **Keyboard support** - Escape key to close
- **Body scroll lock** - Prevents background scrolling when open

### 🎨 **Design Improvements**

- **Orange branding** - Consistent with FitMeal theme
- **Better active states** - Orange accent for current page
- **Hover effects** - Smooth color transitions
- **Professional styling** - Clean borders, shadows, and spacing
- **Accessible** - Proper ARIA labels and keyboard navigation

## 🏗️ Architecture

### **SidebarContext** (`/src/context/SidebarContext.tsx`)

```typescript
interface SidebarContextType {
  isOpen: boolean; // Mobile overlay state
  isCollapsed: boolean; // Desktop collapse state
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}
```

### **Components Structure**

```
AdminLayout
├── SidebarProvider (Context)
├── AdminSidebar (Main sidebar component)
├── AdminLayoutClient (Responsive content wrapper)
└── AdminHeader (With mobile menu button)
```

## 🎛️ **Component Details**

### **AdminSidebar**

- **Mobile version**: Fixed overlay with backdrop
- **Desktop version**: Fixed sidebar with collapse functionality
- **Navigation**: Auto-closes mobile sidebar on route change
- **Active states**: Highlights current page with orange styling

### **AdminHeader**

- **Mobile menu button**: Only visible on mobile screens
- **Responsive design**: Adapts to collapsed sidebar state
- **Integrated controls**: Uses shared sidebar context

### **AdminLayoutClient**

- **Responsive wrapper**: Adjusts content padding based on sidebar state
- **Smooth transitions**: Animates content area when sidebar collapses

## 🎯 **Usage Examples**

### **Using Sidebar Context**

```typescript
import { useSidebar } from '@/context/SidebarContext';

function MyComponent() {
  const { isOpen, isCollapsed, toggleSidebar, toggleCollapse } = useSidebar();

  return (
    <div>
      <button onClick={toggleSidebar}>Toggle Mobile</button>
      <button onClick={toggleCollapse}>Toggle Desktop</button>
      <p>Mobile: {isOpen ? 'Open' : 'Closed'}</p>
      <p>Desktop: {isCollapsed ? 'Collapsed' : 'Expanded'}</p>
    </div>
  );
}
```

### **Custom Hook**

```typescript
import { useSidebar } from "@/hooks/useSidebar";
// Same as above - convenient re-export
```

## 📱 **Responsive Behavior**

### **Breakpoints**

- **Mobile**: `< 1024px` - Overlay sidebar
- **Desktop**: `≥ 1024px` - Fixed collapsible sidebar

### **Mobile (< 1024px)**

- Sidebar slides in from left
- Dark backdrop covers remaining screen
- Content stays in place (no push)
- Touch/click outside to close
- Escape key support

### **Desktop (≥ 1024px)**

- Fixed sidebar on the left
- Collapse button in header
- Content area adjusts width automatically
- Tooltips show in collapsed mode
- Icons remain visible when collapsed

## 🎨 **Styling Features**

### **Animations**

```css
/* Sidebar width transition */
transition-all duration-300 ease-in-out

/* Mobile slide animation */
transform transition-transform duration-300 ease-in-out

/* Backdrop fade */
transition-opacity duration-300
```

### **States**

- **Active page**: Orange background with border accent
- **Hover states**: Subtle gray background
- **Collapsed mode**: Centered icons with tooltips
- **Mobile overlay**: Shadow and backdrop blur

## 🔧 **Customization**

### **Colors**

- Primary: Orange (`orange-500`, `orange-600`)
- Background: White
- Text: Gray scale (`gray-600`, `gray-900`)
- Borders: Light gray (`gray-200`)

### **Dimensions**

- **Expanded width**: `256px` (`w-64`)
- **Collapsed width**: `64px` (`w-16`)
- **Mobile width**: `256px` (`w-64`)
- **Header height**: `64px` (`h-16`)

### **Animation Timing**

- **Transition duration**: `300ms`
- **Easing**: `ease-in-out`

## 🚀 **Performance**

### **Optimizations**

- CSS transitions instead of JavaScript animations
- Minimal re-renders with context optimization
- Efficient event listeners (cleanup on unmount)
- Conditional rendering for mobile/desktop

### **Accessibility**

- **Keyboard navigation**: Tab support, Escape to close
- **Screen readers**: Proper ARIA labels
- **Focus management**: Maintains focus states
- **Color contrast**: WCAG compliant color ratios

## 🔄 **State Management**

### **Local State**

- `isOpen`: Mobile sidebar visibility
- `isCollapsed`: Desktop sidebar collapse state

### **Side Effects**

- **Body scroll lock**: Prevents scrolling when mobile sidebar open
- **Keyboard listeners**: Escape key handling
- **Cleanup**: Removes listeners and resets styles on unmount

## 📋 **Implementation Checklist**

✅ **Mobile overlay sidebar with backdrop**  
✅ **Desktop collapsible sidebar**  
✅ **Smooth animations and transitions**  
✅ **Orange branding and professional styling**  
✅ **Keyboard support (Escape key)**  
✅ **Touch-friendly mobile interactions**  
✅ **Responsive content area**  
✅ **Active page highlighting**  
✅ **Hover effects and micro-interactions**  
✅ **Context-based state management**  
✅ **Performance optimizations**  
✅ **Accessibility features**

This sidebar system provides a professional, responsive experience that adapts perfectly to both mobile and desktop environments while maintaining smooth animations and excellent usability.
