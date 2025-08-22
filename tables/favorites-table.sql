-- Create user_favorites table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  perfume_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_created_at ON user_favorites(created_at DESC);

-- Create GIN index for JSONB data (this allows efficient queries on any JSONB field)
CREATE INDEX IF NOT EXISTS idx_user_favorites_perfume_data ON user_favorites USING GIN (perfume_data);

-- Create specific index for perfume name searches (using text pattern ops)
CREATE INDEX IF NOT EXISTS idx_user_favorites_perfume_name ON user_favorites USING BTREE ((perfume_data->>'name'));

-- Create specific index for perfume brand searches
CREATE INDEX IF NOT EXISTS idx_user_favorites_perfume_brand ON user_favorites USING BTREE ((perfume_data->>'brand'));

-- Set up RLS policies
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own favorites" ON user_favorites;
DROP POLICY IF EXISTS "Users can insert their own favorites" ON user_favorites;
DROP POLICY IF EXISTS "Users can update their own favorites" ON user_favorites;
DROP POLICY IF EXISTS "Users can delete their own favorites" ON user_favorites;

-- Create policy to allow users to view their own favorites
CREATE POLICY "Users can view their own favorites"
ON user_favorites
FOR SELECT
USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own favorites
CREATE POLICY "Users can insert their own favorites"
ON user_favorites
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own favorites
CREATE POLICY "Users can update their own favorites"
ON user_favorites
FOR UPDATE
USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own favorites
CREATE POLICY "Users can delete their own favorites"
ON user_favorites
FOR DELETE
USING (auth.uid() = user_id);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_user_favorites_updated_at ON user_favorites;

-- Create the trigger
CREATE TRIGGER update_user_favorites_updated_at
BEFORE UPDATE ON user_favorites
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
