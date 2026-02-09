-- Add category and impact_statement to crowdfundings
ALTER TABLE public.crowdfundings 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Community',
ADD COLUMN IF NOT EXISTS impact_statement TEXT;

-- Update existing records to have a category if they don't
UPDATE public.crowdfundings SET category = 'Community' WHERE category IS NULL;
