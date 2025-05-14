
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Smartphone, Palette, Rocket } from 'lucide-react';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="bg-mobile-primary/10 w-12 h-12 rounded-md flex items-center justify-center mb-4 text-mobile-primary">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

const About: React.FC = () => {
  const skills = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Development",
      description: "Expert in native Android development and cross-platform solutions with Flutter."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Clean Architecture",
      description: "Building robust, maintainable, and testable mobile applications with SOLID principles."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful user interfaces following Material Design guidelines."
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Performance Optimization",
      description: "Optimizing apps for speed, responsiveness and battery efficiency across devices."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">About Me</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            I'm a Senior Software Engineer specializing in Android and Flutter development with a passion for crafting exceptional mobile experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I'm Soumik Bhattacharjee, a Senior Software Engineer with expertise in mobile application development. With a strong foundation in Android and Flutter, I specialize in creating responsive, user-friendly mobile applications that deliver exceptional user experiences.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              My approach combines technical excellence with creative problem-solving, ensuring that every app I build is not only functional but also visually appealing and intuitive to use.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">My Expertise</h3>
            <div className="space-y-3">
              <div className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Android (Java/Kotlin)</span>
                  <span>95%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-mobile-primary rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Flutter & Dart</span>
                  <span>90%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-mobile-primary rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">UI/UX Design</span>
                  <span>85%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-mobile-primary rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">React Native</span>
                  <span>80%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-mobile-primary rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard 
              key={index} 
              icon={skill.icon} 
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
