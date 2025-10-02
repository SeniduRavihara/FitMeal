-- Migration: Create carousel_items table
-- Description: Table to store featured carousel items (ads/promotions) for the home screen
-- Created: 2024-10-02

-- Create carousel_items table
create table if not exists public.carousel_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null,
  description text,
  image_url text not null,
  price decimal(10,2),
  original_price decimal(10,2),
  discount text,
  background_color text not null default '#EF4444',
  text_color text not null default '#FFFFFF',
  action_type text not null default 'meal' check (action_type in ('meal', 'category', 'external')),
  action_value text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.carousel_items enable row level security;

-- Create RLS policies for carousel_items
-- Admin users can do everything (you'll need to implement admin role checking)
create policy "Admin users can view all carousel items" on public.carousel_items
  for select using (true); -- For now, allow all authenticated users to view

create policy "Admin users can insert carousel items" on public.carousel_items
  for insert with check (auth.uid() is not null); -- Only authenticated users can insert

create policy "Admin users can update carousel items" on public.carousel_items
  for update using (auth.uid() is not null); -- Only authenticated users can update

create policy "Admin users can delete carousel items" on public.carousel_items
  for delete using (auth.uid() is not null); -- Only authenticated users can delete

-- Create indexes for better performance
create index if not exists idx_carousel_items_active on public.carousel_items(is_active);
create index if not exists idx_carousel_items_order on public.carousel_items(display_order);
create index if not exists idx_carousel_items_dates on public.carousel_items(start_date, end_date);
create index if not exists idx_carousel_items_action_type on public.carousel_items(action_type);

-- Create function to handle updated_at timestamp (similar to profile table pattern)
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger to automatically update updated_at timestamp
create trigger on_carousel_items_updated
  before update on public.carousel_items
  for each row execute procedure public.handle_updated_at();

-- Add constraints for data validation
alter table public.carousel_items add constraint check_background_color 
  check (background_color ~ '^#[0-9A-Fa-f]{6}$');

alter table public.carousel_items add constraint check_text_color 
  check (text_color ~ '^#[0-9A-Fa-f]{6}$');

alter table public.carousel_items add constraint check_price_positive 
  check (price is null or price >= 0);

alter table public.carousel_items add constraint check_original_price_positive 
  check (original_price is null or original_price >= 0);

alter table public.carousel_items add constraint check_display_order_positive 
  check (display_order >= 0);

alter table public.carousel_items add constraint check_date_logic 
  check (start_date is null or end_date is null or start_date <= end_date);

-- Insert sample data for testing
insert into public.carousel_items (
  title, subtitle, description, image_url, price, original_price, discount, 
  background_color, text_color, action_type, action_value, display_order
) values
  ('Flash Sale', 'Premium Meals', 'Limited time offer', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', 49.99, 69.99, '30% OFF', '#EF4444', '#FFFFFF', 'meal', '1', 1),
  ('New Launch', 'Protein Bowls', 'High protein content', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop', 24.99, null, null, '#10B981', '#FFFFFF', 'meal', '2', 2),
  ('Weekend Deal', 'Family Pack', 'Perfect for families', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop', 89.99, 119.99, 'SAVE $30', '#8B5CF6', '#FFFFFF', 'category', 'family', 3),
  ('Healthy Choice', 'Keto Meals', 'Low carb options', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop', 34.99, null, null, '#F59E0B', '#FFFFFF', 'category', 'keto', 4);

-- Add table and column comments for documentation
comment on table public.carousel_items is 'Stores featured carousel items (ads/promotions) displayed on the home screen';
comment on column public.carousel_items.id is 'Unique identifier for the carousel item';
comment on column public.carousel_items.title is 'Main title displayed on the carousel item';
comment on column public.carousel_items.subtitle is 'Subtitle displayed below the title';
comment on column public.carousel_items.description is 'Optional description text';
comment on column public.carousel_items.image_url is 'URL of the image to display';
comment on column public.carousel_items.price is 'Current price of the item';
comment on column public.carousel_items.original_price is 'Original price (for showing discounts)';
comment on column public.carousel_items.discount is 'Discount text to display (e.g., "30% OFF")';
comment on column public.carousel_items.background_color is 'Hex color code for carousel item background';
comment on column public.carousel_items.text_color is 'Hex color code for carousel item text';
comment on column public.carousel_items.action_type is 'Type of action: meal (specific meal), category (meal category), external (external URL)';
comment on column public.carousel_items.action_value is 'Value for the action: meal_id, category_id, or external URL';
comment on column public.carousel_items.is_active is 'Whether the carousel item is currently active/visible';
comment on column public.carousel_items.display_order is 'Order in which items appear in carousel (lower numbers first)';
comment on column public.carousel_items.start_date is 'Optional start date for scheduled promotions';
comment on column public.carousel_items.end_date is 'Optional end date for scheduled promotions';
comment on column public.carousel_items.created_at is 'Timestamp when the item was created';
comment on column public.carousel_items.updated_at is 'Timestamp when the item was last updated';