
-- Create a table for blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  author_name TEXT DEFAULT 'Soumik Bhattacharjee',
  tags TEXT[] DEFAULT '{}',
  read_time_minutes INTEGER DEFAULT 5
);

-- Create an index on the slug for faster lookups
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);

-- Create an index on published posts for faster queries
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published, published_at DESC);

-- Create an index on tags for filtering
CREATE INDEX idx_blog_posts_tags ON public.blog_posts USING GIN(tags);

-- Insert some sample blog posts
INSERT INTO public.blog_posts (title, slug, content, excerpt, published, published_at, tags, read_time_minutes) VALUES
(
  'Getting Started with Android Development',
  'getting-started-android-development',
  '# Getting Started with Android Development

Android development has evolved significantly over the years. In this post, I''ll share my journey and key insights for beginners.

## Setting Up Your Environment

First, you''ll need to install Android Studio, which is the official IDE for Android development...

## Kotlin vs Java

While Java was the traditional language for Android development, Kotlin has become the preferred choice...

## Best Practices

Here are some best practices I''ve learned over the years:

1. Follow Material Design guidelines
2. Use MVVM architecture pattern
3. Implement proper error handling
4. Write unit tests

## Conclusion

Android development is an exciting field with constant innovation. Start with the basics and gradually build your skills.',
  'Learn the fundamentals of Android development with this comprehensive guide covering setup, languages, and best practices.',
  true,
  now() - interval '7 days',
  ARRAY['Android', 'Mobile Development', 'Kotlin', 'Tutorial'],
  8
),
(
  'Flutter vs Native Development: When to Choose What',
  'flutter-vs-native-development',
  '# Flutter vs Native Development: When to Choose What

Choosing between Flutter and native development is a common dilemma. Let me break down the pros and cons of each approach.

## Flutter Advantages

- Single codebase for multiple platforms
- Fast development cycle
- Great performance for most use cases
- Growing ecosystem

## Native Development Advantages

- Maximum performance
- Full access to platform APIs
- Best user experience
- Platform-specific optimizations

## When to Choose Flutter

Flutter is ideal when:
- You need cross-platform consistency
- Time to market is crucial
- Team size is limited
- Budget constraints exist

## When to Choose Native

Native development is better when:
- Performance is critical
- You need advanced platform features
- Long-term maintenance is a priority

## Conclusion

Both approaches have their place. The key is understanding your project requirements and constraints.',
  'A detailed comparison between Flutter and native development to help you make the right choice for your project.',
  true,
  now() - interval '14 days',
  ARRAY['Flutter', 'Native Development', 'Mobile', 'Comparison'],
  6
),
(
  'Building Scalable Mobile Applications',
  'building-scalable-mobile-applications',
  '# Building Scalable Mobile Applications

Scalability is crucial for modern mobile applications. Here''s how to build apps that can grow with your user base.

## Architecture Patterns

The foundation of scalable apps lies in choosing the right architecture:

### MVVM (Model-View-ViewModel)
- Clear separation of concerns
- Testable code
- Data binding support

### Clean Architecture
- Independence from frameworks
- Testable business logic
- Flexible and maintainable

## Performance Optimization

Key strategies for optimal performance:

1. **Lazy Loading**: Load content as needed
2. **Image Optimization**: Use appropriate formats and sizes
3. **Caching**: Implement smart caching strategies
4. **Background Processing**: Handle heavy tasks efficiently

## Database Design

Choose the right database solution:
- SQLite for local storage
- Room for Android ORM
- Firebase for real-time features
- PostgreSQL for complex queries

## Conclusion

Building scalable mobile applications requires careful planning and the right technical choices from the start.',
  'Learn essential strategies and patterns for building mobile applications that can scale with your growing user base.',
  true,
  now() - interval '21 days',
  ARRAY['Mobile Development', 'Architecture', 'Performance', 'Scalability'],
  10
);
