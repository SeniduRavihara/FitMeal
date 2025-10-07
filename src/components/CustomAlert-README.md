# Custom Alert System 🎨

A beautiful, iOS-inspired custom alert system that replaces the default React Native `Alert` component with a modern, customizable design.

## ✨ Features

- **Beautiful Design**: iOS-inspired with blur effects and smooth animations
- **Multiple Types**: Success, Error, Warning, and Default alerts
- **Customizable**: Colors, icons, and text can be customized
- **Smooth Animations**: Spring animations with native driver
- **Easy to Use**: Simple hook-based API
- **Type Safe**: Full TypeScript support

## 🚀 Quick Start

### 1. Basic Usage

```tsx
import { useCustomAlert } from "../hooks/useCustomAlert";
import { CustomAlert } from "../components/CustomAlert";

function MyComponent() {
  const { showSuccess, visible, alertConfig, handleConfirm, handleCancel } =
    useCustomAlert();

  const handleAddToCart = () => {
    // Your logic here
    showSuccess(
      "Added to Cart! 🎉",
      "Your custom meal has been added to your cart successfully!"
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={handleAddToCart}>
        <Text>Add to Cart</Text>
      </TouchableOpacity>

      {/* Custom Alert */}
      {alertConfig && (
        <CustomAlert
          visible={visible}
          title={alertConfig.title}
          message={alertConfig.message}
          confirmText={alertConfig.confirmText}
          cancelText={alertConfig.cancelText}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          type={alertConfig.type}
          showCancel={alertConfig.showCancel}
        />
      )}
    </View>
  );
}
```

### 2. Alert Types

#### Success Alert

```tsx
const { showSuccess } = useCustomAlert();

showSuccess("Success! 🎉", "Your action was completed successfully!");
```

#### Error Alert

```tsx
const { showError } = useCustomAlert();

showError("Error! ❌", "Something went wrong. Please try again.");
```

#### Warning Alert

```tsx
const { showWarning } = useCustomAlert();

showWarning(
  "Warning! ⚠️",
  "This action will remove all items from your cart.",
  () => console.log("User confirmed"),
  () => console.log("User cancelled")
);
```

#### Confirmation Alert

```tsx
const { showConfirmation } = useCustomAlert();

showConfirmation(
  "Confirm Action",
  "Are you sure you want to proceed?",
  () => console.log("User confirmed"),
  () => console.log("User cancelled")
);
```

### 3. Advanced Usage

```tsx
const { showAlert } = useCustomAlert();

showAlert({
  title: "Custom Alert",
  message: "This is a custom alert with specific configuration",
  confirmText: "Continue",
  cancelText: "Go Back",
  type: "warning",
  showCancel: true,
  onConfirm: () => console.log("Confirmed"),
  onCancel: () => console.log("Cancelled"),
});
```

## 🎨 Alert Types & Colors

| Type      | Icon                  | Background | Border  | Use Case         |
| --------- | --------------------- | ---------- | ------- | ---------------- |
| `success` | ✅ checkmark-circle   | #F0F9F0    | #34C759 | Success messages |
| `error`   | ❌ close-circle       | #FFF0F0    | #FF3B30 | Error messages   |
| `warning` | ⚠️ warning            | #FFF8F0    | #FF9500 | Warning messages |
| `default` | ℹ️ information-circle | #F0F9FF    | #007AFF | General info     |

## 🔧 Customization

### Custom Colors

You can customize the alert colors by modifying the `getTypeConfig` function in `CustomAlert.tsx`:

```tsx
const getTypeConfig = () => {
  switch (type) {
    case "success":
      return {
        icon: "checkmark-circle",
        iconColor: "#34C759", // Custom success color
        backgroundColor: "#F0F9F0", // Custom background
        borderColor: "#34C759", // Custom border
      };
    // ... other types
  }
};
```

### Custom Icons

Replace the Ionicons with your preferred icon set:

```tsx
import { MaterialIcons } from '@expo/vector-icons';

// In getTypeConfig()
icon: 'check-circle', // Material Icons instead of Ionicons
```

## 📱 Toast Notifications

For less intrusive messages, use the toast notification system:

```tsx
import { useCustomToast } from "../hooks/useCustomToast";
import { CustomToast } from "../components/CustomToast";

function MyComponent() {
  const { showSuccess, visible, toastConfig, hideToast } = useCustomToast();

  const handleQuickAction = () => {
    showSuccess("Item saved!", 2000); // Auto-hide after 2 seconds
  };

  return (
    <View>
      <TouchableOpacity onPress={handleQuickAction}>
        <Text>Quick Action</Text>
      </TouchableOpacity>

      {/* Toast */}
      {toastConfig && (
        <CustomToast
          visible={visible}
          message={toastConfig.message}
          type={toastConfig.type}
          duration={toastConfig.duration}
          onHide={hideToast}
        />
      )}
    </View>
  );
}
```

## 🎯 Best Practices

### 1. Use Appropriate Alert Types

- **Success**: For completed actions (add to cart, save, etc.)
- **Error**: For failed operations or validation errors
- **Warning**: For potentially destructive actions
- **Default**: For general information or confirmations

### 2. Keep Messages Clear

```tsx
// ✅ Good
showSuccess(
  "Added to Cart!",
  "Your Chicken Bowl with 45g protein has been added."
);

// ❌ Avoid
showSuccess("Done", "OK");
```

### 3. Use Toast for Non-Critical Messages

```tsx
// ✅ Use toast for quick feedback
showSuccess("Item saved!");

// ✅ Use alert for important actions
showConfirmation("Delete Item", "Are you sure you want to delete this item?");
```

### 4. Consistent Button Text

```tsx
// ✅ Consistent
confirmText: "Yes, Delete";
cancelText: "Cancel";

// ❌ Inconsistent
confirmText: "OK";
cancelText: "No Thanks";
```

## 🔄 Migration from Default Alert

### Before (Default Alert)

```tsx
Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
  { text: "Cancel", style: "cancel" },
  { text: "Remove", style: "destructive", onPress: removeItem },
]);
```

### After (Custom Alert)

```tsx
const { showConfirmation } = useCustomAlert();

showConfirmation(
  "Remove Item",
  "Are you sure you want to remove this item?",
  removeItem,
  () => {} // Cancel action
);
```

## 🎨 Design System Integration

The custom alert system integrates seamlessly with your app's design system:

- **Colors**: Uses your app's color palette
- **Typography**: Uses `AppText` component for consistent fonts
- **Spacing**: Follows your app's spacing system
- **Shadows**: Matches your app's shadow styles
- **Animations**: Uses your app's animation preferences

## 🚀 Performance

- **Native Driver**: All animations use the native driver for 60fps performance
- **Lazy Loading**: Components are only rendered when needed
- **Memory Efficient**: Proper cleanup and state management
- **Smooth Transitions**: Spring animations for natural feel

## 📦 Dependencies

- `expo-blur` - For blur effects
- `@expo/vector-icons` - For icons
- `react-native-reanimated` - For animations (if using custom animations)

## 🎯 Examples in Your App

The custom alert system is already integrated in:

1. **MealCustomizerScreen** - Success alert when adding to cart
2. **CustomMealCartScreen** - Confirmation alerts for remove/clear actions
3. **HomeScreenMealBuilder** - Success alert when adding meals

## 🔮 Future Enhancements

- [ ] Custom animation presets
- [ ] Sound effects for different alert types
- [ ] Haptic feedback integration
- [ ] Dark mode support
- [ ] Accessibility improvements
- [ ] Custom layouts and themes

---

**Enjoy your beautiful, custom alerts! 🎉**
