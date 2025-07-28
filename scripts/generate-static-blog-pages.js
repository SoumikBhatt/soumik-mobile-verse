// This script generates static HTML files for each blog post
// It should be run as part of the build process

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';

// Get the directory name using ES module pattern
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase client
const SUPABASE_URL = "https://mpzdruhkfxovfnigpdom.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wemRydWhrZnhvdmZuaWdwZG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMTUwNjUsImV4cCI6MjA2NDU5MTA2NX0.MCdSgJRlgiAVdeVegfiO2m9H9ImakvyoQXeEd4FNsxI";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Function to generate a static HTML file for a blog post
function generateStaticBlogPage(slug, title, description, imageUrl) {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Soumik - Mobile Developer</title>
  <meta name="description" content="${description}" />
  <meta name="author" content="Soumik Bhattacharjee" />

  <!-- Open Graph Tags -->
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://workofsoumik.com/blog/${slug}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="Soumik - Mobile Developer" />

  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${imageUrl}" />
  <meta name="twitter:creator" content="@soumikbhatta" />
  <meta name="twitter:site" content="@soumikbhatta" />

  <!-- Redirect script -->
  <script type="text/javascript">
    // Redirect to the actual app after a short delay
    setTimeout(function() {
      window.location.href = '/?/blog/${slug}';
    }, 100);
  </script>
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <p>If you are not redirected automatically, please <a href="/?/blog/${slug}">click here</a>.</p>
</body>
</html>`;

  return template;
}

// Function to generate sitemap.xml with blog posts
function generateSitemap(blogPosts) {
  console.log('Generating sitemap.xml with blog posts...');
  
  // Start with the basic sitemap structure
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages -->
  <url>
    <loc>https://workofsoumik.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://workofsoumik.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // Add each blog post to the sitemap
  for (const post of blogPosts) {
    const lastmod = post.updated_at || post.published_at || post.created_at;
    const formattedDate = lastmod ? new Date(lastmod).toISOString().split('T')[0] : '';
    
    sitemap += `  <url>
    <loc>https://workofsoumik.com/blog/${post.slug}</loc>
    ${formattedDate ? `<lastmod>${formattedDate}</lastmod>` : ''}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }
  
  // Close the sitemap
  sitemap += '</urlset>';
  
  return sitemap;
}

// This function fetches blog posts from Supabase and generates static HTML files for each one
async function generateStaticBlogPages() {
  console.log('Generating static blog pages...');
  
  try {
    // Fetch published blog posts from Supabase
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, content, featured_image_url, published_at, created_at, updated_at, author_name, tags')
      .eq('published', true)
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return;
    }
    
    if (!blogPosts || blogPosts.length === 0) {
      console.log('No published blog posts found.');
      return;
    }
    
    console.log(`Found ${blogPosts.length} published blog posts.`);
    
    // Create the blog directory if it doesn't exist
    const blogDir = path.resolve(__dirname, '../dist/blog');
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }
    
    // Generate a static HTML file for each blog post
    for (const post of blogPosts) {
      const description = post.excerpt || `Read "${post.title}" - A blog post by ${post.author_name || 'Soumik Bhattacharjee'}`;
      
      // Ensure image URLs are absolute for social media sharing
      const imageUrl = post.featured_image_url 
        ? (post.featured_image_url.startsWith('http') 
            ? post.featured_image_url 
            : `${post.featured_image_url}`)
        : 'https://workofsoumik.com/og-default.png';
      
      // Generate the static HTML
      const html = generateStaticBlogPage(
        post.slug,
        post.title,
        description,
        imageUrl
      );
      
      // Create the directory for this blog post
      const postDir = path.resolve(blogDir, post.slug);
      if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir, { recursive: true });
      }
      
      // Write the HTML file
      fs.writeFileSync(path.resolve(postDir, 'index.html'), html);
      
      console.log(`Generated static page for: ${post.slug}`);
    }
    
    // Generate and write the sitemap.xml file
    const sitemap = generateSitemap(blogPosts);
    fs.writeFileSync(path.resolve(__dirname, '../dist/sitemap.xml'), sitemap);
    console.log('Generated sitemap.xml with blog posts');
    
    console.log('Static blog pages generation completed successfully.');
  } catch (error) {
    console.error('Error generating static blog pages:', error);
  }
}

// Execute the function when this script is run directly
generateStaticBlogPages()
  .then(() => {
    console.log('Static blog page generation script completed.');
  })
  .catch(error => {
    console.error('Error in static blog page generation script:', error);
    process.exit(1);
  });

// Export the function for potential imports
export { generateStaticBlogPages };