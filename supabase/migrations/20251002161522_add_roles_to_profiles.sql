-- Migration: Add role system to existing profiles table
-- This is safe to run on existing data

-- Step 1: Create role enum type
do $$ 
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('user', 'admin', 'moderator', 'super_admin');
  end if;
end $$;

-- Step 2: Add role column to existing profiles table
alter table public.profiles 
add column if not exists role user_role default 'user' not null;

-- Step 3: Set all existing users to 'user' role (if any exist)
update public.profiles 
set role = 'user' 
where role is null;

-- Step 4: Create helper function to check if user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('admin', 'super_admin')
  );
end;
$$ language plpgsql security definer;

-- Step 5: Update the handle_new_user function to include role
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    'user'::user_role
  );
  return new;
end;
$$ language plpgsql security definer;

-- Step 6: Drop old RLS policies (we'll recreate them with better logic)
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;

-- Step 7: Create new enhanced RLS policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Admins can view all profiles" on public.profiles
  for select using (public.is_admin());

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id)
  with check (
    auth.uid() = id 
    and role = (select role from public.profiles where id = auth.uid())
  );

create policy "Admins can update any profile" on public.profiles
  for update using (public.is_admin());

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id and role = 'user');

-- Step 8: Create function to automatically update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Step 9: Create trigger to automatically update updated_at
drop trigger if exists handle_profiles_updated_at on public.profiles;
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- Step 10: Create index for faster role lookups
create index if not exists profiles_role_idx on public.profiles(role);

-- Step 11 (Optional): Make your first user an admin
-- Uncomment and replace with your actual email after running migration:
-- update public.profiles set role = 'admin' where email = 'your-email@example.com';