-- Add admin policies for orders and order_items tables
-- This allows admin users to view and manage all orders

-- Create admin policies for orders table
create policy "Admins can view all orders" on public.orders
  for select using (
    exists (
      select 1 from public.profiles 
      where profiles.id = auth.uid() 
      and profiles.role = 'admin'
    )
  );

create policy "Admins can update all orders" on public.orders
  for update using (
    exists (
      select 1 from public.profiles 
      where profiles.id = auth.uid() 
      and profiles.role = 'admin'
    )
  );

create policy "Admins can delete all orders" on public.orders
  for delete using (
    exists (
      select 1 from public.profiles 
      where profiles.id = auth.uid() 
      and profiles.role = 'admin'
    )
  );

-- Create admin policies for order_items table
create policy "Admins can view all order items" on public.order_items
  for select using (
    exists (
      select 1 from public.profiles 
      where profiles.id = auth.uid() 
      and profiles.role = 'admin'
    )
  );

create policy "Admins can update all order items" on public.order_items
  for update using (
    exists (
      select 1 from public.profiles 
      where profiles.id = auth.uid() 
      and profiles.role = 'admin'
    )
  );

create policy "Admins can delete all order items" on public.order_items
  for delete using (
    exists (
      select 1 from public.profiles 
      where profiles.id = auth.uid() 
      and profiles.role = 'admin'
    )
  );

-- Add role column to profiles table if it doesn't exist
alter table public.profiles 
add column if not exists role text default 'user' check (role in ('user', 'admin'));

-- Create index for role column
create index if not exists idx_profiles_role on public.profiles(role);
