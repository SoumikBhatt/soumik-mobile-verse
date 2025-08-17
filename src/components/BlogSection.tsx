
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { useMediumPosts } from '@/hooks/useMediumPosts';
import { MediumService } from '@/services/mediumService';

const BlogSection: React.FC = () => {
  const { data: mediumPosts, isLoading } = useMediumPosts(3);

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
            <div className="text-lg">Loading Medium posts...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!mediumPosts || mediumPosts.length === 0) {
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
          {mediumPosts.map((post) => (
            <Card key={post.guid} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories?.slice(0, 2).map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
                
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="block">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-mobile-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </a>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.pubDate)}
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {MediumService.calculateReadTime(post.description)} min read
                  </div>
                </div>

                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    Read on Medium <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <a href="https://medium.com/@soumikcse07" target="_blank" rel="noopener noreferrer">
              View All Posts <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
