import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Heart, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BlogReactionsProps {
  blogPostId: string;
}

interface Reaction {
  id: string;
  reaction_type: 'like' | 'love' | 'dislike';
  user_name: string;
  user_email: string;
}

const BlogReactions: React.FC<BlogReactionsProps> = ({ blogPostId }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
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
    mutationFn: async ({ reactionType, email, name }: { reactionType: string; email: string; name: string }) => {
      const { data, error } = await supabase
        .from('blog_reactions')
        .upsert({
          blog_post_id: blogPostId,
          user_email: email,
          user_name: name,
          reaction_type: reactionType,
        });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-reactions', blogPostId] });
      setIsDialogOpen(false);
      setUserEmail('');
      setUserName('');
      toast({ title: 'Reaction added successfully!' });
    },
    onError: () => {
      toast({ title: 'Failed to add reaction', variant: 'destructive' });
    },
  });

  const handleReactionClick = (reactionType: string) => {
    setSelectedReaction(reactionType);
    setIsDialogOpen(true);
  };

  const handleSubmitReaction = () => {
    if (!selectedReaction || !userEmail || !userName) return;
    addReactionMutation.mutate({
      reactionType: selectedReaction,
      email: userEmail,
      name: userName,
    });
  };

  const getReactionCount = (type: string) => {
    return reactions.filter(r => r.reaction_type === type).length;
  };

  const getReactionIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <ThumbsUp className="w-4 h-4" />;
      case 'love':
        return <Heart className="w-4 h-4" />;
      case 'dislike':
        return <ThumbsDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Reactions</h3>
      
      <div className="flex gap-3 mb-4">
        {['like', 'love', 'dislike'].map((type) => (
          <Button
            key={type}
            variant="outline"
            size="sm"
            onClick={() => handleReactionClick(type)}
            className="flex items-center gap-2"
          >
            {getReactionIcon(type)}
            <span className="capitalize">{type}</span>
            <span className="bg-muted px-2 py-1 rounded-full text-xs">
              {getReactionCount(type)}
            </span>
          </Button>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Your Reaction</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitReaction}
                disabled={!userName || !userEmail || addReactionMutation.isPending}
              >
                {addReactionMutation.isPending ? 'Adding...' : `Add ${selectedReaction}`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogReactions;