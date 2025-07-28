import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';
import { Plugin } from 'vite';

// Custom plugin for social media crawler optimization
const socialMediaOptimizationPlugin = (): Plugin => {
  return {
    name: 'social-media-optimization',
    closeBundle() {
      // Copy blog-static.html to dist/blog directory
      const distDir = path.resolve(__dirname, 'dist');
      const blogDir = path.resolve(distDir, 'blog');
      
      // Create blog directory if it doesn't exist
      if (!fs.existsSync(blogDir)) {
        fs.mkdirSync(blogDir, { recursive: true });
      }
      
      // Copy the static HTML file to the blog directory
      const staticHtmlPath = path.resolve(__dirname, 'public/blog-static.html');
      if (fs.existsSync(staticHtmlPath)) {
        const content = fs.readFileSync(staticHtmlPath, 'utf-8');
        fs.writeFileSync(path.resolve(blogDir, 'index.html'), content);
      }
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    socialMediaOptimizationPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}));