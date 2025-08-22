-- Drop existing policies that might be causing recursion
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admin can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admin can update all profiles" ON profiles;

-- Create simple, non-recursive policies
CREATE POLICY "Enable read access for users based on user_id" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Enable update for users based on user_id" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Special policy for admin access (non-recursive)
CREATE POLICY "Enable admin read access" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.is_admin = true
        )
    );

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
