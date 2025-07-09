/*
  # User Saved Properties and Enhanced Leads

  1. New Tables
    - `user_saved_properties`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `property_id` (uuid, references commercial_properties)
      - `created_at` (timestamp)

  2. Updates to existing tables
    - Add `user_id` to leads table for tracking user inquiries

  3. Security
    - Enable RLS on new table
    - Add policies for user access
*/

-- Create user saved properties table
CREATE TABLE IF NOT EXISTS user_saved_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id uuid REFERENCES commercial_properties(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Add user_id to leads table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE leads ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE user_saved_properties ENABLE ROW LEVEL SECURITY;

-- Policies for user_saved_properties
CREATE POLICY "Users can view their own saved properties"
  ON user_saved_properties
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save properties"
  ON user_saved_properties
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their saved properties"
  ON user_saved_properties
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Update leads policies to include user access
DROP POLICY IF EXISTS "Admin can manage leads" ON leads;

CREATE POLICY "Users can view their own leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE email LIKE '%admin%'
  ));

CREATE POLICY "Users can create leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admin can manage all leads"
  ON leads
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email LIKE '%admin%'
  ));