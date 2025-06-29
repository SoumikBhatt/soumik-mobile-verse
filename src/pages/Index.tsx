import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Companies from '../components/Companies';
import Projects from '../components/Projects';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Index = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Select element by id from hash (e.g., '#about')
      const el = document.querySelector(location.hash);
      if (el) {
        // Delay scrolling to allow component render
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <Hero />
      <About />
      <Companies />
      <Projects />
      <BlogSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
