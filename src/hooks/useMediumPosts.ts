import { useQuery } from '@tanstack/react-query';
import { MediumService, MediumPost } from '@/services/mediumService';

export const useMediumPosts = (limit: number = 3) => {
  return useQuery<MediumPost[]>({
    queryKey: ['medium-posts', limit],
    queryFn: async () => {
      const posts = await MediumService.fetchPosts();
      return posts.slice(0, limit);
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    retry: 2,
  });
};