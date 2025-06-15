
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowDown } from 'lucide-react';
import MobilePhoneMockup from './MobilePhoneMockup';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen pt-20 flex flex-col justify-center overflow-hidden relative">
      <div className="container mx-auto px-4 pt-10 pb-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="block">Hi, I'm Soumik</span>
              <span className="block mt-2 text-mobile-primary">Mobile Developer</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
              Software Engineer specializing in Android and Flutter.
              Crafting beautiful and functional mobile experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href='/resume.pdf'
                target='_blank'
                rel='noopener noreferrer'>

                <Button
                  className="bg-gradient-to-r from-mobile-primary to-mobile-secondary hover:opacity-90"
                  size="lg"
                // onClick={() => window.open("https://docs.google.com/document/d/1dOv7tvcxEa6infARBo96PxrKpu9Egs5CX7140kvPYws", "_blank")}
                >
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </Button>

              </a>

              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <a href="#projects">
                  View My Work <ArrowDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="animate-float">
                <MobilePhoneMockup />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-mobile-primary/10 -z-10"></div>
              <div className="absolute -bottom-5 -right-5 w-32 h-32 rounded-full bg-mobile-secondary/10 -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll down">
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </a>
      </div>
    </section>
  );
};

export default Hero;