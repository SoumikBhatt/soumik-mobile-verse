
import React from 'react';
import { Smartphone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Smartphone className="h-6 w-6 text-mobile-primary" />
            <span className="font-bold text-lg">Soumik Bhattacharjee</span>
          </div>
          
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <li>
                <a href="#about" className="text-gray-300 hover:text-mobile-primary transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#companies" className="text-gray-300 hover:text-mobile-primary transition-colors duration-200">
                  Companies
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-mobile-primary transition-colors duration-200">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-mobile-primary transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            &copy; {currentYear} Soumik Bhattacharjee. All rights reserved. 
          </p>
          <p className="text-center text-gray-500 text-sm mt-2">
            Sr. Software Engineer (Android, Flutter)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
