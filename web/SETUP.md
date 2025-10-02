# Web Admin Setup Instructions

## Environment Variables

Create a `.env.local` file in the `web` directory with the following content:

```bash
# For local development
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

## Running the Admin Panel

1. Make sure Supabase is running locally:

   ```bash
   cd .. # Go to project root
   npx supabase start
   ```

2. Install dependencies and start the web server:

   ```bash
   npm install
   npm run dev
   ```

3. Access the admin panel at http://localhost:3000

## Authentication

- Sign up at `/sign-up` to create a new admin account
- Sign in at `/sign-in` to access the admin dashboard
- The middleware will automatically redirect unauthenticated users to the sign-in page

## Features

- **Secure Authentication**: Full sign-up and sign-in functionality with form validation
- **Password Requirements**: Strong password validation with visual feedback
- **Auto-redirect**: Middleware handles authentication state and redirects appropriately
- **Responsive Design**: Mobile-friendly admin interface
- **Error Handling**: Comprehensive error messages and user feedback
