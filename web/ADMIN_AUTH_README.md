# Admin Authentication & Authorization System

## Overview

This system provides role-based access control for the FitMeal admin dashboard with comprehensive authentication and authorization features.

## Features

### 🔐 **Authentication**

- Secure sign-up and sign-in for admin users
- Session management with Supabase
- Automatic session restoration on page refresh
- Protected routes with middleware

### 🛡️ **Authorization**

- Role-based access control (RBAC)
- Four user roles: `user`, `admin`, `moderator`, `super_admin`
- Admin-only access to dashboard
- Real-time role checking

### 🚀 **Components**

#### **AdminProtection Component**

- Wraps admin routes to ensure only authorized users can access
- Shows loading states during authentication checks
- Redirects unauthorized users to appropriate pages
- Located: `src/components/AdminProtection.tsx`

#### **Enhanced AuthContext**

- Provides authentication state throughout the app
- Includes user profile and role information
- Exposes `isAdmin` boolean for easy role checking
- Located: `src/context/AuthContext.tsx`

#### **useAuth Hook**

- Easy-to-use hook for consuming auth context
- TypeScript typed for better developer experience
- Located: `src/hooks/useAuth.ts`

### 🛣️ **Route Protection**

#### **Middleware Level** (`middleware.ts`)

- Server-side route protection
- Checks authentication status
- Validates admin roles for `/admin` routes
- Redirects unauthenticated users to sign-in
- Redirects unauthorized users to `/unauthorized`

#### **Component Level** (`AdminProtection`)

- Client-side protection as backup
- Provides better UX with loading states
- Handles edge cases and error states

### 📄 **Pages**

#### **Sign In** (`/sign-in`)

- Professional admin-focused design
- Form validation and error handling
- Automatic redirect after successful login

#### **Sign Up** (`/sign-up`)

- Admin account creation
- Password strength validation
- Success states and user feedback

#### **Unauthorized** (`/unauthorized`)

- User-friendly access denied page
- Shows current user role
- Options to sign out or go home

### 🗄️ **Database Schema**

#### **Profiles Table**

```sql
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  phone text,
  address text,
  role user_role default 'user' not null,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
);
```

#### **User Roles Enum**

```sql
create type user_role as enum ('user', 'admin', 'moderator', 'super_admin');
```

#### **Helper Function**

```sql
create function public.is_admin() returns boolean
-- Returns true if current user's role is 'admin' or 'super_admin'
```

### 🔧 **Services**

#### **AdminService** (`src/supabase/services/AdminService.ts`)

- `isAdmin()` - Check if current user is admin
- `getUserProfile(userId)` - Get user profile with role
- `updateUserRole(userId, role)` - Update user role (admin only)
- `getAllUsers()` - Get all users (admin only)

## Usage Examples

### Using the useAuth Hook

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, profile, isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAdmin) {
    return <div>Access denied</div>;
  }

  return <div>Welcome, {profile?.full_name}!</div>;
}
```

### Protecting a Route

```typescript
import AdminProtection from '@/components/AdminProtection';

export default function AdminPage() {
  return (
    <AdminProtection>
      <div>This content is only visible to admins</div>
    </AdminProtection>
  );
}
```

### Checking Admin Status

```typescript
import { AdminService } from "@/supabase/services/AdminService";

// Check if current user is admin
const isAdmin = await AdminService.isAdmin();

// Get user profile
const { data: profile } = await AdminService.getUserProfile(userId);
```

## Security Features

1. **Server-side Validation**: Middleware validates roles on every request
2. **Client-side Protection**: Components provide additional security layer
3. **RLS Policies**: Database-level security with Row Level Security
4. **Session Management**: Secure session handling with Supabase
5. **Error Handling**: Graceful error handling without exposing sensitive info

## Setup Instructions

1. **Environment Variables**: Ensure Supabase credentials are configured
2. **Database Migration**: Run the role migration to add role system
3. **First Admin**: Update a user to admin role manually:
   ```sql
   update public.profiles set role = 'admin' where email = 'your-email@example.com';
   ```
4. **Test**: Sign in and verify admin access works

## Flow Diagram

```
User Request → Middleware Check → Database Role Query → Route Access Decision
     ↓              ↓                    ↓                      ↓
Sign-in Page → Auth Success → Profile Fetch → Admin Dashboard
     ↓              ↓                    ↓                      ↓
     ↓         Auth Failure         No Admin Role        Unauthorized Page
     ↓              ↓                    ↓                      ↓
Stay on Page → Error Message → Redirect to /unauthorized → Access Denied
```

This system provides enterprise-level security for your admin dashboard while maintaining excellent user experience.
