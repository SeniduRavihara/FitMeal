# 🍽️ FitMeal Admin Dashboard

A comprehensive **Next.js** admin dashboard for managing the FitMeal fitness meal delivery platform. Built with modern web technologies for efficient restaurant and order management.

## ✨ Features

### 🏠 **Dashboard Overview**

- **Real-time Analytics** - Order volume, revenue metrics, and user statistics
- **Recent Orders** - Live order updates and status tracking
- **Popular Meals** - Best-selling items and performance metrics
- **Revenue Charts** - Visual data representation with interactive charts
- **Quick Actions** - One-click access to common tasks

### 👥 **User Management**

- **User Profiles** - Complete customer database with role-based access
- **Role Management** - Admin, Moderator, and User role assignments
- **Search & Filter** - Advanced user search with multiple criteria
- **Bulk Operations** - Mass actions for user management
- **Activity Tracking** - User engagement and order history

### 📦 **Order Management**

- **Order Processing** - Status updates and fulfillment tracking
- **Order History** - Complete order archive with filtering
- **Status Management** - Preparing, Out for Delivery, Delivered, Cancelled
- **Bulk Updates** - Mass order status changes
- **Customer Communication** - Order notifications and updates

### 🍽️ **Meal Management**

- **Meal Catalog** - Comprehensive meal database management
- **Nutrition Tracking** - Calorie, protein, carb, and fat information
- **Image Management** - High-quality meal photography
- **Category Organization** - Breakfast, Lunch, Dinner, Snacks
- **Availability Control** - Stock management and seasonal items

### 🎠 **Carousel Management**

- **Featured Content** - Homepage carousel management
- **Image Upload** - Drag-and-drop image management
- **Content Preview** - Real-time preview of carousel content
- **Scheduling** - Time-based content display
- **Analytics** - Carousel performance metrics

### ⚙️ **Settings & Configuration**

- **App Settings** - Platform-wide configuration
- **Notification Management** - Email and push notification settings
- **Payment Settings** - Payment gateway configuration
- **Delivery Zones** - Service area management
- **System Preferences** - Theme, language, and UI preferences

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account and project

### Installation

1. **Navigate to web directory**

```bash
cd web
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Configure environment variables**

```bash
# Copy environment template
cp .env.example .env.local

# Add your configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open in browser**

```
http://localhost:3000
```

## 🏗️ Tech Stack

### **Frontend Framework**

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Context API** - State management

### **UI Components**

- **Heroicons** - Beautiful SVG icons
- **Lucide React** - Consistent icon set
- **Headless UI** - Accessible component primitives
- **React Hook Form** - Form management
- **Recharts** - Data visualization

### **Authentication & Authorization**

- **Supabase Auth** - User authentication
- **Role-based Access Control** - Admin security
- **Middleware Protection** - Route security
- **Session Management** - Secure user sessions

### **Backend Integration**

- **Supabase** - Database and real-time subscriptions
- **PostgreSQL** - Relational database
- **Row Level Security** - Data protection
- **Real-time Updates** - Live data synchronization

## 📊 Admin Dashboard Features

### **🔐 Security & Access Control**

- **Admin Authentication** - Secure admin login system
- **Role Verification** - Multi-level admin access
- **Route Protection** - Middleware-based security
- **Session Management** - Persistent admin sessions
- **Unauthorized Access Handling** - Proper error responses

### **📱 Responsive Design**

- **Mobile-First Approach** - Optimized for all screen sizes
- **Desktop Optimization** - Full desktop experience
- **Tablet Support** - Perfect tablet layouts
- **Touch-Friendly** - Mobile gesture support

### **🎨 Modern UI/UX**

- **Clean Interface** - Minimal and professional design
- **Consistent Theming** - Orange accent color scheme
- **Smooth Animations** - Enhanced user experience
- **Accessibility** - WCAG compliance considerations

### **📈 Analytics & Reporting**

- **Dashboard Metrics** - Key performance indicators
- **Revenue Charts** - Visual financial data
- **Order Statistics** - Order volume and trends
- **User Analytics** - Customer behavior insights

## 🗂️ Project Structure

```
web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── carousel/      # Carousel management
│   │   │   ├── meals/         # Meal management
│   │   │   ├── orders/        # Order management
│   │   │   ├── users/         # User management
│   │   │   └── settings/      # System settings
│   │   ├── unauthorized/      # Access denied page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── admin/             # Admin-specific components
│   │   └── common/            # Shared components
│   ├── context/               # React Context providers
│   ├── supabase/              # Supabase configuration
│   │   ├── services/          # API service layers
│   │   └── supabase.ts        # Client configuration
│   └── hooks/                 # Custom React hooks
├── public/                     # Static assets
├── middleware.ts               # Next.js middleware
├── next.config.ts             # Next.js configuration
├── tailwind.config.js         # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

## 🔧 Configuration

### **Next.js Configuration**

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["images.unsplash.com", "localhost"],
  },
};
```

### **Tailwind Configuration**

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#FB923C",
          600: "#EA580C",
        },
      },
    },
  },
};
```

### **Supabase Services**

```typescript
// Admin-specific database operations
export class AdminService {
  static async getAllUsers() {
    return await client.from("profiles").select("*");
  }

  static async updateUserRole(userId: string, role: string) {
    return await client.from("profiles").update({ role }).eq("id", userId);
  }
}
```

## 🔒 Security Implementation

### **Authentication Middleware**

```typescript
// middleware.ts - Server-side protection
export async function middleware(request: NextRequest) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Role-based access control
  if (session && request.nextUrl.pathname.startsWith("/admin")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (!["admin", "super_admin"].includes(profile?.role)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
}
```

### **Client-side Protection**

```typescript
// AdminProtection component
export default function AdminProtection({ children }) {
  const { user, profile, loading, isAdmin } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) router.push("/sign-in");
  if (!isAdmin) router.push("/unauthorized");

  return <>{children}</>;
}
```

## 📦 Deployment

### **Vercel Deployment**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### **Environment Variables (Production)**

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
NEXT_PUBLIC_APP_ENV=production
```

### **Docker Deployment**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 🧪 Testing

### **Unit Testing**

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### **E2E Testing**

```bash
# Playwright tests
npm run test:e2e

# Cypress tests
npm run cypress:open
```

## 📊 Analytics & Monitoring

### **Performance Monitoring**

- **Core Web Vitals** - Performance metrics
- **Error Tracking** - Bug monitoring
- **User Analytics** - Admin behavior insights
- **API Performance** - Database query optimization

### **Dashboard Metrics**

- **Order Processing Time** - Efficiency tracking
- **Admin Activity** - User engagement metrics
- **System Health** - Uptime and performance
- **Revenue Tracking** - Financial performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/admin-feature`)
3. Commit your changes (`git commit -m 'Add admin feature'`)
4. Push to the branch (`git push origin feature/admin-feature`)
5. Open a Pull Request

### **Development Guidelines**

- Follow TypeScript best practices
- Use Prettier for code formatting
- Write comprehensive tests
- Update documentation for new features
- Follow security best practices

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check `/docs` folder for detailed guides
- **Issues**: Report bugs via [GitHub Issues](https://github.com/your-username/fitmeal-admin/issues)
- **Email**: admin-support@fitmeal.com
- **Documentation**: [Admin Handbook](https://docs.fitmeal.com/admin)

---

**🔐 Secure admin management for FitMeal** - Admin Dashboard Team
