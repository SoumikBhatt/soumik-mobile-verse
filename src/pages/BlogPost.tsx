import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogReactions from '@/components/BlogReactions';
import BlogComments from '@/components/BlogComments';
import { parseMarkdownContent } from '@/utils/markdownParser';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  featured_image_url: string | null;
  published_at: string;
  author_name: string | null;
  tags: string[] | null;
  read_time_minutes: number | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: blogPost, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Blog post not found');
      return data as BlogPost;
    },
    enabled: !!slug,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg">Loading blog post...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      
      <article className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="outline" asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Featured Image */}
          {blogPost.featured_image_url && (
            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img
                src={blogPost.featured_image_url}
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Tags */}
          {blogPost.tags && blogPost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {blogPost.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-12 pb-6 border-b">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {blogPost.author_name || 'Soumik Bhattacharjee'}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(blogPost.published_at)}
            </div>
            {blogPost.read_time_minutes && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {blogPost.read_time_minutes} min read
              </div>
            )}
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: parseMarkdownContent(blogPost.content) }}
          />

          {/* Reactions */}
          <BlogReactions blogPostId={blogPost.id} />

          {/* Comments */}
          <BlogComments blogPostId={blogPost.id} />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
