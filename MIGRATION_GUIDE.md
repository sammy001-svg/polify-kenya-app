# Database Migration Instructions

## Step-by-Step Guide to Run Civic Identification Migration

### 1. Access Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Sign in to your account
3. Select your project: **tlrmxgptetlfdekxegyp**

### 2. Open SQL Editor

1. Click **SQL Editor** in the left sidebar
2. Click **New Query** button

### 3. Copy and Execute Migration

1. Open the migration file: `C:\Political Intelligence\supabase\migrations\add_civic_identification.sql`
2. Copy the ENTIRE contents
3. Paste into the SQL Editor
4. Click **Run** or press `Ctrl+Enter`

### 4. Verify Migration Success

After running, you should see:

- ✅ "Success. No rows returned"
- OR ✅ Row count showing number of existing users backfilled

Run this verification query:

```sql
-- Check new columns added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'profiles'
AND column_name IN ('username', 'civic_id', 'email')
ORDER BY column_name;
```

Expected result: 3 rows showing username, civic_id, and email columns

### 5. Check Existing Users

```sql
-- View all profiles with civic IDs and usernames
SELECT
  full_name,
  username,
  civic_id,
  email,
  created_at
FROM profiles
ORDER BY created_at DESC
LIMIT 10;
```

You should see:

- All existing users have civic_id (e.g., KE-2024-000001)
- All existing users have username (e.g., user_000001 or citizen_000001)
- Email column populated

### 6. Test with New User

After migration:

1. Go to http://localhost:3000/auth
2. Create a new test account with username `test_migration_001`
3. Check the profile_completed page - you should see your civic ID displayed

### 7. Verify in Database

```sql
-- Check the new test user
SELECT
  full_name,
  username,
  civic_id,
  email
FROM profiles
WHERE username = 'test_migration_001';
```

Expected:

- username: `test_migration_001`
- civic_id: `KE-2024-00000X` (next sequential number)
- email: your test email

## Troubleshooting

**Error: "column username already exists"**

- Migration has already been run
- Safe to ignore, migration is idempotent

**Error: "relation profiles does not exist"**

- Tables not created yet
- Run initial database setup first

**No civic IDs generated for existing users**

- Check DO block executed successfully
- Manually run the backfill section again

**Questions?**
Check the full migration file at:
`C:\Political Intelligence\supabase\migrations\add_civic_identification.sql`
