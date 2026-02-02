-- FIX: Infinite recursion in RLS policies
-- Problem: Policies on 'profiles' table were querying 'profiles' table to check for 'admin' role, creating a loop.
-- Solution: Use a SECURITY DEFINER function to check admin status. This function bypasses RLS policies.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the problematic policies to use the function instead of direct subquery

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
USING (
  is_admin()
);

DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
CREATE POLICY "Admins can update all profiles"
ON profiles FOR UPDATE
USING (
  is_admin()
);
