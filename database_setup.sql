-- Unified Supabase Database Setup Script
-- Paste this script into your Supabase Dashboard SQL Editor to initialize all tables and storage buckets.

-- ==========================================
-- 1. Create the 'events' Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable Row Level Security (RLS) for immediate public access
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;

-- ==========================================
-- 2. Create the 'properties' Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.properties (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    title_en TEXT,
    title_ta TEXT,
    property_type TEXT NOT NULL,
    location TEXT,
    area TEXT NOT NULL,
    price NUMERIC NOT NULL,
    price_display TEXT,
    description TEXT NOT NULL,
    description_en TEXT,
    description_ta TEXT,
    detailed_description TEXT NOT NULL,
    map_url TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'for_sale',
    survey_number TEXT,
    patta_status TEXT,
    road_access TEXT,
    water_availability TEXT,
    electricity_availability TEXT,
    features TEXT[] DEFAULT '{}',
    nearby_facilities JSONB DEFAULT '[]',
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable Row Level Security (RLS) for immediate public access
ALTER TABLE public.properties DISABLE ROW LEVEL SECURITY;

-- ==========================================
-- 3. Create the 'enquiries' Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.enquiries (
    id TEXT PRIMARY KEY,
    property_id TEXT REFERENCES public.properties(id) ON DELETE SET NULL,
    property_title TEXT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable Row Level Security (RLS) for immediate public access
ALTER TABLE public.enquiries DISABLE ROW LEVEL SECURITY;


-- ==========================================
-- 4. Create Storage Buckets
-- ==========================================

-- Create the 'events' storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('events', 'events', true)
ON CONFLICT (id) DO NOTHING;

-- Create the 'properties' storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('properties', 'properties', true)
ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- 5. Enable Storage Security Policies
-- ==========================================

-- Allow public CRUD operations on the 'events' storage bucket
CREATE POLICY "Allow public CRUD on events bucket" ON storage.objects
    FOR ALL
    TO public
    USING (bucket_id = 'events')
    WITH CHECK (bucket_id = 'events');

-- Allow public CRUD operations on the 'properties' storage bucket
CREATE POLICY "Allow public CRUD on properties bucket" ON storage.objects
    FOR ALL
    TO public
    USING (bucket_id = 'properties')
    WITH CHECK (bucket_id = 'properties');
