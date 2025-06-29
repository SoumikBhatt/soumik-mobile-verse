
import React, { useState } from 'react';
import { Menu, X, Smartphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from './ThemeToggle';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';


type NavLink = {
  text: string;
  href: string;
  isExternal?: boolean;
};

const navLinks: NavLink[] = [
  { text: "About", href: "#about" },
  { text: "Companies", href: "#companies" },
  { text: "Projects", href: "#projects" },
  { text: "Blog", href: "#blog" },
  { text: "Contact", href: "#contact" },
];

const handleInternalLinkClick = (
  e: React.MouseEvent,
  href: string,
  location: ReturnType<typeof useLocation>,
  navigate: ReturnType<typeof useNavigate>
) => {
  e.preventDefault();

  if (location.pathname !== '/') {
    navigate(`/${href}`);
  } else {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
};


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderNavLink = (link: NavLink) => {
    if (link.isExternal) {
      return (
        <Link
          to={link.href}
          className="text-gray-700 dark:text-gray-300 hover:text-mobile-primary transition-colors duration-200"
        >
          {link.text}
        </Link>
      );
    }

    return (
      <a
        href={link.href}
        onClick={(e) => handleInternalLinkClick(e, link.href, location, navigate)}
        className="text-gray-700 dark:text-gray-300 hover:text-mobile-primary transition-colors duration-200"
      >
        {link.text}
      </a>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-mobile-primary" />
            <span className="font-bold text-lg">Soumik Bhattacharjee</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div key={link.text}>
                {renderNavLink(link)}
              </div>
            ))}
            <ThemeToggle />
            <Button
              asChild
              className="bg-gradient-to-r from-mobile-primary to-mobile-secondary hover:opacity-90"
            >
              <a href="#contact" onClick={(e) => handleInternalLinkClick(e, "#contact", location, navigate)}>Hire Me</a>
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
              <div key={link.text} onClick={() => setIsMenuOpen(false)}>
                {renderNavLink(link)}
              </div>
            ))}
            <Button
              asChild
              className="w-full mt-2 bg-gradient-to-r from-mobile-primary to-mobile-secondary hover:opacity-90"
            >
              <a href="#contact" onClick={(e) => {
                handleInternalLinkClick(e,"#contact",location,navigate)
                setIsMenuOpen(false)
              }}>Hire Me</a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
