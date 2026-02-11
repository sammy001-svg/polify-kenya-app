-- Create businesses table
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    logo_url TEXT,
    location TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    contact_email TEXT,
    wallet_balance DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for businesses
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Business Policies
CREATE POLICY "Businesses are viewable by everyone" 
    ON public.businesses FOR SELECT 
    USING (true);

CREATE POLICY "Users can create their own business" 
    ON public.businesses FOR INSERT 
    WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Business owners can update their business" 
    ON public.businesses FOR UPDATE 
    USING (auth.uid() = owner_id);

-- Create marketplace_items table (replacing mock data)
CREATE TABLE IF NOT EXISTS public.marketplace_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category TEXT NOT NULL CHECK (category IN ('Agriculture', 'Handicrafts', 'Services', 'Tech', 'Clothing', 'Other')),
    location TEXT NOT NULL, -- Can be different from business location if needed, otherwise defaults to business loc
    stock_quantity INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for marketplace_items
ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;

-- Marketplace Item Policies
CREATE POLICY "Marketplace items are viewable by everyone" 
    ON public.marketplace_items FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Business owners can insert items" 
    ON public.marketplace_items FOR INSERT 
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = business_id AND owner_id = auth.uid()
    ));

CREATE POLICY "Business owners can update their items" 
    ON public.marketplace_items FOR UPDATE 
    USING (EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = business_id AND owner_id = auth.uid()
    ));

CREATE POLICY "Business owners can delete their items" 
    ON public.marketplace_items FOR DELETE 
    USING (EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = business_id AND owner_id = auth.uid()
    ));

-- Create business_transactions table
CREATE TABLE IF NOT EXISTS public.business_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('sale', 'withdrawal', 'deposit', 'fee')),
    description TEXT NOT NULL,
    item_id UUID REFERENCES public.marketplace_items(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for business_transactions
ALTER TABLE public.business_transactions ENABLE ROW LEVEL SECURITY;

-- Transaction Policies
CREATE POLICY "Business owners can view their transactions" 
    ON public.business_transactions FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = business_id AND owner_id = auth.uid()
    ));
