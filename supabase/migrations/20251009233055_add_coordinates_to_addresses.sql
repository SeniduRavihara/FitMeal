-- Add latitude and longitude columns to addresses table
ALTER TABLE public.addresses 
ADD COLUMN IF NOT EXISTS latitude NUMERIC(10, 8),
ADD COLUMN IF NOT EXISTS longitude NUMERIC(11, 8);

-- Add comment to explain the columns
COMMENT ON COLUMN public.addresses.latitude IS 'Latitude coordinate for delivery location';
COMMENT ON COLUMN public.addresses.longitude IS 'Longitude coordinate for delivery location';

