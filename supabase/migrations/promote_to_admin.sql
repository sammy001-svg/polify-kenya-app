-- Helper to set current user as admin (Run in Supabase SQL Editor if needed)
-- Replace 'YOUR_EMAIL@EXAMPLE.COM' with your actual email

UPDATE profiles
SET role = 'admin'
FROM auth.users
WHERE profiles.id = auth.users.id
AND auth.users.email = 'YOUR_EMAIL@EXAMPLE.COM';

-- Or just check what your ID is:
-- SELECT id, email FROM auth.users;
