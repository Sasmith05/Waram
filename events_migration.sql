-- SQL Migration to create Events Table and Storage Bucket in Supabase

-- 1. Create the events table
CREATE TABLE IF NOT EXISTS public.events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Disable Row Level Security (RLS) to allow immediate public access
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;

-- 3. Create the events storage bucket for uploading event images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('events', 'events', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Enable public CRUD operations for the events storage bucket
CREATE POLICY "Allow public CRUD on events bucket" ON storage.objects
    FOR ALL
    TO public
    USING (bucket_id = 'events')
    WITH CHECK (bucket_id = 'events');
