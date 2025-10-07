-- Create orders table for storing customer orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  order_number text unique not null,
  order_status text not null default 'pending' check (order_status in ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  payment_method text not null default 'cash_on_delivery' check (payment_method in ('cash_on_delivery', 'card', 'bank_transfer')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  
  -- Address information (stored as JSONB for flexibility)
  delivery_address jsonb not null,
  
  -- Pricing
  subtotal decimal(10,2) not null,
  delivery_fee decimal(10,2) not null default 0,
  total_amount decimal(10,2) not null,
  
  -- Order details
  notes text,
  estimated_delivery_time timestamp with time zone,
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create order_items table for storing individual items in each order
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  
  -- Meal information
  meal_base_id text not null,
  meal_name text not null,
  
  -- Customization details (stored as JSONB)
  customization jsonb not null,
  
  -- Pricing
  quantity integer not null check (quantity > 0),
  base_price decimal(10,2) not null,
  customization_fee decimal(10,2) not null default 0,
  price_per_item decimal(10,2) not null,
  total_price decimal(10,2) not null,
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Create RLS policies for orders
create policy "Users can view own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "Users can insert own orders" on public.orders
  for insert with check (auth.uid() = user_id);

create policy "Users can update own orders" on public.orders
  for update using (auth.uid() = user_id);

-- Create RLS policies for order_items
create policy "Users can view own order items" on public.order_items
  for select using (
    exists (
      select 1 from public.orders 
      where orders.id = order_items.order_id 
      and orders.user_id = auth.uid()
    )
  );

create policy "Users can insert own order items" on public.order_items
  for insert with check (
    exists (
      select 1 from public.orders 
      where orders.id = order_items.order_id 
      and orders.user_id = auth.uid()
    )
  );

-- Create function to update updated_at column
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger update_orders_updated_at
  before update on public.orders
  for each row execute procedure public.update_updated_at_column();

create trigger update_order_items_updated_at
  before update on public.order_items
  for each row execute procedure public.update_updated_at_column();

-- Create indexes for better performance
create index idx_orders_user_id on public.orders(user_id);
create index idx_orders_status on public.orders(order_status);
create index idx_orders_created_at on public.orders(created_at desc);
create index idx_order_items_order_id on public.order_items(order_id);

-- Create function to generate order number
create or replace function public.generate_order_number()
returns text as $$
declare
  order_num text;
  counter integer;
begin
  -- Get current date in YYYYMMDD format
  order_num := to_char(now(), 'YYYYMMDD');
  
  -- Get count of orders for today
  select count(*) + 1 into counter
  from public.orders
  where date(created_at) = current_date;
  
  -- Format as YYYYMMDD-XXXX
  order_num := order_num || '-' || lpad(counter::text, 4, '0');
  
  return order_num;
end;
$$ language plpgsql;
