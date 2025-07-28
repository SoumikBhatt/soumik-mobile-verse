// This script helps social media crawlers to properly render the page
// It detects if the request is from a bot and serves pre-rendered content

(function() {
  // List of known crawler user agents
  const crawlerUserAgents = [
    'facebookexternalhit',
    'LinkedInBot',
    'Twitterbot',
    'WhatsApp',
    'Slackbot',
    'TelegramBot',
    'Pinterest',
    'Discordbot'
  ];

  // Check if the current user agent is a crawler
  function isCrawler() {
    const userAgent = navigator.userAgent.toLowerCase();
    return crawlerUserAgents.some(crawler => userAgent.includes(crawler.toLowerCase()));
  }

  // If this is a crawler and we're on a blog post page
  if (isCrawler() && window.location.pathname.includes('/blog/')) {
    // Extract the slug from the URL
    const slug = window.location.pathname.split('/blog/')[1];
    
    // If we have a slug, we can try to fetch the blog post data directly
    if (slug) {
      // This would ideally be replaced with a server-side rendering solution
      // For now, we'll just ensure the meta tags are properly set
      document.title = `Blog Post: ${slug} | Soumik - Mobile Developer`;
    }
  }
})();