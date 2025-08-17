export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
  guid: string;
  thumbnail?: string;
}

export class MediumService {
  private static readonly MEDIUM_USERNAME = 'soumikcse07';
  private static readonly RSS_URL = `https://medium.com/feed/@${this.MEDIUM_USERNAME}`;
  
  // Using a CORS proxy to fetch Medium RSS feed
  private static readonly CORS_PROXY = 'https://api.rss2json.com/v1/api.json?rss_url=';

  static async fetchPosts(): Promise<MediumPost[]> {
    try {
      const response = await fetch(`${this.CORS_PROXY}${encodeURIComponent(this.RSS_URL)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error('Failed to fetch Medium posts');
      }
      
      return data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: this.extractDescription(item.description),
        categories: item.categories || [],
        guid: item.guid,
        thumbnail: this.extractThumbnail(item.description),
      }));
    } catch (error) {
      console.error('Error fetching Medium posts:', error);
      throw error;
    }
  }

  private static extractDescription(htmlContent: string): string {
    // Remove HTML tags and get first 150 characters
    const textContent = htmlContent.replace(/<[^>]*>/g, '');
    return textContent.length > 150 
      ? textContent.substring(0, 150) + '...'
      : textContent;
  }

  private static extractThumbnail(htmlContent: string): string | undefined {
    // Extract first image from HTML content
    const imgMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : undefined;
  }

  static calculateReadTime(description: string): number {
    // Estimate read time based on word count (average 200 words per minute)
    const wordCount = description.split(' ').length;
    return Math.max(1, Math.ceil(wordCount / 200));
  }
}