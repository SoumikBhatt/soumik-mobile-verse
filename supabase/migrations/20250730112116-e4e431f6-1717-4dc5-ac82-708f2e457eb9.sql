-- Create blog_views table to track unique device views
CREATE TABLE public.blog_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL,
  device_identifier TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(blog_post_id, device_identifier)
);

-- Enable Row Level Security
ALTER TABLE public.blog_views ENABLE ROW LEVEL SECURITY;

-- Create policies for blog views
CREATE POLICY "Anyone can view blog views" 
ON public.blog_views 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can add blog views" 
ON public.blog_views 
FOR INSERT 
WITH CHECK (true);

-- Create an index for better performance when counting views
CREATE INDEX idx_blog_views_post_id ON public.blog_views(blog_post_id);

-- Create a function to get view count for a blog post
CREATE OR REPLACE FUNCTION get_blog_post_view_count(post_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (
    SELECT COUNT(DISTINCT device_identifier)
    FROM public.blog_views 
    WHERE blog_post_id = post_id
  );
END;
$$;