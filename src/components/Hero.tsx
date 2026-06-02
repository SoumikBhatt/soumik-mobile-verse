import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowDown } from 'lucide-react';

const renderHeroSplash = (title: string) => {
  switch (title) {
    case "Bhakti365":
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 flex flex-col items-center justify-center text-white p-3">
          {/* <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shadow-md"> */}
          <img src="/projects/bhakti365.png" alt="Bhakti365" className="w-10 h-10 object-contain rounded-md" />
          {/* </div> */}
          <span className="text-[10px] font-black tracking-widest uppercase mt-3">Bhakti365</span>
        </div>
      );
    case "SMK TV":
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-[#1A1F2C] to-indigo-950 flex flex-col items-center justify-center text-white p-3">
          {/* <div className="w-16 h-16 rounded-xl bg-mobile-primary flex items-center justify-center border border-white/10 shadow-md"> */}
          <img src="/projects/smk-tv.png" alt="SMK TV" className="w-10 h-10 object-contain rounded-md" />
          {/* </div> */}
          <span className="text-[10px] font-black tracking-widest uppercase mt-3 text-mobile-primary">SMK TV</span>
        </div>
      );
    case "PrimePay":
      return (
        <div className="w-full h-full bg-gradient-to-br from-teal-500 via-emerald-600 to-sky-600 flex flex-col items-center justify-center text-white p-3">
          {/* <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-md"> */}
          <img src="/projects/primepay.jpeg" alt="Prime Pay" className="w-10 h-10 object-contain rounded-md" />
          {/* </div> */}
          <span className="text-[10px] font-black tracking-widest uppercase mt-3">PrimePay</span>
        </div>
      );
    case "Sentra PTT":
      return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-neutral-900 to-zinc-900 flex flex-col items-center justify-center text-white p-3">
          {/* <div className="w-16 h-16 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-md"> */}
          <img src="/projects/sentra.webp" alt="Sentra" className="w-10 h-10 object-contain rounded-md" />
          {/* </div> */}
          <span className="text-[10px] font-black tracking-widest uppercase mt-3 text-emerald-400">Sentra</span>
        </div>
      );
    case "Bdjobs":
      return (
        <div className="w-full h-full bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 flex flex-col items-center justify-center text-white p-3">
          {/* <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border shadow-inner"> */}
            <img src="/projects/bdjobs.png" alt="Bdjobs" className="w-8 h-8 object-contain rounded-md" />
          {/* </div> */}
          <span className="text-[10px] font-black tracking-widest uppercase mt-3 text-white">Bdjobs</span>
        </div>
      );
    case "Patient Aid":
      return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-800 flex flex-col items-center justify-center text-white p-3">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border shadow-inner">
            <img src="/projects/patientAid.png" alt="Patient Aid" className="w-8 h-8 object-contain rounded-md" />
          </div>
          <span className="text-[10px] font-black tracking-widest uppercase mt-3 text-white">Patient Aid</span>
        </div>
      );
    default:
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-neutral-900 flex flex-col items-center justify-center text-white">
          <span className="text-xl font-bold">App</span>
        </div>
      );
  }
};

const Hero: React.FC = () => {
  const floatingSplashScreens = [
    { title: 'Bhakti365', style: { top: '5%', left: '15%', zIndex: 10 } },
    { title: 'SMK TV', style: { top: '0%', left: '42%', zIndex: 20 } },
    { title: 'PrimePay', style: { top: '25%', left: '68%', zIndex: 15 } },
    { title: 'Sentra PTT', style: { top: '35%', left: '5%', zIndex: 12 } },
    { title: 'Bdjobs', style: { top: '32%', left: '32%', zIndex: 25 } },
    { title: 'Patient Aid', style: { top: '55%', left: '55%', zIndex: 30 } }
  ];

  return (
    <section className="min-h-screen pt-24 pb-12 flex flex-col justify-center overflow-hidden relative bg-background bg-grid-pattern">
      {/* Decorative gradient glowing spheres */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-mobile-primary/5 blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-mobile-secondary/5 blur-[150px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mobile-primary/10 border border-mobile-primary/20 text-mobile-primary text-xs font-semibold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-mobile-primary animate-pulse"></span>
              Available for new projects
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-foreground">
              Hi, I'm Soumik — <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mobile-primary to-emerald-500">
                Mobile Product Architect
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Senior Software Engineer specializing in Android, KMP and Flutter. 
              Crafting premium, performance-optimized, and beautiful mobile experiences with engineering excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  className="w-full bg-mobile-primary hover:bg-mobile-secondary text-black hover:text-white font-bold transition-all duration-300 rounded-full px-8 py-6 h-auto flex items-center justify-center gap-2 text-sm shadow-lg shadow-mobile-primary/10"
                >
                  <Download className="h-4 w-4" /> Download CV
                </Button>
              </a>

              <Button
                variant="outline"
                className="w-full sm:w-auto hover:bg-foreground/5 text-foreground border-border hover:border-foreground/30 font-semibold rounded-full px-8 py-6 h-auto flex items-center justify-center gap-2 text-sm transition-all duration-300"
                asChild
              >
                <a href="#projects">
                  View My Work <ArrowDown className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: 3D Perspective Floating Mockups */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end select-none">
            <div className="relative w-full max-w-[500px] h-[450px] sm:h-[550px] md:h-[600px] lg:h-[550px] perspective-1000 preserve-3d">
              {floatingSplashScreens.map((screen, idx) => (
                <div
                  key={idx}
                  className="absolute w-[120px] sm:w-[150px] h-[240px] sm:h-[300px] rounded-[24px] sm:rounded-[32px] overflow-hidden border-[3px] sm:border-[4px] border-black/90 dark:border-neutral-800/90 shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 z-10"
                  style={{
                    top: screen.style.top,
                    left: screen.style.left,
                    zIndex: screen.style.zIndex,
                    transform: 'rotateX(20deg) rotateY(-20deg) rotateZ(-12deg) translateZ(0px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  {/* Phone screen details overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none"></div>
                  
                  {/* Centered Splash Screen Mockup */}
                  {renderHeroSplash(screen.title)}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none hidden md:block">
        <a href="#about" aria-label="Scroll down">
          <ArrowDown className="h-5 w-5 text-muted-foreground/60" />
        </a>
      </div>
    </section>
  );
};

export default Hero;