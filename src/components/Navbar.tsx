
import React, { useState } from 'react';
import { Menu, X, Smartphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from './ThemeToggle';

type NavLink = {
  text: string;
  href: string;
};

const navLinks: NavLink[] = [
  { text: "About", href: "#about" },
  { text: "Companies", href: "#companies" },
  { text: "Projects", href: "#projects" },
  { text: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-mobile-primary" />
            <span className="font-bold text-lg">Soumik Bhattacharjee</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.text}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-mobile-primary transition-colors duration-200"
              >
                {link.text}
              </a>
            ))}
            <ThemeToggle />
            <Button 
              asChild
              className="bg-gradient-to-r from-mobile-primary to-mobile-secondary hover:opacity-90"
            >
              <a href="#contact">Hire Me</a>
            </Button>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button 
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="block text-gray-700 dark:text-gray-300 hover:text-mobile-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </a>
            ))}
            <Button 
              asChild
              className="w-full mt-2 bg-gradient-to-r from-mobile-primary to-mobile-secondary hover:opacity-90"
            >
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Hire Me</a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
