# Carousel Management System

This system allows administrators to manage featured carousel items (ads/promotions) that appear on the mobile app's home screen.

## 🎯 Overview

The carousel system consists of:
- **Database**: PostgreSQL table to store carousel items
- **Admin Interface**: Web-based management interface
- **Mobile Integration**: API endpoints and React hooks
- **Preview System**: Real-time preview of how items will appear

## 📊 Database Schema

### Table: `carousel_items`

```sql
CREATE TABLE carousel_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    subtitle VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    image_url TEXT NOT NULL,
    price DECIMAL(10,2),
    original_price DECIMAL(10,2),
    discount VARCHAR(50),
    background_color VARCHAR(7) NOT NULL DEFAULT '#EF4444',
    text_color VARCHAR(7) NOT NULL DEFAULT '#FFFFFF',
    action_type VARCHAR(50) NOT NULL DEFAULT 'meal',
    action_value TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Admin Interface Features

### Carousel Management Page (`/admin/carousel`)

**Main Features:**
- ✅ View all carousel items in a table
- ✅ Add new carousel items with form
- ✅ Edit existing items
- ✅ Delete items (with confirmation)
- ✅ Toggle active/inactive status
- ✅ Reorder items (display order)
- ✅ Search and filter items
- ✅ Bulk operations (select multiple)

**Form Features:**
- ✅ Live preview while editing
- ✅ Color picker for background/text colors
- ✅ Image URL validation
- ✅ Price and discount fields
- ✅ Action type selection (meal/category/external)
- ✅ Scheduling (start/end dates)
- ✅ Display order management

**Preview Features:**
- ✅ Mobile-responsive preview
- ✅ Real-time updates as you type
- ✅ Full-screen preview modal
- ✅ Simulated mobile interface

## 📱 Mobile Integration

### API Endpoints

```typescript
GET /api/carousel/active        // Get active carousel items
GET /api/carousel/:id          // Get specific carousel item
POST /api/carousel             // Create new item (admin)
PUT /api/carousel/:id          // Update item (admin)
DELETE /api/carousel/:id       // Delete item (admin)
```

### React Hooks

```typescript
// Get all active carousel items
const { carouselItems, loading, error, refreshCarouselItems } = useCarousel();

// Get specific carousel item
const { carouselItem, loading, error } = useCarouselItem(id);
```

### Usage in HomeScreen

```typescript
import { useCarousel } from '../hooks/useCarousel';

export function HomeScreen() {
  const { carouselItems, loading } = useCarousel();
  
  // Transform API data to match existing format
  const featuredItems = carouselItems.map(item => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    image: item.image,
    price: item.price,
    originalPrice: item.originalPrice,
    discount: item.discount,
    backgroundColor: item.backgroundColor,
    textColor: item.textColor,
    onPress: () => handleCarouselAction(item)
  }));

  return (
    // ... existing code
    <FeaturedCarousel items={featuredItems} />
    // ... existing code
  );
}
```

## 🎨 Carousel Item Structure

### Frontend Format (Mobile App)
```typescript
interface CarouselItem {
  id: string;
  title: string;              // "Flash Sale"
  subtitle: string;           // "Premium Meals"
  description?: string;       // "Limited time"
  image: string;              // Image URL
  price?: number;             // 49.99
  originalPrice?: number;     // 69.99
  discount?: string;          // "30% OFF"
  backgroundColor: string;    // "#EF4444"
  textColor: string;          // "#FFFFFF"
  actionType: 'meal' | 'category' | 'external';
  actionValue: string;        // meal_id, category, or URL
  onPress?: () => void;       // Action handler
}
```

### Database Format
```typescript
interface CarouselItemDB {
  id: number;
  title: string;
  subtitle: string;
  description: string | null;
  image_url: string;
  price: number | null;
  original_price: number | null;
  discount: string | null;
  background_color: string;
  text_color: string;
  action_type: string;
  action_value: string | null;
  is_active: boolean;
  display_order: number;
  start_date: Date | null;
  end_date: Date | null;
  created_at: Date;
  updated_at: Date;
}
```

## 🚀 Setup Instructions

### 1. Run Database Migration
```sql
-- Execute the migration file
\i web/migrations/001_create_carousel_items.sql
```

### 2. Update Admin Navigation
The carousel management link has been added to the admin sidebar.

### 3. Environment Variables
```env
# Add to your .env file
EXPO_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. API Implementation
You'll need to implement the API endpoints in your backend:

```typescript
// Example Express.js routes
app.get('/api/carousel/active', async (req, res) => {
  const items = await db.query(`
    SELECT * FROM carousel_items 
    WHERE is_active = true 
    AND (start_date IS NULL OR start_date <= NOW())
    AND (end_date IS NULL OR end_date >= NOW())
    ORDER BY display_order ASC
  `);
  
  res.json({
    success: true,
    data: items.rows
  });
});
```

## 🎭 Action Types

### Meal Action
- **Type**: `meal`
- **Value**: Meal ID (e.g., "1")
- **Behavior**: Navigate to meal detail screen

### Category Action
- **Type**: `category`
- **Value**: Category ID (e.g., "protein_rich")
- **Behavior**: Filter home screen by category

### External Action
- **Type**: `external`
- **Value**: URL (e.g., "https://example.com")
- **Behavior**: Open external link

## 🔄 Data Flow

1. **Admin creates/edits** carousel item via web interface
2. **Item saved** to PostgreSQL database
3. **Mobile app fetches** active items via API
4. **Items displayed** in home screen carousel
5. **User taps item** → action executed based on type

## 📈 Analytics & Tracking

Consider adding these fields for analytics:
- `view_count`: Number of times item was viewed
- `click_count`: Number of times item was clicked
- `conversion_rate`: Clicks / Views
- `last_viewed`: Last time item was displayed

## 🔒 Security Considerations

- ✅ Validate image URLs to prevent XSS
- ✅ Sanitize HTML content in descriptions
- ✅ Rate limit API endpoints
- ✅ Admin authentication required for management
- ✅ Input validation on all form fields

## 🧪 Testing

### Admin Interface Testing
- [ ] Create new carousel item
- [ ] Edit existing item
- [ ] Delete item
- [ ] Toggle active/inactive
- [ ] Reorder items
- [ ] Preview functionality
- [ ] Form validation

### Mobile Integration Testing
- [ ] API endpoints return correct data
- [ ] Carousel displays items correctly
- [ ] Actions work as expected
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Offline behavior

This system provides a complete solution for managing dynamic carousel content that can be updated without app releases!
