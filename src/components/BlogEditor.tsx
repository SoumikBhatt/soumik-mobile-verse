import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { parseMarkdownContent } from '@/utils/markdownParser';
import { ArrowLeft, Save, Send, X } from 'lucide-react';

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  tags: z.string().optional(),
  read_time_minutes: z.number().min(1).optional(),
});

type BlogPostForm = z.infer<typeof blogPostSchema>;

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  published: boolean;
  tags: string[] | null;
  read_time_minutes: number | null;
}

interface BlogEditorProps {
  post?: BlogPost | null;
  onClose: () => void;
}

const BlogEditor = ({ post, onClose }: BlogEditorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');
  const { toast } = useToast();

  const form = useForm<BlogPostForm>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      tags: '',
      read_time_minutes: 5,
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content,
        tags: post.tags?.join(', ') || '',
        read_time_minutes: post.read_time_minutes || 5,
      });
    }
  }, [post, form]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    form.setValue('title', value);
    if (!post) {
      form.setValue('slug', generateSlug(value));
    }
  };

  const parseTags = (tagsString: string): string[] => {
    return tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  };

  const saveDraft = async (data: BlogPostForm) => {
    setIsLoading(true);
    try {
      const payload = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        tags: data.tags ? parseTags(data.tags) : null,
        read_time_minutes: data.read_time_minutes || null,
        published: false,
        published_at: null,
      };

      if (post) {
        const { error } = await supabase
          .from('blog_posts')
          .update(payload)
          .eq('id', post.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([payload]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: post ? "Draft updated successfully" : "Draft saved successfully",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save draft",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const publishPost = async (data: BlogPostForm) => {
    setIsLoading(true);
    try {
      const payload = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        tags: data.tags ? parseTags(data.tags) : null,
        read_time_minutes: data.read_time_minutes || null,
        published: true,
        published_at: new Date().toISOString(),
      };

      if (post) {
        const { error } = await supabase
          .from('blog_posts')
          .update(payload)
          .eq('id', post.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([payload]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Blog post published successfully",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish post",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const watchedContent = form.watch('content');
  const watchedTags = form.watch('tags');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {post ? 'Edit Post' : 'Create New Post'}
            </h1>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={form.handleSubmit(saveDraft)}
              disabled={isLoading}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button 
              onClick={form.handleSubmit(publishPost)}
              disabled={isLoading}
            >
              <Send className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Title
                  </label>
                  <Input
                    value={form.watch('title')}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title"
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Slug (URL)
                  </label>
                  <Input 
                    value={form.watch('slug')}
                    onChange={(e) => form.setValue('slug', e.target.value)}
                    placeholder="post-url-slug"
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Excerpt (Optional)
                  </label>
                  <Textarea 
                    value={form.watch('excerpt')}
                    onChange={(e) => form.setValue('excerpt', e.target.value)}
                    placeholder="Brief description of the post..."
                    rows={3}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Tags (Optional)
                  </label>
                  <Input 
                    value={form.watch('tags')}
                    onChange={(e) => form.setValue('tags', e.target.value)}
                    placeholder="react, javascript, tutorial"
                    className="mt-2"
                  />
                  {watchedTags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {parseTags(watchedTags).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Read Time (minutes)
                  </label>
                  <Input 
                    value={form.watch('read_time_minutes')}
                    onChange={(e) => form.setValue('read_time_minutes', parseInt(e.target.value) || 1)}
                    type="number" 
                    min="1"
                    placeholder="5"
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit" className="mt-4">
                  <Textarea
                    value={form.watch('content')}
                    onChange={(e) => form.setValue('content', e.target.value)}
                    placeholder="Write your blog post content here... Use markdown formatting:

# Heading 1
## Heading 2  
### Heading 3

**Bold text**
`inline code`

- Bullet point
- Another point"
                    rows={20}
                    className="font-mono text-sm"
                  />
                </TabsContent>
                
                <TabsContent value="preview" className="mt-4">
                  <div className="border border-input rounded-md p-4 min-h-[500px] max-h-[500px] overflow-y-auto bg-background">
                    {watchedContent ? (
                      <div 
                        className="prose prose-gray dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: parseMarkdownContent(watchedContent) 
                        }}
                      />
                    ) : (
                      <p className="text-muted-foreground">
                        Start writing to see the preview...
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;