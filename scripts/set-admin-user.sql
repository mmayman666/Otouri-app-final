-- Set a user as admin (replace the ID with your preferred admin user ID)
UPDATE profiles 
SET is_admin = true 
WHERE id = '12656179-51b4-4a82-8314-27292c822096';

-- Verify the admin user
SELECT id, full_name, is_admin 
FROM profiles 
WHERE is_admin = true;
