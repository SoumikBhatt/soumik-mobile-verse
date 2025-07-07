-- Create reactions table
CREATE TABLE public.blog_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'love', 'dislike')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(blog_post_id, user_email)
);

-- Create comments table
CREATE TABLE public.blog_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key constraints
ALTER TABLE public.blog_reactions 
ADD CONSTRAINT fk_blog_reactions_post 
FOREIGN KEY (blog_post_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE;

ALTER TABLE public.blog_comments 
ADD CONSTRAINT fk_blog_comments_post 
FOREIGN KEY (blog_post_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE;

-- Enable Row Level Security
ALTER TABLE public.blog_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for reactions
CREATE POLICY "Anyone can view reactions" 
ON public.blog_reactions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can add reactions" 
ON public.blog_reactions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own reactions" 
ON public.blog_reactions 
FOR UPDATE 
USING (true);

CREATE POLICY "Users can delete their own reactions" 
ON public.blog_reactions 
FOR DELETE 
USING (true);

-- Create policies for comments
CREATE POLICY "Anyone can view comments" 
ON public.blog_comments 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can add comments" 
ON public.blog_comments 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_blog_reactions_post_id ON public.blog_reactions(blog_post_id);
CREATE INDEX idx_blog_comments_post_id ON public.blog_comments(blog_post_id);
CREATE INDEX idx_blog_comments_created_at ON public.blog_comments(created_at DESC);