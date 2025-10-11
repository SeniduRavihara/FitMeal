-- Create meals table
CREATE TABLE IF NOT EXISTS public.meals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    image_url TEXT,
    protein DECIMAL(5,2) DEFAULT 0.00,
    carbs DECIMAL(5,2) DEFAULT 0.00,
    fat DECIMAL(5,2) DEFAULT 0.00,
    fiber DECIMAL(5,2) DEFAULT 0.00,
    sugar DECIMAL(5,2) DEFAULT 0.00,
    sodium DECIMAL(5,2) DEFAULT 0.00,
    calories INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for meals
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read meals
CREATE POLICY "Allow public read access to meals" ON public.meals
    FOR SELECT USING (true);

-- Allow admins to manage meals
CREATE POLICY "Allow admin full access to meals" ON public.meals
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'super_admin')
        )
    );

-- Insert some sample meals
INSERT INTO public.meals (name, description, base_price, protein, carbs, fat, fiber, sugar, sodium, calories) VALUES
('Chicken Bowl', 'Grilled chicken with rice and vegetables', 12.00, 25.0, 35.0, 8.0, 5.0, 3.0, 400.0, 320),
('Beef Bowl', 'Seasoned beef with quinoa and mixed greens', 14.00, 28.0, 30.0, 12.0, 6.0, 4.0, 450.0, 380),
('Salmon Bowl', 'Fresh salmon with sweet potato and broccoli', 16.00, 30.0, 25.0, 15.0, 7.0, 5.0, 350.0, 420),
('Veggie Bowl', 'Mixed vegetables with brown rice and tahini', 10.00, 12.0, 40.0, 6.0, 8.0, 6.0, 300.0, 280);
