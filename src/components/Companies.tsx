import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Calendar, Briefcase, ChevronRight } from 'lucide-react';

interface CompanyProps {
  name: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  logo?: string;
  initials: string;
  bgColor: string;
}

const companies: CompanyProps[] = [
  {
    name: "Brain Station 23 PLC",
    role: "Senior Software Engineer I",
    period: "Aug 2024 - Present",
    description: "Contributed to the development of native & cross-platform mobile applications. Worked on debugging and enhancing existing features. Participated in daily stand-ups and sprint planning.",
    technologies: ["Android", "Flutter", "Kotlin", "Firebase", "REST APIs"],
    initials: "BS",
    logo: "/companies/bs23.webp",
    bgColor: "bg-blue-600/10 text-blue-500 border-blue-500/20"
  },
  {
    name: "Nybsys",
    role: "Software Engineer -> Sr. Software Engineer",
    period: "Feb 2022 - Aug 2024",
    description: "Lead development for the company's flagship mobile applications. Implemented clean architecture patterns and improved app performance by 40%. Managed a team of 3 developers.",
    technologies: ["Java", "Kotlin", "Android SDK", "Room", "Retrofit", "MQTT", "WebRTC", "GraphQL"],
    initials: "NY",
    logo: "/companies/nybsys.svg",
    bgColor: "bg-amber-600/10 text-amber-500 border-amber-500/20"
  },
  {
    name: "Bdjobs.com Ltd.",
    role: "Mobile Application Developer",
    period: "March 2021 - Feb 2022",
    description: "Lead development for the company's flagship mobile applications. Implemented clean architecture patterns and improved app performance by 40%. Managed a team of 3 developers.",
    technologies: ["Kotlin", "Android", "Firebase", "WebRTC", "Google AdSDK"],
    logo: "/companies/bdjobs.png",
    initials: "BJ",
    bgColor: "bg-emerald-600/10 text-emerald-500 border-emerald-500/20"
  },
  {
    name: "ITmedicus",
    role: "Software Developer",
    period: "Aug 2019 - Feb 2021",
    description: "Developed multiple high-impact health tech native and cross-platform applications, taking full ownership of project delivery and success.",
    technologies: ["Kotlin", "Android", "Firebase", "REST APIs"],
    logo: "companies/itmedicus.png",
    initials: "IT",
    bgColor: "bg-sky-600/10 text-sky-500 border-sky-500/20"
  }
];

const Companies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const selectedCompany = companies[activeTab];

  return (
    <section id="companies" className="py-24 relative overflow-hidden bg-background">
      {/* Subtle decorative mesh */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-mobile-primary/2 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Companies I've Worked With
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed">
            A timeline of my professional journey and the organizations I've contributed to throughout my career.
          </p>
        </div>

        {/* Dynamic Tab Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Left Column: Company Cards List / Horizontal scrolling on mobile */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible space-x-4 lg:space-x-0 lg:space-y-4 pb-4 lg:pb-0 scrollbar-none snap-x">
            {companies.map((company, index) => {
              const isActive = index === activeTab;
              return (
                <div
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex-shrink-0 w-[240px] sm:w-[280px] lg:w-full snap-start cursor-pointer transition-all duration-300 rounded-2xl border p-4 sm:p-5 flex items-center gap-4 ${
                    isActive
                      ? 'border-mobile-primary bg-mobile-primary/5 dark:bg-mobile-primary/5 shadow-md shadow-mobile-primary/5'
                      : 'border-border/40 bg-card hover:bg-card/50'
                  }`}
                >
                  {/* Logo or initials */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner flex-shrink-0 ${company.bgColor}`}>
                    {company.logo ? (
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="w-8 h-8 object-contain rounded-md"
                      />
                    ) : (
                      <span className="font-extrabold text-sm tracking-wide">{company.initials}</span>
                    )}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="font-bold text-foreground text-sm sm:text-base truncate">{company.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{company.role.split(' -> ').pop()}</p>
                  </div>

                  <ChevronRight className={`h-4 w-4 text-muted-foreground/60 hidden lg:block transition-transform ${isActive ? 'translate-x-1 text-mobile-primary' : ''}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Timeline Detail Card */}
          <div className="lg:col-span-8 flex">
            <Card className="w-full border border-border/40 bg-card shadow-sm hover:shadow-md transition-shadow duration-300 rounded-3xl overflow-hidden flex flex-col justify-between">
              <CardContent className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                
                {/* Timeline Header */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 border-b border-border/30">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-mobile-primary uppercase tracking-wider">
                        <Briefcase className="h-3.5 w-3.5" />
                        Professional Role
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                        {selectedCompany.role}
                      </h3>
                    </div>
                    <div className="flex items-center text-sm font-semibold text-muted-foreground bg-foreground/5 dark:bg-foreground/5 px-3 py-1.5 rounded-full border border-border/20 self-start sm:self-center">
                      <Calendar className="h-4 w-4 mr-1.5 text-mobile-primary" />
                      <span>{selectedCompany.period}</span>
                    </div>
                  </div>

                  {/* Bullet Achievements */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Key Highlights & Contributions
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
                      {selectedCompany.description}
                    </p>
                  </div>
                </div>

                {/* Technologies Badges */}
                <div className="space-y-3 pt-6 border-t border-border/20">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Technologies & Ecosystem
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.technologies.map((tech, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-mobile-primary/10 hover:bg-mobile-primary/20 text-mobile-primary text-xs font-semibold border border-mobile-primary/25 rounded-full px-3.5 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Companies;
