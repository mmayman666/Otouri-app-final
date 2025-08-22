INSERT INTO "public"."profiles" ("id", "full_name", "avatar_url", "created_at", "updated_at", "role") VALUES 
('12656179-51b4-4a82-8314-27292c822096', 'Ahmed', null, '2025-05-24 21:53:43.025895+00', '2025-05-24 21:53:43.025895+00', 'admin'), 
('3afa1803-fe12-45f8-8b2a-cfeeeed9d23d', 'issac.kreiger@gmxxail.com', null, '2025-05-28 01:46:13.813024+00', '2025-05-28 01:46:13.813024+00', 'user'), 
('5e1c629f-d376-4e82-9658-39a6b0c85054', 'Norah', null, '2025-05-25 16:25:32.22673+00', '2025-05-25 16:25:32.22673+00', 'user'), 
('a16a380b-0fe5-4b1f-9764-10898274b493', 'Abdullah Alfouzan', null, '2025-05-25 20:40:20.133827+00', '2025-05-25 20:40:20.133827+00', 'user'), 
('e984434f-256c-4f75-8476-4a0efc1975ad', 'باسل ', null, '2025-05-25 04:47:59.302955+00', '2025-05-25 04:47:59.302955+00', 'user')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  avatar_url = EXCLUDED.avatar_url,
  role = EXCLUDED.role,
  updated_at = EXCLUDED.updated_at;
