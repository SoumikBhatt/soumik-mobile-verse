
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
          className="text-foreground/80 hover:text-mobile-primary font-medium transition-colors duration-200"
        >
          {link.text}
        </Link>
      );
    }

    return (
      <a
        href={link.href}
        onClick={(e) => handleInternalLinkClick(e, link.href, location, navigate)}
        className="text-foreground/80 hover:text-mobile-primary font-medium transition-colors duration-200"
      >
        {link.text}
      </a>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/70 dark:bg-[#0B0F13]/70 backdrop-blur-md border-b border-border/40 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center font-black bg-mobile-primary text-black dark:text-black w-8 h-8 rounded-lg text-sm tracking-tighter shadow-sm hover:scale-105 transition-transform duration-200">
              SB
            </div>
            <span className="font-extrabold text-base tracking-tight text-foreground hidden sm:inline-block">Soumik</span>
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
              className="bg-mobile-primary hover:bg-mobile-secondary text-black hover:text-white font-bold transition-all duration-300 rounded-full px-5 py-1.5 h-auto text-xs"
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-foreground/80 hover:text-foreground focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-4 space-y-4 border-t border-border/40">
            {navLinks.map((link) => (
              <div key={link.text} onClick={() => setIsMenuOpen(false)} className="px-2">
                {renderNavLink(link)}
              </div>
            ))}
            <div className="px-2 pt-2 flex flex-col gap-2">
              <Button
                asChild
                className="w-full bg-mobile-primary hover:bg-mobile-secondary text-black hover:text-white font-bold transition-all duration-300 rounded-full py-2 h-auto text-xs"
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
