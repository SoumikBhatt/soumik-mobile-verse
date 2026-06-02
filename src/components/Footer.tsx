import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send, Linkedin, Github, Twitter, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLocation, useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Smooth navigation helper
  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate(`/${hash}`);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Submit contact message to Supabase
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const submission = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([submission]);

      if (dbError) {
        throw new Error(`Database error: ${dbError.message}`);
      }

      const { error: emailError } = await supabase.functions.invoke('send-contact-notification', {
        body: submission,
      });

      if (emailError) {
        console.error('Email error:', emailError);
        toast({
          title: "Message submitted successfully!",
          description: "Your message has been saved. Email notifications may be delayed.",
        });
      } else {
        toast({
          title: "Message sent successfully!",
          description: "Thanks for reaching out! I'll get back to you soon.",
        });
      }
      
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Error sending message",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#0B0F13] text-neutral-300 pt-20 pb-8 border-t border-border/20 relative overflow-hidden">
      {/* Dynamic background element */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-mobile-primary/2 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800/40">
          
          {/* Column 1: Bio and Socials (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center font-black bg-mobile-primary text-black w-8 h-8 rounded-lg text-sm tracking-tighter shadow-sm">
                SB
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">Soumik Bhattacharjee</span>
            </div>
            
            <p className="text-sm text-neutral-400 font-normal leading-relaxed">
              Senior Software Engineer specializing in Android and Flutter. Designing and building high-performance mobile applications with elegant design and architectural excellence.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <Mail className="h-4 w-4 text-mobile-primary flex-shrink-0" />
                <a href="mailto:hello.soumikbhatt@gmail.com" className="hover:text-mobile-primary transition-colors">
                  hello.soumikbhatt@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <MapPin className="h-4 w-4 text-mobile-primary flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <a href="https://www.linkedin.com/in/soumikcse/" className="h-9 w-9 bg-neutral-800/50 hover:bg-mobile-primary hover:text-black rounded-lg flex items-center justify-center text-neutral-400 transition-colors duration-200">
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a href="https://github.com/SoumikBhatt" className="h-9 w-9 bg-neutral-800/50 hover:bg-mobile-primary hover:text-black rounded-lg flex items-center justify-center text-neutral-400 transition-colors duration-200">
                <Github className="h-4.5 w-4.5" />
              </a>
              <a href="https://x.com/soumikbhatt95" className="h-9 w-9 bg-neutral-800/50 hover:bg-mobile-primary hover:text-black rounded-lg flex items-center justify-center text-neutral-400 transition-colors duration-200">
                <Twitter className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation & Resources (3 columns) */}
          <div className="lg:col-span-3 space-y-6 lg:pl-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Navigation</h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  { text: "About", hash: "#about" },
                  { text: "Projects", hash: "#projects" },
                  { text: "Blog", hash: "#blog" },
                  { text: "Contact", hash: "#contact" }
                ].map(({ text, hash }) => (
                  <li key={text}>
                    <a
                      href={hash}
                      onClick={(e) => handleNavClick(e, hash)}
                      className="text-neutral-400 hover:text-mobile-primary transition-colors duration-200"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Latest Work</h3>
              <ul className="space-y-2.5 text-sm text-neutral-400">
                <li><a href="/bhakti365" className="hover:text-mobile-primary transition-colors">Bhakti365 Devotional</a></li>
                <li><a href="/smk-tv" className="hover:text-mobile-primary transition-colors">SMK TV Streaming</a></li>
                <li><a href="/notification-console" className="hover:text-mobile-primary transition-colors">Notification Console</a></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Consolidated Contact Form (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Contact Me</h3>
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3.5">
                <Input 
                  name="name" 
                  placeholder="Your Name" 
                  required 
                  disabled={isSubmitting}
                  className="bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 rounded-xl focus-visible:ring-mobile-primary focus-visible:border-mobile-primary text-xs sm:text-sm h-10 px-3.5"
                />
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="Your Email" 
                  required 
                  disabled={isSubmitting}
                  className="bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 rounded-xl focus-visible:ring-mobile-primary focus-visible:border-mobile-primary text-xs sm:text-sm h-10 px-3.5"
                />
              </div>
              
              <Input 
                name="subject" 
                placeholder="Subject / Representation" 
                required 
                disabled={isSubmitting}
                className="bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 rounded-xl focus-visible:ring-mobile-primary focus-visible:border-mobile-primary text-xs sm:text-sm h-10 px-3.5"
              />
              
              <Textarea 
                name="message" 
                placeholder="Your Message" 
                rows={4} 
                required 
                disabled={isSubmitting}
                className="bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 rounded-xl focus-visible:ring-mobile-primary focus-visible:border-mobile-primary text-xs sm:text-sm p-3.5 resize-none"
              />
              
              <Button 
                type="submit" 
                className="w-full bg-mobile-primary hover:bg-mobile-secondary text-black hover:text-white font-bold transition-all duration-300 rounded-xl h-10 text-xs sm:text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" /> Send Message
                  </span>
                )}
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-semibold">
          <p>&copy; {currentYear} Soumik Bhattacharjee. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-mobile-primary animate-pulse"></span>
            <span>Sr. Software Engineer (Android & Flutter)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
