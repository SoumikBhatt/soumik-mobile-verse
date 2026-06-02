import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { useMediumPosts } from '@/hooks/useMediumPosts';
import { MediumService } from '@/services/mediumService';

// Category SVGs
const KotlinLogo = () => (
  <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 24H0V0h24L12 12z" />
  </svg>
);

const FlutterLogo = () => (
  <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.3 0L5.5 8.8 14.3 17.6h7.5L13 8.8l8.8-8.8h-7.5zM21.8 17.6H14.3l-3.3 3.3 3.3 3.1h7.5L16.4 21l5.4-3.4z" />
  </svg>
);

const AndroidLogo = () => (
  <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 13c-.8 0-1.5-.7-1.5-1.5S16.7 10 17.5 10s1.5.7 1.5 1.5-.7 1.5-1.5 1.5m-11 0c-.8 0-1.5-.7-1.5-1.5S5.7 10 6.5 10s1.5.7 1.5 1.5-.7 1.5-1.5 1.5m11.3-4.9l1.7-2.9c.1-.2 0-.5-.2-.6-.2-.1-.5 0-.6.2l-1.8 3C15.6 7.3 13.9 7 12 7s-3.6.3-5.1.8L5.1 4.8c-.1-.2-.4-.3-.6-.2-.2.1-.3.4-.2.6l1.7 2.9C3.6 9.3 2 11.5 2 14h20c0-2.5-1.6-4.7-4.2-5.9M12 18H2v2c0 .6.4 1 1 1h6v-3m10 0h-6v3h6c.6 0 1-.4 1-1v-2" />
  </svg>
);

const DefaultLogo = () => (
  <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);

const BlogSection: React.FC = () => {
  const { data: mediumPosts, isLoading } = useMediumPosts(3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getHeaderTheme = (title: string, categories: string[] = []) => {
    const text = (title + ' ' + categories.join(' ')).toLowerCase();
    
    if (text.includes('kotlin') || text.includes('kmp') || text.includes('multiplatform')) {
      return {
        bg: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
        logo: <KotlinLogo />
      };
    }
    if (text.includes('flutter') || text.includes('dart')) {
      return {
        bg: 'bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600',
        logo: <FlutterLogo />
      };
    }
    if (text.includes('android')) {
      return {
        bg: 'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600',
        logo: <AndroidLogo />
      };
    }
    return {
      bg: 'bg-gradient-to-br from-slate-700 via-neutral-800 to-zinc-900',
      logo: <DefaultLogo />
    };
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 rounded-full border-4 border-mobile-primary border-t-transparent animate-spin mx-auto"></div>
            <div className="text-muted-foreground text-sm font-semibold">Retrieving articles from Medium...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!mediumPosts || mediumPosts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-24 bg-card/10 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-mobile-secondary/3 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Latest Articles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed">
            Insights, tutorials, and thoughts on mobile development, architectures, and technology.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {mediumPosts.map((post) => {
            const headerTheme = getHeaderTheme(post.title, post.categories);
            return (
              <Card 
                key={post.guid} 
                className="group border border-border/40 bg-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-3xl flex flex-col justify-between h-full"
              >
                <div>
                  {/* Colored Header Block */}
                  <div className={`h-40 ${headerTheme.bg} flex items-center justify-center relative`}>
                    <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
                    <div className="transform group-hover:scale-110 transition-transform duration-500 ease-out z-10 shadow-lg p-3 rounded-2xl bg-black/10 backdrop-blur-sm border border-white/10">
                      {headerTheme.logo}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Categories Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.categories?.slice(0, 2).map((category) => (
                        <Badge 
                          key={category} 
                          variant="secondary" 
                          className="bg-foreground/5 hover:bg-foreground/10 text-[10px] font-semibold text-muted-foreground rounded-full px-2.5 py-0.5"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Post Title */}
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="block">
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-mobile-primary transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h3>
                    </a>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground leading-relaxed font-normal line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </div>
                
                {/* Meta details and footer button */}
                <div className="p-6 pt-0 space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold pb-4 border-b border-border/30">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-mobile-primary" />
                      {formatDate(post.pubDate)}
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-mobile-primary" />
                      {MediumService.calculateReadTime(post.description)} min read
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    asChild 
                    className="w-full justify-between hover:bg-mobile-primary hover:text-black font-bold group-hover:bg-mobile-primary/10 group-hover:text-mobile-primary rounded-xl h-9"
                  >
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      Read on Medium 
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button 
            asChild 
            className="bg-foreground text-background dark:bg-foreground dark:text-background hover:bg-foreground/90 font-bold transition-all duration-300 rounded-full px-8 py-5 h-auto text-sm shadow-md"
          >
            <a href="https://medium.com/@soumikcse07" target="_blank" rel="noopener noreferrer">
              View All Articles <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
