-- Temporarily disable RLS to fix the issue
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Check if RLS is disabled
SELECT 
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'profiles';
