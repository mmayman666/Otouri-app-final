-- Create image_search_history table if it doesn't exist
CREATE TABLE IF NOT EXISTS image_search_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  analysis_results JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_image_search_history_user_id ON image_search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_image_search_history_created_at ON image_search_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_image_search_history_results ON image_search_history USING GIN (analysis_results);

-- Set up RLS policies
ALTER TABLE image_search_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own search history" ON image_search_history;
DROP POLICY IF EXISTS "Users can insert their own search history" ON image_search_history;
DROP POLICY IF EXISTS "Users can update their own search history" ON image_search_history;
DROP POLICY IF EXISTS "Users can delete their own search history" ON image_search_history;

-- Create policy to allow users to view their own search history
CREATE POLICY "Users can view their own search history"
ON image_search_history
FOR SELECT
USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own search history
CREATE POLICY "Users can insert their own search history"
ON image_search_history
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own search history
CREATE POLICY "Users can update their own search history"
ON image_search_history
FOR UPDATE
USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own search history
CREATE POLICY "Users can delete their own search history"
ON image_search_history
FOR DELETE
USING (auth.uid() = user_id);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_image_search_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Check if the trigger already exists before creating it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_image_search_history_updated_at'
  ) THEN
    CREATE TRIGGER update_image_search_history_updated_at
    BEFORE UPDATE ON image_search_history
    FOR EACH ROW
    EXECUTE FUNCTION update_image_search_updated_at_column();
  END IF;
END
$$;
