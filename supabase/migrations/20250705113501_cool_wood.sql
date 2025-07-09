/*
  # Commercial Real Estate Schema

  1. New Tables
    - `commercial_properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (numeric)
      - `location` (text)
      - `area` (text)
      - `property_type` (text) - shop, office, warehouse, plaza
      - `status` (text) - available, leased, sold
      - `featured` (boolean)
      - `images` (text array)
      - `amenities` (text array)
      - `parking_spaces` (integer)
      - `floor_number` (integer)
      - `total_floors` (integer)
      - `year_built` (integer)
      - `lease_type` (text) - sale, rent, both
      - `contact_person` (text)
      - `contact_phone` (text)
      - `latitude` (numeric)
      - `longitude` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `commercial_properties` table
    - Add policies for public read access
    - Add policies for authenticated admin write access

  3. Storage
    - Create storage bucket for property images
*/

-- Create commercial properties table
CREATE TABLE IF NOT EXISTS commercial_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  location text NOT NULL,
  area text NOT NULL,
  property_type text NOT NULL CHECK (property_type IN ('shop', 'office', 'warehouse', 'plaza', 'retail', 'industrial')),
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'leased', 'sold', 'under_negotiation')),
  featured boolean DEFAULT false,
  images text[] DEFAULT '{}',
  amenities text[] DEFAULT '{}',
  parking_spaces integer DEFAULT 0,
  floor_number integer,
  total_floors integer,
  year_built integer,
  lease_type text NOT NULL DEFAULT 'both' CHECK (lease_type IN ('sale', 'rent', 'both')),
  contact_person text,
  contact_phone text,
  latitude numeric,
  longitude numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE commercial_properties ENABLE ROW LEVEL SECURITY;

-- Policies for commercial properties
CREATE POLICY "Anyone can view commercial properties"
  ON commercial_properties
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage commercial properties"
  ON commercial_properties
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Update existing leads table to be more suitable for commercial inquiries
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'property_id'
  ) THEN
    ALTER TABLE leads ADD COLUMN property_id uuid REFERENCES commercial_properties(id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'inquiry_type'
  ) THEN
    ALTER TABLE leads ADD COLUMN inquiry_type text DEFAULT 'general' CHECK (inquiry_type IN ('general', 'property_inquiry', 'viewing_request', 'lease_inquiry', 'purchase_inquiry'));
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'budget_range'
  ) THEN
    ALTER TABLE leads ADD COLUMN budget_range text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'preferred_location'
  ) THEN
    ALTER TABLE leads ADD COLUMN preferred_location text;
  END IF;
END $$;

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('commercial-property-images', 'commercial-property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view property images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'commercial-property-images');

CREATE POLICY "Authenticated users can upload property images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'commercial-property-images');

CREATE POLICY "Authenticated users can update property images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'commercial-property-images');

CREATE POLICY "Authenticated users can delete property images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'commercial-property-images');