# 🍽️ FitMeal - Mobile App

A comprehensive fitness meal delivery mobile application built with **Expo** and **React Native**. Order healthy, nutritious meals tailored to your fitness goals directly from your mobile device.

![FitMeal Mobile App](docs/Phone-mkocukp.png)

## ✨ Features

### 🏠 **Home & Discovery**

- **Interactive Meal Browsing** - Browse through various healthy meal options
- **Category Filtering** - Filter meals by type (breakfast, lunch, dinner, snacks)
- **Search Functionality** - Find meals by name or ingredients
- **Featured Carousel** - Discover trending and recommended meals
- **Restaurant-Quality Images** - High-quality meal photos with detailed descriptions

### 🛒 **Shopping Cart**

- **Add to Cart** - Easy one-tap meal addition
- **Quantity Management** - Adjust quantities with smooth controls
- **Real-time Pricing** - Live calculation of totals with delivery fees
- **Cart Persistence** - Items saved across app sessions
- **Smart Recommendations** - Free delivery threshold notifications

### 👤 **User Profile & Account**

- **Order History** - Complete order tracking with status updates
- **Shipping Address Management** - Multiple addresses with default selection
- **Custom Meal Requests** - Submit special dietary requirements
- **Profile Customization** - Personal information and fitness goals
- **Privacy Settings** - Complete control over data and notifications

### 🔐 **Authentication**

- **Secure Sign Up/Sign In** - Email-based authentication
- **Password Strength Validation** - Real-time password requirements
- **Biometric Authentication** - Touch ID/Face ID support
- **Account Recovery** - Password reset functionality
- **Session Management** - Persistent login with secure tokens

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator or Android Emulator / Physical Device

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/fitmeal-mobile.git
cd fitmeal-mobile
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment**

```bash
# Copy environment template
cp .env.example .env.local

# Add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start the development server**

```bash
npm start
# or
expo start
```

5. **Run on device**

```bash
# iOS
expo start --ios

# Android
expo start --android
```

## 🏗️ Tech Stack

### **Core Technologies**

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - File-based navigation system

### **UI & Styling**

- **NativeWind** - Tailwind CSS for React Native
- **Tailwind CSS** - Utility-first CSS framework
- **React Native Vector Icons** - Comprehensive icon library
- **Expo Blur** - Native blur effects

### **Backend & Database**

- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Relational database
- **Row Level Security** - Secure data access
- **Real-time subscriptions** - Live data updates

### **Additional Libraries**

- **React Context API** - Global state management
- **React Hooks** - Modern state and lifecycle management
- **UUID** - Unique identifier generation
- **React Native Safe Area Context** - Safe area handling

## 📱 Screenshots

### **Main App Views**

| Home Screen                  | Meal Details              | Cart Screen       |
| ---------------------------- | ------------------------- | ----------------- |
| Browse meals with categories | Detailed meal information | Manage cart items |
| Search and filter options    | Nutrition information     | Order summary     |
| Featured recommendations     | Quantity selection        | Checkout process  |

### **User Profile Features**

| Profile              | Order History | Settings              |
| -------------------- | ------------- | --------------------- |
| Personal information | Track orders  | App preferences       |
| Fitness goals        | Order status  | Notification settings |
| Dietary preferences  | Reorder meals | Privacy controls      |

## 🛠️ Development

### **Project Structure**

```
src/
├── app/                 # Expo Router screens
│   ├── (auth)/         # Authentication flow
│   ├── (tabs)/         # Main tab navigation
│   ├── cart.tsx        # Shopping cart screen
│   └── *.tsx           # Other screens
├── components/          # Reusable components
│   ├── common/         # Generic components
│   ├── meal/           # Meal-specific components
│   └── auth/           # Authentication components
├── contexts/           # React Context providers
├── data/              # Mock data and constants
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

### **Key Components**

#### **🔧 Core Components**

- `AppText` - Consistent text styling
- `Button` - Reusable button variants
- `Carousel` - Image carousel component
- `BottomSheet` - Modal bottom sheets

#### **🍽️ Meal Components**

- `MealCard` - Individual meal display
- `MealDetailBottomSheet` - Detailed meal view
- `NutritionCard` - Nutritional information
- `FeaturedCarousel` - Home page carousel

#### **👤 User Components**

- `AuthGuard` - Authentication protection
- `AuthPrompt` - Login prompts
- `ProfileScreen` - User profile management
- `OrderHistory` - Order tracking

### **State Management**

#### **Context Providers**

- `AuthContext` - User authentication state
- `CartContext` - Shopping cart management
- `SidebarContext` - Navigation state

#### **Custom Hooks**

- `useAuth` - Authentication utilities
- `useCart` - Cart management utilities
- `useSidebar` - Sidebar controls

## 🔧 Configuration

### **Supabase Setup**

1. **Create Supabase Project**

```bash
npx supabase init
npx supabase start
```

2. **Run Database Migrations**

```bash
# Apply migrations
npx supabase db push

# Generate types
npx supabase gen types typescript --linked > database.types.ts
```

3. **Enable Authentication**
   - Go to Supabase Dashboard → Authentication
   - Enable Email provider
   - Configure email templates

### **Environment Variables**

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
EXPO_PUBLIC_APP_NAME=FitMeal
EXPO_PUBLIC_APP_VERSION=1.0.0
```

## 📦 Build & Deploy

### **Development Build**

```bash
# Create development build
expo build:android --type development-client
expo build:ios --type development-client
```

### **Production Build**

```bash
# Android APK
expo build:android --type apk

 # iOS App Store
expo build:ios --type archive
```

### **Expo Application Services (EAS)**

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure project
eas build:configure

# Build for app stores
eas build --platform all
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs and request features via [GitHub Issues](https://github.com/your-username/fitmeal-mobile/issues)
- **Email**: support@fitmeal.com
- **Discord**: Join our developer community

---

**🍃 Made with love for healthy living** - FitMeal Team
