import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlogReactionsProps {
  blogPostId: string;
}

interface Reaction {
  id: string;
  reaction_type: 'love';
  user_name: string | null;
  user_email: string | null;
}

const BlogReactions: React.FC<BlogReactionsProps> = ({ blogPostId }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reactions = [] } = useQuery({
    queryKey: ['blog-reactions', blogPostId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_reactions')
        .select('*')
        .eq('blog_post_id', blogPostId);

      if (error) throw error;
      return data as Reaction[];
    },
  });

  const addReactionMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('blog_reactions')
        .insert({
          blog_post_id: blogPostId,
          reaction_type: 'love',
          user_name: null,
          user_email: null,
        });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-reactions', blogPostId] });
      toast({ title: 'Love reaction added!' });
    },
    onError: () => {
      toast({ title: 'Failed to add reaction', variant: 'destructive' });
    },
  });

  const handleLoveClick = () => {
    addReactionMutation.mutate();
  };

  const loveCount = reactions.length;

  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Reactions</h3>
      
      <div className="flex gap-3 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleLoveClick}
          disabled={addReactionMutation.isPending}
          className="flex items-center gap-2"
        >
          <Heart className="w-4 h-4" />
          <span>Love</span>
          <span className="bg-muted px-2 py-1 rounded-full text-xs">
            {loveCount}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default BlogReactions;