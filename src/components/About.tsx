import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SkillCardProps {
  icons: string[];
  title: string;
  description: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ icons, title, description }) => {
  return (
    <Card className="border border-border/40 bg-card hover:bg-card/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden">
      <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
        <div className="flex items-center gap-2.5">
          {icons.map((iconUrl, idx) => (
            <div key={idx} className="w-10 h-10 rounded-xl bg-foreground/5 dark:bg-foreground/5 flex items-center justify-center border border-border/20 shadow-sm overflow-hidden p-2 select-none">
              <img src={iconUrl} alt={`${title} logo ${idx + 1}`} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-foreground">{title}</h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const About: React.FC = () => {
  const expertiseCards = [
    {
      icons: ["/expertise/android.svg", "/expertise/kotlin.svg", "/expertise/java.svg"],
      title: "Android Development",
      description: "Kotlin, Java, clean architecture, performance optimization, and API integration."
    },
    {
      icons: ["/expertise/kmp.svg", "/expertise/cmp.svg"],
      title: "Kotlin Multiplatform",
      description: "Kotlin Multiplatform specializing in shared core models and business logic."
    },
    {
      icons: ["/expertise/flutter.svg", "/expertise/dart.svg"],
      title: "Flutter Development",
      description: "Flutter Development, responsive layouts, custom widgets, state management."
    }
  ];

  return (
    <section id="about" className="py-24 bg-card/10 border-y border-border/20 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-mobile-primary/2 blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="container mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed">
            A showcase of my core development capabilities across native Android, cross-platform Flutter, and Kotlin Multiplatform ecosystems.
          </p>
        </div>

        {/* Expertise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {expertiseCards.map((skill, index) => (
            <SkillCard 
              key={index} 
              icons={skill.icons} 
              title={skill.title} 
              description={skill.description} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
