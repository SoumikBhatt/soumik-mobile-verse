
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send, Linkedin, Github, Twitter, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      // Store the submission in Supabase
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([submission]);

      if (dbError) {
        throw new Error(`Database error: ${dbError.message}`);
      }

      // Send email notifications via edge function
      const { error: emailError } = await supabase.functions.invoke('send-contact-notification', {
        body: submission,
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Don't throw here - we still want to show success if the submission was saved
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
      
      // Reset form
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
                  <a href="mailto:hello.soumikbhatt@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-mobile-primary transition-colors duration-200">
                    hello.soumikbhatt@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-mobile-primary mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-300 hover:text-mobile-primary transition-colors duration-200">
                    +88 01755244111
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-mobile-primary mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/soumikcse/" className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-mobile-primary hover:text-white transition-colors duration-200">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://github.com/SoumikBhatt" className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-mobile-primary hover:text-white transition-colors duration-200">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://x.com/soumikbhatt95" className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-mobile-primary hover:text-white transition-colors duration-200">
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
                  Name *
                </label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Your name" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Your email" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject *
                </label>
                <Input 
                  id="subject" 
                  name="subject" 
                  placeholder="Subject" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message *
                </label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Your message" 
                  rows={5} 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-mobile-primary to-mobile-secondary hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
