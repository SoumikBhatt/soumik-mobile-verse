# Project Documentation

## Directory Structure

```
├── .github/            # GitHub workflows for deployment
├── public/             # Static assets and files
├── src/                # Source code
│   ├── components/     # React components
│   │   └── ui/         # UI components (shadcn/ui)
│   ├── hooks/          # Custom React hooks
│   ├── integrations/   # External service integrations
│   │   └── supabase/   # Supabase client and types
│   ├── lib/            # Utility libraries
│   ├── pages/          # Page components for routing
│   └── utils/          # Utility functions
├── supabase/           # Supabase configuration
│   ├── functions/      # Edge functions
│   └── migrations/     # Database migrations
└── tailwind.config.ts  # Tailwind CSS configuration
```

## Frameworks & Libraries

### Core
- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.1

### UI & Styling
- Tailwind CSS 3.4.11
- shadcn/ui (Radix UI components)
- Lucide React 0.462.0 (Icons)
- class-variance-authority 0.7.1
- tailwind-merge 2.5.2

### Routing & State Management
- React Router DOM 6.26.2
- TanStack React Query 5.56.2

### Form Handling
- React Hook Form 7.53.0
- Zod 3.23.8 (Schema validation)

### Backend Integration
- Supabase (PostgreSQL database and authentication)

### Other Utilities
- date-fns 3.6.0 (Date manipulation)
- next-themes 0.3.0 (Theme management)
- React Helmet Async 2.0.5 (Document head management)

## Database Schema

### blog_posts
```sql
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
```

### blog_comments
```sql
CREATE TABLE public.blog_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (blog_post_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE
);
```

### blog_reactions
```sql
CREATE TABLE public.blog_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL,
  user_name TEXT,
  user_email TEXT,
  reaction_type TEXT NOT NULL CHECK (reaction_type = 'love'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (blog_post_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE
);
```

## Key Files & Logic

### Application Structure
- `src/App.tsx`: Main application component with routing setup
- `src/main.tsx`: Application entry point

### Page Components
- `src/pages/Index.tsx`: Main portfolio page with sections
- `src/pages/Blog.tsx`: Blog listing page
- `src/pages/BlogPost.tsx`: Individual blog post page
- `src/pages/Admin.tsx`: Admin interface for blog management

### Core Components
- `src/components/Hero.tsx`: Hero section of the portfolio
- `src/components/About.tsx`: About section with developer information
- `src/components/Projects.tsx`: Projects showcase section
- `src/components/BlogSection.tsx`: Blog preview section on main page
- `src/components/Contact.tsx`: Contact form section

### Blog Functionality
- `src/components/BlogEditor.tsx`: Blog post creation/editing interface
- `src/components/BlogComments.tsx`: Comment system for blog posts
- `src/components/BlogReactions.tsx`: Reaction system for blog posts
- `src/hooks/useBlogEngagement.tsx`: Custom hook for blog engagement metrics

### Supabase Integration
- `src/integrations/supabase/client.ts`: Supabase client configuration
- `src/integrations/supabase/types.ts`: TypeScript types for database schema
- `supabase/migrations/`: SQL migrations for database setup

## Coding Standards

### TypeScript
- Uses TypeScript for type safety
- Interface-based typing for component props
- Type definitions for database schema

### React Best Practices
- Functional components with hooks
- Custom hooks for reusable logic
- Component composition pattern

### Styling
- Tailwind CSS for utility-first styling
- shadcn/ui component library with consistent design system
- CSS variables for theming (light/dark mode)

### Code Organization
- Feature-based organization (pages, components, hooks)
- Separation of UI components and business logic
- Reusable components in dedicated folders

### State Management
- React Query for server state management
- Local state with React hooks
- Context API for theme management