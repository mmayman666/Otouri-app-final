-- Drop the existing column and recreate it as proper boolean
ALTER TABLE profiles DROP COLUMN IF EXISTS is_admin;
ALTER TABLE profiles ADD COLUMN is_admin BOOLEAN DEFAULT false;

-- Set Ahmed as admin (using proper boolean)
UPDATE profiles 
SET is_admin = true 
WHERE id = '12656179-51b4-4a82-8314-27292c822096';

-- Ensure all other users are not admin
UPDATE profiles 
SET is_admin = false 
WHERE id != '12656179-51b4-4a82-8314-27292c822096';
