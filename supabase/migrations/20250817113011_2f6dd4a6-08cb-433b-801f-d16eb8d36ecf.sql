-- Fix security vulnerability: Restrict contact submissions read access
-- Drop the overly permissive SELECT policy that allows anyone to read contact submissions
DROP POLICY IF EXISTS "Allow viewing contact submissions" ON public.contact_submissions;

-- Create a new restrictive policy that only allows authenticated users to view contact submissions
-- This prevents public access to sensitive customer contact information
CREATE POLICY "Authenticated users can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (true);

-- Keep the existing INSERT policy for public contact form submissions
-- (This remains unchanged to preserve contact form functionality)