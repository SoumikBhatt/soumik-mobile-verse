-- Fix the security warning by setting proper search_path for the function
CREATE OR REPLACE FUNCTION get_blog_post_view_count(post_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (
    SELECT COUNT(DISTINCT device_identifier)
    FROM public.blog_views 
    WHERE blog_post_id = post_id
  );
END;
$$;