
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
    name: "Brain Station 23 PLC",
    role: "Senior Software Engineer I",
    period: "Aug 2024 - Present",
    description: "Contributed to the development of native & cross-platform mobile applications. Worked on debugging and enhancing existing features. Participated in daily stand-ups and sprint planning.",
    technologies: ["Android","Flutter", "Kotlin", "Firebase", "REST APIs"]
  },
  {
    name: "Nybsys",
    role: "Software Engineer -> Sr. Software Engineer",
    period: "Feb 2022 - Aug 2024",
    description: "Lead development for the company's flagship mobile applications. Implemented clean architecture patterns and improved app performance by 40%. Managed a team of 3 developers.",
    technologies: ["Java", "Kotlin", "Android SDK", "Room", "Retrofit","MQTT","WebRTC", "GraphQL"]
  },
  {
    name: "Bdjobs.com Ltd.",
    role: "Mobile Application Developer",
    period: "March 2021 - Feb 2022",
    description: "Lead development for the company's flagship mobile applications. Implemented clean architecture patterns and improved app performance by 40%. Managed a team of 3 developers.",
    technologies: ["Kotlin", "Android", "Firebase","WebRTC","Google AdSDK"]
  },
  {
    name: "ITmedicus",
    role: "Software Developer",
    period: "Aug 2019 - Feb 2021",
    description: "Developed multiple high-impact health tech native and cross-platform applications, taking full ownership of project delivery and success.",
    technologies: ["Kotlin", "Android", "Firebase","REST APIs"]
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
