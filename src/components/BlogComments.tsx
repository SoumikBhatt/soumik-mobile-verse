import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlogCommentsProps {
  blogPostId: string;
}

interface Comment {
  id: string;
  user_name: string;
  user_email: string;
  comment_text: string;
  created_at: string;
}

const BlogComments: React.FC<BlogCommentsProps> = ({ blogPostId }) => {
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['blog-comments', blogPostId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_post_id', blogPostId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Comment[];
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async ({ comment, email, name }: { comment: string; email: string; name: string }) => {
      const { data, error } = await supabase
        .from('blog_comments')
        .insert({
          blog_post_id: blogPostId,
          user_email: email,
          user_name: name,
          comment_text: comment,
        });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-comments', blogPostId] });
      setNewComment('');
      setUserName('');
      setUserEmail('');
      setShowCommentForm(false);
      toast({ title: 'Comment added successfully!' });
    },
    onError: () => {
      toast({ title: 'Failed to add comment', variant: 'destructive' });
    },
  });

  const handleSubmitComment = () => {
    if (!newComment.trim() || !userName.trim() || !userEmail.trim()) return;
    
    addCommentMutation.mutate({
      comment: newComment.trim(),
      email: userEmail.trim(),
      name: userName.trim(),
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="border-t pt-6">
        <div className="text-center">Loading comments...</div>
      </div>
    );
  }

  return (
    <div className="border-t pt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">
          Comments ({comments.length})
        </h3>
        
        {!showCommentForm && (
          <Button onClick={() => setShowCommentForm(true)}>
            Add Comment
          </Button>
        )}
      </div>

      {/* Comment Form */}
      {showCommentForm && (
        <Card className="mb-6">
          <CardHeader>
            <h4 className="font-semibold">Add a Comment</h4>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="comment-name">Your Name</Label>
                <Input
                  id="comment-name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <Label htmlFor="comment-email">Your Email</Label>
                <Input
                  id="comment-email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="comment-text">Your Comment</Label>
              <Textarea
                id="comment-text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCommentForm(false);
                  setNewComment('');
                  setUserName('');
                  setUserEmail('');
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || !userName.trim() || !userEmail.trim() || addCommentMutation.isPending}
              >
                {addCommentMutation.isPending ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{comment.user_name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {formatDate(comment.created_at)}
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {comment.comment_text}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogComments;