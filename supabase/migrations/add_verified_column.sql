-- Migration: Add is_verified column to profiles table
-- Purpose: Support administrative verification status for users

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

COMMENT ON COLUMN public.profiles.is_verified IS 'Whether the user has been verified by an administrator';
