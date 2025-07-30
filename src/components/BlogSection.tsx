
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, Heart, MessageCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogEngagement } from '@/hooks/useBlogEngagement';
import { useBlogViewCounts } from '@/hooks/useBlogViews';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  tags: string[] | null;
  read_time_minutes: number | null;
}

const BlogSection: React.FC = () => {
  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['recent-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, published_at, tags, read_time_minutes')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const blogPostIds = blogPosts?.map(post => post.id) || [];
  const { data: engagementStats } = useBlogEngagement(blogPostIds);
  const viewCounts = useBlogViewCounts(blogPostIds);

  const getEngagementStats = (postId: string) => {
    return engagementStats?.find(stat => stat.postId === postId) || { reactionCount: 0, commentCount: 0 };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-lg">Loading blog posts...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!blogPosts || blogPosts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Latest Blog Posts</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Insights, tutorials, and thoughts on mobile development and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags?.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-mobile-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.published_at)}
                  </div>
                  
                  {post.read_time_minutes && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.read_time_minutes} min read
                    </div>
                  )}
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {viewCounts[post.id] || 0}
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {getEngagementStats(post.id).reactionCount}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {getEngagementStats(post.id).commentCount}
                  </div>
                </div>

                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/blog">
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
