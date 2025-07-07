import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface BlogEngagementStats {
  postId: string;
  reactionCount: number;
  commentCount: number;
}

export const useBlogEngagement = (blogPostIds: string[]) => {
  return useQuery({
    queryKey: ['blog-engagement', blogPostIds],
    queryFn: async () => {
      if (blogPostIds.length === 0) return [];

      // Get reaction counts
      const { data: reactions, error: reactionsError } = await supabase
        .from('blog_reactions')
        .select('blog_post_id')
        .in('blog_post_id', blogPostIds);

      if (reactionsError) throw reactionsError;

      // Get comment counts
      const { data: comments, error: commentsError } = await supabase
        .from('blog_comments')
        .select('blog_post_id')
        .in('blog_post_id', blogPostIds);

      if (commentsError) throw commentsError;

      // Count reactions and comments for each post
      const stats = blogPostIds.map(postId => {
        const reactionCount = reactions?.filter(r => r.blog_post_id === postId).length || 0;
        const commentCount = comments?.filter(c => c.blog_post_id === postId).length || 0;
        
        return {
          postId,
          reactionCount,
          commentCount,
        };
      });

      return stats as BlogEngagementStats[];
    },
    enabled: blogPostIds.length > 0,
  });
};