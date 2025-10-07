-- Create addresses table for storing user delivery addresses (MVP - Two Line Address)
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  full_name text not null,
  phone_number text not null,
  address_line1 text not null,
  address_line2 text,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.addresses enable row level security;

-- Create RLS policies for addresses
create policy "Users can view own addresses" on public.addresses
  for select using (auth.uid() = user_id);

create policy "Users can insert own addresses" on public.addresses
  for insert with check (auth.uid() = user_id);

create policy "Users can update own addresses" on public.addresses
  for update using (auth.uid() = user_id);

create policy "Users can delete own addresses" on public.addresses
  for delete using (auth.uid() = user_id);

-- Create function to update updated_at column
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger update_addresses_updated_at
  before update on public.addresses
  for each row execute procedure public.update_updated_at_column();

-- Create index for better performance
create index idx_addresses_user_id on public.addresses(user_id);
create index idx_addresses_default on public.addresses(user_id, is_default) where is_default = true;
