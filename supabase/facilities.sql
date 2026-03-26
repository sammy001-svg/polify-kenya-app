-- Create Facility Categories Table
CREATE TABLE IF NOT EXISTS public.facility_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT,
    tags TEXT[] DEFAULT '{}'
);

-- Create Facilities Table
CREATE TABLE IF NOT EXISTS public.facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.facility_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0.0,
    featured BOOLEAN DEFAULT FALSE,
    cover_image TEXT,
    contact_numbers TEXT[] DEFAULT '{}',
    email TEXT,
    services TEXT[] DEFAULT '{}',
    costs TEXT,
    about TEXT,
    gallery TEXT[] DEFAULT '{}',
    is_verified BOOLEAN DEFAULT FALSE
);

-- Add updated_at trigger for facilities
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_facilities_updated_at
BEFORE UPDATE ON public.facilities
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- RLS Policies
ALTER TABLE public.facility_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;

-- Category Policies
CREATE POLICY "Anyone can view categories" 
ON public.facility_categories FOR SELECT 
TO public 
USING (true);

-- Facility Policies
CREATE POLICY "Anyone can view verified facilities" 
ON public.facilities FOR SELECT 
TO public 
USING (is_verified = true OR (auth.uid() = owner_id));

CREATE POLICY "Authenticated users can register facilities" 
ON public.facilities FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their own facilities" 
ON public.facilities FOR UPDATE 
TO authenticated 
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their own facilities" 
ON public.facilities FOR DELETE 
TO authenticated 
USING (auth.uid() = owner_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_facilities_category ON public.facilities(category_id);
CREATE INDEX IF NOT EXISTS idx_facilities_owner ON public.facilities(owner_id);
CREATE INDEX IF NOT EXISTS idx_facilities_is_verified ON public.facilities(is_verified);

-- Seed Initial Categories (from the UI icons and titles)
INSERT INTO public.facility_categories (title, description, icon, color, tags)
VALUES 
('Hospitals & Clinics', '24/7 emergency care and specialized medical health centers.', 'Stethoscope', 'bg-emerald-500', '{"Emergency", "Surgery", "Maternity", "Pediatrics"}'),
('Police Stations', 'Security hubs and regional administrative police offices.', 'ShieldCheck', 'bg-blue-600', '{"Security", "Reports", "Justice", "Traffic"}'),
('Schools & Colleges', 'Educational institutions from primary to higher learning.', 'GraduationCap', 'bg-purple-600', '{"Primary", "Secondary", "TVET", "University"}'),
('Shopping Malls', 'Modern retail centers, entertainment, and commercial hubs.', 'ShoppingBag', 'bg-orange-500', '{"Retail", "Dining", "Cinema", "Supermarket"}'),
('Dining & Cafes', 'Local eateries, international cuisines, and coffee houses.', 'Utensils', 'bg-pink-500', '{"Swahili", "Breakfast", "Fast Food", "Fine Dining"}'),
('Religious Sites', 'Churches, Mosques, and community spiritual centers.', 'Church', 'bg-indigo-600', '{"Worship", "Community", "Counseling", "Youth"}')
ON CONFLICT DO NOTHING;
