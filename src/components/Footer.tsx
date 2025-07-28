
import React from 'react';
import { Smartphone } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  // Handler for footer nav links
  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      // If not on homepage, navigate to homepage with hash
      navigate(`/${hash}`);
    } else {
      // If on homepage, just scroll smoothly to section
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  
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
              {[
                { text: "About", hash: "#about" },
                { text: "Companies", hash: "#companies" },
                { text: "Projects", hash: "#projects" },
                { text: "Blog", hash: "#blog" },
                { text: "Contact", hash: "#contact" },
              ].map(({ text, hash }) => (
                <li key={text}>
                  <a
                    href={hash}
                    onClick={(e) => handleNavClick(e, hash)}
                    className="text-gray-300 hover:text-mobile-primary transition-colors duration-200"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            &copy; {currentYear} Soumik Bhattacharjee. All rights reserved (v1.0.1).
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
