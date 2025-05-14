
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send, Linkedin, Github, Twitter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    toast({
      title: "Message sent",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-mobile-primary mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a href="mailto:soumik@example.com" className="text-gray-600 dark:text-gray-300 hover:text-mobile-primary transition-colors duration-200">
                    soumik@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-mobile-primary mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-300 hover:text-mobile-primary transition-colors duration-200">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-mobile-primary mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    San Francisco, California
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <a href="#" className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-mobile-primary hover:text-white transition-colors duration-200">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-mobile-primary hover:text-white transition-colors duration-200">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-mobile-primary hover:text-white transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Your name" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Your email" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input 
                  id="subject" 
                  name="subject" 
                  placeholder="Subject" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Your message" 
                  rows={5} 
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-mobile-primary to-mobile-secondary hover:opacity-90"
              >
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
