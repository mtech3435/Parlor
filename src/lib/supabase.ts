import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface CommercialProperty {
  id: string;
  title: string;
  description?: string;
  price: number;
  location: string;
  area: string;
  property_type: 'shop' | 'office' | 'warehouse' | 'plaza' | 'retail' | 'industrial';
  status: 'available' | 'leased' | 'sold' | 'under_negotiation';
  featured: boolean;
  images: string[];
  amenities: string[];
  parking_spaces: number;
  floor_number?: number;
  total_floors?: number;
  year_built?: number;
  lease_type: 'sale' | 'rent' | 'both';
  contact_person?: string;
  contact_phone?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  property_id?: string;
  inquiry_type: 'general' | 'property_inquiry' | 'viewing_request' | 'lease_inquiry' | 'purchase_inquiry';
  budget_range?: string;
  preferred_location?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
}

// Property type options
export const PROPERTY_TYPES = [
  { value: 'shop', label: 'Shop' },
  { value: 'office', label: 'Office' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'plaza', label: 'Plaza' },
  { value: 'retail', label: 'Retail Space' },
  { value: 'industrial', label: 'Industrial' }
];

export const LEASE_TYPES = [
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
  { value: 'both', label: 'Sale or Rent' }
];

export const PROPERTY_STATUS = [
  { value: 'available', label: 'Available' },
  { value: 'leased', label: 'Leased' },
  { value: 'sold', label: 'Sold' },
  { value: 'under_negotiation', label: 'Under Negotiation' }
];