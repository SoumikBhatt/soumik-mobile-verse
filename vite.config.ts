import { defineConfig, loadEnv } from "vite";
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

// Custom plugin to replace Hugging Face token placeholder in development and production build
const huggingFaceTokenPlugin = (mode: string): Plugin => {
  return {
    name: 'hugging-face-token-replacement',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.includes('main.dart.js')) {
          const filePath = path.resolve(__dirname, 'public/notification-console/main.dart.js');
          if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf-8');
            const env = loadEnv(mode, process.cwd(), '');
            const token = env.VITE_HUGGING_FACE_TOKEN || process.env.VITE_HUGGING_FACE_TOKEN || '';
            content = content.replace(/__HUGGINGFACE_TOKEN__/g, token);
            res.setHeader('Content-Type', 'application/javascript');
            res.end(content);
            return;
          }
        }
        next();
      });
    },
    closeBundle() {
      const distPath = path.resolve(__dirname, 'dist/notification-console/main.dart.js');
      if (fs.existsSync(distPath)) {
        let content = fs.readFileSync(distPath, 'utf-8');
        const token = process.env.VITE_HUGGING_FACE_TOKEN || '';
        content = content.replace(/__HUGGINGFACE_TOKEN__/g, token);
        fs.writeFileSync(distPath, content, 'utf-8');
        console.log('Replaced Hugging Face token placeholder in dist/notification-console/main.dart.js');
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
    huggingFaceTokenPlugin(mode),
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