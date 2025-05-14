
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Github } from 'lucide-react';

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  appStoreLink?: string;
  playStoreLink?: string;
  githubLink?: string;
}

const projects: ProjectProps[] = [
  {
    title: "Fitness Tracker Pro",
    description: "A comprehensive fitness tracking app built with Flutter. Features include workout plans, progress tracking, and social sharing capabilities.",
    image: "/placeholder.svg",
    technologies: ["Flutter", "Firebase", "Provider", "REST API"],
    playStoreLink: "#",
    appStoreLink: "#",
    githubLink: "#"
  },
  {
    title: "Quick Notes",
    description: "Minimalist note-taking app with cloud sync, markdown support, and collaborative editing features. Built with native Android using Kotlin.",
    image: "/placeholder.svg",
    technologies: ["Kotlin", "MVVM", "Room", "Coroutines"],
    playStoreLink: "#",
    githubLink: "#"
  },
  {
    title: "Urban Navigator",
    description: "Public transportation app with real-time updates, route planning, and offline maps. Implemented using Flutter with clean architecture.",
    image: "/placeholder.svg",
    technologies: ["Flutter", "BLoC", "Google Maps API", "Firebase"],
    playStoreLink: "#",
    appStoreLink: "#"
  },
  {
    title: "Meal Planner",
    description: "Recipe and meal planning app with shopping list generation, dietary preferences, and nutrition tracking.",
    image: "/placeholder.svg",
    technologies: ["Java", "Android SDK", "SQLite", "Retrofit"],
    playStoreLink: "#"
  }
];

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  technologies,
  appStoreLink,
  playStoreLink,
  githubLink
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center" 
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="outline">{tech}</Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {playStoreLink && (
            <Button size="sm" variant="outline" asChild>
              <a href={playStoreLink} target="_blank" rel="noopener noreferrer">
                Play Store <ArrowUpRight className="ml-1 h-3 w-3" />
              </a>
            </Button>
          )}
          {appStoreLink && (
            <Button size="sm" variant="outline" asChild>
              <a href={appStoreLink} target="_blank" rel="noopener noreferrer">
                App Store <ArrowUpRight className="ml-1 h-3 w-3" />
              </a>
            </Button>
          )}
          {githubLink && (
            <Button size="sm" variant="outline" asChild>
              <a href={githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1 h-3 w-3" /> Code
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">My Projects</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            A showcase of my mobile application development work, featuring Android and Flutter projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              appStoreLink={project.appStoreLink}
              playStoreLink={project.playStoreLink}
              githubLink={project.githubLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
