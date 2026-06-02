import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  technologies: string[];
  bottomText: string;
  appStoreLink?: string;
  playStoreLink?: string;
  githubLink?: string;
  liveDemoLink?: string;
}

const projects: ProjectProps[] = [
  {
    title: "Bhakti365",
    subtitle: "Hindu Lifestyle",
    description: "Bhakti365 is a comprehensive Hindu devotional app providing daily Panchanga, festival details, shlokas, and spiritual tools.",
    image: "/projects/bhakti365.png",
    technologies: ["KMP", "CMP", "Kotlin"],
    bottomText: "5★ Rating",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.workofsoumik.bhakti365"
  },
  {
    title: "SMK TV",
    subtitle: "IPTV Streaming Platform",
    description: "SMK TV is a Flutter Web–based IPTV app that streams live TV channels using M3U playlists with fast, PWA-ready experience.",
    image: "/projects/smk-tv.png",
    technologies: ["Flutter", "Dart"],
    bottomText: "PWA Support • Low Latency HLS",
    liveDemoLink: "/smk-tv"
  },
  {
    title: "PrimePay",
    subtitle: "Next-Gen Internet Banking",
    description: "A comprehensive internet banking app built with Flutter. Features include Fund Transfer, Bills Pay, MFS, and Cheque Management.",
    image: "/projects/primepay.jpeg",
    technologies: ["Flutter", "Dart"],
    bottomText: "Fintech"
  },
  {
    title: "Sentra PTT",
    subtitle: "Push-To-Talk VoIP Platform",
    description: "Push-to-talk app with Realtime voice, Voice AI, Group message, and high-fidelity video call features using Native Android.",
    image: "/projects/sentra.webp",
    technologies: ["Android", "Java", "Kotlin"],
    bottomText: "Communication",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.nybsys.sentra.sitex"
  },
  {
    title: "Bdjobs",
    subtitle: "Largest Job Portal App",
    description: "Job Portal application featuring live video interviews, resume dashboard, my jobs, and video resume support in Kotlin.",
    image: "/projects/bdjobs.png",
    technologies: ["Android", "Kotlin"],
    bottomText: "1M+ Users • Job Portal",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.bdjobs.app"
  },
  {
    title: "Patient Aid",
    subtitle: "Offline-First Health Tech",
    description: "Health tech application with 1M+ users featuring offline medicine directory, doctor finder, and alerts.",
    image: "/patientAid.png",
    technologies: ["Android", "Kotlin"],
    bottomText: "1M+ Downloads • Medicine Directory",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.itmedicus.patientaid"
  }
];

const renderProjectSplash = (title: string, logo: string) => {
  switch (title) {
    case "Bhakti365":
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 flex flex-col items-center justify-center text-white relative p-4">
          {/* <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shadow-md animate-pulse"> */}
          <img src="/projects/bhakti365.png" alt="Bdjobs" className="w-10 h-10 object-contain rounded-md" />
          {/* </div> */}
          <span className="text-[11px] font-black tracking-widest uppercase mt-4">Bhakti365</span>
        </div>
      );
    case "SMK TV":
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-[#1A1F2C] to-indigo-950 flex flex-col items-center justify-center text-white relative p-4">
          {/* <div className="w-14 h-14 rounded-2xl bg-mobile-primary flex items-center justify-center border border-white/10 shadow-md"> */}
          <img src="/projects/smk-tv.png" alt="Bdjobs" className="w-10 h-10 object-contain rounded-md" />
          {/* </div> */}
          <span className="text-[11px] font-black tracking-widest uppercase mt-4 text-mobile-primary">SMK TV</span>
        </div>
      );
    case "PrimePay":
      return (
        <div className="w-full h-full bg-gradient-to-br from-teal-500 via-emerald-600 to-sky-600 flex flex-col items-center justify-center text-white relative p-4">
          {/* <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-md"> */}
          <img src="/projects/primepay.jpeg" alt="Bdjobs" className="w-10 h-10 object-contain rounded-md" />
          {/* </div> */}
          <span className="text-[11px] font-black tracking-widest uppercase mt-4">PrimePay</span>
        </div>
      );
    case "Sentra PTT":
      return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-neutral-900 to-zinc-900 flex flex-col items-center justify-center text-white relative p-4">
          {/* <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-md"> */}
          <img src="/projects/sentra.webp" alt="Bdjobs" className="w-10 h-10 object-contain rounded-md" />
          {/* </div> */}
          <span className="text-[11px] font-black tracking-widest uppercase mt-4 text-emerald-400">Sentra</span>
        </div>
      );
    case "Bdjobs":
      return (
        <div className="w-full h-full bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 flex flex-col items-center justify-center text-white relative p-4">
          {/* <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border shadow-inner"> */}
            <img src="/projects/bdjobs.png" alt="Bdjobs" className="w-10 h-10 object-contain rounded-md" />
          {/* </div> */}
          <span className="text-[11px] font-black tracking-widest uppercase mt-4 text-white">Bdjobs</span>
        </div>
      );
    case "Patient Aid":
      return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-800 flex flex-col items-center justify-center text-white relative p-4">
          {/* <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border shadow-inner"> */}
            <img src="/projects/patientAid.png" alt="Patient Aid" className="w-10 h-10 object-contain rounded-md" />
          {/* </div> */}
          <span className="text-[11px] font-black tracking-widest uppercase mt-4 text-white">Patient Aid</span>
        </div>
      );
    default:
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-neutral-900 flex flex-col items-center justify-center text-white">
          <span className="text-xl font-bold">App</span>
        </div>
      );
  }
};

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  subtitle,
  description,
  image,
  technologies,
  bottomText,
  appStoreLink,
  playStoreLink,
  githubLink,
  liveDemoLink
}) => {
  return (
    <Card className="border border-border/40 bg-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-3xl flex flex-col sm:flex-row h-full">
      
      {/* Left Column: Content, tech stack and actions */}
      <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">{title}</h3>
            <p className="text-xs font-semibold text-mobile-primary tracking-wide uppercase">{subtitle}</p>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed font-normal">{description}</p>
          
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {technologies.map((tech, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-[10px] sm:text-xs font-semibold border-border/60 text-foreground/80 px-2 py-0.5 rounded-md"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Dynamic bottom section: Stats and buttons */}
        <div className="space-y-4 pt-2">
          {/* Bottom stats / indicator */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-mobile-primary"></span>
            {bottomText}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 pt-1 border-t border-border/20">
            {playStoreLink && (
              <Button size="sm" variant="outline" className="rounded-full text-xs font-semibold border-border/60 hover:bg-foreground/5 h-8 px-4" asChild>
                <a href={playStoreLink} target="_blank" rel="noopener noreferrer">
                  Play Store <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </Button>
            )}
            {appStoreLink && (
              <Button size="sm" variant="outline" className="rounded-full text-xs font-semibold border-border/60 hover:bg-foreground/5 h-8 px-4" asChild>
                <a href={appStoreLink} target="_blank" rel="noopener noreferrer">
                  App Store <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </Button>
            )}
            {githubLink && (
              <Button size="sm" variant="outline" className="rounded-full text-xs font-semibold border-border/60 hover:bg-foreground/5 h-8 px-4" asChild>
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-1 h-3.5 w-3.5" /> Code
                </a>
              </Button>
            )}
            {liveDemoLink && (
              <Button size="sm" variant="outline" className="rounded-full text-xs font-semibold border-border/60 hover:bg-foreground/5 h-8 px-4" asChild>
                {liveDemoLink.startsWith('/') ? (
                  <Link to={liveDemoLink} target="_blank" rel="noopener noreferrer">
                    Live Demo <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <a href={liveDemoLink} target="_blank" rel="noopener noreferrer">
                    Live Demo <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic floating image in phone bezel mockup */}
      <div className="sm:w-1/2 bg-gradient-to-br from-foreground/5 to-foreground/10 relative overflow-hidden flex items-center justify-center min-h-[240px] sm:min-h-0 p-6 sm:p-0">
        {/* Absolute glow decorative circles */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-mobile-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Mockup Frame */}
        <div className="relative w-[120px] sm:w-[135px] h-[240px] sm:h-[270px] rounded-[24px] sm:rounded-[28px] border-[4px] border-black/90 dark:border-neutral-800/90 overflow-hidden shadow-2xl z-10 transition-transform duration-500 hover:scale-105 hover:rotate-1">
          {/* Subtle phone screen glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 z-10 pointer-events-none"></div>
          
          {/* Centered Splash Screen Mockup */}
          {renderProjectSplash(title, image)}
        </div>
      </div>

    </Card>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-card/20 border-b border-border/20">
      <div className="container mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed">
            A showcase of my mobile application development work, featuring high-fidelity Android and Flutter projects.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              bottomText={project.bottomText}
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
