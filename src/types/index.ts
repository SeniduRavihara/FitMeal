export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  fitnessGoal: 'muscle_gain' | 'fat_loss' | 'maintenance';
  age?: number;
  weight?: number;
  height?: number;
  dietaryPreferences: string[];
  createdAt: Date;
}

export interface Nutrition {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fats: number; // in grams
  fiber: number; // in grams
  sugar: number; // in grams
  sodium: number; // in mg
  vitamins: string[];
  minerals: string[];
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  prepTime: number; // in minutes
  category: string;
  tags: string[];
  nutrition: Nutrition;
  ingredients: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isKeto: boolean;
  isPopular: boolean;
  isNew: boolean;
  createdAt: Date;
}

export interface CartItem {
  id: string;
  meal: Meal;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  tax: number;
  grandTotal: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  deliveryAddress: Address;
  paymentMethod: string;
  estimatedDelivery: Date;
  createdAt: Date;
  deliveredAt?: Date;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Subscription {
  id: string;
  name: string;
  duration: '3_days' | '7_days' | 'monthly';
  mealsPerDay: number;
  price: number;
  originalPrice?: number;
  features: string[];
  isPopular: boolean;
  description: string;
}

export interface UserSubscription {
  id: string;
  userId: string;
  subscription: Subscription;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  mealsRemaining: number;
  nextDelivery: Date;
}

export type TabName = 'home' | 'subscriptions' | 'orders' | 'profile';
