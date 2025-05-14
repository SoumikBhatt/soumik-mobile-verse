
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Calendar } from 'lucide-react';

interface CompanyProps {
  name: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

const companies: CompanyProps[] = [
  {
    name: "Tech Innovators Inc.",
    role: "Sr. Mobile Developer",
    period: "2021 - Present",
    description: "Lead developer for the company's flagship mobile applications. Implemented clean architecture patterns and improved app performance by 40%. Managed a team of 3 developers.",
    technologies: ["Flutter", "Kotlin", "Firebase", "REST APIs", "GraphQL"]
  },
  {
    name: "Digital Solutions Ltd.",
    role: "Mobile Developer",
    period: "2018 - 2021",
    description: "Developed and maintained multiple Android applications with over 500K downloads. Implemented Material Design principles and collaborated with UX designers to create intuitive user interfaces.",
    technologies: ["Java", "Kotlin", "Android SDK", "Room", "Retrofit"]
  },
  {
    name: "MobileFirst Startup",
    role: "Junior Developer",
    period: "2016 - 2018",
    description: "Contributed to the development of cross-platform mobile applications. Worked on debugging and enhancing existing features. Participated in daily stand-ups and sprint planning.",
    technologies: ["Flutter", "Dart", "Android", "iOS", "Firebase"]
  }
];

const CompanyCard: React.FC<CompanyProps> = ({ name, role, period, description, technologies }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between mb-4">
          <div className="flex items-start">
            <Building2 className="h-5 w-5 mr-2 text-mobile-primary mt-1" />
            <div>
              <h3 className="text-xl font-bold">{name}</h3>
              <p className="text-mobile-secondary font-medium">{role}</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{period}</span>
          </div>
        </div>
        <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary">{tech}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Companies: React.FC = () => {
  return (
    <section id="companies" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Companies I've Worked With</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            A timeline of my professional journey and the organizations I've contributed to throughout my career.
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {companies.map((company, index) => (
            <CompanyCard
              key={index}
              name={company.name}
              role={company.role}
              period={company.period}
              description={company.description}
              technologies={company.technologies}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
