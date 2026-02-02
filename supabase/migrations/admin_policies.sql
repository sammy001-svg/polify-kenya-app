-- Migration: Admin Policies and Role Management

-- 1. Ensure 'admin' is a valid role (if we have an enum constraint, otherwise text is fine)
-- If we used an enum for role:
-- ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'admin';

-- 2. Create Policy for Admins to Manage Profiles (View/Edit All)
CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admins can update all profiles"
ON profiles FOR UPDATE
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- 3. Create Policy for Admins to Manage Petitions
CREATE POLICY "Admins can delete any petition"
ON petitions FOR DELETE
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
