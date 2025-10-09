-- Create storage bucket for meal images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('meal-images', 'meal-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policy to allow authenticated users to upload meal images
CREATE POLICY "Allow authenticated users to upload meal images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'meal-images');

-- Create RLS policy to allow public access to meal images
CREATE POLICY "Allow public access to meal images" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'meal-images');

-- Create RLS policy to allow authenticated users to update their own meal images
CREATE POLICY "Allow authenticated users to update meal images" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'meal-images');

-- Create RLS policy to allow authenticated users to delete meal images
CREATE POLICY "Allow authenticated users to delete meal images" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'meal-images');
