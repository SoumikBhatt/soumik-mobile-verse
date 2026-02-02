
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  appStoreLink?: string;
  playStoreLink?: string;
  githubLink?: string;
  liveDemoLink?: string;
}

const projects: ProjectProps[] = [
  {
    title: "PrimePay",
    description: "A comprehensive internet banking app built with Flutter. Features include Fund Transfer,Bills Pay, MFS, Vat Payment, Cheque Managemnt, Report Management, etc.",
    image: "/primepay.jpeg",
    technologies: ["Flutter", "Riverpod", "Clean Architecture", "REST API"],
    // playStoreLink: "#",
    // appStoreLink: "#",
    // githubLink: "#"
  },
  {
    title: "Sentra",
    description: "Push-to-talk app with Realtime voice communication, Voice interactive AI, One to One message, Group message, Voice call & Video call features. Built with native Android using Java.",
    image: "/sentra.webp",
    technologies: ["Android", "Java", "MVVM", "Room", "RxJava", "gRPC", "MQTT", "WebRTC"],
    playStoreLink: "https://play.google.com/store/apps/details?id=com.nybsys.sentra.sitex",
    // githubLink: "#"
  },
  {
    title: "Bdjobs",
    description: "Job Portal application with live interview, resume dashboard, my jobs, video resume, etc. Implemented using native Android using Kotlin with clean architecture.",
    image: "/bdjobs.png",
    technologies: ["Android", "Koltin", "MVVM", "Coroutine", "Google Maps API", "Firebase"],
    playStoreLink: "https://play.google.com/store/apps/details?id=com.bdjobs.app"
  },
  {
    title: "Patient Aid",
    description: "Health tech application with over 1M users built with native Android using Kotlin. Includes features like medicine directory, doctor directory, hospital directory, medicine taking alarm. Maintained offline first strategy.",
    image: "/patientAid.png",
    technologies: ["Android", "Kotlin", "SQLite", "Retrofit", "MVVM", "Work Manager"],
    playStoreLink: "https://play.google.com/store/apps/details?id=com.itmedicus.patientaid"
  },
  {
    title: "SMK TV",
    description: "SMK TV is a Flutter Web–based IPTV app that streams live TV channels using M3U playlists, offering category- and region-based browsing with a fast, PWA-ready experience.",
    image: "/smk-tv.png",
    technologies: ["Flutter", "Dart", "m3u8"],
    liveDemoLink: "/smk-tv"
  }
];

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  technologies,
  appStoreLink,
  playStoreLink,
  githubLink,
  liveDemoLink
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-fit object-center"
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
          {liveDemoLink && (
            <Button size="sm" variant="outline" asChild>
              {liveDemoLink.startsWith('/') ? (
                <Link to={liveDemoLink}>
                  Live Demo <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              ) : (
                <a href={liveDemoLink} target="_blank" rel="noopener noreferrer">
                  Live Demo <ArrowUpRight className="ml-1 h-3 w-3" />
                </a>
              )}
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
              liveDemoLink={project.liveDemoLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
