-- Update reaction type constraint to only allow 'love'
ALTER TABLE public.blog_reactions 
DROP CONSTRAINT IF EXISTS blog_reactions_reaction_type_check;

ALTER TABLE public.blog_reactions 
ADD CONSTRAINT blog_reactions_reaction_type_check 
CHECK (reaction_type = 'love');

-- Update existing reactions to 'love' if they're not already
UPDATE public.blog_reactions 
SET reaction_type = 'love' 
WHERE reaction_type != 'love';

-- Update unique constraint to only consider blog_post_id since we're removing user identification
ALTER TABLE public.blog_reactions 
DROP CONSTRAINT IF EXISTS blog_reactions_blog_post_id_user_email_key;

-- Make user_name and user_email nullable since we're not using them
ALTER TABLE public.blog_reactions 
ALTER COLUMN user_name DROP NOT NULL,
ALTER COLUMN user_email DROP NOT NULL;