# Features Organization

This directory follows a feature-based organization pattern for better maintainability and scalability.

## Structure

```
src/
├── features/                    # Feature-based modules
│   ├── meals/                  # Meal management feature
│   │   ├── components/         # Meal-related components
│   │   │   └── MealManagement.tsx
│   │   └── index.ts           # Feature exports
│   ├── orders/                 # Order management feature
│   │   ├── components/         # Order-related components
│   │   │   └── OrderManagement.tsx
│   │   └── index.ts           # Feature exports
│   ├── users/                  # User management feature
│   │   ├── components/         # User-related components
│   │   │   └── UserManagement.tsx
│   │   └── index.ts           # Feature exports
│   ├── carousel/               # Carousel management feature
│   │   ├── components/         # Carousel-related components
│   │   │   ├── CarouselManagement.tsx
│   │   │   ├── CarouselItemForm.tsx
│   │   │   └── CarouselPreview.tsx
│   │   └── index.ts           # Feature exports
│   ├── dashboard/              # Dashboard feature
│   │   ├── components/         # Dashboard-related components
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── RecentOrders.tsx
│   │   │   ├── PopularMeals.tsx
│   │   │   └── RevenueChart.tsx
│   │   └── index.ts           # Feature exports
│   ├── settings/               # Settings feature
│   │   ├── components/         # Settings-related components
│   │   │   └── SettingsManagement.tsx
│   │   └── index.ts           # Feature exports
│   └── subscriptions/          # Subscription feature
│       ├── components/         # Subscription-related components
│       │   └── SubscriptionManagement.tsx
│       └── index.ts           # Feature exports
├── shared/                     # Shared components and layouts
│   ├── components/             # Reusable components
│   │   └── ImageUpload.tsx
│   ├── layouts/                # Layout components
│   │   └── admin/              # Admin-specific layouts
│   │       ├── AdminHeader.tsx
│   │       ├── AdminSidebar.tsx
│   │       └── AdminLayoutClient.tsx
│   └── index.ts               # Shared exports
└── supabase/                   # Database services
    └── services/               # Service layer
        ├── MealService.ts
        ├── OrderService.ts
        ├── CarouselService.ts
        └── ...
```

## Benefits

1. **Feature Isolation**: Each feature is self-contained with its own components and logic
2. **Easy Navigation**: Developers can quickly find all related code for a specific feature
3. **Scalability**: New features can be added without affecting existing ones
4. **Reusability**: Shared components are clearly separated and can be easily imported
5. **Maintainability**: Changes to one feature don't impact others

## Import Patterns

### Feature Components

```typescript
// Import from feature index
import { MealManagement } from "@/features/meals";
import { OrderManagement } from "@/features/orders";
```

### Shared Components

```typescript
// Import from shared index
import { ImageUpload, AdminHeader } from "@/shared";
```

### Services

```typescript
// Import services directly
import { MealService } from "@/supabase/services/MealService";
```

## Adding New Features

1. Create a new feature directory under `src/features/`
2. Add a `components/` subdirectory for feature-specific components
3. Create an `index.ts` file to export the feature's public API
4. Follow the same pattern as existing features

## Best Practices

1. Keep feature components focused on their specific domain
2. Use the feature index files to control what gets exported
3. Place truly reusable components in `src/shared/components/`
4. Keep business logic in services under `src/supabase/services/`
5. Use absolute imports with the `@/` alias for cleaner import paths

