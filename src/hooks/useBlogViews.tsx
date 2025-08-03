import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Generate a unique device identifier and store it in localStorage
const getDeviceIdentifier = (): string => {
  let deviceId = localStorage.getItem('blog_device_id');
  
  if (!deviceId) {
    // Create a unique identifier based on timestamp and random number
    deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('blog_device_id', deviceId);
  }
  
  return deviceId;
};

export const useBlogViews = (blogPostId: string) => {
  const [viewCount, setViewCount] = useState<number>(0);
  const [hasViewed, setHasViewed] = useState<boolean>(false);

  // Fetch current view count
  const fetchViewCount = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_blog_post_view_count', { post_id: blogPostId });
      
      if (error) {
        console.error('Error fetching view count:', error);
        return;
      }
      
      setViewCount(data || 0);
    } catch (error) {
      console.error('Error fetching view count:', error);
    }
  };

  // Check if this device has already viewed this post
  const checkIfViewed = async () => {
    try {
      const deviceId = getDeviceIdentifier();
      const { data, error } = await supabase
        .from('blog_views')
        .select('id')
        .eq('blog_post_id', blogPostId)
        .eq('device_identifier', deviceId)
        .maybeSingle();
      
      if (error) {
        console.error('Error checking view status:', error);
        return;
      }
      
      setHasViewed(!!data);
    } catch (error) {
      console.error('Error checking view status:', error);
    }
  };

  // Record a view for this device
  const recordView = async () => {
    try {
      const deviceId = getDeviceIdentifier();
      
      const { error } = await supabase
        .from('blog_views')
        .insert({
          blog_post_id: blogPostId,
          device_identifier: deviceId
        });
      
      if (error) {
        // If it's a unique constraint violation, that's fine - view already recorded
        if (!error.message.includes('duplicate key')) {
          console.error('Error recording view:', error);
        }
        return;
      }
      
      setHasViewed(true);
      // Refresh the view count
      fetchViewCount();
    } catch (error) {
      console.error('Error recording view:', error);
    }
  };

  useEffect(() => {
    if (!blogPostId) return;
    
    fetchViewCount();
    checkIfViewed();
  }, [blogPostId]);

  // Record view after component mounts and checks are complete
  useEffect(() => {
    if (!blogPostId || hasViewed) return;
    
    // Delay recording the view to ensure user actually views the content
    const timer = setTimeout(() => {
      recordView();
    }, 2000); // Record after 2 seconds

    return () => clearTimeout(timer);
  }, [blogPostId, hasViewed]);

  return {
    viewCount,
    hasViewed,
    recordView,
    fetchViewCount
  };
};

// Hook to get view counts for multiple blog posts
export const useBlogViewCounts = (blogPostIds: string[]) => {
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchViewCounts = async () => {
      if (blogPostIds.length === 0) return;
      
      try {
        const counts: Record<string, number> = {};
        
        // Fetch view counts for all posts
        await Promise.all(
          blogPostIds.map(async (postId) => {
            const { data, error } = await supabase
              .rpc('get_blog_post_view_count', { post_id: postId });
            
            if (!error) {
              counts[postId] = data || 0;
            }
          })
        );
        
        setViewCounts(counts);
      } catch (error) {
        console.error('Error fetching view counts:', error);
      }
    };

    fetchViewCounts();
  }, [blogPostIds.join(',')]);

  return viewCounts;
};